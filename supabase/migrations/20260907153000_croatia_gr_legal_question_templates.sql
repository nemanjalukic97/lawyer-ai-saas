-- Rewrite Croatian Gr (delegacija / sukob nadležnosti / izuzeće) legal_question
-- so it describes the procedural ruling, not the underlying dispute.
--
-- Apply in the Supabase SQL editor. Does not change embeddings — run
--   npx tsx scripts/reembed-croatia-gr-questions.ts --confirm
-- after this UPDATE.
--
-- Classification is from court_position (izreka) only. Reasoning is ignored
-- so passing mentions of izuzeće/delegacija do not steal the template.
--
-- Expected split (276 rows):
--   izuzeće      8   -> Osnovanost zahtjeva za izuzeće suca?
--   delegacija  36   -> Osnovanost zahtjeva za delegaciju?
--   nadležnost 232   -> Koji je sud stvarno nadležan?
--                      (127 sukob + 77 "određuje se [sud]" that mentioned
--                       delegacija only in reasoning + 28 other venue-transfer)
--
-- Serbia / FBiH Gr-prefix false positives are excluded by jurisdiction.

UPDATE case_law
SET legal_question = CASE
  WHEN court_position ILIKE '%izuze%' THEN
    'Osnovanost zahtjeva za izuzeće suca?'
  WHEN court_position ILIKE '%delegacij%' THEN
    'Osnovanost zahtjeva za delegaciju?'
  ELSE
    'Koji je sud stvarno nadležan?'
END
WHERE jurisdiction = 'croatia'
  AND case_number ILIKE 'Gr%';
