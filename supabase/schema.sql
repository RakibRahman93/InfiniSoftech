-- NOTE: Schema is now managed by Prisma (`prisma/schema.prisma`).
-- Run `npx prisma db push` to sync the database. This file is kept for
-- reference only and describes the same tables (snake_case → camelCase mapping).

-- ============================================================
-- Settings (key/value pairs used by the admin Settings panel)
-- ============================================================
create table if not exists public.settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

alter table public.settings enable row level security;
drop policy if exists "settings_all" on public.settings;
create policy "settings_all" on public.settings
  for all using (true) with check (true);

-- ============================================================
-- Admin users (single row seeded from ADMIN_EMAIL / ADMIN_PASSWORD)
-- ============================================================
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  salt text,
  otp_hash text,
  otp_expires_at timestamptz,
  otp_enabled boolean default true,
  last_login_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.admin_users enable row level security;
drop policy if exists "admin_users_all" on public.admin_users;
create policy "admin_users_all" on public.admin_users
  for all using (true) with check (true);

-- ============================================================
-- Blogs
-- ============================================================
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text,
  excerpt text,
  content text,
  author text default 'InfiniSoft Team',
  cover text,
  status text default 'published',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.blogs enable row level security;
drop policy if exists "blogs_all" on public.blogs;
create policy "blogs_all" on public.blogs
  for all using (true) with check (true);

-- ============================================================
-- FAQs
-- ============================================================
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer text,
  "order" int default 0,
  created_at timestamptz default now()
);

alter table public.faqs enable row level security;
drop policy if exists "faqs_all" on public.faqs;
create policy "faqs_all" on public.faqs
  for all using (true) with check (true);

-- ============================================================
-- Leads (contact form submissions)
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  company text,
  message text,
  source text default 'Contact form',
  status text default 'New',
  created_at timestamptz default now(),
  inserted_at timestamptz default now()
);

alter table public.leads enable row level security;
drop policy if exists "leads_all" on public.leads;
create policy "leads_all" on public.leads
  for all using (true) with check (true);

-- ============================================================
-- Messages (live chat)
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  content text,
  username text,
  inserted_at timestamptz default now()
);

alter table public.messages enable row level security;
drop policy if exists "messages_all" on public.messages;
create policy "messages_all" on public.messages
  for all using (true) with check (true);