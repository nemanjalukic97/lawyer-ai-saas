import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const h = fs.readFileSync(path.join(root, "tmp-oz-pisrs.html"), "utf8")

function extract(n) {
  const needle = `<p class="center bold clen">${n}. člen</p>`
  const i = h.indexOf(needle)
  if (i < 0) return null
  const rest = h.slice(i + needle.length)
  const next = rest.search(/<p class="center bold clen">\d+\. člen<\/p>/)
  const block = next >= 0 ? rest.slice(0, next) : rest.slice(0, 4000)
  return block
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

for (const n of [3, 4, 20, 247, 249, 251]) {
  const t = extract(n)
  console.log("===", n, "len", t?.length)
  console.log(t?.slice(0, 1200))
}
