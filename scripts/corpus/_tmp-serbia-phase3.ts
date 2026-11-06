/**
 * Serbia phase 2. Read-only. No insert, delete, dump, or embedding call.
 * Selection is a snapshot of row ids taken once. Resume loads that file and
 * does not re-run the predicate. Credentials stay in the env files.
 */
import { createRequire } from "module"
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import dotenv from "dotenv"
import pg from "pg"

const require = createRequire(__filename)
const { getEncoding } = require("./_tmp-token/node_modules/js-tiktoken") as {
  getEncoding: (name: string) => {
    encode: (text: string, allowedSpecial?: string[] | "all", disallowedSpecial?: string[] | "all") => number[]
  }
}
const tokenEncoder = getEncoding("cl100k_base")

dotenv.config({ path: path.resolve(__dirname, "outreach/.env"), quiet: true })
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), quiet: true })

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is missing from scripts/outreach/.env and .env.local")

const GAZETTE_LINE = /^\("Sl\. list (?:CG|RCG)", br\. \d+\/\d{4}(?: - (?:ispr\.|odluka US|dr\. zakon))?(?:(?:, | i )\d+\/\d{4}(?: - (?:ispr\.|odluka US|dr\. zakon))?)*\)$/
const NOTE_HEADINGS = new Set(["NAPOMENA IZDAVAČA", "НАПОМЕНА ИЗДАВАЧА"])
const PLAIN_OLD = /^(Članak|Члан|Član)[ \t]+(\d+[A-Za-zČĆŽŠĐčćžšđ]*)(\*+)?\.?(?=[ \t\r]|$)/u
const PLAIN_ARTICLE = /^(Članak|Члан|Član)[ \t]+(\d+\p{L}{0,2})(\*+)?\.?(?=[ \t\r]|$)/u
// Члан 8.Предмети — the period is already at line start. The number stops before the period.
const GLUED_RUBRIC = /^(Članak|Члан|Član)[ \t]+(\d+\p{L}{0,2})\.(?=\p{L})/u
export function gluedRubricHeading(value: string): { articleNum: string; length: number } | null {
  const match = GLUED_RUBRIC.exec(value)
  if (!match) return null
  const articleNum = match[2] ?? ""
  if (!CITATION_NUM.test(articleNum)) return null
  return { articleNum, length: match[0].length }
}
const RANGE_ARTICLE =
  /^(?:Čl\.|Чл\.)[ \t]+(\d+\p{L}{0,2}(?:[ \t]*(?:-|–|i|и)[ \t]*\d+\p{L}{0,2})*)(?:[ \t]*\*+)?\.?[ \t]*$/u
const MARKER_ARTICLE =
  /^(Članak|Члан|Član)[ \t]+(\d+)(?:\.(\p{L}+)|(\p{L}{0,2}))((?:\*+|\[s\d+\]|\))*)[ \t]*$/u
const STAV_MARK = /^(?:\((\d+)\)|(\d+)\.)(?=[ \t\r]|$)/
const TARIFNI_OLD = /^Tarifni broj[ \t]+(\d+[A-Za-zČĆŽŠĐčćžšđ]*)(?=[ \t\r]|$)/iu
const TARIFNI_MARK = /^(?:Tarifni broj|Тарифни број|ТАРИФНИ БРОЈ)[ \t]+(\d+\p{L}{0,2})(?=[ \t\r]|$)/u
const ITEM_MARK = /^(\d+)\)(?=[ \t\r]|$)/
const ROMAN_LED = /^(?=[IVXLCDM])M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})(?:\.| )/u
const CITATION_NUM = /^\d+\p{L}{0,2}$/u
const SPLIT_AT = 6_000
const TOKEN_LIMIT = 7_000
const SENTENCE_END = new Set([".", ";", ":", "!", "?"])
const DOWNLOAD_LINES = new Set(["Prilog u PDF formatu možete preuzeti", "ovdje"])
const REPEAL_OLD = /^\((?:brisano|brisan|prestalo da važi|prestao da važi|брисано|брисан|брисана|престало да важи|престао да важи)\)\.?$/
const SERBIAN_REPEAL_FORMS = "(?:Брисан је|Брисани су|Брисана је|Брисано је)"
const SERBIAN_REPEAL = new RegExp(
  `^${SERBIAN_REPEAL_FORMS}(?:[ \\t]+[^\\n(]*)?\\([^)\\n]*\\)\\.?$`,
  "u",
)
const STRUCT_WORD = "(?:poglavlje|odjeljak|odsjek|glava|dio|поглавље|одељак|глава|део)"
const STRUCT_ORDINAL =
  "(?:(?:dvadeset|trideset|četrdeset)\\s+)?(?:prvi|prva|prvo|drugi|druga|drugo|treći|treća|treće|četvrti|četvrta|četvrto|peti|peta|peto|šesti|šesta|šesto|sedmi|sedma|sedmo|osmi|osma|osmo|deveti|deveta|deveto|deseti|deseta|deseto|jedanaesti|jedanaesta|dvanaesti|dvanaesta|trinaesti|trinaesta|četrnaesti|četrnaesta|petnaesti|petnaesta|šesnaesti|šesnaesta|sedamnaesti|sedamnaesta|osamnaesti|osamnaesta|devetnaesti|devetnaesta|dvadeseti|dvadeseta|trideseti|trideseta)"
const STRUCT_ROMAN = "(?=[ivxlcdm])m{0,4}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3})"
const STRUCT_CYR_ORDINAL =
  "(?:(?:двадесет|тридесет|четрдесет)\\s+)?(?:први|прва|прво|други|друга|друго|трећи|трећа|треће|четврти|четврта|четврто|пети|пета|пето|шести|шеста|шесто|седми|седма|седмо|осми|осма|осмо|девети|девета|девето|десети|десета|десето|једанаести|једанаеста|дванаести|дванаеста|тринаести|тринаеста|четрнаести|четрнаеста|петнаести|петнаеста|шеснаести|шеснаеста|седамнаести|седамнаеста|осамнаести|осамнаеста|деветнаести|деветнаеста|двадесети|двадесета)"
const STRUCT_NUM = `(?:${STRUCT_ROMAN}|\\d+)\\p{Ll}?`
const STRUCT_HEADING = new RegExp(
  `^(?:${STRUCT_WORD}\\s+(?:${STRUCT_NUM}|${STRUCT_ORDINAL}|${STRUCT_CYR_ORDINAL}|\\p{Ll})|(?:${STRUCT_NUM}|${STRUCT_ORDINAL}|${STRUCT_CYR_ORDINAL})\\s+${STRUCT_WORD}|opšti\\s+dio|posebni\\s+dio|општи\\s+део|посебни\\s+део)(?:\\s+\\p{Ll}|\\s*\\*+)?\\.?$`,
  "u",
)
const STRUCT_OLD = new RegExp(
  "^(?:glava|odsjek|odjeljak|dio|poglavlje)\\s+(?:(?=[ivxlcdm])m{0,4}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3})|\\d+)[a-z]?",
  "u",
)

const HOMOGLYPH_TO_CYR: Record<string, string> = {
  A: "А", a: "а", B: "В", b: "в", C: "С", c: "с", E: "Е", e: "е",
  H: "Н", h: "н", K: "К", k: "к", M: "М", m: "м", O: "О", o: "о",
  P: "Р", p: "р", T: "Т", t: "т", X: "Х", x: "х",
}
const CYR_TO_LAT: Record<string, string> = Object.fromEntries(
  Object.entries(HOMOGLYPH_TO_CYR).map(([lat, cyr]) => [cyr, lat]),
)
const LATIN_TWINS = new Set(Object.keys(HOMOGLYPH_TO_CYR))

