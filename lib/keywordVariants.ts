import {
  escapeIlikePattern,
  getScriptVariants,
} from "./serbianTransliteration"

/** Longest first — only one suffix stripped per word. Latin + Cyrillic. */
const INFLECTION_SUFFIXES = [
  "oma",
  "има",
  "ама",
  "ima",
  "ama",
  "ом",
  "ем",
  "og",
  "eg",
  "ог",
  "ег",
  "om",
  "em",
  "im",
  "им",
  "oj",
  "ој",
  "u",
  "у",
  "a",
  "а",
  "e",
  "е",
  "i",
  "и",
] as const

const SHORT_WORD_MAX_LEN = 4
const MIN_STEM_WORD_LEN = 4
const MIN_STEM_PATTERN_CHARS = 8

export type KeywordIlikePatternSet = {
  exactPatterns: string[]
  stemPatterns: string[]
}

export type KeywordScoredMatch = {
  score: number
  channel: "keyword_exact" | "keyword_stem"
}

export function stemWord(word: string): string {
  const lower = word.toLowerCase()
  if (lower.length <= SHORT_WORD_MAX_LEN) return lower

  for (const suffix of INFLECTION_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length - suffix.length >= MIN_STEM_WORD_LEN) {
      return lower.slice(0, -suffix.length)
    }
  }
  return lower
}

function buildStemIlikePattern(phrase: string): string | null {
  const words = phrase.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return null

  const parts: string[] = []
  let meaningfulStemChars = 0

  for (const word of words) {
    if (word.length <= SHORT_WORD_MAX_LEN) {
      parts.push(escapeIlikePattern(word.toLowerCase()))
      continue
    }

    const stem = stemWord(word)
    parts.push(`%${escapeIlikePattern(stem)}%`)
    meaningfulStemChars += stem.length
  }

  if (meaningfulStemChars < MIN_STEM_PATTERN_CHARS) {
    return null
  }

  return parts.join(" ")
}

export function buildKeywordIlikePatterns(query: string): KeywordIlikePatternSet {
  const trimmed = query.trim().replace(/\s+/g, " ")
  if (!trimmed) {
    return { exactPatterns: [], stemPatterns: [] }
  }

  const exactPatterns = new Set<string>()
  const stemPatterns = new Set<string>()

  for (const variant of getScriptVariants(trimmed)) {
    exactPatterns.add(`%${escapeIlikePattern(variant)}%`)
    const stemPattern = buildStemIlikePattern(variant)
    if (stemPattern) {
      stemPatterns.add(stemPattern)
    }
  }

  return {
    exactPatterns: [...exactPatterns],
    stemPatterns: [...stemPatterns],
  }
}

function ilikePatternToRegExp(pattern: string): RegExp {
  let re = ""
  for (const ch of pattern) {
    if (ch === "%") {
      re += ".*"
    } else if (ch === "_") {
      re += "."
    } else if (/[.*+?^${}()|[\]\\]/.test(ch)) {
      re += `\\${ch}`
    } else {
      re += ch
    }
  }
  return new RegExp(re, "i")
}

export function matchesIlikePattern(haystack: string, pattern: string): boolean {
  if (!pattern) return false
  return ilikePatternToRegExp(pattern).test(haystack)
}

const KEYWORD_EXACT_PHRASE_SCORE = 0.95
const KEYWORD_STEM_PHRASE_SCORE = 0.9

export function scoreKeywordPatternMatch(
  haystack: string,
  patterns: KeywordIlikePatternSet,
): KeywordScoredMatch | null {
  if (!haystack.trim()) return null

  for (const pattern of patterns.exactPatterns) {
    if (matchesIlikePattern(haystack, pattern)) {
      return { score: KEYWORD_EXACT_PHRASE_SCORE, channel: "keyword_exact" }
    }
  }

  for (const pattern of patterns.stemPatterns) {
    if (matchesIlikePattern(haystack, pattern)) {
      return { score: KEYWORD_STEM_PHRASE_SCORE, channel: "keyword_stem" }
    }
  }

  return null
}
