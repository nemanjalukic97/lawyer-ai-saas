import fs from "fs"
import path from "path"

const base =
  "c:/Users/neco9/AppData/Roaming/Cursor/User/workspaceStorage/08c548f7f6bc0a00d7b409204520d49c/pdfs"
const want = fs.readFileSync("tmp-bih-rs5-filenames.txt", "utf8").trim().split(/\r?\n/).filter(Boolean)

const found = new Map()
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith(".pdf") && !found.has(e.name)) found.set(e.name, p)
  }
}
walk(base)

const paths = []
for (const fn of want) {
  const p = found.get(fn)
  if (!p) console.log("MISSING", fn)
  else paths.push(path.relative(base, p).replace(/\\/g, "/"))
}
paths.sort((a, b) => path.basename(a).localeCompare(path.basename(b), "sr"))

const n = paths.length
const b1 = Math.ceil(n / 3)
const b2 = Math.ceil((n - b1) / 2)
fs.writeFileSync("tmp-bih-rs5-all-paths.txt", paths.join("\n"))
fs.writeFileSync("tmp-bih-rs5-batch1-paths.txt", paths.slice(0, b1).join("\n"))
fs.writeFileSync("tmp-bih-rs5-batch2-paths.txt", paths.slice(b1, b1 + b2).join("\n"))
fs.writeFileSync("tmp-bih-rs5-batch3-paths.txt", paths.slice(b1 + b2).join("\n"))
console.log("total", n, "b1", b1, "b2", b2, "b3", n - b1 - b2)
paths.slice(0, b1).forEach((p) => console.log("b1:", path.basename(p)))
