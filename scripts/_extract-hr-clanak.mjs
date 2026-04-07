import fs from "fs"

const file = process.argv[2] || "tmp-hr-ztd.html"
const html = fs.readFileSync(file, "utf8")
const nums = process.argv.slice(3).map(Number)

function extract(n) {
  const needle = new RegExp(
    `<p[^>]*class="cms-zakon-clanak">Članak ${n}\\.`,
    "i",
  )
  const idx = html.search(needle)
  if (idx < 0) return null
  const tail = html.slice(idx)
  const next = tail.slice(1).search(/<p[^>]*class="cms-zakon-clanak">Članak \d+\./i)
  const block = next >= 0 ? tail.slice(0, next + 1) : tail.slice(0, 25000)
  const chunks = [...block.matchAll(/<div><p[^>]*>([\s\S]*?)<\/p><\/div>/gi)]
  const text = chunks
    .map((m) =>
      m[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((s) => s.length > 0 && !s.match(/^Članak \d/i))
    .join("\n\n")
  return text || null
}

const out = {}
for (const n of nums) out[String(n)] = extract(n)
const outFile =
  file.includes("stecaj") ? "tmp-hr-stecaj-articles.json" : "tmp-hr-ztd-articles.json"
fs.writeFileSync(outFile, JSON.stringify(out, null, 2), "utf8")
console.log("written", Object.keys(out).filter((k) => out[k]).length)
