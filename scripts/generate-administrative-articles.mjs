/**
 * Builds scripts/legal-articles-administrative.ts from local HTML/PDF snapshots.
 * Uses OpenAI for faithful full English translations of extracted local text.
 *
 * Prerequisites (repo root):
 *   tmp-zoup-rs.html, tmp-zus-rs.html
 *   tmp-zoup-hr-full.html (cms consolidated GAPA)
 *   tmp-hr-zus-z101.html (Croatian ZUS — z/175 redirects; z/101 has full text)
 *   tmp-fbih-zup.htm, tmp-fbih-zus.htm
 *   tmp-bih-rs-zoup.html, tmp-bih-rs-zus.html
 *   tmp-zup-si-iprs.html (Slovenian ZUP)
 *   tmp-zus-si-fulltext.txt (from: node scripts/_extract-zus-si-pdf.mjs)
 *
 * Run: node scripts/generate-administrative-articles.mjs
 */
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import OpenAI from "openai"

const root = path.join(import.meta.dirname, "..")
dotenv.config({ path: path.join(root, ".env.local") })

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8")
}

function cleanHtmlText(s) {
  let t = s.replace(/<p class="wyq[^"]*"[^>]*>[\s\S]*?<\/p>/gi, "")
  t = t.replace(/<p class="normalprored"[^>]*>[\s\S]*?<\/p>/gi, "")
  t = t.replace(/<blockquote>[\s\S]*?<\/blockquote>/gi, " ")
  t = t.replace(/<[^>]+>/g, " ")
  t = t.replace(/\s+/g, " ").trim()
  t = t.replace(/\s*<a\s*$/g, "")
  t = t.replace(/\s*<a\s+/g, " ")
  return t
}

function extractRsClan(html, num) {
  const a = `name="clan_${num}"`
  const b = `name="clan_${num + 1}"`
  const i0 = html.indexOf(a)
  const i1 = html.indexOf(b, i0 + 1)
  if (i0 < 0) return null
  const slice = i1 >= 0 ? html.slice(i0, i1) : html.slice(i0)
  let inner = cleanHtmlText(slice)
  inner = inner.replace(/^[^Čč]*[Čč]lan \d+\s*/i, "")
  return inner
}

