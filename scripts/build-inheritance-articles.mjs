/**
 * Builds scripts/legal-articles-inheritance.ts from HTML snapshots.
 * Run from repo root: node scripts/build-inheritance-articles.mjs
 * Optional: set OPENAI_API_KEY (e.g. via .env.local) for one-pass accurate English `text` fields.
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config({ path: ".env.local" })
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

function stripTags(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&scaron;/gi, "š")
    .replace(/&Scaron;/g, "Š")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function extractRsParagraf(html, nums, star45 = false) {
  const out = {}
  for (const n of nums) {
    const useStar = star45 && (n === "4" || n === "5")
    const anchor = useStar ? `clan_${n}\\*` : `clan_${n}`
    const re = new RegExp(
      `<p class="clan"><a name="${anchor}"></a>[^<]*</p>([\\s\\S]*?)(?=<p class="clan">|<p class="wyq)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const paras = [...m[1].matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    const text = paras
      .map((x) => decodeEntities(stripTags(x[1])).replace(/\s*\(\s*$/g, ""))
      .filter(Boolean)
      .join("\n\n")
    out[n] = text
  }
  return out
}

function extractHrArticle(html, n) {
  const re = new RegExp(
    `<p[^>]*class="cms-zakon-clanak"[^>]*>\\s*.lanak\\s*${n}\\.[\\s\\S]*?<\\/p>`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  const start = m.index + m[0].length
  const rest = html.slice(start)
  const next = rest.search(
    /<p[^>]*class="cms-zakon-clanak"[^>]*>\s*.lanak\s*\d+\./i,
  )
  const block = next < 0 ? rest : rest.slice(0, next)
  const paras = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  return paras
    .map((x) => decodeEntities(stripTags(x[1])))
    .filter((t) => t && !/^SUDSKA PRAKSA/i.test(t) && t !== "&nbsp;")
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function extractBaParagraf(html, nums) {
  const out = {}
  for (const n of nums) {
    const star = n === "130" ? "\\*" : ""
    const re = new RegExp(
      `<p class="clan"><a name="clan_${n}${star}"></a>\\s*Član\\s*${n}\\*?[^<]*</p>([\\s\\S]*?)(?=<p class="clan">|<p class="wyq)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const paras = [...m[1].matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    const text = paras
      .map((x) => decodeEntities(stripTags(x[1])))
      .filter(Boolean)
      .join("\n\n")
    out[n] = text
  }
  return out
}

function extractEpravoRs(html, nums) {
  const out = {}
  for (const n of nums) {
    const head = new RegExp(
      `<p class="clan[^"]*"[^>]*>\\s*<a name="clan_(?:an_)?${n}"></a>\\s*Član\\s*${n}\\s*</p>`,
      "i",
    )
    const idx = html.search(head)
    if (idx < 0) {
      out[n] = null
      continue
    }
    const rest = html.slice(idx)
    const next = rest
      .slice(1)
      .search(
        /<p class="clan[^"]*"[^>]*>\s*<a name="clan_(?:an_)?\d+"><\/a>\s*Član\s*\d+/i,
      )
    const block = next < 0 ? rest : rest.slice(0, next + 1)
    const paras = [...block.matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    let text = paras
      .map((x) => decodeEntities(stripTags(x[1])))
      .filter(Boolean)
      .join("\n\n")
    const title = block.match(/<p class="wyq110---naslov-clana"[^>]*>([\s\S]*?)<\/p>/)
    if (title) {
      const t = decodeEntities(stripTags(title[1]))
      if (t && !text.startsWith(t)) text = `${t}\n\n${text}`
    }
    out[n] = text
  }
  return out
}

function extractBrckoAdvokat(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<p class="style17"><a id="clan_${n}" name="clan_${n}"></a>Član ${n}</p>([\\s\\S]*?)(?=<p class="style17"><a id="clan_\\d+" name="clan_\\d+"></a>Član \\d+</p>)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const inner = m[1].replace(/<p class="style17">/gi, "\n").replace(/<\/p>/gi, "")
    const parts = inner
      .split(/\n+/)
      .map((x) => decodeEntities(stripTags(x)))
      .filter((t) => t && t.length > 2)
    out[n] = parts.join("\n\n")
  }
  return out
}

function extractZakonodajaSi(html) {
  const start = html.indexOf("(neuradno pre")
  if (start < 0) return ""
  const sub = html.slice(start)
  const end = sub.indexOf("<blockquote>")
  let t = sub
    .slice(0, end)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s*\n\s*/g, "\n")
    .trim()
  t = t.replace(/^\(neuradno prečiščeno besedilo\)\s*/i, "")
  return decodeEntities(t.replace(/\n{3,}/g, "\n\n").trim())
}

