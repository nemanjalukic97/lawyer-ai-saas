import fs from "fs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const COURT = "Upravno sodišče Republike Slovenije"
const LEGAL_AREA = "administrative"
const JURISDICTION = "slovenia"

/** Sodnapraksa TXT uses normal spacing — avoid PDF syllable-merge heuristics. */
function normalizeSi(s) {
  if (!s) return ""
  return s.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, " ").replace(/\s+/g, " ").trim()
}

function parseHeader(raw) {
  const headerEnd = raw.indexOf("\n---")
  const header = headerEnd === -1 ? raw.slice(0, 1200) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd).replace(/^\n---\n?/, "")

  const get = (label) => {
    const m = header.match(new RegExp(`^${label}:\\s*(.+)$`, "im"))
    return m ? m[1].trim() : ""
  }

  return {
    body,
    case_number: get("Opravilna številka") || get("Opravilna stevilka"),
    decision_date_raw: get("Datum odločbe") || get("Datum odlocbe"),
    source_url: get("URL"),
  }
}

function extractSection(body, label) {
  const re = new RegExp(`(?:^|\\r?\\n)${label}:\\s*\\r?\\n`, "i")
  const startM = body.match(re)
  if (!startM || startM.index == null) return ""

  const start = startM.index + startM[0].length
  const rest = body.slice(start)
  const nextRe = /\r?\n(?:Jedro|Izrek|Obrazložitev|Obrazlozitev|Zveza):\s*(?:\r?\n|$)/i
  const next = rest.search(nextRe)
  return (next === -1 ? rest : rest.slice(0, next)).trim()
}

function caseNumberFromFilename(fn) {
  const base = fn.replace(/\.txt$/i, "")
  const m = base.match(/^([A-Za-z]+(?:-[A-Za-z]+)*)-(\d+)-(\d{4})-(\d+)$/i)
  if (!m) return null
  const prefix = m[1].replace(/-/g, " ")
  return `${prefix} ${m[2]}/${m[3]}-${m[4]}`
}

