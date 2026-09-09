/**
 * Move a trailing nadnaslov / section heading from article N onto article N+1.
 * Official gazette order is title then "Članak N." / "Члан N."; the splitters
 * cut on the article heading, so the title was left on the previous body.
 */

export type HeadingPart = {
  articleNum: string
  body: string
}

export type PeelRecord = {
  law_name_local: string
  fromArticle: string
  toArticle: string
  line: string
}

const ARTICLE_HEADING_LINE_RE = /^(Članak|Član|Члан)\s+\d+/i
const STAVAK_LINE_RE = /^\(\d+[a-zа-я]?\)/i
const STRUCTURAL_HEADING_RE =
  /^(GLAVA|DIO|DEO|НАСЛОВ|ГЛАВА|ДЕО|ОДЕЉАК|ODJELJAK|ODELJAK|POGLAVLJE|ПОГЛАВЉЕ)\b/i
const NUMBERED_SECTION_RE = /^\d+(\.\d+)*\.\s+\S/
const ROMAN_SECTION_RE = /^[IVXLCDMХІXI]+\.\s/u

function isStavakLine(t: string): boolean {
  return STAVAK_LINE_RE.test(t)
}

function isArticleHeadingLine(t: string): boolean {
  return ARTICLE_HEADING_LINE_RE.test(t)
}

function hasTerminalPunct(t: string): boolean {
  return /[.;:]$/.test(t)
}

function isStructuralHeadingLine(t: string): boolean {
  if (STRUCTURAL_HEADING_RE.test(t)) return true
  if (NUMBERED_SECTION_RE.test(t) && t.length <= 160) return true
  if (ROMAN_SECTION_RE.test(t) && t.length <= 160) return true
  return false
}

/** a/ Foo, a) Foo, a. Foo, а) Foo — heading even when the letter is lowercase. */
function isLowercaseSubsectionLabel(t: string): boolean {
  return /^\p{Ll}[./)]\s+\S/u.test(t)
}

function precedingNonEmptyLine(lines: string[], lastIdx: number): string | null {
  for (let i = lastIdx - 1; i >= 0; i--) {
    const t = lines[i]!.trim()
    if (t) return t
  }
  return null
}

/**
 * Lowercase line whose previous line has no . ; : — a wrapped sentence, not a
 * nadnaslov. Subsection labels (a/ a) а.) still peel when stacked on another
 * heading that itself has no terminal punctuation.
 */
function isWrappedContinuation(line: string, preceding: string | null): boolean {
  if (!preceding) return false
  if (!/^\p{Ll}/u.test(line)) return false
  if (hasTerminalPunct(preceding)) return false
  if (isLowercaseSubsectionLabel(line)) return false
  return true
}

/** Gazette stars and PIS deletion notes stay on the article they sit on. */
function isGazetteOrDeletionNote(t: string): boolean {
  // Stars may be packed (*** ) or spaced (* *); title may wrap (*Службени г).
  // No \b after Cyrillic: JS word-boundary is ASCII-only, so it never fires.
  if (/^\*[\s\*]*Службени(\s|$)/u.test(t)) return true
  if (/^\*[\s\*]*Službeni(\s|$)/i.test(t)) return true
  if (/^\*[\s\*]*Narodne\s+novine/i.test(t)) return true
  if (/^Брисан[аиое]?\s+(је|су)(?:\s|$)/u.test(t)) return true
  if (/^Brisan[aoi]?\s+(je|su)(?:\s|$)/i.test(t)) return true
  return false
}

function isPeelableHeadingLine(t: string): boolean {
  if (!t) return false
  if (isStavakLine(t)) return false
  if (isArticleHeadingLine(t)) return false
  if (isGazetteOrDeletionNote(t)) return false
  if (hasTerminalPunct(t)) return false
  if (isStructuralHeadingLine(t)) return true
  return t.length >= 8 && t.length <= 160
}

