/**
 * One-off helper: extract <p class="normal|samostalni1|..."> after each Član from Paragraf-style HTML.
 * Usage: node scripts/_extract-nda-clans.mjs <htmlPath> <articleNums comma-separated>
 */
import fs from "fs"

const path = process.argv[2]
const nums = (process.argv[3] ?? "").split(",").map((s) => s.trim()).filter(Boolean)
const html = fs.readFileSync(path, "utf8")

function stripTags(s) {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim()
}

for (const n of nums) {
  const re = new RegExp(
    `<p class="clan"[^>]*>\\s*<a name="clan_${n}(?:\\*|\\d*)?"></a>\\s*Član ${n}(?:\\*)?\\s*</p>([\\s\\S]*?)(?=<p class="clan"|$)`,
    "i",
  )
  const m = html.match(re)
  if (!m) {
    console.error("MISSING", n)
    continue
  }
  const inner = m[1]
  const parts = inner.split(/(?=<p class=")/g).filter((x) => x.includes("<p "))
  const text = parts.map(stripTags).filter(Boolean).join("\n\n")
  console.log("---ARTICLE", n, "---")
  console.log(text)
  console.log()
}