function isoFromNumeric(dayS, monthS, yearS) {
  let day = +dayS
  const month = +monthS
  const year = +yearS
  if (!year || !month || Number.isNaN(month)) return null
  if (day === 0) day = 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function parseDateRaw(raw, yearFallback) {
  if (!raw) return null
  const s = raw.trim().replace(/\.$/, "")

  const num = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (num) return isoFromNumeric(num[1], num[2], num[3])

  if (/^\d{4}$/.test(s)) return `${s}-01-01`
  return yearFallback ? `${yearFallback}-01-01` : null
}

function yearFromCaseNumber(caseNumber) {
  const m = caseNumber.match(/\/(\d{4})(?:-\d+)?(?:\/|$|\s)/)
  return m ? m[1] : null
}

function firstDecisionDate(headerRaw, body, yearFallback) {
  const fromHeader = parseDateRaw(headerRaw, yearFallback)
  if (fromHeader) return fromHeader

  const chunk = body.slice(0, 15000)
  const generic = chunk.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (generic) return isoFromNumeric(generic[1], generic[2], generic[3])

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function outcomeFromText(iz) {
  const s = iz.slice(0, 2500)
  if (/Tožbi\s+se\s+ugodi|Tožba\s+se\s+usvaja|Tožbi\s+ugodi|Usvaja\s+se\s+tožb/i.test(s)) {
    return /ukine|ukine|odpravi|preinači|preinač/i.test(s) ? "remanded" : "plaintiff_won"
  }
  if (/Odpravi\s+se|Odpravlja\s+se|Preinači\s+se|Preinačuje\s+se|Ukine\s+se|Ukinje\s+se/i.test(s)) {
    return /tožb[a-z]*\s+se\s+zavrne|Zavrne\s+se\s+tožb/i.test(s) ? "partially" : "remanded"
  }
  if (/Tožba\s+se\s+zavrne|Tožbo\s+zavrne|Zavrne\s+se\s+tožb|Tožba\s+je\s+neutemeljena/i.test(s))
    return "defendant_won"
  if (/Potrdi\s+se|Potrjuje\s+se|POTRJUJE/i.test(s)) return "defendant_won"
  if (/Odbaci\s+se|Odbacuje\s+se|Tožba\s+se\s+odbaci/i.test(s)) return "procedural"
  if (/Usvaja\s+se|Uvažava\s+se/i.test(s)) return "partially"
  return "partially"
}

function extractArticles(body) {
  const set = new Set()
  const zveza = extractSection(body, "Zveza")
  const scan = `${zveza}\n${body.slice(0, 35000)}`

  for (const line of zveza.split("\n")) {
    const lawM = line.match(/-\s*([A-Z][A-Za-z0-9-]{1,15})\s*-\s*člen\s+([\d,/]+)/i)
    if (!lawM) continue
    const tag = lawM[1].trim()
    for (const part of lawM[2].split(/,\s*/)) {
      const p = part.trim()
      if (p.includes("/")) set.add(`čl. ${p}. ${tag}`)
      else set.add(`čl. ${p}. ${tag}`)
    }
  }

  let m
  const re = /(\d+)\.\s*člen[a]?\s+([A-Z][A-Za-z0-9-]{1,15})/gi
  while ((m = re.exec(scan))) {
    set.add(`čl. ${m[1]}. ${m[2]}`)
  }

  const re2 = /(\d+)\.\s*odstav(?:ku|ka)\s+(\d+)\.\s*člen[a]?\s+([A-Z][A-Za-z0-9-]{1,15})/gi
  while ((m = re2.exec(scan))) {
    set.add(`čl. ${m[2]}. st. ${m[1]}. ${m[3]}`)
  }

  return [...set].slice(0, 10)
}

function summarize(body, jedro, izrekaRaw, obrazlozitev, caseNum) {
  let cp = normalizeSi(izrekaRaw)
  if (!cp) cp = normalizeSi(body.slice(0, 1200))

  const obraz = obrazlozitev.length >= 120 ? normalizeSi(obrazlozitev) : normalizeSi(body.slice(0, 8000))
  const reasoning =
    obraz.length >= 120
      ? obraz
      : `Upravno sodišče Republike Slovenije odloča v predmetu ${caseNum}, uporabljajoč Zakon o upravnem sporu in povezane procesne predpise.`

  const head = jedro
    ? normalizeSi(jedro).slice(0, 220)
    : cp.slice(0, 160) || normalizeSi(body).slice(0, 200)

  return {
    legal_question: extractLegalQuestion({ body, izreka: izrekaRaw, prepareText: normalizeSi }),
    court_position: cp || normalizeSi(body),
    reasoning,
    headnote: head,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const { body, case_number, decision_date_raw, source_url } = parseHeader(raw)
  const caseNum = case_number || caseNumberFromFilename(fn)
  if (!caseNum) return null

  const jedro = extractSection(body, "Jedro")
  const izreka = extractSection(body, "Izrek")
  const obrazlozitev = extractSection(body, "Obrazložitev") || extractSection(body, "Obrazlozitev")

  const yearFallback = yearFromCaseNumber(caseNum)
  const decision_date = firstDecisionDate(decision_date_raw, body, yearFallback)
  const outcome = outcomeFromText(izreka || body.slice(0, 3000))
  const sum = summarize(body, jedro, izreka, obrazlozitev, caseNum)
  const related = extractArticles(body)
  const prefix = caseNum.split(/\s+/)[0] || "UPRS"
  const keywords = [LEGAL_AREA, "Upravno sodišče", prefix].filter(Boolean)

  const entry = {
    jurisdiction: JURISDICTION,
    court: COURT,
    court_level: "administrative",
    case_number: caseNum,
    decision_date,
    legal_area: LEGAL_AREA,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : ["čl. 63. ZUS-1"],
    headnote: sum.headnote,
    outcome,
  }
  if (source_url) entry.source_url = source_url
  return entry
}

export function caseToTsBlock(c) {
  const lines = [
    `  {
    jurisdiction: "slovenia",
    court: ${tsEscape(c.court)},
    court_level: "administrative",
    case_number: ${tsEscape(c.case_number)},
    decision_date: ${tsEscape(c.decision_date)},
    legal_area: "administrative",
    legal_question:
      ${tsEscape(c.legal_question)},
    court_position:
      ${tsEscape(c.court_position)},
    reasoning:
      ${tsEscape(c.reasoning)},
    keywords: ${JSON.stringify(c.keywords)},
    related_articles: ${JSON.stringify(c.related_articles)},
    headnote: ${tsEscape(c.headnote)},
    outcome: ${tsEscape(c.outcome)},`,
  ]
  if (c.source_url) lines.push(`    source_url: ${tsEscape(c.source_url)},`)
  lines.push("  }")
  return lines.join("\n")
}

export function writeCaseLawFile(outPath, exportName, cases, comment) {
  const header = `// scripts/${path.basename(outPath)}
// ${comment}

import type { CaseLawInput } from "./ingest-case-law"

export const ${exportName}: CaseLawInput[] = [
`
  const body = cases.length ? cases.map(caseToTsBlock).join(",\n") + "\n" : ""
  fs.writeFileSync(outPath, header + body + "]\n", "utf8")
}
