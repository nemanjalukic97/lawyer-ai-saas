import fs from "fs"
const h = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
const re = /<p class="center bold clen">(\d+)\. člen<\/p>/gu
const arts = []
let m
while ((m = re.exec(h)) !== null) arts.push(+m[1])
const near = [...new Set(arts.filter((n) => n >= 240 && n <= 270))].sort((a, b) => a - b)
console.log(near.join(", "))

function extract(n) {
  const marker = `<p class="center bold clen">${n}. člen</p>`
  const i = h.indexOf(marker)
  if (i < 0) return null
  const rest = h.slice(i + marker.length)
  const next = rest.search(/<p class="center bold clen">\d+\. člen<\/p>/u)
  const block = next >= 0 ? rest.slice(0, next) : rest.slice(0, 4000)
  return block
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
for (const n of [3, 4, 20, 247, 249, 251, 252, 253]) {
  console.log("\n---", n, "---\n", extract(n))
}
