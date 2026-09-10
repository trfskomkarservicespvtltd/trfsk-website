create or replace function public.approve_fund_addition_request(request_id uuid, admin_id uuid)
returns public.fund_addition_requests
language plpgsql
security definer
set search_path = public
as $$
declare
  approved_request public.fund_addition_requests;
begin
  if admin_id <> auth.uid() or not public.is_admin() then
    raise exception 'Only admins can approve fund additions';
  end if;

  update public.fund_addition_requests
  set status = 'approved',
      processed_by = admin_id,
      processed_at = now(),
      rejection_reason = null
  where id = request_id
    and status = 'pending'
  returning * into approved_request;

  if approved_request.id is null then
    raise exception 'Fund addition request is missing or already processed';
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
    approved_request.account_id,
    'contribution',
    approved_request.amount,
    now(),
    'FA-' || approved_request.id::text,
    'Fund addition request approved after payment verification',
    admin_id
  ) on conflict (reference) do nothing;

  return approved_request;
end;
$$;

grant execute on function public.approve_fund_addition_request(uuid, uuid) to authenticated;
