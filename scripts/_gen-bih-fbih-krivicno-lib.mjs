import fs from "fs"
import { summarizeBihCase } from "./_gen-prepare-text.mjs"
import path from "path"
import { isBihUtilityStem, shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

const DEFAULT_COURT = "Vrhovni sud Federacije Bosne i Hercegovine"

export function safePdfStem(pdfPath) {
  let base = path.basename(pdfPath, ".pdf")
  base = base
    .replace(/Kžž/gi, "__KZZ__")
    .replace(/Kžk/gi, "__KZK__")
    .replace(/Kvlz/gi, "__KVLZ__")
    .replace(/Kž/gi, "__KZ__")
  base = base.replace(/[^\w\s\-().,]/g, "_")
  return base
}

export function createFbihKrivicnoGenerator(cfg) {
  const { title, label, defaultQ } = cfg

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/__KZZ__/gi, "Kžž")
      .replace(/__KZK__/gi, "Kžk")
      .replace(/__KZ__/gi, "Kž")
      .replace(/__KVLZ__/gi, "Kvlz")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    if (/\sK\s*$/i.test(s)) s = s.replace(/\sK\s*$/i, " Kž")
    if (/\sK\s+(\d+)\s*$/i.test(s)) s = s.replace(/\sK\s+(\d+)\s*$/i, " Kž $1")
    s = s.replace(/^(\d{2})\s+0\s+(\d)/, "$1 0 K $2")
    return s
  }

  function yearFromStem(stem) {
    const m = stem.match(/\s(\d{2})\s+K[žzžk]/i) || stem.match(/\s(\d{2})\s+Kvlz/i)
    if (!m) return null
    const y = +m[1]
    const year = y >= 50 ? 1900 + y : 2000 + y
    return `${year}-01-01`
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
    const head = raw.slice(0, 5000)
    const vs =
      /Vrhovni\s+sud\s+Federacije\s+Bosne\s+i\s+Hercegovine/i.test(head) ||
      /VRHOVNI\s+SUD\s+FEDERACIJE/i.test(head)
    if (vs) return { court: DEFAULT_COURT, court_level: "supreme" }
    const kant = head.match(/Kantonalni\s+sud\s+[^\n,]{0,60}/i)
    if (kant) return { court: kant[0].trim(), court_level: "appellate" }
    const opc = head.match(/Općinski\s+sud\s+[^\n,]{0,60}/i)
    if (opc) return { court: opc[0].trim(), court_level: "basic" }
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

  function appealParty(full) {
    const intro = full.slice(0, 4500)
    if (/žalb\w*\s+branitelj|branitelj\s+optužen/i.test(intro)) return "defense"
    if (/žalb\w*\s+(?:kantonalnog|federalnog|državnog)?\s*javn\w*\s+tužil/i.test(intro))
      return "prosecutor"
    if (/zahtjev\s+za\s+zaštitu\s+zakonitosti.*?tužil/i.test(intro)) return "prosecutor"
    if (/branitelj.*?zaštitu\s+zakonitosti/i.test(intro)) return "defense"
    return "unknown"
  }

  function outcomeFromIzreka(iz, full) {
    const party = appealParty(full)
    if (/djelimičn\w*\s+uvažavanj\w*\s+žalb/i.test(iz)) {
      if (/ukida|ponovno\s+suđenje/i.test(iz))
        return party === "defense" ? "defendant_won" : party === "prosecutor" ? "plaintiff_won" : "remanded"
      return "partially"
    }
    if (/Uvažava\s+se\s+žalb/i.test(iz)) {
      if (/ukida|ponovno/i.test(iz))
        return party === "defense" ? "defendant_won" : party === "prosecutor" ? "plaintiff_won" : "remanded"
      return party === "defense" ? "defendant_won" : "partially"
    }
    if (/Odbija\s+se\s+žalb\w*\s+kao\s+neosnovan/i.test(iz))
      return party === "defense" ? "plaintiff_won" : party === "prosecutor" ? "defendant_won" : "plaintiff_won"
    if (/Odbija\s+se\s+optužb/i.test(iz)) return "defendant_won"
    if (/Zahtjev\s+za\s+zaštitu\s+zakonitosti\s+se\s+uvažava|Uvažava\s+se\s+zahtjev/i.test(iz))
      return "remanded"
    if (/Odbija\s+se\s+zahtjev\s+za\s+zaštitu|zaštitu\s+zakonitosti\s+se\s+odbija/i.test(iz))
      return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
    if (/Potvrđuje\s+se/i.test(iz)) return "plaintiff_won"
    if (/Preinačava\s+se/i.test(iz)) return "partially"
    if (/ukida\s+se\s+presud/i.test(iz) && /ponovno/i.test(iz)) return "remanded"
    return "partially"
  }

  function extractArticles(text) {
    const set = new Set()
    let m
    const re = /člana?\s+(\d+)\.?\s*stav\s+(\d+)/gi
    while ((m = re.exec(text))) {
      const snip = text.slice(Math.max(0, m.index - 200), m.index + 100)
      const isZkp = /ZKP\s+FBiH|Zakona\s+o\s+krivičnom\s+postupku/i.test(snip)
      if (isZkp) set.add(`čl. ${m[1]}. st. ${m[2]}. ZKP FBiH`)
      else set.add(`čl. ${m[1]}. st. ${m[2]}. KZ FBiH`)
    }
    const reOne = /člana?\s+(\d+)/gi
    while ((m = reOne.exec(text.slice(0, 20000)))) {
      const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
      if (/ZKP|postupk/i.test(snip)) set.add(`čl. ${m[1]}. ZKP FBiH`)
      else set.add(`čl. ${m[1]}. KZ FBiH`)
    }
    return [...set].slice(0, 10)
  }

  function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

  function summarize(full, iz) {
    const sum = summarizeBihCase(
      full,
      iz,
      `Sud ocjenjuje žalbene ili ZZL prigovore u predmetima ${title}, primjenjujući KZ FBiH i ZKP FBiH.`,
    )
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
    legal_area: "criminal",
    legal_question:
      ${tsEscape(`Kako je Vrhovni sud FBiH odlučio u predmetu ${stem} (${title})?`)},
    court_position:
      ${tsEscape("PDF izvor nema valjanu strukturu ili je isključivo skeniran; automatska ekstrakcija teksta nije uspjela.")},
    reasoning:
      ${tsEscape(`Predmet ${stem} pripada kategoriji ${title}. Za pun sadržaj odluke potrebno je OCR ili ručno čitanje izvornog PDF-a.`)},
    keywords: ${JSON.stringify(["nevaljan PDF", "skenirani izvor", label])},
    related_articles: [],
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
      const stem = normCase(f)
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
          "Iz tekstualnog izvoda nije pouzdano izvučen sadržaj odluke jer tekst ima manje od 200 znakova (skenirani PDF ili neuspjela ekstrakcija)."
        reasoning =
          "Automatska ekstrakcija ne omogućava pouzdano čitanje izreke; potrebno je ponovo obraditi izvorni PDF ili OCR."
        keywords = ["kratak izvod", label, "potrebno OCR"]
        related = []
        headnote = "Nedovoljan tekst izvoda."
      } else {
        const iz = extractIzreka(raw)
        outcome = outcomeFromIzreka(iz, raw)
        const sum = summarize(raw, iz)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        const isZzl = /Kvlz|Kžl|zaštit\w*\s+zakonitosti/i.test(stem + raw.slice(0, 800))
        keywords = isZzl
          ? ["zaštita zakonitosti", label, "KZ FBiH", "ZKP FBiH"]
          : ["žalba", label, "KZ FBiH", "ZKP FBiH", court]
        related = extractArticles(raw)
        if (/zaštit\w*\s+zakonitosti/i.test(raw)) related.push("čl. 422–428. ZKP FBiH")
        related = [...new Set(related)].slice(0, 10)
      }

      blocks.push(`  {
    jurisdiction: "bih_fbih",
    court: ${tsEscape(court)},
    court_level: ${tsEscape(court_level)},
    case_number: ${tsEscape(stem)},
    decision_date: ${tsEscape(decision_date)},
    legal_area: "criminal",
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
