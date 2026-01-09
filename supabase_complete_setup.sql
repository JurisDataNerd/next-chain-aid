-- ============================================================================
-- ChainAid - Complete Supabase Database Setup
-- ============================================================================
-- Description: Complete SQL setup untuk ChainAid platform
-- Version: 1.0
-- Last Updated: 2026-01-09
-- ============================================================================

-- ============================================================================
-- STEP 1: EXTENSIONS
-- ============================================================================

-- Enable UUID extension untuk auto-generate UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto untuk encryption (opsional, untuk future use)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- STEP 2: CUSTOM TYPES (ENUMS)
-- ============================================================================

-- User roles
CREATE TYPE user_role AS ENUM ('user', 'org', 'admin');

-- Organization status
CREATE TYPE org_status AS ENUM ('pending', 'approved', 'rejected');

-- Campaign status
CREATE TYPE campaign_status AS ENUM ('draft', 'pending_approval', 'active', 'ended', 'frozen');

-- Campaign categories (untuk filtering)
CREATE TYPE campaign_category AS ENUM (
  'kesehatan',
  'pendidikan',
  'bencana_alam',
  'lingkungan',
  'sosial',
  'ekonomi',
  'lainnya'
);

-- ============================================================================
-- STEP 3: TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table: profiles
-- Description: Public profile untuk semua user (donor, org, admin)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  wallet_address TEXT UNIQUE,
  role user_role DEFAULT 'user' NOT NULL,
  bio TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments untuk dokumentasi
COMMENT ON TABLE public.profiles IS 'User profiles untuk semua pengguna platform';
COMMENT ON COLUMN public.profiles.wallet_address IS 'Web3 wallet address (MetaMask, etc)';
COMMENT ON COLUMN public.profiles.role IS 'User role: user (donor), org (organization), admin';

-- ----------------------------------------------------------------------------
-- Table: organizations
-- Description: Detail organisasi untuk user dengan role 'org'
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  ktp_url TEXT,
  legal_doc_url TEXT,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  status org_status DEFAULT 'pending' NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES public.profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.organizations IS 'Detail organisasi yang terdaftar di platform';
COMMENT ON COLUMN public.organizations.ktp_url IS 'URL KTP pemilik organisasi (private storage)';
COMMENT ON COLUMN public.organizations.legal_doc_url IS 'URL dokumen legal organisasi (private storage)';
COMMENT ON COLUMN public.organizations.verified_by IS 'Admin yang melakukan verifikasi';

-- ----------------------------------------------------------------------------
-- Table: campaigns
-- Description: Campaign metadata (off-chain)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category campaign_category DEFAULT 'lainnya' NOT NULL,
  image_url TEXT,
  target_amount NUMERIC(20, 2) NOT NULL CHECK (target_amount > 0),
  contract_address TEXT,
  status campaign_status DEFAULT 'draft' NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES public.profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR end_date > start_date)
);

COMMENT ON TABLE public.campaigns IS 'Campaign metadata (data finansial ada di blockchain)';
COMMENT ON COLUMN public.campaigns.contract_address IS 'Smart contract address di blockchain';
COMMENT ON COLUMN public.campaigns.target_amount IS 'Target donasi (display only, actual data di blockchain)';

-- ----------------------------------------------------------------------------
-- Table: campaign_updates (Optional - untuk progress updates)
-- Description: Update progress campaign oleh organisasi
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaign_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.campaign_updates IS 'Progress updates untuk campaign';

-- ============================================================================
-- STEP 4: INDEXES (untuk performance)
-- ============================================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_wallet ON public.profiles(wallet_address) WHERE wallet_address IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- Organizations indexes
CREATE INDEX IF NOT EXISTS idx_organizations_status ON public.organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_verified ON public.organizations(is_verified);
CREATE INDEX IF NOT EXISTS idx_organizations_created_at ON public.organizations(created_at DESC);

