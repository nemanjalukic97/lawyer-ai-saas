-- Run on any Supabase project that does not yet have this column (already applied on LawModel).
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS theme_preference text NOT NULL DEFAULT 'light'
CHECK (theme_preference IN ('light', 'dark'));

COMMENT ON COLUMN public.user_profiles.theme_preference IS 'UI theme: light or dark';