function esc(s) {
  return JSON.stringify(s ?? "")
}

function enLine(s) {
  return (s ?? "").replace(/\s+/g, " ").trim()
}

/** Short faithful English for RAG; expand if needed. */
function englishFor(key, textLocal) {
  if (!textLocal) return `[${key}] (missing local text)`
  const t = enLine(textLocal).slice(0, 1200)
  const snippets = {
    "rs:1": "The estate is inherited. The estate comprises all rights fit for inheritance that belonged to the deceased at death, excluding certain household items and assets increased by heirs' labor in community with the deceased.",
    "rs:2": "Inheritance arises by law and by will (testament).",
    "rs:4": "Certain persons may not inherit or take benefits under a will (unworthiness), including intentional killing or attempted killing of the deceased, inducing or preventing a will by duress or fraud, destroying or forging a will, and grave breaches of maintenance duties.",
    "rs:5": "The deceased may forgive unworthiness; forgiveness must take the form required for a will.",
    "rs:9": "The first order of heirs comprises the deceased's descendants and spouse; they inherit in equal shares, with court-adjusted shares in specified mixed-family cases.",
    "rs:10": "Representation: the share of a predeceased child passes to that child's descendants in per stirpes fashion.",
    "rs:12": "The second order comprises the spouse and parents; siblings and their descendants inherit under detailed rules when a parent predeceased.",
    "rs:19": "The fourth order comprises great-grandparents; shares follow parent-line rules with substitution and spouse rules as set out.",
    "rs:22": "Statutory right of first refusal among co-heirs in undivided co-ownership, with price and procedure rules.",
    "rs:31": "Parents without means called to inherit with the spouse may claim lifelong usufruct on part of the estate within one year; further rules on parents' claims and small estates.",
    "rs:34": "Rules on adoption and inheritance between adopters, adoptees and their relatives.",
    "rs:38": "Effects of incomplete adoption on mutual inheritance rights and limited claims by the adopter without other heirs.",
    "rs:42": "The forced share is infringed when dispositions and gifts to forced heirs or their substitutes fall short of the forced share value.",
    "rs:65": "Disinheritance is valid only if at death the disinherited person has a minor child or grandchild, or an adult descendant unable to work.",
    "rs:67": "Gifts are not counted against the heir's share if the deceased declared they should not count; forced-share rules still apply.",
    "rs:68": "Advance deliveries to statutory heirs count against their shares unless the will provides otherwise.",
    "rs:72": "Valuation of gifts for collation at counting time, by condition when given.",
    "rs:92": "International wills valid if made in the prescribed international form; nullity as international will does not preclude validity as another will type.",
    "rs:102": "The authorized person attaches a certificate to the international will in the form prescribed by convention.",
    "rs:130": "Substitution and time/condition for heirs appointed under resolutive conditions or terms.",
    "rs:139": "Distribution when some heirs have fixed shares and others do not; equalization and reduction rules.",
  }
  if (snippets[key]) return snippets[key]
  return enLine(
    `[${key}] Official provision (local language in text_local): ${t.slice(0, 400)}${t.length > 400 ? "…" : ""}`,
  )
}

async function fillEnglishWithOpenAI(rows) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return rows

  const openai = new OpenAI({ apiKey })
  const merged = new Map()

  const batchSize = 12
  for (let i = 0; i < rows.length; i += batchSize) {
    const slice = rows.slice(i, i + batchSize)
    const payload = slice.map((r) => ({
      key: r.key,
      text_local: (r.textLocal ?? "").slice(0, 4500),
    }))

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You translate civil-law inheritance articles into clear, accurate English for a legal database. " +
            "Return JSON: {\"items\":[{\"key\":\"exact key from input\",\"text\":\"English translation\"}, ...]}. " +
            "Include every key from the user payload, same count. Preserve legal meaning; be concise but complete.",
        },
        {
          role: "user",
          content: JSON.stringify({ articles: payload }),
        },
      ],
    })

    const raw = res.choices?.[0]?.message?.content
    if (!raw) continue
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      continue
    }
    const list = parsed.items ?? parsed.translations
    if (!Array.isArray(list)) continue
    for (const x of list) {
      if (x?.key && x?.text) merged.set(x.key, String(x.text).trim())
    }
  }

  return rows.map((r) => {
    const t = merged.get(r.key)
    if (t) return { ...r, textEn: t }
    return r
  })
}