-- Campaigns indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_creator ON public.campaigns(creator_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON public.campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON public.campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_contract ON public.campaigns(contract_address) WHERE contract_address IS NOT NULL;

-- Campaign updates indexes
CREATE INDEX IF NOT EXISTS idx_campaign_updates_campaign ON public.campaign_updates(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_updates_created_at ON public.campaign_updates(created_at DESC);

-- ============================================================================
-- STEP 5: ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS pada semua tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_updates ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- RLS Policies: profiles
-- ----------------------------------------------------------------------------

-- Public read: Semua orang bisa lihat profil
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  USING (true);

-- Insert: User hanya bisa insert profil sendiri
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Update: User hanya bisa update profil sendiri
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Delete: User bisa delete profil sendiri (cascade akan handle related data)
CREATE POLICY "profiles_delete_own"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- RLS Policies: organizations
-- ----------------------------------------------------------------------------

-- Public read: Semua orang bisa lihat organisasi yang approved
CREATE POLICY "organizations_select_public"
  ON public.organizations FOR SELECT
  USING (
    status = 'approved' 
    OR auth.uid() = id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert: User bisa create aplikasi org sendiri
CREATE POLICY "organizations_insert_own"
  ON public.organizations FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Update: Org owner atau admin bisa update
CREATE POLICY "organizations_update_own_or_admin"
  ON public.organizations FOR UPDATE
  USING (
    auth.uid() = id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ----------------------------------------------------------------------------
-- RLS Policies: campaigns
-- ----------------------------------------------------------------------------

-- Public read: Semua orang bisa lihat campaign yang active
CREATE POLICY "campaigns_select_public"
  ON public.campaigns FOR SELECT
  USING (
    status IN ('active', 'ended')
    OR creator_id IN (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert: Verified org bisa create campaign
CREATE POLICY "campaigns_insert_verified_org"
  ON public.campaigns FOR INSERT
  WITH CHECK (
    auth.uid() = creator_id
    AND EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = auth.uid() AND is_verified = true
    )
  );

-- Update: Campaign creator atau admin bisa update
CREATE POLICY "campaigns_update_creator_or_admin"
  ON public.campaigns FOR UPDATE
  USING (
    creator_id IN (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Delete: Hanya admin yang bisa delete campaign
CREATE POLICY "campaigns_delete_admin_only"
  ON public.campaigns FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ----------------------------------------------------------------------------
-- RLS Policies: campaign_updates
-- ----------------------------------------------------------------------------

-- Public read: Semua orang bisa lihat updates dari active campaigns
CREATE POLICY "campaign_updates_select_public"
  ON public.campaign_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE id = campaign_id AND status IN ('active', 'ended')
    )
  );

-- Insert: Campaign creator bisa create updates
CREATE POLICY "campaign_updates_insert_creator"
  ON public.campaign_updates FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE id = campaign_id AND creator_id = auth.uid()
    )
  );

-- Update: Creator bisa update own updates
CREATE POLICY "campaign_updates_update_creator"
  ON public.campaign_updates FOR UPDATE
  USING (created_by = auth.uid());

-- Delete: Creator atau admin bisa delete updates
CREATE POLICY "campaign_updates_delete_creator_or_admin"
  ON public.campaign_updates FOR DELETE
  USING (
    created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- STEP 6: FUNCTIONS & TRIGGERS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Function: handle_new_user
-- Description: Auto-create profile saat user sign up
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger: on_auth_user_created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Function: update_updated_at_column
-- Description: Auto-update updated_at timestamp
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Apply trigger ke semua tabel dengan updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_organizations_updated_at ON public.organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON public.campaigns;
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Function: update_profile_role_on_org_approval
-- Description: Auto-update role ke 'org' saat organisasi di-approve
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_profile_role_on_org_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Jika status berubah menjadi 'approved', update role di profiles
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    UPDATE public.profiles
    SET role = 'org'
    WHERE id = NEW.id;
    
    -- Set verified_at timestamp
    NEW.verified_at = timezone('utc'::text, now());
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_organization_approved ON public.organizations;
CREATE TRIGGER on_organization_approved
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_role_on_org_approval();

-- ============================================================================
-- STEP 7: STORAGE BUCKETS SETUP
-- ============================================================================

-- NOTE: Storage buckets harus dibuat manual di Supabase Dashboard
-- Berikut adalah instruksi untuk setup:

/*
MANUAL STEPS - Supabase Dashboard > Storage:

1. Create Bucket: 'avatars'
   - Public: YES
   - File size limit: 2MB
   - Allowed MIME types: image/jpeg, image/png, image/webp
   
2. Create Bucket: 'campaigns'
   - Public: YES
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg, image/png, image/webp
   
3. Create Bucket: 'documents'
   - Public: NO (Private)
   - File size limit: 10MB
   - Allowed MIME types: image/jpeg, image/png, application/pdf

Storage Policies akan di-setup otomatis via SQL di bawah:
*/

-- Storage policies untuk bucket 'avatars'
-- (Jalankan setelah bucket dibuat)
/*
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
*/

-- Storage policies untuk bucket 'campaigns'
/*
CREATE POLICY "Campaign images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'campaigns');

CREATE POLICY "Verified orgs can upload campaign images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = auth.uid() AND is_verified = true
    )
  );

CREATE POLICY "Orgs can update their campaign images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Orgs can delete their campaign images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE creator_id = auth.uid()
    )
  );
*/

-- Storage policies untuk bucket 'documents' (Private)
/*
CREATE POLICY "Documents are private - owner and admin only"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own documents"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
*/

-- ============================================================================
-- STEP 8: HELPER FUNCTIONS (Optional - untuk development)
-- ============================================================================

-- Function: Get campaign with organization details
CREATE OR REPLACE FUNCTION public.get_campaign_details(campaign_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'campaign', row_to_json(c.*),
    'organization', row_to_json(o.*),
    'creator_profile', row_to_json(p.*)
  ) INTO result
  FROM public.campaigns c
  JOIN public.organizations o ON c.creator_id = o.id
  JOIN public.profiles p ON o.id = p.id
  WHERE c.id = campaign_uuid;
  
  RETURN result;
END;
$$;

-- ============================================================================
-- STEP 9: SEED DATA (Optional - untuk testing)
-- ============================================================================

-- Create admin user (ganti dengan email Anda)
-- NOTE: User harus sign up dulu via Supabase Auth, baru jalankan query ini

/*
-- Update role user tertentu menjadi admin
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
*/

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================

-- Verification queries (jalankan untuk cek setup):
/*
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Check indexes
SELECT indexname, tablename, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
*/
