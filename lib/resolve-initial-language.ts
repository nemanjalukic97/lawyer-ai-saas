/**
 * Server-safe helpers so the first HTML can match the user's locale.
 * Order: explicit choice (cookie written by setLanguage), then
 * user_profiles.preferred_language when it is a real choice, then
 * Accept-Language, then Serbian Latin.
 *
 * An old `legantis-language` cookie without `legantis-language-chosen`
 * is not a choice. The previous provider wrote that cookie on every visit.
 *
 * The signup trigger used to store the literal `en`. That value is not a
 * choice. The display name `English` is. New signups store NULL; the `en`
 * rule stays for rows that already exist.
 */

import { normalizeLanguage } from "@/lib/i18n/normalizeLanguage"

const ALL = ["en", "sr", "bs", "hr", "sl", "me"] as const
export type ResolvedUiLang = (typeof ALL)[number]

export const UI_LANGUAGE_COOKIE = "legantis-language"
export const UI_LANGUAGE_CHOSEN_COOKIE = "legantis-language-chosen"
export const UI_LANGUAGE_CHOSEN_VALUE = "1"
export const DEFAULT_UI_LANGUAGE: ResolvedUiLang = "sr"

const PRIMARY_TO_LANG: Record<string, ResolvedUiLang> = {
  sr: "sr",
  bs: "bs",
  hr: "hr",
  sl: "sl",
  cnr: "me",
  me: "me",
  sh: "sr",
  en: "en",
}

export function isSupportedUiLang(value: string | undefined | null): value is ResolvedUiLang {
  return !!value && (ALL as readonly string[]).includes(value)
}

export function isExplicitLanguageCookie(
  languageCookie: string | undefined,
  chosenCookie: string | undefined,
): languageCookie is ResolvedUiLang {
  return chosenCookie === UI_LANGUAGE_CHOSEN_VALUE && isSupportedUiLang(languageCookie)
}

/**
 * Raw `user_profiles.preferred_language`.
 * NULL, blank, and the signup sentinel `en` mean "not chosen".
 * `English` is a choice. Any other supported code or display name is a choice.
 * An unrecognised value is not treated as English.
 */
export function explicitProfileLanguage(raw: string | null | undefined): ResolvedUiLang | null {
  if (raw == null) return null
  const trimmed = raw.trim()
  if (!trimmed || trimmed === "en") return null
  const code = normalizeLanguage(trimmed)
  if (code === "en" && trimmed.toLowerCase() !== "english") return null
  return code
}

function parseAcceptLanguage(acceptLanguage: string | null): ResolvedUiLang {
  if (!acceptLanguage) return DEFAULT_UI_LANGUAGE
  for (const raw of acceptLanguage.split(",")) {
    const tag = raw.trim().split(";")[0]?.toLowerCase()
    if (!tag) continue
    const primary = tag.split("-")[0]
    if (primary && primary in PRIMARY_TO_LANG) {
      return PRIMARY_TO_LANG[primary]
    }
  }
  return DEFAULT_UI_LANGUAGE
}

export function resolveInitialLanguage(input: {
  languageCookie?: string
  chosenCookie?: string
  acceptLanguage: string | null
  profileLanguage?: string | null
}): ResolvedUiLang {
  if (isExplicitLanguageCookie(input.languageCookie, input.chosenCookie)) {
    return input.languageCookie
  }
  const fromProfile = explicitProfileLanguage(input.profileLanguage)
  if (fromProfile) return fromProfile
  return parseAcceptLanguage(input.acceptLanguage)
}

/** BCP 47-ish value for <html lang> */
export function htmlLangFromUiLang(code: ResolvedUiLang): string {
  const map: Record<ResolvedUiLang, string> = {
    en: "en",
    sr: "sr",
    bs: "bs",
    hr: "hr",
    sl: "sl",
    me: "cnr",
  }
  return map[code]
}
