create table if not exists public.therapist_notification_signups (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null unique,
  marketing_consent_at timestamptz,
  unsubscribe_token_hash text,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists therapist_notification_unsubscribe_token_idx
  on public.therapist_notification_signups (unsubscribe_token_hash)
  where unsubscribe_token_hash is not null;

alter table public.therapist_notification_signups enable row level security;
revoke all on table public.therapist_notification_signups from public, anon, authenticated;
grant all on table public.therapist_notification_signups to service_role;
