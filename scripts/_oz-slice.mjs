import fs from "node:fs"

const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
for (const n of ["248", "249", "250", "251", "252"]) {
  const needle = `<p class="center bold clen">${n}. člen</p>`
  const i = h.indexOf(needle)
  console.log(n, "idx", i)
  if (i >= 0) {
    const chunk = h.slice(i, i + 1800)
    console.log(chunk.replace(/></g, ">\n<").slice(0, 1500))
    console.log("---")
  }
}
