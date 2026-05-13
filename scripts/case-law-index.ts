// scripts/case-law-index.ts
// Import all case law arrays as they are created and spread them here.

import type { CaseLawInput } from "./ingest-case-law"
import { CASE_LAW_CIVIL_SERBIA_1 } from "./case-law-civil-serbia-1"
import { CASE_LAW_CIVIL_SERBIA_2 } from "./case-law-civil-serbia-2"
import { CASE_LAW_CIVIL_SERBIA_3 } from "./case-law-civil-serbia-3"
import { CASE_LAW_CIVIL_SERBIA_4 } from "./case-law-civil-serbia-4"
import { CASE_LAW_CIVIL_SERBIA_5 } from "./case-law-civil-serbia-5"
import { CASE_LAW_LABOR_SERBIA_3 } from "./case-law-labor-serbia-3"
import { CASE_LAW_LABOR_SERBIA_4 } from "./case-law-labor-serbia-4"
import { CASE_LAW_LABOR_SERBIA_5 } from "./case-law-labor-serbia-5"
import { CASE_LAW_LABOR_SERBIA_7 } from "./case-law-labor-serbia-7"
import { CASE_LAW_LABOR_SERBIA_8 } from "./case-law-labor-serbia-8"
import { CASE_LAW_FAMILY_SERBIA_1 } from "./case-law-family-serbia-1"
import { CASE_LAW_FAMILY_SERBIA_2 } from "./case-law-family-serbia-2"
import { CASE_LAW_FAMILY_SERBIA_3 } from "./case-law-family-serbia-3"
import { CASE_LAW_COMMERCIAL_SERBIA_1 } from "./case-law-commercial-serbia-1"
import { CASE_LAW_COMMERCIAL_SERBIA_2 } from "./case-law-commercial-serbia-2"
import { CASE_LAW_COMMERCIAL_SERBIA_3 } from "./case-law-commercial-serbia-3"
import { CASE_LAW_INHERITANCE_SERBIA_1 } from "./case-law-inheritance-serbia-1"
import { CASE_LAW_INHERITANCE_SERBIA_2 } from "./case-law-inheritance-serbia-2"
import { CASE_LAW_ADMINISTRATIVE_SERBIA_1 } from "./case-law-administrative-serbia-1"
import { CASE_LAW_ADMINISTRATIVE_SERBIA_2 } from "./case-law-administrative-serbia-2"
import { CASE_LAW_CRIMINAL_SERBIA_1 } from "./case-law-criminal-serbia-1"
import { CASE_LAW_CRIMINAL_SERBIA_2 } from "./case-law-criminal-serbia-2"

export const ALL_CASE_LAW: CaseLawInput[] = [
  ...CASE_LAW_CIVIL_SERBIA_1,
  ...CASE_LAW_CIVIL_SERBIA_2,
  ...CASE_LAW_CIVIL_SERBIA_3,
  ...CASE_LAW_CIVIL_SERBIA_4,
  ...CASE_LAW_CIVIL_SERBIA_5,
  ...CASE_LAW_LABOR_SERBIA_3,
  ...CASE_LAW_LABOR_SERBIA_4,
  ...CASE_LAW_LABOR_SERBIA_5,
  ...CASE_LAW_LABOR_SERBIA_7,
  ...CASE_LAW_LABOR_SERBIA_8,
  ...CASE_LAW_FAMILY_SERBIA_1,
  ...CASE_LAW_FAMILY_SERBIA_2,
  ...CASE_LAW_FAMILY_SERBIA_3,
  ...CASE_LAW_COMMERCIAL_SERBIA_1,
  ...CASE_LAW_COMMERCIAL_SERBIA_2,
  ...CASE_LAW_COMMERCIAL_SERBIA_3,
  ...CASE_LAW_INHERITANCE_SERBIA_1,
  ...CASE_LAW_INHERITANCE_SERBIA_2,
  ...CASE_LAW_ADMINISTRATIVE_SERBIA_1,
  ...CASE_LAW_ADMINISTRATIVE_SERBIA_2,
  ...CASE_LAW_CRIMINAL_SERBIA_1,
  ...CASE_LAW_CRIMINAL_SERBIA_2,
]
