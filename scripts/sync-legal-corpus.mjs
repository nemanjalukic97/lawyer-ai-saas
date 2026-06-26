/**
 * Quarterly legal corpus sync orchestrator.
 *
 * Usage:
 *   node scripts/sync-legal-corpus.mjs
 *   node scripts/sync-legal-corpus.mjs --jurisdictions=serbia,bih_fbih
 *   node scripts/sync-legal-corpus.mjs --jurisdictions=all
 *
 * SAFETY: Never runs reingest-legal-cycle, migrations, git push, or Vercel deploy.
 */
import { spawnSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")

const ALL_JURISDICTIONS = [
  "serbia",
  "croatia",
  "slovenia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "montenegro",
]

/** Jurisdictions with case-law regen + ingest support (not slovenia). */
const CASE_LAW_REGIONS = new Set([
  "serbia",
  "croatia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "montenegro",
])

const DENYLIST = [
  "reingest-legal-cycle",
  "reingest-legal-cycle.ts",
]

const PARAGRAF_JURISDICTIONS = {
  bih_fbih: ["fbih", "bih"],
  bih_rs: ["rs"],
  bih_brcko: ["brcko"],
  montenegro: ["me"],
}

const LEGALIST_JURISDICTIONS = {
  bih_fbih: ["fbih"],
  bih_rs: ["rs"],
}

function parseJurisdictionsArg() {
  const arg = process.argv.find((a) => a.startsWith("--jurisdictions="))
  if (!arg) return new Set(ALL_JURISDICTIONS)
  const value = arg.slice("--jurisdictions=".length).trim()
  if (value === "all" || value === "") return new Set(ALL_JURISDICTIONS)
  const selected = new Set(
    value
      .split(",")
      .map((j) => j.trim())
      .filter(Boolean),
  )
  for (const j of selected) {
    if (!ALL_JURISDICTIONS.includes(j)) {
      console.error(
        `Unknown jurisdiction "${j}". Valid: ${ALL_JURISDICTIONS.join(", ")}, all`,
      )
      process.exit(1)
    }
  }
  return selected
}

function assertSafeCommand(cmd, args) {
  const joined = [cmd, ...args].join(" ")
  for (const denied of DENYLIST) {
    if (joined.includes(denied)) {
      throw new Error(`Blocked unsafe command (denylist): ${denied}`)
    }
  }
}

function parseStatsLine(output, prefix) {
  const stats = { new: 0, updated: 0, unchanged: 0, failed: 0, downloaded: 0, skipped: 0 }
  for (const line of output.split(/\r?\n/)) {
    const m = new RegExp(`^${prefix}:(.+)$`).exec(line.trim())
    if (!m) continue
    try {
      const parsed = JSON.parse(m[1])
      for (const key of Object.keys(stats)) {
        if (typeof parsed[key] === "number") stats[key] += parsed[key]
      }
    } catch {
      /* ignore malformed */
    }
  }
  return stats
}

function mergeStats(target, source) {
  for (const key of Object.keys(target)) {
    target[key] += source[key] ?? 0
  }
}

function runStep(label, cmd, args, { allowFailure = false } = {}) {
  assertSafeCommand(cmd, args)
  console.log(`\n▶ ${label}`)
  console.log(`  ${cmd} ${args.join(" ")}`)

  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    env: { ...process.env },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  })

  const stdout = result.stdout ?? ""
  const stderr = result.stderr ?? ""
  if (stdout) process.stdout.write(stdout)
  if (stderr) process.stderr.write(stderr)

  if (result.status !== 0 && !allowFailure) {
    throw new Error(`${label} failed with exit code ${result.status ?? "unknown"}`)
  }

  return { stdout, stderr, status: result.status ?? 1 }
}

function uniqueSorted(values) {
  return [...new Set(values)].sort()
}

function collectParagrafKeys(selected) {
  const keys = []
  for (const j of selected) {
    const mapped = PARAGRAF_JURISDICTIONS[j]
    if (mapped) keys.push(...mapped)
  }
  return uniqueSorted(keys)
}

function collectLegalistKeys(selected) {
  const keys = []
  for (const j of selected) {
    const mapped = LEGALIST_JURISDICTIONS[j]
    if (mapped) keys.push(...mapped)
  }
  return uniqueSorted(keys)
}

function caseLawJurisdictions(selected) {
  return [...selected].filter((j) => CASE_LAW_REGIONS.has(j))
}

function requireEnv() {
  const missing = []
  if (!process.env.OPENAI_API_KEY) missing.push("OPENAI_API_KEY")
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY")
  if (!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL")
  }
  if (missing.length) {
    throw new Error(`Missing required env: ${missing.join(", ")}`)
  }
}

