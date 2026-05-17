import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs11-batch.mjs"

const skip = new Set(["11 0 K 003556 11 Kzz.txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs11-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-11.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv javnog reda i mira.
// Batch 1 of 3 (PDFs 1–10 alphabetically, ${blocks.length} unique cases; 30 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_11: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-10, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-11.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
