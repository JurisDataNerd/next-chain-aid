-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Public Profile for every User)
create type user_role as enum ('user', 'org', 'admin');

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  wallet_address text unique, -- Linked Web3 Wallet
  role user_role default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. ORGANIZATIONS (Details for Org Role)
create type org_status as enum ('pending', 'approved', 'rejected');

create table public.organizations (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  name text not null,
  description text,
  phone text,
  ktp_url text,           -- Secure URL (Storage)
  legal_doc_url text,     -- Secure URL (Storage)
  is_verified boolean default false,
  status org_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.organizations enable row level security;

-- Policies for Organizations
create policy "Organizations are viewable by everyone"
  on organizations for select
  using ( true );

create policy "Users can create their own org application"
  on organizations for insert
  with check ( auth.uid() = id );

create policy "Org Owner can update their own org"
  on organizations for update
  using ( auth.uid() = id );

-- 3. CAMPAIGNS (Off-chain Metadata)
create type campaign_status as enum ('draft', 'pending_approval', 'active', 'ended', 'frozen');

create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.organizations(id) not null,
  title text not null,
  description text not null,
  image_url text,
  target_amount numeric not null, -- Display only, actual logic on chain
  contract_address text,          -- Address of the deployed Smart Contract
  status campaign_status default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.campaigns enable row level security;

-- Policies for Campaigns
create policy "Active campaigns are viewable by everyone"
  on campaigns for select
  using ( true );

create policy "Org can create campaigns"
  on campaigns for insert
  with check ( auth.uid() = creator_id );

create policy "Org can update own campaigns"
  on campaigns for update
  using ( auth.uid() = creator_id );

-- 4. STORAGE BUCKETS SETUP
-- You must manually create these buckets in Supabase Dashboard -> Storage
-- Buckets: 'campaigns', 'avatars', 'documents'

-- Storage Policies (SQL approximation, you might need to set this in UI)
-- Bucket: campaigns (Public Read)
-- Bucket: avatars (Public Read)
-- Bucket: documents (Private, only Org and Admin read)

-- Trigger to create Profile on Signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
