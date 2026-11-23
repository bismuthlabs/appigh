# Supabase storage

The app stores booking records in `public.bookings` and consented WhatsApp
notification signups in `public.therapist_notification_signups`. Therapist
profiles, provider availability and analytics events are not stored in Supabase.

1. Apply the migrations in order in the Supabase SQL Editor or with the Supabase
   CLI: `20261117000000_create_bookings.sql`,
   `20261121000000_create_therapist_notification_signups.sql`, then
   `20261122000000_add_notification_consent.sql`.
2. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project settings.
3. Keep the service-role key server-only. Do not prefix it with `NEXT_PUBLIC_`
   or expose it in browser code.

Both tables have row-level security enabled and grant access only to
`service_role`. Server route handlers create bookings, retrieve a booking
confirmation with its one-time-per-booking secret token, and manage notification
signups. Booking and unsubscribe tokens are stored as SHA-256 hashes. Notification
signups require recorded marketing consent and include an opt-out timestamp.

book a massage
massage therapist in Kumasi
massage
massage near me
book a massage appointment
massage booking online
home massage service Accra
massage therapist at home
in-home massage booking
Swedish massage
massage services in Kumasi
massage prices
