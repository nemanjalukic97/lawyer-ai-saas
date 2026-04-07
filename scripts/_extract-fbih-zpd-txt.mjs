import fs from "fs"

const raw = fs.readFileSync("tmp-fbih-zpd.txt", "utf8")
const oneLine = raw.replace(/\s+/g, " ").trim()

function articleText(n) {
  const re = new RegExp(
    `Član\\s+${n}\\.\\s*([\\s\\S]*?)(?=Član\\s+\\d+\\.\\s|$)`,
    "i",
  )
  const m = oneLine.match(re)
  return m ? m[1].trim().replace(/\s+/g, " ") : null
}

const nums = [1, 8, 19, 54, 93, 289, 329]
const out = {}
for (const n of nums) out[String(n)] = articleText(n)
fs.writeFileSync("tmp-fbih-zpd-articles.json", JSON.stringify(out, null, 2), "utf8")
console.log(nums.map((n) => [n, !!out[String(n)]]))
