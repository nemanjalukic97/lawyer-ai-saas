/**
 * One-off builder: fetches official HTML, extracts verbatim article text,
 * translates to English via OpenAI, prints legal-articles-family.ts body.
 *
 * Run: npx tsx scripts/build-family-law-articles.ts
 * Requires: OPENAI_API_KEY in .env.local
 */

import * as fs from "fs"
import * as path from "path"

import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config({ path: ".env.local" })

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const ROOT = path.join(__dirname)

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; LegalIngestBot/1.0; +https://example.invalid)",
    },
  })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/** Collect body after a matched član header until the next <p class="clan">. */
function extractParagrafAfterHeader(html: string, headerEnd: number): string {
  const rest = html.slice(headerEnd)
  const nextClan = rest.search(/<p class="clan"><a name="clan_/i)
  const chunk = nextClan === -1 ? rest : rest.slice(0, nextClan)
  const parts: string[] = []
  const pRe = /<p class="normal">([\s\S]*?)<\/p>/gi
  const pReCenter = /<p align="center" class="normal">([\s\S]*?)<\/p>/gi
  const pReNormalCenter = /<p class="normal" align="center">([\s\S]*?)<\/p>/gi
  let pm: RegExpExecArray | null
  while ((pm = pRe.exec(chunk)) !== null) {
    const t = stripTags(pm[1])
    if (t) parts.push(t)
  }
  if (parts.length === 0) {
    pReCenter.lastIndex = 0
    while ((pm = pReCenter.exec(chunk)) !== null) {
      const t = stripTags(pm[1])
      if (t) parts.push(t)
    }
  }
  if (parts.length === 0) {
    pReNormalCenter.lastIndex = 0
    while ((pm = pReNormalCenter.exec(chunk)) !== null) {
      const t = stripTags(pm[1])
      if (t) parts.push(t)
    }
  }
  if (parts.length === 0) {
    throw new Error(`Paragraf: no body paragraphs after header`)
  }
  return parts.join(" ")
}

/** Paragraf.rs / .ba / .me: Član N with <p class="normal"> body */
function extractParagrafClan(html: string, articleNum: string): string {
  const id = `clan_${articleNum.replace(/\./g, "")}`
  const clanRe = new RegExp(
    `<p class="clan"><a name="${id}"[^>]*></a>\\s*Član\\s+${articleNum.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*</p>`,
    "i",
  )
  const m = html.match(clanRe)
  if (m && m.index !== undefined) {
    return extractParagrafAfterHeader(html, m.index + m[0].length)
  }

  // Fallback: repealed / heading-only član (e.g. "Član 141**" without clan_N anchor)
  const subRe = new RegExp(
    `<p class="wyq110---naslov-clana"><a name="[^"]*"></a>Član\\s+${articleNum.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\**</p>`,
    "i",
  )
  const sm = html.match(subRe)
  if (sm && sm.index !== undefined) {
    const start = sm.index + sm[0].length
    return extractParagrafAfterHeader(html, start)
  }

  // Combined / shorthand član line (e.g. <p class="clan">Čl. 148-149</p> without anchor)
  const combinedRe = new RegExp(
    `<p class="clan">\\s*(?:Član\\.|Čl\\.)\\s*${articleNum.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:-\\d+)?[^<]*</p>`,
    "i",
  )
  const cm = html.match(combinedRe)
  if (cm && cm.index !== undefined) {
    return extractParagrafAfterHeader(html, cm.index + cm[0].length)
  }

  throw new Error(`Paragraf: član ${articleNum} not found`)
}

/** zakon.hr: Članak N. */
function extractCroatia(html: string, articleNum: string): string {
  const marker = `class="cms-zakon-clanak">Članak ${articleNum}.`
  const idx = html.indexOf(marker)
  if (idx === -1) throw new Error(`Croatia: Članak ${articleNum} not found`)
  const slice = html.slice(idx)
  const re = /class="cms-zakon-clanak">Članak\s+(\d+)\./g
  let n = 0
  let end = slice.length
  let m: RegExpExecArray | null
  while ((m = re.exec(slice)) !== null) {
    n += 1
    if (n === 1) continue
    end = m.index
    break
  }
  const chunk = slice.slice(0, end)
  const parts: string[] = []
  const pRe = /<p style="">([\s\S]*?)<\/p>/gi
  let pm: RegExpExecArray | null
  while ((pm = pRe.exec(chunk)) !== null) {
    let t = stripTags(pm[1])
    t = t.replace(/^SUDSKA PRAKSA:.*$/i, "").trim()
    if (t && !t.match(/^Članak\s+\d+\.?$/i)) parts.push(t)
  }
  if (parts.length === 0) {
    throw new Error(`Croatia: no body for Članak ${articleNum}`)
  }
  return parts.join(" ")
}

/** Uradni list SI: esegment_h4 "N. člen" + esegment_p */
function extractSloveniaUl(html: string, articleNum: string): string {
  const n = articleNum
  const h4 = new RegExp(
    `<div class="esegment_h4">\\s*${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\. člen\\s*</div>`,
    "i",
  )
  const m = html.match(h4)
  if (!m || m.index === undefined) {
    throw new Error(`Slovenia UL: ${n}. člen header not found`)
  }
  const after = html.slice(m.index + m[0].length)
  const pMatch = after.match(
    /<div class="esegment_p">\s*([\s\S]*?)\s*<\/div>/i,
  )
  if (!pMatch) throw new Error(`Slovenia UL: no esegment_p for ${n}. člen`)
  return stripTags(pMatch[1])
}

type Row = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  source_url: string
  article_num: string
}

