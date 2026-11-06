import { articleCitationLabel } from "@/lib/articleCitation"

/**
 * Display trim for a stored statute window.
 *
 * The partition is driven by the text, not by is_excerpt. That flag defaults
 * to true and is also set on article parts the split produced, so using it
 * as a gate would hide the real first sentence of a legitimate part.
 * Nothing is deleted: head + body + tail is the original string. A row whose
 * opening and ending are already intact comes back as one body.
 */

export type TrimmedExcerpt = {
  /** Broken opening, rendered muted. Empty when the opening is kept or elided. */
  head: string
  /** Readable text. Markers for the badge are read from here only. */
  body: string
  /** Broken ending, rendered muted. */
  tail: string
  /** Markers inside `body`, in document order. */
  articleNums: string[]
  /** Body begins on an article marker or on that marker's rubrika. */
  bodyStartsAtMarker: boolean
  /** No head boundary within 200 characters. Render a bare leading ellipsis. */
  headElided: boolean
  /** Damaged ending with no sentence boundary to mute. Render a bare trailing ellipsis. */
  tailElided: boolean
}

const EDGE_CAP = 200
const RUBRIKA_GAP = 120

const ABBREV = new Set([
  "br",
  "st",
  "tač",
  "tačka",
  "toč",
  "točka",
  "čl",
  "t",
  "al",
  "sl",
  "god",
  "odn",
  "npr",
  "itd",
  "str",
  "tj",
  "dr",
  "mr",
  "prof",
])

const ROMAN =
  /^(?:ii|iii|iv|vi|vii|viii|ix|xi|xii|xiii|xiv|xv|xvi|xvii|xviii|xix|xx)$/i

const CLEAN_END = new Set([".", "!", "?", ":", '"'])

type Boundary = { punct: number; next: number; atEnd: boolean }
type Marker = { index: number; num: string }

export function statuteDisplayBody(item: {
  text?: string | null
  text_local?: string | null
}): string {
  if (item.text_local && item.text_local.trim()) return item.text_local
  return item.text ?? ""
}

export function hasDamagedStart(text: string): boolean {
  let i = 0
  while (i < text.length && /\s/u.test(text[i] ?? "")) i += 1
  if (i >= text.length) return false
  const ch = text[i] ?? ""
  if (/\p{Ll}/u.test(ch)) return true
  // "5 (1)" is the tail of "Član 105". "5. člen" keeps its period.
  return /^\d+\s/u.test(text.slice(i))
}

export function hasDamagedEnd(text: string): boolean {
  let i = text.length - 1
  while (i >= 0 && /\s/u.test(text[i] ?? "")) i -= 1
  if (i < 0) return false
  return !CLEAN_END.has(text[i] ?? "")
}

function tokenBefore(text: string, punct: number): string {
  let i = punct - 1
  while (i >= 0 && /[\p{L}\p{N}]/u.test(text[i] ?? "")) i -= 1
  return text.slice(i + 1, punct)
}

function excludedToken(token: string): boolean {
  if (!token) return false
  if (/^\d+$/.test(token)) return true
  if (/^\p{L}$/u.test(token)) return true
  if (ABBREV.has(token.toLowerCase())) return true
  if (ROMAN.test(token)) return true
  return false
}

function boundaries(text: string): Boundary[] {
  const out: Boundary[] = []
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    if (ch !== "." && ch !== "!" && ch !== "?") continue
    const next = text[i + 1]
    const atEnd = next === undefined
    const followedBySpace = next != null && /\s/u.test(next)
    if (!atEnd && !followedBySpace) continue
    if (excludedToken(tokenBefore(text, i))) continue
    let j = i + 1
    while (j < text.length && /\s/u.test(text[j] ?? "")) j += 1
    out.push({ punct: i, next: j, atEnd })
  }
  return out
}

function markerPattern(jurisdiction: string): RegExp {
  const num = "(\\d{1,4}\\p{Ll}?)"
  const edge = "[\\p{L}\\p{N}]"
  if (jurisdiction === "croatia") {
    return new RegExp(`(?<!${edge})Članak\\s+${num}(?!${edge})`, "gu")
  }
  if (jurisdiction === "serbia") {
    return new RegExp(`(?<!${edge})Члан\\s+${num}(?!${edge})`, "gu")
  }
  if (jurisdiction === "slovenia") {
    return new RegExp(`(?<!${edge})(\\d{1,4}\\p{Ll}?)\\.\\s+člen(?!${edge})`, "gu")
  }
  return new RegExp(`(?<!${edge})Član\\s+${num}(?!${edge})`, "gu")
}

function findMarkers(text: string, jurisdiction: string): Marker[] {
  const out: Marker[] = []
  for (const match of text.matchAll(markerPattern(jurisdiction))) {
    const num = match[1]
    if (match.index == null || !num) continue
    out.push({ index: match.index, num })
  }
  return out
}

