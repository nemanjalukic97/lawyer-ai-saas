import fs from "fs"
const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
function ex(n) {
  const re = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">\\d+\\. člen</p>|<p class="center odsek">)`,
    "g",
  )
  let m
  while ((m = re.exec(h)) !== null) {
    const slice = m[0]
    if (!slice.includes("»") && !slice.includes('class=" napaka"')) return norm(slice)
  }
  const re2 = new RegExp(
    `<p class="center bold clen">${n}\\. člen</p>([\\s\\S]*?)(?=<p class="center bold clen">\\d+\\. člen</p>|<p class="center odsek">)`,
  )
  const m2 = h.match(re2)
  return m2 ? norm(m2[0]) : null
}
function norm(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
const i3 = h.indexOf('<p class="center bold clen">3. člen</p>')
const i4 = h.indexOf('<p class="center bold clen">4. člen</p>')
const i5 = h.indexOf('<p class="center bold clen">5. člen</p>')
console.log("raw 3->4:", h.slice(i3, i4))
console.log("raw 4->5:", h.slice(i4, i5))
for (const n of [3, 4, 20, 247]) {
  console.log("---", n)
  console.log(ex(n))
}
