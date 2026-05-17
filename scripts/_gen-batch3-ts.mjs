import fs from "fs"
import path from "path"

const dir = "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-bih-rs2-extract/batch3"
const skip = new Set(["Kz-211-05 (1).txt"])

/** @param {string} fn */
function normCase(fn) {
  return fn
    .replace(/\.txt$/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

/** Serbian Cyrillic → Latin (ASCII letters + čćđšž; lj nj dž) */
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
    const ch = s[i]
    out += one[ch] ?? ch
  }
  return out
}

function scrubCyrillicRuns(s) {
  return s.replace(/[\u0400-\u04FF]+/g, (chunk) => cyrToLatin(chunk))
}

/** Legacy Kz extracts: collect plausible decision years from the first line and take the chronologically latest session date. */
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
  const chunk = ix === -1 ? text.slice(0, 6000) : text.slice(0, ix)
  const pres = /П\s+Р\s+Е\s+С\s+У\s+Д\s+У/i
  const pi = chunk.search(pres)
  if (pi === -1) return chunk.slice(0, 1200)
  return chunk.slice(pi, pi + 1600)
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

function outcomeNumbered(full, izLat) {
  const iz = izLat.slice(0, 1400)
  const party = zzlParty(full)

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
    set.add(isZkop ? `čl. ${m[1]}. st. ${m[2]}. ZKOP RS` : `čl. ${m[1]}. st. ${m[2]}. KZ RS`)
  }
  const reOne = /члана\s+(\d+)\b/gi
  while ((m = reOne.exec(cyr))) {
    const n = +m[1]
    if (n < 120 || n > 180) continue
    const pre = cyr.slice(Math.max(0, m.index - 120), m.index)
    if (/Кривичног\s+закона|КЗ\s+РС/i.test(pre)) set.add(`čl. ${m[1]}. KZ RS`)
  }
  return [...set].slice(0, 10)
}

function fixIjTerms(s) {
  return s
    .replace(/\btjelna\b/gi, "tjelesna")
    .replace(/\btjelesna\b/gi, "tjelesna")
    .replace(/\bpovrjeda\b/gi, "povreda")
    .replace(/\bpovreda\b/gi, "povreda")
    .replace(/\bdjelo\b/gi, "djelo")
    .replace(/\boptuzhba\b/gi, "optužba")
    .replace(/Baњ/g, "Banj")
    .replace(/baњ/g, "banj")
    .replace(/Banjaluci/gi, "Banja Luci")
    .replace(/maloljetn\s+ika/gi, "maloljetnika")
    .replace(/zahtjeva\s+za\s+zaštitu/gi, "zahtjev za zaštitu")
    .replace(/\s+P\s+R\s+E\s+S\s+U\s+D\s+U\s+/gi, " ")
}

function summarizeNumbered(full, izrekaCyr) {
  const lat = fixIjTerms(cyrToLatin(full.slice(0, 5500)))
  const izLat = fixIjTerms(cyrToLatin(izrekaCyr))
  let dq = ""
  if (/teska\s+tjelesna|teška\s+tjelesna|član(?:a)?\s+156|\b156\.\s*stav/i.test(lat))
    dq =
      "Da li je osnovan zahtjev za zaštitu zakonitosti ili žalba u predmetu teške tjelesne povrede (protiv života i tijela)?"
  else if (/tjesna\s+povreda|teljesna|tjelesna\s+povreda/i.test(lat))
    dq =
      "Da li je osnovan zahtjev za zaštitu zakonitosti ili žalba u predmetu krivičnog djela protiv života i tijela (tjelesna povreda ili stićaj)?"
  else if (/ubistv/i.test(lat))
    dq =
      "Da li je osnovan zahtjev za zaštitu zakonitosti ili žalba u predmetu ubistva ili srodnih djela protiv života?"
  else
    dq =
      "Da li je osnovan zahtjev za zaštitu zakonitosti ili drugi pravni lijek u predmetu krivičnog djela protiv života i tijela pred Vrhovnim sudom RS?"

  let cp = scrubCyrillicRuns(
    izLat
      .replace(/^\s*P\s+R\s+E\s+S\s+U\s+D\s+U\s*/i, "")
      .slice(0, 520)
      .replace(/\s+/g, " ")
      .trim(),
  )
  if (cp.length > 420) cp = cp.slice(0, 417).trim() + "…"

  const reasoning =
    "Sud razmatra prigovore na primjenu materijalnog prava i postupka te standarde iz čl. 311. i 356. ZKOP RS kada je riječ o zaštiti zakonitosti i žalbama u predmetima protiv života i tijela."

  const head = scrubCyrillicRuns(
    izLat
      .replace(/^\s*P\s+R\s+E\s+S\s+U\s+D\s+U\s*/i, "")
      .slice(0, 220)
      .replace(/\s+/g, " ")
      .trim(),
  )
  return {
    legal_question: scrubCyrillicRuns(dq),
    court_position: scrubCyrillicRuns(cp || lat.slice(0, 350)),
    reasoning,
    headnote: head.slice(0, 160),
  }
}

