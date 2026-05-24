import fs from "fs"
import path from "path"

const COURT = "Vrhovni sud Republike Hrvatske"

const HR_MONTHS = {
  siječnja: 1,
  veljače: 2,
  ožujka: 3,
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

export function legalAreaFromCaseNumber(caseNum) {
  const s = caseNum.replace(/\s+/g, "")
  if (/Revr|Revt|Revd|^Rev/i.test(s)) return "civil"
  if (/Kzz|Kž|Kž/i.test(s)) return "criminal"
  if (/(^|[^a-zA-Z])Kr(-|[\d/])/i.test(s)) return "criminal"
  if (/Gzz/i.test(s)) return "civil"
  if (/Pzz/i.test(s)) return "commercial"
  if (/Uzp/i.test(s)) return "administrative"
  if (/^Ž|[-/]Ž/i.test(s)) return "labor"
  return "civil"
}

function parseMetadata(raw, fn) {
  const headerEnd = raw.indexOf("\n---\n")
  const header = headerEnd >= 0 ? raw.slice(0, headerEnd) : raw.slice(0, 800)
  const line = (label) => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "mi")
    const m = header.match(re)
    return m ? m[1].trim() : null
  }

  let case_number = line("Broj odluke")
  let source_url = line("URL")
  const decision_date_raw = line("Datum odluke")

  if (!case_number) {
    const naslov = line("Naslov")
    if (naslov) case_number = naslov.replace(/\s+/g, " ")
  }

  if (!source_url && fn) {
    const base = fn.replace(/\.txt$/i, "")
    const shortId = base.split("-").pop()
    if (shortId && /^[0-9a-f]{8}$/i.test(shortId)) {
      source_url = `https://odluke.sudovi.hr/Document/View?id=${shortId}`
    }
  }

  return { case_number, source_url, decision_date_raw }
}

function isoFromNumeric(dayS, monthS, yearS) {
  let day = +dayS
  const month = +monthS
  const year = +yearS
  if (!year || !month || Number.isNaN(month)) return null
  if (day === 0) day = 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function normalizeDecisionDate(raw, textFallback) {
  if (raw != null && raw.trim() !== "") {
    const s = raw.trim().replace(/\.$/, "")
    if (/^\d{4}$/.test(s)) return `${s}-01-01`
    const dmy = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/)
    if (dmy) return isoFromNumeric(dmy[1], dmy[2], dmy[3])
    const iso = /^(\d{4}-\d{2}-\d{2})/.exec(s)
    if (iso) {
      const parts = iso[1].split("-")
      let day = +parts[2]
      if (day === 0) day = 1
      return `${parts[0]}-${parts[1]}-${String(day).padStart(2, "0")}`
    }
  }

  const head = textFallback.slice(0, 20000)
  const zagreb = head.match(
    /Zagreb,?\s+(\d{1,2})\.\s+([a-zčćžšđ]+)\s+(\d{4})/i,
  )
  if (zagreb) {
    const month = HR_MONTHS[zagreb[2].toLowerCase()]
    if (month) return isoFromNumeric(zagreb[1], month, zagreb[3])
  }

  const numeric = head.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (numeric) return isoFromNumeric(numeric[1], numeric[2], numeric[3])

  const year = head.match(/\b(20\d{2})\b/)
  if (year) return `${year[1]}-01-01`
  return "2010-01-01"
}

function extractIzreka(text) {
  const obraz = text.search(/\bObrazloženje\b/i)
  const chunk = obraz === -1 ? text.slice(0, 12000) : text.slice(0, obraz)
  const pres = /P\s+R\s+E\s+S\s+U\s+D\s+A/i
  const rjes = /R\s+J\s+E\s+Š\s+E\s+N\s+J\s+E/i
  const pi = chunk.search(pres)
  const ri = chunk.search(rjes)
  const start = pi === -1 ? (ri === -1 ? 0 : ri) : pi
  if (start === 0 && pi === -1 && ri === -1) {
    const iz = chunk.match(
      /(?:r\s+i\s+j\s+e\s+š\s+i\s+o|p\s+r\s+e\s+s\s+u\s+d\s+i\s+o|Odbija|Odbacuje|Prihvaća|Usvaja|Potvrđuje|Preinačuje|Ukida|dopušta)[\s\S]{0,1500}/i,
    )
    if (iz) return iz[0]
    return chunk.slice(0, 1800)
  }
  return chunk.slice(start, start + 2200)
}

function outcomeFromText(izLat) {
  const iz = izLat.slice(0, 2000)
  if (/dopušta\s+se\s+(podnošenje\s+)?revizij|dopuštena\s+revizij/i.test(iz))
    return "procedural"
  if (/Odbacuje\s+se|odbija\s+se\s+kao\s+nedopušten/i.test(iz)) return "procedural"
  if (/Usvaja\s+se|Uvažava\s+se|Prihvaća\s+se/i.test(iz))
    return /ukida|vraća|ponovno|preinačava/i.test(iz) ? "remanded" : "partially"
  if (/Odbija\s+se|odbijen/i.test(iz)) return "defendant_won"
  if (/Potvrđuje|POTVRĐUJE/i.test(iz)) return "plaintiff_won"
  if (/Preinačava/i.test(iz)) return "partially"
  if (/Ukida\s+se|vraća\s+se/i.test(iz)) return "remanded"
  return "partially"
}

