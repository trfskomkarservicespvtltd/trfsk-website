create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do nothing;

  insert into public.investor_accounts (user_id, account_code)
  values (new.id, 'TRF-' || upper(substr(replace(new.id::text, '-', ''), 1, 10)))
  on conflict (user_id) do nothing;

  return new;
end;
$$;

insert into public.investor_accounts (user_id, account_code)
select p.id, 'TRF-' || upper(substr(replace(p.id::text, '-', ''), 1, 10))
from public.profiles p
where not exists (
  select 1 from public.investor_accounts a where a.user_id = p.id
)
on conflict (user_id) do nothing;
