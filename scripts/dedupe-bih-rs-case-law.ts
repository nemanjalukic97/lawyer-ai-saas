/**
 * Remove duplicate (jurisdiction, case_number) for bih_rs across case-law-*-bih-rs-*.ts
 * Keeps first occurrence in case-law-index.ts import order.
 * Run: npx tsx scripts/dedupe-bih-rs-case-law.ts
 */
import * as fs from "fs"
import * as path from "path"
import { pathToFileURL } from "url"
import * as ts from "typescript"

import type { CaseLawInput } from "./ingest-case-law"

const scriptsDir = path.join(process.cwd(), "scripts")
const indexPath = path.join(scriptsDir, "case-law-index.ts")

function parseBihRsChunksFromIndex(): { file: string; exportName: string }[] {
  const index = fs.readFileSync(indexPath, "utf8")
  const chunks: { file: string; exportName: string }[] = []
  const re = /import\s+\{\s*(\w+)\s*\}\s+from\s+"\.\/(case-law-[^"]+bih-rs[^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(index))) {
    chunks.push({ exportName: m[1]!, file: `${m[2]!}.ts` })
  }
  return chunks
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
  const el = elements[idx]!
  const startEl = el.getFullStart()
  const endEl = el.getEnd()
  const tail = fullText.slice(endEl, Math.min(fullText.length, endEl + 40))
  const trailingComma = /^\s*,/.exec(tail)
  if (trailingComma) {
    return { start: startEl, end: endEl + trailingComma[0].length }
  }
  if (idx > 0) {
    const prev = elements[idx - 1]!
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

async function loadChunks(): Promise<
  { file: string; exportName: string; data: CaseLawInput[] }[]
> {
  const meta = parseBihRsChunksFromIndex()
  const chunks: { file: string; exportName: string; data: CaseLawInput[] }[] = []
  for (const { file, exportName } of meta) {
    const modPath = path.join(scriptsDir, file.replace(/\.ts$/, ""))
    const mod = await import(pathToFileURL(modPath).href)
    const data = mod[exportName] as CaseLawInput[] | undefined
    if (!Array.isArray(data)) {
      throw new Error(`Missing export ${exportName} in ${file}`)
    }
    chunks.push({ file, exportName, data })
  }
  return chunks
}

async function main() {
  const chunks = await loadChunks()
  const reportLines: string[] = [
    "BiH RS case_number deduplication",
    `Files in index order: ${chunks.length}`,
    "",
  ]

  const seenKeys = new Map<string, { file: string; index: number }>()
  const removeByFile = new Map<string, Set<number>>()
  let duplicateCount = 0

  for (const { file, data } of chunks) {
    data.forEach((row, idx) => {
      if (row.jurisdiction !== "bih_rs") return
      const cn = row.case_number.trim()
      const key = cn
      const prev = seenKeys.get(key)
      if (prev) {
        if (!removeByFile.has(file)) removeByFile.set(file, new Set())
        removeByFile.get(file)!.add(idx)
        duplicateCount += 1
        reportLines.push(
          `REMOVED duplicate: "${cn}" — ${file} index ${idx} (kept in ${prev.file} index ${prev.index})`,
        )
      } else {
        seenKeys.set(key, { file, index: idx })
      }
    })
  }

  for (const { file, exportName } of chunks) {
    const toRemove = removeByFile.get(file)
    if (!toRemove || toRemove.size === 0) continue
    const fp = path.join(scriptsDir, file)
    const raw = fs.readFileSync(fp, "utf8")
    const next = removeDuplicateArrayElements(raw, exportName, toRemove)
    fs.writeFileSync(fp, next, "utf8")
    reportLines.push(`[dedupe] ${file}: removed ${toRemove.size} object(s)`)
  }

  reportLines.push("")
  reportLines.push(`[dedupe] Total duplicate entries removed: ${duplicateCount}`)
  reportLines.push(`[dedupe] Unique bih_rs case_number keys after: ${seenKeys.size}`)

  const reportPath = path.join(scriptsDir, "case-law-bih-rs-dedupe-report.txt")
  fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8")
  // eslint-disable-next-line no-console
  console.log(reportLines.join("\n"))
  // eslint-disable-next-line no-console
  console.log(`\nWrote ${reportPath}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})