function row(j, law, lawLoc, cat, url, num, textLocal, textEn) {
  return `  {\n    jurisdiction: ${esc(j)},\n    law_name: ${esc(law)},\n    law_name_local: ${esc(lawLoc)},\n    law_category: ${esc(cat)},\n    article_num: ${esc(num)},\n    source_url: ${esc(url)},\n    text_local: ${esc(textLocal)},\n    text: ${esc(textEn)},\n  },`
}

const URL = {
  rs: "https://www.paragraf.rs/propisi/zakon_o_nasledjivanju.html",
  hr: "https://www.zakon.hr/z/87/Zakon-o-naslje%C4%91ivanju",
  hrOZ: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
  fbih: "https://www.paragraf.ba/propisi/fbih/zakon-o-nasljedivanju-u-federaciji-bih.html",
  bihrs: "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-nasljedivanju.html",
  bihrsEpravo: "https://epravo.ba/zakon-o-nasljedivanju-republike-srpske-bih/",
  brcko: "https://skupstinabd.ba/3-zakoni/ba/Distrikt/b-Nasljedivo%20pravo/zakoni.html",
  brckoSrc: "https://advokat-prnjavorac.com/Zakon-o-nasljedivanju-Brcko-Distrikta-Bosne-i-Hercegovine.html",
  me: "https://www.paragraf.me/propisi-crnegore/zakon-o-nasljedjivanju.html",
  meArc: "https://web.archive.org/web/20210127120000/https://www.paragraf.me/propisi-crnegore/zakon-o-nasljedjivanju.html",
  si: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO268",
}

const rsHtml = fs.readFileSync(path.join(root, "tmp-rs-inheritance.html"), "utf8")
const hrHtml = fs.readFileSync(path.join(root, "tmp-hr-inheritance.html"), "utf8")
const hrOzHtml = fs.readFileSync(path.join(root, "tmp-hr-oz.html"), "utf8")
const fbihHtml = fs.readFileSync(path.join(root, "tmp-fbih-inheritance.html"), "utf8")
const bihrsHtml = fs.readFileSync(path.join(root, "tmp-bihrs-epravo.html"), "utf8")
const brckoHtml = fs.readFileSync(path.join(root, "tmp-brcko-advokat.html"), "utf8")
const meHtml = fs.readFileSync(path.join(root, "tmp-me-archive.html"), "utf8")

const rsN = "1,2,4,5,9,10,12,19,22,31,34,38,42,65,67,68,72,92,102,130,139".split(",")
const hrN = "1,2,4,5,8,9,11,18,30,33,37,41,63,65,66,70,88,98,127".split(",")
const fbihN = "1,2,4,5,9,10,12,19,31,34,38,42,65,67,68,72,92,102,130".split(",")
const bihrsN = fbihN
const brckoN = "1,2,4,5,9,10,12,31,38,42,67,68,92,130".split(",")
const meN = fbihN

const rs = extractRsParagraf(rsHtml, rsN, true)
const fbih = extractBaParagraf(fbihHtml, fbihN)
const bihrs = extractEpravoRs(bihrsHtml, bihrsN)
const brcko = extractBrckoAdvokat(brckoHtml, brckoN)
const me = extractRsParagraf(meHtml, meN, false)

const hr = {}
for (const n of hrN) {
  if (n === "106") continue
  hr[n] = extractHrArticle(hrHtml, n)
}
const hr106 = extractHrArticle(hrHtml, "106")
const hr105 = extractHrArticle(hrHtml, "105")
hr["127"] =
  hr105 && hr106
    ? `Članak 105.\n\n${hr105}\n\nČlanak 106.\n\n${hr106}`
    : hr106 || hr105

const hr118 = extractHrArticle(hrOzHtml, "579")
if (hr118 == null || String(hr118).trim() === "")
  throw new Error("Missing Croatian ZOO članak 579 (lifelong maintenance); check tmp-hr-oz.html")

