import fs from "fs"

function extract(file, n) {
  const html = fs.readFileSync(file, "utf8")
  const startRe = new RegExp(
    `<p class="clan"><a name="clan_${n}[^"]*"></a>Član ${n}\\s*</p>`,
    "i",
  )
  const start = html.search(startRe)
  if (start < 0) return null
  const rest = html.slice(start)
  const rel = rest.slice(1).search(/<p class="clan"><a name="clan_/i)
  const block = rel >= 0 ? rest.slice(0, rel + 1) : rest.slice(0, 15000)
  const paras = [
    ...block.matchAll(/<p class="normal(_uvuceni\d+)?">([\s\S]*?)<\/p>/gi),
  ]
  return paras
    .map((m) =>
      m[2]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n")
}

const nums = [1, 2, 3, 11, 33, 52, 86, 143]
const o = {}
for (const n of nums) o[String(n)] = extract("tmp-rs-stecaj-full.html", n)
fs.writeFileSync("tmp-stecaj-articles.json", JSON.stringify(o, null, 2), "utf8")
