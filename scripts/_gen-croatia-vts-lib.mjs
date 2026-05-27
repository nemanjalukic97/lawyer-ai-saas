import fs from "fs"
import { prepareText, extractObrazlozenje } from "./_gen-prepare-text.mjs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const COURT = "Visoki trgovački sud Republike Hrvatske"
const LEGAL_AREA = "commercial"
const JURISDICTION = "croatia"

const HR_MONTHS = {
  siječnja: 1,
  januar: 1,
  veljače: 2,
  februar: 2,
  ožujka: 3,
  mart: 3,
  travnja: 4,
  april: 4,
  svibnja: 5,
  maj: 5,
  lipnja: 6,
  jun: 6,
  srpnja: 7,
  jul: 7,
  kolovoza: 8,
  avgust: 8,
  rujna: 9,
  septembar: 9,
  listopada: 10,
  oktobar: 10,
  studenoga: 11,
  novembar: 11,
  prosinca: 12,
  decembar: 12,
}

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

  const named = s.match(/(\d{1,2})\.\s*([a-zčćžšđ]+)\s+(\d{4})/i)
  if (named) {
    const month = HR_MONTHS[named[2].toLowerCase()]
    if (month) return isoFromNumeric(named[1], month, named[3])
  }

  const yearOnly = s.match(/(\d{4})/)
  if (yearOnly) return `${yearOnly[1]}-01-01`
  return null
}

function parseMetadataHeader(raw) {
  const headerEnd = raw.indexOf("\n---")
  const header = headerEnd === -1 ? raw.slice(0, 2000) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd).replace(/^\n---\n*/m, "")

  const get = (label) => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "im")
    const m = header.match(re)
    return m ? m[1].trim() : ""
  }

  return {
    title: get("Naslov"),
    court: get("Sud"),
    decision_date_raw: get("Datum odluke"),
    case_number: get("Broj odluke"),
    source_url: get("URL"),
    body,
  }
}

function sourceUrlFromFilename(fn, headerUrl) {
  if (headerUrl && headerUrl.startsWith("http")) return headerUrl
  const base = fn.replace(/\.txt$/i, "")
  const hash = base.split("-").pop()
  if (hash && /^[a-f0-9]{8}$/i.test(hash)) {
    return `https://odluke.sudovi.hr/Document/View?id=${hash}`
  }
  return headerUrl || ""
}

function caseNumberFromFilename(fn) {
  const base = fn.replace(/\.txt$/i, "")
  const hash = base.split("-").pop()
  if (!/^[a-f0-9]{8}$/i.test(hash)) return ""
  const rest = base.slice(0, -(hash.length + 1))
  const m = rest.match(/^(.+)-(\d{4})-(\d+)$/)
  if (!m) return ""
  const prefix = m[1].replace(/-/g, "-")
  return `${prefix}/${m[2]}-${m[3]}`
}

function firstDecisionDate(raw, metaDate, yearFallback) {
  const fromMeta = normalizeDecisionDate(metaDate)
  if (fromMeta) return fromMeta

  const text = raw.slice(0, 15000)
  const zagreb = text.match(/Zagreb,?\s+(\d{1,2})\.\s*([a-zčćžšđ]+)\s+(\d{4})/i)
  if (zagreb) {
    const month = HR_MONTHS[zagreb[2].toLowerCase()]
    if (month) return isoFromNumeric(zagreb[1], month, zagreb[3])
  }

  const numeric = text.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (numeric) return isoFromNumeric(numeric[1], numeric[2], numeric[3])

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function extractIzreka(text) {
  const obIdx = text.search(/\bObrazloženje\b/i)
  const chunk = obIdx === -1 ? text.slice(0, 12000) : text.slice(0, obIdx)

  const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*A/i)
  const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E/i)
  const start = pres === -1 ? (rjes === -1 ? 0 : rjes) : pres

  const afterHeader = chunk.slice(start)
  const decided = afterHeader.search(
    /(?:p\s*r\s*e\s*s\s*u\s*d\s*i\s*o|r\s*i\s*j\s*e\s*š\s*i\s*o)\s*(?:\s*j\s*e)?/i,
  )
  const sliceStart = decided === -1 ? 0 : decided
  let iz = afterHeader.slice(sliceStart)

  if (iz.length < 40) {
    const alt = chunk.match(
      /(?:Odbija|Usvaja|Potvrđuje|Ukida|Preinačava|Utvrđuje|Odbacuje)[\s\S]*/i,
    )
    if (alt) iz = alt[0]
    else iz = prepareText(chunk)
  }

  return prepareText(iz)
}

