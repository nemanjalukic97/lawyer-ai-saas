import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs4-batch.mjs"

const skip = new Set()
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs4-extract/batch3", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-4.ts"
let s = fs.readFileSync(tsPath, "utf8")

const totalUnique = 13 + blocks.length
const duplicatesTotal = 20 - totalUnique

s = s.replace(
  /\/\/ Batches 1-2 of 3 \(20 PDFs total\)/,
  `// All 3 batches complete (20 PDFs, ${totalUnique} unique cases${duplicatesTotal ? `; ${duplicatesTotal} duplicate PDF skipped` : ""})`,
)

const insert = `,
  // --- Batch 3 of 3 (PDFs 15-20, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 3 appended:", blocks.length, "entries")
console.log("Running total:", totalUnique)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