function rubrikaStart(
  text: string,
  markerIndex: number,
  bounds: Boundary[],
): number | null {
  let prev: Boundary | null = null
  for (const boundary of bounds) {
    if (boundary.next <= markerIndex) prev = boundary
    else break
  }
  if (!prev) return null
  const gap = text.slice(prev.next, markerIndex)
  if (gap.length <= RUBRIKA_GAP && boundaries(gap).length === 0) return prev.next
  return null
}

function firstSentenceStart(bounds: Boundary[], length: number): number | null {
  for (const boundary of bounds) {
    if (!boundary.atEnd && boundary.next < length) return boundary.next
  }
  return null
}

const ENUMERATOR = /(?:\d{1,3}\.\s|\(\d{1,3}\)\s)/gu

function startsProvision(text: string, index: number): boolean {
  if (index <= 0) return true
  let i = index - 1
  let crossedWhitespace = false
  while (i >= 0 && /\s/u.test(text[i] ?? "")) {
    if ((text[i] ?? "") === "\n") return true
    crossedWhitespace = true
    i -= 1
  }
  if (i < 0) return true
  const ch = text[i] ?? ""
  return (
    crossedWhitespace &&
    (ch === "." || ch === "!" || ch === "?" || ch === ":")
  )
}

function firstEnumerator(text: string): number | null {
  for (const match of text.matchAll(ENUMERATOR)) {
    if (match.index == null) continue
    if (startsProvision(text, match.index)) return match.index
  }
  return null
}

function withinCap(index: number | null): index is number {
  return index != null && index <= EDGE_CAP
}

function cheaper(a: number | null, b: number | null): number | null {
  if (a == null) return b
  if (b == null) return a
  return Math.min(a, b)
}

function bodyStartsAtMarker(
  headEnd: number,
  headElided: boolean,
  markerPos: number | null,
  rubrika: number | null,
): boolean {
  if (headElided) return false
  if (markerPos != null && headEnd === markerPos) return true
  if (rubrika != null && headEnd === rubrika) return true
  return false
}

export function excerptRangeLabel(
  jurisdiction: string,
  articleNums: string[],
): string | null {
  if (articleNums.length === 0) return null
  const first = articleNums[0] ?? ""
  const last = articleNums[articleNums.length - 1] ?? first
  const single = articleCitationLabel(jurisdiction, first, null)
  if (first === last) return single
  if (single === `${first}. člen`) return `${first}.\u2013${last}. člen`
  const span = `${first}\u2013${last}`
  if (single.startsWith(first)) return span + single.slice(first.length)
  if (single.endsWith(first)) return single.slice(0, -first.length) + span
  return single
}

export function excerptBadgeText(
  jurisdiction: string,
  excerpt: TrimmedExcerpt,
  excerptWord: string,
): string {
  const range = excerptRangeLabel(jurisdiction, excerpt.articleNums)
  if (!range) return excerptWord
  if (excerpt.bodyStartsAtMarker) return range
  return `${excerptWord} \u00b7 ${range}`
}

export function trimExcerpt(text: string, jurisdiction: string): TrimmedExcerpt {
  const original = text ?? ""
  const marks = findMarkers(original, jurisdiction)
  const bounds = boundaries(original)
  const markerPos = marks[0]?.index ?? null
  const rubrika =
    markerPos == null ? null : rubrikaStart(original, markerPos, bounds)

  let headEnd = 0
  let headElided = false
  if (hasDamagedStart(original)) {
    const sentence = firstSentenceStart(bounds, original.length)
    const enumerator = firstEnumerator(original)
    const loose = cheaper(sentence, enumerator)
    // A rubrika or a marker earns the clean badge, so either is worth its
    // cost. A sentence boundary and an enumerator do not, so the cheaper one
    // wins, and only when it is inside the cap.
    if (withinCap(rubrika)) headEnd = rubrika
    else if (withinCap(markerPos)) headEnd = markerPos
    else if (withinCap(loose)) headEnd = loose
    else headElided = true
  }

  let tailStart = original.length
  let tailElided = false
  if (hasDamagedEnd(original)) {
    const last = bounds.length > 0 ? bounds[bounds.length - 1] : null
    const punctEnd = last ? last.punct + 1 : null
    const tailLen =
      punctEnd != null && punctEnd > headEnd && punctEnd < original.length
        ? original.length - punctEnd
        : null
    if (tailLen != null && tailLen <= EDGE_CAP) tailStart = punctEnd as number
    else tailElided = true
  }

  const head = original.slice(0, headEnd)
  const body = original.slice(headEnd, tailStart)
  const tail = original.slice(tailStart)
  const articleNums = marks
    .filter((mark) => mark.index >= headEnd && mark.index < tailStart)
    .map((mark) => mark.num)

  return {
    head,
    body,
    tail,
    articleNums,
    bodyStartsAtMarker: bodyStartsAtMarker(headEnd, headElided, markerPos, rubrika),
    headElided,
    tailElided,
  }
}
