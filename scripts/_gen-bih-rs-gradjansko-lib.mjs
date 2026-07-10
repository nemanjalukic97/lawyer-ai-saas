import fs from "fs"
import path from "path"
import { summarizeCyrillicCase } from "./_gen-prepare-text.mjs"
import { shouldSkipBihUtilityFile } from "./_bih-utility-skip.mjs"

export function createGradjanskoGenerator(cfg) {
  const { title, label, legal_area, defaultQ, statuteLabel, statuteTag } = cfg

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

  function normCase(fn) {
    let s = fn
      .replace(/\.txt$/i, "")
      .replace(/\.pdf$/i, "")
      .replace(/,/g, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    s = s.replace(/118-0--/g, "118-0-")
    return s
  }

  function caseNumberFromText(raw, fallback) {
    const head = raw.slice(0, 2500)
    const m =
      head.match(/Број\s*:\s*([0-9\-\sA-Za-zČĆŽŠĐčćžšđ\.]+)/i) ||
      head.match(/Broj\s*:\s*([0-9\-\sA-Za-z]+)/i)
    if (m) {
      const n = scrubCyrillicRuns(cyrToLatin(m[1])).replace(/\s+/g, " ").trim()
      if (n.length >= 8) return n.slice(0, 90)
    }
    return fallback
  }

  function yearFromStem(stem) {
    const m = stem.match(/(?:Rev|Gž|Gzz|P)-(\d{2})-/i) || stem.match(/\s(\d{2})\s/)
    if (!m) return null
    const y = +m[1]
    return `${y >= 50 ? 1900 + y : 2000 + y}-01-01`
  }

  function detectCourt(raw) {
    const head = scrubCyrillicRuns(cyrToLatin(raw.slice(0, 6000)))
    if (/Ustavni\s+sud\s+Republike\s+Srpske/i.test(head))
      return { court: "Ustavni sud Republike Srpske", court_level: "constitutional" }
    if (/Vrhovni\s+sud\s+Republike\s+Srpske/i.test(head))
      return { court: "Vrhovni sud Republike Srpske", court_level: "supreme" }
    const ok = head.match(/Okružni\s+sud\s+(?:u\s+)?[A-ZČĆŽŠĐ][^\n,]{0,50}/i)
    if (ok) return { court: ok[0].replace(/\s+/g, " ").trim(), court_level: "appellate" }
    const os = head.match(/Osnovni\s+sud\s+(?:u\s+)?[A-ZČĆŽŠĐ][^\n,]{0,50}/i)
    if (os) return { court: os[0].replace(/\s+/g, " ").trim(), court_level: "basic" }
    if (/Okružni\s+sud/i.test(head)) return { court: "Okružni sud", court_level: "appellate" }
    if (/Osnovni\s+sud/i.test(head)) return { court: "Osnovni sud", court_level: "basic" }
    return { court: "Vrhovni sud Republike Srpske", court_level: "supreme" }
  }

  function firstDecisionDate(text) {
    const lat = scrubCyrillicRuns(cyrToLatin(text.slice(0, 4500)))
    const m = lat.match(/Banja\s+Luk[a]?[^0-9]{0,80}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/i)
    if (m) {
      let day = +m[1]
      if (day === 0) day = 1
      return `${m[3]}-${m[2].padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }
    const m2 = lat.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.?\s*godine/i)
    if (m2) {
      let day = +m2[1]
      if (day === 0) day = 1
      return `${m2[3]}-${m2[2].padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }
    const m3 = lat.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
    if (m3) {
      let day = +m3[1]
      if (day === 0) day = 1
      return `${m3[3]}-${m3[2].padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }
    return null
  }

  function extractIzrekaUtf8(text) {
    const spacedObrazlozenje = /О\s+б\s+р\s+а\s+з\s+л\s+о\s+ж\s+е\s+њ\s+е/i
    const ix = text.search(spacedObrazlozenje)
    const chunk = ix === -1 ? text.slice(0, 7000) : text.slice(0, ix)
    const pres = /П\s+Р\s+Е\s+С\s+У\s+Д\s+У/i
    const rjes = /Р\s+Ј\s+Е\s+Ш\s+Е\s+Њ\s+Е/i
    const pi = chunk.search(pres)
    const ri = chunk.search(rjes)
    const start = pi === -1 ? (ri === -1 ? 0 : ri) : pi
    if (start === 0 && pi === -1 && ri === -1) return chunk
    return chunk.slice(start)
  }

  function civilParty(full) {
    const intro = scrubCyrillicRuns(cyrToLatin(full.slice(0, 4000)))
    if (/revizij\w*\s+tužitelj|o\s+reviziji\s+tužitelj|reviziju\s+tužitelj/i.test(intro)) return "plaintiff"
    if (/revizij\w*\s+tužen|žalb\w*\s+tužen|o\s+reviziji\s+tužen/i.test(intro)) return "defendant"
    if (/žalb\w*\s+tužitelj/i.test(intro)) return "plaintiff"
    if (/apelacij\w*\s+tužitelj/i.test(intro)) return "plaintiff"
    if (/apelacij\w*\s+tužen/i.test(intro)) return "defendant"
    return "unknown"
  }

  function outcomeCivil(full, izLat) {
    const iz = izLat.slice(0, 1600)
    const party = civilParty(full)
    if (/Uvažava\s+se\s+revizij|Revizij\w*\s+se\s+uvažava/i.test(iz)) {
      if (/ukida|vraća\s+predmet|ponovno/i.test(iz)) return "remanded"
      return "partially"
    }
    if (/Odbija\s+se\s+revizij|Revizij\w*\s+se\s+odbij/i.test(iz))
      return party === "plaintiff" ? "defendant_won" : party === "defendant" ? "plaintiff_won" : "plaintiff_won"
    if (/Potvrđuje\s+se/i.test(iz))
      return party === "plaintiff" ? "plaintiff_won" : party === "defendant" ? "defendant_won" : "plaintiff_won"
    if (/Preinačava\s+se/i.test(iz)) return "partially"
    if (/ukida|vraća\s+predmet/i.test(iz)) return "remanded"
    if (/Odbija\s+se\s+kao\s+neosnovan/i.test(iz))
      return party === "plaintiff" ? "defendant_won" : "plaintiff_won"
    return "partially"
  }

  function extractArticles(cyr) {
    const set = new Set()
    let m
    const re = /члана\s+(\d+)\.\s*став\s+(\d+)/gi
    while ((m = re.exec(cyr))) {
      set.add(`čl. ${m[1]}. st. ${m[2]}. ${statuteTag}`)
    }
    const reOne = /члана\s+(\d+)\b/gi
    while ((m = reOne.exec(cyr))) {
      const n = +m[1]
      if (n >= 1 && n <= 999) set.add(`čl. ${m[1]}. ${statuteTag}`)
    }
    if (/ЗПП|zakon\s+o\s+parničnom/i.test(cyr)) set.add("čl. ZPP RS")
    return [...set].slice(0, 10)
  }

  function summarize(full, izrekaCyr) {
    const sum = summarizeCyrillicCase(
      full,
      izrekaCyr,
      (s) => scrubCyrillicRuns(cyrToLatin(s)),
      `Sud ocjenjuje reviziju, žalbu ili drugi pravni lijek u predmetu iz oblasti ${title}, primjenjujući ${statuteLabel} i odredbe parničnog postupka (ZPP RS).`,
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

  function generateBlocks(extractDir, skipSet) {
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
      let decision_date = firstDecisionDate(raw) || yearFromStem(stem) || "2010-01-01"

      let outcome, legal_question, court_position, reasoning, headnote, keywords, related

      if (short) {
        outcome = "procedural"
        legal_question = `Kako je sud odlučio u predmetu ${stem}?`
        court_position =
          "Sadržaj odluke nije automatski izvučen jer je PDF isključivo skeniran (bez tekstualnog sloja) ili tekst ima manje od 200 znakova."
        reasoning = `Prilog pripada kategoriji ${title} pred Vrhovnim sudom RS. Za puno obrazloženje potrebno je OCR ili ručno čitanje skena. Metapodaci: broj predmeta ${stem}.`
        keywords = ["skenirani PDF", label, court]
        related = [`čl. ${statuteTag}`]
        headnote = "Skenirani izvor — potrebna ručna/OCR ekstrakcija."
      } else {
        const izCyr = extractIzrekaUtf8(raw)
        const izLatFull = scrubCyrillicRuns(cyrToLatin(izCyr))
        outcome = outcomeCivil(raw, izLatFull)
        const sum = summarize(raw, izCyr)
        legal_question = sum.legal_question
        court_position = sum.court_position
        reasoning = sum.reasoning
        headnote = sum.headnote
        keywords = [label, statuteLabel.split(" ")[0], "ZPP RS", court]
        related = extractArticles(raw.slice(0, 20000))
        if (related.length === 0) related = [`čl. ${statuteTag}`]
      }

      blocks.push(`  {
    jurisdiction: "bih_rs",
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
    return { blocks }
  }

  return { normCase, generateBlocks }
}
