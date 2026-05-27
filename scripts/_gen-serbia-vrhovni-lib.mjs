import fs from "fs"
import path from "path"
import {
  prepareText as sharedPrepareText,
  extractObrazlozenje as sharedExtractObrazlozenje,
} from "./_gen-prepare-text.mjs"

const CASE_NUM_RE =
  /\b(Rev2?|Us|Už|Uvp|Uv|Gž\d?|Gzz|Kzz|Kž\d?\s*(?:Po\d?\s*)?|Su|Iu|IIu|IIIu|IUz|KPo\d?|Gž2?)\s*[\w\-\.]*\s*\d+\s*\/\s*\d{2,4}\b/gi

export function createSerbiaGenerator(cfg) {
  const {
    title,
    label,
    legal_area,
    defaultQ,
    statuteTag,
    statuteLabel,
    echr = false,
    multiDecision = false,
    constitutional = false,
  } = cfg

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

  function prepareText(raw) {
    return sharedPrepareText(scrubCyrillicRuns(raw))
  }

  function extractObrazlozenje(text) {
    return sharedExtractObrazlozenje(scrubCyrillicRuns(text))
  }

  function normCase(fn) {
    return fn
      .replace(/\.txt$/i, "")
      .replace(/\.pdf$/i, "")
      .replace(/_/g, " ")
      .replace(/,/g, "")
      .replace(/\s+/g, " ")
      .trim()
  }

  function normalizeCaseNumber(n) {
    return n.replace(/\s+/g, " ").replace(/\s*\/\s*/g, "/").trim()
  }

  function caseNumberFromFilename(fn) {
    const base = path.basename(fn, path.extname(fn))
    const echrM =
      base.match(/(\d{4,6})-(\d{2})/) ||
      base.match(/(\d{4,6})_(\d{2})/) ||
      base.match(/br[_\s-]*(\d{4,6})[_\s\/-]*(\d{2})/i)
    if (echrM) return `${echrM[1]}/${echrM[2]}`
    const vs = base.match(/\b(Us|Už|Rev2?|Gž\d?|Kzz)\s*(\d+)\s*[-_]\s*(\d{2,4})\b/i)
    if (vs) {
      const y = vs[3].length === 2 ? vs[3] : vs[3].slice(-2)
      return normalizeCaseNumber(`${vs[1]} ${vs[2]}/${y}`)
    }
    return null
  }

  function caseNumberFromText(raw, fallback) {
    const head = prepareText(raw.slice(0, 8000))
    if (echr) {
      const em =
        head.match(/[Pp]redstavk[a]?\s*broj\s*(\d+)\/(\d+)/i) ||
        head.match(/[Aa]pplication\s*(?:no\.?|number)?\s*(\d+)\/(\d+)/i)
      if (em) return `${em[1]}/${em[2]}`
    }
    const m =
      head.match(/Broj\s*:\s*([0-9\-\sA-Za-zČĆŽŠĐčćžšđ\.]+)/i) ||
      head.match(/\b(Rev2?|Us|Už|Uvp|Uv|Gž\d?|Gzz|Kzz|Kž\d?\s*(?:Po\d?\s*)?|Su)\s*[\w\-\.]*\s*\d+\s*\/\s*\d{2,4}\b/i)
    if (m) {
      const n = normalizeCaseNumber(m[1] ? scrubCyrillicRuns(cyrToLatin(m[1])) : m[0])
      if (n.length >= 5) return n.slice(0, 90)
    }
    return normalizeCaseNumber(fallback)
  }

  function yearFromStem(stem) {
    const m =
      stem.match(/(?:Rev|Us|Už|Gž|Gzz|Kzz)-?(\d{2})(?:\s|$|\/)/i) ||
      stem.match(/\/(\d{2})\b/) ||
      stem.match(/\s(\d{2})\s/)
    if (!m) return null
    const y = +m[1]
    return `${y >= 50 ? 1900 + y : 2000 + y}-01-01`
  }

  function detectCourt(raw) {
    const head = prepareText(raw.slice(0, 12000))
    if (echr || /Evropski\s+sud\s+za\s+ljudska\s+prava|EUROPEAN\s+COURT\s+OF\s+HUMAN\s+RIGHTS/i.test(head))
      return { court: "Evropski sud za ljudska prava", court_level: "constitutional" }
    if (/Ustavni\s+sud\s+Srbije|Уставни\s+суд\s+Србије/i.test(head))
      return { court: "Ustavni sud Srbije", court_level: "constitutional" }
    if (/Vrhovni\s+kasacioni\s+sud|Врховни\s+касациони\s+суд/i.test(head))
      return { court: "Vrhovni kasacioni sud Srbije", court_level: "supreme" }
    if (/Upravni\s+sud/i.test(head))
      return { court: "Upravni sud", court_level: "administrative" }
    const ap = head.match(/Apelacioni\s+sud\s+(?:u\s+)?[A-ZČĆŽŠĐ][^\n,]{0,45}/i)
    if (ap) return { court: ap[0].replace(/\s+/g, " ").trim(), court_level: "appellate" }
    const vs = head.match(/Viši\s+sud\s+(?:u\s+)?[A-ZČĆŽŠĐ][^\n,]{0,45}/i)
    if (vs) return { court: vs[0].replace(/\s+/g, " ").trim(), court_level: "high" }
    if (constitutional)
      return { court: "Ustavni sud Srbije", court_level: "constitutional" }
    return { court: "Vrhovni sud Srbije", court_level: "supreme" }
  }

  function firstDecisionDate(text) {
    const lat = prepareText(text.slice(0, 12000))
    const months = {
      januar: 1, februar: 2, mart: 3, april: 4, maj: 5, jun: 6, june: 6,
      jul: 7, july: 7, avgust: 8, august: 8, septembar: 9, september: 9,
      oktobar: 10, october: 10, novembar: 11, november: 11, decembar: 12, december: 12,
    }

    function isoFromNumeric(dayS, monthS, yearS) {
      let day = +dayS
      const month = +monthS
      const year = +yearS
      if (!year || !month || Number.isNaN(month)) return null
      if (day === 0) day = 1
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }

    const bg = lat.match(/Beograd[u]?[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i)
    if (bg) return isoFromNumeric(bg[1], bg[2], bg[3])

    const named = lat.match(
      /(\d{1,2})\s*\.?\s*(januar|februar|mart|april|maj|jun|jul|avgust|septembar|oktobar|novembar|decembar|june|july|august|september|october|november|december)[a-z]*\s+(\d{4})/i,
    )
    if (named) {
      const mo = months[named[2].toLowerCase()] || 1
      let day = +named[1]
      if (day === 0) day = 1
      return `${named[3]}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }

    const generic = lat.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
    if (generic) return isoFromNumeric(generic[1], generic[2], generic[3])

    return null
  }


  function extractIzrekaUtf8(text) {
    const spacedObrazlozenje = /О\s+б\s+р\s+а\s+з\s+л\s+о\s+ж\s+е\s+њ\s+е/i
    const ix = text.search(spacedObrazlozenje)
    const chunk = ix === -1 ? text : text.slice(0, ix)
    const pres = /П\s+Р\s+Е\s+С\s+У\s+Д\s+У/i
    const rjes = /Р\s+Ј\s+Е\s+Ш\s+Е\s+Њ\s+Е/i
    const pi = chunk.search(pres)
    const ri = chunk.search(rjes)
    const start = pi === -1 ? (ri === -1 ? 0 : ri) : pi
    if (start === 0 && pi === -1 && ri === -1) {
      const lat = prepareText(chunk)
      const iz =
        lat.match(/IZ\s+REKE[\s\S]{0,8000}/i) ||
        lat.match(/UTVRĐUJE[\s\S]{0,8000}/i)
      if (iz) return iz[0]
      return prepareText(chunk).replace(/\s+/g, " ").trim()
    }
    return prepareText(chunk.slice(start)).replace(/\s+/g, " ").trim()
  }

  function outcomeFromText(full, izLat) {
    const iz = izLat.slice(0, 1800)
    if (/Uvažava\s+se|Usvaja\s+se|USVOJENA|проглашава\s+представку\s+допуштеном/i.test(iz))
      return /ukida|vraća|ponovno|прекида/i.test(iz) ? "remanded" : "partially"
    if (/Odbija\s+se|ODBIA|одбија\s+преостали/i.test(iz)) return "defendant_won"
    if (/Potvrđuje|POTVRĐUJE/i.test(iz)) return "plaintiff_won"
    if (/Preinačava/i.test(iz)) return "partially"
    if (/došlo\s+je\s+do\s+povrede|UTVRĐUJE\s+da\s+je\s+došlo/i.test(iz)) return "plaintiff_won"
    return "partially"
  }

  function extractArticles(cyr) {
    const set = new Set()
    let m
    const re = /члана\s+(\d+)\.\s*став\s+(\d+)/gi
    while ((m = re.exec(cyr))) set.add(`čl. ${m[1]}. st. ${m[2]}. ${statuteTag || "RS"}`)
    const reOne = /члана\s+(\d+)\b/gi
    while ((m = reOne.exec(cyr))) {
      const n = +m[1]
      if (n >= 1 && n <= 999) set.add(`čl. ${m[1]}. ${statuteTag || "RS"}`)
    }
    const lat = prepareText(cyr.slice(0, 25000))
    const reLat = /čl\.?\s*(\d+)\b/gi
    while ((m = reLat.exec(lat))) set.add(`čl. ${m[1]}. ${statuteTag || "RS"}`)
    return [...set].slice(0, 10)
  }

  function summarize(full, izrekaCyr, caseNum) {
    const izLat = prepareText(izrekaCyr).replace(/\s+/g, " ").trim()
    let cp = izLat.replace(
      /^\s*(P\s*R\s*E\s*S\s*U\s*D\s*A|R\s*J\s*E\s*Š\s*E\s*N\s*J\s*E|PRESUDA|RJEŠENJE)\s*/i,
      "",
    )

    const looksLikeDispositif =
      cp.length >= 80 &&
      /(Odbija|Usvaja|Uvažava|Potvrđuje|Preinačava|utvrđuje|UTVRĐUJE|proglašava|UKIDA|potvrđuje)/i.test(
        cp,
      )

    if (!looksLikeDispositif) {
      const obraz = extractObrazlozenje(full)
      if (obraz.length >= 200) {
        cp = obraz
      } else {
        const fullLat = prepareText(full)
        const holding =
          fullLat.match(
            /(?:pravno\s+shvaćanje|sud\s+je\s+zauzeo|utvrđuje\s+da|UTVRĐUJE\s+DA|Pravno\s+shvaćanje)[\s\S]*/i,
          ) || fullLat.match(/UTVRĐUJE[\s\S]*/i)
        cp = holding ? holding[0].trim() : fullLat
      }
    }

    const obraz = extractObrazlozenje(full)
    const reasoning =
      obraz.length >= 120
        ? obraz
        : `Sud ${echr ? "u Strazburu" : "u Srbiji"} razmatra ${title} u predmetu ${caseNum}, primenjujući ${statuteLabel || "važeće propise Republike Srbije"}.`

    const head = cp.slice(0, 180) || prepareText(full.slice(0, 200))
    return {
      legal_question: defaultQ.replace("{case}", caseNum),
      court_position: cp,
      reasoning,
      headnote: head,
    }
  }

  function shouldSkipFile(fn, raw) {
    const base = path.basename(fn).toLowerCase()
    if (/deskriptor|pravilnik|prečišćen|preciscen|zakon_o_|otvorena-lista/i.test(base)) {
      const cites = prepareText(raw).match(CASE_NUM_RE)
      if (!cites || cites.length === 0) return true
    }
    return raw.trim().length < 80
  }

  function findCaseSegments(raw) {
    const text = prepareText(raw)
    if (!multiDecision) return [{ text: raw, caseHint: null }]

    const matches = []
    let m
    const re = new RegExp(CASE_NUM_RE.source, CASE_NUM_RE.flags)
    while ((m = re.exec(text))) {
      matches.push({ num: normalizeCaseNumber(m[0]), index: m.index })
    }
    if (matches.length <= 1) return [{ text: raw, caseHint: matches[0]?.num || null }]

    const segments = []
    const seen = new Set()
    for (let i = 0; i < matches.length; i++) {
      const num = matches[i].num
      if (seen.has(num)) continue
      seen.add(num)
      const start = Math.max(0, matches[i].index - 800)
      const end =
        i + 1 < matches.length
          ? Math.min(text.length, matches[i + 1].index)
          : text.length
      const slice = raw.slice(
        Math.max(0, start - 200),
        Math.min(raw.length, end + 200),
      )
      if (slice.trim().length >= 120) segments.push({ text: slice, caseHint: num })
    }
    return segments.length ? segments : [{ text: raw, caseHint: null }]
  }

  function tsEscape(s) {
    return JSON.stringify(s)
  }

  function generateBlocks(extractDir, skipSet) {
    const files = fs
      .readdirSync(extractDir)
      .filter((f) => f.endsWith(".txt") && f !== "_summary.json" && !skipSet.has(f))
      .sort()

    const blocks = []
    const seenCases = new Set()

    for (const f of files) {
      const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
      if (shouldSkipFile(f, raw)) continue

      const segments = findCaseSegments(raw)
      for (const seg of segments) {
        const stemFallback = normCase(f) + (seg.caseHint ? ` ${seg.caseHint}` : "")
        const stem =
          seg.caseHint ||
          caseNumberFromFilename(f) ||
          caseNumberFromText(seg.text, stemFallback)
        if (seenCases.has(stem)) continue
        seenCases.add(stem)

        const short = seg.text.trim().length < 200
        const { court, court_level } = detectCourt(seg.text)
        let decision_date =
          firstDecisionDate(seg.text) || yearFromStem(stem) || "2010-01-01"

        let outcome, legal_question, court_position, reasoning, headnote, keywords, related

        if (short) {
          outcome = "procedural"
          legal_question = `Kako je sud odlučio u predmetu ${stem}?`
          court_position =
            "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran ili tekst ima manje od 200 znakova."
          reasoning = `Izvor pripada kategoriji ${title} Vrhovnog suda Srbije. Metapodaci: broj predmeta ${stem}.`
          keywords = ["skenirani PDF", label, court]
          related = [`čl. ${statuteTag || "RS"}`]
          headnote = "Skenirani izvor — potrebna ručna/OCR ekstrakcija."
        } else {
          const izCyr = extractIzrekaUtf8(seg.text)
          const izLatFull = prepareText(izCyr)
          outcome = outcomeFromText(seg.text, izLatFull)
          const sum = summarize(seg.text, izCyr, stem)
          legal_question = sum.legal_question
          court_position = sum.court_position
          reasoning = sum.reasoning
          headnote = sum.headnote
          keywords = [label, court, statuteTag || "RS"].filter(Boolean)
          related = extractArticles(seg.text.slice(0, 25000))
          if (related.length === 0) related = [`čl. ${statuteTag || "RS"}`]
        }

        blocks.push(`  {
    jurisdiction: "serbia",
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
    }
    return { blocks }
  }

  return { normCase, generateBlocks }
}