function fold(value: string): string {
  return value.trim().toLocaleLowerCase("sr")
}
function cpLen(value: string): number {
  return [...value].length
}
function letterScript(ch: string): "cyr" | "lat" | "" {
  if (/\p{Script=Cyrillic}/u.test(ch)) return "cyr"
  if (/\p{Script=Latin}/u.test(ch)) return "lat"
  return ""
}
function majorityScript(value: string): "cyr" | "lat" | "none" {
  let cyr = 0
  let lat = 0
  for (const ch of value) {
    const script = letterScript(ch)
    if (script === "cyr") cyr += 1
    else if (script === "lat") lat += 1
  }
  if (cyr === 0 && lat === 0) return "none"
  return cyr >= lat ? "cyr" : "lat"
}
function canonicalizeHomoglyphs(value: string, script: "cyr" | "lat" | "none"): string {
  if (script === "none") return value
  const map = script === "cyr" ? HOMOGLYPH_TO_CYR : CYR_TO_LAT
  let out = ""
  for (const ch of value) out += map[ch] ?? ch
  return out
}
function isUpperLetter(ch: string | undefined): boolean {
  if (!ch || !/\p{L}/u.test(ch)) return false
  const upper = ch.toLocaleUpperCase("sr")
  const lower = ch.toLocaleLowerCase("sr")
  return ch === upper && ch !== lower
}
function isUpperStart(value: string): boolean {
  return /^\p{Lu}/u.test(value)
}
function isLowerStart(value: string): boolean {
  return /^\p{Ll}/u.test(value)
}
function isNumeralLed(value: string): boolean {
  return /^\d+(?:\.| )/u.test(value) || ROMAN_LED.test(value)
}
function isDigraphCaps(value: string): boolean {
  const chars = [...value]
  let letters = 0
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i]
    if (!ch || !/\p{L}/u.test(ch)) continue
    letters += 1
    if (isUpperLetter(ch)) continue
    if ((ch === "j" || ch === "ž") && isUpperLetter(chars[i - 1]) && isUpperLetter(chars[i + 1])) continue
    return false
  }
  return letters > 0
}
function isStructuralHeading(value: string): boolean {
  const folded = value.trim().toLocaleLowerCase("sr").replace(/\s+/g, " ")
  return STRUCT_HEADING.test(folded)
}
function isHeadingShaped(value: string): boolean {
  return isDigraphCaps(value) || isNumeralLed(value) || isStructuralHeading(value)
}
export function isArticleHeading(value: string): boolean {
  return PLAIN_ARTICLE.test(value) || gluedRubricHeading(value) != null || RANGE_ARTICLE.test(value) || MARKER_ARTICLE.test(value)
}
function isItemMarker(value: string): boolean {
  return /^(?:\(|\d+\)|[-–•])/u.test(value)
}
function endsWithPeriod(value: string): boolean {
  return value.endsWith(".")
}
function isRepealMarkerOld(value: string): boolean {
  return REPEAL_OLD.test(value)
}
function isSerbianRepeal(value: string): boolean {
  if (new RegExp(`^${SERBIAN_REPEAL_FORMS}\\.?$`, "u").test(value)) return true
  return SERBIAN_REPEAL.test(value)
}
function isRepealMarker(value: string): boolean {
  return isRepealMarkerOld(value) || isSerbianRepeal(value)
}
function sentenceEndWith(value: string, repeal: (line: string) => boolean): boolean {
  if (repeal(value)) return true
  const last = [...value].at(-1)
  return last != null && SENTENCE_END.has(last)
}
function sentenceEnd(value: string): boolean {
  return sentenceEndWith(value, isRepealMarker)
}
function repealRejectReason(line: string): string | null {
  if (isSerbianRepeal(line) || isRepealMarkerOld(line)) return null
  const form = line.match(/^(Брисан је|Брисани су|Брисана је|Брисано је)/u)
  if (!form) return "does-not-start-with-the-four-forms"
  if (!line.includes("(")) return "no-parenthetical"
  if (!/\)\.?$/u.test(line)) return "text-after-parenthetical"
  return "parenthetical-not-trailing"
}
function isSerbianGazetteLine(line: string): boolean {
  const trimmed = line.trim()
  if (!/^["„“«]?\s*Службени\s+(?:гласник|лист)(?!\p{Ll})/u.test(trimmed)) return false
  const folded = trimmed.replace(/\s+/g, "")
  if (/бр(?:\.|[оo][јj]|\d)/iu.test(folded) || folded.includes("број")) return true
  const unquoted = trimmed.replace(/^["„“«]\s*/u, "").replace(/["”»]\s*$/u, "")
  if (/^Службени\s+(?:гласник|лист)(?:\s+[А-ЯA-ZРСЈЉЊЂЋЏ]+)*\s*$/u.test(unquoted)) return true
  return /^Службени\s+гласник\s+Републике\s+Србије\s*$/u.test(unquoted)
}
const STARRED_CITE = /^(?:["„“«]\s*)?Службени\s+(?:гласник|лист)\s+[\p{L}"”».]{0,40}?[,\s]+(?:број|бр\.?)?\s*\d[\d\s/.,\-–]*(?:\s*од\s+\d{1,2}\.?\s+\p{L}+(?:\s+\d{4}\.?)?)?(?:\s*\([^)\n]{0,120}\))?\s*/u
function isStarredCitationOnly(line: string): boolean | null {
  const trimmed = line.trim()
  if (!/^\*+\s*["„“«]?\s*Службени\s+(?:гласник|лист)/u.test(trimmed)) return null
  let rest = trimmed
  for (let guard = 0; guard < 8; guard += 1) {
    rest = rest.replace(/^\*+\s*/u, "")
    const match = STARRED_CITE.exec(rest)
    if (!match || match[0].length === 0) break
    rest = rest.slice(match[0].length)
    if (rest.replace(/^[\s.]+/u, "") === "") return true
  }
  return rest.replace(/^[\s.]+/u, "") === ""
}
function publisherNoteAt(lines: string[], index: number): { text: string; next: number } | null {
  const core = lineCore(lines[index] ?? "")
  if (core === "NAPOMENA IZDAVAČA") {
    const block = [lines[index] ?? ""]
    let next = index + 1
    while (next < lines.length && lineCore(lines[next] ?? "") !== "") {
      block.push(lines[next] ?? "")
      next += 1
    }
    return { text: block.join("\n"), next }
  }
  if (/^НАПОМЕНА ИЗДАВАЧА\s*:?\s*$/u.test(core)) {
    const block = [lines[index] ?? ""]
    let next = index + 1
    while (next < lines.length && lineCore(lines[next] ?? "") === "") {
      block.push(lines[next] ?? "")
      next += 1
    }
    const bodyAt = next
    while (next < lines.length && lineCore(lines[next] ?? "") !== "") {
      block.push(lines[next] ?? "")
      next += 1
    }
    if (next === bodyAt || isArticleHeading(lineCore(lines[bodyAt] ?? ""))) {
      return { text: lines[index] ?? "", next: index + 1 }
    }
    return { text: block.join("\n"), next }
  }
  if (/^НАПОМЕНА ИЗДАВАЧА(?!\p{L})/u.test(core)) return { text: core, next: index + 1 }
  return null
}
export function isLawTitle(line: string, law: string): boolean {
  const script = majorityScript(law)
  const folded = fold(canonicalizeHomoglyphs(line, script))
  const name = fold(canonicalizeHomoglyphs(law, script))
  if (!folded || !name) return false
  if (!name.includes(folded)) return false
  return cpLen(folded) >= 0.5 * cpLen(name)
}
function isLawTitleNaive(line: string, law: string): boolean {
  const folded = fold(line)
  const name = fold(law)
  if (!folded || !name) return false
  if (!name.includes(folded)) return false
  return cpLen(folded) >= 0.5 * cpLen(name)
}
function isGazette(value: string): boolean {
  return GAZETTE_LINE.test(value) || isSerbianGazetteLine(value)
}
function lineCore(line: string): string {
  return line.replace(/\r$/, "").trim()
}
export function stripEditorial(
  text: string,
  lawName: string,
  strips: Array<{ law_name_local: string; kind: string; text: string }>,
  keptSourceLines?: number[],
  lineKinds?: string[],
): string {
  const lines = text.split("\n")
  const kept: string[] = []
  const mark = (from: number, to: number, kind: string) => {
    if (!lineKinds) return
    for (let line = from; line < to; line += 1) lineKinds[line] = kind
  }
  let i = 0
  while (i < lines.length) {
    const note = publisherNoteAt(lines, i)
    if (note) {
      strips.push({ law_name_local: lawName, kind: "publisher_note", text: note.text })
      mark(i, note.next, "publisher_note")
      i = note.next
      continue
    }
    if (DOWNLOAD_LINES.has(lineCore(lines[i] ?? ""))) {
      strips.push({ law_name_local: lawName, kind: "download_note", text: lineCore(lines[i] ?? "") })
      mark(i, i + 1, "download_note")
      i += 1
      continue
    }
    if (GAZETTE_LINE.test(lineCore(lines[i] ?? "")) || isSerbianGazetteLine(lines[i] ?? "")) {
      strips.push({ law_name_local: lawName, kind: "gazette", text: lineCore(lines[i] ?? "") })
      mark(i, i + 1, "gazette")
      i += 1
      continue
    }
    if (isStarredCitationOnly(lines[i] ?? "") === true) {
      strips.push({ law_name_local: lawName, kind: "starred_gazette", text: lineCore(lines[i] ?? "") })
      mark(i, i + 1, "starred_gazette")
      i += 1
      continue
    }
    kept.push(lines[i] ?? "")
    keptSourceLines?.push(i)
    mark(i, i + 1, "kept")
    i += 1
  }
  return kept.join("\n")
}
function lineStarts(text: string): number[] {
  const starts = [0]
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "\n") starts.push(i + 1)
  }
  return starts
}
function lineAt(text: string, start: number): string {
  const end = text.indexOf("\n", start)
  const raw = end === -1 ? text.slice(start) : text.slice(start, end)
  return raw.replace(/\r$/, "")
}
type Heading = { index: number; length: number; articleNum: string; line: string }
export type FinderFlags = {
  letterBefore?: boolean
  lowerSuffix?: boolean
  spaceInline?: boolean
  starAfter?: boolean
}
/** Phase 5 line-start lookalikes. One character to one character. No i/I, and no ѕ. */
const DETECTOR_TWINS: Record<string, string> = {
  A: "А", a: "а", B: "В", b: "в", C: "С", c: "с", E: "Е", e: "е",
  H: "Н", h: "н", K: "К", k: "к", M: "М", m: "м", O: "О", o: "о",
  P: "Р", p: "р", T: "Т", t: "т", X: "Х", x: "х",
}
export function foldDetectorLine(value: string): string {
  let out = ""
  for (const ch of value) out += DETECTOR_TWINS[ch] ?? ch
  return out
}
const INLINE_CLAN = /(?<!\p{L})Члан[ \t]+(\d+\p{L}{0,2})/gu
const NUMBERED_CAPS_TAIL = /(?:^|[\s.])(?:[IVXLCDM]{1,8}|[0-9]{1,3})\.\s+[\p{Lu}ЂЈЉЊЋЏ][\p{Lu}ЂЈЉЊЋЏ\s]{2,}$/u
export function isNumberedCapsPrefix(before: string): boolean {
  const trimmed = before.replace(/[ \t\u00a0]+$/u, "")
  if (trimmed.length === 0) return false
  const last = [...trimmed].at(-1) ?? ""
  if (".!?;:".includes(last)) return false
  return NUMBERED_CAPS_TAIL.test(trimmed.slice(-48))
}
function matchLineStart(line: string, start: number, original: string, starAfter = false): Heading | null {
  const plain = PLAIN_ARTICLE.exec(line)
  if (plain) return { index: start, length: plain[0].length, articleNum: plain[2] ?? "", line: original }
  if (starAfter) {
    const star = STAR_AFTER.exec(line)
    const articleNum = star?.[2] ?? ""
    if (star && CITATION_NUM.test(articleNum)) return { index: start, length: star[0].length, articleNum, line: original }
  }
  const glued = gluedRubricHeading(line)
  if (glued) return { index: start, length: glued.length, articleNum: glued.articleNum, line: original }
  const range = RANGE_ARTICLE.exec(line)
  if (range) {
    return {
      index: start,
      length: range[0].length,
      articleNum: (range[1] ?? "").replace(/[ \t]+/g, " ").trim(),
      line: original,
    }
  }
  const marker = MARKER_ARTICLE.exec(line)
  if (marker) {
    return {
      index: start,
      length: marker[0].length,
      articleNum: `${marker[2] ?? ""}${marker[3] ?? ""}${marker[4] ?? ""}`,
      line: original,
    }
  }
  return null
}
function lineStartHeading(line: string, start: number, fold: boolean, starAfter = false): Heading | null {
  const direct = matchLineStart(line, start, line, starAfter)
  if (direct) return direct
  if (!fold) return null
  const folded = foldDetectorLine(line)
  if (folded === line) return null
  return matchLineStart(folded, start, line, starAfter)
}
const HEADING_WORD = "(?:Članak|Члан|Član)"
const STAR_AFTER = /^(Članak|Члан|Član)[ \t]+(\d+\p{L}{0,2})\.\*+(?=[ \t\r]|$)/u

function pushHeading(hits: Heading[], hit: Heading): void {
  if (hits.some((kept) => kept.index === hit.index)) return
  hits.push(hit)
}

function retokenLowerSuffix(hits: Heading[], text: string): void {
  const number = /^(?:Članak|Члан|Član)[ \t]+(\d+\p{Ll}{0,2})/u
  for (const hit of hits) {
    const match = number.exec(text.slice(hit.index, hit.index + hit.length + 8))
    const articleNum = match?.[1]
    if (!articleNum || articleNum === hit.articleNum || !hit.articleNum.startsWith(articleNum)) continue
    const drop = [...hit.articleNum].length - [...articleNum].length
    if (drop <= 0) continue
    hit.articleNum = articleNum
    hit.length -= drop
  }
}

export function findHeadings(text: string, fold = true, flags?: FinderFlags): Heading[] {
  const hits: Heading[] = []
  const num = flags?.lowerSuffix ? "\\d+\\p{Ll}{0,2}" : "\\d+\\p{L}{0,2}"
  const tail = flags?.lowerSuffix ? "(?:\\*+)?\\.?(?=[ \\t\\r]|$|\\p{Lu})" : "(?:\\*+)?\\.?(?=[ \\t\\r]|$)"
  const letterRe = flags?.letterBefore ? new RegExp(`(?<=\\p{L})${HEADING_WORD}[ \\t]+(${num})${tail}`, "gu") : null
  const spaceRe = flags?.spaceInline ? new RegExp(`(?<=\\s)${HEADING_WORD}[ \\t]+(${num})${tail}`, "gu") : null
  const lineStopRe = flags?.lowerSuffix ? new RegExp(`^${HEADING_WORD}[ \\t]+(${num})(?:\\*+)?\\.?(?=\\p{Lu})`, "u") : null
  const inlineStopRe = flags?.lowerSuffix ? new RegExp(`(?<!\\p{L})Члан[ \\t]+(${num})(?=\\p{Lu})`, "gu") : null
  const addPattern = (re: RegExp, line: string, start: number) => {
    re.lastIndex = 0
    for (const match of line.matchAll(re)) {
      const at = match.index ?? 0
      const articleNum = match[1] ?? ""
      if (!new RegExp(`^${num}$`, "u").test(articleNum)) continue
      pushHeading(hits, { index: start + at, length: (match[0] ?? "").length, articleNum, line })
    }
  }
  for (const start of lineStarts(text)) {
    const line = lineAt(text, start)
    const atStart = lineStartHeading(line, start, fold, flags?.starAfter === true)
    if (atStart) hits.push(atStart)
    INLINE_CLAN.lastIndex = 0
    for (const match of line.matchAll(INLINE_CLAN)) {
      const at = match.index ?? 0
      if (at === 0) continue
      if (!isNumberedCapsPrefix(line.slice(0, at))) continue
      const articleNum = match[1] ?? ""
      if (!CITATION_NUM.test(articleNum)) continue
      let length = (match[0] ?? "").length
      if (/^\.(?=\p{L})/u.test(line.slice(at + length))) length += 1
      hits.push({ index: start + at, length, articleNum, line })
    }
    if (lineStopRe && !hits.some((hit) => hit.index === start)) {
      const match = lineStopRe.exec(line)
      if (match) pushHeading(hits, { index: start, length: match[0].length, articleNum: match[1] ?? "", line })
    }
    if (inlineStopRe) {
      inlineStopRe.lastIndex = 0
      for (const match of line.matchAll(inlineStopRe)) {
        const at = match.index ?? 0
        if (at === 0 || !isNumberedCapsPrefix(line.slice(0, at))) continue
        pushHeading(hits, { index: start + at, length: (match[0] ?? "").length, articleNum: match[1] ?? "", line })
      }
    }
    if (letterRe) addPattern(letterRe, line, start)
    if (spaceRe) addPattern(spaceRe, line, start)
  }
  if (flags?.lowerSuffix) retokenLowerSuffix(hits, text)
  if (flags?.letterBefore || flags?.lowerSuffix || flags?.spaceInline || flags?.starAfter) {
    hits.sort((a, b) => a.index - b.index || a.length - b.length)
    const kept: Heading[] = []
    for (const hit of hits) {
      const prev = kept.at(-1)
      if (prev && hit.index < prev.index + prev.length) continue
      kept.push(hit)
    }
    return kept
  }
  return hits
}
type ContentLine = { start: number; end: number; trimmed: string }
export function nonEmptyLines(text: string): ContentLine[] {
  const lines: ContentLine[] = []
  for (const start of lineStarts(text)) {
    const newline = text.indexOf("\n", start)
    const end = newline === -1 ? text.length : newline
    const raw = text.slice(start, end).replace(/\r$/, "")
    if (raw.trim() === "") continue
    lines.push({ start, end, trimmed: raw.trim() })
  }
  return lines
}
export function precedingNonEmpty(lines: ContentLine[], headingIndex: number, limit: number): ContentLine[] {
  let lo = 0
  let hi = lines.length - 1
  let last = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (lines[mid]!.end <= headingIndex) {
      last = mid
      lo = mid + 1
    } else hi = mid - 1
  }
  const found: ContentLine[] = []
  for (let i = last; i >= 0 && found.length < limit; i -= 1) found.push(lines[i]!)
  return found
}
function moveDecision(trimmed: string, law: string, distance: number): { ok: boolean; reason: string } {
  if (isArticleHeading(trimmed)) return { ok: false, reason: "article-heading" }
  if (isStructuralHeading(trimmed)) {
    if (isItemMarker(trimmed)) return { ok: false, reason: "marker" }
    if (isLawTitle(trimmed, law)) return { ok: false, reason: "law-name" }
    if (isGazette(trimmed)) return { ok: false, reason: "gazette" }
    return { ok: true, reason: "moved" }
  }
  if (!(isUpperStart(trimmed) || isNumeralLed(trimmed))) return { ok: false, reason: "start" }
  if (endsWithPeriod(trimmed)) return { ok: false, reason: "period" }
  if (isItemMarker(trimmed)) return { ok: false, reason: "marker" }
  if (isLawTitle(trimmed, law)) return { ok: false, reason: "law-name" }
  if (isGazette(trimmed)) return { ok: false, reason: "gazette" }
  if (distance > 1 && cpLen(trimmed) > 60 && !isHeadingShaped(trimmed)) return { ok: false, reason: "length" }
  return { ok: true, reason: "moved" }
}
function isWrapTail(trimmed: string, law: string, distance: number): boolean {
  if (!isLowerStart(trimmed)) return false
  if (endsWithPeriod(trimmed)) return false
  if (isArticleHeading(trimmed)) return false
  if (isItemMarker(trimmed)) return false
  if (isGazette(trimmed)) return false
  if (isLawTitle(trimmed, law)) return false
  if (distance > 1 && cpLen(trimmed) > 60 && !isHeadingShaped(trimmed)) return false
  return true
}
function absorbStructural(lines: ContentLine[], block: ContentLine[]): void {
  let guard = 0
  while (block.length > 0 && guard < 4) {
    const furthest = block[0]!
    const index = lines.findIndex((line) => line.start === furthest.start)
    const next = lines[index + 1]
    if (!next || !isStructuralHeading(next.trimmed)) break
    if (block.some((line) => line.start === next.start)) break
    block.unshift(next)
    guard += 1
  }
}
export function selectBlock(lines: ContentLine[], law: string): { lines: ContentLine[]; kind: string; stopReason: string | null } {
  if (lines.length === 0) return { lines: [], kind: "none", stopReason: "no-lines" }
  const first = lines[0]!
  if (isWrapTail(first.trimmed, law, 1)) {
    let tails = 1
    if (lines[1] && isWrapTail(lines[1].trimmed, law, 2)) tails = 2
    const head = lines[tails]
    if (!head) return { lines: [], kind: "wrap-no-head", stopReason: "wrap-no-head" }
    const headDecision = moveDecision(head.trimmed, law, tails + 1)
    if (!headDecision.ok) return { lines: [], kind: "wrap-head-rejected", stopReason: headDecision.reason }
    const block: ContentLine[] = []
    for (let i = tails; i >= 0; i -= 1) block.push(lines[i]!)
    let kind = tails === 2 ? "wrap3" : "wrap2"
    if (tails === 1 && lines[2]) {
      const extra = moveDecision(lines[2].trimmed, law, 3)
      if (extra.ok) {
        block.unshift(lines[2]!)
        kind = "wrap2+above"
      }
    }
    absorbStructural(lines, block)
    return { lines: block, kind, stopReason: null }
  }
  const taken: ContentLine[] = []
  let stopReason: string | null = null
  for (let i = 0; i < Math.min(3, lines.length); i += 1) {
    const decision = moveDecision(lines[i]!.trimmed, law, i + 1)
    if (!decision.ok) {
      stopReason = decision.reason
      break
    }
    taken.push(lines[i]!)
  }
  const block = taken.reverse()
  absorbStructural(lines, block)
  return { lines: block, kind: block.length ? "plain" : "none", stopReason }
}
function isHeadingLine(trimmed: string): boolean {
  return isArticleHeading(trimmed) || isHeadingShaped(trimmed)
}
export function guardDecision(
  lines: ContentLine[],
  block: ContentLine[],
  isFirst: boolean,
  repeal: (line: string) => boolean = isRepealMarker,
): { ok: boolean; reason: string; remaining: string } {
  if (block.length === 0) return { ok: true, reason: "empty", remaining: "" }
  if (isFirst) return { ok: true, reason: "article-1", remaining: "" }
  const furthest = block[0]!
  const index = lines.findIndex((line) => line.start === furthest.start)
  const remaining = lines[index + 1]
  if (!remaining) return { ok: true, reason: "no-preceding", remaining: "" }
  if (sentenceEndWith(remaining.trimmed, repeal) || isHeadingLine(remaining.trimmed)) {
    return { ok: true, reason: "pass", remaining: remaining.trimmed }
  }
  return { ok: false, reason: "guard", remaining: remaining.trimmed }
}
export function rubricLine(block: ContentLine[]): boolean {
  return block.some((line) => !isHeadingShaped(line.trimmed))
}
function chapterLine(block: ContentLine[]): boolean {
  return block.some((line) => isHeadingShaped(line.trimmed))
}
function sanitizeEmbeddingSource(raw: string): string {
  let s = raw.replace(/\0/g, "").replace(/\u2028/g, "\n").replace(/\u2029/g, "\n").replace(/\ufeff/g, "")
  return [...s]
    .filter((ch) => {
      const cp = ch.codePointAt(0)!
      if (cp < 32 && cp !== 9 && cp !== 10 && cp !== 13) return false
      return true
    })
    .join("")
}
export function embeddingInput(law: string, article: string, paragraph: string | null, text: string, copies = 1): string {
  const suffix = paragraph ? ` §${paragraph}` : ""
  const body = copies === 2 ? `${text} ${text}` : text
  return sanitizeEmbeddingSource(`${law} ${article}${suffix}: ${body}`)
}
export function embedTokenCount(law: string, article: string, paragraph: string | null, text: string, copies = 1): number {
  return tokenEncoder.encode(embeddingInput(law, article, paragraph, text, copies), [], "all").length
}
function overTokenLimit(law: string, article: string, text: string, copies = 1): boolean {
  return embedTokenCount(law, article, "9999", text, copies) > TOKEN_LIMIT
}
function lastBreak(window: string, isBreak: (ch: string) => boolean): number {
  for (let i = window.length - 1; i >= 1; i -= 1) {
    if (isBreak(window[i]!)) return i
  }
  return -1
}
function maxTokenEnd(text: string, offset: number, lawName: string, articleNum: string, copies = 1): number {
  let under = offset
  let cursor = Math.min(text.length, offset + 1500)
  let over = -1
  while (cursor <= text.length) {
    if (!overTokenLimit(lawName, articleNum, text.slice(offset, cursor), copies)) {
      const width = cursor - under
      under = cursor
      if (cursor === text.length) return text.length
      cursor = Math.min(text.length, under + Math.max(width, 1) * 2)
      if (cursor === under) return text.length
      continue
    }
    over = cursor
    break
  }
  if (over < 0) return text.length
  let lo = under + 1
  let hi = over
  let best = under
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (!overTokenLimit(lawName, articleNum, text.slice(offset, mid), copies)) {
      best = mid
      lo = mid + 1
    } else hi = mid - 1
  }
  while (best < text.length && !overTokenLimit(lawName, articleNum, text.slice(offset, best + 1), copies)) best += 1
  while (best > offset && overTokenLimit(lawName, articleNum, text.slice(offset, best), copies)) best -= 1
  return best
}
function boundaryParts(text: string, lawName: string, articleNum: string, copies = 1): Array<{ text: string; rule: string }> {
  const parts: string[] = []
  const kinds = new Set<string>()
  let offset = 0
  while (offset < text.length) {
    const rest = text.slice(offset)
    const tokenEnd = maxTokenEnd(text, offset, lawName, articleNum, copies)
    const restOver = tokenEnd < text.length
    if (!restOver && rest.length <= SPLIT_AT) {
      parts.push(rest)
      break
    }
    const windowEnd = restOver ? tokenEnd : Math.min(text.length, offset + SPLIT_AT)
    if (windowEnd <= offset) throw new Error(`${lawName} article ${articleNum}: no prefix stays within ${TOKEN_LIMIT} tokens`)
    const window = text.slice(offset, windowEnd)
    let rel = lastBreak(window, (ch) => ch === "\n")
    let kind = "line"
    if (rel < 0) {
      rel = lastBreak(window, (ch) => /\s/.test(ch))
      kind = "whitespace"
    }
    if (rel < 0) {
      if (restOver) throw new Error(`${lawName} article ${articleNum}: no word boundary inside the ${TOKEN_LIMIT}-token window`)
      let ahead = -1
      for (let i = windowEnd; i < text.length; i += 1) {
        if (/\s/.test(text[i]!)) {
          ahead = i
          break
        }
      }
      if (ahead < 0 || overTokenLimit(lawName, articleNum, text.slice(offset, ahead + 1), copies)) {
        throw new Error(`${lawName} article ${articleNum}: no word boundary inside the ${TOKEN_LIMIT}-token window`)
      }
      rel = ahead - offset
      kind = "whitespace"
    }
    const cut = offset + rel + 1
    const piece = text.slice(offset, cut)
    if (piece.trim().length === 0 || overTokenLimit(lawName, articleNum, piece, copies)) {
      throw new Error(`${lawName} article ${articleNum}: boundary split produced an illegal piece`)
    }
    parts.push(piece)
    kinds.add(kind)
    offset = cut
  }
  if (parts.length < 2 || parts.some((part) => part.trim().length === 0)) {
    throw new Error(`${lawName} article ${articleNum}: boundary split produced an illegal piece`)
  }
  const rule = kinds.has("whitespace") ? (kinds.has("line") ? "line+whitespace" : "whitespace") : "line"
  return parts.map((part) => ({ text: part, rule }))
}
function marks(text: string, pattern: RegExp): Array<{ index: number }> | null {
  const found: Array<{ index: number }> = []
  for (const start of lineStarts(text)) {
    if (pattern.exec(lineAt(text, start))) found.push({ index: start })
  }
  return found.length < 2 ? null : found
}
function divide(text: string, lawName: string, articleNum: string, copies = 1): Array<{ text: string; rule: string }> {
  if (text.length <= SPLIT_AT && !overTokenLimit(lawName, articleNum, text, copies)) return [{ text, rule: "whole" }]
  const rules: Array<[string, RegExp]> = [
    ["stav", STAV_MARK],
    ["numbered-item", ITEM_MARK],
    ["tarifni", TARIFNI_MARK],
  ]
  for (const [name, pattern] of rules) {
    const found = marks(text, pattern)
    if (!found) continue
    const pieces: string[] = []
    for (let i = 0; i < found.length; i += 1) {
      const start = i === 0 ? 0 : found[i]!.index
      const end = i + 1 < found.length ? found[i + 1]!.index : text.length
      const slice = text.slice(start, end)
      if (slice.length === 0) continue
      pieces.push(slice)
    }
    if (pieces.length < 2 || pieces.some((piece) => piece.trim().length === 0 || piece.length >= text.length)) continue
    const out: Array<{ text: string; rule: string }> = []
    let failed = false
    for (const piece of pieces) {
      if (!overTokenLimit(lawName, articleNum, piece, copies)) {
        out.push({ text: piece, rule: name })
        continue
      }
      const kids = divide(piece, lawName, articleNum, copies)
      if (kids.length < 2 || kids.some((kid) => overTokenLimit(lawName, articleNum, kid.text, copies))) {
        failed = true
        break
      }
      for (const kid of kids) out.push(kid.rule === "whole" ? { text: kid.text, rule: name } : kid)
    }
    if (!failed && out.length >= 2 && out.every((piece) => !overTokenLimit(lawName, articleNum, piece.text, copies))) return out
  }
  return boundaryParts(text, lawName, articleNum, copies)
}
function isWordBoundary(text: string, index: number): boolean {
  if (index <= 0 || index >= text.length) return true
  return /\s/.test(text[index - 1]!) || /\s/.test(text[index]!)
}
function bump(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1)
}

