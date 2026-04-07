import fs from "fs"

const html = fs.readFileSync("tmp-rs-zpd-full.html", "utf8")

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
    rel >= 0 ? rest.slice(0, rel + 1) : rest.slice(0, 15000)
  const normals = [...block.matchAll(/<p class="normal">([\s\S]*?)<\/p>/gi)]
  return normals
    .map((m) =>
      m[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n")
}

const nums = [18, 29, 54, 93, 289, 329, 348, 387, 469, 488]
const out = {}
for (const n of nums) out[String(n)] = extractArticle(n)
fs.writeFileSync("tmp-rs-zpd-extract.json", JSON.stringify(out, null, 2), "utf8")
console.log("written", Object.keys(out).filter((k) => out[k]).length)
