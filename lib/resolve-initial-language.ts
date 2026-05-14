/**
 * Server-safe helpers so the first HTML/hydration can match the user's locale
 * (cookie from prior visits, otherwise Accept-Language).
 * Must stay in sync with `STORAGE_KEY` / mapping in `LanguageProvider.tsx`.
 */

const ALL = ["en", "sr", "bs", "hr", "sl", "me"] as const
export type ResolvedUiLang = (typeof ALL)[number]

const PRIMARY_TO_LANG: Record<string, ResolvedUiLang> = {
  sr: "sr",
  bs: "bs",
  hr: "hr",
  sl: "sl",
  cnr: "me",
  me: "me",
  en: "en",
}

function parseAcceptLanguage(acceptLanguage: string | null): ResolvedUiLang {
  if (!acceptLanguage) return "en"
  for (const raw of acceptLanguage.split(",")) {
    const tag = raw.trim().split(";")[0]?.toLowerCase()
    if (!tag) continue
    const primary = tag.split("-")[0]
    if (primary && primary in PRIMARY_TO_LANG) {
      return PRIMARY_TO_LANG[primary]
    }
  }
  return "en"
}

export function resolveInitialLanguage(
  cookieValue: string | undefined,
  acceptLanguage: string | null
): ResolvedUiLang {
  if (cookieValue && (ALL as readonly string[]).includes(cookieValue)) {
    return cookieValue as ResolvedUiLang
  }
  return parseAcceptLanguage(acceptLanguage)
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
