import fs from "fs"
import path from "path"

const COURT = "Upravni sud Crne Gore"
const LEGAL_AREA = "administrative"

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

function cyrToLatin(s) {
  const trip = [
    ["Љ", "Lj"],
    ["љ", "lj"],
    ["Њ", "Nj"],
    ["њ", "nj"],
    ["Џ", "Dž"],
    ["џ", "dž"],
  ]
  const one = {
    А: "A", а: "a", Б: "B", б: "b", В: "V", в: "v", Г: "G", г: "g", Д: "D", д: "d",
    Ђ: "Đ", ђ: "đ", Е: "E", е: "e", Ж: "Ž", ж: "ž", З: "Z", з: "z", И: "I", и: "i",
    Ј: "J", ј: "j", К: "K", к: "k", Л: "L", л: "l", М: "M", м: "m", Н: "N", н: "n",
    О: "O", о: "o", П: "P", п: "p", Р: "R", р: "r", С: "S", с: "s", Т: "T", т: "t",
    Ћ: "Ć", ћ: "ć", У: "U", у: "u", Ф: "F", ф: "f", Х: "H", х: "h", Ц: "C", ц: "c",
    Ч: "Č", ч: "č", Ш: "Š", ш: "š",
  }
  let out = ""
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2)
    const tr = trip.find((x) => x[0] === two)
    if (tr) {
      out += tr[1]
      i++
      continue
    }
    out += one[s[i]] ?? s[i]
  }
  return out
}

function scrubCyrillicRuns(s) {
  return s.replace(/[\u0400-\u04FF]+/g, (chunk) => cyrToLatin(chunk))
}

function deSpacePdfArtifact(s) {
  return s.replace(/((?:[A-Za-z\u0400-\u04FF]\s+){2,}[A-Za-z\u0400-\u04FF])/g, (chunk) =>
    chunk.replace(/\s+/g, ""),
  )
}

function prepareText(raw) {
  return scrubCyrillicRuns(deSpacePdfArtifact(raw))
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

  if (yearFallback) return `${yearFallback}-01-01`
  return "2010-01-01"
}

function extractIzreka(text) {
  const spacedObrazlozenje = /O\s+б\s+р\s+а\s+з\s+л\s+о\s+ж\s+е\s+њ\s+е|O\s+b\s+r\s+a\s+z\s+l\s+o\s+z\s+e\s+n\s+j\s+e/i
  const ix = text.search(spacedObrazlozenje)
  const chunk = ix === -1 ? text.slice(0, 9000) : text.slice(0, ix)
  const pres = /P\s+R\s+E\s+S\s+U\s+D\s+U/i
  const rjes = /R\s+J\s+E\s+Š\s+E\s+N\s+J\s+E/i
  const pi = chunk.search(pres)
  const ri = chunk.search(rjes)
  const start = pi === -1 ? (ri === -1 ? 0 : ri) : pi
  if (start === 0 && pi === -1 && ri === -1) {
    const lat = prepareText(chunk)
    const iz = lat.match(/(?:IZ\s+REKE|UTVRĐUJE|Usvaja|Odbija|Tužba)[\s\S]{0,1200}/i)
    if (iz) return iz[0]
    return chunk.slice(0, 1600)
  }
  return chunk.slice(start, start + 2000)
}

function outcomeFromText(_full, izLat) {
  const iz = izLat.slice(0, 1800)
  if (/Tužba\s+se\s+usvaja|Usvaja\s+se\s+tužb|Uvažava\s+se\s+tužb/i.test(iz)) {
    return /ukida|vraća|ponovno|preinačava/i.test(iz) ? "remanded" : "plaintiff_won"
  }
  if (/Usvaja\s+se|Uvažava\s+se|USVOJENA|potvrđuje\s+se\s+žalb/i.test(iz))
    return /ukida|vraća|ponovno|preinačava/i.test(iz) ? "remanded" : "partially"
  if (/Tužba\s+se\s+odbija|Odbija\s+se|ODBIA|odbijaju\s+se/i.test(iz)) return "defendant_won"
  if (/Potvrđuje|POTVRĐUJE/i.test(iz)) return "plaintiff_won"
  if (/Preinačava|ukida\s+se/i.test(iz)) return "remanded"
  if (/Tužba\s+se\s+odbacuje|odbacuje\s+se/i.test(iz)) return "procedural"
  return "partially"
}

function extractArticles(text) {
  const tag = "ZUS CG"
  const set = new Set()
  let m
  const lat = prepareText(text.slice(0, 30000))
  const re = /čl(?:an|\.)\s*(\d+)(?:\s*st(?:av)?\.?\s*(\d+))?/gi
  while ((m = re.exec(lat))) {
    if (m[2]) set.add(`čl. ${m[1]}. st. ${m[2]}. ${tag}`)
    else set.add(`čl. ${m[1]}. ${tag}`)
  }
  return [...set].slice(0, 10)
}

function summarize(full, izrekaRaw, caseNum) {
  const izLat = prepareText(izrekaRaw)
  let cp = izLat
    .replace(/^\s*(P\s*R\s*E\s*S\s*U\s*D\s*U|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E)\s*/i, "")
    .slice(0, 520)
    .replace(/\s+/g, " ")
    .trim()
  if (cp.length > 420) cp = cp.slice(0, 417).trim() + "…"
  const head = cp.slice(0, 160) || prepareText(full.slice(0, 200))
  return {
    legal_question: `Koje pravno pitanje je razmatrao Upravni sud Crne Gore u predmetu ${caseNum}?`,
    court_position: cp || prepareText(full.slice(0, 400)),
    reasoning: `Upravni sud Crne Gore odlučuje u predmetu ${caseNum}, primjenjujući Zakon o upravnim sporovima Crne Gore i povezane procesne propise.`,
    headnote: head,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function extractCaseFromFile(fn, raw) {
  if (raw.trim().length < 100) return null

  const meta = parseFilename(fn)
  const decision_date = firstDecisionDate(raw, meta.godina)
  const izreka = extractIzreka(raw)
  const izLat = prepareText(izreka)
  const outcome = outcomeFromText(raw, izLat)
  const sum = summarize(raw, izreka, meta.case_number)
  const related = extractArticles(raw)
  const keywords = [LEGAL_AREA, COURT, meta.sifra.replace(/_/g, "-")].filter(Boolean)

  return {
    jurisdiction: "montenegro",
    court: COURT,
    court_level: "administrative",
    case_number: meta.case_number,
    decision_date,
    legal_area: LEGAL_AREA,
    legal_question: sum.legal_question,
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    keywords,
    related_articles: related.length ? related : ["čl. 37. ZUS CG"],
    headnote: sum.headnote,
    outcome,
    source_url: `https://sudovi.me/vrhs/odluka/${meta.dbid}`,
  }
}

export function caseToTsBlock(c) {
  return `  {
    jurisdiction: "montenegro",
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
