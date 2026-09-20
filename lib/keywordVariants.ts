import {
  expandQueryWithLegalSynonyms,
  MAX_SYNONYM_PHRASE_EXPANSIONS,
} from "./legalSynonyms"
import {
  escapeIlikePattern,
  getScriptVariants,
} from "./serbianTransliteration"

/** Hard cap after original + synonym × exact/stem, counted per script. */
const MAX_ILIKE_PATTERNS_PER_SCRIPT = 16

/**
 * Closed-class function words (prepositions, conjunctions, clitics, copula,
 * pronouns, English articles). Derived from the BCS closed class plus the
 * query tokens that cannot distinguish a statute (za, radi, i, o, u, se, na,
 * od, …). Not length-based: "rok" stays a content token.
 */
const KEYWORD_STOPWORDS_LATIN = [
  "za",
  "radi",
  "i",
  "a",
  "o",
  "u",
  "se",
  "na",
  "od",
  "do",
  "sa",
  "s",
  "iz",
  "po",
  "pri",
  "prema",
  "kod",
  "zbog",
  "bez",
  "kroz",
  "nad",
  "pod",
  "pred",
  "među",
  "medju",
  "uz",
  "protiv",
  "nakon",
  "poslije",
  "posle",
  "prije",
  "pre",
  "tokom",
  "tijekom",
  "ili",
  "ali",
  "pa",
  "te",
  "niti",
  "ni",
  "je",
  "su",
  "li",
  "da",
  "ne",
  "ga",
  "ih",
  "mu",
  "joj",
  "the",
  "of",
  "for",
  "to",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
  "as",
  "is",
  "are",
  "was",
  "be",
  "this",
  "that",
  "or",
  "and",
  "not",
  "an",
] as const

const KEYWORD_STOPWORD_SET: Set<string> = (() => {
  const set = new Set<string>()
  for (const word of KEYWORD_STOPWORDS_LATIN) {
    for (const variant of getScriptVariants(word)) {
      set.add(variant.toLowerCase())
    }
  }
  return set
})()

/** ILIKE `%rok%` floods; scoring still counts short content tokens. */
const MIN_TOKEN_FETCH_LEN = 5
const MAX_TOKEN_FETCH_GROUPS = 8

/** Coverage floor for partial hits. Justified below in scoreKeywordPatternMatch. */
export const KEYWORD_PARTIAL_COVERAGE_FLOOR = 0.5
export const KEYWORD_PARTIAL_MIN_MATCHED = 2

export const KEYWORD_EXACT_PHRASE_SCORE = 0.95
export const KEYWORD_STEM_PHRASE_SCORE = 0.9
export const KEYWORD_PARTIAL_BASE = 0.3
export const KEYWORD_PARTIAL_COVERAGE_SPAN = 0.22

/** Coverage step is 0.22/n. Contiguity is half a step: 0.22/(2n). */
export function keywordPartialCoverageStep(tokenCount: number): number {
  if (tokenCount < 1) return 0
  return KEYWORD_PARTIAL_COVERAGE_SPAN / tokenCount
}

export function keywordPartialContiguityBonus(tokenCount: number): number {
  if (tokenCount < 1) return 0
  const coverageStep = keywordPartialCoverageStep(tokenCount)
  const bonus = KEYWORD_PARTIAL_COVERAGE_SPAN / (2 * tokenCount)
  if (!(bonus < coverageStep)) {
    throw new Error(
      `contiguity_bonus (${bonus}) must be < coverage_step (${coverageStep}) for n=${tokenCount}`,
    )
  }
  return bonus
}

export type KeywordContentToken = {
  surface: string
  variants: string[]
  stems: string[]
}

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
  /** Per content token (length ≥ 5), both-script `%token%` ILIKE needles. */
  tokenFetchGroups: string[][]
  contentTokens: KeywordContentToken[]
}

export type KeywordScoredMatch = {
  score: number
  channel: "keyword_exact" | "keyword_stem" | "keyword_partial"
}

export function isKeywordStopword(token: string): boolean {
  return KEYWORD_STOPWORD_SET.has(token.trim().toLowerCase())
}

