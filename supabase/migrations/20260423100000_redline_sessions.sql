-- Redline sessions for document redlining feature

create table if not exists public.redline_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  law_firm_id uuid null,
  original_filename text not null,
  original_content text not null,
  redlined_content text not null,
  changes jsonb not null default '[]'::jsonb,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

create index if not exists redline_sessions_user_created_at_idx
  on public.redline_sessions (user_id, created_at desc);

alter table public.redline_sessions enable row level security;

drop policy if exists select_own on public.redline_sessions;
create policy select_own
  on public.redline_sessions
  for select
  using (user_id = auth.uid());

drop policy if exists insert_own on public.redline_sessions;
create policy insert_own
  on public.redline_sessions
  for insert
  with check (user_id = auth.uid());

