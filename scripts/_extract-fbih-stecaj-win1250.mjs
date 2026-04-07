import fs from "fs"

const buf = fs.readFileSync("tmp-fbih-stecaj.htm")
const html = new TextDecoder("windows-1250").decode(buf)

function extractArticle(n) {
  const titleRe = new RegExp(
    `<b>Član ${n}\\.</b>\\s*<br>\\s*([^<]+)`,
    "i",
  )
  const startIdx = html.search(new RegExp(`<b>Član ${n}\\.</b>`, "i"))
  if (startIdx < 0) return null
  const tail = html.slice(startIdx)
  const nextIdx = tail.slice(50).search(/<b>Član \d+\.<\/b>/i)
  const block = nextIdx >= 0 ? tail.slice(0, nextIdx + 50) : tail.slice(0, 8000)
  const text = block
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim()
  return text.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n")
}

const nums = [1, 3, 5, 22, 44, 68, 156]
const out = {}
for (const n of nums) {
  out[String(n)] = extractArticle(n)
}
fs.writeFileSync("tmp-fbih-stecaj-articles.json", JSON.stringify(out, null, 2), "utf8")
console.log(nums.map((n) => [n, (out[String(n)] ?? "").slice(0, 80)]))
