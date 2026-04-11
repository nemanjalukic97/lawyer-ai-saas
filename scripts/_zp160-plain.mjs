import fs from "fs"

function stripTags(s) {
  let t = s
  for (let i = 0; i < 20; i++) {
    const n = t.replace(/<[^>]+>/g, "")
    if (n === t) break
    t = n
  }
  return t.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
}

const h = fs.readFileSync("tmp-zp160.html", "utf8")
const paras = [...h.matchAll(/<p class="mrppsi">([\s\S]*?)<\/p>/g)]
const parts = paras.map((p) => stripTags(p[1])).filter(Boolean)
console.log(parts.join("\n\n"))