function tokenizeQueryWords(query: string): string[] {
  return query
    .trim()
    .replace(/\s+/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter(Boolean)
}

export function extractKeywordContentTokens(
  query: string,
): KeywordContentToken[] {
  const tokens: KeywordContentToken[] = []
  const seen = new Set<string>()
  for (const raw of tokenizeQueryWords(query)) {
    const lower = raw.toLowerCase()
    if (isKeywordStopword(lower)) continue
    if (seen.has(lower)) continue
    seen.add(lower)
    const variants = [
      ...new Set(getScriptVariants(raw).map((v) => v.toLowerCase())),
    ]
    const stems = [
      ...new Set(
        variants
          .map((v) => stemWord(v))
          .filter((s) => s.length >= 3)
          .map((s) => s.toLowerCase()),
      ),
    ]
    tokens.push({ surface: lower, variants, stems })
  }
  return tokens
}

/**
 * Inflection only (one suffix). nasljeđivanje → nasljeđivanj does not unify
 * with nasljedno / nasljedni / nasljednik; unifying that family was measured
 * and rejected (does not beat FBiH 237; wrongly covers ZPP 7/8).
 */
export function stemWord(word: string): string {
  const lower = word.toLowerCase()
  if (lower.length <= SHORT_WORD_MAX_LEN) return lower

  // Instrumental singular of -ost nouns, before the generic -u strip.
  // dosjelošću → dosjelost, odgovornošću → odgovornost.
  // Not -šću: čašću → čast is a different mutation.
  const ostInstrumental = stemOstInstrumental(lower)
  if (ostInstrumental) return ostInstrumental

  for (const suffix of INFLECTION_SUFFIXES) {
    if (lower.endsWith(suffix) && lower.length - suffix.length >= MIN_STEM_WORD_LEN) {
      return lower.slice(0, -suffix.length)
    }
  }
  return lower
}

/** -ošću → -ost and Cyrillic -ошћу → -ост. Returns null when the rule does not apply. */
function stemOstInstrumental(lower: string): string | null {
  if (lower.endsWith("ošću")) {
    const lemma = lower.slice(0, -"ošću".length) + "ost"
    return lemma.length >= MIN_STEM_WORD_LEN ? lemma : null
  }
  if (lower.endsWith("ошћу")) {
    const lemma = lower.slice(0, -"ошћу".length) + "ост"
    return lemma.length >= MIN_STEM_WORD_LEN ? lemma : null
  }
  return null
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

function isCyrillicScript(value: string): boolean {
  return /[А-Яа-яЂђЈјЉљЊњЋћЏџ]/.test(value)
}

/** Whole-token sa ↔ s (Cyrillic са ↔ с). Not a synonym pair. */
function withSaSEquivalents(phrase: string): string[] {
  const trimmed = phrase.trim().replace(/\s+/g, " ")
  if (!trimmed) return []
  const tokens = trimmed.split(/\s+/).filter(Boolean)
  const swapped = tokens.map((token) => {
    const lower = token.toLowerCase()
    if (lower === "sa") return "s"
    if (lower === "s") return "sa"
    if (lower === "са") return "с"
    if (lower === "с") return "са"
    return token
  })
  const swappedPhrase = swapped.join(" ")
  if (swappedPhrase === trimmed) return [trimmed]
  return [trimmed, swappedPhrase]
}

type ScriptPatternCounts = { latin: number; cyrillic: number }

function addPatternIfRoom(
  bucket: Set<string>,
  pattern: string,
  counts: ScriptPatternCounts,
): void {
  if (bucket.has(pattern)) return
  const script = isCyrillicScript(pattern) ? "cyrillic" : "latin"
  if (counts[script] >= MAX_ILIKE_PATTERNS_PER_SCRIPT) return
  bucket.add(pattern)
  counts[script] += 1
}

function addPatternsForPhrase(
  phrase: string,
  exactPatterns: Set<string>,
  stemPatterns: Set<string>,
  counts: ScriptPatternCounts,
  /** Synonym expansions: caller sets includeStem for single-word splices only. */
  includeStem: boolean,
): void {
  for (const equivalent of withSaSEquivalents(phrase)) {
    for (const variant of getScriptVariants(equivalent)) {
      addPatternIfRoom(
        exactPatterns,
        `%${escapeIlikePattern(variant)}%`,
        counts,
      )
      if (!includeStem) continue
      const stemPattern = buildStemIlikePattern(variant)
      if (stemPattern) {
        addPatternIfRoom(stemPatterns, stemPattern, counts)
      }
    }
  }
}

export function buildKeywordIlikePatterns(
  query: string,
  options?: { maxSynonymExpansions?: number },
): KeywordIlikePatternSet {
  const trimmed = query.trim().replace(/\s+/g, " ")
  if (!trimmed) {
    return { exactPatterns: [], stemPatterns: [] }
  }

  const exactPatterns = new Set<string>()
  const stemPatterns = new Set<string>()
  const counts: ScriptPatternCounts = { latin: 0, cyrillic: 0 }
  const maxSynonymExpansions =
    options?.maxSynonymExpansions ??
    (process.env.LEGAL_SYNONYMS_DISABLED === "1"
      ? 0
      : MAX_SYNONYM_PHRASE_EXPANSIONS)

  // Original query first (priority under the per-script cap).
  addPatternsForPhrase(
    trimmed,
    exactPatterns,
    stemPatterns,
    counts,
    true,
  )

  // Synonym phrases: keyword channel only. Multi-word replacements stay
  // exact-only (stemming "upis u zemljišne knjige" floods). A single-word
  // splice keeps the query's token count, so stemming it is the original
  // query with one lemma swapped — required for word-order differences
  // (dosjelošću → održaj vs "стиче одржајем право својине").
  if (maxSynonymExpansions > 0) {
    const originalTokens = trimmed.split(/\s+/).filter(Boolean).length
    const synonymPhrases = expandQueryWithLegalSynonyms(
      trimmed,
      maxSynonymExpansions,
      stemWord,
    )
    for (const phrase of synonymPhrases) {
      if (
        counts.latin >= MAX_ILIKE_PATTERNS_PER_SCRIPT &&
        counts.cyrillic >= MAX_ILIKE_PATTERNS_PER_SCRIPT
      ) {
        break
      }
      const splicedSingleWord =
        phrase.trim().split(/\s+/).filter(Boolean).length === originalTokens
      addPatternsForPhrase(
        phrase,
        exactPatterns,
        stemPatterns,
        counts,
        splicedSingleWord,
      )
    }
  }

  const contentTokens = extractKeywordContentTokens(trimmed)
  const tokenFetchGroups: string[][] = contentTokens
    .filter((t) => Array.from(t.surface).length >= MIN_TOKEN_FETCH_LEN)
    .sort(
      (a, b) =>
        Array.from(b.surface).length - Array.from(a.surface).length ||
        a.surface.localeCompare(b.surface),
    )
    .slice(0, MAX_TOKEN_FETCH_GROUPS)
    .map((t) => [
      ...new Set(
        t.variants.map((v) => `%${escapeIlikePattern(v.toLowerCase())}%`),
      ),
    ])

  return {
    exactPatterns: [...exactPatterns],
    stemPatterns: [...stemPatterns],
    tokenFetchGroups,
    contentTokens,
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

function contentTokenPresent(
  haystackLower: string,
  token: KeywordContentToken,
): boolean {
  for (const needle of [...token.variants, ...token.stems]) {
    if (needle && haystackLower.includes(needle)) return true
  }
  return false
}

/**
 * Coverage-only partial for callers without the statute RPC flag (case-law
 * keyword). Contiguity is SQL-only: never computed here.
 * Exact 0.95 and stem 0.90 always outrank any partial. For n content tokens
 * partial ≤ 0.30 + 0.22 + 0.22/(2n); post curated-boost (+0.12) still below stem.
 * FBiH 30→237 and RS 143 rank-4 are channel-calibration, not this band.
 */
function scorePartialCoverage(
  haystack: string,
  contentTokens: KeywordContentToken[],
): KeywordScoredMatch | null {
  if (contentTokens.length === 0) return null

  const h = haystack.toLowerCase()
  const matched = contentTokens.filter((t) => contentTokenPresent(h, t))
  return scoreKeywordPartialFromCoverage(
    matched.length,
    contentTokens.length,
    false,
  )
}

export function scoreKeywordPartialFromCoverage(
  matchedCount: number,
  tokenCount: number,
  contiguous: boolean,
): KeywordScoredMatch | null {
  if (tokenCount <= 0) return null
  const coverage = matchedCount / tokenCount
  const minMatched =
    tokenCount >= KEYWORD_PARTIAL_MIN_MATCHED
      ? KEYWORD_PARTIAL_MIN_MATCHED
      : 1
  if (
    matchedCount < minMatched ||
    coverage < KEYWORD_PARTIAL_COVERAGE_FLOOR
  ) {
    return null
  }
  const bonus = contiguous ? keywordPartialContiguityBonus(tokenCount) : 0
  return {
    score: KEYWORD_PARTIAL_BASE + KEYWORD_PARTIAL_COVERAGE_SPAN * coverage + bonus,
    channel: "keyword_partial",
  }
}

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

  return scorePartialCoverage(haystack, patterns.contentTokens ?? [])
}
