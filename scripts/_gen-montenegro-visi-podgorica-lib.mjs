import fs from "fs"
import { prepareText, extractObrazlozenje } from "./_gen-prepare-text.mjs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const COURT = "Viši sud u Podgorici"

export function parseFilename(fn) {
  const base = fn.replace(/\.txt$/i, "")
  const parts = base.split("-")
  const dbid = parts.pop()
  const godina = parts.pop()
  const broj = parts.pop()
  const sifraRaw = parts.join("-")
  const sifra = sifraRaw.replace(/_/g, " ").replace(/\s+/g, " ").replace(/ - /g, "-").trim()
  const case_number = `${sifra} ${broj}/${godina}`
  return { sifra: sifraRaw, broj, godina, dbid, case_number }
}

/** Map court register prefix → CaseLawInput.legal_area (per Legantis ingestion rules). */
export function legalAreaFromSifra(sifra) {
  const norm = sifra.replace(/_/g, "-").trim()
  const u = norm.toUpperCase()
  // Longer prefixes first
  if (/^PDP|^PŽR|^PZR/i.test(u)) return "labor"
  if (/^PS|^PŽ-KOM/i.test(u)) return "commercial"
  if (/^Kr|^Kž|^Krs|^Kvž|^KR|^KŽ|^KRS|^KVŽ/i.test(norm)) return "criminal"
  if (/^Už|^UŽ/i.test(norm) || norm === "U") return "administrative"
  if (/^II/i.test(u)) return "procedural"
  if (/^REV/i.test(u)) return "civil"
  if (/^GŽ|^P/i.test(u)) return "civil"
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

function firstDecisionDate(text, yearFallback) {
  const lat = prepareText(text.slice(0, 15000))

  const dana = lat.match(/\bDana\s+(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.?\s*god/i)
  if (dana) return isoFromNumeric(dana[1], dana[2], dana[3])

  const pg = lat.match(/Podgoric[a]?[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i)
  if (pg) return isoFromNumeric(pg[1], pg[2], pg[3])

  const sess = lat.match(
    /sjednic[iu]\s+vij[eć]ca\s+odr[zž]anoj\s+dana\s+(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i,
  )
  if (sess) return isoFromNumeric(sess[1], sess[2], sess[3])

  const generic = lat.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.?\s*godine/i)
  if (generic) return isoFromNumeric(generic[1], generic[2], generic[3])

  const generic2 = lat.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (generic2) return isoFromNumeric(generic2[1], generic2[2], generic2[3])

  const yOnly = lat.match(/\b(20\d{2})\s*\.?\s*godine?\b/i)
  if (yOnly && yearFallback === yOnly[1]) return `${yOnly[1]}-01-01`

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function extractIzreka(text) {
  const spacedObrazlozenje = /O\s+б\s+р\s+а\s+з\s+л\s+о\s+ж\s+е\s+њ\s+е|O\s+b\s+r\s+a\s+z\s+l\s+o\s+z\s+e\s+n\s+j\s+e|O\s+b\s+r\s+a\s+z\s+l\s+o\s+ž\s+e\s+n\s+j\s+e/i
  const ix = text.search(spacedObrazlozenje)
  const chunk = ix === -1 ? text.slice(0, 9000) : text.slice(0, ix)
  const pres = /P\s+R\s+E\s+S\s+U\s+D\s+U/i
  const rjes = /R\s+J\s+E\s+Š\s+E\s+N\s+J\s+E/i
  const pi = chunk.search(pres)
  const ri = chunk.search(rjes)
  const start = pi === -1 ? (ri === -1 ? 0 : ri) : pi
  if (start === 0 && pi === -1 && ri === -1) {
    const lat = prepareText(chunk)
    const iz = lat.match(/(?:IZ\s+REKE|UTVRĐUJE|Usvaja|Odbija|POTVRĐUJE|ODBIJA)[\s\S]*/i)
    if (iz) return iz[0]
    return prepareText(chunk)
  }
  return chunk.slice(start)
}

function outcomeFromText(_full, izLat) {
  const iz = izLat.slice(0, 1800)
  if (/Ukida\s+se|UKIDA\s+SE|vrać[ae]\s+se\s+na\s+ponov/i.test(iz)) return "remanded"
  if (/vratiti\s+predmet\s+na\s+ponov/i.test(iz)) return "remanded"
  if (/Usvaja\s+se\s+žalb|Uvažava\s+se\s+žalb|usvojen[aou]\s+žalb/i.test(iz)) return "partially"
  if (/Odbija\s+se\s+žalb|žalb[aou]\s+se\s+odbij/i.test(iz)) return "defendant_won"
  if (/Usvaja\s+se|Uvažava\s+se|USVOJENA/i.test(iz))
    return /ukida|vraća|ponovno|preinačava/i.test(iz) ? "remanded" : "partially"
  if (/Odbija\s+se|ODBIA|odbijaju\s+se/i.test(iz)) return "defendant_won"
  if (/Potvrđuje|POTVRĐUJE/i.test(iz)) return "defendant_won"
  if (/Preinačav|PREINAČAV|preinačen/i.test(iz)) return "partially"
  if (/produžava\s+se\s+pritvor|Usvaja\s+se\s+predlog|dopušt(?:a|ena)\s+se\s+revizij/i.test(iz))
    return "procedural"
  return "partially"
}

function extractArticles(text, legal_area) {
  const tag =
    legal_area === "criminal"
      ? "KZ CG"
      : legal_area === "administrative"
        ? "ZUS CG"
        : legal_area === "procedural"
          ? "ZPP CG"
          : legal_area === "labor"
            ? "ZRad CG"
            : legal_area === "commercial"
              ? "ZD CG"
              : "ZOO CG"
  const set = new Set()
  let m
  const lat = prepareText(text.slice(0, 30000))
  const re = /čl(?:an|\.)\s*(\d+)(?:\s*st(?:av)?\.?\s*(\d+))?/gi
  while ((m = re.exec(lat))) {
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. ${tag}`)
    else set.add(`čl. ${m[1]}. ${tag}`)
  }
  return [...set].slice(0, 12)
}

function statuteLabel(legal_area) {
  switch (legal_area) {
    case "criminal":
      return "Krivični zakonik Crne Gore"
    case "administrative":
      return "Zakon o upravnim sporovima Crne Gore"
    case "procedural":
      return "Zakon o parničnom postupku Crne Gore"
    case "labor":
      return "Zakon o radu Crne Gore"
    case "commercial":
      return "Zakon o privrednim društvima Crne Gore"
    default:
      return "Zakon o obligacionim odnosima Crne Gore"
  }
}

function summarize(full, izrekaRaw, caseNum, legal_area) {
  const cp =
    prepareText(izrekaRaw).replace(
      /^\s*(P\s*R\s*E\s*S\s*U\s*D\s*U|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E)\s*/i,
      "",
    ) || prepareText(full)
  const obraz = extractObrazlozenje(full)
  const statute = statuteLabel(legal_area)
  const reasoning =
    obraz.length >= 120
      ? obraz
      : `Viši sud u Podgorici odlučuje u predmetu ${caseNum}, primjenjujući ${statute} i povezane procesne propise.`
  const head = cp.slice(0, 160) || prepareText(full).slice(0, 200)
  return {
    legal_question: extractLegalQuestion({ body: full, izreka: izrekaRaw, prepareText }),
    court_position: cp,
    reasoning,
    headnote: head,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const meta = parseFilename(fn)
  const legal_area = legalAreaFromSifra(meta.sifra)
  const decision_date = firstDecisionDate(raw, meta.godina)
  const izreka = extractIzreka(raw)
  const izLat = prepareText(izreka)
  const outcome = outcomeFromText(raw, izLat)
  const sum = summarize(raw, izreka, meta.case_number, legal_area)
  const related = extractArticles(raw, legal_area)
  const keywords = [legal_area, COURT, meta.sifra.replace(/_/g, "-")].filter(Boolean)

  return {
    jurisdiction: "montenegro",
    court: COURT,
    court_level: "high",
    case_number: meta.case_number,
    decision_date,
    legal_area,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : undefined,
    headnote: sum.headnote,
    outcome,
    source_url: `https://sudovi.me/vrhs/odluka/${meta.dbid}`,
  }
}

export function caseToTsBlock(c) {
  const lines = [
    `  {`,
    `    jurisdiction: "montenegro",`,
    `    court: ${tsEscape(c.court)},`,
    `    court_level: ${tsEscape(c.court_level)},`,
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
  ]
  if (c.related_articles?.length) {
    lines.push(`    related_articles: ${JSON.stringify(c.related_articles)},`)
  }
  lines.push(
    `    headnote: ${tsEscape(c.headnote)},`,
    `    outcome: ${tsEscape(c.outcome)},`,
    `    source_url: ${tsEscape(c.source_url)},`,
    `  }`,
  )
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
