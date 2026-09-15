-- Update is_admin() function to also check for configured admin email
-- This matches the logic in app/lib/auth.ts

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and (role = 'admin' or email = 'omkar@admin.com')
  );
$$;

-- Also update the profiles policy to allow admin email to read all profiles
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select 
  using (id = auth.uid() or public.is_admin());

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles for all 
  using (public.is_admin()) with check (public.is_admin());