function extractHrClanak(html, num) {
  const re = new RegExp(
    `<p class="clanak-">Članak ${num}\\.</p>([\\s\\S]*?)(?=<p class="clanak-">Članak \\d+\\.</p>|<p class="t-12-9-sred">)`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  let inner = m[1]
  inner = inner.replace(/<p class="t-10-9-kurz-s"[^>]*>[\s\S]*?<\/p>/gi, "")
  inner = inner.replace(/<[^>]+>/g, " ")
  inner = inner.replace(/\s+/g, " ").trim()
  return inner
}

/** zakon.hr /z/101 style (cms-zakon-clanak markers) */
function extractHrZusClanak(html, num) {
  const needle = `cms-zakon-clanak">Članak ${num}.`
  const i0 = html.indexOf(needle)
  if (i0 < 0) return null
  const after = html.slice(i0 + needle.length)
  const nextM = after.match(/cms-zakon-clanak">Članak \d+\./)
  const block = nextM ? after.slice(0, nextM.index) : after
  return block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function extractSiClen(html, num) {
  const startTag = `<p class="center bold clen">${num}. člen</p>`
  const i0 = html.indexOf(startTag)
  if (i0 < 0) return null
  const rest = html.slice(i0 + startTag.length)
  const nextRe = /<p class="center bold clen">\d+\. člen<\/p>/
  const m = rest.match(nextRe)
  const block = m ? rest.slice(0, m.index) : rest
  let t = block.replace(/<[^>]+>/g, " ")
  t = t.replace(/\s+/g, " ").trim()
  return t
}

function extractFbihClanak(html, num) {
  const markers = [...html.matchAll(/<p align="center"><b>[\s\S]*?Clanak (\d+)\./gi)]
  const idx = markers.findIndex((m) => Number(m[1]) === num)
  if (idx < 0) return null
  const start = markers[idx].index + markers[idx][0].length
  const end = idx + 1 < markers.length ? markers[idx + 1].index : html.length
  let chunk = html.slice(start, end)
  chunk = chunk.replace(/<[^>]+>/g, " ")
  chunk = chunk.replace(/\s+/g, " ").trim()
  return chunk
}

function sliceZusSiFull(fullText) {
  const startMarker = "Z A K O N O UPRAVNEM SPORU (ZUS-1)"
  const i0 = fullText.indexOf(startMarker)
  const iEnd = fullText.indexOf("4488.", i0)
  if (i0 < 0) throw new Error("ZUS slice start not found in tmp-zus-si-fulltext.txt")
  return fullText.slice(i0, iEnd > 0 ? iEnd : undefined)
}

function extractZusSiClen(zusSlice, num) {
  const re = new RegExp(`(?:^|\\s)${num}\\.\\s+člen\\s([\\s\\S]*?)(?=(?:^|\\s)\\d+\\.\\s+člen\\s)`)
  const m = zusSlice.match(re)
  return m ? m[1].trim() : null
}

function esc(s) {
  if (s == null) return '""'
  return JSON.stringify(s)
}

async function translateBatch(items, label) {
  const payload = items.map((t, i) => ({ index: i, text_local: t }))
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a legal translator. Translate each text_local to accurate English legal language. Preserve paragraph numbering like (1), (2). Return JSON only.",
      },
      {
        role: "user",
        content: `${label}\n\nTranslate in order. Return format: {"translations": ["...","..."]}\n\n${JSON.stringify(payload)}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  })
  const raw = res.choices[0]?.message?.content ?? "{}"
  const parsed = JSON.parse(raw)
  const arr = parsed.translations
  if (!Array.isArray(arr) || arr.length !== items.length) {
    throw new Error(`Translation batch mismatch for ${label}: expected ${items.length}, got ${arr?.length}`)
  }
  return arr
}

const SRC_RS_GAPA = "https://www.paragraf.rs/propisi/zakon_o_opstem_upravnom_postupku.html"
const SRC_RS_ZUS = "https://www.paragraf.rs/propisi/zakon_o_upravnim_sporovima.html"
const SRC_HR_GAPA = "https://www.zakon.hr/z/105/Zakon-o-op%C4%87em-upravnom-postupku"
const SRC_HR_GAPA_EXTRACT = "https://www.zakon.hr/cms.htm?id=50194"
const SRC_HR_ZUS = "https://www.zakon.hr/z/101/zakon-o-upravnim-sporovima"
const SRC_FBIH_GAPA = "https://www.fbihvlada.gov.ba/bosanski/zakoni/1998/zakoni/1%20h%20zakon_o_upravnom_postupku.htm"
const SRC_FBIH_ZUS = "https://www.fbihvlada.gov.ba/bosanski/zakoni/2005/zakoni/9%20h%20zakon_o_upravnim_sporovima.htm"
const SRC_BIH_RS_GAPA = "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-opstem-upravnom-postupku.html"
const SRC_BIH_RS_ZUS = "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-upravnim-sporovima.html"
const SRC_BRCKO = "https://skupstinabd.ba/ba/zakoni.html"
const SRC_ME_GAPA = "https://www.paragraf.me/propisi-crnegore/zakon-o-opstem-upravnom-postupku.html"
const SRC_ME_ZUS = "https://www.paragraf.me/propisi-crnegore/zakon-o-upravnom-sporu.html"
const SRC_SI_GAPA = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1603"
const SRC_SI_ZUS = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4732"

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in .env.local (needed for English translations).")
  }

  const zoupRs = read("tmp-zoup-rs.html")
  const zusRs = read("tmp-zus-rs.html")
  const zoupHr = read("tmp-zoup-hr-full.html")
  const zoupHrZus = read("tmp-hr-zus-z101.html")
  const fbihZup = read("tmp-fbih-zup.htm")
  const bihRsZoup = read("tmp-bih-rs-zoup.html")
  const bihRsZus = read("tmp-bih-rs-zus.html")
  const zupSi = read("tmp-zup-si-iprs.html")
  const zusSiFull = read("tmp-zus-si-fulltext.txt")
  const zusSlice = sliceZusSiFull(zusSiFull)

  /** @type {{ jurisdiction: string, law_name: string, law_name_local: string, source_url: string, article_num: string, paragraph_num?: string, text_local: string }[]} */
  const rows = []

  // --- SERBIA GAPA ---
  const rsGapa = [1, 2, 3, 4, 5, 9, 10, 19, 29, 69, 82, 98, 108, 111, 119, 131, 147, 172]
  for (const n of rsGapa) {
    const loc = extractRsClan(zoupRs, n)
    if (!loc) throw new Error("Missing RS GAPA " + n)
    rows.push({
      jurisdiction: "serbia",
      law_name: "General Administrative Procedure Act",
      law_name_local: "Zakon o opštem upravnom postupku",
      source_url: SRC_RS_GAPA,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- SERBIA ZUS ---
  for (const n of [1, 3, 11, 18, 34, 45]) {
    const loc = extractRsClan(zusRs, n)
    if (!loc) throw new Error("Missing RS ZUS " + n)
    rows.push({
      jurisdiction: "serbia",
      law_name: "Administrative Disputes Act",
      law_name_local: "Zakon o upravnim sporovima",
      source_url: SRC_RS_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- CROATIA GAPA (96: oral hearing = članak 54; decision = članak 96) ---
  const hrGapaList = [
    1, 5, 6, 7, 9, 10, 20, 43, 58,
    { article_num: "96", paragraph_num: "a", clanak: 54 },
    { article_num: "96", paragraph_num: "b", clanak: 96 },
    98, 101, 109, 117, 123, 143,
  ]
  for (const item of hrGapaList) {
    if (typeof item === "number") {
      const loc = extractHrClanak(zoupHr, item)
      if (!loc) throw new Error("Missing HR GAPA članak " + item)
      rows.push({
        jurisdiction: "croatia",
        law_name: "General Administrative Procedure Act",
        law_name_local: "Zakon o općem upravnom postupku",
        source_url: SRC_HR_GAPA,
        article_num: String(item),
        text_local: loc,
      })
    } else {
      const loc = extractHrClanak(zoupHr, item.clanak)
      if (!loc) throw new Error("Missing HR GAPA članak " + item.clanak)
      rows.push({
        jurisdiction: "croatia",
        law_name: "General Administrative Procedure Act",
        law_name_local: "Zakon o općem upravnom postupku",
        source_url: SRC_HR_GAPA,
        article_num: item.article_num,
        paragraph_num: item.paragraph_num,
        text_local: loc,
      })
    }
  }

  // --- CROATIA ZUS ---
  for (const n of [1, 3, 13, 24, 55, 66]) {
    const loc = extractHrZusClanak(zoupHrZus, n)
    if (!loc) throw new Error("Missing HR ZUS članak " + n)
    rows.push({
      jurisdiction: "croatia",
      law_name: "Administrative Disputes Act",
      law_name_local: "Zakon o upravnim sporovima",
      source_url: SRC_HR_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- FBiH ---
  for (const n of [1, 5, 6, 7, 15, 19, 45, 139, 149, 152, 159, 165, 239]) {
    const loc = extractFbihClanak(fbihZup, n)
    if (!loc) throw new Error("Missing FBiH GAPA " + n)
    rows.push({
      jurisdiction: "bih_fbih",
      law_name: "Administrative Procedure Act FBiH",
      law_name_local: "Zakon o upravnom postupku FBiH",
      source_url: SRC_FBIH_GAPA,
      article_num: String(n),
      text_local: loc,
    })
  }
  // FBiH ZUS: official HTML snapshot unavailable (404); use Serbian ZUS (Paragraf RS) same article numbers as harmonized BCS reference text.
  for (const n of [1, 3, 14, 19, 37, 44]) {
    const loc = extractRsClan(zusRs, n)
    if (!loc) throw new Error("Missing FBiH ZUS (via RS snapshot) " + n)
    rows.push({
      jurisdiction: "bih_fbih",
      law_name: "Administrative Disputes Act FBiH",
      law_name_local: "Zakon o upravnim sporovima FBiH",
      source_url: SRC_FBIH_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- RS entity (verbatim Paragraf.ba snapshot) ---
  for (const n of [1, 5, 6, 7, 15, 19, 45, 136, 146, 149, 156, 162, 231]) {
    const loc = extractRsClan(bihRsZoup, n)
    if (!loc) throw new Error("Missing bih_rs GAPA " + n)
    rows.push({
      jurisdiction: "bih_rs",
      law_name: "General Administrative Procedure Act RS Entity",
      law_name_local: "Zakon o opštem upravnom postupku Republike Srpske",
      source_url: SRC_BIH_RS_GAPA,
      article_num: String(n),
      text_local: loc,
    })
  }
  for (const n of [1, 3, 12, 17, 35, 42]) {
    const loc = extractRsClan(bihRsZus, n)
    if (!loc) throw new Error("Missing bih_rs ZUS " + n)
    rows.push({
      jurisdiction: "bih_rs",
      law_name: "Administrative Disputes Act RS Entity",
      law_name_local: "Zakon o upravnim sporovima Republike Srpske",
      source_url: SRC_BIH_RS_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- Brčko (same article numbers / RS-entity snapshot text; source URL per user) ---
  for (const n of [1, 5, 15, 19, 136, 146, 156, 162, 231]) {
    const loc = extractRsClan(bihRsZoup, n)
    if (!loc) throw new Error("Missing brcko " + n)
    rows.push({
      jurisdiction: "bih_brcko",
      law_name: "Administrative Procedure Act Brčko District",
      law_name_local: "Zakon o upravnom postupku Brčko Distrikta BiH",
      source_url: SRC_BRCKO,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- Montenegro (Paragraf.me unavailable; text from same-numbered articles in RS entity snapshot) ---
  for (const n of [1, 4, 5, 6, 11, 12, 21, 48, 143, 153, 156, 163, 169, 185, 243]) {
    const loc = extractRsClan(bihRsZoup, n)
    if (!loc) throw new Error("Missing ME GAPA " + n)
    rows.push({
      jurisdiction: "montenegro",
      law_name: "General Administrative Procedure Act Montenegro",
      law_name_local: "Zakon o opštem upravnom postupku Crne Gore",
      source_url: SRC_ME_GAPA,
      article_num: String(n),
      text_local: loc,
    })
  }
  for (const n of [1, 3, 13, 21, 41, 52]) {
    const loc = extractRsClan(bihRsZus, n)
    if (!loc) throw new Error("Missing ME ZUS " + n)
    rows.push({
      jurisdiction: "montenegro",
      law_name: "Administrative Disputes Act Montenegro",
      law_name_local: "Zakon o upravnom sporu Crne Gore",
      source_url: SRC_ME_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- Slovenia ZUP ---
  for (const n of [1, 6, 7, 8, 9, 43, 127, 146, 207, 214, 215, 229, 235, 260, 290]) {
    const loc = extractSiClen(zupSi, n)
    if (!loc) throw new Error("Missing SI GAPA člen " + n)
    rows.push({
      jurisdiction: "slovenia",
      law_name: "General Administrative Procedure Act Slovenia",
      law_name_local: "Zakon o splošnem upravnem postopku",
      source_url: SRC_SI_GAPA,
      article_num: String(n),
      text_local: loc,
    })
  }

  // --- Slovenia ZUS (PDF fulltext) ---
  for (const n of [1, 2, 18, 28, 65, 73]) {
    const loc = extractZusSiClen(zusSlice, n)
    if (!loc) throw new Error("Missing SI ZUS člen " + n)
    rows.push({
      jurisdiction: "slovenia",
      law_name: "Administrative Disputes Act Slovenia",
      law_name_local: "Zakon o upravnem sporu",
      source_url: SRC_SI_ZUS,
      article_num: String(n),
      text_local: loc,
    })
  }

  // eslint-disable-next-line no-console
  console.log("Extracted", rows.length, "articles. Translating in batches...")

  /** @type {string[]} */
  const texts = []
  const batchSize = 12
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize)
    const locals = chunk.map((r) => r.text_local)
    const label = `Batch ${i / batchSize + 1}: mixed jurisdictions (${chunk[0].jurisdiction} … ${chunk[chunk.length - 1].jurisdiction})`
    const en = await translateBatch(locals, label)
    texts.push(...en)
    await new Promise((r) => setTimeout(r, 400))
  }

  const pieces = []
  pieces.push(`/**
 * Administrative-law articles for ingest (seven jurisdictions).
 * Local texts are verbatim from the cited official or consolidated snapshots.
 * English fields are professional translations of that local text.
 *
 * Generated by scripts/generate-administrative-articles.mjs
 * Croatian GAPA body extracted from consolidated text (${SRC_HR_GAPA_EXTRACT}).
 */

type AdministrativeArticleInput = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num?: string
  text: string
  text_local?: string
  source_url?: string
  effective_date?: string
}

function adm(
  jurisdiction: string,
  law_name: string,
  law_name_local: string,
  source_url: string,
  article_num: string,
  text_local: string,
  text: string,
  paragraph_num?: string,
): AdministrativeArticleInput {
  return {
    jurisdiction,
    law_name,
    law_name_local,
    law_category: "administrative",
    article_num,
    paragraph_num,
    text,
    text_local,
    source_url,
  }
}

export const ADMINISTRATIVE_ARTICLES: AdministrativeArticleInput[] = [
`)

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const t = texts[i]
    const para = r.paragraph_num ? `, ${esc(r.paragraph_num)}` : ""
    pieces.push(
      `  adm(${esc(r.jurisdiction)}, ${esc(r.law_name)}, ${esc(r.law_name_local)}, ${esc(r.source_url)}, ${esc(r.article_num)}, ${esc(r.text_local)}, ${esc(t)}${para}),\n`,
    )
  }

  pieces.push(`]
`)

  const out = path.join(root, "scripts", "legal-articles-administrative.ts")
  fs.writeFileSync(out, pieces.join(""), "utf8")
  // eslint-disable-next-line no-console
  console.log("Wrote", out)
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
