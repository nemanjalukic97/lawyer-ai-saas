/**
 * One-off: extract text_local from HTML snapshots. Run from repo root:
 *   node scripts/_extract-inheritance-all.mjs > tmp-inheritance-extract.json
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

function stripTags(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function extractRsParagraf(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<p class="clan"><a name="clan_${n}"></a>[^<]*</p>([\\s\\S]*?)(?=<p class="clan">|<p class="wyq)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const paras = [...m[1].matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    const text = paras
      .map((x) => stripTags(x[1]).replace(/\s*\(\s*$/g, ""))
      .filter(Boolean)
      .join("\n\n")
    out[n] = text
  }
  return out
}

function extractHrZakon(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<p[^>]*class="cms-zakon-clanak"[^>]*>\\s*Članak\\s*${n}\\.\\s*<\\/p>\\s*<\\/div>\\s*([\\s\\S]*?)(?=<div style="text-align:center;"><p[^>]*class="cms-zakon-clanak")`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const inner = m[1]
    const paras = [...inner.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    const text = paras
      .map((x) => stripTags(x[1]))
      .filter((t) => t && !t.startsWith("SUDSKA PRAKSA"))
      .join("\n\n")
    out[n] = text
  }
  return out
}

function extractBaParagraf(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<p class="clan"><a name="clan_${n}"></a>\\s*Član\\s*${n}[^<]*</p>([\\s\\S]*?)(?=<p class="clan">|<p class="wyq)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const paras = [...m[1].matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    const text = paras.map((x) => stripTags(x[1])).filter(Boolean).join("\n\n")
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
    const next = rest.slice(1).search(/<p class="clan[^"]*"[^>]*>\s*<a name="clan_/)
    const block = next < 0 ? rest : rest.slice(0, next + 1)
    const paras = [...block.matchAll(/<p class="normal"[^>]*>([\s\S]*?)<\/p>/g)]
    let text = paras
      .map((x) => stripTags(x[1]))
      .filter(Boolean)
      .join("\n\n")
    const title = block.match(
      /<p class="wyq110---naslov-clana"[^>]*>[\s\S]*?<\/p>/,
    )
    if (title) {
      const t = stripTags(title[0])
      if (t && !text.startsWith(t)) text = t + "\n\n" + text
    }
    out[n] = text
  }
  return out
}

function extractBrckoAdvokat(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<p class="style17"><a id="clan_${n}" name="clan_${n}"></a>Član ${n}</p>([\\s\\S]*?)(?=<p class="style17"><a id="clan_\\d+")`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    const inner = m[1]
    const paras = [...inner.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/gi)]
    const text = paras
      .map((x) => stripTags(x[2]))
      .filter((t) => t && t.length > 2)
      .join("\n\n")
    out[n] = text
  }
  return out
}

function extractMePodaci(html, nums) {
  const out = {}
  for (const n of nums) {
    const re = new RegExp(
      `<H3>\\s*(?:&#268;|Č)lan\\s*${n}\\s*</H3>\\s*([\\s\\S]*?)(?=<H[23]>)`,
      "i",
    )
    const m = html.match(re)
    if (!m) {
      out[n] = null
      continue
    }
    let t = m[1]
    t = t.replace(/<br\s*\/?>/gi, "\n")
    t = stripTags(t)
    t = decodeHtmlEntities(t)
    out[n] = t.replace(/\n{3,}/g, "\n\n").trim()
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
  return t.replace(/\n{3,}/g, "\n\n").trim()
}

const rsNums =
  "1,2,4,5,9,10,12,19,22,31,34,38,42,65,67,68,72,92,102,130,139".split(",")
const hrNums =
  "1,2,4,5,8,9,11,18,30,33,37,41,63,65,66,70,88,98,118,127".split(",")
const fbihNums =
  "1,2,4,5,9,10,12,19,31,34,38,42,65,67,68,72,92,102,130".split(",")
const bihrsNums = fbihNums
const brckoNums =
  "1,2,4,5,9,10,12,31,38,42,67,68,92,130".split(",")
const meNums = fbihNums

const rsHtml = fs.readFileSync(path.join(root, "tmp-rs-inheritance.html"), "utf8")
const hrHtml = fs.readFileSync(path.join(root, "tmp-hr-inheritance.html"), "utf8")
const fbihHtml = fs.readFileSync(
  path.join(root, "tmp-fbih-inheritance.html"),
  "utf8",
)
const bihrsHtml = fs.readFileSync(
  path.join(root, "tmp-bihrs-epravo.html"),
  "utf8",
)
const brckoHtml = fs.readFileSync(
  path.join(root, "tmp-brcko-advokat.html"),
  "utf8",
)
const meHtml = fs.readFileSync(path.join(root, "tmp-me-law.html"), "utf8")

const siMap = {
  1: "tmp-si-1.html",
  2: "tmp-si-2.html",
  4: "tmp-si-4.html",
  5: "tmp-si-126.html",
  9: "tmp-si-10.html",
  10: "tmp-si-10.html",
  12: "tmp-si-12.html",
  19: "tmp-si-19.html",
  25: "tmp-si-25.html",
  26: "tmp-si-26.html",
  30: "tmp-si-34.html",
  57: "tmp-si-w59.html",
  60: "tmp-si-w62.html",
  64: "tmp-si-w63.html",
  68: "tmp-si-judicial-will-bundle.html",
  102: "tmp-si-102.html",
  137: "tmp-si-137.html",
  175: "tmp-si-117.html",
}

const si = {}
for (const [k, file] of Object.entries(siMap)) {
  const p = path.join(root, file)
  if (!fs.existsSync(p)) {
    si[k] = null
    continue
  }
  if (k === "68") {
    const parts = ["tmp-si-j65.html", "tmp-si-j66.html", "tmp-si-j67.html"].map(
      (f) => {
        const fp = path.join(root, f)
        return fs.existsSync(fp) ? extractZakonodajaSi(fs.readFileSync(fp, "utf8")) : ""
      },
    )
    si[k] = parts.filter(Boolean).join("\n\n")
    continue
  }
  si[k] = extractZakonodajaSi(fs.readFileSync(p, "utf8"))
}

const payload = {
  rs: extractRsParagraf(rsHtml, rsNums),
  hr: extractHrZakon(hrHtml, hrNums),
  fbih: extractBaParagraf(fbihHtml, fbihNums),
  bihrs: extractEpravoRs(bihrsHtml, bihrsNums),
  brcko: extractBrckoAdvokat(brckoHtml, brckoNums),
  me: extractMePodaci(meHtml, meNums),
  si,
}

console.log(JSON.stringify(payload, null, 2))
