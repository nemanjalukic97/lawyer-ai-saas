import fs from "fs"
import path from "path"
import { prepareText, extractObrazlozenje } from "./_gen-prepare-text.mjs"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const COURT = "Vrhovno sodišče Republike Slovenije"
const JURISDICTION = "slovenia"

const CASE_TYPE_RE =
  /\b(Cpg|Pg|Pdp|Ds|Dsp|Ips|DoR|Rev|Cp|Kp|Ks|Kr|Up|Uv|U|II)\b/i

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
    institut: get("Institut"),
  }
}

function extractSection(body, label) {
  const labels = ["Jedro", "Izrek", "Obrazložitev", "Obrazlozitev", "Zveza"]
  const others = labels.filter((l) => l !== label).join("|")
  const re = new RegExp(
    `^${label}:\\s*\\n?([\\s\\S]*?)(?=\\n(?:${others}):|$)`,
    "im",
  )
  const m = body.match(re)
  return m ? m[1].trim() : ""
}

function caseNumberFromFilename(fn) {
  const base = fn.replace(/\.txt$/i, "")
  const parts = base.split("-")
  if (parts.length < 3) return null

  const year = parts[parts.length - 1]
  if (!/^\d{4}$/.test(year)) return null

  const num = parts[parts.length - 2]
  const prefix = parts.slice(0, -2).join(" ")
  return `${prefix} ${num}/${year}`
}

function caseTypeToken(caseNum) {
  const cn = caseNum.trim()
  if (/in\s+sklep/i.test(cn)) return "sklep"

  // Strip senat prefix (I, II, III, …) so "II DoR" maps to DoR, not II.
  const withoutSenat = cn.replace(/^(?:[IVXLC]+)\s+(?=[A-Za-z])/i, "")
  const m = withoutSenat.match(CASE_TYPE_RE)
  return m ? m[1] : null
}

export function legalAreaFromCaseNumber(caseNum) {
  const t = caseTypeToken(caseNum)?.toLowerCase()
  if (!t) return "civil"
  if (t === "sklep") return "procedural"
  if (t === "ips" || t === "cp" || t === "rev" || t === "dor") return "civil"
  if (t === "kp" || t === "ks") return "criminal"
  if (t === "pdp" || t === "ds") return "labor"
  if (t === "up" || t === "u" || t === "uv") return "administrative"
  if (t === "cpg" || t === "pg") return "commercial"
  if (t === "ii") return "procedural"
  return "civil"
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

  const iso = /^(\d{4}-\d{2}-\d{2})/.exec(s)
  if (iso) {
    const parts = iso[1].split("-")
    let day = +parts[2]
    if (day === 0) day = 1
    return `${parts[0]}-${parts[1]}-${String(day).padStart(2, "0")}`
  }

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
  if (/Predlog\s+se\s+zavrne|pritožba\s+se\s+zavrne|Pritožba\s+se\s+zavrne/i.test(s))
    return "defendant_won"
  if (/Zahtev[a-z]*\s+se\s+ugodi|Tožbi\s+se\s+ugodi|Tožba\s+se\s+usvaja|Ugodi\s+se/i.test(s)) {
    return /razveljavi|ukine|vrne|preinači/i.test(s) ? "remanded" : "partially"
  }
  if (/potrdi|potrjuje|POTRJUJE/i.test(s)) return "plaintiff_won"
  if (/razveljavi|ukine|vrne\s+.*\s+v\s+novo|preinači/i.test(s)) return "remanded"
  if (/zavrne|zavrže|zavrn/i.test(s)) return "defendant_won"
  if (/odbaci|odbacuje/i.test(s)) return "procedural"
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
      if (p) set.add(`čl. ${p}. ${tag}`)
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

function statuteLabel(legal_area) {
  switch (legal_area) {
    case "criminal":
      return "Kazenski zakonik in Zakon o kazenskem postopku"
    case "administrative":
      return "Zakon o upravnem sporu in povezani predpisi"
    case "labor":
      return "Zakon o delovnih razmerjih in povezani predpisi"
    case "commercial":
      return "Zakon o gospodarskih družbah in povezani predpisi"
    case "procedural":
      return "Zakon o pravdnem postopku in procesni predpisi"
    default:
      return "Stvarnopravni zakonik, Zakon o pravdnem postopku in povezani predpisi"
  }
}

function summarize(body, jedro, izrekaRaw, obrazlozitev, caseNum, legal_area) {
  let cp = prepareText(izrekaRaw)
  if (!cp) cp = prepareText(body.slice(0, 1200))

  const obraz =
    obrazlozitev.length >= 120
      ? prepareText(obrazlozitev)
      : extractObrazlozenje(body.replace(/Obrazložitev/i, "Obrazloženje"))
  const reasoning =
    obraz.length >= 120
      ? obraz
      : `${COURT} odloča v predmetu ${caseNum}, uporabljajoč ${statuteLabel(legal_area)}.`

  const head = jedro
    ? prepareText(jedro).slice(0, 220)
    : cp.slice(0, 160) || prepareText(body).slice(0, 200)

  return {
    legal_question: extractLegalQuestion({ body, izreka: izrekaRaw, prepareText }),
    court_position: cp || prepareText(body),
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

  const legal_area = legalAreaFromCaseNumber(caseNum)
  const jedro = extractSection(body, "Jedro")
  const izreka = extractSection(body, "Izrek")
  const obrazlozitev =
    extractSection(body, "Obrazložitev") || extractSection(body, "Obrazlozitev")

  const yearFallback = yearFromCaseNumber(caseNum)
  const decision_date = firstDecisionDate(decision_date_raw, body, yearFallback)
  const outcome = outcomeFromText(izreka || body.slice(0, 3000))
  const sum = summarize(body, jedro, izreka, obrazlozitev, caseNum, legal_area)
  const related = extractArticles(body)
  const typeToken = caseTypeToken(caseNum)
  const prefix = typeToken || caseNum.split(/\s+/)[0]
  const keywords = [legal_area, COURT, prefix].filter(Boolean)

  const entry = {
    jurisdiction: JURISDICTION,
    court: COURT,
    court_level: "supreme",
    case_number: caseNum,
    decision_date,
    legal_area,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : undefined,
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
    court_level: "supreme",
    case_number: ${tsEscape(c.case_number)},
    decision_date: ${tsEscape(c.decision_date)},
    legal_area: ${tsEscape(c.legal_area)},
    legal_question:
      ${tsEscape(c.legal_question)},
    court_position:
      ${tsEscape(c.court_position)},
    reasoning:
      ${tsEscape(c.reasoning)},
    keywords: ${JSON.stringify(c.keywords)},`,
  ]
  if (c.related_articles?.length) {
    lines.push(`    related_articles: ${JSON.stringify(c.related_articles)},`)
  }
  lines.push(
    `    headnote: ${tsEscape(c.headnote)},`,
    `    outcome: ${tsEscape(c.outcome)},`,
  )
  if (c.source_url) lines.push(`    source_url: ${tsEscape(c.source_url)},`)
  lines.push("  }")
  return lines.join("\n")
}

export function fileNamesForArea(area, chunkIndex) {
  const n = chunkIndex + 1
  const areaUpper = area.toUpperCase()
  return {
    tsFile: `case-law-${area}-slovenia-${n}.ts`,
    exportName: `CASE_LAW_${areaUpper}_SLOVENIA_${n}`,
  }
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
