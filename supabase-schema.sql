-- ============================================================
-- HOSPIQ ADMIN — Full Schema
-- Run this in Supabase → SQL Editor
-- ============================================================

-- 1. LEADS (already exists, add missing columns)
alter table if exists leads
  add column if not exists notes text,
  add column if not exists status text default 'new';

-- If leads table doesn't exist yet:
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  business_name text not null,
  business_type text not null,
  message text not null,
  status text default 'new',
  notes text
);

-- 2. CLIENTS
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  business_name text not null,
  business_type text not null,
  country text,
  lead_id uuid references leads(id) on delete set null,
  status text default 'active',
  notes text,
  total_billed numeric default 0
);

-- 3. PROJECTS
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  client_id uuid references clients(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'proposal',
  start_date date,
  due_date date,
  budget numeric,
  paid numeric default 0,
  milestones jsonb default '[]'::jsonb
);

-- 4. INVOICES
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  invoice_number text,
  client_id uuid references clients(id) on delete cascade not null,
  project_id uuid references projects(id) on delete set null,
  items jsonb default '[]'::jsonb,
  subtotal numeric default 0,
  tax numeric default 0,
  total numeric default 0,
  status text default 'draft',
  due_date date,
  paid_date date,
  notes text
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table leads enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table invoices enable row level security;

-- Public can insert leads (contact form)
drop policy if exists "Allow public insert leads" on leads;
create policy "Allow public insert leads" on leads
  for insert with check (true);

-- Admin can read/update/delete everything (using anon key from env)
drop policy if exists "Allow all for leads" on leads;
create policy "Allow all for leads" on leads
  for all using (true) with check (true);

drop policy if exists "Allow all for clients" on clients;
create policy "Allow all for clients" on clients
  for all using (true) with check (true);

drop policy if exists "Allow all for projects" on projects;
create policy "Allow all for projects" on projects
  for all using (true) with check (true);

drop policy if exists "Allow all for invoices" on invoices;
create policy "Allow all for invoices" on invoices
  for all using (true) with check (true);
