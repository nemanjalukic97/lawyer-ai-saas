import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs3-batch.mjs"

const skip = new Set(["118-0-Kz-07-000 142 (1).txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs3-extract/batch2", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-3.ts"
let s = fs.readFileSync(tsPath, "utf8")

s = s.replace(
  /\/\/ Batch 1 of 3 \(PDFs 1–41 alphabetically, \d+ unique cases; 122 PDFs total\)/,
  "// Batches 1-2 of 3 (122 PDFs total)",
)

const batch1Count = (s.match(/case_number:/g) || []).length
const totalAfter = batch1Count + blocks.length

const insert = `,
  // --- Batch 2 of 3 (PDFs 42-82, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

if (!s.endsWith("\n]\n") && !s.endsWith("]\n")) {
  console.error("Unexpected file ending")
  process.exit(1)
}

s = s.replace(/\n]\n$/, `${insert}\n]\n`)

fs.writeFileSync(tsPath, s, "utf8")
console.log("Batch 2 appended:", blocks.length, "entries")
console.log("Running total:", totalAfter)
console.log("First batch2:", caseNumbers[0])
console.log("Last batch2:", caseNumbers[caseNumbers.length - 1])
console.log("Skipped:", [...skip].join(", "))
