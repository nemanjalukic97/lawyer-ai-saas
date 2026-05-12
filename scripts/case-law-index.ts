// scripts/case-law-index.ts
// Import all case law arrays as they are created and spread them here.

import type { CaseLawInput } from "./ingest-case-law"
import { CASE_LAW_LABOR_SERBIA_3 } from "./case-law-labor-serbia-3"
import { CASE_LAW_LABOR_SERBIA_4 } from "./case-law-labor-serbia-4"
import { CASE_LAW_LABOR_SERBIA_5 } from "./case-law-labor-serbia-5"

export const ALL_CASE_LAW: CaseLawInput[] = [
  ...CASE_LAW_LABOR_SERBIA_3,
  ...CASE_LAW_LABOR_SERBIA_4,
  ...CASE_LAW_LABOR_SERBIA_5,
]
