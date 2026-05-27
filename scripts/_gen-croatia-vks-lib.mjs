import fs from "fs"
import path from "path"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const COURT = "Visoki kazneni sud Republike Hrvatske"
const COURT_LEVEL = "high"
const JURISDICTION = "croatia"
const LEGAL_AREA = "criminal"
const MIN_CHARS = 100

function parseHeader(raw) {
  const head = raw.slice(0, 2500)
  const meta = {}
  const broj = head.match(/^Broj odluke:\s*(.+)$/im)
  if (broj) meta.case_number = broj[1].trim()
  const datum = head.match(/^Datum odluke:\s*(.+)$/im)
  if (datum) meta.date_raw = datum[1].trim()
  const url = head.match(/^URL:\s*(.+)$/im)
  if (url) meta.source_url = url[1].trim()
  const naslov = head.match(/^Naslov:\s*(.+)$/im)
  if (naslov && !meta.case_number) meta.case_number = naslov[1].trim()
  return meta
}

export function caseNumberFromFilename(fn) {
  let base = fn.replace(/\.txt$/i, "").replace(/-[a-f0-9]{8}$/i, "")
  const parts = base.split("-")
  let yearIdx = -1
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/^\d{4}$/.test(parts[i])) {
      yearIdx = i
      break
    }
  }
  if (yearIdx < 2) return base.replace(/-/g, " ").replace(/\s+/g, " ").trim()
  const year = parts[yearIdx]
  const caseNum = parts[yearIdx - 1]
  const suffix = parts.slice(yearIdx + 1).join("-")
  const prefixStr = parts.slice(0, yearIdx - 1).join(" ")
  if (suffix) return `${prefixStr} ${caseNum}/${year}-${suffix}`.replace(/\s+/g, " ").trim()
  return `${prefixStr} ${caseNum}/${year}`.replace(/\s+/g, " ").trim()
}

function sourceUrlFromFilename(fn) {
  const m = fn.match(/-([a-f0-9]{8})\.txt$/i)
  if (!m) return null
  return `https://odluke.sudovi.hr/Document/View?id=${m[1]}`
}

function isoFromNumeric(dayS, monthS, yearS) {
  let day = +dayS
  const month = +monthS
  const year = +yearS
  if (!year || !month || Number.isNaN(month)) return null
  if (day === 0) day = 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function parseDecisionDate(raw, metaDate, caseNumber) {
  if (metaDate) {
    const d = metaDate.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
    if (d) return isoFromNumeric(d[1], d[2], d[3])
    const y = metaDate.match(/\b(19|20)\d{2}\b/)
    if (y) return `${y[0]}-01-01`
  }
  const head = raw.slice(0, 8000)
  const zagreb = head.match(/Zagreb[^0-9]{0,40}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i)
  if (zagreb) return isoFromNumeric(zagreb[1], zagreb[2], zagreb[3])
  const generic = head.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (generic) return isoFromNumeric(generic[1], generic[2], generic[3])
  const ym = (caseNumber || "").match(/\/(\d{4})/)
  if (ym) return `${ym[1]}-01-01`
  return "2015-01-01"
}

function bodyText(raw) {
  const m = raw.match(/\r?\n---\r?\n/)
  if (!m || m.index === undefined) return raw
  return raw.slice(m.index + m[0].length)
}

function extractIzreka(text) {
  const ix = text.search(/Obrazloženje/i)
  const chunk = ix === -1 ? text.slice(0, 12000) : text.slice(0, ix)
  const verdict = chunk.search(
    /(?:^|\n)\s*(?:I{1,3}V?|V{1,3})\s*[\.\)]\s|(?:^|\n)\s*p\s*r\s*i\s*h\s*v\s*a|(?:^|\n)\s*o\s+d\s+b\s+i\s+j\s+a|(?:^|\n)\s*d\s*j\s*e\s*l\s*o\s*m\s*i\s*č\s*n\s*o|(?:^|\n)\s*u\s*k\s*i\s*d\s*a|(?:^|\n)\s*p\s*o\s*t\s*v\s*r\s*đ\s*u\s*j\s*e|(?:^|\n)\s*p\s*r\s*e\s*i\s*n\s*a\s*č\s*u\s*j\s*e|(?:^|\n)\s*o\s*d\s+b\s*i\s+j\s*a\s+se\s+žalb/i,
  )
  const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*U|PRESUDA/i)
  const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|RJEŠENJE/i)
  const spaced = chunk.search(/p\s*r\s*e\s*s\s*u\s*d\s*i\s*o|r\s*i\s*j\s*e\s*š\s*i\s*o/i)
  const start =
    verdict !== -1
      ? verdict
      : pres !== -1
        ? pres
        : rjes !== -1
          ? rjes
          : spaced !== -1
            ? spaced
            : 0
  return chunk.slice(start)
}

function appealParty(full) {
  const intro = full.slice(0, 5000)
  if (/žalb\w*\s+(?:optužen|okrivljen)|optužen\w*\s+podnio\s+žalb/i.test(intro)) return "defense"
  if (/žalb\w*\s+(?:državnog|županijskog)\s+odvjet/i.test(intro)) return "prosecutor"
  if (/zahtjev\s+za\s+zaštitu\s+zakonitosti.*?odvjet/i.test(intro)) return "prosecutor"
  return "unknown"
}

