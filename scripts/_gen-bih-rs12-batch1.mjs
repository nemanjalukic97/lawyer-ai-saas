import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs12-batch.mjs"

const skip = new Set([
  "11 0 K 000147 09 Kzk 2.txt",
  "11 0 K 000147 09 Kzz.txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs12-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-12.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv pravosuđa.
// Batch 1 of 3 (PDFs 1–9 alphabetically, ${blocks.length} unique cases; 27 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_12: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-9, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-12.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
