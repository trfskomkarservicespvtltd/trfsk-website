update public.profiles as profiles
set full_name = user_data.raw_user_meta_data ->> 'full_name'
from auth.users as user_data
where profiles.id = user_data.id
  and nullif(trim(user_data.raw_user_meta_data ->> 'full_name'), '') is not null
  and (
    profiles.full_name is null
    or lower(trim(profiles.full_name)) = lower(trim(coalesce(user_data.email, '')))
  );

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), new.email))
  on conflict (id) do update set full_name = coalesce(nullif(trim(excluded.full_name), ''), public.profiles.full_name);

  insert into public.investor_accounts (user_id, account_code)
  values (new.id, 'TRF-' || upper(substr(replace(new.id::text, '-', ''), 1, 10)))
  on conflict (user_id) do nothing;

  insert into public.partner_details (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;
