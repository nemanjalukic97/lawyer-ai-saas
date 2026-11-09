-- New signups store no interface language.
-- preferred_language NULL means the person has not chosen one.
-- Existing rows are not updated. A literal 'en' written by the old trigger
-- cannot be told apart from a user who stored the code 'en', so nothing is backfilled.
-- The app still treats exact 'en' as unset. The display name 'English' remains a choice.
-- Written for Nemanja to run. Do not apply from the agent.

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
      NULL,
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
      NULL,
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
