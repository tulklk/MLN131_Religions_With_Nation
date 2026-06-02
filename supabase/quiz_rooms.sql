create table if not exists public.quiz_rooms (
  code text primary key,
  state jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_quiz_rooms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_quiz_rooms_updated_at on public.quiz_rooms;
create trigger trg_quiz_rooms_updated_at
before update on public.quiz_rooms
for each row
execute function public.set_quiz_rooms_updated_at();

alter table public.quiz_rooms replica identity full;

-- Bat Realtime (an toan neu da bat truoc do)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'quiz_rooms'
  ) then
    alter publication supabase_realtime add table public.quiz_rooms;
  end if;
end $$;

-- Cho phep API ghi bang publishable/anon key (neu khong dung service_role)
alter table public.quiz_rooms disable row level security;

