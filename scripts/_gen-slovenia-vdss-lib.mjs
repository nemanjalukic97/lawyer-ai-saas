import fs from "fs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

/** Light cleanup — avoid fixSyllableBreaks which merges normal Slovenian words. */
function siText(raw) {
  if (!raw) return ""
  return String(raw)
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const COURT = "Višje delovno in socialno sodišče"
const LEGAL_AREA = "labor"
const JURISDICTION = "slovenia"

function isoFromNumeric(dayS, monthS, yearS) {
  let day = +dayS
  const month = +monthS
  const year = +yearS
  if (!year || !month || Number.isNaN(month)) return null
  if (day === 0) day = 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function normalizeDecisionDate(raw) {
  if (raw == null || String(raw).trim() === "") return null
  const s = String(raw).trim().replace(/\.$/, "")
  if (/^\d{4}$/.test(s)) return `${s}-01-01`
  const isoDayZero = /^(\d{4}-\d{2})-00$/.exec(s)
  if (isoDayZero) return `${isoDayZero[1]}-01`
  const isoDay = /^(\d{4}-\d{2}-\d{2})/.exec(s)
  if (isoDay) return isoDay[1]

  const dmy = /^(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(s)
  if (dmy) return isoFromNumeric(dmy[1], dmy[2], dmy[3])

  const yearOnly = s.match(/(\d{4})/)
  if (yearOnly) return `${yearOnly[1]}-01-01`
  return null
}

function parseMetadataHeader(raw) {
  const headerEnd = raw.indexOf("\n---")
  const header = headerEnd === -1 ? raw.slice(0, 2500) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd).replace(/^\n---\n*/m, "")

  const get = (label) => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "im")
    const m = header.match(re)
    return m ? m[1].trim() : ""
  }

  return {
    court: get("Sodišče"),
    case_number: get("Opravilna številka"),
    decision_date_raw: get("Datum odločbe"),
    institut: get("Institut"),
    source_url: get("URL"),
    body,
  }
}

function caseNumberFromFilename(fn) {
  const base = fn.replace(/\.txt$/i, "")
  const parts = base.split("-")
  if (parts.length < 3) return ""

  const year = parts[parts.length - 1]
  const num = parts[parts.length - 2]
  if (!/^\d{4}$/.test(year) || !/^\d+$/.test(num)) return ""

  const prefix = parts.slice(0, -2).join(" ")
  return `${prefix} ${num}/${year}`.replace(/\s+/g, " ").trim()
}