const siFiles = {
  1: "tmp-si-1.html",
  2: "tmp-si-2.html",
  4: "tmp-si-4.html",
  5: "tmp-si-126.html",
  9: "tmp-si-10.html",
  10: "tmp-si-11.html",
  12: "tmp-si-12.html",
  19: "tmp-si-19.html",
  57: "tmp-si-w59.html",
  60: "tmp-si-w62.html",
  64: "tmp-si-w63.html",
  102: "tmp-si-102.html",
  25: "tmp-si-25.html",
  26: "tmp-si-26.html",
  30: "tmp-si-34.html",
  137: "tmp-si-137.html",
  175: "tmp-si-117.html",
}
const si = {}
for (const [k, f] of Object.entries(siFiles)) {
  const p = path.join(root, f)
  si[k] = fs.existsSync(p) ? extractZakonodajaSi(fs.readFileSync(p, "utf8")) : ""
}
const si68 = ["tmp-si-j65.html", "tmp-si-j66.html", "tmp-si-j67.html"]
  .map((f) => {
    const p = path.join(root, f)
    return fs.existsSync(p) ? extractZakonodajaSi(fs.readFileSync(p, "utf8")) : ""
  })
  .filter(Boolean)
si["68"] = si68.join("\n\n")

const rows = []

function addBatch(jur, law, lawLoc, url, nums, bag, urlOverride) {
  const u = urlOverride ?? url
  for (const n of nums) {
    const tl = bag[n]
    if (tl == null || String(tl).trim() === "")
      throw new Error(`Missing ${jur} article ${n}`)
    const k = `${jur}:${n}`
    rows.push({
      jur,
      law,
      lawLoc,
      url: u,
      num: n,
      textLocal: tl,
      key: k,
      textEn: englishFor(k, tl),
    })
  }
}

addBatch("serbia", "Inheritance Law", "Zakon o nasleđivanju", URL.rs, rsN, rs)
addBatch(
  "croatia",
  "Inheritance Act",
  "Zakon o nasljeđivanju",
  URL.hr,
  "1,2,4,5,8,9,11,18,30,33,37,41,63,65,66,70,88,98,127".split(","),
  { ...hr, 127: hr["127"] },
)
rows.push({
  jur: "croatia",
  law: "Law on Obligations",
  lawLoc: "Zakon o obveznim odnosima",
  url: URL.hrOZ,
  num: "579",
  textLocal: hr118,
  key: "croatia:579",
  textEn: englishFor("croatia:579", hr118),
})

addBatch(
  "bih_fbih",
  "Inheritance Law FBiH",
  "Zakon o nasljeđivanju FBiH",
  URL.fbih,
  fbihN,
  fbih,
)
addBatch(
  "bih_rs",
  "Inheritance Law RS Entity",
  "Zakon o nasljeđivanju Republike Srpske",
  URL.bihrs,
  bihrsN,
  bihrs,
  URL.bihrsEpravo,
)
addBatch(
  "bih_brcko",
  "Inheritance Law Brčko District",
  "Zakon o nasljeđivanju Brčko Distrikta BiH",
  URL.brcko,
  brckoN,
  brcko,
  URL.brckoSrc,
)
addBatch(
  "montenegro",
  "Inheritance Law Montenegro",
  "Zakon o nasljeđivanju Crne Gore",
  URL.me,
  meN,
  me,
  URL.meArc,
)

const siNums = Object.keys(siFiles)
siNums.push("68")
addBatch(
  "slovenia",
  "Inheritance Act Slovenia",
  "Zakon o dedovanju",
  URL.si,
  siNums,
  si,
)

async function main() {
  let out = rows
  if (process.env.OPENAI_API_KEY) {
    // eslint-disable-next-line no-console
    console.log("Translating inheritance articles with OpenAI…")
    out = await fillEnglishWithOpenAI(rows)
  }

  const chunks = out.map((r) =>
    row(r.jur, r.law, r.lawLoc, "civil", r.url, r.num, r.textLocal, r.textEn),
  )

  const header = `/**
 * Inheritance-law articles (seven jurisdictions). Local texts from Paragraf / zakon.hr / ePravo.ba /
 * archived paragraf.me / advokat-prnjavorac.com / zakonodaja.com consolidated ZD-NPB6 HTML snapshots in the repo.
 * Croatia: čl. 116–121 ZNN on lifelong maintenance were repealed; čl. 579 ZOO is used for that topic.
 * Croatia čl. 127 (curriculum): text is čl. 105–106 ZNN (inter vivos transfer and validity).
 * Serbia čl. 4 and 5 use Sl. glasnik footnote anchors (član 4*, 5*). FBiH čl. 130 uses anchor clan_130*.
 */
export const INHERITANCE_ARTICLES = [
`

const footer = `\n]\n`

  const outPath = path.join(root, "scripts", "legal-articles-inheritance.ts")
  fs.writeFileSync(outPath, header + chunks.join("\n") + footer, "utf8")
  // eslint-disable-next-line no-console
  console.log("Wrote", outPath, "rows", chunks.length)
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exitCode = 1
})
