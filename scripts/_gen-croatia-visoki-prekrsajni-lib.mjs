import fs from "fs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

export const COURT = "Visoki prekršajni sud Republike Hrvatske"

const HR_MONTHS = {
  siječnja: 1,
  sijecnja: 1,
  veljače: 2,
  veljace: 2,
  ožujka: 3,
  ozujka: 3,
  travnja: 4,
  svibnja: 5,
  lipnja: 6,
  srpnja: 7,
  kolovoza: 8,
  rujna: 9,
  listopada: 10,
  studenoga: 11,
  prosinca: 12,
}

function tsEscape(s) {
  return JSON.stringify(s)
}

function isoFromNumeric(dayS, monthS, yearS) {
  let day = +dayS
  const month = +monthS
  const year = +yearS
  if (!year || !month || Number.isNaN(month)) return null
  if (day === 0) day = 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function parseHrTextDate(text) {
  const m = text.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (m) return isoFromNumeric(m[1], m[2], m[3])

  const word = text.match(
    /(\d{1,2})\s*\.\s*(siječnja|sijecnja|veljače|veljace|ožujka|ozujka|travnja|svibnja|lipnja|srpnja|kolovoza|rujna|listopada|studenoga|prosinca)\s+(\d{4})/i,
  )
  if (word) {
    const monthKey = word[2]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    for (const [name, num] of Object.entries(HR_MONTHS)) {
      const norm = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      if (monthKey.includes(norm)) return isoFromNumeric(word[1], num, word[3])
    }
  }

  const yearOnly = text.match(/\b(19|20)\d{2}\b/)
  if (yearOnly) return `${yearOnly[0]}-01-01`
  return null
}

export function parseHeader(raw) {
  const headerEnd = raw.indexOf("\n---\n")
  const header = headerEnd === -1 ? raw.slice(0, 800) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd + 5)

  const get = (label) => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "im")
    const m = header.match(re)
    return m ? m[1].trim() : ""
  }

  return {
    title: get("Naslov"),
    court: get("Sud"),
    dateRaw: get("Datum odluke"),
    case_number: get("Broj odluke"),
    source_url: get("URL"),
    body: body.trim(),
  }
}

function sourceUrlFromFilename(fn, headerUrl) {
  if (headerUrl) return headerUrl
  const base = fn.replace(/\.txt$/i, "")
  const hash = base.split("-").pop()
  if (hash && /^[a-f0-9]{8}$/i.test(hash)) {
    return `https://odluke.sudovi.hr/Document/View?id=${hash}`
  }
  return ""
}

function yearFromCaseNumber(caseNum) {
  const m = caseNum.match(/\/(\d{4})(?:-\d+)?\s*$/)
  return m ? m[1] : null
}

export function normalizeDecisionDate(dateRaw, body, case_number) {
  const fromHeader = parseHrTextDate(dateRaw || "")
  if (fromHeader) return fromHeader

  const sess = body.match(
    /sjednic[iu]\s+vij[eć]ca\s+odr[zž]anoj\s+dana\s+(\d{1,2})\s*\.\s*([^\d]+?)\s+(\d{4})/i,
  )
  if (sess) {
    const monthKey = sess[2].trim().toLowerCase().replace(/\s+/g, " ")
    for (const [name, num] of Object.entries(HR_MONTHS)) {
      if (monthKey.includes(name)) return isoFromNumeric(sess[1], num, sess[3])
    }
    const num = parseHrTextDate(`${sess[1]}. ${sess[2]} ${sess[3]}`)
    if (num) return num
  }

  const zagreb = body.match(/U\s+Zagrebu,?\s+(\d{1,2})\s*\.\s*([^\n]+?)\s+(\d{4})/i)
  if (zagreb) {
    const d = parseHrTextDate(`${zagreb[1]}. ${zagreb[2]} ${zagreb[3]}`)
    if (d) return d
  }

  const y = yearFromCaseNumber(case_number)
  if (y) return `${y}-01-01`
  return "2010-01-01"
}

