import type { LanguageCode } from "@/lib/i18n/types"

const SUPPORTED: ReadonlyArray<LanguageCode> = ["en", "sr", "bs", "hr", "sl", "me"]

/** Values stored on user_profiles.preferred_language (settings dropdown). */
const DISPLAY_NAME_TO_CODE: Record<string, LanguageCode> = {
  english: "en",
  serbian: "sr",
  bosnian: "bs",
  croatian: "hr",
  slovenian: "sl",
  montenegrin: "me",
}

export const LANGUAGE_CODE_TO_DISPLAY: Record<LanguageCode, string> = {
  en: "English",
  sr: "Serbian",
  bs: "Bosnian",
  hr: "Croatian",
  sl: "Slovenian",
  me: "Montenegrin",
}

export function normalizeLanguage(input?: string | null): LanguageCode {
  const raw = (input ?? "").trim().toLowerCase()
  if (!raw) return "en"
  const fromDisplay = DISPLAY_NAME_TO_CODE[raw]
  if (fromDisplay) return fromDisplay
  const primary = raw.split(/[-_]/)[0] as LanguageCode
  return (SUPPORTED as readonly string[]).includes(primary) ? primary : "en"
}
