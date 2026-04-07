import fs from "fs"
import path from "path"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"

const file = process.argv[2]
if (!file) {
  console.error("usage: node scripts/_pdf-to-text.mjs <pdf>")
  process.exit(1)
}
const buf = fs.readFileSync(file)
const data = new Uint8Array(buf)
const doc = await pdfjs.getDocument({ data, disableWorker: true }).promise
let full = ""
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i)
  const tc = await page.getTextContent()
  full +=
    tc.items.map((/** @type {{ str: string }} */ x) => x.str).join(" ") + "\n"
}
const out = file.replace(/\.pdf$/i, ".txt")
fs.writeFileSync(out, full, "utf8")
console.log("pages", doc.numPages, "->", out)