function ruleChecks() {
  const zrtva = "ОДЛУКА о образовању Координационог тела за подршку жртвама кривичних дела и сведоцима у кривичним поступцима"
  const radu = "ЗАКОН О РАДУ"
  const homoglyph = "ЗАКОН O РАДУ"
  const poslovnik = "ПОСЛОВНИК О РАДУ"
  const brisanSentence = "Брисан је (види члан 5. Закона - 93/2012-21)"
  return {
    upper_cyr_A: isUpperLetter("А"),
    upper_cyr_a: isUpperLetter("а"),
    upper_cyr_NJE: isUpperLetter("Њ"),
    upper_start_clan: isUpperStart("Члан"),
    lower_start_clan: isLowerStart("члан"),
    digraph_caps_zakon: isDigraphCaps("ЗАКОН"),
    digraph_caps_glava: isDigraphCaps("Глава"),
    digraph_caps_latin_j: isDigraphCaps("ZAKONjU"),
    digraph_caps_cyr_nje: isDigraphCaps("ЗАКОЊУ"),
    digraph_caps_cyr_lowercase_j: isDigraphCaps("ЗАКОНјУ"),
    old_plain_1a: PLAIN_OLD.test("Члан 1а"),
    new_plain_1a: PLAIN_ARTICLE.test("Члан 1а"),
    old_plain_12b: PLAIN_OLD.test("Члан 12б"),
    new_plain_12b: PLAIN_ARTICLE.test("Члан 12б"),
    new_plain_1: PLAIN_ARTICLE.test("Члан 1"),
    glued_period_number: gluedRubricHeading("Члан 8.Предмети чији су саставни делови")?.articleNum === "8",
    glued_period_length: gluedRubricHeading("Члан 8.Предмети")?.length === "Члан 8.".length,
    plain_rejects_glued: PLAIN_ARTICLE.test("Члан 8.Предмети") === false,
    numbered_caps_heading: findHeadings("I. ОСНОВНЕ ОДРЕДБЕ Члан 1 Наставља").some((hit) => hit.articleNum === "1" && hit.index === "I. ОСНОВНЕ ОДРЕДБЕ ".length),
    sentence_end_not_heading: findHeadings("Готово. Члан 4 даље").length === 0,
    digit_not_heading: findHeadings("став 2 Члан 3").length === 0,
    folded_line_start: findHeadings("Чл\u0061н 1 Наслов").some((hit) => hit.articleNum === "1" && hit.index === 0),
    folded_sentence_end_still_out: findHeadings("Готово. Чл\u0061н 4 даље").length === 0,
    citation_1a: CITATION_NUM.test("1а"),
    citation_12b: CITATION_NUM.test("12б"),
    citation_1abc: CITATION_NUM.test("1абв"),
    repeal_old_paren: isRepealMarkerOld("(брисано)"),
    repeal_serbian_paren_only: isSerbianRepeal("Брисан је (види члан 5. Закона - 93/2012-21)"),
    repeal_serbian_with_stav: isSerbianRepeal("Брисан је ранији став 2. (види члан 1. Уредбе - 120/2025-4)"),
    repeal_serbian_sentence: isSerbianRepeal("Брисани подаци из регистара чувају се у електронском облику, неограничено."),
    repeal_old_lat: REPEAL_OLD.test("(brisano)"),
    sentence_end_brisano: sentenceEnd("(брисано)"),
    sentence_end_brisan_je: sentenceEnd(brisanSentence),
    struct_glava_prva: isStructuralHeading("Глава прва"),
    struct_glava_I: isStructuralHeading("Глава I"),
    struct_deo_b: isStructuralHeading("ДЕО Б"),
    struct_poglavlje_8: isStructuralHeading("Поглавље 8."),
    struct_odsek_department: isStructuralHeading("Одсек за одржавање"),
    struct_latin_glava: isStructuralHeading("Glava II"),
    struct_old_glava_prva: STRUCT_OLD.test(fold("Глава прва")),
    tarifni_old_cyr: TARIFNI_OLD.test("Тарифни број 12"),
    tarifni_new_cyr: TARIFNI_MARK.test("Тарифни број 12"),
    tarifni_new_caps: TARIFNI_MARK.test("ТАРИФНИ БРОЈ 3"),
    zrtva_blocked_with_threshold: isLawTitle("Жртва", zrtva),
    zrtva_name_contains_stem: fold(zrtva).includes("жртва"),
    zrtva_ratio: Number((cpLen("жртва") / cpLen(fold(zrtva))).toFixed(4)),
    o_radu_on_zakon: isLawTitle("О РАДУ", radu),
    o_radu_ratio_on_zakon: Number((cpLen(fold("О РАДУ")) / cpLen(fold(radu))).toFixed(4)),
    o_radu_on_poslovnik: isLawTitle("О РАДУ", poslovnik),
    o_radu_ratio_on_poslovnik: Number((cpLen(fold("О РАДУ")) / cpLen(fold(poslovnik))).toFixed(4)),
    homoglyph_o_code: [...homoglyph][6]?.codePointAt(0) ?? 0,
    homoglyph_naive: isLawTitleNaive("О РАДУ", homoglyph),
    homoglyph_script_aware: isLawTitle("О РАДУ", homoglyph),
    latin_name_still_matches: isLawTitle("O RADU", "ZAKON O RADU"),
    gazette_notary_line: isSerbianGazetteLine(
      '"Службени гласник РС", бр. 93 од 1. септембра 2014 , 22 од 27. фебруара 2015, 87 од 13. новембра 2018.',
    ),
    gazette_inline_sentence: isSerbianGazetteLine(
      "На основу члана 47. став 1. Закона о културним добрима („Службени гласник РС”, број 71/94),",
    ),
    gazette_spaced_number: isSerbianGazetteLine("„Службени гласник РС“, брoj 42 од 18. јуна 2010."),
    odsek_word_removed: !isStructuralHeading("Одсек први"),
    glava_still_structural: isStructuralHeading("Глава прва"),
    star_only: isStarredCitationOnly("*Службени гласник РС, 88/2011") === true,
    star_quoted: isStarredCitationOnly("* „Службени гласник РС” 58/97") === true,
    star_paren: isStarredCitationOnly("* Службени гласник РС, број 32/2014 (Одлука УС)") === true,
    star_two: isStarredCitationOnly("*Службени гласник РС, број 88/2010 **Службени гласник РС, број 25/2015") === true,
    star_amend: isStarredCitationOnly("*Службени гласник РС, број 115/2021 (Амандман XIX)") === true,
    star_visible: isStarredCitationOnly("***Службени гласник РС, број 70/2017 (види Одлуку УС - 70/2017-17 )") === true,
    star_fnrj: isStarredCitationOnly("* „Службени лист ФНРЈ”, број 28/60 (испр.).") === true,
    star_body: isStarredCitationOnly("*Службени гласник РС, број 17/2024 4.2. Заштита природе На подручју") === false,
    star_clan: isStarredCitationOnly("* Службени гласник РС, број 25/2015 Члан 81а* Висину таксе") === false,
    star_note: isStarredCitationOnly("*Службени гласник РС, број 89/2015 НАПОМЕНА ИЗДАВАЧА: Одредба члана 47.") === false,
    star_other: isStarredCitationOnly("* Средства намењена за захтеве") === null,
  }
}

