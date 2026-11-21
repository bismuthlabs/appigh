create table if not exists public.therapist_notification_signups (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null unique,
  created_at timestamptz not null default now()
);

alter table public.therapist_notification_signups enable row level security;
revoke all on table public.therapist_notification_signups from public, anon, authenticated;
grant all on table public.therapist_notification_signups to service_role;