function firstDecisionDate(raw, metaDate, yearFallback) {
  const fromMeta = normalizeDecisionDate(metaDate)
  if (fromMeta) return fromMeta

  const text = raw.slice(0, 15000)
  const numeric = text.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (numeric) return isoFromNumeric(numeric[1], numeric[2], numeric[3])

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function extractSection(body, label) {
  const re = new RegExp(
    `^${label}:\\s*\\n([\\s\\S]*?)(?=\\n\\n(?:Jedro|Izrek|Obrazložitev|PRAVNI POUK|Zveza:)|$)`,
    "im",
  )
  const m = body.match(re)
  return m ? m[1].trim() : ""
}

function extractObrazlozitev(body) {
  const section = extractSection(body, "Obrazložitev")
  if (section.length >= 80) return siText(section)

  const m = body.match(/\bObrazložitev:\s*\n([\s\S]*?)(?=\n\n(?:PRAVNI POUK|Zveza:)|$)/i)
  return m ? siText(m[1]) : ""
}

function extractIzreka(body) {
  const iz = extractSection(body, "Izrek")
  if (iz.length >= 20) return siText(iz)

  const jedro = extractSection(body, "Jedro")
  if (jedro.length >= 20) return siText(jedro)

  const obIdx = body.search(/\bObrazložitev\b/i)
  const chunk = obIdx === -1 ? body.slice(0, 8000) : body.slice(0, obIdx)
  const alt = chunk.match(
    /(?:Pritožb[a]?|Pritožbi|Pritožbama|Pritožbo)[\s\S]{0,1500}/i,
  )
  if (alt) return siText(alt[0])
  return siText(chunk)
}

function outcomeFromText(iz) {
  const s = iz.slice(0, 2500)
  if (/delno\s+ugodi|delno\s+ugod/i.test(s)) return "partially"
  if (/vrne\s+(?:zadevo\s+)?sodišču\s+prve\s+stopnje|vrne\s+zadevo|v\s+novo\s+sojenje/i.test(s)) {
    if (/potrdi|zavrne/i.test(s)) return "partially"
    return "remanded"
  }
  if (/razveljavi/i.test(s)) {
    if (/potrdi|zavrne/i.test(s)) return "partially"
    return "remanded"
  }
  if (/Pritožb[a]?ma?\s+se\s+ugodi|Pritožbi\s+se\s+ugodi|ugodi\s+pritožbi/i.test(s)) {
    return /zavrne|potrdi/i.test(s) ? "partially" : "plaintiff_won"
  }
  if (/Pritožba\s+se\s+zavrne|pritožbi\s+zavrne|pritožb[a]?ma?\s+se\s+zavrne/i.test(s)) {
    return "defendant_won"
  }
  if (/potrdi\s+(?:izpodbijan(?:o|i|u)|sodbo)/i.test(s)) return "defendant_won"
  if (/spremeni\s+(?:izpodbijan(?:o|i|u)|sodbo)/i.test(s)) return "plaintiff_won"
  if (/odbacuje\s+se|odbaci/i.test(s)) return "procedural"
  return "partially"
}

function detectLawTag(text) {
  const hints = [
    ["ZDR-1", /Zakona o delovnih razmerjih|ZDR-1/i],
    ["ZPP", /Zakona o pravdnem postopku|ZPP/i],
    ["ZDR", /Zakona o delovnih razmerjih|ZDR[^-]/i],
    ["ZJU", /Zakona o javnih uslužbencih|ZJU/i],
    ["ZPIZ-2", /Zakona o pokojninskem|ZPIZ/i],
    ["ZSPJS", /Zakona o sistemu plač|ZSPJS/i],
    ["KZ-1", /Kazenski zakonik|KZ-1/i],
    ["OZ", /Obligacijski zakonik|OZ/i],
  ]
  for (const [tag, re] of hints) {
    if (re.test(text)) return tag
  }
  const zveza = text.match(/-\s*([A-Z][A-Z0-9-]{1,8})\s*-\s*člen/i)
  if (zveza) return zveza[1]
  return "ZDR-1"
}

function extractArticlesFromZveza(text) {
  const zvezaIdx = text.search(/^Zveza:\s*$/im)
  if (zvezaIdx === -1) return []
  const zveza = text.slice(zvezaIdx, zvezaIdx + 4000)
  const set = new Set()
  const lineRe = /-\s*([A-Z][A-Z0-9-]{1,10})\s*-\s*člen\s+([\d,\s/]+)/gi
  let m
  while ((m = lineRe.exec(zveza))) {
    const tag = m[1].trim()
    for (const part of m[2].split(/,\s*/)) {
      const art = part.trim()
      if (!art) continue
      if (art.includes("/")) {
        const [a, sub] = art.split("/")
        set.add(`člen ${a}/${sub} ${tag}`)
      } else {
        set.add(`člen ${art} ${tag}`)
      }
    }
  }
  return [...set].slice(0, 10)
}

function extractArticles(text) {
  const fromZveza = extractArticlesFromZveza(text)
  if (fromZveza.length) return fromZveza

  const tag = detectLawTag(text.slice(0, 35000))
  const set = new Set()
  let m
  const re = /(\d+)\.\s*člen[a]?\s+([A-Z][A-Z0-9-]{1,10})/gi
  while ((m = re.exec(text.slice(0, 35000)))) {
    set.add(`člen ${m[1]} ${m[2]}`)
  }
  const re2 = /(\d+)\.\s*člen[a]?/gi
  while ((m = re2.exec(text.slice(0, 35000)))) {
    set.add(`člen ${m[1]} ${tag}`)
  }
  return [...set].slice(0, 10)
}

function summarize(full, izrekaRaw, caseNum, body) {
  const cp = siText(izrekaRaw) || siText(extractSection(body, "Jedro"))
  const obraz = extractObrazlozitev(body)
  const reasoning =
    obraz.length >= 80
      ? obraz
      : `Višje delovno in socialno sodišče odloča v predmetu ${caseNum}, uporabljajoč slovensko delovno in procesno pravo ter povezane predpise.`
  const head = cp.slice(0, 180) || siText(full).slice(0, 200)
  return {
    legal_question: extractLegalQuestion({ body: full, izreka: izrekaRaw, prepareText: siText }),
    court_position: cp || siText(full),
    reasoning,
    headnote: head,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const meta = parseMetadataHeader(raw)
  const case_number = meta.case_number || caseNumberFromFilename(fn)
  if (!case_number) return null

  const yearFromCase = (case_number.match(/\/(\d{4})/) || [])[1]
  const decision_date = firstDecisionDate(raw, meta.decision_date_raw, yearFromCase)
  const body = meta.body || raw
  const izreka = extractIzreka(body)
  const outcome = outcomeFromText(izreka)
  const sum = summarize(raw, izreka, case_number, body)
  const related = extractArticles(body)
  const prefix = (case_number.match(/^(\S+)/) || [])[1] || "Pdp"
  const keywords = [LEGAL_AREA, COURT, prefix]
  if (meta.institut) keywords.push(meta.institut.slice(0, 60))

  return {
    jurisdiction: JURISDICTION,
    court: COURT,
    court_level: "appellate",
    case_number,
    decision_date,
    legal_area: LEGAL_AREA,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : ["člen 1 ZDR-1"],
    headnote: sum.headnote,
    outcome,
    source_url: meta.source_url || "",
  }
}

export function caseToTsBlock(c) {
  return `  {
    jurisdiction: "slovenia",
    court: ${tsEscape(c.court)},
    court_level: "appellate",
    case_number: ${tsEscape(c.case_number)},
    decision_date: ${tsEscape(c.decision_date)},
    legal_area: "labor",
    legal_question:
      ${tsEscape(c.legal_question)},
    court_position:
      ${tsEscape(c.court_position)},
    reasoning:
      ${tsEscape(c.reasoning)},
    keywords: ${JSON.stringify(c.keywords)},
    related_articles: ${JSON.stringify(c.related_articles)},
    headnote: ${tsEscape(c.headnote)},
    outcome: ${tsEscape(c.outcome)},
    source_url: ${tsEscape(c.source_url)},
  }`
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
