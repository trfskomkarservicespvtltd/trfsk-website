create table public.partner_opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text,
  status text default 'Open for review',
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.partner_opportunities enable row level security;

create policy "Anyone can view active opportunities" on public.partner_opportunities for select using (is_active = true);
create policy "Admins can manage opportunities" on public.partner_opportunities for all using (public.is_admin()) with check (public.is_admin());