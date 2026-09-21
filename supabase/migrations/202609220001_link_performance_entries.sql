alter table public.performance_entries
  add column if not exists account_id uuid references public.investor_accounts(id) on delete set null;

create index if not exists performance_entries_account_idx on public.performance_entries (account_id);

update public.performance_entries entry
set account_id = matches.account_id
from (
  select pe.id, min(ia.id) as account_id
  from public.performance_entries pe
  join public.profiles p on lower(trim(p.full_name)) = lower(trim(pe.partner_name))
  join public.investor_accounts ia on ia.user_id = p.id
  where pe.account_id is null
  group by pe.id
  having count(ia.id) = 1
) matches
where entry.id = matches.id;

drop policy if exists "Authenticated users view performance entries" on public.performance_entries;
drop policy if exists "Partners view linked performance entries" on public.performance_entries;
create policy "Partners view linked performance entries" on public.performance_entries
  for select using (
    exists (
      select 1
      from public.investor_accounts
      where investor_accounts.id = performance_entries.account_id
        and investor_accounts.user_id = auth.uid()
    )
  );