const ROWS: Row[] = [
  // serbia
  ...[
    "1",
    "2",
    "3",
    "10",
    "17",
    "23",
    "31",
    "32",
    "40",
    "55",
    "61",
    "77",
    "78",
    "85",
    "150",
    "158",
    "168",
    "171",
    "180",
    "229",
  ].map((article_num) => ({
    jurisdiction: "serbia",
    law_name: "Family Law",
    law_name_local: "Porodični zakon",
    source_url: "https://www.paragraf.rs/propisi/porodicni_zakon.html",
    article_num,
  })),
  ...[
    "1",
    "3",
    "4",
    "11",
    "20",
    "29",
    "44",
    "45",
    "54",
    "91",
    "100",
    "291",
    "295",
    "302",
    "183",
    "234",
    "36",
    "39",
    "47",
    "57",
  ].map((article_num) => ({
    jurisdiction: "croatia",
    law_name: "Family Act",
    law_name_local: "Obiteljski zakon",
    source_url: "https://www.zakon.hr/z/88/Obiteljski-zakon",
    article_num,
  })),
  ...[
    "1",
    "2",
    "3",
    "8",
    "15",
    "21",
    "37",
    "38",
    "47",
    "68",
    "75",
    "90",
    "91",
    "96",
    "145",
    "155",
    "252",
    "255",
    "260",
    "280",
  ].map((article_num) => ({
    jurisdiction: "bih_fbih",
    law_name: "Family Law FBiH",
    law_name_local: "Porodični zakon FBiH",
    source_url:
      "https://www.paragraf.ba/propisi/fbih/porodicni-zakon-federacije-bih.html",
    article_num,
  })),
  ...[
    "1",
    "2",
    "3",
    "8",
    "14",
    "20",
    "34",
    "35",
    "44",
    "64",
    "71",
    "86",
    "87",
    "93",
    "141",
    "151",
    "236",
    "239",
    "244",
    "262",
  ].map((article_num) => ({
    jurisdiction: "bih_rs",
    law_name: "Family Law RS Entity",
    law_name_local: "Porodični zakon Republike Srpske",
    source_url:
      "https://www.paragraf.ba/propisi/republika-srpska/porodicni-zakon.html",
    article_num,
  })),
  ...[
    "1",
    "8",
    "15",
    "34",
    "64",
    "86",
    "141",
    "151",
    "236",
    "244",
    "262",
  ].map((article_num) => ({
    jurisdiction: "bih_brcko",
    law_name: "Family Law Brčko District",
    law_name_local: "Porodični zakon Brčko Distrikta BiH",
    source_url: "https://skupstinabd.ba/ba/zakoni.html",
    article_num,
  })),
  ...[
    "1",
    "2",
    "3",
    "9",
    "16",
    "22",
    "38",
    "39",
    "48",
    "70",
    "77",
    "92",
    "93",
    "99",
    "148",
    "158",
    "248",
    "251",
    "256",
    "274",
  ].map((article_num) => ({
    jurisdiction: "montenegro",
    law_name: "Family Law Montenegro",
    law_name_local: "Porodični zakon Crne Gore",
    source_url: "https://www.paragraf.me/propisi-crnegore/porodicni-zakon.html",
    article_num,
  })),
  ...[
    "1",
    "3",
    "4",
    "7",
    "16",
    "22",
    "46",
    "51",
    "52",
    "56",
    "60",
    "78",
    "85",
    "123",
    "126",
    "132",
    "134",
    "178",
  ].map((article_num) => ({
    jurisdiction: "slovenia",
    law_name: "Marriage and Family Relations Act",
    law_name_local: "Zakon o zakonski zvezi in družinskih razmerjih",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1060",
    article_num,
  })),
]

