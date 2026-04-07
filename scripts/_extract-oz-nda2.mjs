import fs from "fs"
const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
function extract(n) {
  const re = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">\\d+\\. člen</p>|<p class="center odsek">|$)`,
  )
  const m = h.match(re)
  if (!m) {
    console.error("miss", n)
    return
  }
  const t = m[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  console.log(JSON.stringify({ n, t }, null, 0))
}
for (const n of [251]) extract(n)
