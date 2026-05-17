import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs6-batch.mjs"

const skip = new Set([
  "11 0 K 007342 12 Kz maskirana.txt",
  "11 0 K 022390 18 Kz 3 anonimizrana.txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs6-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-6.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv zdravlja ljudi (narkotici čl. 282–286., opojna sredstva, lijekovi, otrovi).
// Batch 1 of 3 (PDFs 1–55 alphabetically, ${blocks.length} unique cases; 165 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_6: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-55, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-6.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
