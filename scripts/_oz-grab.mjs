import fs from "fs"
const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
function grab(n) {
  const re = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">|$)`,
  )
  const m = h.match(re)
  if (!m) return `MISS ${n}`
  return m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}
for (const n of [3, 4, 247, 249, 251, 252, 253]) {
  console.log(`\n--- ${n} ---\n${grab(n).slice(0, 2000)}`)
}
