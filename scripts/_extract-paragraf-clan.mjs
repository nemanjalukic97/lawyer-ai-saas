import fs from "fs"

const file = process.argv[2]
const nums = process.argv.slice(3).map(Number)
const html = fs.readFileSync(file, "utf8")

function extractArticle(n) {
  const startRe = new RegExp(
    `<p class="clan"><a name="clan_${n}[^"]*"></a>Član ${n}\\s*</p>`,
    "i",
  )
  const start = html.search(startRe)
  if (start < 0) return null
  const rest = html.slice(start)
  const rel = rest.slice(1).search(/<p class="clan"><a name="clan_/i)
  const block =
    rel >= 0 ? rest.slice(0, rel + 1) : rest.slice(0, 12000)
  const normals = [...block.matchAll(/<p class="normal">([\s\S]*?)<\/p>/gi)]
  let text = normals
    .map((m) =>
      m[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n")
  return text
}

for (const n of nums) {
  const t = extractArticle(n)
  console.log(`\n--- ČLAN ${n} ---\n`)
  console.log(t ?? "(not found)")
}
