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

/**
 * ILIKE-style match without RegExp `.*` (which backtracks catastrophically on
 * long legal text when stem patterns contain multiple `%` wildcards).
 */
export function matchesIlikePattern(haystack: string, pattern: string): boolean {
  if (!pattern) return false

  const h = haystack.toLowerCase()
  const p = pattern.toLowerCase()
  const anchoredStart = !p.startsWith("%")
  const anchoredEnd = !p.endsWith("%")
  const segments = p.split("%")

  let pos = 0
  let seenLiteral = false

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    if (seg === "") continue

    let matchIndex: number
    let matchLen: number

    if (seg.includes("_")) {
      const reBody = seg
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/_/g, ".")
      const m = h.slice(pos).match(new RegExp(reBody, "i"))
      if (!m || m.index == null) return false
      matchIndex = pos + m.index
      matchLen = m[0].length
    } else {
      matchIndex = h.indexOf(seg, pos)
      if (matchIndex === -1) return false
      matchLen = seg.length
    }

    if (!seenLiteral && anchoredStart && matchIndex !== 0) return false
    seenLiteral = true
    pos = matchIndex + matchLen
  }

  if (anchoredEnd && pos !== h.length) return false
  return true
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
