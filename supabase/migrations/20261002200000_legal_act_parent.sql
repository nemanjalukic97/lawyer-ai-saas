-- Enabling-clause citations. One row per "Закона о" / "Zakona o" parsed
-- from the act's opening chunk, between the enabling formula and the
-- enacting verb. parent_law_name_local stays null until that parsed
-- title normalises to exactly one law_name_local in the same jurisdiction.
--
-- Do not apply from the agent. Owner applies in the SQL editor / CLI.
-- Order:
--   1. this file (empty table)
--   2. scripts/legal-act-parent-rename.sql
--   3. scripts/legal-act-parent-insert.sql
--
-- Service role reads and replaces rows from lib/legalActParent.ts.
-- No anon or authenticated access — this is not a user-facing table.
-- Row counts are not stored; the research response counts legal_articles.

CREATE TABLE IF NOT EXISTS public.legal_act_parent (
  jurisdiction text NOT NULL,
  child_law_name_local text NOT NULL,
  parent_ordinal integer NOT NULL CHECK (parent_ordinal >= 1),
  parent_name_parsed text NOT NULL,
  parent_law_name_local text,
  PRIMARY KEY (jurisdiction, child_law_name_local, parent_ordinal)
);

COMMENT ON TABLE public.legal_act_parent IS
  'Parsed enabling-clause cites. parent_law_name_local is null when the normalised title is absent or ambiguous.';

COMMENT ON COLUMN public.legal_act_parent.parent_ordinal IS
  '1 is the first Zakona o / Закона о after the enabling formula. At most four are parsed.';

COMMENT ON COLUMN public.legal_act_parent.parent_law_name_local IS
  'Corpus law_name_local when the normalised title matches exactly one act in the jurisdiction.';

CREATE INDEX IF NOT EXISTS legal_act_parent_resolved_parent_idx
  ON public.legal_act_parent (jurisdiction, parent_law_name_local)
  WHERE parent_law_name_local IS NOT NULL;

ALTER TABLE public.legal_act_parent ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.legal_act_parent FROM PUBLIC;
REVOKE ALL ON TABLE public.legal_act_parent FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.legal_act_parent TO service_role;