function analyseNames(rows: Array<{ law_name_local: string; has_bulk: boolean; has_curated: boolean }>) {
  const latinChars = new Map<string, number>()
  const adjacentChars = new Map<string, number>()
  const fusedLowerUpper: string[] = []
  const doubledO: string[] = []
  const stemGlue: string[] = []
  const latinLowerUpper: string[] = []
  let mixed = 0
  let mixedBulk = 0
  let mixedCurated = 0
  let cyrOnly = 0
  let latOnly = 0
  let neither = 0
  let adjacentNames = 0
  const stems = ["УСТАВ", "ЗАКОН", "КОДЕКС", "ПРАВИЛНИК", "УРЕДБА", "ОДЛУКА", "USTAV", "ZAKON", "KODEKS"]
  for (const row of rows) {
    const name = row.law_name_local
    let cyr = 0
    let lat = 0
    const chars = [...name]
    for (const ch of chars) {
      const script = letterScript(ch)
      if (script === "cyr") cyr += 1
      else if (script === "lat") lat += 1
    }
    if (cyr > 0 && lat > 0) {
      mixed += 1
      if (row.has_bulk) mixedBulk += 1
      if (row.has_curated) mixedCurated += 1
      for (const ch of new Set(chars.filter((ch) => letterScript(ch) === "lat"))) {
        bump(latinChars, ch)
      }
    } else if (cyr > 0) cyrOnly += 1
    else if (lat > 0) latOnly += 1
    else neither += 1
    let adjacent = false
    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i]!
      if (!LATIN_TWINS.has(ch)) continue
      const prev = chars[i - 1] ?? ""
      const next = chars[i + 1] ?? ""
      if (letterScript(prev) === "cyr" || letterScript(next) === "cyr") {
        adjacent = true
        bump(adjacentChars, ch)
      }
    }
    if (adjacent) adjacentNames += 1
    let lowerUpper = 0
    for (let i = 0; i < chars.length - 1; i += 1) {
      const a = chars[i]!
      const b = chars[i + 1]!
      if (/\p{Script=Cyrillic}/u.test(a) && /\p{Script=Cyrillic}/u.test(b) && /\p{Ll}/u.test(a) && /\p{Lu}/u.test(b)) {
        lowerUpper += 1
      }
    }
    if (lowerUpper > 0) fusedLowerUpper.push(name)
    if (name.includes("ОО")) doubledO.push(name)
    const glued: string[] = []
    for (const stem of stems) {
      let from = 0
      while (from < name.length) {
        const at = name.indexOf(stem, from)
        if (at < 0) break
        const next = [...name.slice(at + stem.length)][0] ?? ""
        from = at + stem.length
        if (!next || !/\p{L}/u.test(next)) continue
        const cont = name.slice(at, at + stem.length + 8)
        if ((stem === "ЗАКОН" || stem === "ZAKON") && /^(?:ЗАКОН|ZAKON)ОДАВ/iu.test(cont)) continue
        glued.push(cont)
      }
    }
    if (glued.length > 0) stemGlue.push(`${name} :: ${glued.join(" | ")}`)
    let latinBreak = false
    for (let i = 1; i < chars.length - 1; i += 1) {
      const a = chars[i]!
      if (a !== "j" && a !== "ž") continue
      if (isUpperLetter(chars[i - 1]) && isUpperLetter(chars[i + 1]) && letterScript(a) === "lat") latinBreak = true
    }
    if (latinBreak) latinLowerUpper.push(name)
  }
  return {
    names: rows.length,
    bulk_names: rows.filter((row) => row.has_bulk).length,
    curated_names: rows.filter((row) => row.has_curated).length,
    overlap_names: rows.filter((row) => row.has_bulk && row.has_curated).length,
    cyr_only: cyrOnly,
    lat_only: latOnly,
    neither,
    mixed_script_names: mixed,
    mixed_bulk: mixedBulk,
    mixed_curated: mixedCurated,
    latin_characters_in_mixed_names: Object.fromEntries([...latinChars.entries()].sort((a, b) => b[1] - a[1])),
    adjacent_homoglyph_names: adjacentNames,
    adjacent_homoglyph_characters: Object.fromEntries([...adjacentChars.entries()].sort((a, b) => b[1] - a[1])),
    cyr_lower_then_upper_names: fusedLowerUpper.length,
    cyr_lower_then_upper: fusedLowerUpper.slice(0, 30),
    doubled_cyr_o_names: doubledO.length,
    doubled_cyr_o: doubledO.slice(0, 30),
    stem_glued_names: stemGlue.length,
    stem_glued: stemGlue.slice(0, 40),
    latin_j_between_caps_names: latinLowerUpper.length,
  }
}

type Chunk = { article_num: string; text_local: string }
type PreparedHeading = {
  heading: Heading
  lines: ContentLine[]
  selected: { lines: ContentLine[]; kind: string; stopReason: string | null }
  guard: { ok: boolean; reason: string; remaining: string }
  guardOld: { ok: boolean; reason: string; remaining: string }
  finalLines: ContentLine[]
  isFirst: boolean
}

function spanStartOf(item: PreparedHeading, previousHeadingIndex: number): number {
  const titles = item.finalLines.filter((line) => line.start > previousHeadingIndex && line.end <= item.heading.index)
  return titles.length > 0 ? titles[0]!.start : item.heading.index
}

function withoutEmptyingPrevious(text: string, previous: PreparedHeading, previousBoundary: number, block: ContentLine[]): ContentLine[] {
  const prevStart = spanStartOf(previous, previousBoundary)
  const earlier = block.filter((line) => line.start <= previous.heading.index)
  const later = block.filter((line) => line.start > previous.heading.index)
  let startAt = 0
  while (startAt < later.length) {
    const span = text.slice(prevStart, later[startAt]!.start)
    const offset = previous.heading.index - prevStart
    if (offset >= 0 && offset <= span.length && spanHasBody(span, offset, previous.heading.length)) break
    startAt += 1
  }
  return [...earlier, ...later.slice(startAt)]
}

function buildPrepared(
  content: ContentLine[],
  found: Heading[],
  lawName: string,
  text = "",
  refuseEmptyBody = true,
): PreparedHeading[] {
  const prepared: PreparedHeading[] = []
  for (let index = 0; index < found.length; index += 1) {
    const heading = found[index]!
    const lines = precedingNonEmpty(content, heading.index, 12)
    const selected = selectBlock(lines, lawName)
    const isFirst = index === 0
    const guard = guardDecision(lines, selected.lines, isFirst, isRepealMarker)
    const guardOld = guardDecision(lines, selected.lines, isFirst, isRepealMarkerOld)
    let finalLines = guard.ok ? selected.lines : []
    if (refuseEmptyBody && text && !isFirst && finalLines.length > 0) {
      const previous = prepared[index - 1]!
      const previousBoundary = index >= 2 ? prepared[index - 2]!.heading.index : -1
      finalLines = withoutEmptyingPrevious(text, previous, previousBoundary, finalLines)
    }
    prepared.push({ heading, lines, selected, guard, guardOld, finalLines, isFirst })
  }
  return prepared
}

function plannedSpans(prepared: PreparedHeading[], strippedLength: number) {
  return prepared.map((item, index) => {
    const prev = index === 0 ? -1 : prepared[index - 1]!.heading.index
    const oldStart = item.finalLines.length > 0 ? item.finalLines[0]!.start : item.heading.index
    const next = prepared[index + 1]
    const oldEnd = next
      ? next.finalLines.length > 0
        ? next.finalLines[0]!.start
        : next.heading.index
      : strippedLength
    const titles = item.finalLines.filter((line) => line.start > prev && line.end <= item.heading.index)
    const start = titles.length > 0 ? titles[0]!.start : item.heading.index
    let end = strippedLength
    if (next) {
      const nextTitles = next.finalLines.filter((line) => line.start > item.heading.index && line.end <= next.heading.index)
      end = nextTitles.length > 0 ? nextTitles[0]!.start : next.heading.index
    }
    return {
      item,
      articleNum: item.heading.articleNum,
      heading: item.heading.index,
      oldStart,
      oldEnd,
      start,
      end,
    }
  })
}

