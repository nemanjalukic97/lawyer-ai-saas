import fs from "fs"
import path from "path"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"

const base =
  "c:/Users/neco9/AppData/Roaming/Cursor/User/workspaceStorage/08c548f7f6bc0a00d7b409204520d49c/pdfs"
const listFile = process.argv[2] || "tmp-bih-rs7-batch1-paths.txt"
const outDir = process.argv[3] || "tmp-bih-rs7-extract/batch1"

const raw = fs.readFileSync(listFile, "utf8").trim().split(/\r?\n/).filter(Boolean)
const lines = raw.map((l) => {
  if (l.includes("/pdfs/")) {
    const i = l.indexOf("/pdfs/")
    return l.slice(i + 6)
  }
  return l
})

fs.mkdirSync(outDir, { recursive: true })

async function extractPdf(rel) {
  const pdfPath = path.join(base, rel)
  const name = path.basename(rel, ".pdf").replace(/[^\w\s\-().]/g, "_")
  const outPath = path.join(outDir, `${name}.txt`)
  if (!fs.existsSync(pdfPath)) {
    return { rel, ok: false, chars: 0, error: "missing" }
  }
  try {
    const buf = fs.readFileSync(pdfPath)
    const doc = await pdfjs
      .getDocument({ data: new Uint8Array(buf), disableWorker: true })
      .promise
    let full = ""
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const tc = await page.getTextContent()
      full += tc.items.map((x) => x.str).join(" ") + "\n"
    }
    fs.writeFileSync(outPath, full, "utf8")
    return { rel, ok: true, chars: full.length, pages: doc.numPages, outPath }
  } catch (e) {
    return { rel, ok: false, chars: 0, error: String(e.message || e) }
  }
}

const results = []
for (const rel of lines) {
  const r = await extractPdf(rel)
  results.push(r)
  const flag = r.chars < 200 ? "SCAN?" : "ok"
  console.log(`${flag} ${r.chars}\t${path.basename(rel)}\t${r.error || ""}`)
}

fs.writeFileSync(path.join(outDir, "_summary.json"), JSON.stringify(results, null, 2))
