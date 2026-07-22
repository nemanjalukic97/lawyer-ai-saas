-- Firm trial lifecycle: auto-grant on signup + pre-expiry warning column

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS trial_warning_sent_at TIMESTAMPTZ;

ALTER TABLE public.law_firms
  ADD COLUMN IF NOT EXISTS trial_warning_sent_at TIMESTAMPTZ;

COMMENT ON COLUMN public.user_profiles.trial_warning_sent_at IS
  'When the pre-expiry Firm trial warning email was sent; null means not yet warned.';
COMMENT ON COLUMN public.law_firms.trial_warning_sent_at IS
  'When the pre-expiry Firm trial warning email was sent; null means not yet warned.';

-- Recreate signup trigger function: Firm trial for 30 days on solo signup.
-- Invited members (raw_user_meta_data.law_firm_id set) inherit the firm tier — no independent trial.
CREATE OR REPLACE FUNCTION public.create_profile_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  meta_firm_id uuid;
BEGIN
  meta_firm_id := NULLIF(NEW.raw_user_meta_data->>'law_firm_id', '')::uuid;

  IF meta_firm_id IS NULL THEN
    INSERT INTO public.user_profiles (
      id,
      full_name,
      preferred_jurisdiction,
      preferred_language,
      subscription_tier,
      subscription_status,
      trial_ends_at,
      active,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      COALESCE(
        (NEW.raw_user_meta_data->>'preferred_jurisdiction')::jurisdiction,
        'serbia'::jurisdiction
      ),
      'en',
      'firm'::subscription_tier,
      'trial'::subscription_status,
      NOW() + INTERVAL '30 days',
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  ELSE
    INSERT INTO public.user_profiles (
      id,
      full_name,
      law_firm_id,
      preferred_jurisdiction,
      preferred_language,
      subscription_tier,
      subscription_status,
      trial_ends_at,
      active,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      meta_firm_id,
      COALESCE(
        (NEW.raw_user_meta_data->>'preferred_jurisdiction')::jurisdiction,
        'serbia'::jurisdiction
      ),
      'en',
      NULL,
      NULL,
      NULL,
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;
