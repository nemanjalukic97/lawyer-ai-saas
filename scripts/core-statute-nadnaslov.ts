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

/**
 * PIS / NN put amendment stars after the sentence: "законом.*" / "zakona.**".
 * Citation parens hide a period the same way: "(члан 51. став 1.)".
 * Strip markers and trailing closers before punctuation and length tests.
 */
function stripTrailingMarkersAndCitations(t: string): string {
  let s = t.replace(/\s*[*†‡]+\s*$/u, "").trimEnd()
  s = s.replace(/[)\]]+\s*$/u, "").trimEnd()
  return s
}

function hasTerminalPunct(t: string): boolean {
  return /[.;:]$/.test(stripTrailingMarkersAndCitations(t))
}

/**
 * "Б рисан је" / "B risan je" — OCR inserted spaces inside the first word.
 */
export function normalizeSpacedFirstWord(line: string): string {
  const m = /^(\p{L}(?:\s+\p{L})+)/u.exec(line)
  if (!m) return line
  return m[1].replace(/\s+/g, "") + line.slice(m[1].length)
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
  const n = normalizeSpacedFirstWord(t)
  // Stars may be packed (*** ) or spaced (* *); title may wrap (*Службени г).
  // No \b after Cyrillic: JS word-boundary is ASCII-only, so it never fires.
  if (/^\*[\s\*]*Службени(\s|$)/u.test(n)) return true
  if (/^\*[\s\*]*Službeni(\s|$)/i.test(n)) return true
  if (/^\*[\s\*]*Narodne\s+novine/i.test(n)) return true
  if (/^Брисан[аиое]?\s+(је|су)(?:\s|$)/u.test(n)) return true
  if (/^Brisan[aoi]?\s+(je|su)(?:\s|$)/i.test(n)) return true
  // члан/назив m, одредба f, правило n; plurals ставови/одредбе/права
  if (/^(Престао|Престала|Престало)\s+је\s+да\s+важи(?:\s|$)/u.test(n)) {
    return true
  }
  if (/^(Престали|Престале|Престала)\s+су\s+да\s+важе(?:\s|$)/u.test(n)) {
    return true
  }
  if (/^(Prestao|Prestala|Prestalo)\s+je\s+da\s+važi(?:\s|$)/i.test(n)) {
    return true
  }
  if (/^(Prestali|Prestale|Prestala)\s+su\s+da\s+važe(?:\s|$)/i.test(n)) {
    return true
  }
  return false
}

/** "4) брисана је" / "6) брисан је" — deleted enumerated items, not headings. */
function isDeletedListItem(t: string): boolean {
  return /^\d+\)\s*(брисан|брисана|брисано|brisan|brisana|brisano)(?:\s|$|\()/iu.test(
    t,
  )
}

/**
 * Operative sentence with no terminal period, e.g. ZTD čl. 641:
 * "Odredba članka 161. ovoga Zakona ne primjenjuje se na dionice …".
 * Same family as Serbian property čl. 8 ("Право својине се може одузети…")
 * but with nothing to strip — the source omitted the period.
 *
 * Structural headings and noun-phrase nadnaslovi stay peelable. A finite
 * legal verb counts only when it appears before the first relative /
 * subordinating word, so titles like "Vrijeme za koje se određuje …" or
 * "Ovrha kad se … promijeni vlasnik" still peel.
 */
const SUBORDINATOR_RE =
  /\b(?:koji|koja|koje|kojega|kojemu|kojem|kojim|kojih|kojima|kad|kada|ako|ukoliko|dok|čim|gdje|који|која|које|којима|када)\b/iu

const MAIN_CLAUSE_VERB_RE =
  /\b(?:ne\s+)?(?:se\s+)?(?:primjenjuje|primjenjuju|uređuje|uređuju|određuje|određuju|smatra|smatraju|provodi|provode|nastavlja|nastavljaju|upotrebljava|upotrebljavaju|stupa|stupaju|примењује|примењују|уређује|одређује|сматра)\b/iu

function isUnpunctuatedOperativeLine(t: string): boolean {
  if (isStructuralHeadingLine(t)) return false
  if (isLowercaseSubsectionLabel(t)) return false
  if (/^(Odredba|Odredbe|Одредба|Одредбе)\s+(članka|člana|члана)\b/iu.test(t)) {
    return true
  }
  MAIN_CLAUSE_VERB_RE.lastIndex = 0
  const verb = MAIN_CLAUSE_VERB_RE.exec(t)
  if (!verb || verb.index === undefined) return false
  SUBORDINATOR_RE.lastIndex = 0
  const sub = SUBORDINATOR_RE.exec(t)
  if (!sub || sub.index === undefined) return true
  return verb.index < sub.index
}

