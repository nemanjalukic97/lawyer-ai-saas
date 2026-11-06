/**
 * The final Serbia rehearsal, one law at a time.
 * Same gate, repairs, chemicals cut, citation genitives, and dedupe as
 * scripts/_tmp-a17d-assert-worker.ts. Adds the source chunk id.
 */
import { createHash } from "crypto"
import { findHeadings, processLaw, stripEditorial } from "./_tmp-serbia-phase3.ts"
import { applyRepairs } from "./_tmp-serbia-phase6.ts"
import { amendingActAt, findActs, findMarkers, findSignatures } from "./_tmp-a17d-act.ts"

export type Chunk = { id: string; article_num: string; text_local: string }
export type OutRow = {
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  amending_act: string | null
  text_local: string
  source_chunk_id: string | null
}
export type LawResult = {
  law: string
  kept: boolean
  reason: string
  chunks: number
  skip?: string
  error?: string
  output_rows: number
  articles: number
  max_tokens: number
  boundary_failed: number
  paragraph_bad: number
  text_mismatch: number
  conservation_stripped: number
  conservation_rebuilt: number
  exceptions: string[]
  deduped: number
  six_groups_before: number
  joined_chars: number
  rows: OutRow[]
}

const CHEMICALS = "Закон о хемикалијама"
const COLLISION = new Set(["КРИВИЧНИ ЗАКОНИК", "ЗАКОН о стечају"])
const GAP = new Set([
  "Закон о Акционом плану хармонизације економских система држава чланица државне заједнице Србија и Црна Гора ради спречавања и уклањања препрека слободном протоку људи, робе, услуга и капитала",
  "ПОСЕБАН КОЛЕКТИВНИ УГОВОР за грађевинарство и индустрију грађевинског материјала Србије",
])
const CITATION = new Set(["закона", "законика", "уредбе", "правилника", "устава", "споразума", "протокола"])
const LINE_START = /^Члан[ \t]+[0-9]/u
const ANY_CLAN = /(?<!\p{L})Члан[ \t]+[0-9]/gu

function contiguousOf(chunks: Array<{ article_num: string }>): boolean {
  const nums = chunks.map((row) => (/^[1-9][0-9]*$/.test(row.article_num) ? Number(row.article_num) : null))
  if (!nums.every((n) => n != null)) return false
  const present = new Set(nums as number[])
  if (present.size !== chunks.length || present.size === 0) return false
  if (Math.min(...present) !== 1 || Math.max(...present) !== chunks.length) return false
  for (let n = 1; n <= chunks.length; n += 1) if (!present.has(n)) return false
  return true
}

function keeps(at: number | null, chars: number): boolean {
  return at != null && chars - at > at
}

function textHash(text: string): string {
  const collapsed = text.replace(/[ \t\n\r\f\v]+/g, " ").replace(/^ +| +$/g, "")
  return createHash("md5").update(collapsed, "utf8").digest("hex")
}

function gateReason(law: string, joined: string, ordered: Array<{ article_num: string }>): string {
  const headings = findHeadings(joined, false)
  const first = headings[0]?.index ?? null
  const hard = COLLISION.has(law) || GAP.has(law)
  if (keeps(first, joined.length) && contiguousOf(ordered) && !hard) return "kept"
  if (COLLISION.has(law)) return "collision"
  if (GAP.has(law)) return "numbering-gap"
  let lineStart = 0
  let inline = 0
  for (const line of joined.split("\n")) {
    const raw = line.replace(/\r$/, "")
    if (LINE_START.test(raw)) lineStart += 1
    ANY_CLAN.lastIndex = 0
    for (const match of raw.matchAll(ANY_CLAN)) if ((match.index ?? 0) !== 0) inline += 1
  }
  if (first == null && lineStart === 0 && inline === 0) return "no-heading"
  if (first == null) return "inline-outside-guard"
  if (first > joined.length - first) return "preamble"
  return "not-contiguous"
}

function chunkAt(spans: Array<{ id: string; start: number; end: number }>, offset: number): string | null {
  const hit = spans.find((span) => offset >= span.start && offset < span.end) ?? spans[spans.length - 1]
  return hit?.id ?? null
}

