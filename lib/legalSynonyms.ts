/**
 * Global legal-terminology synonyms for the keyword channel only.
 * Bidirectional phrase map — not jurisdiction-keyed.
 *
 * Stemming for inflected single-word keys is injected by the caller
 * (avoids a circular import with keywordVariants).
 */

/** Latin phrases from the cartesian product, excluding the original query. */
export const MAX_SYNONYM_PHRASE_EXPANSIONS = 16

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
  ["uknjižba", "upis u zemljišne knjige"],
  ["uknjižba", "zemljišnoknjižni upis"],
  ["uknjižiti", "upisati u zemljišne knjige"],
  ["gruntovnica", "zemljišna knjiga"],
  ["gruntovni", "zemljišnoknjižni"],
  ["brisovna dozvola", "dozvola za brisanje"],
  ["zabilježba", "zabilježba u zemljišnoj knjizi"],
  ["dosjelost", "održaj"],
  ["vlasništvo", "svojina"],
  ["nekretnina", "nepokretnost"],
  ["suvlasništvo", "susvojina"],
  ["služnost", "službenost"],
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

function isWholeToken(lower: string, start: number, end: number): boolean {
  const leftOk = start === 0 || /\s/.test(lower[start - 1] ?? "")
  const rightOk = end === lower.length || /\s/.test(lower[end] ?? "")
  return leftOk && rightOk
}

type SynonymSlot = {
  start: number
  end: number
  singleWordSynonyms: string[]
  multiWordSynonyms: string[]
}

function splitSynonyms(synonyms: string[]): {
  singleWord: string[]
  multiWord: string[]
} {
  const singleWord: string[] = []
  const multiWord: string[] = []
  for (const synonym of synonyms) {
    if (normalizePhrase(synonym).includes(" ")) multiWord.push(synonym)
    else singleWord.push(synonym)
  }
  return { singleWord, multiWord }
}

function tryAddSlot(
  slots: SynonymSlot[],
  usedSpans: Span[],
  start: number,
  end: number,
  synonyms: string[],
): void {
  if (synonyms.length === 0) return
  if (overlaps(usedSpans, start, end)) return
  const { singleWord, multiWord } = splitSynonyms(synonyms)
  if (singleWord.length === 0 && multiWord.length === 0) return
  slots.push({ start, end, singleWordSynonyms: singleWord, multiWordSynonyms: multiWord })
  usedSpans.push({ start, end })
}

/** Full substitution first; drop fewest-swap (longest-tail) combinations at the cap. */
function cartesianSingleWordExpansions(
  trimmed: string,
  slots: SynonymSlot[],
  maxExpansions: number,
  seen: Set<string>,
): string[] {
  const spliceSlots = slots.filter((s) => s.singleWordSynonyms.length > 0)
  if (spliceSlots.length === 0 || maxExpansions <= 0) return []

  type Combo = { replacements: string[]; substitutions: number }
  const combos: Combo[] = []

  const walk = (index: number, replacements: string[], substitutions: number) => {
    if (index === spliceSlots.length) {
      combos.push({ replacements, substitutions })
      return
    }
    const slot = spliceSlots[index]!
    const original = trimmed.slice(slot.start, slot.end)
    walk(index + 1, [...replacements, original], substitutions)
    for (const synonym of slot.singleWordSynonyms) {
      walk(index + 1, [...replacements, synonym], substitutions + 1)
    }
  }
  walk(0, [], 0)

  combos.sort((a, b) => b.substitutions - a.substitutions || 0)

  const expansions: string[] = []
  const originalNorm = normalizePhrase(trimmed)
  for (const combo of combos) {
    if (combo.substitutions === 0) continue
    if (expansions.length >= maxExpansions) break
    const parts = spliceSlots.map((slot, i) => ({
      start: slot.start,
      end: slot.end,
      text: combo.replacements[i]!,
    }))
    parts.sort((a, b) => b.start - a.start)
    let phrase = trimmed
    for (const part of parts) {
      phrase = phrase.slice(0, part.start) + part.text + phrase.slice(part.end)
    }
    phrase = phrase.trim().replace(/\s+/g, " ")
    const norm = normalizePhrase(phrase)
    if (!norm || norm === originalNorm || seen.has(norm)) continue
    seen.add(norm)
    expansions.push(phrase)
  }
  return expansions
}

function pushMultiWordExpansions(args: {
  synonyms: string[]
  expansions: string[]
  seen: Set<string>
  maxExpansions: number
}): void {
  const { synonyms, expansions, seen, maxExpansions } = args
  for (const synonym of synonyms) {
    if (expansions.length >= maxExpansions) return
    const expanded = normalizePhrase(synonym)
    if (!expanded || seen.has(expanded)) continue
    if (!expanded.includes(" ") && SINGLE_WORD_KEY_SET.has(expanded)) continue
    seen.add(expanded)
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
  const slots: SynonymSlot[] = []

  // Pass 1: longest exact phrase / whole-token match.
  // Single-word keys must be a full token so "održaj" does not fire inside
  // "održajem" and splice to "dosjelostem". Inflected tokens are Pass 2.
  for (const key of DICTIONARY_KEYS_LONGEST_FIRST) {
    if (!isEligibleDictionaryKey(key)) continue

    const re = new RegExp(escapeRegExp(key), "gi")
    let match: RegExpExecArray | null
    while ((match = re.exec(lower)) !== null) {
      const start = match.index
      const end = start + match[0].length
      if (overlaps(usedSpans, start, end)) continue
      if (!key.includes(" ") && !isWholeToken(lower, start, end)) continue

      const synonyms = SYNONYM_MAP.get(key) ?? []
      tryAddSlot(slots, usedSpans, start, end, synonyms)
    }
  }

  // Pass 2: single-word stem matches for inflected forms not caught above.
  if (stemWord) {
    const stemToKeys = buildStemToSingleKeys(stemWord)
    const tokenRe = /\S+/g
    let tokenMatch: RegExpExecArray | null
    while ((tokenMatch = tokenRe.exec(lower)) !== null) {
      const start = tokenMatch.index
      const end = start + tokenMatch[0].length
      if (overlaps(usedSpans, start, end)) continue

      const stem = stemWord(tokenMatch[0])
      const keys = stemToKeys.get(stem)
      if (!keys || keys.length === 0) continue

      for (const key of keys) {
        const synonyms = SYNONYM_MAP.get(key) ?? []
        if (synonyms.length === 0) continue
        tryAddSlot(slots, usedSpans, start, end, synonyms)
        break
      }
    }
  }

  const seen = new Set<string>()
  const expansions: string[] = []

  // Cross-product of single-word slots, full swap first.
  expansions.push(
    ...cartesianSingleWordExpansions(trimmed, slots, maxExpansions, seen),
  )

  // Multi-word synonym values replace the whole query (not spliced).
  if (expansions.length < maxExpansions) {
    for (const slot of slots) {
      if (expansions.length >= maxExpansions) break
      pushMultiWordExpansions({
        synonyms: slot.multiWordSynonyms,
        expansions,
        seen,
        maxExpansions,
      })
    }
  }

  return expansions
}
