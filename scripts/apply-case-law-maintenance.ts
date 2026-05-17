/**
 * One-off maintenance (run: npx tsx scripts/apply-case-law-maintenance.ts):
 * 1) decision_date: "YYYY" -> "YYYY-01-01" in all scripts/case-law-*.ts
 * 2) Remove duplicate (jurisdiction, case_number) keeping first in index order; report removals
 */
import * as fs from "fs"
import * as path from "path"
import * as ts from "typescript"

import type { CaseLawInput } from "./ingest-case-law"
import { CASE_LAW_CIVIL_SERBIA_1 } from "./case-law-civil-serbia-1"
import { CASE_LAW_CIVIL_SERBIA_2 } from "./case-law-civil-serbia-2"
import { CASE_LAW_CIVIL_SERBIA_3 } from "./case-law-civil-serbia-3"
import { CASE_LAW_CIVIL_SERBIA_4 } from "./case-law-civil-serbia-4"
import { CASE_LAW_CIVIL_SERBIA_5 } from "./case-law-civil-serbia-5"
import { CASE_LAW_LABOR_SERBIA_3 } from "./case-law-labor-serbia-3"
import { CASE_LAW_LABOR_SERBIA_4 } from "./case-law-labor-serbia-4"
import { CASE_LAW_LABOR_SERBIA_5 } from "./case-law-labor-serbia-5"
import { CASE_LAW_LABOR_SERBIA_7 } from "./case-law-labor-serbia-7"
import { CASE_LAW_LABOR_SERBIA_8 } from "./case-law-labor-serbia-8"
import { CASE_LAW_FAMILY_SERBIA_1 } from "./case-law-family-serbia-1"
import { CASE_LAW_FAMILY_SERBIA_2 } from "./case-law-family-serbia-2"
import { CASE_LAW_FAMILY_SERBIA_3 } from "./case-law-family-serbia-3"
import { CASE_LAW_COMMERCIAL_SERBIA_1 } from "./case-law-commercial-serbia-1"
import { CASE_LAW_COMMERCIAL_SERBIA_2 } from "./case-law-commercial-serbia-2"
import { CASE_LAW_COMMERCIAL_SERBIA_3 } from "./case-law-commercial-serbia-3"
import { CASE_LAW_INHERITANCE_SERBIA_1 } from "./case-law-inheritance-serbia-1"
import { CASE_LAW_INHERITANCE_SERBIA_2 } from "./case-law-inheritance-serbia-2"
import { CASE_LAW_ADMINISTRATIVE_SERBIA_1 } from "./case-law-administrative-serbia-1"
import { CASE_LAW_ADMINISTRATIVE_SERBIA_2 } from "./case-law-administrative-serbia-2"
import { CASE_LAW_CRIMINAL_SERBIA_1 } from "./case-law-criminal-serbia-1"
import { CASE_LAW_CRIMINAL_SERBIA_2 } from "./case-law-criminal-serbia-2"

const scriptsDir = path.join(process.cwd(), "scripts")

