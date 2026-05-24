import fs from "fs"
import path from "path"

const COURT = "Visoki upravni sud Republike Hrvatske"
const LEGAL_AREA = "administrative"
const JURISDICTION = "croatia"

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
  studenog: 11,
  prosinca: 12,
}

function parseHeader(raw) {
  const headerEnd = raw.indexOf("\n---")
  const header = headerEnd === -1 ? raw.slice(0, 800) : raw.slice(0, headerEnd)
  const body = headerEnd === -1 ? raw : raw.slice(headerEnd).replace(/^\n---\n?/, "")

  const get = (label) => {
    const m = header.match(new RegExp(`^${label}:\\s*(.+)$`, "im"))
    return m ? m[1].trim() : ""
  }

  return {
    body,
    case_number: get("Broj odluke") || get("Naslov"),
    decision_date_raw: get("Datum odluke"),
    source_url: get("URL"),
    title: get("Naslov"),
  }
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

  const numSp = s.match(/^(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (numSp) return isoFromNumeric(numSp[1], numSp[2], numSp[3])

  const word = s.match(/^(\d{1,2})\.\s*([a-zčćđšž]+)\s+(\d{4})/i)
  if (word) {
    const month = HR_MONTHS[word[2].toLowerCase()]
    if (month) return isoFromNumeric(word[1], month, word[3])
  }

  if (/^\d{4}$/.test(s)) return `${s}-01-01`
  return null
}

function firstDecisionDate(headerRaw, body, yearFallback) {
  const fromHeader = parseDateRaw(headerRaw, yearFallback)
  if (fromHeader) return fromHeader

  const chunk = body.slice(0, 15000)

  const sess = chunk.match(
    /sjednic[iu]\s+vij[eć]ca\s+odr[zž]anoj\s+(\d{1,2})\.\s*([a-zčćđšž]+)\s+(\d{4})/i,
  )
  if (sess) {
    const month = HR_MONTHS[sess[2].toLowerCase()]
    if (month) return isoFromNumeric(sess[1], month, sess[3])
  }

  const zagreb = chunk.match(/U\s+Zagrebu,?\s+(\d{1,2})\.\s*([a-zčćđšž]+)\s+(\d{4})/i)
  if (zagreb) {
    const month = HR_MONTHS[zagreb[2].toLowerCase()]
    if (month) return isoFromNumeric(zagreb[1], month, zagreb[3])
  }

  const generic = chunk.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (generic) return isoFromNumeric(generic[1], generic[2], generic[3])

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function yearFromCaseNumber(caseNumber) {
  const m = caseNumber.match(/\/(\d{4})(?:-\d+)?(?:\/|$)/)
  return m ? m[1] : null
}

function sourceUrlFromFilename(fn, headerUrl) {
  if (headerUrl) return headerUrl
  const base = fn.replace(/\.txt$/i, "")
  const hash = base.split("-").pop()
  if (hash && /^[a-f0-9]{8}$/i.test(hash)) {
    return `https://odluke.sudovi.hr/Document/View?id=${hash}`
  }
  return undefined
}

function extractIzreka(body) {
  const obIdx = body.search(/\bObrazloženje\b/i)
  const chunk = obIdx === -1 ? body.slice(0, 9000) : body.slice(0, obIdx)

  const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*A/i)
  const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E/i)
  const start = pres === -1 ? (rjes === -1 ? 0 : rjes) : pres

  if (start === 0 && pres === -1 && rjes === -1) {
    const iz = chunk.match(/(?:I\.\s|II\.\s|Žalba|Tužba|Odbija)[\s\S]{0,1200}/i)
    if (iz) return iz[0]
    return chunk.slice(0, 1600)
  }

  const afterHeading = chunk.slice(start)
  const verdict = afterHeading.search(/\b(?:p\s*r\s*e\s*s\s*u\s*d\s*i\s*o| r\s*i\s*j\s*e\s*š\s*i\s*o)\s+j\s*e\b/i)
  const sliceStart = verdict === -1 ? 0 : verdict
  return afterHeading.slice(sliceStart, sliceStart + 2200)
}

function outcomeFromText(iz) {
  const s = iz.slice(0, 2000)
  if (/Tužbeni\s+zahtjev\s+se\s+usvaja|Tužba\s+se\s+usvaja|Usvaja\s+se\s+tužb|Uvažava\s+se\s+tužb/i.test(s)) {
    return /ukida|vraća|ponovno|preinačava/i.test(s) ? "remanded" : "plaintiff_won"
  }
  if (/Usvaja\s+se\s+žalb|Uvažava\s+se\s+žalb|Usvaja\s+se/i.test(s)) {
    return /ukida|vraća|ponovno|preinačava/i.test(s) ? "remanded" : "partially"
  }
  if (/Tužbeni\s+zahtjev\s+nije\s+osnovan|Tužba\s+se\s+odbija|Odbija\s+se|Žalba\s+se\s+odbija|odbijaju\s+se/i.test(s))
    return "defendant_won"
  if (/Potvrđuje\s+se|POTVRĐUJE/i.test(s)) return "defendant_won"
  if (/Preinačava|ukida\s+se|poništava\s+se/i.test(s)) return "remanded"
  if (/Tužba\s+se\s+odbacuje|odbacuje\s+se|odbačena\s+je/i.test(s)) return "procedural"
  return "partially"
}

function extractArticles(text) {
  const set = new Set()
  let m
  const re = /čl(?:an(?:ak)?|\.)\s*(\d+)(?:\s*st(?:av(?:ak)?)?\.?\s*(\d+))?/gi
  while ((m = re.exec(text.slice(0, 30000)))) {
    const ctx = text.slice(Math.max(0, m.index - 80), m.index + 120)
    let tag = "ZUP RH"
    if (/ZUS|upravn(?:im|i)\s+sporov/i.test(ctx)) tag = "ZUS RH"
    else if (/ZoPPI|pristup\s+informacij/i.test(ctx)) tag = "ZoPPI RH"
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. ${tag}`)
    else set.add(`čl. ${m[1]}. ${tag}`)
  }
  return [...set].slice(0, 10)
}

function summarize(body, izrekaRaw, caseNum) {
  let cp = izrekaRaw
    .replace(/^\s*(P\s*R\s*E\s*S\s*U\s*D\s*A|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E)\s*/i, "")
    .replace(/\b(?:p\s*r\s*e\s*s\s*u\s*d\s*i\s*o|r\s*i\s*j\s*e\s*š\s*i\s*o)\s+j\s*e\b/i, "")
    .slice(0, 520)
    .replace(/\s+/g, " ")
    .trim()
  if (cp.length > 420) cp = cp.slice(0, 417).trim() + "…"
  const head = cp.slice(0, 160) || body.slice(0, 200).replace(/\s+/g, " ").trim()
  return {
    legal_question: `Koje pravno pitanje je razmatrao Visoki upravni sud Republike Hrvatske u predmetu ${caseNum}?`,
    court_position: cp || body.slice(0, 400).replace(/\s+/g, " ").trim(),
    reasoning: `Visoki upravni sud Republike Hrvatske odlučuje u predmetu ${caseNum}, primjenjujući Zakon o upravnim sporovima i Zakon o općem upravnom postupku.`,
    headnote: head,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const { body, case_number, decision_date_raw, source_url, title } = parseHeader(raw)
  const caseNum = case_number || title
  if (!caseNum) return null

  const yearFallback = yearFromCaseNumber(caseNum)
  const decision_date = firstDecisionDate(decision_date_raw, body, yearFallback)
  const izreka = extractIzreka(body)
  const outcome = outcomeFromText(izreka)
  const sum = summarize(body, izreka, caseNum)
  const related = extractArticles(body)
  const url = sourceUrlFromFilename(fn, source_url)
  const keywords = [LEGAL_AREA, "Visoki upravni sud", caseNum.split(/[\s/]/)[0]].filter(Boolean)

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
    related_articles: related.length ? related : ["čl. 46. ZUS RH"],
    headnote: sum.headnote,
    outcome,
  }
  if (url) entry.source_url = url
  return entry
}

export function caseToTsBlock(c) {
  const lines = [
    `  {
    jurisdiction: "croatia",
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
