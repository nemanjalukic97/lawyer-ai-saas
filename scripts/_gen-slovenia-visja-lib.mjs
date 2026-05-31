import fs from "fs"
import path from "path"
const OBRAZLOZITEV_RE = /\bObrazložitev\b|\bObrazloženje\b/i

function extractReasoning(full) {
  const m = full.match(OBRAZLOZITEV_RE)
  if (!m || m.index == null) return ""
  return prepareSloveniaText(full.slice(m.index))
}

/** Sodnapraksa TXT is already spaced; avoid aggressive syllable-merge from prepareText. */
export function prepareSloveniaText(raw) {
  if (!raw) return ""
  return String(raw)
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const JURISDICTION = "slovenia"
const COURT_LEVEL = "appellate"

const COURT_MAP = {
  "višje sodišče v ljubljani": "VSL",
  "višje sodišče v mariboru": "VSM",
  "višje sodišče v kopru": "VSK",
  "višje sodišče v celju": "VSC",
}

const LAW_HINTS = [
  ["ZPP", /Zakona o pravdnem postopku|ZPP/i],
  ["ZKP", /Zakona o kazenskem postopku|ZKP/i],
  ["ZDR-1", /Zakona o delovnih razmerjih|ZDR/i],
  ["ZUS-1", /Zakona o upravnem sporu|ZUS/i],
  ["ZFPPIPP", /ZFPPIPP|insolventnosti/i],
  ["ZIZ", /Zakona o izvršbi|ZIZ/i],
  ["ZOO", /obligacijskih razmerjih|ZOO/i],
  ["ZGD-1", /gospodarskih družbah|ZGD/i],
]

export function legalAreaFromCaseNumber(caseNum) {
  const s = caseNum.replace(/\s+/g, " ")
  if (/\bPRp\b/i.test(s)) return "procedural"
  if (/\bPdp\b/i.test(s)) return "labor"
  if (/\bCpg\b/i.test(s) || /\bPg\b/i.test(s)) return "commercial"
  if (/\bCst\b/i.test(s) || /\bRg\b/i.test(s)) return "commercial"
  if (/\bIp\b/i.test(s)) return "enforcement"
  if (/\bKp\b/i.test(s) || /\bKs\b/i.test(s)) return "criminal"
  if (/\bUp\b/i.test(s) || /\bU\s+\d/i.test(s)) return "administrative"
  if (/\bCp\b/i.test(s) || /\bRev\b/i.test(s)) return "civil"
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

export function normalizeDecisionDate(raw, textFallback = "") {
  if (raw != null && String(raw).trim() !== "") {
    const s = String(raw).trim().replace(/\.$/, "")
    if (/^\d{4}$/.test(s)) return `${s}-01-01`
    const isoDayZero = /^(\d{4}-\d{2})-00$/.exec(s)
    if (isoDayZero) return `${isoDayZero[1]}-01`
    const iso = /^(\d{4}-\d{2}-\d{2})/.exec(s)
    if (iso) {
      const parts = iso[1].split("-")
      let day = +parts[2]
      if (day === 0) day = 1
      return `${parts[0]}-${parts[1]}-${String(day).padStart(2, "0")}`
    }
    const dmy = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/)
    if (dmy) return isoFromNumeric(dmy[1], dmy[2], dmy[3])
  }

  const head = textFallback.slice(0, 15000)
  const numeric = head.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (numeric) return isoFromNumeric(numeric[1], numeric[2], numeric[3])
  const year = head.match(/\b(20\d{2})\b/)
  if (year) return `${year[1]}-01-01`
  return "2010-01-01"
}

function courtCodeFromHeader(sodisce) {
  if (!sodisce) return "VSL"
  const key = sodisce.trim().toLowerCase()
  for (const [name, code] of Object.entries(COURT_MAP)) {
    if (key.includes(name)) return code
  }
  if (/\bVSL\b/i.test(sodisce)) return "VSL"
  if (/\bVSM\b/i.test(sodisce)) return "VSM"
  if (/\bVSK\b/i.test(sodisce)) return "VSK"
  if (/\bVSC\b/i.test(sodisce)) return "VSC"
  return prepareSloveniaText(sodisce).slice(0, 40) || "VSL"
}

function parseMetadata(raw) {
  const headerEnd = raw.indexOf("\n---")
  const header = headerEnd === -1 ? raw.slice(0, 2500) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd).replace(/^\n---\n*/m, "")

  const line = (label) => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "im")
    const m = header.match(re)
    return m ? m[1].trim() : ""
  }

  return {
    sodisce: line("Sodišče"),
    case_number: line("Opravilna številka") || line("Opravilna stevilka"),
    decision_date_raw: line("Datum odločbe") || line("Datum odlocbe"),
    source_url: line("URL"),
    institut: line("Institut"),
    body,
  }
}