const CHUNKS: { file: string; exportName: string; data: CaseLawInput[] }[] = [
  { file: "case-law-civil-serbia-1.ts", exportName: "CASE_LAW_CIVIL_SERBIA_1", data: CASE_LAW_CIVIL_SERBIA_1 },
  { file: "case-law-civil-serbia-2.ts", exportName: "CASE_LAW_CIVIL_SERBIA_2", data: CASE_LAW_CIVIL_SERBIA_2 },
  { file: "case-law-civil-serbia-3.ts", exportName: "CASE_LAW_CIVIL_SERBIA_3", data: CASE_LAW_CIVIL_SERBIA_3 },
  { file: "case-law-civil-serbia-4.ts", exportName: "CASE_LAW_CIVIL_SERBIA_4", data: CASE_LAW_CIVIL_SERBIA_4 },
  { file: "case-law-civil-serbia-5.ts", exportName: "CASE_LAW_CIVIL_SERBIA_5", data: CASE_LAW_CIVIL_SERBIA_5 },
  { file: "case-law-labor-serbia-3.ts", exportName: "CASE_LAW_LABOR_SERBIA_3", data: CASE_LAW_LABOR_SERBIA_3 },
  { file: "case-law-labor-serbia-4.ts", exportName: "CASE_LAW_LABOR_SERBIA_4", data: CASE_LAW_LABOR_SERBIA_4 },
  { file: "case-law-labor-serbia-5.ts", exportName: "CASE_LAW_LABOR_SERBIA_5", data: CASE_LAW_LABOR_SERBIA_5 },
  { file: "case-law-labor-serbia-7.ts", exportName: "CASE_LAW_LABOR_SERBIA_7", data: CASE_LAW_LABOR_SERBIA_7 },
  { file: "case-law-labor-serbia-8.ts", exportName: "CASE_LAW_LABOR_SERBIA_8", data: CASE_LAW_LABOR_SERBIA_8 },
  { file: "case-law-family-serbia-1.ts", exportName: "CASE_LAW_FAMILY_SERBIA_1", data: CASE_LAW_FAMILY_SERBIA_1 },
  { file: "case-law-family-serbia-2.ts", exportName: "CASE_LAW_FAMILY_SERBIA_2", data: CASE_LAW_FAMILY_SERBIA_2 },
  { file: "case-law-family-serbia-3.ts", exportName: "CASE_LAW_FAMILY_SERBIA_3", data: CASE_LAW_FAMILY_SERBIA_3 },
  { file: "case-law-commercial-serbia-1.ts", exportName: "CASE_LAW_COMMERCIAL_SERBIA_1", data: CASE_LAW_COMMERCIAL_SERBIA_1 },
  { file: "case-law-commercial-serbia-2.ts", exportName: "CASE_LAW_COMMERCIAL_SERBIA_2", data: CASE_LAW_COMMERCIAL_SERBIA_2 },
  { file: "case-law-commercial-serbia-3.ts", exportName: "CASE_LAW_COMMERCIAL_SERBIA_3", data: CASE_LAW_COMMERCIAL_SERBIA_3 },
  { file: "case-law-inheritance-serbia-1.ts", exportName: "CASE_LAW_INHERITANCE_SERBIA_1", data: CASE_LAW_INHERITANCE_SERBIA_1 },
  { file: "case-law-inheritance-serbia-2.ts", exportName: "CASE_LAW_INHERITANCE_SERBIA_2", data: CASE_LAW_INHERITANCE_SERBIA_2 },
  { file: "case-law-administrative-serbia-1.ts", exportName: "CASE_LAW_ADMINISTRATIVE_SERBIA_1", data: CASE_LAW_ADMINISTRATIVE_SERBIA_1 },
  { file: "case-law-administrative-serbia-2.ts", exportName: "CASE_LAW_ADMINISTRATIVE_SERBIA_2", data: CASE_LAW_ADMINISTRATIVE_SERBIA_2 },
  { file: "case-law-criminal-serbia-1.ts", exportName: "CASE_LAW_CRIMINAL_SERBIA_1", data: CASE_LAW_CRIMINAL_SERBIA_1 },
  { file: "case-law-criminal-serbia-2.ts", exportName: "CASE_LAW_CRIMINAL_SERBIA_2", data: CASE_LAW_CRIMINAL_SERBIA_2 },
]

function fixYearOnlyDecisionDates(content: string): { next: string; count: number } {
  let count = 0
  const next = content.replace(
    /decision_date:\s*"(\d{4})"(?=\s*,)/g,
    (_m, y: string) => {
      count += 1
      return `decision_date: "${y}-01-01"`
    },
  )
  return { next, count }
}

