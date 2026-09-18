-- Signup attribution: first-touch UTM + referrer host + landing path.
-- Existing rows stay NULL. Do not backfill.
-- Apply in the Supabase SQL editor. Do not invent values for past users.

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS signup_utm_source text,
  ADD COLUMN IF NOT EXISTS signup_utm_medium text,
  ADD COLUMN IF NOT EXISTS signup_utm_campaign text,
  ADD COLUMN IF NOT EXISTS signup_utm_content text,
  ADD COLUMN IF NOT EXISTS signup_utm_term text,
  ADD COLUMN IF NOT EXISTS signup_referrer_host text,
  ADD COLUMN IF NOT EXISTS signup_landing_path text;

COMMENT ON COLUMN public.user_profiles.signup_utm_source IS
  'First-touch utm_source at registration. Null for users who signed up before capture existed.';
COMMENT ON COLUMN public.user_profiles.signup_utm_medium IS
  'First-touch utm_medium at registration.';
COMMENT ON COLUMN public.user_profiles.signup_utm_campaign IS
  'First-touch utm_campaign at registration.';
COMMENT ON COLUMN public.user_profiles.signup_utm_content IS
  'First-touch utm_content at registration.';
COMMENT ON COLUMN public.user_profiles.signup_utm_term IS
  'First-touch utm_term at registration.';
COMMENT ON COLUMN public.user_profiles.signup_referrer_host IS
  'Hostname only of document.referrer at first touch. Never a full URL or query string.';
COMMENT ON COLUMN public.user_profiles.signup_landing_path IS
  'Pathname of the first page in the signup session, with no query string.';

CREATE OR REPLACE FUNCTION public.protect_signup_attribution()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.signup_landing_path IS NOT NULL
     OR OLD.signup_utm_source IS NOT NULL
     OR OLD.signup_utm_medium IS NOT NULL
     OR OLD.signup_utm_campaign IS NOT NULL
     OR OLD.signup_utm_content IS NOT NULL
     OR OLD.signup_utm_term IS NOT NULL
     OR OLD.signup_referrer_host IS NOT NULL
  THEN
    NEW.signup_utm_source := OLD.signup_utm_source;
    NEW.signup_utm_medium := OLD.signup_utm_medium;
    NEW.signup_utm_campaign := OLD.signup_utm_campaign;
    NEW.signup_utm_content := OLD.signup_utm_content;
    NEW.signup_utm_term := OLD.signup_utm_term;
    NEW.signup_referrer_host := OLD.signup_referrer_host;
    NEW.signup_landing_path := OLD.signup_landing_path;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS user_profiles_signup_attribution_write_once
  ON public.user_profiles;

CREATE TRIGGER user_profiles_signup_attribution_write_once
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_signup_attribution();