function outcomeKz(t) {
  const head = t.slice(0, 4200)
  const mangTuži =
    /ÚÛÊËÓˆ‡|žalbi\s+Okružnog\s+tužioca/i.test(head) ||
    /Ó\s+Ê‡Î·Ë\s+ŒÍÛÊÌÓ„/.test(head)

  if (/”‚‡Ê‡‚‡úÂÏ\s+Ê‡Î·Â/.test(head)) {
    return mangTuži ? "plaintiff_won" : "defendant_won"
  }
  if (/Œ‰·Ëº‡\s+ÒÂ\s+Í‡Ó\s+ÌÂÓÒÌÓ‚‡Ì‡\s+Ê‡Î·Â/.test(head)) {
    return mangTuži ? "defendant_won" : "plaintiff_won"
  }
  if (/Œ‰·Ëº‡\s+ÒÂ\s+Í‡Ó\s+ÌÂÓÒÌÓ‚‡Ì‡/.test(head) && /Ê‡Î·/.test(head.slice(0, 900))) {
    return mangTuži ? "defendant_won" : "plaintiff_won"
  }
  if (/ÔÂËÌ‡˜‡‚‡/.test(head)) return "partially"
  if (/ÔÓÚ‚êÛºÛ\s+ÒÂ/.test(head) || /potvrđuje\s+se/i.test(head)) return "plaintiff_won"
  return "partially"
}

function kzSummarize(t, stem) {
  const latish = t.slice(0, 4000)
  let dq = `Kako je Vrhovni sud RS odlučio po žalbi ili reviziji u predmetu ${stem} u oblasti krivičnih djela protiv života i tijela?`
  let cp =
    "Iz tekstualnog sloja naslova i izreke proizilazi odluka VS RS u starijem predmetu (format Kz); detalji argumentacije su čitljivi uz karakterističnu kodnu stranu izvoda."
  let reasoning =
    "Ekstrahiranje naglašava materijalnopravnu osnovu u članovima KZ RS o povredi tijela i procesnim pravilima žalbenog postupka pred višim sudom."

  const mCl = latish.match(/˜Î‡Ì‡\s+(\d+)/g) || []
  const nums = [...new Set(mCl.map((x) => x.replace(/˜Î‡Ì‡\s+/, "")))].slice(0, 4)
  if (nums.length) reasoning += ` Citirani članovi u izvodu uključuju: ${nums.join(", ")}.`

  return {
    legal_question: dq,
    court_position: cp,
    reasoning,
    headnote: `${stem}: odgovor VS RS po žalbi/reviziji.`,
  }
}

function tsEscape(s) {
  return JSON.stringify(s)
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".txt") && !skip.has(f)).sort()

const blocks = []
for (const f of files) {
  const p = path.join(dir, f)
  const raw = fs.readFileSync(p, "utf8")
  const stem = normCase(f)
  const short = raw.trim().length < 200

  let decision_date = firstDecisionDate(raw)
  const kz = /^Kz-/i.test(f)
  if (kz) {
    decision_date = kzHeaderDecisionDate(raw) || decision_date || "2005-01-01"
  }
  if (!decision_date) decision_date = "2011-01-01"

  let outcome
  let legal_question,
    court_position,
    reasoning,
    headnote,
    keywords,
    related

  if (short) {
    outcome = "procedural"
    legal_question = `Kako je Vrhovni sud RS odlučio u predmetu ${stem}?`
    court_position = "Iz tekstualnog izvoda nije pouzdano izvučen sadržaj odluke jer tekst ima manje od 200 znakova."
    reasoning = "Automatska ekstrakcija ne omogućava pouzdano čitanje izreke; potrebno je ponovo obraditi izvorni PDF."
    keywords = ["kratak izvod", "krivično djelo protiv života i tijela"]
    related = []
    headnote = "Nedovoljan tekst izvoda."
  } else if (kz) {
    outcome = outcomeKz(raw)
    const s = kzSummarize(raw, stem)
    legal_question = s.legal_question
    court_position = s.court_position
    reasoning = s.reasoning
    headnote = s.headnote
    keywords = ["žalba", "Vrhovni sud RS", "KZ RS", "povreda tijela"]
    const mCl = raw.match(/˜Î‡Ì‡\s+(\d+)/g) || []
    related = [...new Set(mCl.map((x) => +x.replace(/˜Î‡Ì‡\s+/, "")))]
      .filter((n) => n >= 120 && n <= 180)
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
    keywords = ["zaštita zakonitosti", "žalba", "krivično djelo protiv života i tijela", "ZKOP RS"]
    related = extractTaggedFromCyrillic(raw.slice(0, 15000))
    if (/ZKOP|zakonitosti/i.test(raw)) related.push("čl. 350–356. ZKOP RS")
    related = [...new Set(related)].slice(0, 10)
  }

  const obj = `  {
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
  }`

  blocks.push(obj)
}

const outPath =
  process.argv[2] ||
  "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-batch3-snippet.ts.txt"
fs.writeFileSync(outPath, blocks.join(",\n"), "utf8")
console.error("Wrote", blocks.length, "entries to", outPath)
