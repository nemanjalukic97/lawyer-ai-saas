import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs9-batch.mjs"

const skip = new Set([
  "12 0 K 000239 10 Kz (1).txt",
  "11 0 K 027559 21 Kz 2 (1).txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs9-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-9.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv bezbjednosti javnog saobraćaja.
// Batch 1 of 3 (PDFs 1–31 alphabetically, ${blocks.length} unique cases; 93 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_9: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-31, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-9.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
