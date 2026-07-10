import fs from "fs"
import { prepareText, summarizeBihCase } from "./_gen-prepare-text.mjs"
import path from "path"
import { isBihUtilityStem, shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

const DEFAULT_COURT = "Apelacioni sud Brčko Distrikta BiH"
const DEFAULT_COURT_LEVEL = "appellate"
const JURISDICTION = "bih_brcko"
const STATUTE_TAG = "ZPOUA Brčko"
const STATUTE_LABEL =
  "Zakon o postupku ocjene usklađenosti pravnih akata Brčko distrikta BiH i rješavanja sukoba nadležnosti"

export function safePdfStem(pdfPath) {
  let base = path.basename(pdfPath, ".pdf")
  base = base.replace(/[^\w\s\-().,]/g, "_")
  return base
}

export function createBrckoOcjeneGenerator(cfg) {
  const { title, label, defaultQ, legal_area, reviewKind } = cfg

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return s
  }

  const CASE_NUM_RE = /(\d{3}-\d-(?:OUS|OUZ|SN|Su)-\d{2}-\d{6})/i

  function caseNumberFromStem(stem) {
    const m =
      stem.match(CASE_NUM_RE) ||
      stem.match(/(\d{2}\s+0\s+U\s+[\d\s]+?(?:Ous|Ouz|Sn|Su))/i)
    if (m) return m[1].replace(/\s+/g, " ").trim()
    return stem
  }

  function caseNumberFromText(raw, fallback) {
    const head = raw.slice(0, 4000)
    const m =
      head.match(new RegExp(`BROJ\\s*:?\\s*${CASE_NUM_RE.source}`, "i")) ||
      head.match(CASE_NUM_RE) ||
      head.match(/(\d{2}\s+0\s+U\s+[\d\s]+?(?:Ous|Ouz|Sn|Su))/i)
    if (m) return (m[1] || m[0]).replace(/\s+/g, " ").trim()
    return fallback
  }

  function yearFromStem(stem) {
    const m =
      stem.match(/-(?:OUS|OUZ|SN|Su)-(\d{2})-/i) ||
      stem.match(/_(\d{2})_Ous$/i) ||
      stem.match(/\s(\d{2})\s+Ous$/i) ||
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
    const head = text.slice(0, 6000)
    const m = head.match(
      /Br\s*č\s*ko[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i,
    )
    if (m) return normalizeDate(+m[3], +m[2], +m[1])
    const mSed = head.match(
      /sjednici\s+vije[ćc]a\s+odr[žz]anoj\s+dana\s+(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i,
    )
    if (mSed) return normalizeDate(+mSed[3], +mSed[2], +mSed[1])
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
    const chunk = ix === -1 ? text.slice(0, 10000) : text.slice(0, ix)
    const rjes = chunk.search(/R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|RJEŠENJE/i)
    const pres = chunk.search(/P\s*R\s*E\s*S\s*U\s*D\s*U|PRESUDA/i)
    const pravno = chunk.search(
      /PRAVNO\s+SHVATANJE|PRAVNA\s+SHVATANJA|PRAVNI\s+STAV|Opšta\s+sjednica|razmatrala\s+pravna\s+pitanja/i,
    )
    const start =
      pravno !== -1 ? pravno : pres !== -1 ? pres : rjes !== -1 ? rjes : 0
    return prepareText(chunk.slice(start))
  }

  function outcomeFromIzreka(iz, full) {
    if (reviewKind === "sukob") {
      if (/ODBACUJU\s+SE\s+zahtjev/i.test(iz) && /UTVRĐUJE\s+SE/i.test(iz))
        return "partially"
      if (/ODBACUJU\s+SE/i.test(iz)) return "procedural"
      if (/UTVRĐUJE\s+SE\s+da\s+je\s+nadležn/i.test(iz)) return "partially"
      return "partially"
    }
    if (reviewKind === "pravna_shvatanja") {
      if (/PRAVNO\s+SHVATANJE|PRAVNA\s+SHVATANJA|PRAVNI\s+STAV/i.test(iz + full.slice(0, 3000)))
        return "partially"
      return "partially"
    }
    if (/ODBACUJE\s+SE\s+inicijativ|inicijativa\s+se\s+odbacuje/i.test(iz)) return "procedural"
    if (/ODBACUJE\s+SE/i.test(iz)) return "procedural"
    if (/ODBIJA\s+SE\s+inicijativ|inicijativa\s+se\s+odbija|Ne\s+prihvata\s+se\s+inicijativ/i.test(iz))
      return "defendant_won"
    if (/ODBIJA\s+SE\s+prijedlog/i.test(iz)) return "defendant_won"
    if (
      /UTVRĐUJE\s+SE\s+da\s+[^.]{0,200}(nije\s+statutarn|nisu\s+u\s+skladu|nije\s+u\s+skladu|nije\s+zakonit|nisu\s+zakonit|protivan|protivn)/i.test(
        iz,
      )
    )
      return "plaintiff_won"
    if (
      /UTVRĐUJE\s+SE\s+da\s+[^.]{0,200}(jest\s+statutarn|jesu\s+u\s+skladu|jest\s+u\s+skladu|jest\s+zakonit|jesu\s+zakonit)/i.test(
        iz,
      )
    )
      return "defendant_won"
    if (/prestaju\s+da\s+važe|prestaje\s+da\s+važi/i.test(iz)) return "plaintiff_won"
    if (/ODBACUJE\s+SE\s+prijedlog/i.test(iz)) return "defendant_won"
    if (/ODBACUJE\s+SE/i.test(iz)) return "procedural"
    if (/UTVRĐUJE\s+SE/i.test(iz)) return "partially"
    return "partially"
  }

  function extractArticles(text) {
    const set = new Set()
    let m
    const re = /člana?\s+(\d+)\.?\s*stav\s+(\d+)/gi
    while ((m = re.exec(text))) {
      const snip = text.slice(Math.max(0, m.index - 220), m.index + 120)
      if (/Statut\s+Brčko|Statuta\s+Brčko/i.test(snip)) set.add(`čl. ${m[1]}. st. ${m[2]}. Statut Brčko`)
      else if (/ZPOUA|ocjene\s+usklađenosti\s+pravnih\s+akata/i.test(snip))
        set.add(`čl. ${m[1]}. st. ${m[2]}. ${STATUTE_TAG}`)
      else set.add(`čl. ${m[1]}. st. ${m[2]}. ${STATUTE_TAG}`)
    }
    const reOne = /člana?\s+(\d+)/gi
    while ((m = reOne.exec(text.slice(0, 25000)))) {
      const snip = text.slice(Math.max(0, m.index - 150), m.index + 80)
      if (/Statut/i.test(snip)) set.add(`čl. ${m[1]}. Statut Brčko`)
      else if (/ZPOUA|usklađenosti\s+pravnih/i.test(snip)) set.add(`čl. ${m[1]}. ${STATUTE_TAG}`)
    }
    if (/Statut\s+Brčko/i.test(text.slice(0, 8000))) set.add("čl. Statut Brčko")
    if (/ZPOUA|ocjene\s+usklađenosti/i.test(text.slice(0, 8000))) set.add(`čl. ${STATUTE_TAG}`)
    return [...set].slice(0, 10)
  }

  function cleanSnippet(s, max) {
    const t = s.replace(/\s+/g, " ").trim()
    if (typeof max === "number" && max > 0) return t.slice(0, max)
    return t
  }

  function summarize(full, iz) {
    const sum = summarizeBihCase(full, iz, `Apelacioni sud Brčko Distrikta BiH odlučuje u postupku ${title}, primjenjujući ${STATUTE_LABEL}.`)
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
    const case_number = caseNumberFromStem(stem)
    return `  {
    jurisdiction: ${tsEscape(JURISDICTION)},
    court: ${tsEscape(DEFAULT_COURT)},
    court_level: ${tsEscape(DEFAULT_COURT_LEVEL)},
    case_number: ${tsEscape(case_number)},
    decision_date: ${tsEscape(decision_date)},
    legal_area: ${tsEscape(legal_area)},
    legal_question:
      ${tsEscape(`Kako je Apelacioni sud Brčko Distrikta BiH odlučio u predmetu ${case_number} (${title})?`)},
    court_position:
      ${tsEscape("PDF izvor nema valjanu strukturu ili je isključivo skeniran; automatska ekstrakcija teksta nije uspjela.")},
    reasoning:
      ${tsEscape(`Predmet ${case_number} pripada kategoriji ${title}. Za pun sadržaj odluke potrebno je OCR ili ručno čitanje izvornog PDF-a.`)},
    keywords: ${JSON.stringify(["nevaljan PDF", "skenirani izvor", label, STATUTE_TAG])},
    related_articles: [${tsEscape(`čl. ${STATUTE_TAG}`)}],
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
      const case_number = caseNumberFromText(raw, caseNumberFromStem(stem))
      if (shouldSkipBihUtilityFile(f, case_number)) continue
      if (seenStems.has(case_number)) continue
      seenStems.add(case_number)

      const short = raw.trim().length < 200
      let decision_date = firstDecisionDate(raw) || yearFromStem(stem) || "2015-01-01"

      let outcome, legal_question, court_position, reasoning, headnote, keywords, related

      if (short) {
        outcome = "procedural"
        legal_question =
          defaultQ ||
          `Kako je Apelacioni sud Brčko Distrikta BiH odlučio u predmetu ${case_number}?`
        court_position =
          "Iz tekstualnog izvoda nije pouzdano izvučen sadržaj odluke jer tekst ima manje od 200 znakova (skenirani PDF ili neuspjela ekstrakcija)."
        reasoning =
          "Automatska ekstrakcija ne omogućava pouzdano čitanje izreke; potrebno je ponovo obraditi izvorni PDF ili OCR."
        keywords = ["kratak izvod", label, STATUTE_TAG, DEFAULT_COURT]
        related = [`čl. ${STATUTE_TAG}`]
        headnote = "Nedovoljan tekst izvoda."
      } else {
        const iz = extractIzreka(raw)
        outcome = outcomeFromIzreka(iz, raw)
        const sum = summarize(raw, iz)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        keywords = [label, reviewKind || "ocjena", STATUTE_TAG, DEFAULT_COURT]
        related = extractArticles(raw)
        related = [...new Set(related)].slice(0, 10)
      }

      blocks.push(`  {
    jurisdiction: ${tsEscape(JURISDICTION)},
    court: ${tsEscape(DEFAULT_COURT)},
    court_level: ${tsEscape(DEFAULT_COURT_LEVEL)},
    case_number: ${tsEscape(case_number)},
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
      const cn = caseNumberFromStem(stem)
      if (!seenStems.has(cn)) {
        seenStems.add(cn)
        blocks.push(fallbackBlock(stem))
      }
    }

    return { blocks }
  }

  return { normCase, generateBlocks, fallbackBlock, caseNumberFromStem, caseNumberFromText }
}
