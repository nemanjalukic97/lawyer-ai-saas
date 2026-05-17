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
import { CASE_LAW_CRIMINAL_BIH_RS_1 } from "./case-law-criminal-bih-rs-1"
import { CASE_LAW_CRIMINAL_BIH_RS_2 } from "./case-law-criminal-bih-rs-2"
import { CASE_LAW_CRIMINAL_BIH_RS_3 } from "./case-law-criminal-bih-rs-3"
import { CASE_LAW_CRIMINAL_BIH_RS_4 } from "./case-law-criminal-bih-rs-4"
import { CASE_LAW_CRIMINAL_BIH_RS_5 } from "./case-law-criminal-bih-rs-5"
import { CASE_LAW_CRIMINAL_BIH_RS_6 } from "./case-law-criminal-bih-rs-6"
import { CASE_LAW_CRIMINAL_BIH_RS_7 } from "./case-law-criminal-bih-rs-7"
import { CASE_LAW_CRIMINAL_BIH_RS_8 } from "./case-law-criminal-bih-rs-8"
import { CASE_LAW_CRIMINAL_BIH_RS_9 } from "./case-law-criminal-bih-rs-9"
import { CASE_LAW_CRIMINAL_BIH_RS_10 } from "./case-law-criminal-bih-rs-10"
import { CASE_LAW_CRIMINAL_BIH_RS_11 } from "./case-law-criminal-bih-rs-11"
import { CASE_LAW_CRIMINAL_BIH_RS_12 } from "./case-law-criminal-bih-rs-12"
import { CASE_LAW_CRIMINAL_BIH_RS_13 } from "./case-law-criminal-bih-rs-13"
import { CASE_LAW_CRIMINAL_BIH_RS_14 } from "./case-law-criminal-bih-rs-14"
import { CASE_LAW_CRIMINAL_BIH_RS_15 } from "./case-law-criminal-bih-rs-15"
import { CASE_LAW_CRIMINAL_BIH_RS_16 } from "./case-law-criminal-bih-rs-16"
import { CASE_LAW_CRIMINAL_BIH_RS_17 } from "./case-law-criminal-bih-rs-17"
import { CASE_LAW_CRIMINAL_BIH_RS_18 } from "./case-law-criminal-bih-rs-18"
import { CASE_LAW_CRIMINAL_BIH_RS_19 } from "./case-law-criminal-bih-rs-19"
import { CASE_LAW_CRIMINAL_BIH_RS_20 } from "./case-law-criminal-bih-rs-20"
import { CASE_LAW_CRIMINAL_BIH_RS_21 } from "./case-law-criminal-bih-rs-21"
import { CASE_LAW_CRIMINAL_BIH_RS_22 } from "./case-law-criminal-bih-rs-22"
import { CASE_LAW_CRIMINAL_BIH_RS_23 } from "./case-law-criminal-bih-rs-23"
import { CASE_LAW_CRIMINAL_BIH_RS_24 } from "./case-law-criminal-bih-rs-24"
import { CASE_LAW_INHERITANCE_BIH_RS_1 } from "./case-law-inheritance-bih-rs-1"
import { CASE_LAW_CIVIL_BIH_RS_1 } from "./case-law-civil-bih-rs-1"
import { CASE_LAW_CIVIL_BIH_RS_ODLUKE_APELACIJE } from "./case-law-civil-bih-rs-odluke-apelacije"
import { CASE_LAW_CIVIL_BIH_RS_OSTALO } from "./case-law-civil-bih-rs-ostalo"
import { CASE_LAW_FAMILY_BIH_RS_1 } from "./case-law-family-bih-rs-1"
import { CASE_LAW_CIVIL_BIH_RS_PRAVNA_SHVATANJA } from "./case-law-civil-bih-rs-pravna-shvatanja"
import { CASE_LAW_CIVIL_BIH_RS_INTELEKTUALNA_SVOJINA } from "./case-law-civil-bih-rs-intelektualna-svojina"
import { CASE_LAW_CIVIL_BIH_RS_RAZUMNI_ROK } from "./case-law-civil-bih-rs-razumni-rok"
import { CASE_LAW_PROCEDURAL_BIH_RS_1 } from "./case-law-procedural-bih-rs-1"
import { CASE_LAW_LABOR_BIH_RS_1 } from "./case-law-labor-bih-rs-1"
import { CASE_LAW_CIVIL_BIH_RS_STAMBENO } from "./case-law-civil-bih-rs-stambeno"
import { CASE_LAW_COMMERCIAL_BIH_RS_1 } from "./case-law-commercial-bih-rs-1"
import { CASE_LAW_CIVIL_BIH_RS_STVARNO } from "./case-law-civil-bih-rs-stvarno"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_1 } from "./case-law-administrative-bih-rs-1"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_2 } from "./case-law-administrative-bih-rs-2"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_3 } from "./case-law-administrative-bih-rs-3"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_4 } from "./case-law-administrative-bih-rs-4"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_5 } from "./case-law-administrative-bih-rs-5"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_6 } from "./case-law-administrative-bih-rs-6"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_7 } from "./case-law-administrative-bih-rs-7"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_8 } from "./case-law-administrative-bih-rs-8"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_9 } from "./case-law-administrative-bih-rs-9"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_10 } from "./case-law-administrative-bih-rs-10"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_11 } from "./case-law-administrative-bih-rs-11"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_12 } from "./case-law-administrative-bih-rs-12"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_13 } from "./case-law-administrative-bih-rs-13"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_14 } from "./case-law-administrative-bih-rs-14"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_ODLUKE_APELACIJE } from "./case-law-administrative-bih-rs-odluke-apelacije"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_15 } from "./case-law-administrative-bih-rs-15"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_16 } from "./case-law-administrative-bih-rs-16"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_17 } from "./case-law-administrative-bih-rs-17"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_18 } from "./case-law-administrative-bih-rs-18"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_19 } from "./case-law-administrative-bih-rs-19"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_20 } from "./case-law-administrative-bih-rs-20"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_21 } from "./case-law-administrative-bih-rs-21"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_PRAVNA_SHVATANJA } from "./case-law-administrative-bih-rs-pravna-shvatanja"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_22 } from "./case-law-administrative-bih-rs-22"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_23 } from "./case-law-administrative-bih-rs-23"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_24 } from "./case-law-administrative-bih-rs-24"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_25 } from "./case-law-administrative-bih-rs-25"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_26 } from "./case-law-administrative-bih-rs-26"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_27 } from "./case-law-administrative-bih-rs-27"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_28 } from "./case-law-administrative-bih-rs-28"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_29 } from "./case-law-administrative-bih-rs-29"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_30 } from "./case-law-administrative-bih-rs-30"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_31 } from "./case-law-administrative-bih-rs-31"
import { CASE_LAW_ADMINISTRATIVE_BIH_RS_32 } from "./case-law-administrative-bih-rs-32"

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
  ...CASE_LAW_CRIMINAL_BIH_RS_1,
  ...CASE_LAW_CRIMINAL_BIH_RS_2,
  ...CASE_LAW_CRIMINAL_BIH_RS_3,
  ...CASE_LAW_CRIMINAL_BIH_RS_4,
  ...CASE_LAW_CRIMINAL_BIH_RS_5,
  ...CASE_LAW_CRIMINAL_BIH_RS_6,
  ...CASE_LAW_CRIMINAL_BIH_RS_7,
  ...CASE_LAW_CRIMINAL_BIH_RS_8,
  ...CASE_LAW_CRIMINAL_BIH_RS_9,
  ...CASE_LAW_CRIMINAL_BIH_RS_10,
  ...CASE_LAW_CRIMINAL_BIH_RS_11,
  ...CASE_LAW_CRIMINAL_BIH_RS_12,
  ...CASE_LAW_CRIMINAL_BIH_RS_13,
  ...CASE_LAW_CRIMINAL_BIH_RS_14,
  ...CASE_LAW_CRIMINAL_BIH_RS_15,
  ...CASE_LAW_CRIMINAL_BIH_RS_16,
  ...CASE_LAW_CRIMINAL_BIH_RS_17,
  ...CASE_LAW_CRIMINAL_BIH_RS_18,
  ...CASE_LAW_CRIMINAL_BIH_RS_19,
  ...CASE_LAW_CRIMINAL_BIH_RS_20,
  ...CASE_LAW_CRIMINAL_BIH_RS_21,
  ...CASE_LAW_CRIMINAL_BIH_RS_22,
  ...CASE_LAW_CRIMINAL_BIH_RS_23,
  ...CASE_LAW_CRIMINAL_BIH_RS_24,
  ...CASE_LAW_INHERITANCE_BIH_RS_1,
  ...CASE_LAW_CIVIL_BIH_RS_1,
  ...CASE_LAW_CIVIL_BIH_RS_ODLUKE_APELACIJE,
  ...CASE_LAW_CIVIL_BIH_RS_OSTALO,
  ...CASE_LAW_FAMILY_BIH_RS_1,
  ...CASE_LAW_CIVIL_BIH_RS_PRAVNA_SHVATANJA,
  ...CASE_LAW_CIVIL_BIH_RS_INTELEKTUALNA_SVOJINA,
  ...CASE_LAW_CIVIL_BIH_RS_RAZUMNI_ROK,
  ...CASE_LAW_PROCEDURAL_BIH_RS_1,
  ...CASE_LAW_LABOR_BIH_RS_1,
  ...CASE_LAW_CIVIL_BIH_RS_STAMBENO,
  ...CASE_LAW_COMMERCIAL_BIH_RS_1,
  ...CASE_LAW_CIVIL_BIH_RS_STVARNO,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_1,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_2,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_3,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_4,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_5,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_6,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_7,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_8,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_9,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_10,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_11,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_12,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_13,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_14,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_ODLUKE_APELACIJE,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_15,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_16,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_17,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_18,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_19,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_20,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_21,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_PRAVNA_SHVATANJA,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_22,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_23,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_24,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_25,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_26,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_27,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_28,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_29,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_30,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_31,
  ...CASE_LAW_ADMINISTRATIVE_BIH_RS_32,
]
