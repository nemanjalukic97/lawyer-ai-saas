-- Capped document-frequency count for keyword IDF weights.
-- Full count(*) on common tokens is multi-second; ln(N/df) does not
-- need precision past this cap. Service role only — not a user RPC.
-- LIMIT stops the scan once enough matches exist.

CREATE OR REPLACE FUNCTION public.count_legal_articles_matching_capped(
  p_jurisdiction text,
  p_patterns text[],
  p_cap integer
)
RETURNS integer
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  SET LOCAL plan_cache_mode = 'force_custom_plan';

  IF p_patterns IS NULL OR cardinality(p_patterns) = 0 THEN
    RETURN 0;
  END IF;

  -- LIMIT stops the scan once enough matches exist. Distinct is not
  -- required for IDF: overcount from overlapping patterns still lands
  -- at or above the cap for common tokens.
  RETURN (
    SELECT count(*)::int
    FROM (
      SELECT 1
      FROM public.legal_articles la
      WHERE la.jurisdiction = p_jurisdiction
        AND la.text_local IS NOT NULL
        AND la.text_local ILIKE ANY (p_patterns)
      LIMIT LEAST(GREATEST(COALESCE(p_cap, 0), 0), 100000)
    ) s
  );
END;
$$;

REVOKE ALL ON FUNCTION public.count_legal_articles_matching_capped(text, text[], integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.count_legal_articles_matching_capped(text, text[], integer) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_legal_articles_matching_capped(text, text[], integer) TO service_role;

COMMENT ON FUNCTION public.count_legal_articles_matching_capped(text, text[], integer) IS
  'IDF df lookup: count matching legal_articles rows up to p_cap. Service role only.';
