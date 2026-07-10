import fs from "fs"
import { summarizeBihCase } from "./_gen-prepare-text.mjs"
import path from "path"
import { isBihUtilityStem, shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

const DEFAULT_COURT = "Apelacioni sud Brčko Distrikta BiH"
const JURISDICTION = "bih_brcko"

export function safePdfStem(pdfPath) {
  let base = path.basename(pdfPath, ".pdf")
  base = base
    .replace(/Uvp/gi, "__UVP__")
    .replace(/Už/gi, "__UZ__")
    .replace(/Rsž/gi, "__RSZ__")
    .replace(/Gž/gi, "__GZ__")
    .replace(/Rev/gi, "__REV__")
  base = base.replace(/[^\w\s\-().,]/g, "_")
  return base
}

export function createBrckoUpravnoGenerator(cfg) {
  const { title, label, legal_area, defaultQ, statuteLabel, statuteTag } = cfg

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/__UVP__/gi, "Uvp")
      .replace(/__UZ__/gi, "Už")
      .replace(/__RSZ__/gi, "Rsž")
      .replace(/__GZ__/gi, "Gž")
      .replace(/__REV__/gi, "Rev")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return s
  }

  const MONTHS = {
    januar: 1,
    januara: 1,
    februar: 2,
    februara: 2,
    mart: 3,
    marta: 3,
    april: 4,
    aprila: 4,
    maj: 5,
    maja: 5,
    juni: 6,
    juna: 6,
    jul: 7,
    jula: 7,
    avgust: 8,
    avgusta: 8,
    septembar: 9,
    septembra: 9,
    oktobar: 10,
    oktobra: 10,
    novembar: 11,
    novembra: 11,
    decembar: 12,
    decembra: 12,
  }

  function normalizeCaseNumber(n) {
    return n
      .replace(/^PREDMETA\s+/i, "")
      .replace(/\s+SENTENCA.*$/i, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 90)
  }

  function caseNumberFromText(raw, fallback) {
    const head = raw.slice(0, 6000)
    const brojPredmeta = head.match(
      /BROJ\s+PREDMETA\s+(96\s+0\s+(?:U|Rs)\s+[\d\s]+?(?:Už|Uvp|Rsž|Gž)?)/i,
    )
    if (brojPredmeta) return normalizeCaseNumber(brojPredmeta[1])
    const m =
      head.match(/Broj\s*:?\s*(96\s+0\s+(?:U|Rs)\s+[\d\s]+?(?:\d+\s+)?(?:Už|Uvp|Rsž|Gž|U)?)/i) ||
      head.match(/(96\s+0\s+(?:U|Rs)\s+\d+)/i) ||
      head.match(/(097-0-Su-\d+-\d+)/i)
    if (m) {
      const n = normalizeCaseNumber(m[1])
      if (n.length >= 8) return n
    }
    return normalizeCaseNumber(fallback)
  }

  function isIndexingForm(raw) {
    return /OBRAZAC\s+ZA\s+INDEKSACIJU\s+SUDSKIH\s+ODLUKA/i.test(raw.slice(0, 8000))
  }

  function yearFromStem(stem) {
    const m =
      stem.match(/(?:Uvp|Uv|Už|U|Gž|Rsž)-(\d{2})(?:\s|$|\.)/i) ||
      stem.match(/_(\d{2})_(?:U|G|Rs)/i) ||
      stem.match(/\s(\d{2})\s+U(?:vp|ž)?\b/i) ||
      stem.match(/\s(\d{2})\s*$/)
    if (!m) return null
    const y = +m[1]
    return `${y >= 50 ? 1900 + y : 2000 + y}-01-01`
  }

  function normalizeDate(y, mo, d) {
    let day = +d
    let month = +mo
    if (day === 0) day = 1
    if (month === 0) month = 1
    return `${y}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  function firstDecisionDate(text) {
    const head = text.slice(0, 8000)
    const named = head.match(
      /Brčko[^0-9]{0,60}(\d{1,2})\.\s*(januar|februar|mart|april|maj|juni|jul|avgust|septembar|oktobar|novembar|decembar)[a-z]*\s+(\d{4})/i,
    )
    if (named) {
      const moKey = named[2].toLowerCase().replace(/a$/, "")
      const mo = MONTHS[moKey]
      if (mo) return normalizeDate(+named[3], mo, +named[1])
    }
    const m = head.match(/Brčko[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i)
    if (m) return normalizeDate(+m[3], +m[2], +m[1])
    const m2 = head.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.?\s*godine/i)
    if (m2) return normalizeDate(+m2[3], +m2[2], +m2[1])
    const m3 = head.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
    if (m3) return normalizeDate(+m3[3], +m3[2], +m3[1])
    const yOnly = head.match(/\b(19|20)\d{2}\b/)
    if (yOnly) return `${yOnly[0]}-01-01`
    return null
  }

  function extractIzreka(text) {
    const ix = text.search(/Obrazloženje|O\s+b\s+r\s+a\s+z\s+l\s+o\s+ž\s+e\s+n\s+j\s+e/i)
    const chunk = ix === -1 ? text.slice(0, 9000) : text.slice(0, ix)
    const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|RJEŠENJE/i)
    const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*U|PRESUDA/i)
    const start = pres !== -1 ? pres : rjes !== -1 ? rjes : 0
    return chunk.slice(start)
  }

  function adminParty(full) {
    const intro = full.slice(0, 5000)
    if (/tužb\w*\s+tužitelj|u\s+upravnom\s+sporu\s+tužitelj/i.test(intro)) return "plaintiff"
    if (/žalb\w*\s+tužitelj/i.test(intro)) return "plaintiff"
    if (/žalb\w*\s+tužen/i.test(intro)) return "defendant"
    return "unknown"
  }

  function outcomeAdmin(full, iz) {
    const party = adminParty(full)
    if (/Uvažava\s+se\s+tužb|Tužb\w*\s+se\s+uvažava|Uvažava\s+se\s+zahtjev/i.test(iz)) {
      if (/ukida|vraća\s+predmet|ponovno/i.test(iz)) return "remanded"
      return party === "plaintiff" ? "plaintiff_won" : "partially"
    }
    if (/Odbija\s+se\s+tužb|Tužb\w*\s+se\s+odbij|Zahtjev\s+se\s+odbij|Odbija\s+se\s+kao\s+neosnovan/i.test(iz))
      return party === "plaintiff" ? "defendant_won" : "plaintiff_won"
    if (/Potvrđuje\s+se/i.test(iz))
      return party === "plaintiff" ? "defendant_won" : "plaintiff_won"
    if (/Preinačava\s+se|djelimično\s+uvažava/i.test(iz)) return "partially"
    if (/ukida|vraća\s+na\s+ponovno|vraća\s+predmet/i.test(iz)) return "remanded"
    if (/Odbacuje\s+se\s+tužb/i.test(iz)) return "procedural"
    return "partially"
  }

  function extractArticles(text) {
    const set = new Set()
    let m
    const re = /člana?\s+(\d+)\.?\s*stav\s+(\d+)/gi
    while ((m = re.exec(text))) {
      const snip = text.slice(Math.max(0, m.index - 200), m.index + 100)
      const isZus = /ZUS|upravn\w+\s+spor/i.test(snip)
      const isZup = /ZUP|upravn\w+\s+postupk/i.test(snip)
      if (isZus) set.add(`čl. ${m[1]}. st. ${m[2]}. ZUS Brčko`)
      else if (isZup) set.add(`čl. ${m[1]}. st. ${m[2]}. ZUP Brčko`)
      else set.add(`čl. ${m[1]}. st. ${m[2]}. ${statuteTag}`)
    }
    const reOne = /člana?\s+(\d+)/gi
    while ((m = reOne.exec(text.slice(0, 30000)))) {
      const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
      if (/ZUS|upravn\w+\s+spor/i.test(snip)) set.add(`čl. ${m[1]}. ZUS Brčko`)
      else if (/ZUP|upravn\w+\s+postupk/i.test(snip)) set.add(`čl. ${m[1]}. ZUP Brčko`)
      else set.add(`čl. ${m[1]}. ${statuteTag}`)
    }
    if (/ZUS|upravn\w+\s+spor/i.test(text.slice(0, 8000))) set.add("čl. ZUS Brčko")
    if (/ZUP|upravn\w+\s+postupk/i.test(text.slice(0, 8000))) set.add("čl. ZUP Brčko")
    return [...set].slice(0, 10)
  }

  function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

  function summarize(full, iz) {
    const sum = summarizeBihCase(full, iz, `Sud ocjenjuje tužbu, žalbu ili drugi pravni lijek u upravnom sporu iz oblasti ${title}, primjenjujući ${statuteLabel} i Zakon o upravnim sporovima Brčko Distrikta BiH (ZUS Brčko).`)
    return {
      legal_question: defaultQ,
      court_position: sum.court_position,
      reasoning: sum.reasoning,
      headnote: sum.headnote,
    }
  }

  function tsEscape(s) {
    return JSON.stringify(s)
  }

  function fallbackBlock(stem) {
    const decision_date = yearFromStem(stem) || "2015-01-01"
    return `  {
    jurisdiction: ${tsEscape(JURISDICTION)},
    court: ${tsEscape(DEFAULT_COURT)},
    court_level: "appellate",
    case_number: ${tsEscape(stem)},
    decision_date: ${tsEscape(decision_date)},
    legal_area: ${tsEscape(legal_area)},
    legal_question:
      ${tsEscape(`Kako je Apelacioni sud Brčko Distrikta BiH odlučio u upravnom predmetu ${stem} (${title})?`)},
    court_position:
      ${tsEscape("PDF izvor nema valjanu strukturu ili je isključivo skeniran; automatska ekstrakcija teksta nije uspjela.")},
    reasoning:
      ${tsEscape(`Predmet ${stem} pripada kategoriji ${title}. Za pun sadržaj odluke potrebno je OCR ili ručno čitanje izvornog PDF-a.`)},
    keywords: ${JSON.stringify(["nevaljan PDF", "skenirani izvor", label])},
    related_articles: [${tsEscape(`čl. ${statuteTag}`)}],
    headnote: ${tsEscape("Izvor zahtijeva OCR.")},
    outcome: "procedural",
  }`
  }

  function generateBlocks(extractDir, skipSet, fallbackStems = []) {
    const files = fs
      .readdirSync(extractDir)
      .filter((f) => f.endsWith(".txt") && f !== "_summary.json" && !skipSet.has(f))
      .sort()

    const blocks = []
    const seenStems = new Set()
    for (const f of files) {
      const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
      if (isIndexingForm(raw)) continue
      const stemFallback = normCase(f)
      const stem = caseNumberFromText(raw, stemFallback)
      if (shouldSkipBihUtilityFile(f, stem)) continue
      if (seenStems.has(stem)) continue
      seenStems.add(stem)

      const short = raw.trim().length < 200
      let decision_date = firstDecisionDate(raw) || yearFromStem(stem) || "2015-01-01"

      let outcome, legal_question, court_position, reasoning, headnote, keywords, related

      if (short) {
        outcome = "procedural"
        legal_question = `Kako je sud odlučio u upravnom predmetu ${stem}?`
        court_position =
          "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran (bez tekstualnog sloja) ili tekst ima manje od 200 znakova."
        reasoning = `Prilog pripada kategoriji ${title} pred Apelacionim sudom Brčko Distrikta BiH. Za puno obrazloženje potrebno je OCR ili ručno čitanje skena. Metapodaci: broj predmeta ${stem}.`
        keywords = ["skenirani PDF", label, DEFAULT_COURT]
        related = [`čl. ${statuteTag}`]
        headnote = "Skenirani izvor — potrebna ručna/OCR ekstrakcija."
      } else {
        const iz = extractIzreka(raw)
        outcome = outcomeAdmin(raw, iz)
        const sum = summarize(raw, iz)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        keywords = [label, statuteLabel.split(" ")[0], "ZUS Brčko", DEFAULT_COURT]
        related = extractArticles(raw)
        if (related.length === 0) related = [`čl. ${statuteTag}`]
      }

      blocks.push(`  {
    jurisdiction: ${tsEscape(JURISDICTION)},
    court: ${tsEscape(DEFAULT_COURT)},
    court_level: "appellate",
    case_number: ${tsEscape(stem)},
    decision_date: ${tsEscape(decision_date)},
    legal_area: ${tsEscape(legal_area)},
    legal_question:
      ${tsEscape(legal_question)},
    court_position:
      ${tsEscape(court_position)},
    reasoning:
      ${tsEscape(reasoning)},
    keywords: ${JSON.stringify(keywords)},
    related_articles: ${JSON.stringify(related)},
    headnote: ${tsEscape(headnote)},
    outcome: ${tsEscape(outcome)},
  }`)
    }

    for (const stem of fallbackStems) {
      if (isBihUtilityStem(stem)) continue
      if (!seenStems.has(stem)) {
        seenStems.add(stem)
        blocks.push(fallbackBlock(stem))
      }
    }

    return { blocks }
  }

  return { normCase, generateBlocks, fallbackBlock }
}
