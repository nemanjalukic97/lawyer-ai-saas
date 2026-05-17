import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs8-batch.mjs"

const skip = new Set()
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs8-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-8.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv pravnog saobraćaja (nesavjesna vožnja, saobraćajna nezgoda, alkohol).
// Batch 1 of 3 (PDFs 1–8 alphabetically, ${blocks.length} unique cases; 22 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_8: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-8, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-8.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
if (skip.size) console.log("Skipped:", [...skip].join(", "))