export function spanEdgeDelta(text: string, lawName: string): { articles: number; changed: number; oldMiss: number } {
  const stripped = stripEditorial(text, lawName, [])
  const found = findHeadings(stripped)
  if (found.length === 0) return { articles: 0, changed: 0, oldMiss: 0 }
  const plan = plannedSpans(buildPrepared(nonEmptyLines(stripped), found, lawName, stripped), stripped.length)
  let changed = 0
  let oldMiss = 0
  for (const edge of plan) {
    if (edge.start !== edge.oldStart || edge.end !== edge.oldEnd) changed += 1
    if (edge.oldStart > edge.heading || edge.oldEnd <= edge.heading || edge.oldStart >= edge.oldEnd) oldMiss += 1
  }
  return { articles: found.length, changed, oldMiss }
}

/** Asterisks and one trailing period still belong to the heading token. Whitespace is not body text. A newline does not end the token and does not start the body. */
export function residueAfterHeadingToken(fromHeading: string, tokenLength: number): string {
  let i = tokenLength
  let period = fromHeading.slice(0, tokenLength).endsWith(".")
  while (i < fromHeading.length) {
    const ch = fromHeading[i]!
    if (/\s/u.test(ch) || ch === "*") {
      i += 1
      continue
    }
    if (ch === "." && !period) {
      period = true
      i += 1
      continue
    }
    break
  }
  return fromHeading.slice(i)
}

export function spanHasBody(spanText: string, headingOffset: number, tokenLength: number): boolean {
  const before = spanText.slice(0, headingOffset)
  const after = residueAfterHeadingToken(spanText.slice(headingOffset), tokenLength)
  return before.trim().length > 0 || after.trim().length > 0
}

function movedRubricLines(prepared: PreparedHeading[]): Array<{ index: number; line: ContentLine }> {
  const moves: Array<{ index: number; line: ContentLine }> = []
  for (let index = 0; index < prepared.length; index += 1) {
    const prev = index === 0 ? -1 : prepared[index - 1]!.heading.index
    const item = prepared[index]!
    for (const line of item.finalLines) {
      if (line.start > prev && line.end <= item.heading.index) moves.push({ index, line })
    }
  }
  return moves
}

function headingSpanState(prepared: PreparedHeading[], text: string): Array<{ article: string; heading: number; empty: boolean; chars: number }> {
  return plannedSpans(prepared, text.length).map((edge) => {
    const span = text.slice(edge.start, edge.end)
    return {
      article: edge.articleNum,
      heading: edge.heading,
      empty: !spanHasBody(span, edge.heading - edge.start, edge.item.heading.length),
      chars: span.length,
    }
  })
}

function contextSide(text: string, at: number, width: number, direction: -1 | 1): string {
  if (direction < 0) return text.slice(Math.max(0, at - width), at)
  return text.slice(at, Math.min(text.length, at + width))
}

function collectRubricCensus(content: ContentLine[], found: Heading[], lawName: string, text: string) {
  const off = buildPrepared(content, found, lawName, text, false)
  const on = buildPrepared(content, found, lawName, text, true)
  const offMoves = movedRubricLines(off)
  const onMoves = movedRubricLines(on)
  const onKeys = new Set(onMoves.map((move) => move.line.start))
  const refused: Array<{ donor: string; receiver: string; line: string; context: string; kept: string; still: string[] }> = []
  for (const move of offMoves) {
    if (onKeys.has(move.line.start)) continue
    const item = on[move.index]!
    const donor = on[move.index - 1]!
    const prev = donor.heading.index
    const still = item.finalLines.filter((line) => line.start > prev && line.end <= item.heading.index).map((line) => line.trimmed)
    const kept = off[move.index]!.finalLines
      .filter((line) => line.start > prev && line.end <= item.heading.index && !onKeys.has(line.start))
      .map((line) => line.trimmed)
      .join("\n")
    refused.push({
      donor: donor.heading.articleNum,
      receiver: item.heading.articleNum,
      line: move.line.trimmed,
      context: `${contextSide(text, move.line.start, 80, -1)}【${move.line.trimmed}】${contextSide(text, move.line.end, 80, 1)}`,
      kept,
      still,
    })
  }
  const offState = headingSpanState(off, text)
  const onState = headingSpanState(on, text)
  const onByHeading = new Map(onState.map((row) => [row.heading, row]))
  const recovered = offState.filter((row) => row.empty && onByHeading.get(row.heading)?.empty === false)
  const allowed: Array<{ donor: string; receiver: string; line: string; context: string }> = []
  if (offState.every((row) => !row.empty)) {
    for (const move of onMoves) {
      if (allowed.length >= 2) break
      const item = on[move.index]!
      const donor = on[move.index - 1]
      if (!donor) continue
      allowed.push({
        donor: donor.heading.articleNum,
        receiver: item.heading.articleNum,
        line: move.line.trimmed,
        context: `${contextSide(text, move.line.start, 80, -1)}【${move.line.trimmed}】${contextSide(text, move.line.end, 80, 1)}`,
      })
    }
  }
  return {
    moves_off: offMoves.length,
    moves_on: onMoves.length,
    empty_off: offState.filter((row) => row.empty).length,
    empty_on: onState.filter((row) => row.empty).length,
    recovered_headings: recovered.length,
    recovered_articles: [...new Set(recovered.map((row) => row.article))],
    recovered_chars: recovered.reduce((total, row) => total + (onByHeading.get(row.heading)!.chars - row.chars), 0),
    refused,
    allowed,
  }
}

