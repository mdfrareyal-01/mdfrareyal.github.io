create table public.labs (id uuid primary key default gen_random_uuid(), title text not null, category text not null,
  tools text default '', description text default '', images text[] not null default '{}', created_at timestamptz default now());
create table public.certificates (id uuid primary key default gen_random_uuid(), title text not null, org text not null,
  issued text default '', image text default '', created_at timestamptz default now());
alter table public.labs enable row level security;
alter table public.certificates enable row level security;
create policy "read labs" on public.labs for select using (true);
create policy "read certs" on public.certificates for select using (true);
create policy "admin labs" on public.labs for all to authenticated using (true) with check (true);
create policy "admin certs" on public.certificates for all to authenticated using (true) with check (true);
insert into storage.buckets (id, name, public) values ('labs', 'labs', true);
create policy "admin upload" on storage.objects for insert to authenticated with check (bucket_id = 'labs');
create policy "admin remove" on storage.objects for delete to authenticated using (bucket_id = 'labs');
insert into public.certificates (title, org, issued) values
('CBT&A Methodology, Level 4','PencilBox Training & Development, Dhaka','Sep 2026 – Present'),
('IT Support Level 3 (NSDA)','Skill Guru, Bogura','Jan 2026 – Mar 2026'),
('Advance Digital Marketing, L1 & L2','Future IT, Dhaka','Feb 2024 – Dec 2024'),
('Professional Spoken English','Saifurs, Bogura','Feb 2023 – Apr 2023'),
('MS Office Application (NSDA / BTEB)','Cybertech, Bogura','Oct 2022 – Mar 2023');
