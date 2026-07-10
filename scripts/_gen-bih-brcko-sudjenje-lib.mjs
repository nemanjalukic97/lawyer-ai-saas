import fs from "fs"
import { summarizeBihCase } from "./_gen-prepare-text.mjs"
import path from "path"
import { isBihUtilityStem, shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

const DEFAULT_COURT = "Apelacioni sud Brčko Distrikta BiH"
const JURISDICTION = "bih_brcko"

export function safePdfStem(pdfPath) {
  let base = path.basename(pdfPath, ".pdf")
  base = base
    .replace(/Zupž/gi, "__ZUPZ__")
    .replace(/Zup/gi, "__ZUP__")
    .replace(/Srr/gi, "__SRR__")
  base = base.replace(/[^\w\s\-().,]/g, "_")
  return base
}

export function createBrckoSudjenjeGenerator(cfg) {
  const { title, label, legal_area, defaultQ } = cfg

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/__ZUPZ__/gi, "Zupž")
      .replace(/__ZUP__/gi, "Zup")
      .replace(/__SRR__/gi, "Srr")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return s
  }

  function caseNumberFromText(raw, fallback) {
    const head = raw.slice(0, 4000)
    const m =
      head.match(/Broj\s*:?\s*([0-9][0-9\sA-Za-zČĆŽŠĐčćžšđ\-]+?)\s+Brčko/i) ||
      head.match(/(9[67]\s+0\s+Zup\s+[\d\s]+?\d{2}\s+Zupž?)/i) ||
      head.match(/(96\s+0\s+Srr\s+[\d\s]+?\d{2}\s+Srr)/i)
    if (m) {
      const n = m[1].replace(/\s+/g, " ").trim()
      if (n.length >= 8) return n.slice(0, 90)
    }
    return fallback
  }

  function yearFromStem(stem) {
    const m =
      stem.match(/(?:Zupž|Zup|Srr)-(\d{2})(?:\s|$|\.)/i) ||
      stem.match(/_(\d{2})_(?:Zup|Srr)/i) ||
      stem.match(/\s(\d{2})\s+Zup/i)
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
    const head = text.slice(0, 6000)
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

  function outcomeRazumniRok(full, iz) {
    const t = iz.replace(/\s+/g, " ")
    if (/Odbacuje\s+se\s+zahtjev/i.test(t)) return "procedural"
    if (/Uvažava\s+se\s+zahtjev|Zahtjev\s+se\s+uvažava/i.test(t)) {
      if (/ukida|vraća\s+predmet|ponovno/i.test(t)) return "remanded"
      return "plaintiff_won"
    }
    if (/Odbija\s+se\s+k?\s*ao\s+neosnovan/i.test(t) && /žalb/i.test(t)) return "defendant_won"
    if (/Odbija\s+se\s+žalb/i.test(t) && /potvrđuje/i.test(t)) return "defendant_won"
    if (/Odbija\s+se\s+k?\s*ao\s+neosnovan/i.test(t)) return "defendant_won"
    if (/Potvrđuje\s+se/i.test(t)) return "defendant_won"
    if (/Uvažava\s+se\s+žalb/i.test(t)) return "plaintiff_won"
    if (/djelimičn\w*\s+uvažava|UVAŽAVA.*PREINAČAVA/i.test(t)) return "partially"
    if (/ukida|vraća\s+na\s+ponovno|vraća\s+predmet/i.test(t)) return "remanded"
    return "partially"
  }

  function extractArticles(text) {
    const set = new Set()
    let m
    const re = /člana?\s+(\d+)\.?\s*stav\s+(\d+)/gi
    while ((m = re.exec(text))) {
      const snip = text.slice(Math.max(0, m.index - 220), m.index + 100)
      const isZzzrr =
        /zaštit\w*\s+prava\s+na\s+suđenje\s+u\s+razumnom\s+roku|ZZZRR|Službeni glasnik Brčko distrikta.*2\/21/i.test(
          snip,
        )
      if (isZzzrr) set.add(`čl. ${m[1]}. st. ${m[2]}. ZZZRR Brčko`)
      else if (/EKLJP|Evropsk\w+\s+konvencij/i.test(snip)) set.add(`čl. ${m[1]}. st. ${m[2]}. EKLJP`)
      else set.add(`čl. ${m[1]}. st. ${m[2]}. ZZZRR Brčko`)
    }
    const reOne = /člana?\s+(\d+)/gi
    while ((m = reOne.exec(text.slice(0, 30000)))) {
      const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
      if (/zaštit\w*\s+prava|ZZZRR|2\/21/i.test(snip)) set.add(`čl. ${m[1]}. ZZZRR Brčko`)
      else if (/EKLJP|konvencij/i.test(snip)) set.add(`čl. ${m[1]}. EKLJP`)
    }
    if (/član\w*\s+6\.|EKLJP/i.test(text.slice(0, 12000))) set.add("čl. 6. EKLJP")
    return [...set].slice(0, 10)
  }

  function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

  function summarize(full, iz) {
    const sum = summarizeBihCase(full, iz, `Sud ocjenjuje zahtjev za zaštitu prava na suđenje u razumnom roku ili žalbu predlagača u predmetu ${title}, primjenjujući Zakon o zaštiti prava na suđenje u razumnom roku Brčko Distrikta BiH (ZZZRR Brčko) i odredbe EKLJP.`)
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
      ${tsEscape(`Kako je Apelacioni sud Brčko Distrikta BiH odlučio o zahtjevu za zaštitu prava na suđenje u razumnom roku u predmetu ${stem}?`)},
    court_position:
      ${tsEscape("PDF izvor nema valjanu strukturu ili je isključivo skeniran; automatska ekstrakcija teksta nije uspjela.")},
    reasoning:
      ${tsEscape(`Predmet ${stem} pripada kategoriji ${title}. Za pun sadržaj odluke potrebno je OCR ili ručno čitanje izvornog PDF-a.`)},
    keywords: ${JSON.stringify(["nevaljan PDF", "skenirani izvor", label])},
    related_articles: ["čl. ZZZRR Brčko"],
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
      const decision_date = firstDecisionDate(raw) || yearFromStem(stem) || "2015-01-01"

      let outcome, legal_question, court_position, reasoning, headnote, keywords, related

      if (short) {
        outcome = "procedural"
        legal_question = `Kako je sud odlučio o zahtjevu za zaštitu prava na suđenje u razumnom roku u predmetu ${stem}?`
        court_position =
          "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran (bez tekstualnog sloja) ili tekst ima manje od 200 znakova."
        reasoning = `Prilog pripada kategoriji ${title} pred Apelacionim sudom Brčko Distrikta BiH. Za puno obrazloženje potrebno je OCR ili ručno čitanje skena. Metapodaci: broj predmeta ${stem}.`
        keywords = ["skenirani PDF", label, DEFAULT_COURT]
        related = ["čl. ZZZRR Brčko"]
        headnote = "Skenirani izvor — potrebna ručna/OCR ekstrakcija."
      } else {
        const iz = extractIzreka(raw)
        outcome = outcomeRazumniRok(raw, iz)
        const sum = summarize(raw, iz)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        keywords = ["razumni rok", label, "ZZZRR Brčko", "EKLJP", DEFAULT_COURT]
        related = extractArticles(raw)
        if (related.length === 0) related = ["čl. ZZZRR Brčko"]
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
