import fs from "fs"
import path from "path"

const file = path.join(process.cwd(), "tmp-rs-zpd-full.html")
const html = fs.readFileSync(file, "utf8")

function extractArticle(num) {
  const re = new RegExp(
    `<p class="clan"><a name="clan_${num}"></a>Član ${num}[^<]*</p>([\\s\\S]*?)(?=<p class="clan"><a name="clan_)`,
    "m",
  )
  const m = html.match(re)
  if (!m) return null
  return m[1]
    .replace(/<p class="normal">/g, "")
    .replace(/<\/p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const nums = [
  "94",
  "101",
  "107",
  "116",
  "117",
  "118",
  "120",
  "121",
  "131",
  "133",
  "134",
  "137",
]
for (const n of nums) {
  const t = extractArticle(n)
  // eslint-disable-next-line no-console
  console.log("---", n, "---")
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(t))
}
