/**
 * One-off helper: extract plain text for Član N from Paragraf HTML (zp-rs.html in TEMP).
 * Run: node scripts/_extract-paragraf-clan.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = process.argv[2] || path.join(process.env.TEMP || "/tmp", "zp-rs.html")
const html = fs.readFileSync(htmlPath, "utf8")

function extractArticle(n) {
  const re = new RegExp(
    `<a name="clan_${n}"></a>Član ${n}\\s*</p>([\\s\\S]*?)(?=<p class="clan"><a name="clan_)`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  const chunk = m[1]
  const texts = [...chunk.matchAll(/<p class="normal">([^<]*)<\/p>/g)].map((x) => x[1].trim())
  return texts.join("\n")
}

const nums = process.argv[3] ? process.argv[3].split(",").map(Number) : [1, 2, 6, 10, 14, 17, 55, 105, 168, 211]
for (const n of nums) {
  const t = extractArticle(n)
  console.log(JSON.stringify({ n, len: t?.length ?? 0, text: t ?? "" }))
}
