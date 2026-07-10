import fs from "fs"
import { summarizeBihCase } from "./_gen-prepare-text.mjs"
import path from "path"
import { isBihUtilityStem, shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

const DEFAULT_COURT = "Vrhovni sud Federacije Bosne i Hercegovine"

export function safePdfStem(pdfPath) {
  let base = path.basename(pdfPath, ".pdf")
  base = base
    .replace(/Rsž/gi, "__RSZ__")
    .replace(/Gžž/gi, "__GZZ__")
    .replace(/Rev/gi, "__REV__")
  base = base.replace(/[^\w\s\-().,]/g, "_")
  return base
}

export function createFbihGradjanskoGenerator(cfg) {
  const { title, label, legal_area, defaultQ, statuteLabel, statuteTag } = cfg

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/__RSZ__/gi, "Rsž")
      .replace(/__GZZ__/gi, "Gžž")
      .replace(/__REV__/gi, "Rev")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return s
  }

  function caseNumberFromText(raw, fallback) {
    const head = raw.slice(0, 3000)
    const m =
      head.match(/Broj\s*:?\s*([0-9\-\sA-Za-zČĆŽŠĐčćžšđ\.]+?)(?:\s+Sarajevo|\s+U\s+IME)/i) ||
      head.match(/Broj\s+([0-9][0-9\sA-Za-z]{10,60}?)(?:\s+Sarajevo)/i)
    if (m) {
      const n = m[1].replace(/\s+/g, " ").trim()
      if (n.length >= 8) return n.slice(0, 90)
    }
    return fallback
  }

  function yearFromStem(stem) {
    const m =
      stem.match(/(?:Rev|Rsž|Gž|Gzz|Rs)-(\d{2})\b/i) ||
      stem.match(/\s(\d{2})\s+Rev\b/i) ||
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
    const head = text.slice(0, 5000)
    const m = head.match(
      /Sarajevo[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i,
    )
    if (m) return normalizeDate(+m[3], +m[2], +m[1])
    const m2 = head.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.?\s*godine/i)
    if (m2) return normalizeDate(+m2[3], +m2[2], +m2[1])
    const m3 = head.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
    if (m3) return normalizeDate(+m3[3], +m3[2], +m3[1])
    const yOnly = head.match(/\b(19|20)\d{2}\b/)
    if (yOnly) return `${yOnly[0]}-01-01`
    return null
  }

  function detectCourt(raw) {
    const head = raw.slice(0, 6000)
    if (
      /Vrhovni\s+sud\s+Federacije\s+Bosne\s+i\s+Hercegovine/i.test(head) ||
      /VRHOVNI\s+SUD\s+FEDERACIJE/i.test(head)
    )
      return { court: DEFAULT_COURT, court_level: "supreme" }
    const kant = head.match(/Kantonalni\s+sud\s+[^\n,]{0,80}/i)
    if (kant) return { court: kant[0].replace(/\s+/g, " ").trim(), court_level: "appellate" }
    const opc = head.match(/Općinski\s+sud\s+[^\n,]{0,80}/i)
    if (opc) return { court: opc[0].replace(/\s+/g, " ").trim(), court_level: "basic" }
    return { court: DEFAULT_COURT, court_level: "supreme" }
  }

  function extractIzreka(text) {
    const ix = text.search(/Obrazloženje|O\s+b\s+r\s+a\s+z\s+l\s+o\s+ž\s+e\s+n\s+j\s+e/i)
    const chunk = ix === -1 ? text.slice(0, 8000) : text.slice(0, ix)
    const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|RJEŠENJE/i)
    const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*U|PRESUDA/i)
    const start = pres !== -1 ? pres : rjes !== -1 ? rjes : 0
    return chunk.slice(start)
  }

  function civilParty(full) {
    const intro = full.slice(0, 4500)
    if (/revizij\w*\s+tužitelj|o\s+reviziji\s+tužitelj|reviziju\s+tužitelj/i.test(intro))
      return "plaintiff"
    if (/revizij\w*\s+tužen|žalb\w*\s+tužen|o\s+reviziji\s+tužen/i.test(intro)) return "defendant"
    if (/žalb\w*\s+tužitelj/i.test(intro)) return "plaintiff"
    return "unknown"
  }

  function outcomeCivil(full, iz) {
    const party = civilParty(full)
    if (/Uvažava\s+se\s+revizij|Revizij\w*\s+se\s+uvažava/i.test(iz)) {
      if (/ukida|vraća\s+predmet|ponovno/i.test(iz)) return "remanded"
      return "partially"
    }
    if (/Odbija\s+se\s+revizij|Revizij\w*\s+se\s+odbij/i.test(iz))
      return party === "plaintiff"
        ? "defendant_won"
        : party === "defendant"
          ? "plaintiff_won"
          : "plaintiff_won"
    if (/Potvrđuje\s+se/i.test(iz))
      return party === "plaintiff"
        ? "plaintiff_won"
        : party === "defendant"
          ? "defendant_won"
          : "plaintiff_won"
    if (/Preinačava\s+se/i.test(iz)) return "partially"
    if (/ukida|vraća\s+predmet|ponovno\s+suđenje/i.test(iz)) return "remanded"
    if (/Odbija\s+se\s+kao\s+neosnovan/i.test(iz))
      return party === "plaintiff" ? "defendant_won" : "plaintiff_won"
    if (/Uvažava\s+se\s+žalb/i.test(iz)) {
      if (/ukida|ponovno/i.test(iz)) return "remanded"
      return "partially"
    }
    return "partially"
  }

  function extractArticles(text) {
    const set = new Set()
    let m
    const re = /člana?\s+(\d+)\.?\s*stav\s+(\d+)/gi
    while ((m = re.exec(text))) {
      const snip = text.slice(Math.max(0, m.index - 200), m.index + 100)
      const isZpp = /ZPP\s+FBiH|parničnog\s+postupka/i.test(snip)
      if (isZpp) set.add(`čl. ${m[1]}. st. ${m[2]}. ZPP FBiH`)
      else set.add(`čl. ${m[1]}. st. ${m[2]}. ${statuteTag}`)
    }
    const reOne = /člana?\s+(\d+)/gi
    while ((m = reOne.exec(text.slice(0, 25000)))) {
      const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
      if (/ZPP|parničn/i.test(snip)) set.add(`čl. ${m[1]}. ZPP FBiH`)
      else set.add(`čl. ${m[1]}. ${statuteTag}`)
    }
    if (/ZPP|parničn/i.test(text.slice(0, 8000))) set.add("čl. ZPP FBiH")
    return [...set].slice(0, 10)
  }

  function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

  function summarize(full, iz) {
    const sum = summarizeBihCase(full, iz, `Sud ocjenjuje reviziju, žalbu ili drugi pravni lijek u predmetu iz oblasti ${title}, primjenjujući ${statuteLabel} i Zakon o parničnom postupku FBiH (ZPP FBiH).`)
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
    jurisdiction: "bih_fbih",
    court: ${tsEscape(DEFAULT_COURT)},
    court_level: "supreme",
    case_number: ${tsEscape(stem)},
    decision_date: ${tsEscape(decision_date)},
    legal_area: ${tsEscape(legal_area)},
    legal_question:
      ${tsEscape(`Kako je Vrhovni sud FBiH odlučio u predmetu ${stem} (${title})?`)},
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
      const stemFallback = normCase(f)
      const stem = caseNumberFromText(raw, stemFallback)
      if (shouldSkipBihUtilityFile(f, stem)) continue
      if (seenStems.has(stem)) continue
      seenStems.add(stem)

      const short = raw.trim().length < 200
      const { court, court_level } = detectCourt(raw)
      let decision_date = firstDecisionDate(raw) || yearFromStem(stem) || "2015-01-01"

      let outcome, legal_question, court_position, reasoning, headnote, keywords, related

      if (short) {
        outcome = "procedural"
        legal_question = `Kako je sud odlučio u predmetu ${stem}?`
        court_position =
          "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran (bez tekstualnog sloja) ili tekst ima manje od 200 znakova."
        reasoning = `Prilog pripada kategoriji ${title} pred Vrhovnim sudom FBiH. Za puno obrazloženje potrebno je OCR ili ručno čitanje skena. Metapodaci: broj predmeta ${stem}.`
        keywords = ["skenirani PDF", label, court]
        related = [`čl. ${statuteTag}`]
        headnote = "Skenirani izvor — potrebna ručna/OCR ekstrakcija."
      } else {
        const iz = extractIzreka(raw)
        outcome = outcomeCivil(raw, iz)
        const sum = summarize(raw, iz)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        keywords = [label, statuteLabel.split(" ")[0], "ZPP FBiH", court]
        related = extractArticles(raw)
        if (related.length === 0) related = [`čl. ${statuteTag}`]
      }

      blocks.push(`  {
    jurisdiction: "bih_fbih",
    court: ${tsEscape(court)},
    court_level: ${tsEscape(court_level)},
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