const CACHE: Record<string, string> = {}

function loadOrFetch(url: string): Promise<string> {
  if (CACHE[url]) return Promise.resolve(CACHE[url])
  const safe = url.replace(/[^a-z0-9]+/gi, "_").slice(0, 80)
  const p = path.join(ROOT, `_cache_${safe}.html`)
  if (fs.existsSync(p)) {
    const t = fs.readFileSync(p, "utf8")
    CACHE[url] = t
    return Promise.resolve(t)
  }
  return fetchText(url).then((t) => {
    fs.writeFileSync(p, t, "utf8")
    CACHE[url] = t
    return t
  })
}

async function extractLocal(
  row: Row,
  ctx: { rsHtml: string; bihRsHtml: string },
): Promise<string> {
  const { jurisdiction, article_num, source_url } = row

  if (jurisdiction === "serbia") {
    return extractParagrafClan(ctx.rsHtml, article_num)
  }

  if (jurisdiction === "bih_brcko") {
    return extractParagrafClan(ctx.bihRsHtml, article_num)
  }

  if (jurisdiction === "bih_fbih") {
    const html = await loadOrFetch(source_url)
    return extractParagrafClan(html, article_num)
  }

  if (jurisdiction === "bih_rs") {
    const html = await loadOrFetch(source_url)
    return extractParagrafClan(html, article_num)
  }

  if (jurisdiction === "montenegro") {
    const html = await loadOrFetch(source_url)
    return extractParagrafClan(html, article_num)
  }

  if (jurisdiction === "croatia") {
    const html = await loadOrFetch(source_url)
    return extractCroatia(html, article_num)
  }

  if (jurisdiction === "slovenia") {
    const ulUrl =
      "https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2004-01-3093/zakon-o-zakonski-zvezi-in-druzinskih-razmerjih-uradno-precisceno-besedilo-zzzdr-upb1"
    const html = await loadOrFetch(ulUrl)
    return extractSloveniaUl(html, article_num)
  }

  throw new Error(`Unknown jurisdiction ${jurisdiction}`)
}

