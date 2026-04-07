import fs from "node:fs"

const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
for (const n of ["248", "249", "252", "253"]) {
  const re = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">\\d+\\. člen</p>|<p class="center odsek">|$)`,
  )
  const m = h.match(re)
  console.log("---", n)
  console.log(m ? m[0].replace(/\s+/g, " ").trim().slice(0, 2000) : "MISS")
}