function extractSection(body, label) {
  const re = new RegExp(`^${label}:\\s*\\n?([\\s\\S]*?)(?=\\n[A-Za-zČŠŽĆĐčšžćđ][^:\\n]{0,40}:\\s*\\n|$)`, "im")
  const m = body.match(re)
  if (!m) return ""
  let text = m[1].trim()
  const stop = text.search(/\n(?:Obrazložitev|Izrek|Jedro|Zveza|Pridruženi)\s*:/i)
  if (stop > 0) text = text.slice(0, stop)
  return prepareSloveniaText(text)
}

function extractIzreka(body, full) {
  let iz = extractSection(body, "Izrek")
  if (iz.length >= 20) return iz

  const jedro = extractSection(body, "Jedro")
  if (jedro.length >= 20) return jedro

  const obIdx = full.search(/\bObrazloženje\b/i)
  const chunk = obIdx === -1 ? full.slice(0, 8000) : full.slice(0, obIdx)
  const alt = chunk.match(
    /(?:Pritožba\s+se|Tožba\s+se|Predlog\s+se|Zahtevek\s+se|Revizija\s+se)[\s\S]{0,800}/i,
  )
  if (alt) return prepareSloveniaText(alt[0])
  return prepareSloveniaText(chunk.slice(0, 1200))
}

function outcomeFromIzreka(iz) {
  const s = iz.slice(0, 2500)
  if (/razveljavi|prekine\s+postopek|vrne\s+zadevo|vrne\s+na\s+novo/i.test(s)) return "remanded"
  if (/delno\s+usvaja|deloma\s+ugodi|delno\s+preinači/i.test(s)) return "partially"
  if (/usvaja|ugodi\s+pritožbi|dovoli\s+pritožbo|preinači/i.test(s)) return "plaintiff_won"
  if (/zavrne|potrdi|odbije|zavrže|ne\s+usvaja/i.test(s)) return "defendant_won"
  if (/obustavi|prekine|dopusti\s+pravno\s+sredstvo/i.test(s)) return "procedural"
  return "partially"
}

function detectLawTag(text) {
  for (const [tag, re] of LAW_HINTS) {
    if (re.test(text)) return tag
  }
  const dalje = text.match(/(?:Zakon|Zakonik)[^,]{0,80}?\(([^)]+)\)/i)
  if (dalje) return dalje[1].replace(/\s+/g, "").slice(0, 12)
  return "ZPP"
}

function extractArticles(text, legal_area) {
  const tag = detectLawTag(text.slice(0, 40000))
  const set = new Set()
  let m
  const slice = text.slice(0, 40000)
  const re =
    /(\d+)\.\s*člen(?:a)?|člen(?:a|ov)?\s*(\d+)(?:\s*\/\s*(\d+))?(?:\s*člena\s*ZFPPIPP)?/gi
  while ((m = re.exec(slice))) {
    const n = m[1] || m[2]
    const st = m[3]
    if (n) {
      if (st) set.add(`čl. ${n}. st. ${st}. ${tag}`)
      else set.add(`čl. ${n}. ${tag}`)
    }
  }
  const fallback =
    legal_area === "criminal"
      ? "ZKP"
      : legal_area === "labor"
        ? "ZDR-1"
        : legal_area === "administrative"
          ? "ZUS-1"
          : legal_area === "commercial"
            ? "ZGD-1"
            : "ZPP"
  return [...set].slice(0, 10).length ? [...set].slice(0, 10) : [`čl. 1. ${fallback}`]
}