function outcomeFromText(iz) {
  const s = iz.slice(0, 2000)
  if (/Ukida\s+se|ukida\s+se|vraća\s+se\s+predmet|preinačuje\s+se/i.test(s)) {
    if (/potvrđuje|Odbija\s+se/i.test(s)) return "partially"
    return "remanded"
  }
  if (/Usvaja\s+se|usvaja\s+se\s+žalb/i.test(s)) return "plaintiff_won"
  if (/Odbija\s+se|odbijaju\s+se|Odbacuje\s+se/i.test(s)) return "defendant_won"
  if (/Potvrđuje|potvrđuje\s+se/i.test(s)) return "defendant_won"
  if (/Preinačava|djelomično/i.test(s)) return "partially"
  if (/obustavlja\s+se|produžava\s+se/i.test(s)) return "procedural"
  return "partially"
}

function summarize(full, izrekaRaw, caseNum) {
  let cp = prepareText(izrekaRaw).replace(
    /^(?:p\s*resudio|r\s*iješio)\s*(?:je)?\s*/i,
    "",
  )
  const obraz = extractObrazlozenje(full)
  const reasoning =
    obraz.length >= 80
      ? obraz
      : `Visoki trgovački sud Republike Hrvatske odlučuje u predmetu ${caseNum}, primjenjujući hrvatsko trgovačko i procesno pravo te povezane propise.`
  const head = cp.slice(0, 160) || prepareText(full).slice(0, 200)
  return {
    legal_question: extractLegalQuestion({ body: full, izreka: izrekaRaw }),
    court_position: cp || prepareText(full),
    reasoning,
    headnote: head,
  }
}

const LAW_HINTS = [
  ["ZPP", /Zakona o parničnom postupku|dalje:\s*ZPP/i],
  ["ZTD", /Zakona o trgovačkim društvima|dalje:\s*ZTD/i],
  ["ZOO", /Zakona o obveznim odnosima|dalje:\s*ZOO/i],
  ["ZSP", /Zakona o sudskim pristojbama|dalje:\s*ZSP/i],
  ["ZMO", /Zakona o mirovinskom osiguranju|dalje:\s*ZMO/i],
  ["ZJN", /Zakona o javnoj nabavi|dalje:\s*ZJN/i],
  ["ZZO", /Zakona o zaštiti potrošača|dalje:\s*ZZO/i],
  ["ZIO", /Zakona o izvršenju|dalje:\s*ZIO/i],
  ["ZTP", /Zakona o trgovačkim plovilima|dalje:\s*ZTP/i],
]

function detectLawTag(text) {
  for (const [tag, re] of LAW_HINTS) {
    if (re.test(text)) return tag
  }
  const dalje = text.match(/dalje:\s*([A-ZČĆŽŠĐ]{2,6})\)/i)
  if (dalje) return dalje[1].toUpperCase()
  return "ZTD"
}

function extractArticles(text) {
  const tag = detectLawTag(text.slice(0, 35000))
  const set = new Set()
  let m
  const re = /čl\.?\s*(\d+)(?:\s*st\.?\s*(\d+))?/gi
  while ((m = re.exec(text.slice(0, 35000)))) {
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. ${tag}`)
    else set.add(`čl. ${m[1]}. ${tag}`)
  }
  return [...set].slice(0, 10)
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
  const izreka = extractIzreka(meta.body || raw)
  const outcome = outcomeFromText(izreka)
  const sum = summarize(raw, izreka, case_number)
  const related = extractArticles(meta.body || raw)
  const prefix = case_number.split(/[\s/]/)[0] || "Pž"
  const keywords = [LEGAL_AREA, "Visoki trgovački sud", prefix].filter(Boolean)
  const source_url = sourceUrlFromFilename(fn, meta.source_url)

  return {
    jurisdiction: JURISDICTION,
    court: COURT,
    court_level: "high",
    case_number,
    decision_date,
    legal_area: LEGAL_AREA,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : ["čl. 1. ZTD"],
    headnote: sum.headnote,
    outcome,
    source_url,
  }
}

export function caseToTsBlock(c) {
  return `  {
    jurisdiction: "croatia",
    court: ${tsEscape(c.court)},
    court_level: "high",
    case_number: ${tsEscape(c.case_number)},
    decision_date: ${tsEscape(c.decision_date)},
    legal_area: "commercial",
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