function isPeelableHeadingLine(t: string): boolean {
  if (!t) return false
  if (isStavakLine(t)) return false
  if (isArticleHeadingLine(t)) return false
  if (isDeletedListItem(t)) return false
  if (isGazetteOrDeletionNote(t)) return false
  if (isUnpunctuatedOperativeLine(t)) return false
  // Comma too: "foo,*" is a sentence, not a heading. Wrap still uses
  // hasTerminalPunct ([.;:]) so a comma-ending line can be a continuation.
  const core = stripTrailingMarkersAndCitations(t)
  if (/[.,;:]$/.test(core)) return false
  if (isStructuralHeadingLine(t)) return true
  return core.length >= 8 && core.length <= 160
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

const HEALTH_HEADING_RE = /^(Članak|Član|Члан)\s+\d+/i
const HEALTH_STAVAK_RE = /^\(\d+[a-zа-я]?\)/i

function healthLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
}

function lastNonEmptyLine(
  body: string,
): { line: string; preceding: string | null } | null {
  const lines = body.split("\n")
  let lastIdx = lines.length - 1
  while (lastIdx >= 0 && !lines[lastIdx]!.trim()) lastIdx -= 1
  if (lastIdx < 0) return null
  return {
    line: lines[lastIdx]!.trim(),
    preceding: precedingNonEmptyLine(lines, lastIdx),
  }
}

function isHealthHeadingLike(t: string): boolean {
  if (isUnpunctuatedOperativeLine(t)) return false
  if (HEALTH_HEADING_RE.test(t)) return true
  if (isStructuralHeadingLine(t)) return true
  if (/^\p{Ll}[./)]\s+\S/u.test(t)) return true
  const core = stripTrailingMarkersAndCitations(t)
  if (/[.,;:!?]$/.test(core)) return false
  if (HEALTH_STAVAK_RE.test(t)) return false
  return t.length >= 2 && t.length <= 160
}

function isHealthOperative(t: string): boolean {
  if (!t || isGazetteOrDeletionNote(t) || isDeletedListItem(t)) return false
  if (isUnpunctuatedOperativeLine(t)) return true
  if (isHealthHeadingLike(t)) return false
  if (HEALTH_STAVAK_RE.test(t)) return true
  const core = stripTrailingMarkersAndCitations(t)
  if (/[.,;:!?]$/.test(core)) return true
  if (core.length > 160) return true
  return false
}

export type HeldRuleHit = {
  articleNum: string
  rule: "wrap" | "gazette" | "deletion-list" | "asterisk" | "paren-period"
  line: string
}

export type SplitHealth = {
  emptyLeftovers: { articleNum: string; preview: string }[]
  stolenSentences: { articleNum: string; first: string }[]
  suffixArticles: string[]
  held: HeldRuleHit[]
}

/** Why the last line of a pre-peel body did not move onto the next article. */
export function heldLastLineRule(
  body: string,
  articleNum: string,
): HeldRuleHit | null {
  const last = lastNonEmptyLine(body)
  if (!last) return null
  const { line, preceding } = last
  if (isDeletedListItem(line)) {
    return { articleNum, rule: "deletion-list", line }
  }
  if (isGazetteOrDeletionNote(line)) {
    return { articleNum, rule: "gazette", line }
  }
  const hadStar = /[*†‡]+\s*$/u.test(line)
  const hadCloser = /[)\]]+\s*$/u.test(line)
  const core = stripTrailingMarkersAndCitations(line)
  if (hadStar && /[.,;:]$/.test(core)) {
    return { articleNum, rule: "asterisk", line }
  }
  if (hadCloser && /[.,;:]$/.test(core)) {
    return { articleNum, rule: "paren-period", line }
  }
  if (
    isPeelableHeadingLine(line) &&
    isWrappedContinuation(line, preceding)
  ) {
    return { articleNum, rule: "wrap", line }
  }
  return null
}

export function scanSplitHealth<T extends HeadingPart>(
  prePeel: T[],
  postPeel: T[],
): SplitHealth {
  const held: HeldRuleHit[] = []
  for (const part of prePeel) {
    const hit = heldLastLineRule(part.body, part.articleNum)
    if (hit) held.push(hit)
  }

  const emptyLeftovers: SplitHealth["emptyLeftovers"] = []
  const stolenSentences: SplitHealth["stolenSentences"] = []
  const suffixArticles: string[] = []

  for (const part of postPeel) {
    if (/\p{L}$/u.test(part.articleNum)) suffixArticles.push(part.articleNum)
    const lines = healthLines(part.body)
    const first = lines[0] ?? ""
    if (isHealthOperative(first)) {
      stolenSentences.push({ articleNum: part.articleNum, first })
    }
    const rest = lines.filter((l) => !HEALTH_HEADING_RE.test(l))
    const hasOperative = rest.some(isHealthOperative)
    const hasDeletion = rest.some(
      (l) => isGazetteOrDeletionNote(l) || isDeletedListItem(l),
    )
    const restAreHeadings =
      rest.length === 0 ||
      rest.every(
        (l) =>
          isHealthHeadingLike(l) ||
          isGazetteOrDeletionNote(l) ||
          isDeletedListItem(l),
      )
    if (!hasOperative && !hasDeletion && restAreHeadings) {
      emptyLeftovers.push({
        articleNum: part.articleNum,
        preview: lines.join(" | ").slice(0, 200),
      })
    }
  }

  return { emptyLeftovers, stolenSentences, suffixArticles, held }
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
