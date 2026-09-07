create type public.withdrawal_status as enum ('pending', 'approved', 'rejected', 'completed');

create table public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.investor_accounts(id) on delete restrict,
  amount numeric(20, 2) not null check (amount > 0),
  status public.withdrawal_status not null default 'pending',
  payment_method text,
  payment_reference text,
  rejection_reason text,
  processed_by uuid references auth.users(id),
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.withdrawal_requests enable row level security;

create policy "Partners can view own requests" on public.withdrawal_requests for select
  using (exists (select 1 from public.investor_accounts where id = account_id and user_id = auth.uid()) or public.is_admin());

create policy "Partners can create requests" on public.withdrawal_requests for insert
  with check (exists (select 1 from public.investor_accounts where id = account_id and user_id = auth.uid()));

create policy "Admins can manage all requests" on public.withdrawal_requests for all
  using (public.is_admin()) with check (public.is_admin());

alter publication supabase_realtime add table public.withdrawal_requests;