function extractIzreka(body) {
  const obrazIdx = body.search(/\bObrazloženje\b/i)
  const chunk = obrazIdx === -1 ? body.slice(0, 12000) : body.slice(0, obrazIdx)

  const markers = [
    /p\s+r\s+e\s+s\s+u\s+d\s+i\s+o\s+j\s+e\s*:/i,
    /p\s+r\s+e\s+s\s+u\s+d\s+a/i,
    /r\s+i\s+j\s+e\s+š\s+i\s+o\s+j\s+e/i,
    /r\s+i\s+j\s+e\s+š\s+i\s+o/i,
    /r\s+j\s+e\s+š\s+e\s+n\s+j\s+e/i,
  ]

  let start = -1
  for (const re of markers) {
    const m = chunk.search(re)
    if (m !== -1 && (start === -1 || m < start)) start = m
  }

  if (start === -1) {
    const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*A/i)
    const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E/i)
    start = pres === -1 ? (rjes === -1 ? 0 : rjes) : pres
  }

  return chunk.slice(start).replace(/\s+/g, " ").trim()
}

function outcomeFromIzreka(iz) {
  const s = iz.slice(0, 1800)
  if (/ukida|uklanja|vraća\s+na|ponovno\s+suđenje|preinačuje/i.test(s)) return "remanded"
  if (/preinačava|preinačuje/i.test(s)) return "partially"
  if (/prihvaća\s+se\s+žalb|usvaja\s+se\s+žalb|uvažava\s+se/i.test(s)) return "plaintiff_won"
  if (/odbija\s+se\s+kao\s+neosnovan|žalba\s+.*\s+odbija|odbijaju\s+se/i.test(s)) return "defendant_won"
  if (/potvrđuje|potvrđuje\s+se/i.test(s)) return "defendant_won"
  if (/odbacuje|produžava|određuje/i.test(s)) return "procedural"
  return "partially"
}

function extractArticles(text) {
  const set = new Set()
  let m
  const re = /čl(?:an(?:ak)?|\.)\s*(\d+)(?:\s*st(?:av(?:ak)?)?\.?\s*(\d+))?/gi
  const slice = text.slice(0, 35000)
  while ((m = re.exec(slice))) {
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. Prekršajni zakon`)
    else set.add(`čl. ${m[1]}. Prekršajni zakon`)
  }
  return [...set].slice(0, 10)
}

function summarize(body, izreka, case_number) {
  let cp = izreka
    .replace(/^(?:P\s*R\s*E\s*S\s*U\s*D\s*A|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|p\s+r\s+e\s+s\s+u\s+d\s+i\s+o\s+j\s+e|r\s+i\s+j\s+e\s+š\s+i\s+o\s+j\s+e)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
  const head = cp.slice(0, 160) || body.slice(0, 200).replace(/\s+/g, " ").trim()
  return {
    legal_question: extractLegalQuestion({ body, izreka }),
    court_position: cp || body.replace(/\s+/g, " ").trim(),
    reasoning: `Visoki prekršajni sud Republike Hrvatske odlučuje u predmetu ${case_number} o žalbi u prekršajnom postupku, primjenjujući Prekršajni zakon i povezane procesne propise.`,
    headnote: head,
  }
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const { case_number, dateRaw, source_url: headerUrl, body } = parseHeader(raw)
  if (!case_number) return null

  const decision_date = normalizeDecisionDate(dateRaw, body, case_number)
  const izreka = extractIzreka(body)
  const outcome = outcomeFromIzreka(izreka)
  const sum = summarize(body, izreka, case_number)
  const related = extractArticles(body)
  const keywords = ["procedural", "prekršajni postupak", COURT, case_number.split("/")[0] || "Ppž"].filter(
    Boolean,
  )

  return {
    jurisdiction: "croatia",
    court: COURT,
    court_level: "high",
    case_number,
    decision_date,
    legal_area: "procedural",
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : ["čl. 202. Prekršajni zakon"],
    headnote: sum.headnote,
    outcome,
    source_url: sourceUrlFromFilename(fn, headerUrl),
  }
}

export function caseToTsBlock(c) {
  const lines = [
    `  {`,
    `    jurisdiction: "croatia",`,
    `    court: ${tsEscape(c.court)},`,
    `    court_level: "high",`,
    `    case_number: ${tsEscape(c.case_number)},`,
    `    decision_date: ${tsEscape(c.decision_date)},`,
    `    legal_area: "procedural",`,
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

export function writeCaseLawFile(outPath, exportName, cases, comment) {
  const header = `// scripts/${path.basename(outPath)}
// ${comment}

import type { CaseLawInput } from "./ingest-case-law"

export const ${exportName}: CaseLawInput[] = [
`
  const body = cases.length ? cases.map(caseToTsBlock).join(",\n") + "\n" : ""
  fs.writeFileSync(outPath, header + body + "]\n", "utf8")
}
