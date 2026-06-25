/** Nested string dictionaries for i18n. */
export interface Messages {
  [key: string]: string | Messages
}

export type LanguageCode = "en" | "sr" | "bs" | "hr" | "sl" | "me"
