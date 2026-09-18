import type { LanguageCode } from "@/lib/i18n/types"

/**
 * BCS/ME: one (1, 21, 31… except 11), few (2–4, 22–24… except 12–14),
 * other (0, 5–19, 11–14, 25…).
 */
export function southSlavicPlural(n: number): "one" | "few" | "other" {
  const abs = Math.abs(Math.trunc(n))
  const mod10 = abs % 10
  const mod100 = abs % 100
  if (mod10 === 1 && mod100 !== 11) return "one"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "few"
  return "other"
}

/** Slovenian: one / dual (two) / few (3–4) / other (5+, teens). */
export function slovenianPlural(n: number): "one" | "two" | "few" | "other" {
  const mod100 = Math.abs(Math.trunc(n)) % 100
  if (mod100 === 1) return "one"
  if (mod100 === 2) return "two"
  if (mod100 === 3 || mod100 === 4) return "few"
  return "other"
}

export function dayNoun(lang: LanguageCode, n: number): string {
  if (lang === "en") return n === 1 ? "day" : "days"
  if (lang === "sl") {
    switch (slovenianPlural(n)) {
      case "one":
        return "dan"
      case "two":
        return "dneva"
      case "few":
        return "dnevi"
      default:
        return "dni"
    }
  }
  return southSlavicPlural(n) === "one" ? "dan" : "dana"
}

export function daysRemainingLine(lang: LanguageCode, days: number): string {
  const noun = dayNoun(lang, days)
  if (lang === "en") {
    return days === 1 ? "1 day remaining" : `${days} ${noun} remaining`
  }
  if (lang === "sl") return `Preostalo: ${days} ${noun}`
  return `Preostalo: ${days} ${noun}`
}

export function dueInPhrase(lang: LanguageCode, days: number): string {
  const noun = dayNoun(lang, days)
  switch (lang) {
    case "en":
      return days === 1 ? "in 1 day" : `in ${days} ${noun}`
    case "sl":
      return `čez ${days} ${noun}`
    default:
      return `za ${days} ${noun}`
  }
}
