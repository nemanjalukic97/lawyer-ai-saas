import type { LanguageCode } from "@/components/LanguageProvider"

/** Default UI language when a user picks a jurisdiction (signup / settings). */
export const JURISDICTION_UI_LANGUAGE: Record<string, LanguageCode> = {
  serbia: "sr",
  croatia: "hr",
  bih_fbih: "bs",
  bih_rs: "sr",
  bih_brcko: "bs",
  montenegro: "me",
  slovenia: "sl",
}

export function uiLanguageForJurisdiction(
  jurisdiction: string
): LanguageCode | null {
  return JURISDICTION_UI_LANGUAGE[jurisdiction] ?? null
}
