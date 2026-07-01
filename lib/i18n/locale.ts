import type { LanguageCode } from "./types"

/** BCP 47 locale for date/number formatting from UI language. */
export function localeForLanguage(lang: LanguageCode): string {
  switch (lang) {
    case "en":
      return "en-US"
    case "sr":
      return "sr-Latn-RS"
    case "bs":
      return "bs-BA"
    case "hr":
      return "hr-HR"
    case "sl":
      return "sl-SI"
    case "me":
      return "sr-Latn-ME"
  }
}
