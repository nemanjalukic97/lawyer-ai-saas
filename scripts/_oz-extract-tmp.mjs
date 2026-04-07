import fs from "node:fs"

const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
for (const n of ["252", "253"]) {
  const re = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">\\d+\\. člen</p>|<p class="center odsek">|$)`,
  )
  const m = h.match(re)
  if (!m) {
    console.log(n, "MISS")
    continue
  }
  const plain = m[0]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  console.log("---", n, "---")
  console.log(plain)
}
