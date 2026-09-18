-- Update is_admin() function to check only the role column
-- (profiles table has no 'email' column; admin status is managed via the 'role' field)

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and role = 'admin'
  );
$$;

-- Profiles policies remain role‑based
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select 
  using (id = auth.uid() or public.is_admin());

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles for all 
  using (public.is_admin()) with check (public.is_admin());