create table if not exists public.performance_entries (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  transaction_type text not null check (transaction_type in ('investment', 'payout', 'return', 'repayment', 'adjustment')),
  transaction_date date not null,
  investment_amount numeric(20, 2) not null default 0 check (investment_amount >= 0),
  payout_amount numeric(20, 2) not null default 0 check (payout_amount >= 0),
  roi numeric(12, 6),
  notes text,
  source text not null default 'manual' check (source in ('manual', 'excel')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists performance_entries_date_idx on public.performance_entries (transaction_date desc);
create index if not exists performance_entries_partner_idx on public.performance_entries (partner_name);

alter table public.performance_entries enable row level security;
drop policy if exists "Admins manage performance entries" on public.performance_entries;
create policy "Admins manage performance entries" on public.performance_entries
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users view performance entries" on public.performance_entries;
drop policy if exists "Admins view performance entries" on public.performance_entries;
create policy "Admins view performance entries" on public.performance_entries
  for select using (public.is_admin());
