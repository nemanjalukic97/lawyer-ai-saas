/**
 * Global legal-terminology synonyms for the keyword channel only.
 * Bidirectional phrase map — not jurisdiction-keyed.
 *
 * Stemming for inflected single-word keys is injected by the caller
 * (avoids a circular import with keywordVariants).
 */

export const MAX_SYNONYM_PHRASE_EXPANSIONS = 2

/** Single-word keys shorter than this are never expanded (too ambiguous). */
export const MIN_SINGLE_WORD_SYNONYM_KEY_LEN = 6

/** Undirected edges; both directions are registered at load time. */
const SYNONYM_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["tražbina", "potraživanje"],
  ["razvrgnuće suvlasništva", "razvrgnuće suvlasničke zajednice"],
  ["razvrgnuće suvlasništva", "dioba suvlasništva"],
  ["obveza", "obaveza"],
  ["obvezno pravo", "obligaciono pravo"],
  ["kazneni", "krivični"],
  ["stjecanje", "sticanje"],
  ["poduzeće", "preduzeće"],
  ["trgovačko društvo", "privredno društvo"],
  ["ugovor o djelu", "ugovor o delu"],
]

function normalizePhrase(phrase: string): string {
  return phrase.trim().replace(/\s+/g, " ").toLowerCase()
}

/** key (lowercase) → synonym phrases (original casing preserved for display/patterns) */
const SYNONYM_MAP: Map<string, string[]> = (() => {
  const map = new Map<string, Set<string>>()
  for (const [a, b] of SYNONYM_PAIRS) {
    const na = normalizePhrase(a)
    const nb = normalizePhrase(b)
    if (!map.has(na)) map.set(na, new Set())
    if (!map.has(nb)) map.set(nb, new Set())
    map.get(na)!.add(b)
    map.get(nb)!.add(a)
  }
  const out = new Map<string, string[]>()
  for (const [k, set] of map) {
    out.set(k, [...set])
  }
  return out
})()

/** Dictionary keys longest-first so multi-word phrases win over fragments. */
const DICTIONARY_KEYS_LONGEST_FIRST = [...SYNONYM_MAP.keys()].sort(
  (a, b) => b.length - a.length || a.localeCompare(b),
)

const SINGLE_WORD_KEYS = DICTIONARY_KEYS_LONGEST_FIRST.filter(
  (k) => !k.includes(" ") && k.length >= MIN_SINGLE_WORD_SYNONYM_KEY_LEN,
)

const SINGLE_WORD_KEY_SET = new Set(SINGLE_WORD_KEYS)

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

type Span = { start: number; end: number }

function overlaps(spans: Span[], start: number, end: number): boolean {
  return spans.some((s) => start < s.end && end > s.start)
}

function pushExpansions(args: {
  trimmed: string
  start: number
  end: number
  synonyms: string[]
  expansions: string[]
  seen: Set<string>
  maxExpansions: number
}): void {
  const { trimmed, start, end, synonyms, expansions, seen, maxExpansions } =
    args
  for (const synonym of synonyms) {
    if (expansions.length >= maxExpansions) return
    const expanded = (trimmed.slice(0, start) + synonym + trimmed.slice(end))
      .trim()
      .replace(/\s+/g, " ")
    const norm = normalizePhrase(expanded)
    if (!norm || norm === normalizePhrase(trimmed) || seen.has(norm)) continue
    seen.add(norm)
    expansions.push(expanded)
  }
}

function buildStemToSingleKeys(
  stemWord: (word: string) => string,
): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const key of SINGLE_WORD_KEYS) {
    const stem = stemWord(key)
    const list = map.get(stem) ?? []
    list.push(key)
    map.set(stem, list)
  }
  return map
}

/**
 * Find dictionary keys in the query (longest-match-first, non-overlapping)
 * and collect up to `maxExpansions` alternate phrases.
 * Does not include the original query.
 *
 * Multi-word keys require an exact phrase substring.
 * When `stemWord` is provided, single-word keys also match query tokens that
 * share the same stem (so "potraživanja" bridges via lemma "potraživanje").
 */
function isEligibleDictionaryKey(key: string): boolean {
  if (key.includes(" ")) return true
  return key.length >= MIN_SINGLE_WORD_SYNONYM_KEY_LEN
}

function isLoneSynonymWordQuery(
  trimmed: string,
  stemWord?: (word: string) => string,
): boolean {
  const tokens = trimmed.split(/\s+/).filter(Boolean)
  if (tokens.length !== 1) return false
  const token = tokens[0].toLowerCase()
  if (SINGLE_WORD_KEY_SET.has(token)) return true
  if (!stemWord) return false
  const stem = stemWord(token)
  return SINGLE_WORD_KEYS.some((key) => stemWord(key) === stem)
}

export function expandQueryWithLegalSynonyms(
  query: string,
  maxExpansions: number = MAX_SYNONYM_PHRASE_EXPANSIONS,
  stemWord?: (word: string) => string,
): string[] {
  const trimmed = query.trim().replace(/\s+/g, " ")
  if (!trimmed || maxExpansions <= 0) return []

  // Lone "obaveza" / "potraživanje" etc. — no other content word → no expansion.
  if (isLoneSynonymWordQuery(trimmed, stemWord)) return []

  const lower = trimmed.toLowerCase()
  const usedSpans: Span[] = []
  const expansions: string[] = []
  const seen = new Set<string>()

  // Pass 1: longest exact phrase / token substring match.
  for (const key of DICTIONARY_KEYS_LONGEST_FIRST) {
    if (expansions.length >= maxExpansions) break
    if (!isEligibleDictionaryKey(key)) continue

    const re = new RegExp(escapeRegExp(key), "gi")
    let match: RegExpExecArray | null
    while ((match = re.exec(lower)) !== null) {
      if (expansions.length >= maxExpansions) break
      const start = match.index
      const end = start + match[0].length
      if (overlaps(usedSpans, start, end)) continue

      const synonyms = SYNONYM_MAP.get(key) ?? []
      if (synonyms.length === 0) continue

      pushExpansions({
        trimmed,
        start,
        end,
        synonyms,
        expansions,
        seen,
        maxExpansions,
      })
      usedSpans.push({ start, end })
    }
  }

  // Pass 2: single-word stem matches for inflected forms not caught above.
  // Only keys with length >= MIN_SINGLE_WORD_SYNONYM_KEY_LEN (see SINGLE_WORD_KEYS).
  if (stemWord && expansions.length < maxExpansions) {
    const stemToKeys = buildStemToSingleKeys(stemWord)
    const tokenRe = /\S+/g
    let tokenMatch: RegExpExecArray | null
    while ((tokenMatch = tokenRe.exec(lower)) !== null) {
      if (expansions.length >= maxExpansions) break
      const start = tokenMatch.index
      const end = start + tokenMatch[0].length
      if (overlaps(usedSpans, start, end)) continue

      const stem = stemWord(tokenMatch[0])
      const keys = stemToKeys.get(stem)
      if (!keys || keys.length === 0) continue

      for (const key of keys) {
        if (expansions.length >= maxExpansions) break
        const synonyms = SYNONYM_MAP.get(key) ?? []
        if (synonyms.length === 0) continue
        pushExpansions({
          trimmed,
          start,
          end,
          synonyms,
          expansions,
          seen,
          maxExpansions,
        })
        usedSpans.push({ start, end })
        break
      }
    }
  }

  return expansions
}
