create or replace function public.record_monthly_payout(
  payout_account_id uuid,
  payout_amount numeric,
  payout_period_start date,
  payout_period_end date,
  payout_notes text,
  admin_id uuid
)
returns public.ledger_entries
language plpgsql
security definer
set search_path = public
as $$
declare
  payout_entry public.ledger_entries;
  payout_reference text := 'PAYOUT-' || payout_account_id::text || '-' || payout_period_start::text || '-' || payout_period_end::text;
begin
  if admin_id <> auth.uid() or not public.is_admin() then
    raise exception 'Only admins can record monthly payouts';
  end if;

  if payout_amount <= 0 or payout_period_end < payout_period_start then
    raise exception 'Invalid monthly payout details';
  end if;

  insert into public.return_periods (
    account_id,
    period_start,
    period_end,
    return_amount,
    status,
    approved_by,
    approved_at
  ) values (
    payout_account_id,
    payout_period_start,
    payout_period_end,
    payout_amount,
    'approved',
    admin_id,
    now()
  ) on conflict (account_id, period_start, period_end) do nothing;

  if not exists (
    select 1 from public.return_periods
    where account_id = payout_account_id
      and period_start = payout_period_start
      and period_end = payout_period_end
      and return_amount = payout_amount
      and status = 'approved'
  ) then
    raise exception 'Monthly payout already exists or does not match';
  end if;

  insert into public.ledger_entries (
    account_id,
    entry_type,
    amount,
    effective_at,
    reference,
    notes,
    created_by
  ) values (
    payout_account_id,
    'return',
    payout_amount,
    now(),
    payout_reference,
    coalesce(payout_notes, 'Monthly payout'),
    admin_id
  ) on conflict (reference) do nothing
  returning * into payout_entry;

  if payout_entry.id is null then
    select * into payout_entry from public.ledger_entries where reference = payout_reference;
  end if;

  return payout_entry;
end;
$$;

grant execute on function public.record_monthly_payout(uuid, numeric, date, date, text, uuid) to authenticated;