function findArrayLiteral(
  sourceText: string,
  exportConstName: string,
): ts.ArrayLiteralExpression | undefined {
  const sf = ts.createSourceFile(
    "x.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  let found: ts.ArrayLiteralExpression | undefined
  function visit(node: ts.Node) {
    if (found) return
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === exportConstName &&
          decl.initializer &&
          ts.isArrayLiteralExpression(decl.initializer)
        ) {
          found = decl.initializer
          return
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return found
}

function removalRangeForElement(
  fullText: string,
  elements: readonly ts.Expression[],
  idx: number,
): { start: number; end: number } {
  const el = elements[idx]
  const startEl = el.getFullStart()
  const endEl = el.getEnd()

  const tail = fullText.slice(endEl, Math.min(fullText.length, endEl + 40))
  const trailingComma = /^\s*,/.exec(tail)
  if (trailingComma) {
    return { start: startEl, end: endEl + trailingComma[0].length }
  }

  if (idx > 0) {
    const prev = elements[idx - 1]
    const prevEnd = prev.getEnd()
    const gap = fullText.slice(prevEnd, startEl)
    const lastComma = gap.lastIndexOf(",")
    if (lastComma >= 0) {
      return { start: prevEnd + lastComma, end: endEl }
    }
  }

  return { start: startEl, end: endEl }
}

function removeDuplicateArrayElements(
  sourceText: string,
  exportConstName: string,
  indicesToRemove: Set<number>,
): string {
  const arr = findArrayLiteral(sourceText, exportConstName)
  if (!arr) {
    throw new Error(`No array literal for export ${exportConstName}`)
  }

  const elements = arr.elements
  const ranges: { start: number; end: number }[] = []
  for (const idx of indicesToRemove) {
    if (idx < 0 || idx >= elements.length) continue
    ranges.push(removalRangeForElement(sourceText, elements, idx))
  }

  ranges.sort((a, b) => b.start - a.start)
  let out = sourceText
  for (const { start, end } of ranges) {
    out = out.slice(0, start) + out.slice(end)
  }
  return out
}

function main() {
  const reportLines: string[] = []

  // --- Task 1: decision_date year-only ---
  const caseLawFiles = fs
    .readdirSync(scriptsDir)
    .filter((f) => f.startsWith("case-law-") && f.endsWith(".ts") && f !== "case-law-index.ts")

  let totalDateFixes = 0
  for (const file of caseLawFiles) {
    const fp = path.join(scriptsDir, file)
    const raw = fs.readFileSync(fp, "utf8")
    const { next, count } = fixYearOnlyDecisionDates(raw)
    if (count > 0) {
      fs.writeFileSync(fp, next, "utf8")
      totalDateFixes += count
      reportLines.push(`[decision_date] ${file}: normalized ${count} year-only value(s) to YYYY-01-01`)
    }
  }
  reportLines.push(`[decision_date] Total replacements: ${totalDateFixes}`)
  reportLines.push("")

  // --- Task 2: duplicates (global order = CHUNKS order) ---
  const seenKeys = new Set<string>()
  const removeByFile = new Map<string, Set<number>>()

  for (const { file, data } of CHUNKS) {
    data.forEach((row, idx) => {
      const key = `${row.jurisdiction}|${row.case_number.trim()}`
      if (seenKeys.has(key)) {
        if (!removeByFile.has(file)) removeByFile.set(file, new Set())
        removeByFile.get(file)!.add(idx)
        reportLines.push(
          `REMOVED duplicate (kept earlier occurrence): ${key} — ${file} array index ${idx}`,
        )
      } else {
        seenKeys.add(key)
      }
    })
  }

  for (const { file, exportName } of CHUNKS) {
    const toRemove = removeByFile.get(file)
    if (!toRemove || toRemove.size === 0) continue
    const fp = path.join(scriptsDir, file)
    const raw = fs.readFileSync(fp, "utf8")
    const next = removeDuplicateArrayElements(raw, exportName, toRemove)
    fs.writeFileSync(fp, next, "utf8")
    reportLines.push(`[dedupe] ${file}: removed ${toRemove.size} object(s)`)
  }

  reportLines.push("")
  reportLines.push(
    `[dedupe] Total duplicate entries removed: ${[...removeByFile.values()].reduce((a, s) => a + s.size, 0)}`,
  )

  const reportPath = path.join(scriptsDir, "case-law-dedupe-report.txt")
  fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8")

  // eslint-disable-next-line no-console
  console.log(reportLines.join("\n"))
  // eslint-disable-next-line no-console
  console.log(`\nWrote ${reportPath}`)
}

main()
