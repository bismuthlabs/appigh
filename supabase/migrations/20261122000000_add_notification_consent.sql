alter table public.therapist_notification_signups
  add column if not exists marketing_consent_at timestamptz,
  add column if not exists unsubscribe_token_hash text,
  add column if not exists unsubscribed_at timestamptz;

create unique index if not exists therapist_notification_unsubscribe_token_idx
  on public.therapist_notification_signups (unsubscribe_token_hash)
  where unsubscribe_token_hash is not null;
