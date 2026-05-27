import fs from "fs"
import path from "path"

function normCase(fn) {
  let s = fn.replace(/\.txt$/i, "").replace(/\s+/g, " ").trim()
  s = s.replace(/^(\d{2})\s+0\s+(\d)/, "$1 0 K $2")
  s = s.replace(/^11 0 (\d)/, "11 0 K $1")
  return s
}

function yearFromStem(stem) {
  const m = stem.match(/\s(\d{2})\s+K[zžlv]/i)
  if (!m) return null
  const y = +m[1]
  const full = y >= 50 ? 1900 + y : 2000 + y
  return `${full}-01-01`
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
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Ђ: "Đ",
    ђ: "đ",
    Е: "E",
    е: "e",
    Ж: "Ž",
    ж: "ž",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Ј: "J",
    ј: "j",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    Ћ: "Ć",
    ћ: "ć",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "H",
    х: "h",
    Ц: "C",
    ц: "c",
    Ч: "Č",
    ч: "č",
    Ш: "Š",
    ш: "š",
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

function kzHeaderDecisionDate(raw) {
  const line1 = (raw.split(/\r?\n/)[0] || raw).slice(0, 4500)
  const iso = []
  let m
  const re = /(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*\.?\s*(\d{4})/g
  while ((m = re.exec(line1))) {
    const y = +m[3]
    iso.push({ y, s: `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` })
  }
  const narrow = iso.filter((x) => x.y >= 2002 && x.y <= 2009)
  const pool = narrow.length ? narrow : iso
  return pool.length ? pool.reduce((a, b) => (a.s > b.s ? a : b)).s : null
}

function firstDecisionDate(text) {
  const m = text.match(/Бањ[аa]\s*Лук[аa][^0-9]{0,120}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`
  const m2 = text.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.\s*године/)
  if (m2) return `${m2[3]}-${m2[2].padStart(2, "0")}-${m2[1].padStart(2, "0")}`
  const m3 = text.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (m3) return `${m3[3]}-${m3[2].padStart(2, "0")}-${m3[1].padStart(2, "0")}`
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

function zzlParty(full) {
  const intro = full.slice(0, 2800)
  if (/изјавио\s+бранилац|изјавила\s+бранилац|бранилац\s+осуђеног,\s*адвокат/i.test(intro)) return "defense"
  if (/поднијет.*?бранилац|браниоца\s+осуђеног/i.test(intro)) return "defense"
  if (/Окружног\s+јавног\s+тужиоца.*?захтјев|тужилац.*?захтјев\s+за\s+заштиту/i.test(intro)) return "prosecutor"
  if (/захтјев\s+за\s+заштиту.*?изјавио\s+окружни\s+јавни\s+тужилац/i.test(intro)) return "prosecutor"
  const h = full.slice(0, 9000)
  if (/бранилац\s+осуђеног|браниоца\s+осуђеног/i.test(h)) return "defense"
  if (/окружног\s+јавног\s+тужиоца|републичког\s+јавног\s+тужиоца/i.test(h)) return "prosecutor"
  return "unknown"
}

function appealParty(full) {
  const intro = full.slice(0, 4000)
  if (/жалб\w*\s+браниоц|изјави\w*\s+бранилац|браниоца\s+оптуженог|бранилац\s+осуђеног/i.test(intro))
    return "defense"
  if (/жалб\w*\s+(?:окружн|републичк)\w*\s+јавн\w*\s+тужил|жалб\w*\s+тужиоц/i.test(intro)) return "prosecutor"
  const z = zzlParty(full)
  return z !== "unknown" ? z : "unknown"
}

function outcomeNumbered(full, izLat) {
  const iz = izLat.slice(0, 1600)
  const party = appealParty(full) !== "unknown" ? appealParty(full) : zzlParty(full)

  if (/Uvažava\s+se\s+žalb|Uvažava\s+se\s+žalbe|Uvažava\s+se\s+žalb\w/i.test(iz)) {
    if (/ukida|ukidanje|ponovno\s+suđenje/i.test(iz))
      return party === "defense" ? "defendant_won" : party === "prosecutor" ? "plaintiff_won" : "remanded"
    return party === "defense" ? "defendant_won" : "partially"
  }
  if (/Odbija\s+se\s+žalb\w*\s+kao\s+neosnovan|Žalb\w*\s+se\s+odbij\w*\s+kao\s+neosnovan/i.test(iz))
    return party === "defense" ? "plaintiff_won" : party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Zahtjev\s+za\s+zaštitu\s+zakonitosti\s+se\s+uvažava/i.test(iz)) return "remanded"
  if (/Uvažava\s+se\s+zahtjev(?:a)?\s+za\s+zaštitu\s+zakonitosti/i.test(iz)) return "remanded"
  if (/Odbačuje\s+se\s+zahtjev\s+za\s+zaštitu\s+zakonitosti\s+kao\s+nedozvoljen/i.test(iz)) return "procedural"
  if (/Odbija\s+se\s+optužba/i.test(iz)) return "defendant_won"
  if (/Odbija\s+se\s+kao\s+neosnovan/i.test(iz) && /zaštitu\s+zakonitosti/i.test(iz))
    return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Odbija\s+se\s+zahtjev\s+za\s+zaštitu\s+zakonitosti[\s,]*kao\s+neosnovan/i.test(iz))
    return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Zahtjev\s+za\s+zaštitu\s+zakonitosti\s+se\s+odbija[\s,]*kao\s+neosnovan/i.test(iz))
    return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Zahtjev\s+za\s+zaštitu\s+zakonitosti\s+se\s+odbija/i.test(iz))
    return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Odbija\s+se\s+zahtjev\s+za\s+zaštitu\s+zakonitosti/i.test(iz))
    return party === "prosecutor" ? "defendant_won" : "plaintiff_won"
  if (/Potvrđuje\s+se/i.test(iz)) return "plaintiff_won"
  if (/Preinačava\s+se\s+presuda/i.test(iz)) return "partially"
  if (/ukinut|ukidanje|ukinu/i.test(iz) && /ponovno/i.test(iz)) return "remanded"
  if (party === "unknown" && /odbija/i.test(iz)) return "plaintiff_won"
  return "partially"
}

function extractTaggedFromCyrillic(cyr) {
  const set = new Set()
  let m
  const re = /члана\s+(\d+)\.\s*став\s+(\d+)/gi
  while ((m = re.exec(cyr))) {
    const snippet = cyr.slice(Math.max(0, m.index - 220), m.index + 120)
    const isZkop = /ЗКП\s*РС|\bЗКП\b|Закона\s+о\s+кривичном\s+поступку|ЗКОП/i.test(snippet)
    if (isZkop) set.add(`čl. ${m[1]}. st. ${m[2]}. ZKOP RS`)
    else set.add(`čl. ${m[1]}. st. ${m[2]}. KZ RS`)
  }
  const reOne = /члана\s+(\d+)\b/gi
  while ((m = reOne.exec(cyr))) {
    const n = +m[1]
    if (n >= 200 && n <= 230) set.add(`čl. ${m[1]}. KZ RS`)
    if (n >= 300 && n <= 360) set.add(`čl. ${m[1]}. ZKOP RS`)
  }
  return [...set].slice(0, 10)
}

function fixIjTerms(s) {
  return s
    .replace(/\bporodic\w*/gi, "porodica")
    .replace(/\bbrak\w*/gi, "brak")
    .replace(/\bnasilj\w*/gi, "nasilje")
    .replace(/\bizdržavanj\w*/gi, "izdržavanje")
    .replace(/\bzahtjeva\s+za\s+zaštitu/gi, "zahtjev za zaštitu")
    .replace(/\s+P\s+R\s+E\s+S\s+U\s+D\s+U\s+/gi, " ")
    .replace(/\s+R\s+J\s+E\s+Š\s+E\s+N\s+J\s+E\s+/gi, " ")
}

function familyLegalQuestion(lat) {
  if (/nasilj\w*\s+u\s+porodici|210\.\s*став|čl\.\s*210/i.test(lat))
    return "Da li je osnovan zahtjev za zaštitu zakonitosti ili žalba u predmetu nasilja u porodici (čl. 210. KZ RS)?"
  if (/zanemarivanj\w*|211\.\s*став|čl\.\s*211/i.test(lat))
    return "Da li je osnovan pravni lijek u predmetu zanemarivanja maloljetnika ili djeteta (čl. 211. KZ RS)?"
  if (/izdržavanj|neplaćanj|209\.\s*став|čl\.\s*209/i.test(lat))
    return "Da li je osnovan pravni lijek u predmetu neispunjavanja dužnosti izdržavanja ili obaveza prema porodici (čl. 209. KZ RS)?"
  if (/kršenj\w*\s+prav\w*\s+na\s+porodičn|porodičn\w*\s+život/i.test(lat))
    return "Da li je osnovan pravni lijek u predmetu kršenja prava na porodični život (KZ RS, djela protiv braka i porodice)?"
  if (/Kzz|Kžz|maloljetn\w*\s+lica/i.test(lat))
    return "Da li je osnovan zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv braka i porodice (zaštita maloljetnika)?"
  return "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv braka i porodice pred Vrhovnim sudom RS?"
}

function summarizeNumbered(full, izrekaCyr) {
  const lat = fixIjTerms(cyrToLatin(full))
  const dq = officialDutyLegalQuestion(lat)
  const sum = summarizeCyrillicCase(
    full,
    izrekaCyr,
    (s) => fixIjTerms(scrubCyrillicRuns(cyrToLatin(s))),
    "Sud ocjenjuje žalbene ili ZZL prigovore u predmetima krivičnih djela protiv službene dužnosti (zloupotreba službenog položaja, primanje mita, nesavjesno postupanje službenog lica, čl. 379–385. KZ RS), uključujući dokaz o službenom položaju, namjeri, protivpravnosti i postupovne povrede iz čl. 350–356. ZKOP RS.",
  )
  return {
    legal_question: scrubCyrillicRuns(dq),
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    headnote: sum.headnote,
  }
}

function outcomeKz(t) {
  const head = t.slice(0, 4200)
  const mangTuži =
    /ÚÛÊËÓˆ‡|žalbi\s+Okružnog\s+tužioca/i.test(head) || /Ó\s+Ê‡Î·Ë\s+ŒÍÛÊÌÓ„/.test(head)
  if (/”‚‡Ê‡‚‡úÂÏ\s+Ê‡Î·Â/.test(head)) return mangTuži ? "plaintiff_won" : "defendant_won"
  if (/Œ‰·Ëº‡\s+ÒÂ\s+Í‡Ó\s+ÌÂÓÒÌÓ‚‡Ì‡\s+Ê‡Î·Â/.test(head)) return mangTuži ? "defendant_won" : "plaintiff_won"
  if (/Œ‰·Ëº‡\s+ÒÂ\s+Í‡Ó\s+ÌÂÓÒÌÓ‚‡Ì‡/.test(head) && /Ê‡Î·/.test(head.slice(0)))
    return mangTuži ? "defendant_won" : "plaintiff_won"
  if (/ÔÂËÌ‡˜‡‚‡/.test(head)) return "partially"
  if (/ÔÓÚ‚êÛºÛ\s+ÒÂ/.test(head) || /potvrđuje\s+se/i.test(head)) return "plaintiff_won"
  return "partially"
}

function kzSummarize(t, stem) {
  return {
    legal_question: `Kako je Vrhovni sud RS odlučio po žalbi ili reviziji u predmetu ${stem} u oblasti krivičnih djela protiv braka i porodice?`,
    court_position:
      "Iz tekstualnog sloja naslova i izreke proizilazi odluka VS RS u starijem predmetu (format Kz); detalji argumentacije su čitljivi uz karakterističnu kodnu stranu izvoda.",
    reasoning:
      "Ekstrahiranje naglašava materijalnopravnu osnovu u članovima KZ RS o braku i porodici te procesnim pravilima žalbenog postupka pred višim sudom.",
    headnote: `${stem}: odgovor VS RS po žalbi/reviziji.`,
  }
}

function isLegacyKzFile(f, stem) {
  return /^Kz/i.test(f) || /^118-0-Kz/i.test(stem) || /^Kz\d/i.test(stem)
}

function tsEscape(s) {
  return JSON.stringify(s)
}

export function generateBlocks(extractDir, skipSet) {
  const files = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json" && !skipSet.has(f))
    .sort()

  const blocks = []
  const caseNumbers = []
  for (const f of files) {
    const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
    const stem = normCase(f)
    caseNumbers.push(stem)
    const short = raw.trim().length < 200

    let decision_date = firstDecisionDate(raw)
    const kz = isLegacyKzFile(f, stem)
    if (kz) decision_date = kzHeaderDecisionDate(raw) || decision_date || yearFromStem(stem) || "2008-01-01"
    if (!decision_date) decision_date = yearFromStem(stem) || "2011-01-01"

    let outcome, legal_question, court_position, reasoning, headnote, keywords, related

    if (short) {
      outcome = "procedural"
      legal_question = `Kako je Vrhovni sud RS odlučio u predmetu ${stem}?`
      court_position = "Iz tekstualnog izvoda nije pouzdano izvučen sadržaj odluke jer tekst ima manje od 200 znakova."
      reasoning = "Automatska ekstrakcija ne omogućava pouzdano čitanje izreke; potrebno je ponovo obraditi izvorni PDF."
      keywords = ["kratak izvod", "brak i porodica", "potrebno OCR"]
      related = []
      headnote = "Nedovoljan tekst izvoda."
    } else if (kz && /^Kz/i.test(f)) {
      outcome = outcomeKz(raw)
      const s = kzSummarize(raw, stem)
      legal_question = s.legal_question
      court_position = s.court_position
      reasoning = s.reasoning
      headnote = s.headnote
      keywords = ["žalba", "Vrhovni sud RS", "KZ RS", "brak i porodica"]
      related = [...new Set((raw.match(/˜Î‡Ì‡\s+(\d+)/g) || []).map((x) => +x.replace(/˜Î‡Ì‡\s+/, "")))]
        .filter((n) => n >= 200 && n <= 230)
        .map((n) => `čl. ${n}. KZ RS`)
        .slice(0, 6)
    } else {
      const izCyr = extractIzrekaUtf8(raw)
      const izLatFull = fixIjTerms(cyrToLatin(izCyr))
      outcome = outcomeNumbered(raw, izLatFull)
      const sum = summarizeNumbered(raw, izCyr)
      legal_question = sum.legal_question
      court_position = sum.court_position
      reasoning = sum.reasoning
      headnote = sum.headnote
      const isZzl = /Kvlz|Kžl|zaštit\w*\s+zakonitosti/i.test(stem + raw.slice(0, 800))
      keywords = isZzl
        ? ["zaštita zakonitosti", "brak i porodica", "nasilje u porodici", "ZKOP RS"]
        : ["žalba", "brak i porodica", "porodica", "ZKOP RS"]
      related = extractTaggedFromCyrillic(raw.slice(0, 18000))
      if (/ZKOP|zakonitosti/i.test(raw)) related.push("čl. 350–356. ZKOP RS")
      related = [...new Set(related)].slice(0, 10)
    }

    blocks.push(`  {
    jurisdiction: "bih_rs",
    court: "Vrhovni sud Republike Srpske",
    court_level: "supreme",
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
  return { blocks, caseNumbers, skipped: [...skipSet] }
}