function extractArticles(text, legal_area) {
  const tag =
    legal_area === "criminal"
      ? "KZ"
      : legal_area === "administrative"
        ? "ZUS"
        : legal_area === "labor"
          ? "ZR"
          : legal_area === "commercial"
            ? "TZ"
            : "ZOO"
  const set = new Set()
  let m
  const slice = text.slice(0, 35000)
  const re = /čl(?:anak|\.|anka)?\s*(\d+)(?:\s*st(?:avak|\.|avka)?\.?\s*(\d+))?/gi
  while ((m = re.exec(slice))) {
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. ${tag}`)
    else set.add(`čl. ${m[1]}. ${tag}`)
  }
  return [...set].slice(0, 10)
}

function statuteLabel(legal_area) {
  switch (legal_area) {
    case "criminal":
      return "Kazneni zakon i Zakon o kaznenom postupku"
    case "administrative":
      return "Zakon o upravnim sporovima"
    case "labor":
      return "Zakon o radu i povezani propisi"
    case "commercial":
      return "Trgovački zakon i Zakon o obveznim odnosima"
    default:
      return "Zakon o obveznim odnosima i Zakon o parničnom postupku"
  }
}

function extractLegalQuestion(full, caseNum) {
  const quoted = full.match(/„([^„]{20,400})\?"/)
  if (quoted) return quoted[1].replace(/\s+/g, " ").trim() + "?"

  const q = full.match(/pravn[aoe]\s+pitanj[aoe][^?]{0,350}\?/i)
  if (q) return q[0].replace(/\s+/g, " ").trim()

  return `Koje pravno pitanje je razmatrao Vrhovni sud Republike Hrvatske u predmetu ${caseNum}?`
}

function summarize(full, izrekaRaw, caseNum, legal_area) {
  const izLat = izrekaRaw.replace(/\s+/g, " ").trim()
  let cp = izLat
    .replace(/^(P\s*R\s*E\s*S\s*U\s*D\s*A|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E)\s*/i, "")
    .slice(0, 520)
    .trim()
  if (cp.length > 420) cp = cp.slice(0, 417).trim() + "…"

  const obrazIdx = full.search(/\bObrazloženje\b/i)
  let reasoning = ""
  if (obrazIdx >= 0) {
    reasoning = full
      .slice(obrazIdx, obrazIdx + 1400)
      .replace(/\s+/g, " ")
      .trim()
  }
  if (reasoning.length < 80) {
    reasoning = `Vrhovni sud Republike Hrvatske u predmetu ${caseNum} obrazlaže odluku primjenom ${statuteLabel(legal_area)}.`
  }
  if (reasoning.length > 950) reasoning = reasoning.slice(0, 947).trim() + "…"

  return {
    legal_question: extractLegalQuestion(full, caseNum),
    court_position: cp || full.slice(0, 400).replace(/\s+/g, " ").trim(),
    reasoning,
    headnote: cp.slice(0, 180) || full.slice(0, 180).replace(/\s+/g, " ").trim(),
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const meta = parseMetadata(raw, fn)
  if (!meta.case_number) return null

  const legal_area = legalAreaFromCaseNumber(meta.case_number)
  const decision_date = normalizeDecisionDate(meta.decision_date_raw, raw)
  const izreka = extractIzreka(raw)
  const izLat = izreka.replace(/\s+/g, " ")
  const outcome = outcomeFromText(izLat)
  const sum = summarize(raw, izreka, meta.case_number, legal_area)
  const related = extractArticles(raw, legal_area)
  const prefix = meta.case_number.split(/[\s/]/)[0]
  const keywords = [legal_area, COURT, prefix].filter(Boolean)

  return {
    jurisdiction: "croatia",
    court: COURT,
    court_level: "supreme",
    case_number: meta.case_number,
    decision_date,
    legal_area,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length
      ? related
      : [`čl. ${legal_area === "criminal" ? "KZ" : "ZPP"}`],
    headnote: sum.headnote,
    outcome,
    source_url: meta.source_url ?? undefined,
  }
}

export function caseToTsBlock(c) {
  const lines = [
    `  {`,
    `    jurisdiction: "croatia",`,
    `    court: ${tsEscape(c.court)},`,
    `    court_level: "supreme",`,
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
  if (area === "criminal") {
    return {
      tsFile: `case-law-criminal-croatia-vrhovni-${n}.ts`,
      exportName: `CASE_LAW_CRIMINAL_CROATIA_VRHOVNI_${n}`,
    }
  }
  return {
    tsFile: `case-law-${area}-croatia-${n}.ts`,
    exportName: `CASE_LAW_${area.toUpperCase()}_CROATIA_${n}`,
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
