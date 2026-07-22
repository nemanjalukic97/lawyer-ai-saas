-- Welcome modal: show once on first dashboard visit after Firm trial signup.
-- Backfill marks all existing profiles as already seen so current trial users
-- (who already received personal welcome emails) do not get the popup.

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS welcome_modal_seen_at TIMESTAMPTZ;

COMMENT ON COLUMN public.user_profiles.welcome_modal_seen_at IS
  'When the Firm trial welcome modal was dismissed; null means not yet shown/seen.';

UPDATE public.user_profiles
SET welcome_modal_seen_at = now()
WHERE welcome_modal_seen_at IS NULL;
