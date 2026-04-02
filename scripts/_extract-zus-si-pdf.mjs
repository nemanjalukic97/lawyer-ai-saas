/**
 * Extract full text from Slovenian UL PDF 105/2006 (ZUS-1) using pdfjs-dist.
 * Run: node scripts/_extract-zus-si-pdf.mjs
 * Writes: tmp-zus-si-fulltext.txt
 */
import fs from "fs"
import path from "path"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"

const root = path.join(import.meta.dirname, "..")
const pdfPath = path.join(root, "tmp-zus-si-105.pdf")
const outPath = path.join(root, "tmp-zus-si-fulltext.txt")

const data = new Uint8Array(fs.readFileSync(pdfPath))
const pdf = await getDocument({ data }).promise

let full = ""
for (let p = 1; p <= pdf.numPages; p++) {
  const page = await pdf.getPage(p)
  const tc = await page.getTextContent()
  const text = tc.items.map((i) => ("str" in i ? i.str : "")).join(" ")
  full += text + "\n"
}

fs.writeFileSync(outPath, full, "utf8")
// eslint-disable-next-line no-console
console.log("Wrote", outPath, "chars", full.length, "pages", pdf.numPages)
