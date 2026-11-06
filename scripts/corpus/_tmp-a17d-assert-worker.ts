/**
 * A17 part five. Phase-6 dry run with the settled write decisions.
 * Chemicals copy 1, the seven citation genitives, amending_act at insert,
 * and one copy of each remaining identical six-column key.
 * Rows past the second piece are kept. No database writes.
 * finderFlags and detail are optional. Omitted, the run is the old finder.
 */
import { createHash } from "crypto"
import { parentPort } from "worker_threads"
import { findHeadings, processLaw, stripEditorial, type FinderFlags } from "./_tmp-serbia-phase3"
import { applyRepairs } from "./_tmp-serbia-phase6"
import { amendingActAt, findActs, findMarkers, findSignatures } from "./_tmp-a17d-act"

type Chunk = { id?: string; article_num: string; text_local: string }
type Request = { id: number; law: string; chunks: Chunk[]; finderFlags?: FinderFlags; detail?: boolean; emitRows?: boolean; skipTokens?: boolean; skipDivide?: boolean; diagnoseEmpty?: boolean; rubricCensus?: boolean; pieceCensus?: boolean }
type Repair = { was: string; now: string; context: string }

const CHEMICALS = "Закон о хемикалијама"
const CONSTITUTION = "УСТАВ РЕПУБЛИКЕ СРБИЈЕ"
const AIR = "ЗАКОН о ваздушном саобраћају"
const CONSTITUTION_HEADS = ["101", "102", "103", "165", "165a", "165а", "170", "171", "172", "188", "189", "190"]
const COLLISION = new Set(["КРИВИЧНИ ЗАКОНИК", "ЗАКОН о стечају"])
const GAP = new Set([
  "Закон о Акционом плану хармонизације економских система држава чланица државне заједнице Србија и Црна Гора ради спречавања и уклањања препрека слободном протоку људи, робе, услуга и капитала",
  "ПОСЕБАН КОЛЕКТИВНИ УГОВОР за грађевинарство и индустрију грађевинског материјала Србије",
])
const CITATION = new Set(["закона", "законика", "уредбе", "правилника", "устава", "споразума", "протокола"])
const LINE_START = /^Члан[ \t]+[0-9]/u
const ANY_CLAN = /(?<!\p{L})Члан[ \t]+[0-9]/gu