function citationHeadWord(afterRaw: string): string | null {
  const folded = foldDetectorLine(afterRaw)
  const match = /^[\s\u00a0.*]*(?:\*\s*)*(\p{Lu}[\p{L}]{3,})(?=\s+(?:о|О)(?!\p{L})|\s*\(|\s+бр\.)/u.exec(folded)
  if (!match || match.index == null) return null
  const start = match.index + match[0].lastIndexOf(match[1]!)
  return afterRaw.slice(start, start + match[1]!.length)
}

export function processLaw(
  lawName: string,
  chunks: Chunk[],
  collectPieces = false,
  options?: {
    includeText?: boolean
    skipTokens?: boolean
    foldHeadings?: boolean
    citationGenitives?: ReadonlySet<string>
    includeRemainder?: boolean
    finderFlags?: FinderFlags
    skipDivide?: boolean
    rubricCensus?: boolean
    pieceCensus?: boolean
  },
) {
  const foldHeadings = options?.foldHeadings ?? true
  const finderFlags = options?.finderFlags
  const ordered = [...chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
  const joined = ordered.map((row) => row.text_local ?? "").join("")
  const rawHeadings = findHeadings(joined, foldHeadings, finderFlags)
  if (rawHeadings.length === 0) return { skip: "no-headings", chunks: ordered.length, chars: joined.length }
  const preambleLen = rawHeadings[0]!.index
  const bodyLen = joined.length - preambleLen
  if (preambleLen > bodyLen && !collectPieces) {
    return {
      skip: "preamble-dominates",
      chunks: ordered.length,
      chars: joined.length,
      preamble_chars: preambleLen,
      body_chars: bodyLen,
    }
  }
  const strips: Array<{ law_name_local: string; kind: string; text: string }> = []
  const stripped = stripEditorial(joined, lawName, strips)
  const foundAll = findHeadings(stripped, foldHeadings, finderFlags)
  let citationHeadings = 0
  const found = options?.citationGenitives
    ? foundAll.filter((heading) => {
        const word = citationHeadWord(stripped.slice(heading.index + heading.length))
        if (word && options.citationGenitives?.has(foldDetectorLine(word).toLocaleLowerCase("sr"))) {
          citationHeadings += 1
          return false
        }
        return true
      })
    : foundAll
  if (found.length === 0) return { skip: "no-headings-after-strip", chunks: ordered.length, chars: joined.length, citation_headings: citationHeadings }
  const ruleACuts = new Set<number>()
  if (finderFlags?.letterBefore) {
    const plainAt = new Set(findHeadings(stripped, foldHeadings).map((hit) => hit.index))
    for (const hit of findHeadings(stripped, foldHeadings, { letterBefore: true })) {
      if (!plainAt.has(hit.index)) ruleACuts.add(hit.index)
    }
  }
  const gluedCutAt = new Set<number>()
  const content = nonEmptyLines(stripped)
  let oldMiss = 0
  let newHeadings = 0
  let glasnikLines = 0
  let brisanoExact = 0
  let brisanJe = 0
  let tarifniCyr = 0
  let latinGazette = 0
  for (const line of content) {
    if (PLAIN_ARTICLE.test(line.trimmed)) newHeadings += 1
    if (PLAIN_ARTICLE.test(line.trimmed) && !PLAIN_OLD.test(line.trimmed)) oldMiss += 1
    if (/^"?Службени гласник/u.test(line.trimmed)) glasnikLines += 1
    if (isRepealMarkerOld(line.trimmed)) brisanoExact += 1
    if (/^Брисан(?:о|а|и)? (?:је|су)/u.test(line.trimmed)) brisanJe += 1
    if (TARIFNI_MARK.test(line.trimmed) && !TARIFNI_OLD.test(line.trimmed)) tarifniCyr += 1
    if (GAZETTE_LINE.test(line.trimmed)) latinGazette += 1
  }
  const residue = new Map<string, number>()
  const noTitle = new Map<string, number>()
  let outputRows = 0
  let titleRows = 0
  let chapterRows = 0
  let articles = 0
  let articlesNoTitle = 0
  let piecesOverTwo = 0
  let maxTokens = 0
  let rowsOver = 0
  let boundaryFailed = 0
  let paragraphBad = 0
  let emptyChars = 0
  let emptyRows = 0
  const emptySkipped: string[] = []
  const spanLog: Array<{ heading: number; article: string; text: string; pieces: number; piecesBefore: number; empty: boolean; length: number; next: number }> = []
  let preambleRows = 0
  let guardRubricOld = 0
  let guardRubricNew = 0
  let embedTokens = 0
  let outputChars = 0
  let repealGuardLines = 0
  let repealUnblocked = 0
  const repealExamples: Array<{ article: string; title: string; repeal: string }> = []
  const produced: Array<{
    article_num: string
    paragraph_num: string | null
    chars: number
    tokens: number
    heading_index: number
    text?: string
  }> = []
  const rules = new Map<string, number>()
  let longest = { chars: 0, law: lawName, text: "" }
  for (const line of content) {
    if (!isLawTitle(line.trimmed, lawName)) continue
    const chars = cpLen(line.trimmed)
    if (chars > longest.chars) longest = { chars, law: lawName, text: line.trimmed.slice(0, 180) }
  }
  const prepared = buildPrepared(content, found, lawName, stripped)
  const rubricCensusResult = options?.rubricCensus ? collectRubricCensus(content, found, lawName, stripped) : undefined
  for (const item of prepared) {
    if (!item.isFirst) {
      const inspected = item.selected.lines.length > 0 ? item.guard.remaining : (item.lines[0]?.trimmed ?? "")
      if (/^(?:Брисан је|Брисани су|Брисана је|Брисано је)/u.test(inspected)) {
        repealGuardLines += 1
        const title = item.selected.lines.find((line) => !isHeadingShaped(line.trimmed))?.trimmed ?? ""
        if (title && !item.guardOld.ok && item.guard.ok) {
          repealUnblocked += 1
          if (repealExamples.length < 3) {
            repealExamples.push({ article: item.heading.articleNum, title: title.slice(0, 140), repeal: inspected.slice(0, 200) })
          }
        }
      }
    }
    if (!item.isFirst && item.lines[0]) {
      const moved = item.finalLines.some((line) => line.start === item.lines[0]!.start)
      let reason = "moved"
      if (!moved) {
        if (!item.guard.ok && item.selected.lines.some((line) => line.start === item.lines[0]!.start)) reason = "guard"
        else if (item.selected.kind === "wrap-head-rejected") reason = `wrap-head-${item.selected.stopReason}`
        else reason = item.selected.stopReason ?? "left"
      }
      bump(residue, reason)
      if (reason === "guard" && /^Брисан/u.test(item.guard.remaining)) bump(residue, "guard-remaining-starts-brisan")
    }
    if (!item.isFirst && rubricLine(item.selected.lines)) {
      if (!item.guardOld.ok) guardRubricOld += 1
      if (!item.guard.ok) guardRubricNew += 1
    }
  }
  const spans = plannedSpans(prepared, stripped.length).map((edge) => {
    if (edge.start > edge.heading || edge.end <= edge.heading || edge.start >= edge.end) {
      throw new Error(`${lawName} ${edge.articleNum}: span ${edge.start}..${edge.end} misses heading ${edge.heading}`)
    }
    return { item: edge.item, start: edge.start, end: edge.end, text: stripped.slice(edge.start, edge.end) }
  })
  const remainder = stripped.slice(0, spans[0]!.start)
  const emitted = spans.map((span) => span.text).join("")
  const exceptions: string[] = []
  const untiled = stripped.length - emitted.length - remainder.length
  if (untiled !== 0) exceptions.push(`untiled ${untiled}`)
  if (remainder.length > 0) exceptions.push(`unemitted_prefix ${remainder.length}`)
  const partOrdinal = new Map<string, number>()
  const starAt = new Set<number>()
  if (finderFlags?.starAfter) {
    const withoutStar = findHeadings(stripped, foldHeadings, { ...finderFlags, starAfter: false })
    const withoutAt = new Set(withoutStar.map((hit) => hit.index))
    for (const hit of found) if (!withoutAt.has(hit.index)) starAt.add(hit.index)
  }
  for (let spanOrdinal = 0; spanOrdinal < spans.length; spanOrdinal += 1) {
    const span = spans[spanOrdinal]!
    const nextHeading = spans[spanOrdinal + 1]?.item.heading.index ?? stripped.length
    const emptyBody = !spanHasBody(span.text, span.item.heading.index - span.start, span.item.heading.length)
    if (emptyBody) {
      emptySkipped.push(`${lawName} article ${span.item.heading.articleNum}`)
      emptyChars += span.text.length
    } else {
      articles += 1
    }
    const gainedRubric = rubricLine(span.item.finalLines)
    const gainedChapter = chapterLine(span.item.finalLines)
    if (!emptyBody && !gainedRubric) {
      articlesNoTitle += 1
      let why = "no-line-qualified"
      if (!span.item.guard.ok && rubricLine(span.item.selected.lines)) why = "guard-blocked-rubric"
      else if (!span.item.guard.ok) why = "guard-blocked"
      else if (gainedChapter) why = "chapter-only"
      else if (span.item.selected.stopReason) why = span.item.selected.stopReason
      bump(noTitle, why)
    }
    const split = options?.skipDivide
      ? [{ text: span.text, rule: "whole" }]
      : divide(span.text, lawName, span.item.heading.articleNum)
    const partBase = !emptyBody && split.length > 1 ? (partOrdinal.get(span.item.heading.articleNum) ?? 0) : 0
    const pieces = split.length <= 1
      ? [{ text: span.text, paragraphNum: null as string | null, rule: "whole" }]
      : split.map((piece, index) => ({ text: piece.text, paragraphNum: String(partBase + index + 1), rule: piece.rule }))
    if (!emptyBody && split.length > 1) partOrdinal.set(span.item.heading.articleNum, partBase + split.length)
    const beforeSplit = options?.pieceCensus && !emptyBody && !options.skipDivide
      ? divide(span.text, lawName, span.item.heading.articleNum, 2)
      : split
    const piecesBefore = beforeSplit.length <= 1 ? 1 : beforeSplit.length
    spanLog.push({
      heading: span.item.heading.index,
      article: span.item.heading.articleNum,
      text: span.text,
      pieces: pieces.length,
      piecesBefore,
      empty: emptyBody,
      length: span.item.heading.length,
      next: nextHeading,
    })
    if (pieces.length > 2 && !emptyBody) piecesOverTwo += 1
    if (emptyBody) emptyRows += pieces.length
    let cursor = 0
    pieces.forEach((piece, pieceIndex) => {
      const absStart = span.start + cursor
      const absEnd = absStart + piece.text.length
      if (stripped.slice(absStart, absEnd) !== piece.text) exceptions.push(`piece mismatch ${span.item.heading.articleNum}`)
      const startBad = !isWordBoundary(stripped, absStart)
      const endBad = !isWordBoundary(stripped, absEnd)
      if (startBad || endBad) {
        if (finderFlags?.letterBefore) {
          const startGlued = startBad && ruleACuts.has(absStart)
          const endGlued = endBad && ruleACuts.has(absEnd)
          if (startGlued) gluedCutAt.add(absStart)
          if (endGlued) gluedCutAt.add(absEnd)
          if ((startBad && !startGlued) || (endBad && !endGlued)) boundaryFailed += 1
        } else {
          boundaryFailed += 1
        }
      }
      cursor = absEnd - span.start
      if (emptyBody) return
      const tokens = options?.skipTokens
        ? 0
        : embedTokenCount(lawName, span.item.heading.articleNum, piece.paragraphNum, piece.text)
      if (!options?.skipTokens) {
        embedTokens += tokens
        if (tokens > maxTokens) maxTokens = tokens
        if (tokens > TOKEN_LIMIT || overTokenLimit(lawName, span.item.heading.articleNum, piece.text)) rowsOver += 1
      }
      outputChars += piece.text.length
      if (piece.paragraphNum != null && !/^[1-9][0-9]*$/.test(piece.paragraphNum)) paragraphBad += 1
      if (collectPieces) {
        produced.push({
          article_num: span.item.heading.articleNum,
          paragraph_num: piece.paragraphNum,
          chars: piece.text.length,
          tokens,
          heading_index: span.item.heading.index,
          ...(options?.includeText ? { text: piece.text } : {}),
        })
      }
      outputRows += 1
      if (gainedRubric && pieceIndex === 0) titleRows += 1
      if (gainedChapter && pieceIndex === 0) chapterRows += 1
      bump(rules, piece.rule)
    })
    if (cursor !== span.text.length) exceptions.push(`piece cursor ${span.item.heading.articleNum}`)
  }
  let starRows = 0
  let absorbedRows = 0
  let emptyStarRows = 0
  let emptyHostRows = 0
  for (const span of spanLog) if (span.empty && starAt.has(span.heading)) emptyStarRows += span.pieces
  if (starAt.size > 0) {
    let region: Array<(typeof spanLog)[number]> = []
    const flush = () => {
      if (!region.some((span) => starAt.has(span.heading))) {
        region = []
        return
      }
      const host = region[0]!
      if (starAt.has(host.heading)) {
        starRows += region.reduce((total, span) => total + (span.empty ? 0 : span.pieces), 0)
        region = []
        return
      }
      if (host.empty) emptyHostRows += host.pieces
      const oldText = region.map((span) => span.text).join("")
      const oldPieces = options?.skipDivide ? 1 : Math.max(1, divide(oldText, lawName, host.article).length)
      const newHost = host.empty ? 0 : host.pieces
      const newStar = region.slice(1).reduce((total, span) => total + (span.empty ? 0 : span.pieces), 0)
      starRows += newStar
      absorbedRows += newHost - oldPieces
      region = []
    }
    for (const span of spanLog) {
      if (!starAt.has(span.heading)) {
        flush()
        region = [span]
      } else if (region.length === 0) region = [span]
      else region.push(span)
    }
    flush()
  }
  const pieceCensusResult = options?.pieceCensus ? collectPieceCensus() : undefined
  function collectPieceCensus() {
    const changed: Array<{ article: string; heading: number; chars: number; before: number; after: number }> = []
    const lostAll: Array<{ article: string; heading: number; chars: number; before: number; after: number }> = []
    let beforeRows = 0
    let afterRows = 0
    for (const span of spanLog) {
      const after = span.empty ? 0 : span.pieces
      const before = span.empty ? 0 : span.piecesBefore
      beforeRows += before
      afterRows += after
      if (before === after && after !== 0) continue
      const row = { article: span.article, heading: span.heading, chars: span.text.length, before, after }
      if (before !== after) changed.push(row)
      if (!span.empty && after === 0) lostAll.push(row)
    }
    let absorbBefore = 0
    let absorbAfter = 0
    const absorbChanged: Array<{
      host_article: string
      host_heading: number
      star_articles: string[]
      host_before: number
      host_after: number
      joined_before: number
      joined_after: number
      absorbed_before: number
      absorbed_after: number
      delta: number
      chars: number
    }> = []
    if (starAt.size > 0) {
      let region: Array<(typeof spanLog)[number]> = []
      const flushCensus = () => {
        if (!region.some((span) => starAt.has(span.heading))) {
          region = []
          return
        }
        const host = region[0]!
        if (starAt.has(host.heading)) {
          region = []
          return
        }
        const oldText = region.map((span) => span.text).join("")
        const joinedAfter = options?.skipDivide ? 1 : Math.max(1, divide(oldText, lawName, host.article, 1).length)
        const joinedBefore = options?.skipDivide ? 1 : Math.max(1, divide(oldText, lawName, host.article, 2).length)
        const hostAfter = host.empty ? 0 : host.pieces
        const hostBefore = host.empty ? 0 : host.piecesBefore
        const absorbedAfter = hostAfter - joinedAfter
        const absorbedBefore = hostBefore - joinedBefore
        absorbAfter += absorbedAfter
        absorbBefore += absorbedBefore
        const delta = absorbedAfter - absorbedBefore
        if (delta !== 0) {
          absorbChanged.push({
            host_article: host.article,
            host_heading: host.heading,
            star_articles: region.slice(1).map((span) => span.article),
            host_before: hostBefore,
            host_after: hostAfter,
            joined_before: joinedBefore,
            joined_after: joinedAfter,
            absorbed_before: absorbedBefore,
            absorbed_after: absorbedAfter,
            delta,
            chars: oldText.length,
          })
        }
        region = []
      }
      for (const span of spanLog) {
        if (!starAt.has(span.heading)) {
          flushCensus()
          region = [span]
        } else if (region.length === 0) region = [span]
        else region.push(span)
      }
      flushCensus()
    }
    return {
      changed,
      lost_all: lostAll,
      before_rows: beforeRows,
      after_rows: afterRows,
      absorb_before: absorbBefore,
      absorb_after: absorbAfter,
      absorb_changed: absorbChanged,
    }
  }
  if (gluedCutAt.size > 0) exceptions.push(`glued_heading_cut ${gluedCutAt.size}`)
  if (emptySkipped.length > 0) exceptions.push(`empty_heading ${emptySkipped.length}`)
  if (outputChars + emptyChars !== emitted.length) exceptions.push(`piece_coverage ${emitted.length - outputChars - emptyChars}`)
  const expected: Array<{ kind: string; core: string }> = []
  for (const row of strips) {
    for (const part of row.text.split("\n")) expected.push({ kind: row.kind, core: part.replace(/\r$/, "").trim() })
  }
  let queueAt = 0
  const kept: string[] = []
  const removedLineChars: number[] = []
  const removedKinds: string[] = []
  for (const line of joined.split("\n")) {
    const core = line.replace(/\r$/, "").trim()
    if (queueAt < expected.length && core === expected[queueAt]!.core) {
      removedLineChars.push(line.length)
      removedKinds.push(expected[queueAt]!.kind)
      queueAt += 1
      continue
    }
    kept.push(line)
  }
  const keptText = kept.join("\n")
  const dropByKind = new Map<string, number>()
  const lineCharSum = removedLineChars.reduce((total, chars) => total + chars, 0)
  let leftoverNewlines = joined.length - keptText.length - lineCharSum
  for (let i = 0; i < removedKinds.length; i += 1) {
    const extra = leftoverNewlines > 0 ? 1 : 0
    if (extra) leftoverNewlines -= 1
    const kind = removedKinds[i]!
    dropByKind.set(kind, (dropByKind.get(kind) ?? 0) + removedLineChars[i]! + extra)
  }
  const namedStripChars = [...dropByKind.values()].reduce((total, chars) => total + chars, 0)
  if (queueAt !== expected.length || keptText !== stripped) {
    exceptions.push("strip log does not rebuild the source")
  }
  if (leftoverNewlines !== 0 || namedStripChars !== joined.length - stripped.length) {
    exceptions.push(`strip_unaccounted ${joined.length - stripped.length - namedStripChars}`)
  }
  const keptAt = new Set(found.map((heading) => heading.index))
  const emptyAt = new Set(spanLog.filter((span) => span.empty).map((span) => span.heading))
  const emittedArticles = new Set((collectPieces ? produced : []).map((piece) => piece.article_num))
  const locatedByArticle = new Map<string, Heading[]>()
  for (const heading of foundAll) {
    const list = locatedByArticle.get(heading.articleNum) ?? []
    list.push(heading)
    locatedByArticle.set(heading.articleNum, list)
  }
  const absentArticles: Array<{ article: string; reason: string; spans: string[] }> = []
  for (const [article, headings] of locatedByArticle) {
    if (emittedArticles.has(article)) continue
    const reasons = new Set<string>()
    const spansOfArticle: string[] = []
    for (const heading of headings) {
      const at = foundAll.findIndex((hit) => hit.index === heading.index)
      const next = at >= 0 ? foundAll[at + 1]?.index ?? stripped.length : stripped.length
      const between = stripped.slice(heading.index, next)
      if (!keptAt.has(heading.index)) {
        reasons.add("citation")
        spansOfArticle.push(between)
      } else if (emptyAt.has(heading.index)) {
        reasons.add("empty_heading")
        spansOfArticle.push(spanLog.find((span) => span.heading === heading.index)?.text ?? between)
      } else {
        reasons.add("unemitted")
        spansOfArticle.push(between)
      }
    }
    const reason = [...reasons].sort().join("+")
    absentArticles.push({ article, reason, spans: spansOfArticle })
  }
  return {
    skip: null as string | null,
    chunks: ordered.length,
    chars: joined.length,
    headings: found.length,
    output_rows: outputRows,
    title_rows: titleRows,
    chapter_rows: chapterRows,
    articles,
    articles_no_title: articlesNoTitle,
    articles_over_two_pieces: piecesOverTwo,
    preamble_rows_written: preambleRows,
    remainder_chars: remainder.length,
    remainder_head: [...remainder].slice(0, 80).join(""),
    strips,
    named_drops: Object.fromEntries(dropByKind),
    joined_equals_stripped: joined === stripped,
    exceptions,
    max_tokens: maxTokens,
    rows_over_token_limit: rowsOver,
    boundary_failed: boundaryFailed,
    glued_heading_cuts: gluedCutAt.size,
    empty_heading: emptySkipped.length,
    empty_rows: emptyRows,
    empty_chars: emptyChars,
    empty_skipped: emptySkipped,
    empty_texts: spanLog.filter((span) => span.empty).map((span) => ({ article: span.article, heading: span.heading, text: span.text, length: span.length, next: span.next })),
    located_headings: foundAll.length,
    located_articles: locatedByArticle.size,
    emitted_articles: emittedArticles.size,
    absent_articles: absentArticles,
    star_rows: starRows,
    empty_star_rows: emptyStarRows,
    empty_host_rows: emptyHostRows,
    absorbed_rows: absorbedRows,
    paragraph_bad: paragraphBad,
    text_mismatch: 0,
    citation_headings: citationHeadings,
    conservation_stripped: stripped.length,
    conservation_rebuilt: outputChars,
    ...(options?.includeRemainder ? { remainder } : {}),
    embed_tokens: embedTokens,
    output_chars: outputChars,
    repeal_guard_lines: repealGuardLines,
    repeal_unblocked: repealUnblocked,
    repeal_examples: repealExamples,
    guard_rubric_old: guardRubricOld,
    guard_rubric_new: guardRubricNew,
    preamble_chars: preambleLen,
    body_chars: bodyLen,
    produced: collectPieces ? produced : [],
    old_regex_misses: oldMiss,
    new_plain_headings: newHeadings,
    glasnik_lines: glasnikLines,
    brisano_exact: brisanoExact,
    brisan_je_lines: brisanJe,
    tarifni_cyr_lines: tarifniCyr,
    latin_gazette_lines: latinGazette,
    residue: Object.fromEntries(residue),
    no_title: Object.fromEntries(noTitle),
    split_rules: Object.fromEntries(rules),
    longest,
    ...(rubricCensusResult ? { rubric_census: rubricCensusResult } : {}),
    ...(pieceCensusResult ? { piece_census: pieceCensusResult } : {}),
  }
}

/** Two output rows may not share (article_num, paragraph_num). Empty paragraphs collide here; unique_article does not treat them as the same key. */
export function duplicateArticleKeys(
  rows: Array<{ article_num: string; paragraph_num: string | null }>,
): Array<{ article_num: string; paragraph_num: string | null; rows: number }> {
  const counts = new Map<string, { article_num: string; paragraph_num: string | null; rows: number }>()
  for (const row of rows) {
    const key = `${row.article_num}\u0000${row.paragraph_num ?? ""}`
    const slot = counts.get(key) ?? { article_num: row.article_num, paragraph_num: row.paragraph_num, rows: 0 }
    slot.rows += 1
    counts.set(key, slot)
  }
  return [...counts.values()].filter((slot) => slot.rows > 1).sort((a, b) => b.rows - a.rows || a.article_num.localeCompare(b.article_num, "sr"))
}

function deciles(values: number[]): Record<string, number> {
  const sorted = [...values].sort((a, b) => a - b)
  const at = (p: number) => {
    if (sorted.length === 0) return 0
    const index = (sorted.length - 1) * p
    const lo = Math.floor(index)
    const hi = Math.ceil(index)
    if (lo === hi) return sorted[lo]!
    return Math.round(sorted[lo]! + (sorted[hi]! - sorted[lo]!) * (index - lo))
  }
  const out: Record<string, number> = { min: sorted[0] ?? 0, max: sorted.at(-1) ?? 0 }
  for (let i = 1; i <= 9; i += 1) out[`p${i * 10}`] = at(i / 10)
  return out
}

function tallyRun(rows: Array<Record<string, unknown>>) {
  const sum = (key: string) => rows.reduce((total, row) => total + Number(row[key] ?? 0), 0)
  const residue = new Map<string, number>()
  const noTitle = new Map<string, number>()
  const splitRules = new Map<string, number>()
  const exceptions: Array<Record<string, unknown>> = []
  let longest = { chars: 0, law: "", text: "" }
  for (const row of rows) {
    for (const [key, count] of Object.entries((row.residue as Record<string, number>) ?? {})) {
      residue.set(key, (residue.get(key) ?? 0) + count)
    }
    for (const [key, count] of Object.entries((row.no_title as Record<string, number>) ?? {})) {
      noTitle.set(key, (noTitle.get(key) ?? 0) + count)
    }
    for (const [key, count] of Object.entries((row.split_rules as Record<string, number>) ?? {})) {
      splitRules.set(key, (splitRules.get(key) ?? 0) + count)
    }
    const candidate = row.longest as { chars: number; law: string; text: string } | undefined
    if (candidate && candidate.chars > longest.chars) longest = candidate
    if (Number(row.remainder_chars) > 0 || ((row.exceptions as string[]) ?? []).length > 0) {
      exceptions.push({
        law: row.law,
        exceptions: row.exceptions,
        remainder_chars: row.remainder_chars,
        remainder_head: row.remainder_head,
        strip_count: Array.isArray(row.strips) ? row.strips.length : 0,
      })
    }
  }
  const input = sum("chunks")
  const output = sum("output_rows")
  return {
    laws: rows.length,
    input_chunks: input,
    output_rows: output,
    factor: input === 0 ? 0 : Number((output / input).toFixed(4)),
    title_rows: sum("title_rows"),
    chapter_rows: sum("chapter_rows"),
    articles: sum("articles"),
    articles_no_title: sum("articles_no_title"),
    articles_over_two_pieces: sum("articles_over_two_pieces"),
    preamble_rows_written: sum("preamble_rows_written"),
    max_tokens: rows.reduce((max, row) => Math.max(max, Number(row.max_tokens ?? 0)), 0),
    rows_over_token_limit: sum("rows_over_token_limit"),
    boundary_failed: sum("boundary_failed"),
    paragraph_bad: sum("paragraph_bad"),
    text_mismatch: sum("text_mismatch"),
    guard_rubric_old: sum("guard_rubric_old"),
    guard_rubric_new: sum("guard_rubric_new"),
    residue: Object.fromEntries([...residue.entries()].sort((a, b) => b[1] - a[1])),
    no_title: Object.fromEntries([...noTitle.entries()].sort((a, b) => b[1] - a[1])),
    split_rules: Object.fromEntries([...splitRules.entries()].sort((a, b) => b[1] - a[1])),
    longest_law_name_pattern: longest,
    conservation_exceptions: exceptions,
  }
}

async function main() {
  const progressPath = path.resolve(__dirname, "out", "_serbia-phase3-progress.txt")
  const snapshotPath = path.resolve(__dirname, "out", "serbia-phase2-snapshot-ids.txt")
  writeFileSync(progressPath, "", "utf8")
  const note = (message: string) => appendFileSync(progressPath, `${new Date().toISOString()}\t${message}\n`, "utf8")
  const checks = ruleChecks()
  if (
    !checks.new_plain_1a ||
    !checks.glued_period_number ||
    !checks.glued_period_length ||
    !checks.plain_rejects_glued ||
    !checks.numbered_caps_heading ||
    !checks.sentence_end_not_heading ||
    !checks.digit_not_heading ||
    !checks.folded_line_start ||
    !checks.folded_sentence_end_still_out ||
    !checks.repeal_serbian_paren_only ||
    !checks.repeal_serbian_with_stav ||
    checks.repeal_serbian_sentence ||
    !checks.gazette_notary_line ||
    checks.gazette_inline_sentence ||
    !checks.gazette_spaced_number ||
    !checks.odsek_word_removed ||
    !checks.glava_still_structural ||
    !checks.star_only ||
    !checks.star_quoted ||
    !checks.star_paren ||
    !checks.star_two ||
    !checks.star_amend ||
    !checks.star_visible ||
    !checks.star_fnrj ||
    !checks.star_body ||
    !checks.star_clan ||
    !checks.star_note ||
    !checks.star_other
  ) {
    throw new Error(`letter-rule encoding check failed ${JSON.stringify(checks)}`)
  }

  const spaceWords = ["службени", "гласник", "закон", "закона", "члан", "става", "став", "види", "брисан", "правилник", "уредба", "одлука"]
  const spaceSpecs = spaceWords.map((word) => {
    const alts: string[] = []
    for (let i = 1; i < word.length; i += 1) alts.push(`${word.slice(0, i)} ${word.slice(i)}`)
    return {
      word,
      re: new RegExp(`(?<!\\p{L})(?:${alts.join("|")})(?!\\p{L})`, "gu"),
      total: 0,
      forms: new Map<string, number>(),
    }
  })

  note("measuring database size")
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
  await client.connect()
  await client.query("BEGIN READ ONLY")
  await client.query("SET LOCAL statement_timeout = '60s'")
  const measured = await client.query<{ db: string; rows: string; serbia: string; emb: number }>(
    `SELECT pg_database_size('postgres')::text AS db,
            (SELECT count(*)::text FROM public.legal_articles) AS rows,
            (SELECT count(*)::text FROM public.legal_articles WHERE jurisdiction = 'serbia') AS serbia,
            (SELECT pg_column_size(embedding) FROM public.legal_articles WHERE jurisdiction = 'serbia' AND embedding IS NOT NULL LIMIT 1) AS emb`,
  )
  const indexRows = await client.query<{ name: string; bytes: string }>(
    `SELECT c.relname AS name, pg_relation_size(c.oid)::text AS bytes
       FROM pg_index i
       JOIN pg_class c ON c.oid = i.indexrelid
       JOIN pg_class t ON t.oid = i.indrelid
      WHERE t.relname = 'legal_articles' AND t.relnamespace = 'public'::regnamespace`,
  )
  await client.query("SET LOCAL statement_timeout = '0'")
  note("measuring text bytes")
  const textMeasured = await client.query<{
    chars: string
    avg_len: string
    avg_local: string
    avg_text: string
    ratio_n: string
  }>(
    `SELECT (SELECT sum(length(text_local))::text FROM public.legal_articles WHERE text_local IS NOT NULL) AS chars,
            (SELECT round(avg(length(text_local)))::text FROM public.legal_articles
              WHERE jurisdiction = 'serbia' AND text IS NOT DISTINCT FROM text_local AND length(text_local) BETWEEN 200 AND 4000) AS avg_len,
            (SELECT round(avg(pg_column_size(text_local)))::text FROM public.legal_articles
              WHERE jurisdiction = 'serbia' AND text IS NOT DISTINCT FROM text_local AND length(text_local) BETWEEN 200 AND 4000) AS avg_local,
            (SELECT round(avg(pg_column_size(text)))::text FROM public.legal_articles
              WHERE jurisdiction = 'serbia' AND text IS NOT DISTINCT FROM text_local AND length(text_local) BETWEEN 200 AND 4000) AS avg_text,
            (SELECT count(*)::text FROM public.legal_articles
              WHERE jurisdiction = 'serbia' AND text IS NOT DISTINCT FROM text_local AND length(text_local) BETWEEN 200 AND 4000) AS ratio_n`,
  )

  const ids = readFileSync(snapshotPath, "utf8").split(/\n/).filter(Boolean)
  note(`snapshot ${ids.length}`)
  await client.query(
    `DECLARE phase3 NO SCROLL CURSOR FOR
       SELECT law_name_local, article_num, text_local
         FROM public.legal_articles
        WHERE id = ANY($1::uuid[])
        ORDER BY law_name_local,
                 CASE WHEN article_num ~ '^[0-9]+$' THEN article_num::int END NULLS LAST,
                 article_num`,
    [ids],
  )

  const dominates: Array<{ law: string; chunks: number; clan_lines: number; preamble: number; body: number }> = []
  const noClan: Array<{ law: string; chunks: number }> = []
  const notContiguous: Array<{ law: string; chunks: number; clan_lines: number; min_n: number; max_n: number; missing: number[] }> = []
  const done: Array<Record<string, unknown>> = []
  const failures: Array<{ law: string; error: string }> = []
  const mismatches: Array<{ law: string; exceptions: string[] }> = []
  const starredOnly: Array<{ law_name_local: string; kind: string; text: string }> = []
  const starOnlyExamples: string[] = []
  const starOtherExamples: string[] = []
  let starredStart = 0
  let starredOnlyCount = 0
  let starredOtherCount = 0
  let odsekCapital = 0
  let odsekAbove = 0
  const odsekExamples: Array<{ law: string; line: string; next: string }> = []
  const repealCases: Array<Record<string, string>> = []
  let lawsSeen = 0
  let kept = 0

  function scanLaw(law: string, chunks: Chunk[]) {
    let pending: string | null = null
    for (const chunk of chunks) {
      const lines = (chunk.text_local ?? "").split("\n").map((line) => line.replace(/\r$/, "").trim()).filter((line) => line !== "")
      for (const line of lines) {
        const folded = line.toLocaleLowerCase("sr")
        for (const spec of spaceSpecs) {
          spec.re.lastIndex = 0
          for (const match of folded.matchAll(spec.re)) {
            const form = match[0] ?? ""
            spec.total += 1
            spec.forms.set(form, (spec.forms.get(form) ?? 0) + 1)
          }
        }
        if (/^\*+\s*Службени/u.test(line)) starredStart += 1
        const starred = isStarredCitationOnly(line)
        if (starred === true) {
          starredOnlyCount += 1
          starredOnly.push({ law_name_local: law, kind: "starred_gazette", text: line })
          if (starOnlyExamples.length < 12) starOnlyExamples.push(line.slice(0, 180))
        } else if (starred === false) {
          starredOtherCount += 1
          if (starOtherExamples.length < 12) starOtherExamples.push(line.slice(0, 200))
        }
        if (pending && isArticleHeading(line)) {
          odsekAbove += 1
          if (odsekExamples.length < 8) odsekExamples.push({ law, line: pending.slice(0, 120), next: line.slice(0, 80) })
        }
        pending = /^Одсек(?:[ \t]|$)/u.test(line) && isUpperStart(line) && !line.endsWith(".") ? line : null
        if (pending) odsekCapital += 1
      }
    }
  }

  function classify(chunks: Chunk[]) {
    const ordered = [...chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
    const nums = ordered.map((row) => (/^[1-9][0-9]*$/.test(row.article_num) ? Number(row.article_num) : null))
    const numeric = nums.every((n) => n != null)
    const present = new Set(nums.filter((n): n is number => n != null))
    const minN = present.size ? Math.min(...present) : 0
    const maxN = present.size ? Math.max(...present) : 0
    const missing: number[] = []
    if (numeric && present.size) {
      for (let n = minN; n <= maxN; n += 1) if (!present.has(n)) missing.push(n)
    }
    const contiguous = numeric && present.size === ordered.length && minN === 1 && maxN === ordered.length
    const joined = ordered.map((row) => row.text_local ?? "").join("")
    let clan = 0
    let preamble: number | null = null
    let offset = 0
    const parts = joined.split("\n")
    for (let i = 0; i < parts.length; i += 1) {
      const line = (parts[i] ?? "").replace(/\r$/, "")
      if (/^Члан[ \t]+[0-9]/u.test(line)) {
        clan += 1
        if (preamble == null) preamble = offset
      }
      offset += (parts[i] ?? "").length + (i + 1 < parts.length ? 1 : 0)
    }
    const body = preamble == null ? null : joined.length - preamble
    return { contiguous, clan, preamble, body, minN, maxN, missing }
  }

  async function finishLaw(law: string, chunks: Chunk[]) {
    lawsSeen += 1
    scanLaw(law, chunks)
    const info = classify(chunks)
    if (info.preamble == null || info.body == null) {
      noClan.push({ law, chunks: chunks.length })
    } else if (info.preamble > info.body) {
      dominates.push({ law, chunks: chunks.length, clan_lines: info.clan, preamble: info.preamble, body: info.body })
    } else if (!info.contiguous) {
      notContiguous.push({ law, chunks: chunks.length, clan_lines: info.clan, min_n: info.minN, max_n: info.maxN, missing: info.missing.slice(0, 40) })
    } else {
      kept += 1
      try {
        const result = processLaw(law, chunks)
        if (result.skip) {
          failures.push({ law, error: `skip:${result.skip}` })
        } else {
          const row = result as Record<string, unknown>
          delete row.strips
          delete row.produced
          done.push({ law, ...row })
          const exceptions = (row.exceptions as string[]) ?? []
          if (exceptions.length > 0) mismatches.push({ law, exceptions })
          const cases = (row.repeal_examples as Array<{ article: string; title: string; repeal: string }>) ?? []
          for (const item of cases) {
            if (repealCases.length < 5) repealCases.push({ law, article: item.article, title: item.title, repeal: item.repeal, before: "blocked", after: "moved" })
          }
          if (kept % 25 === 0) {
            appendFileSync(progressPath, `kept\t${kept}\t${Number(row.chunks)}\t${Number(row.output_rows)}\t${law.slice(0, 70)}\n`, "utf8")
          }
        }
      } catch (error) {
        failures.push({ law, error: error instanceof Error ? error.message : String(error) })
        appendFileSync(progressPath, `FAIL\t${law.slice(0, 80)}\t${error instanceof Error ? error.message : String(error)}\n`, "utf8")
      }
    }
    if (lawsSeen % 200 === 0) appendFileSync(progressPath, `seen\t${lawsSeen}\tkept\t${kept}\n`, "utf8")
  }

  let current = ""
  let bucket: Chunk[] = []
  for (;;) {
    const batch = await client.query<Chunk & { law_name_local: string }>("FETCH 200 FROM phase3")
    if (batch.rows.length === 0) break
    for (const row of batch.rows) {
      if (row.law_name_local !== current) {
        if (bucket.length) await finishLaw(current, bucket)
        current = row.law_name_local
        bucket = []
      }
      bucket.push({ article_num: row.article_num, text_local: row.text_local })
    }
  }
  if (bucket.length) await finishLaw(current, bucket)
  await client.query("CLOSE phase3")
  await client.query("COMMIT")
  await client.end()

  const sum = (key: string) => done.reduce((total, row) => total + Number(row[key] ?? 0), 0)
  const input = sum("chunks")
  const output = sum("output_rows")
  const factors = done.map((row) => Number(row.chunks) === 0 ? 0 : Number(row.output_rows) / Number(row.chunks))
  const formCounts = new Map<string, number>()
  let brokenTotal = 0
  const perWord: Record<string, number> = {}
  for (const spec of spaceSpecs) {
    perWord[spec.word] = spec.total
    brokenTotal += spec.total
    for (const [form, count] of spec.forms) formCounts.set(form, (formCounts.get(form) ?? 0) + count)
  }
  const topForms = [...formCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([form, count]) => ({ form, count }))
  dominates.sort((a, b) => b.clan_lines - a.clan_lines || b.chunks - a.chunks)
  const db = Number(measured.rows[0]?.db ?? 0)
  const tableRows = Number(measured.rows[0]?.rows ?? 0)
  const serbiaRows = Number(measured.rows[0]?.serbia ?? 0)
  const embBytes = Number(measured.rows[0]?.emb ?? 0)
  const allChars = Number(textMeasured.rows[0]?.chars ?? 0)
  const avgLen = Number(textMeasured.rows[0]?.avg_len ?? 0)
  const avgLocal = Number(textMeasured.rows[0]?.avg_local ?? 0)
  const avgText = Number(textMeasured.rows[0]?.avg_text ?? 0)
  const indexBytes = Object.fromEntries(indexRows.rows.map((row) => [row.name, Number(row.bytes)]))
  const bytesPerRow = (name: string, denom: number) => (indexBytes[name] ?? 0) / denom
  const outputChars = sum("output_chars")
  const textPerChar = avgLen === 0 ? 0 : (avgLocal + avgText) / avgLen
  const ginPerChar = allChars === 0 ? 0 : ((indexBytes.legal_articles_text_local_trgm_idx ?? 0) + (indexBytes.legal_articles_text_local_fts_idx ?? 0)) / allChars
  const fixedPerRow =
    24 +
    embBytes +
    bytesPerRow("legal_articles_ivfflat_serbia_half_idx", serbiaRows) +
    bytesPerRow("unique_article", tableRows) +
    bytesPerRow("legal_articles_pkey", tableRows) +
    bytesPerRow("legal_articles_full_filter_idx", tableRows) +
    bytesPerRow("legal_articles_category_idx", tableRows) +
    bytesPerRow("legal_articles_jurisdiction_idx", tableRows)
  const diskBytes = output * fixedPerRow + outputChars * textPerChar + outputChars * ginPerChar
  const embedTokens = sum("embed_tokens")
  const usdPerMillion = 0.02
  const trigger = 16.2e9
  const starLog = path.resolve(__dirname, "out", "serbia-phase3-starred-strips.jsonl")
  writeFileSync(starLog, starredOnly.map((row) => JSON.stringify(row)).join("\n") + (starredOnly.length ? "\n" : ""), "utf8")
  const priorLog = path.resolve(__dirname, "out", "serbia-phase2-strips.jsonl")
  const prior = readFileSync(priorLog, "utf8")
  if (starredOnly.length && !prior.includes('"kind":"starred_gazette"')) {
    appendFileSync(priorLog, starredOnly.map((row) => JSON.stringify(row)).join("\n") + "\n", "utf8")
  }

  const splitRules = new Map<string, number>()
  const residue = new Map<string, number>()
  const noTitle = new Map<string, number>()
  for (const row of done) {
    for (const [key, count] of Object.entries((row.split_rules as Record<string, number>) ?? {})) {
      splitRules.set(key, (splitRules.get(key) ?? 0) + count)
    }
    for (const [key, count] of Object.entries((row.residue as Record<string, number>) ?? {})) {
      residue.set(key, (residue.get(key) ?? 0) + count)
    }
    for (const [key, count] of Object.entries((row.no_title as Record<string, number>) ?? {})) {
      noTitle.set(key, (noTitle.get(key) ?? 0) + count)
    }
  }
  const byCount = (map: Map<string, number>) => Object.fromEntries([...map.entries()].sort((a, b) => b[1] - a[1]))

  const report = {
    credentials: ["scripts/outreach/.env", ".env.local"],
    writes: 0,
    snapshot_ids: ids.length,
    laws_seen: lawsSeen,
    kept,
    no_clan: noClan.length,
    preamble_dominates: {
      n: dominates.length,
      over_10: dominates.filter((row) => row.clan_lines > 10).length,
      over_50: dominates.filter((row) => row.clan_lines > 50).length,
      over_100: dominates.filter((row) => row.clan_lines > 100).length,
      laws: dominates,
    },
    not_contiguous: notContiguous,
    starred: {
      lines_starting_star_sluzbeni: starredStart,
      citation_only: starredOnlyCount,
      other_text: starredOtherCount,
      citation_examples: starOnlyExamples,
      other_examples: starOtherExamples,
      log: "scripts/out/serbia-phase3-starred-strips.jsonl",
    },
    injected_spaces: { total: brokenTotal, per_word: perWord, top_forms: topForms },
    odsek: { capital_no_period: odsekCapital, directly_above_clan: odsekAbove, examples: odsekExamples },
    repeal: {
      headings_with_repeal_line: sum("repeal_guard_lines"),
      titles_unblocked: sum("repeal_unblocked"),
      guard_rubric_old: sum("guard_rubric_old"),
      guard_rubric_new: sum("guard_rubric_new"),
      cases: repealCases,
    },
    dry_run: {
      laws: done.length,
      input_chunks: input,
      output_rows: output,
      factor: input === 0 ? 0 : Number((output / input).toFixed(4)),
      factor_distribution: deciles(factors),
      factor_under_1: factors.filter((factor) => factor < 1).length,
      factor_equal_1: factors.filter((factor) => factor === 1).length,
      factor_over_1: factors.filter((factor) => factor > 1).length,
      articles: sum("articles"),
      title_rows: sum("title_rows"),
      chapter_rows: sum("chapter_rows"),
      articles_no_title: sum("articles_no_title"),
      articles_over_two_pieces: sum("articles_over_two_pieces"),
      preamble_rows_written: sum("preamble_rows_written"),
      max_tokens: done.reduce((max, row) => Math.max(max, Number(row.max_tokens ?? 0)), 0),
      rows_over_token_limit: sum("rows_over_token_limit"),
      boundary_failed: sum("boundary_failed"),
      paragraph_bad: sum("paragraph_bad"),
      text_mismatch: sum("text_mismatch"),
      output_chars: outputChars,
      embed_tokens: embedTokens,
      split_rules: byCount(splitRules),
      residue: byCount(residue),
      no_title: byCount(noTitle),
      failures,
      conservation_mismatches: mismatches,
    },
    projection: {
      model: "text-embedding-3-small",
      usd_per_million_tokens: usdPerMillion,
      embed_tokens: embedTokens,
      embed_usd: Number(((embedTokens / 1_000_000) * usdPerMillion).toFixed(4)),
      database_bytes: db,
      autoscale_trigger_bytes: trigger,
      halfvec_column_bytes: embBytes,
      text_bytes_per_char: Number(textPerChar.toFixed(4)),
      text_ratio_rows: Number(textMeasured.rows[0]?.ratio_n ?? 0),
      text_ratio_avg_chars: avgLen,
      gin_bytes_per_char: Number(ginPerChar.toFixed(6)),
      fixed_bytes_per_row: Number(fixedPerRow.toFixed(2)),
      disk_growth_bytes: Math.round(diskBytes),
      index_bytes: indexBytes,
      table_rows: tableRows,
      serbia_rows: serbiaRows,
      all_text_chars: allChars,
    },
  }
  const out = path.resolve(__dirname, "out", "_serbia-phase3-summary.json")
  writeFileSync(out, JSON.stringify(report, null, 2), "utf8")
  process.stdout.write(`${out}\n`)
}

if (path.resolve(process.argv[1] ?? "") === __filename) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`)
    process.exit(1)
  })
}

export { PLAIN_ARTICLE, RANGE_ARTICLE, MARKER_ARTICLE, CITATION_NUM }
