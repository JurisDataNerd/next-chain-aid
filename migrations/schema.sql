-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admin_actions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  admin_id uuid NOT NULL,
  action_type text NOT NULL,
  target_type text NOT NULL,
  target_id uuid NOT NULL,
  details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT admin_actions_pkey PRIMARY KEY (id),
  CONSTRAINT admin_actions_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.campaign_update_images (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  campaign_update_id uuid NOT NULL,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT campaign_update_images_pkey PRIMARY KEY (id),
  CONSTRAINT campaign_update_images_campaign_update_id_fkey FOREIGN KEY (campaign_update_id) REFERENCES public.campaign_updates(id)
);
CREATE TABLE public.campaign_updates (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  campaign_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT campaign_updates_pkey PRIMARY KEY (id),
  CONSTRAINT campaign_updates_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id),
  CONSTRAINT campaign_updates_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.campaigns (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  creator_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category USER-DEFINED NOT NULL DEFAULT 'lainnya'::campaign_category,
  image_url text,
  target_amount numeric NOT NULL CHECK (target_amount > 0::numeric),
  contract_address text,
  status USER-DEFINED NOT NULL DEFAULT 'draft'::campaign_status,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  approved_at timestamp with time zone,
  approved_by uuid,
  rejection_reason text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  is_frozen boolean DEFAULT false,
  frozen_at timestamp with time zone,
  frozen_by uuid,
  freeze_reason text,
  CONSTRAINT campaigns_pkey PRIMARY KEY (id),
  CONSTRAINT campaigns_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.organizations(id),
  CONSTRAINT campaigns_approved_by_fkey FOREIGN KEY (approved_by) REFERENCES public.profiles(id),
  CONSTRAINT campaigns_frozen_by_fkey FOREIGN KEY (frozen_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.organizations (
  id uuid NOT NULL,
  name text NOT NULL,
  description text,
  phone text,
  address text,
  website text,
  ktp_url text,
  legal_doc_url text,
  is_verified boolean NOT NULL DEFAULT false,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::org_status,
  verified_at timestamp with time zone,
  verified_by uuid,
  rejection_reason text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  image_url text,
  is_banned boolean DEFAULT false,
  banned_at timestamp with time zone,
  banned_by uuid,
  ban_reason text,
  CONSTRAINT organizations_pkey PRIMARY KEY (id),
  CONSTRAINT organizations_id_fkey FOREIGN KEY (id) REFERENCES public.profiles(id),
  CONSTRAINT organizations_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id),
  CONSTRAINT organizations_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text,
  full_name text,
  avatar_url text,
  wallet_address text UNIQUE,
  role USER-DEFINED NOT NULL DEFAULT 'user'::user_role,
  bio text,
  phone text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);