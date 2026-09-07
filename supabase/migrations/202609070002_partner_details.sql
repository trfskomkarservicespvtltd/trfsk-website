alter table public.investor_accounts
  add column if not exists rate numeric(12, 6) not null default 0,
  add column if not exists rate_type text not null default 'monthly' check (rate_type in ('monthly', 'annual')),
  add column if not exists due_day integer not null default 10 check (due_day between 1 and 28),
  add column if not exists kyc_status text not null default 'pending' check (kyc_status in ('pending', 'submitted', 'verified', 'rejected'));

create table if not exists public.partner_details (
  user_id uuid primary key references auth.users(id) on delete cascade,
  address text not null default '', city text not null default '', state text not null default '', pincode text not null default '',
  pan text not null default '', aadhaar text not null default '', bank_name text not null default '', bank_account_name text not null default '',
  bank_account_no text not null default '', ifsc text not null default '', pan_document_path text, aadhaar_document_path text,
  updated_at timestamptz not null default now()
);

alter table public.partner_details enable row level security;
create policy "Partners manage own details" on public.partner_details for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

insert into public.partner_details (user_id)
select id from public.profiles on conflict (user_id) do nothing;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email)) on conflict (id) do nothing;
  insert into public.investor_accounts (user_id, account_code) values (new.id, 'TRF-' || upper(substr(replace(new.id::text, '-', ''), 1, 10))) on conflict (user_id) do nothing;
  insert into public.partner_details (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;