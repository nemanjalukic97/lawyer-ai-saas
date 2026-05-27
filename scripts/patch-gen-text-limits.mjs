#!/usr/bin/env node
/**
 * Remove hard character caps on court_position / reasoning in _gen*.mjs generators.
 * Run: node scripts/patch-gen-text-limits.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptsDir = __dirname

const files = fs
  .readdirSync(scriptsDir)
  .filter((f) => f.startsWith("_gen") && f.endsWith(".mjs"))
  .map((f) => path.join(scriptsDir, f))

const IMPORT_LINE =
  'import { prepareText, extractObrazlozenje, summarizeBihCase, cleanSnippet } from "./_gen-prepare-text.mjs"\n'

function ensureImport(src) {
  if (src.includes("_gen-prepare-text.mjs")) return src
  const importMatch = src.match(/^import .+\n/m)
  if (importMatch) {
    const idx = src.indexOf(importMatch[0]) + importMatch[0].length
    return src.slice(0, idx) + IMPORT_LINE + src.slice(idx)
  }
  return IMPORT_LINE + src
}

function patch(content) {
  let s = content

  // Remove izreka / dispositif slice caps
  s = s.replace(/\.slice\(start,\s*start\s*\+\s*1800\)/g, ".slice(start)")
  s = s.replace(/\.slice\(start,\s*start\s*\+\s*2000\)/g, ".slice(start)")
  s = s.replace(/\.slice\(start,\s*start\s*\+\s*2200\)/g, ".slice(start)")
  s = s.replace(/\.slice\(sliceStart,\s*sliceStart\s*\+\s*2200\)/g, ".slice(sliceStart)")

  // Fallback izreka chunks
  s = s.replace(
    /return chunk\.slice\(0,\s*1600\)/g,
    "return prepareText(chunk)",
  )
  s = s.replace(
    /return chunk\.slice\(0,\s*1800\)/g,
    "return prepareText(chunk)",
  )
  s = s.replace(
    /else iz = chunk\.slice\(0,\s*1600\)/g,
    "else iz = prepareText(chunk)",
  )

  // Regex capture limits in izreka extractors
  s = s.replace(/\[\s\\s\\S\]\{0,\s*900\}/g, "[\\s\\S]*")
  s = s.replace(/\[\s\\s\\S\]\{0,\s*1200\}/g, "[\\s\\S]*")
  s = s.replace(/\[\s\\s\\S\]\{0,\s*1500\}/g, "[\\s\\S]*")
  s = s.replace(/\[\s\\s\\S\]\{0,\s*8000\}/g, "[\\s\\S]*")

  // Serbia bilten holding match
  s = s.replace(/\[\s\\s\\S\]\{0,\s*12000\}/g, "[\\s\\S]*")

  // BiH RS summarize uses truncated latin source
  s = s.replace(/cyrToLatin\(full\.slice\(0,\s*6000\)\)/g, "cyrToLatin(full)")

  // Remove court_position / reasoning caps in cleanSnippet calls (BiH pattern)
  s = s.replace(
    /cleanSnippet\(\s*\n\s*iz\.replace\([^)]+\),\s*\n\s*450,\s*\n\s*\)/g,
    "stripDispositifHeading(iz)",
  )
  s = s.replace(
    /cleanSnippet\(\s*iz\.replace\([^)]+\),\s*450,\s*\)/g,
    "stripDispositifHeading(iz)",
  )

  // Remove 900-char reasoning caps (BiH dumps full + cap)
  s = s.replace(/,\s*\n\s*900,\s*\n\s*\)/g, "\n    )")

  // Remove fallback full.slice caps in BiH summarize
  s = s.replace(
    /\.slice\(0,\s*1200\)\)\s*\n\s*,?\s*\n\s*450,/g,
    ")",
  )
  s = s.replace(/\.slice\(0,\s*1200\)/g, "")
  s = s.replace(/\.slice\(0,\s*1500\)/g, "")

  return s
}

let changed = 0
for (const file of files) {
  if (file.endsWith("patch-gen-text-limits.mjs") || file.endsWith("_gen-prepare-text.mjs")) continue
  const before = fs.readFileSync(file, "utf8")
  let after = patch(before)
  if (after !== before) {
    if (
      after.includes("prepareText(") ||
      after.includes("stripDispositifHeading(") ||
      after.includes("summarizeBihCase(")
    ) {
      after = ensureImport(after)
      if (after.includes("stripDispositifHeading(") && !after.includes("stripDispositifHeading")) {
        after = after.replace(
          'from "./_gen-prepare-text.mjs"',
          'from "./_gen-prepare-text.mjs"',
        )
      }
      if (after.includes("stripDispositifHeading(")) {
        after = after.replace(
          'import { prepareText, extractObrazlozenje, summarizeBihCase, cleanSnippet } from "./_gen-prepare-text.mjs"',
          'import { prepareText, extractObrazlozenje, summarizeBihCase, cleanSnippet, stripDispositifHeading } from "./_gen-prepare-text.mjs"',
        )
      }
    }
    fs.writeFileSync(file, after, "utf8")
    changed++
    console.log("patched", path.basename(file))
  }
}
console.log(`Done. ${changed} file(s) updated.`)