async function translateBatch(
  pairs: { key: string; text: string; langNote: string }[],
): Promise<Record<string, string>> {
  const sys = `You are a legal translator. Translate each item's text to English.
Rules: faithful translation of the full text; do not summarize; preserve paragraph labels like (1), (2), (3) and list numbering; preserve legal terms accurately.
Return a JSON object mapping each "key" to the English string.`

  const user = JSON.stringify(pairs, null, 2)

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: sys },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" },
  })

  const raw = res.choices[0]?.message?.content
  if (!raw) throw new Error("No translation response")
  return JSON.parse(raw) as Record<string, string>
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY required")
  }

  const rsUrl = "https://www.paragraf.rs/propisi/porodicni_zakon.html"
  const rsHtml = await loadOrFetch(rsUrl)
  const bihRsUrl =
    "https://www.paragraf.ba/propisi/republika-srpska/porodicni-zakon.html"
  const bihRsHtml = await loadOrFetch(bihRsUrl)

  const locals: { row: Row; text_local: string }[] = []

  for (const row of ROWS) {
    const text_local = await extractLocal(row, { rsHtml, bihRsHtml })
    locals.push({ row, text_local })
    process.stdout.write(`OK ${row.jurisdiction} ${row.article_num}\n`)
  }

  const langNote = (j: string) => {
    if (j === "slovenia") return "Slovenian"
    if (j === "croatia") return "Croatian"
    return "BCS (Serbian/Croatian/Bosnian) in local orthography"
  }

  const batches: { key: string; text: string; langNote: string }[][] = []
  let cur: { key: string; text: string; langNote: string }[] = []
  for (let i = 0; i < locals.length; i++) {
    const { row, text_local } = locals[i]
    const key = `${i}`
    cur.push({
      key,
      text: text_local,
      langNote: langNote(row.jurisdiction),
    })
    if (cur.length >= 12 || i === locals.length - 1) {
      batches.push(cur)
      cur = []
    }
  }

  const enByIndex: Record<string, string> = {}
  for (const batch of batches) {
    const tr = await translateBatch(batch)
    for (const [k, v] of Object.entries(tr)) {
      enByIndex[k] = v
    }
    await new Promise((r) => setTimeout(r, 400))
  }

  const lines: string[] = []
  lines.push(`/**`)
  lines.push(` * Family-law articles for ingest (seven jurisdictions).`)
  lines.push(` * Local texts are verbatim from official sources; English is a faithful translation.`)
  lines.push(` */`)
  lines.push(``)
  lines.push(`type FamilyArticleInput = {`)
  lines.push(`  jurisdiction: string`)
  lines.push(`  law_name: string`)
  lines.push(`  law_name_local: string`)
  lines.push(`  law_category: string`)
  lines.push(`  article_num: string`)
  lines.push(`  paragraph_num?: string`)
  lines.push(`  text: string`)
  lines.push(`  text_local?: string`)
  lines.push(`  source_url?: string`)
  lines.push(`  effective_date?: string`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`function fam(`)
  lines.push(`  jurisdiction: string,`)
  lines.push(`  law_name: string,`)
  lines.push(`  law_name_local: string,`)
  lines.push(`  source_url: string,`)
  lines.push(`  article_num: string,`)
  lines.push(`  text_local: string,`)
  lines.push(`  text: string,`)
  lines.push(`  paragraph_num?: string,`)
  lines.push(`): FamilyArticleInput {`)
  lines.push(`  return {`)
  lines.push(`    jurisdiction,`)
  lines.push(`    law_name,`)
  lines.push(`    law_name_local,`)
  lines.push(`    law_category: "family",`)
  lines.push(`    article_num,`)
  lines.push(`    paragraph_num,`)
  lines.push(`    text,`)
  lines.push(`    text_local,`)
  lines.push(`    source_url,`)
  lines.push(`  }`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`const SRC_RS = "https://www.paragraf.rs/propisi/porodicni_zakon.html"`)
  lines.push(`const SRC_HR = "https://www.zakon.hr/z/88/Obiteljski-zakon"`)
  lines.push(
    `const SRC_FBIH = "https://www.paragraf.ba/propisi/fbih/porodicni-zakon-federacije-bih.html"`,
  )
  lines.push(
    `const SRC_BIH_RS = "https://www.paragraf.ba/propisi/republika-srpska/porodicni-zakon.html"`,
  )
  lines.push(`const SRC_BRCKO = "https://skupstinabd.ba/ba/zakoni.html"`)
  lines.push(
    `const SRC_ME = "https://www.paragraf.me/propisi-crnegore/porodicni-zakon.html"`,
  )
  lines.push(
    `const SRC_SI = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1060"`,
  )
  lines.push(``)
  lines.push(`export const FAMILY_ARTICLES: FamilyArticleInput[] = [`)

  for (let i = 0; i < locals.length; i++) {
    const { row, text_local } = locals[i]
    const en = enByIndex[String(i)]
    if (!en) throw new Error(`Missing EN for index ${i}`)

    let srcConst = "SRC_RS"
    if (row.jurisdiction === "croatia") srcConst = "SRC_HR"
    else if (row.jurisdiction === "bih_fbih") srcConst = "SRC_FBIH"
    else if (row.jurisdiction === "bih_rs") srcConst = "SRC_BIH_RS"
    else if (row.jurisdiction === "bih_brcko") srcConst = "SRC_BRCKO"
    else if (row.jurisdiction === "montenegro") srcConst = "SRC_ME"
    else if (row.jurisdiction === "slovenia") srcConst = "SRC_SI"

    const section =
      i === 0 ||
      locals[i - 1].row.jurisdiction !== row.jurisdiction
        ? `\n  // --- ${row.jurisdiction.toUpperCase()} ---\n`
        : ""

    lines.push(
      section +
        `  fam(\n` +
        `    ${JSON.stringify(row.jurisdiction)},\n` +
        `    ${JSON.stringify(row.law_name)},\n` +
        `    ${JSON.stringify(row.law_name_local)},\n` +
        `    ${srcConst},\n` +
        `    ${JSON.stringify(row.article_num)},\n` +
        `    ${JSON.stringify(text_local)},\n` +
        `    ${JSON.stringify(en)},\n` +
        `  ),`,
    )
  }

  lines.push(`]`)
  lines.push(``)

  const outPath = path.join(ROOT, "legal-articles-family.ts")
  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8")
  process.stdout.write(`\nWrote ${outPath}\n`)
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