function outcomeFromIzreka(iz, full) {
  const party = appealParty(full)
  const t = iz.slice(0, 2000)
  if (/OSLOBAĐA\s+SE\s+OD\s+OPTUŽBE|oslobađa\s+se\s+od\s+optužbe/i.test(t)) return "defendant_won"
  if (/djelomičn\w*\s+prihvać|djelomično\s+se\s+prihvać/i.test(t)) {
    if (/ukida|ponovno\s+suđenje|vraća\s+se/i.test(t))
      return party === "defense"
        ? "defendant_won"
        : party === "prosecutor"
          ? "plaintiff_won"
          : "remanded"
    return "partially"
  }
  if (/prihvać\w*\s+se\s+žalb|žalb\w*\s+se\s+prihvać/i.test(t)) {
    if (/ukida|ponovno/i.test(t))
      return party === "defense"
        ? "defendant_won"
        : party === "prosecutor"
          ? "plaintiff_won"
          : "remanded"
    return party === "defense" ? "defendant_won" : "partially"
  }
  if (/Odbija\s+se\s+žalb\w*\s+kao\s+neosnovan/i.test(t))
    return party === "defense" ? "plaintiff_won" : party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/žalb\w*\s+odbi\w+|Odbijaju\s+se\s+žalb/i.test(t))
    return party === "defense" ? "plaintiff_won" : party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Potvrđuje\s+se|potvrđuje\s+se/i.test(t)) return "plaintiff_won"
  if (/Preinačuje\s+se|preinačuje\s+se/i.test(t)) return "partially"
  if (/ukida\s+se/i.test(t) && /ponovno/i.test(t)) return "remanded"
  if (/Usvaja\s+se\s+prijedlog/i.test(t)) return "procedural"
  return "partially"
}

function extractArticles(text) {
  const set = new Set()
  let m
  const re = /članka?\s+(\d+)\.?\s*stav(?:ak|ka)?\s+(\d+)/gi
  while ((m = re.exec(text.slice(0, 35000)))) {
    const snip = text.slice(Math.max(0, m.index - 200), m.index + 120)
    const isZkp = /ZKP\/08|kaznenog\s+postupku/i.test(snip)
    if (isZkp) set.add(`čl. ${m[1]}. st. ${m[2]}. ZKP/08`)
    else set.add(`čl. ${m[1]}. st. ${m[2]}. KZ/11`)
  }
  const reOne = /članka?\s+(\d+)/gi
  while ((m = reOne.exec(text.slice(0, 25000)))) {
    const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
    if (/ZKP|postupk/i.test(snip)) set.add(`čl. ${m[1]}. ZKP/08`)
    else if (/KZ/i.test(snip)) set.add(`čl. ${m[1]}. KZ/11`)
  }
  return [...set].slice(0, 10)
}

function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

function summarize(full, iz, caseNumber) {
  let cp = cleanSnippet(
    iz
      .replace(/^(P\s*R\s*E\s*S\s*U\s*D\s*U|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|PRESUDA|RJEŠENJE)\s*/i, "")
      .replace(/^[IVX]+\s*[\.\)]\s*/i, ""),
  )
  if (!cp || cp === ".") {
    const m = full.match(
      /(?:Odbija\s+se|Djelomično\s+se\s+prihvaća|prihvaća\s+se\s+žalb|Potvrđuje\s+se|Preinačuje\s+se|ukida\s+se)[^.]{0,200}\./i,
    )
    cp = m ? cleanSnippet(m[0]) : cleanSnippet(full)
  }
  const crime = full.match(/kaznen\w+\s+djel\w+\s+([^,]{5,90})/i)
  const crimeBit = crime ? ` (${crime[1].trim()})` : ""
  const obrazIdx = full.search(/\bObrazloženje\b/i)
  let reasoning = ""
  if (obrazIdx >= 0) {
    reasoning = cleanSnippet(full.slice(obrazIdx))
  } else {
    reasoning = cleanSnippet(
      `Visoki kazneni sud Republike Hrvatske ocjenjuje žalbene prigovore u predmetu ${caseNumber}${crimeBit}, primjenjujući KZ/11 i ZKP/08. ${full.replace(/\s+/g, " ").trim()}`,
    )
  }
  return {
    legal_question: extractLegalQuestion({ body: full, izreka: iz }),
    court_position: cp,
    reasoning,
    headnote: cleanSnippet(cp, 160),
  }
}

function normCaseNumber(s) {
  return s.replace(/\s+/g, " ").trim().toLowerCase()
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < MIN_CHARS) return null

  const meta = parseHeader(raw)
  const case_number = meta.case_number || caseNumberFromFilename(fn)
  const decision_date = parseDecisionDate(raw, meta.date_raw, case_number)
  const source_url = meta.source_url || sourceUrlFromFilename(fn) || undefined
  const body = bodyText(raw)
  const iz = extractIzreka(body)
  const outcome = outcomeFromIzreka(iz, body)
  const sum = summarize(body, iz, case_number)
  const related = extractArticles(body)
  const isZzl = /Kžl|Kž\s*l|zaštit\w*\s+zakonitosti/i.test(case_number + body.slice(0, 800))
  const keywords = isZzl
    ? ["zaštita zakonitosti", "Visoki kazneni sud", "KZ/11", "ZKP/08"]
    : ["žalba", "Visoki kazneni sud", "KZ/11", "ZKP/08"]

  return {
    jurisdiction: JURISDICTION,
    court: COURT,
    court_level: COURT_LEVEL,
    case_number,
    decision_date,
    legal_area: LEGAL_AREA,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related,
    headnote: sum.headnote,
    outcome,
    source_url,
    _norm: normCaseNumber(case_number),
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function caseToTsBlock(c) {
  const lines = [
    `  {
    jurisdiction: "croatia",
    court: ${tsEscape(COURT)},
    court_level: "high",
    case_number: ${tsEscape(c.case_number)},
    decision_date: ${tsEscape(c.decision_date)},
    legal_area: "criminal",
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
