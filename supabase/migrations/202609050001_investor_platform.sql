create type public.user_role as enum ('investor', 'admin');
create type public.account_status as enum ('active', 'paused', 'closed');
create type public.ledger_entry_type as enum ('contribution', 'withdrawal', 'return', 'adjustment');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'investor',
  created_at timestamptz not null default now()
);

create table public.investor_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  account_code text not null unique,
  currency text not null default 'INR',
  status public.account_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.investor_accounts(id) on delete restrict,
  entry_type public.ledger_entry_type not null,
  amount numeric(20, 2) not null check (amount > 0),
  effective_at timestamptz not null default now(),
  reference text not null unique,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.return_periods (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.investor_accounts(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  return_amount numeric(20, 2) not null check (return_amount >= 0),
  return_rate numeric(12, 6),
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique(account_id, period_start, period_end)
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.investor_accounts enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.return_periods enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "Users read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Investors read own account" on public.investor_accounts for select using (user_id = auth.uid() or public.is_admin());
create policy "Admins manage accounts" on public.investor_accounts for all using (public.is_admin()) with check (public.is_admin());
create policy "Investors read own ledger" on public.ledger_entries for select using (exists (select 1 from public.investor_accounts where id = account_id and user_id = auth.uid()) or public.is_admin());
create policy "Admins manage ledger" on public.ledger_entries for all using (public.is_admin()) with check (public.is_admin());
create policy "Investors read own returns" on public.return_periods for select using (exists (select 1 from public.investor_accounts where id = account_id and user_id = auth.uid()) or public.is_admin());
create policy "Admins manage returns" on public.return_periods for all using (public.is_admin()) with check (public.is_admin());

alter publication supabase_realtime add table public.ledger_entries;
alter publication supabase_realtime add table public.return_periods;