async function main() {
  const selected = parseJurisdictionsArg()
  requireEnv()

  console.log(`\n=== Legantis Legal Corpus Sync ===`)
  console.log(`Jurisdictions: ${[...selected].sort().join(", ")}`)

  const lawDownloadStats = { new: 0, updated: 0, unchanged: 0, failed: 0 }
  let stepFailed = false

  // Step 1: Law downloads with --force-refresh
  const lawCommands = []
  if (selected.has("serbia")) {
    lawCommands.push(["python", ["scripts/download-serbia-laws.py", "--force-refresh"]])
  }
  if (selected.has("croatia")) {
    lawCommands.push(["python", ["scripts/download-croatia-laws.py", "--force-refresh"]])
  }
  if (selected.has("slovenia")) {
    lawCommands.push(["python", ["scripts/download-slovenia-laws.py", "--force-refresh"]])
  }
  for (const key of collectParagrafKeys(selected)) {
    lawCommands.push([
      "python",
      ["scripts/download-paragraf-ba-laws.py", "--jurisdiction", key, "--force-refresh"],
    ])
  }
  for (const key of collectLegalistKeys(selected)) {
    lawCommands.push([
      "python",
      ["scripts/download-legalist-ba-laws.py", "--jurisdiction", key, "--force-refresh"],
    ])
  }

  for (const [cmd, args] of lawCommands) {
    try {
      const { stdout } = runStep(`Law download: ${args.join(" ")}`, cmd, args)
      mergeStats(lawDownloadStats, parseStatsLine(stdout, "SYNC_STATS"))
    } catch (err) {
      stepFailed = true
      console.error(`✗ ${err.message}`)
    }
  }

  // Step 2: Case-law PDF downloads
  const pdfCommands = []
  if (selected.has("serbia")) {
    pdfCommands.push(["python", ["scripts/download-serbia-pdfs.py"]])
  }
  if (selected.has("croatia")) {
    pdfCommands.push(["python", ["scripts/download-croatia-pdfs.py"]])
  }
  if (selected.has("slovenia")) {
    pdfCommands.push(["python", ["scripts/download-slovenia-pdfs.py"]])
  }
  if (selected.has("bih_fbih")) {
    pdfCommands.push(["python", ["scripts/download-bih-fbih-pdfs.py"]])
  }
  if (selected.has("bih_rs")) {
    pdfCommands.push(["python", ["scripts/download-bih-rs-pdfs.py"]])
  }
  if (selected.has("bih_brcko")) {
    pdfCommands.push(["python", ["scripts/download-bih-brcko-pdfs.py"]])
  }
  if (selected.has("montenegro")) {
    pdfCommands.push(["python", ["scripts/download-montenegro-pdfs.py"]])
  }

  for (const [cmd, args] of pdfCommands) {
    try {
      runStep(`Case-law PDF download: ${args[1]}`, cmd, args)
    } catch (err) {
      stepFailed = true
      console.error(`✗ ${err.message}`)
    }
  }

  // Step 3: Regenerate case-law TypeScript from PDFs
  const caseLawRegions = caseLawJurisdictions(selected)
  if (caseLawRegions.length > 0) {
    try {
      runStep(
        `Case-law regen: ${caseLawRegions.join(", ")}`,
        process.execPath,
        ["scripts/run-all-case-law.mjs", ...caseLawRegions],
      )
    } catch (err) {
      stepFailed = true
      console.error(`✗ ${err.message}`)
    }
  } else {
    console.log("\n○ Skipping case-law regen (no case-law jurisdictions selected)")
  }

  const updateList = [...selected].sort().join(",")
  const lawIngestStats = { new: 0, updated: 0, unchanged: 0, failed: 0 }
  const caseIngestStats = { new: 0, updated: 0, unchanged: 0, failed: 0 }

  // Step 4: Ingest laws
  try {
    const { stdout } = runStep(
      "Ingest downloaded laws",
      "npx",
      ["tsx", "scripts/ingest-downloaded-laws.ts", `--update-jurisdictions=${updateList}`],
    )
    mergeStats(lawIngestStats, parseStatsLine(stdout, "INGEST_LAW_STATS"))
  } catch (err) {
    stepFailed = true
    console.error(`✗ ${err.message}`)
  }

  // Step 5: Ingest case law
  if (caseLawRegions.length > 0) {
    try {
      const { stdout } = runStep(
        "Ingest case law",
        "npx",
        [
          "tsx",
          "scripts/ingest-case-law.ts",
          `--update-jurisdictions=${caseLawRegions.join(",")}`,
        ],
      )
      mergeStats(caseIngestStats, parseStatsLine(stdout, "INGEST_CASE_STATS"))
    } catch (err) {
      stepFailed = true
      console.error(`✗ ${err.message}`)
    }
  } else {
    console.log("\n○ Skipping case-law ingest (no case-law jurisdictions selected)")
  }

  // Step 6: Verification
  let verificationPassed = false
  try {
    runStep("Verify law search", "npx", ["tsx", "scripts/verify-law-search-smoke.ts"])
    verificationPassed = true
  } catch (err) {
    stepFailed = true
    console.error(`✗ ${err.message}`)
  }

  // Step 7: Summary report
  console.log("\n=== Legantis Quarterly Sync Report ===")
  console.log(
    `Laws (download):  ${lawDownloadStats.new} new, ${lawDownloadStats.updated} updated, ` +
      `${lawDownloadStats.unchanged} unchanged, ${lawDownloadStats.failed} failed`,
  )
  console.log(
    `Laws (ingest):    ${lawIngestStats.new} new, ${lawIngestStats.updated} updated, ` +
      `${lawIngestStats.unchanged} unchanged, ${lawIngestStats.failed} failed`,
  )
  console.log(
    `Case law (ingest): ${caseIngestStats.new} new, ${caseIngestStats.updated} updated, ` +
      `${caseIngestStats.unchanged} unchanged, ${caseIngestStats.failed} failed`,
  )
  console.log(`Verification:     ${verificationPassed ? "PASSED" : "FAILED"}`)

  if (stepFailed) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