function contiguousOf(chunks: Chunk[]): boolean {
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

function gateReason(law: string, joined: string, ordered: Chunk[], flags?: FinderFlags): string {
  const headings = findHeadings(joined, false, flags)
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

function headingDiff(text: string, flags: FinderFlags): { novel: number; lost: number; changed: Repair[]; firstPlain: number | null; firstFlag: number | null } {
  const base = findHeadings(text, false)
  const flagged = findHeadings(text, false, flags)
  const baseNum = new Map(base.map((hit) => [hit.index, hit.articleNum]))
  const flaggedAt = new Set(flagged.map((hit) => hit.index))
  const changed: Repair[] = []
  let novel = 0
  for (const hit of flagged) {
    const prev = baseNum.get(hit.index)
    if (prev == null) novel += 1
    else if (prev !== hit.articleNum) {
      changed.push({
        was: prev,
        now: hit.articleNum,
        context: text.slice(hit.index, Math.min(text.length, hit.index + hit.length + 40)).replace(/\s+/g, " "),
      })
    }
  }
  let lost = 0
  for (const hit of base) if (!flaggedAt.has(hit.index)) lost += 1
  const earliest = (hits: Array<{ index: number }>) => hits.reduce<number | null>((min, hit) => (min == null || hit.index < min ? hit.index : min), null)
  return { novel, lost, changed, firstPlain: earliest(base), firstFlag: earliest(flagged) }
}

function chunkAt(spans: Array<{ id: string; start: number; end: number }>, offset: number): string | null {
  const hit = spans.find((span) => offset >= span.start && offset < span.end) ?? spans[spans.length - 1]
  return hit?.id ?? null
}

function lineOffsetInOriginal(originalLine: string, repairedLine: string, lineOffset: number): number {
  if (originalLine === repairedLine) return Math.min(lineOffset, originalLine.length)
  let originalIndex = 0
  let repairedIndex = 0
  while (repairedIndex < lineOffset && originalIndex < originalLine.length) {
    if (originalLine[originalIndex] === repairedLine[repairedIndex]) repairedIndex += 1
    originalIndex += 1
  }
  return originalIndex
}

function strippedToOriginal(original: string, repaired: string, source: string, stripped: string): ((at: number) => number | null) | null {
  const originalLines = original.split("\n")
  const repairedLines = repaired.split("\n")
  const sourceLines = source.split("\n")
  const strippedLines = stripped.split("\n")
  if (originalLines.length !== repairedLines.length || !repaired.startsWith(source)) return null
  for (let i = 0; i < sourceLines.length - 1; i += 1) if (sourceLines[i] !== repairedLines[i]) return null
  const strippedToSource: number[] = []
  let sourceLine = 0
  for (const line of strippedLines) {
    while (sourceLine < sourceLines.length && sourceLines[sourceLine] !== line) sourceLine += 1
    if (sourceLine >= sourceLines.length) return null
    strippedToSource.push(sourceLine)
    sourceLine += 1
  }
  const originalStart: number[] = []
  let originalAt = 0
  for (let i = 0; i < originalLines.length; i += 1) {
    originalStart.push(originalAt)
    originalAt += originalLines[i]!.length + (i + 1 < originalLines.length ? 1 : 0)
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
    const sourceIndex = strippedToSource[lo]!
    const within = lineOffsetInOriginal(originalLines[sourceIndex] ?? "", repairedLines[sourceIndex] ?? "", lineOffset)
    return originalStart[sourceIndex]! + within
  }
}

function undistinguishedArticles(
  produced: Array<{ article_num: string; paragraph_num: string | null; heading_index: number; text?: string }>,
  markers: ReturnType<typeof findMarkers>,
  acts: ReturnType<typeof findActs>,
  signatures: number[],
): string[] {
  const bodies = new Map<number, { article: string; parts: string[] }>()
  for (const piece of produced) {
    const slot = bodies.get(piece.heading_index) ?? { article: piece.article_num, parts: [] }
    slot.parts.push(piece.text ?? "")
    bodies.set(piece.heading_index, slot)
  }
  const byArticle = new Map<string, Array<{ act: string; hash: string }>>()
  for (const [index, slot] of bodies) {
    const list = byArticle.get(slot.article) ?? []
    list.push({
      act: amendingActAt(index, markers, acts, signatures) ?? "",
      hash: textHash(slot.parts.join("")),
    })
    byArticle.set(slot.article, list)
  }
  const duplicates: string[] = []
  for (const [article, list] of byArticle) {
    const byAct = new Map<string, Set<string>>()
    for (const row of list) {
      const set = byAct.get(row.act) ?? new Set<string>()
      set.add(row.hash)
      byAct.set(row.act, set)
    }
    for (const set of byAct.values()) {
      if (set.size > 1) {
        duplicates.push(article)
        break
      }
    }
  }
  return duplicates
}

function lineStartsOf(text: string): number[] {
  const starts = [0]
  for (let i = 0; i < text.length; i += 1) if (text[i] === "\n") starts.push(i + 1)
  return starts
}

function mapOffset(sourceStarts: number[], keptSourceLines: number[], strippedStarts: number[], offset: number): number {
  let line = 0
  while (line + 1 < strippedStarts.length && strippedStarts[line + 1]! <= offset) line += 1
  const sourceLine = keptSourceLines[line]
  if (sourceLine == null || sourceStarts[sourceLine] == null) return -1
  return sourceStarts[sourceLine]! + (offset - strippedStarts[line]!)
}

parentPort?.on("message", (msg: Request) => {
  try {
    const ordered = [...msg.chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
    const joined = ordered.map((row) => row.text_local ?? "").join("")
    const plainReason = gateReason(msg.law, joined, ordered)
    const reason = msg.finderFlags ? gateReason(msg.law, joined, ordered, msg.finderFlags) : plainReason
    const rawRepairs = msg.detail ? headingDiff(joined, { lowerSuffix: true }).changed : undefined
    const gateNote = msg.detail ? { gate_from: plainReason, gate_to: reason, raw_repairs: rawRepairs } : {}
    if (reason !== "kept") {
      parentPort?.postMessage({ id: msg.id, law: msg.law, kept: false, reason, chunks: ordered.length, ...gateNote })
      return
    }
    const repaired = applyRepairs(msg.law, joined).text
    let source = repaired
    let chemicalsCut = 0
    if (msg.law === CHEMICALS) {
      const signatures = findSignatures(source, msg.law, "1")
      if (signatures.length >= 2 && signatures[1]! > 0 && signatures[1]! < source.length) {
        chemicalsCut = source.length - signatures[1]!
        source = source.slice(0, signatures[1])
      }
    }
    const fake = ordered.map((chunk, index) => ({
      article_num: chunk.article_num,
      text_local: index === 0 ? source : "",
    }))
    const result = processLaw(msg.law, fake, true, {
      includeText: true,
      skipTokens: msg.skipTokens === true,
      skipDivide: msg.skipDivide === true,
      foldHeadings: false,
      citationGenitives: CITATION,
      ...(msg.detail ? { includeRemainder: true } : {}),
      ...(msg.finderFlags ? { finderFlags: msg.finderFlags } : {}),
      ...(msg.rubricCensus ? { rubricCensus: true } : {}),
      ...(msg.pieceCensus ? { pieceCensus: true } : {}),
    })
    if (result.skip) {
      parentPort?.postMessage({
        id: msg.id,
        law: msg.law,
        kept: true,
        reason,
        chunks: ordered.length,
        skip: result.skip,
        ...gateNote,
      })
      return
    }
    const keptSourceLines: number[] = []
    const lineKinds: string[] = []
    const stripped = stripEditorial(source, msg.law, [], msg.diagnoseEmpty ? keptSourceLines : undefined, msg.diagnoseEmpty ? lineKinds : undefined)
    if (msg.diagnoseEmpty && stripped.length !== result.conservation_stripped) throw new Error(`${msg.law}: strip map ${stripped.length} != ${result.conservation_stripped}`)
    const markers = findMarkers(stripped)
    const acts = findActs(stripped)
    const firstArticle = findHeadings(stripped, false, msg.finderFlags)[0]?.articleNum ?? "1"
    const signatures = findSignatures(stripped, msg.law, firstArticle)
    const seen = new Set<string>()
    let outputRows = 0
    let outputChars = 0
    let deduped = 0
    let dedupedChars = 0
    const dedupeSamples: Array<{ article_num: string; paragraph_num: string | null; amending_act: string | null; bytes: number }> = []
    const counts = new Map<string, number>()
    const rows: Array<{ law_name_local: string; article_num: string; paragraph_num: string | null; amending_act: string | null; text_local: string; source_chunk_id: string | null }> = []
    const locate = msg.emitRows ? strippedToOriginal(joined, repaired, source, stripped) : null
    let cursor = 0
    const chunkSpans = ordered.map((row) => {
      const start = cursor
      cursor += (row.text_local ?? "").length
      return { id: row.id ?? "", start, end: cursor }
    })
    let missingSource = 0
    for (const piece of result.produced ?? []) {
      const text = piece.text ?? ""
      const amending = amendingActAt(piece.heading_index, markers, acts, signatures)
      const key = `${piece.article_num}\u0000${piece.paragraph_num ?? ""}\u0000${amending ?? ""}\u0000${textHash(text)}`
      counts.set(key, (counts.get(key) ?? 0) + 1)
      if (seen.has(key)) {
        deduped += 1
        dedupedChars += text.length
        if (dedupeSamples.length < 80) {
          dedupeSamples.push({
            article_num: piece.article_num,
            paragraph_num: piece.paragraph_num,
            amending_act: amending,
            bytes: text.length,
          })
        }
        continue
      }
      seen.add(key)
      outputRows += 1
      outputChars += text.length
      if (msg.emitRows) {
        const place = locate ? locate(piece.heading_index) : null
        const sourceId = place == null ? null : chunkAt(chunkSpans, place)
        if (!sourceId) missingSource += 1
        rows.push({
          law_name_local: msg.law,
          article_num: piece.article_num,
          paragraph_num: piece.paragraph_num,
          amending_act: amending,
          text_local: text,
          source_chunk_id: sourceId,
        })
      }
    }
    const sixGroups = [...counts.values()].filter((n) => n > 1).length
    const sixRows = [...counts.values()].reduce((total, n) => total + (n > 1 ? n : 0), 0)
    const detail = msg.detail ? headingDiff(stripped, msg.finderFlags ?? { lowerSuffix: true }) : null
    let starPlacement: { occurrences: number; line_start: number; misplaced: number; misplaced_own: number; prefix: number; own: number } | null = null
    if (msg.detail && msg.finderFlags?.starAfter) {
      const base = findHeadings(stripped, false, { ...msg.finderFlags, starAfter: false })
      const next = findHeadings(stripped, false, msg.finderFlags)
      const nextAt = new Map(next.map((hit) => [hit.index, hit]))
      const emptyAt = new Set((result.empty_texts ?? []).map((row) => row.heading))
      const starLine = /(?<!\p{L})(?:Članak|Član|Члан)[ \t]+(\d+)\.\*/gu
      starPlacement = { occurrences: 0, line_start: 0, misplaced: 0, misplaced_own: 0, prefix: 0, own: 0 }
      for (const match of stripped.matchAll(starLine)) {
        const index = match.index ?? 0
        const found = match[1] ?? ""
        starPlacement.occurrences += 1
        if (index === 0 || stripped[index - 1] === "\n") starPlacement.line_start += 1
        let host = ""
        for (const hit of base) if (hit.index <= index) host = hit.articleNum
        const owned = nextAt.get(index)?.articleNum === found && !emptyAt.has(index)
        if (owned) starPlacement.own += 1
        if (host === "") starPlacement.prefix += 1
        else if (host !== found) {
          starPlacement.misplaced += 1
          if (owned) starPlacement.misplaced_own += 1
        }
      }
    }
    const remainder = result.remainder ?? ""
    let emptyUnstripped: Array<{ article: string; span_text: string; unstripped_body: string; rules: Record<string, number>; nonws: Record<string, number>; nonwhitespace: number; amending_act: string | null; removed: Array<{ kind: string; text: string }> }> | undefined
    let starredGazetteNumbers: string[] | undefined
    if (msg.diagnoseEmpty) {
      const sourceStarts = lineStartsOf(source)
      const strippedStarts = lineStartsOf(stripped)
      const sourceLines = source.split("\n")
      emptyUnstripped = []
      for (const row of result.empty_texts ?? []) {
        const tokenEnd = row.heading + (row.length ?? 0)
        let decoration = 0
        const gap = stripped.slice(tokenEnd, row.next ?? stripped.length)
        let period = stripped.slice(row.heading, tokenEnd).endsWith(".")
        while (decoration < gap.length) {
          const ch = gap[decoration]!
          if (ch === " " || ch === "\t" || ch === "*") {
            decoration += 1
            continue
          }
          if (ch === "." && !period) {
            period = true
            decoration += 1
            continue
          }
          break
        }
        const start = mapOffset(sourceStarts, keptSourceLines, strippedStarts, tokenEnd + decoration)
        const end = mapOffset(sourceStarts, keptSourceLines, strippedStarts, row.next ?? stripped.length)
        const body = start >= 0 && end >= start ? source.slice(start, end) : ""
        const rules: Record<string, number> = {}
        const nonws: Record<string, number> = {}
        const removed: Array<{ kind: string; text: string }> = []
        if (start >= 0 && end >= start) {
          let offset = 0
          for (let li = 0; li < sourceLines.length; li += 1) {
            const line = sourceLines[li] ?? ""
            const lineEnd = offset + line.length
            const overlapStart = Math.max(offset, start)
            const overlapEnd = Math.min(lineEnd, end)
            const kind = lineKinds[li] ?? "unknown"
            if (overlapStart < overlapEnd) {
              const piece = source.slice(overlapStart, overlapEnd)
              rules[kind] = (rules[kind] ?? 0) + piece.length
              const words = piece.replace(/\s/gu, "").length
              if (words > 0) nonws[kind] = (nonws[kind] ?? 0) + words
              if (kind !== "kept" && line.trim() !== "") removed.push({ kind, text: line })
            }
            offset = lineEnd + 1
          }
        }
        emptyUnstripped.push({
          article: row.article,
          span_text: row.text,
          unstripped_body: body,
          rules,
          nonws,
          nonwhitespace: body.replace(/\s/gu, "").length,
          amending_act: amendingActAt(row.heading, markers, acts, signatures),
          removed,
        })
      }
      const numbers = new Set<string>()
      for (const row of result.strips ?? []) {
        if (row.kind !== "starred_gazette") continue
        for (const match of row.text.matchAll(/\d{1,4}\s*\/\s*\d{2,4}/gu)) numbers.add(match[0].replace(/\s+/gu, ""))
      }
      starredGazetteNumbers = [...numbers]
    }
    const articleText = (article: string) =>
      (result.produced ?? []).filter((piece) => piece.article_num === article).map((piece) => piece.text ?? "").join("")
    const constitution = msg.rubricCensus && msg.law === CONSTITUTION
      ? {
          rows: result.output_rows,
          prefix: result.remainder_chars,
          articles: (result.produced ?? []).map((piece) => piece.article_num),
          heads: CONSTITUTION_HEADS.filter((article, index, all) => all.indexOf(article) === index && articleText(article).length > 0).map((article) => ({
            article,
            text: articleText(article).slice(0, 120),
          })),
        }
      : undefined
    const air = msg.rubricCensus && msg.law === AIR
      ? {
          law: msg.law,
          articles: ["196", "196а", "197"].map((article) => ({ article, text: articleText(article).slice(0, 500) })),
        }
      : undefined
    parentPort?.postMessage({
      id: msg.id,
      law: msg.law,
      kept: true,
      reason,
      chunks: ordered.length,
      deleted_chars: joined.length,
      chemicals_cut: chemicalsCut,
      output_rows: outputRows,
      rows_before: result.output_rows,
      output_chars: outputChars,
      articles: result.articles,
      title_rows: result.title_rows,
      chapter_rows: result.chapter_rows,
      articles_no_title: result.articles_no_title,
      articles_over_two_pieces: result.articles_over_two_pieces,
      max_tokens: result.max_tokens,
      rows_over_token_limit: result.rows_over_token_limit,
      boundary_failed: result.boundary_failed,
      paragraph_bad: result.paragraph_bad,
      text_mismatch: result.text_mismatch,
      embed_tokens: result.embed_tokens,
      split_rules: result.split_rules,
      citation_headings: result.citation_headings ?? 0,
      conservation_stripped: result.conservation_stripped ?? 0,
      conservation_rebuilt: result.conservation_rebuilt ?? 0,
      exceptions: result.exceptions ?? [],
      empty_heading: result.empty_heading ?? 0,
      empty_rows: result.empty_rows ?? 0,
      empty_chars: result.empty_chars ?? 0,
      empty_skipped: result.empty_skipped ?? [],
      empty_texts: result.empty_texts ?? [],
      located_headings: result.located_headings ?? 0,
      located_articles: result.located_articles ?? 0,
      emitted_articles: result.emitted_articles ?? 0,
      absent_articles: result.absent_articles ?? [],
      ...(msg.law === CHEMICALS
        ? {
            chemicals_articles: [...new Set((result.produced ?? []).map((piece) => piece.article_num))],
            chemicals_article_1: (result.produced ?? []).find((piece) => piece.article_num === "1")?.text?.slice(0, 150) ?? "",
            chemicals_article_86: (result.produced ?? []).find((piece) => piece.article_num === "86")?.text?.slice(0, 150) ?? "",
          }
        : {}),
      only_empty: [...new Set((result.empty_skipped ?? []).map((line) => {
        const marker = " article "
        const at = line.lastIndexOf(marker)
        return at === -1 ? line : line.slice(at + marker.length)
      }))].filter((article) => !(result.produced ?? []).some((piece) => piece.article_num === article)),
      star_rows: result.star_rows ?? 0,
      empty_star_rows: result.empty_star_rows ?? 0,
      empty_host_rows: result.empty_host_rows ?? 0,
      absorbed_rows: result.absorbed_rows ?? 0,
      glued_heading_cuts: result.glued_heading_cuts ?? 0,
      deduped_chars: dedupedChars,
      missing_source: missingSource,
      ...(msg.emitRows ? { rows } : {}),
      deduped,
      dedupe_samples: dedupeSamples,
      six_groups_before_dedupe: sixGroups,
      six_duplicate_rows_before_dedupe: sixRows,
      ...gateNote,
      ...(detail
        ? {
            novel: detail.novel,
            lost: detail.lost,
            repairs: detail.changed,
            first_plain: detail.firstPlain,
            first_flag: detail.firstFlag,
            prefix_chars: remainder.length,
            ...(remainder.length > 0 ? { prefix: remainder } : {}),
            dup_articles: undistinguishedArticles(result.produced ?? [], markers, acts, signatures),
            ...(starPlacement ? { star_placement: starPlacement } : {}),
          }
        : {}),
      ...(emptyUnstripped ? { empty_unstripped: emptyUnstripped, starred_gazette_numbers: starredGazetteNumbers ?? [] } : {}),
      ...(result.rubric_census ? { rubric_census: result.rubric_census } : {}),
      ...(result.piece_census ? { piece_census: result.piece_census } : {}),
      ...(constitution ? { constitution } : {}),
      ...(air ? { air } : {}),
    })
  } catch (error) {
    parentPort?.postMessage({
      id: msg.id,
      law: msg.law,
      error: error instanceof Error ? error.message : String(error),
    })
  }
})
