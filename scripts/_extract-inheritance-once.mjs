/**
 * One-off helper: prints JSON of extracted articles from HTML snapshots.
 * Run: node scripts/_extract-inheritance-once.mjs
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

function extractRsParagraf(html, nums) {
  const out = {}
  for (const n of nums) {
    const name = n === "4" || n === "5" ? `clan_${n}\\*` : `clan_${n}`
    const re = new RegExp(
      `<p class="clan"><a name="${name}"></a>[^<]*</p>([\\s\\S]*?)(?=<p class="clan">|<p class="wyq)`,
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

const rsNums =
  "1,2,4,5,9,10,12,19,22,31,34,38,42,65,67,68,72,92,102,130,139".split(",")
const hrNums =
  "1,2,4,5,8,9,11,18,30,33,37,41,63,65,66,70,88,98,118,127".split(",")
const fbihNums =
  "1,2,4,5,9,10,12,19,31,34,38,42,65,67,68,72,92,102,130".split(",")

const rsHtml = fs.readFileSync(path.join(root, "tmp-rs-inheritance.html"), "utf8")
const hrHtml = fs.readFileSync(path.join(root, "tmp-hr-inheritance.html"), "utf8")
const fbihHtml = fs.readFileSync(
  path.join(root, "tmp-fbih-inheritance.html"),
  "utf8",
)
const meHtml = fs.readFileSync(path.join(root, "tmp-me-inheritance.html"), "utf8")

console.log(
  JSON.stringify(
    {
      rs: extractRsParagraf(rsHtml, rsNums),
      hr: extractHrZakon(hrHtml, hrNums),
      fbih: extractBaParagraf(fbihHtml, fbihNums),
      me: extractBaParagraf(meHtml, fbihNums),
    },
    null,
    2,
  ),
)