function peelTrailingHeadings(body: string): { body: string; peeled: string[] } {
  const lines = body.split("\n")
  const peeled: string[] = []

  while (lines.length > 0) {
    let lastIdx = lines.length - 1
    while (lastIdx >= 0 && !lines[lastIdx]!.trim()) lastIdx -= 1
    if (lastIdx < 0) break

    const last = lines[lastIdx]!.trim()
    if (!isPeelableHeadingLine(last)) break
    if (isWrappedContinuation(last, precedingNonEmptyLine(lines, lastIdx))) {
      break
    }

    const remainingNonEmpty = lines
      .slice(0, lastIdx)
      .filter((line) => line.trim()).length
    if (remainingNonEmpty === 0) break

    peeled.unshift(last)
    lines.length = lastIdx
  }

  return { body: lines.join("\n").trimEnd(), peeled }
}

export function peelFlagReasons(line: string): string[] {
  const reasons: string[] = []
  if (line.length > 80) reasons.push("long")
  if (/\d/.test(line)) reasons.push("digit")
  if (/^\p{Ll}/u.test(line)) reasons.push("lowercase")
  return reasons
}

export function reattachTrailingHeadings<T extends HeadingPart>(
  parts: T[],
  lawNameLocal: string,
): { parts: T[]; peels: PeelRecord[] } {
  if (parts.length < 2) return { parts, peels: [] }

  const next = parts.map((part) => ({ ...part }))
  const peels: PeelRecord[] = []

  for (let i = 0; i < next.length - 1; i++) {
    const current = next[i]!
    const following = next[i + 1]!
    const { body, peeled } = peelTrailingHeadings(current.body)
    if (peeled.length === 0) continue
    current.body = body
    following.body = `${peeled.join("\n")}\n\n${following.body}`
    for (const line of peeled) {
      peels.push({
        law_name_local: lawNameLocal,
        fromArticle: current.articleNum,
        toArticle: following.articleNum,
        line,
      })
    }
  }

  return { parts: next, peels }
}

export function formatPeelReport(peels: PeelRecord[]): {
  full: string
  flagged: string
  total: number
  flaggedCount: number
} {
  const byLaw = new Map<string, PeelRecord[]>()
  for (const peel of peels) {
    const list = byLaw.get(peel.law_name_local) ?? []
    list.push(peel)
    byLaw.set(peel.law_name_local, list)
  }

  const fullLines: string[] = []
  const flaggedLines: string[] = []

  for (const [law, rows] of byLaw) {
    fullLines.push(`======== ${law} (${rows.length})`)
    for (const row of rows) {
      fullLines.push(`${row.fromArticle} -> ${row.toArticle}\t${row.line}`)
      const reasons = peelFlagReasons(row.line)
      if (reasons.length > 0) {
        flaggedLines.push(
          `${law}\t${row.fromArticle} -> ${row.toArticle}\t[${reasons.join(",")}]\t${row.line}`,
        )
      }
    }
    fullLines.push("")
  }

  return {
    full: fullLines.join("\n").trimEnd() + "\n",
    flagged: flaggedLines.join("\n") + (flaggedLines.length > 0 ? "\n" : ""),
    total: peels.length,
    flaggedCount: flaggedLines.length,
  }
}

export function sliceStatutesFrom<T extends { law_name_local: string }>(
  statutes: T[],
  fromLaw: string | null,
): T[] {
  if (!fromLaw) return statutes
  const idx = statutes.findIndex((s) => s.law_name_local === fromLaw)
  if (idx < 0) {
    throw new Error(
      `--from=${fromLaw} did not match any law_name_local. Known:\n` +
        statutes.map((s) => `  ${s.law_name_local}`).join("\n"),
    )
  }
  return statutes.slice(idx)
}

export function formatNamedArticleBodies(
  parts: HeadingPart[],
  articleNums: string[],
): string {
  const byNum = new Map(parts.map((part) => [part.articleNum, part.body]))
  const chunks: string[] = []
  for (const num of articleNums) {
    const body = byNum.get(num)
    if (body === undefined) {
      chunks.push(`----- čl. ${num} -----\nMISSING`)
    } else {
      chunks.push(`----- čl. ${num} -----\n${body}`)
    }
  }
  return chunks.join("\n\n")
}

export function parseFromLawArg(args: string[]): string | null {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg.startsWith("--from-json")) continue
    if (arg.startsWith("--from=")) return arg.slice("--from=".length)
    if (arg === "--from" && args[i + 1]) return args[i + 1]!
  }
  return null
}