function strippedToOriginal(original: string, repaired: string, stripped: string): (at: number) => number | null {
  const originalLines = original.split("\n")
  const repairedLines = repaired.split("\n")
  const strippedLines = stripped.split("\n")
  if (originalLines.length !== repairedLines.length) return () => null
  const originalStart: number[] = []
  let originalAt = 0
  for (let i = 0; i < originalLines.length; i += 1) {
    originalStart.push(originalAt)
    originalAt += originalLines[i]!.length + (i + 1 < originalLines.length ? 1 : 0)
  }
  const strippedToRepaired: number[] = []
  let repairedLine = 0
  for (const line of strippedLines) {
    while (repairedLine < repairedLines.length && repairedLines[repairedLine] !== line) repairedLine += 1
    if (repairedLine >= repairedLines.length) return () => null
    strippedToRepaired.push(repairedLine)
    repairedLine += 1
  }
  const strippedStart: number[] = []
  let strippedAt = 0
  for (let i = 0; i < strippedLines.length; i += 1) {
    strippedStart.push(strippedAt)
    strippedAt += strippedLines[i]!.length + (i + 1 < strippedLines.length ? 1 : 0)
  }
  return (at: number) => {
    let lo = 0
    let hi = strippedStart.length - 1
    if (hi < 0) return null
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (strippedStart[mid]! <= at) lo = mid
      else hi = mid - 1
    }
    const lineOffset = at - strippedStart[lo]!
    const sourceLine = strippedToRepaired[lo]!
    const originalLine = originalLines[sourceLine] ?? ""
    const repairedLineText = repairedLines[sourceLine] ?? ""
    if (originalLine === repairedLineText) return originalStart[sourceLine]! + Math.min(lineOffset, originalLine.length)
    let originalIndex = 0
    let repairedIndex = 0
    while (repairedIndex < lineOffset && originalIndex < originalLine.length) {
      if (originalLine[originalIndex] === repairedLineText[repairedIndex]) repairedIndex += 1
      originalIndex += 1
    }
    return originalStart[sourceLine]! + originalIndex
  }
}

export function runLaw(law: string, chunks: Chunk[]): LawResult {
  const ordered = [...chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
  const joined = ordered.map((row) => row.text_local ?? "").join("")
  const reason = gateReason(law, joined, ordered)
  const empty: LawResult = {
    law,
    kept: false,
    reason,
    chunks: ordered.length,
    output_rows: 0,
    articles: 0,
    max_tokens: 0,
    boundary_failed: 0,
    paragraph_bad: 0,
    text_mismatch: 0,
    conservation_stripped: 0,
    conservation_rebuilt: 0,
    exceptions: [],
    deduped: 0,
    six_groups_before: 0,
    joined_chars: joined.length,
    rows: [],
  }
  if (reason !== "kept") return empty
  const repaired = applyRepairs(law, joined).text
  let source = repaired
  if (law === CHEMICALS) {
    const signatures = findSignatures(source, law, "1")
    if (signatures.length >= 2 && signatures[1]! > 0 && signatures[1]! < source.length) {
      source = source.slice(0, signatures[1])
    }
  }
  const fake = ordered.map((chunk, index) => ({
    article_num: chunk.article_num,
    text_local: index === 0 ? source : "",
  }))
  const result = processLaw(law, fake, true, {
    includeText: true,
    skipTokens: false,
    foldHeadings: false,
    citationGenitives: CITATION,
  })
  if (result.skip) {
    return { ...empty, kept: true, skip: result.skip }
  }
  const stripped = stripEditorial(source, law, [])
  const markers = findMarkers(stripped)
  const acts = findActs(stripped)
  const firstArticle = findHeadings(stripped, false)[0]?.articleNum ?? "1"
  const signatures = findSignatures(stripped, law, firstArticle)
  let cursor = 0
  const spans = ordered.map((row) => {
    const start = cursor
    cursor += (row.text_local ?? "").length
    return { id: row.id, start, end: cursor }
  })
  const toOriginal = strippedToOriginal(joined, source, stripped)
  const seen = new Set<string>()
  const counts = new Map<string, number>()
  const rows: OutRow[] = []
  let deduped = 0
  for (const piece of result.produced ?? []) {
    const text = piece.text ?? ""
    const amending = amendingActAt(piece.heading_index, markers, acts, signatures)
    const key = `${piece.article_num}\u0000${piece.paragraph_num ?? ""}\u0000${amending ?? ""}\u0000${textHash(text)}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
    if (seen.has(key)) {
      deduped += 1
      continue
    }
    seen.add(key)
    const place = toOriginal(piece.heading_index)
    rows.push({
      law_name_local: law,
      article_num: piece.article_num,
      paragraph_num: piece.paragraph_num,
      amending_act: amending,
      text_local: text,
      source_chunk_id: place == null ? null : chunkAt(spans, place),
    })
  }
  const sixGroups = [...counts.values()].filter((n) => n > 1).length
  return {
    law,
    kept: true,
    reason,
    chunks: ordered.length,
    output_rows: rows.length,
    articles: result.articles ?? 0,
    max_tokens: result.max_tokens ?? 0,
    boundary_failed: result.boundary_failed ?? 0,
    paragraph_bad: result.paragraph_bad ?? 0,
    text_mismatch: result.text_mismatch ?? 0,
    conservation_stripped: result.conservation_stripped ?? 0,
    conservation_rebuilt: result.conservation_rebuilt ?? 0,
    exceptions: result.exceptions ?? [],
    deduped,
    six_groups_before: sixGroups,
    joined_chars: joined.length,
    rows,
  }
}