function statuteLabel(legal_area) {
  switch (legal_area) {
    case "criminal":
      return "Kazenski zakonik in Zakon o kazenskem postupku"
    case "administrative":
      return "Zakon o upravnem sporu"
    case "labor":
      return "Zakon o delovnih razmerjih"
    case "commercial":
      return "Zakon o gospodarskih družbah in insolventnostnem pravu"
    case "enforcement":
      return "Zakon o izvršbi in zavarovanju"
    case "procedural":
      return "Zakon o pravdnem postopku"
    default:
      return "Obligacijski zakonik in Zakon o pravdnem postopku"
  }
}

function summarize(full, izreka, caseNum, legal_area, institut) {
  const cp = prepareSloveniaText(izreka)
  const obraz = extractReasoning(full)
  const reasoning =
    obraz.length >= 80
      ? obraz
      : `Višje sodišče v predmetu ${caseNum} obrazloži odločitev z uporabo ${statuteLabel(legal_area)}.`
  const headnote =
    (institut && prepareSloveniaText(institut).slice(0, 220)) ||
    cp.slice(0, 180) ||
    prepareSloveniaText(full).slice(0, 180)

  return {
    legal_question: extractLegalQuestion({
      body: full,
      izreka,
      prepareText: prepareSloveniaText,
    }),
    court_position: cp || prepareSloveniaText(full).slice(0, 500),
    reasoning,
    headnote,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  const trimmed = raw.trim()
  if (trimmed.length < 100) return null

  const meta = parseMetadata(raw)
  const case_number = meta.case_number || fn.replace(/\.txt$/i, "")
  if (!case_number) return null

  const legal_area = legalAreaFromCaseNumber(case_number)
  const court = courtCodeFromHeader(meta.sodisce)
  const decision_date = normalizeDecisionDate(meta.decision_date_raw, raw)
  const body = meta.body || raw
  const izreka = extractIzreka(body, raw)
  const outcome = outcomeFromIzreka(izreka)
  const sum = summarize(raw, izreka, case_number, legal_area, meta.institut)
  const related = extractArticles(raw, legal_area)
  const prefix = (case_number.match(/\b([A-Za-z]{2,4})\b/g) || []).pop() || "Cp"
  const keywords = [legal_area, court, prefix, "slovenia", "visja"].filter(Boolean)

  return {
    jurisdiction: JURISDICTION,
    court,
    court_level: COURT_LEVEL,
    case_number,
    decision_date,
    legal_area,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related,
    headnote: sum.headnote,
    outcome,
    source_url: meta.source_url || undefined,
  }
}

export function caseToTsBlock(c) {
  const lines = [
    `  {`,
    `    jurisdiction: "slovenia",`,
    `    court: ${tsEscape(c.court)},`,
    `    court_level: "appellate",`,
    `    case_number: ${tsEscape(c.case_number)},`,
    `    decision_date: ${tsEscape(c.decision_date)},`,
    `    legal_area: ${tsEscape(c.legal_area)},`,
    `    legal_question:`,
    `      ${tsEscape(c.legal_question)},`,
    `    court_position:`,
    `      ${tsEscape(c.court_position)},`,
    `    reasoning:`,
    `      ${tsEscape(c.reasoning)},`,
    `    keywords: ${JSON.stringify(c.keywords)},`,
    `    related_articles: ${JSON.stringify(c.related_articles)},`,
    `    headnote: ${tsEscape(c.headnote)},`,
    `    outcome: ${tsEscape(c.outcome)},`,
  ]
  if (c.source_url) lines.push(`    source_url: ${tsEscape(c.source_url)},`)
  lines.push(`  }`)
  return lines.join("\n")
}

export function fileNamesForArea(area, chunkIndex) {
  const n = chunkIndex + 1
  const areaSlug = area.replace(/_/g, "-")
  return {
    tsFile: `case-law-${areaSlug}-slovenia-visja-${n}.ts`,
    exportName: `CASE_LAW_${area.toUpperCase()}_SLOVENIA_VISJA_${n}`,
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
