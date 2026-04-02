import fs from "fs"

const htmlPath = process.argv[2]
const nums = process.argv[3].split(",").map((s) => parseInt(s.trim(), 10))
const html = fs.readFileSync(htmlPath, "utf8")

function extract(num) {
  const a = `name="clan_${num}"`
  const b = `name="clan_${num + 1}"`
  const i0 = html.indexOf(a)
  const i1 = html.indexOf(b, i0 + 1)
  if (i0 < 0) return { err: "no start", num }
  if (i1 < 0) return { err: "no end", num }
  let inner = html.slice(i0, i1)
  inner = inner.replace(/<p class="wyq[^"]*"[^>]*>[\s\S]*?<\/p>/gi, "")
  inner = inner.replace(/<p class="normalprored"[^>]*>[\s\S]*?<\/p>/gi, "")
  inner = inner.replace(/<blockquote>[\s\S]*?<\/blockquote>/gi, " ")
  inner = inner.replace(/<[^>]+>/g, " ")
  inner = inner.replace(/\s+/g, " ").trim()
  inner = inner.replace(/^[^Č]*Član \d+\s*/i, "")
  return inner
}

for (const n of nums) {
  const t = extract(n)
  console.log(`--- ${n} ---`)
  console.log(JSON.stringify(t))
}
