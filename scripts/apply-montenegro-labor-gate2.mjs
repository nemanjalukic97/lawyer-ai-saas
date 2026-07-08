/**
 * Gate 2: apply Montenegro labor reclassification (score >= minScore).
 *
 * Usage:
 *   npx tsx scripts/apply-montenegro-labor-gate2.mjs
 *   npx tsx scripts/apply-montenegro-labor-gate2.mjs --min-score=3 --dry-run
 */
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { fileURLToPath } from "url"
import { Client } from "pg"
import dotenv from "dotenv"

import { classifyLaborRow } from "./reclassify-montenegro-labor.mjs"

dotenv.config({ path: ".env.local" })

const DATABASE_URL = process.env.DATABASE_URL
const CASE_LAW_TABLE = "public.case_law"
const MIN_SCORE = Number(
  (process.argv.find((a) => a.startsWith("--min-score=")) ?? "--min-score=3").split(
    "=",
  )[1],
)
const DRY_RUN = process.argv.includes("--dry-run")
const SKIP_DB = process.argv.includes("--skip-db")
const TARGETS_OUT = process.argv
  .find((a) => a.startsWith("--targets-out="))
  ?.split("=")[1]

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OVERRIDES_PATH = path.join(__dirname, "case-law-area-overrides.json")
const ROLLBACK_PATH = path.join(
  __dirname,
  "reclassified-montenegro-labor-gate2-rollback.json",
)

function stableIdForCase(jurisdiction, caseNumber) {
  const key = [jurisdiction, String(caseNumber ?? "").trim()].join("|")
  const bytes = crypto.createHash("sha256").update(key).digest()
  const b = bytes.subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const hex = Buffer.from(b).toString("hex")
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-")
}

function overrideCompositeKey(jurisdiction, caseNumber, court) {
  return `${jurisdiction}|${String(caseNumber ?? "").trim()}|${court}`
}

async function loadMontenegroRows() {
  if (DATABASE_URL) {
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    await client.connect()
    await client.query(`SET statement_timeout = 0`)
    const { rows } = await client.query(`
      SELECT
        id,
        jurisdiction,
        court,
        legal_area,
        case_number,
        legal_question,
        court_position,
        reasoning,
        keywords
      FROM ${CASE_LAW_TABLE}
      WHERE jurisdiction = 'montenegro'
    `)
    await client.end()
    return rows
  }

  console.warn("DATABASE_URL not set; falling back to supabaseAdmin.")
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const rows = []
  const pageSize = 1000
  let offset = 0
  for (;;) {
    const { data, error } = await supabaseAdmin
      .from("case_law")
      .select(
        "id,jurisdiction,court,legal_area,case_number,legal_question,court_position,reasoning,keywords",
      )
      .eq("jurisdiction", "montenegro")
      .range(offset, offset + pageSize - 1)
    if (error) throw error
    const chunk = data ?? []
    rows.push(...chunk)
    if (chunk.length < pageSize) break
    offset += pageSize
  }
  return rows
}

async function areaDistribution() {
  if (DATABASE_URL) {
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    await client.connect()
    const { rows } = await client.query(`
      SELECT legal_area, COUNT(*)::int AS count
      FROM ${CASE_LAW_TABLE}
      WHERE jurisdiction = 'montenegro'
      GROUP BY legal_area
      ORDER BY count DESC
    `)
    await client.end()
    return rows
  }

  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const counts = new Map()
  const pageSize = 1000
  let offset = 0
  for (;;) {
    const { data, error } = await supabaseAdmin
      .from("case_law")
      .select("legal_area")
      .eq("jurisdiction", "montenegro")
      .range(offset, offset + pageSize - 1)
    if (error) throw error
    const chunk = data ?? []
    for (const row of chunk) {
      counts.set(row.legal_area, (counts.get(row.legal_area) ?? 0) + 1)
    }
    if (chunk.length < pageSize) break
    offset += pageSize
  }
  return [...counts.entries()]
    .map(([legal_area, count]) => ({ legal_area, count }))
    .sort((a, b) => b.count - a.count)
}

async function batchUpdateLabor(ids) {
  if (ids.length === 0) return 0

  if (DATABASE_URL) {
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    await client.connect()
    const { rowCount } = await client.query(
      `
      UPDATE ${CASE_LAW_TABLE}
      SET legal_area = 'labor'
      WHERE jurisdiction = 'montenegro'
        AND id = ANY($1::uuid[])
        AND legal_area IS DISTINCT FROM 'labor'
    `,
      [ids],
    )
    await client.end()
    return rowCount ?? 0
  }

  const { supabaseAdmin } = await import("../lib/supabase/admin")
  let updated = 0
  const batchSize = 100
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize)
    const { data, error } = await supabaseAdmin
      .from("case_law")
      .update({ legal_area: "labor" })
      .eq("jurisdiction", "montenegro")
      .in("id", batch)
      .neq("legal_area", "labor")
      .select("id")
    if (error) throw error
    updated += data?.length ?? 0
  }
  return updated
}

async function runAnalyze() {
  if (!DATABASE_URL) {
    console.warn(
      "DATABASE_URL not set; skipping ANALYZE (run manually: ANALYZE public.case_law).",
    )
    return false
  }
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  await client.query(`ANALYZE ${CASE_LAW_TABLE}`)
  await client.end()
  return true
}

async function loadGeneratorCaseNumbers() {
  const scriptsDir = __dirname
  const files = fs
    .readdirSync(scriptsDir)
    .filter(
      (f) =>
        f.startsWith("case-law-") &&
        f.includes("-montenegro-") &&
        f.endsWith(".ts"),
    )

  const byCaseNumber = new Map()
  const caseNumberRe = /case_number:\s*"([^"]+)"/g

  for (const file of files) {
    const text = fs.readFileSync(path.join(scriptsDir, file), "utf8")
    let match
    while ((match = caseNumberRe.exec(text)) !== null) {
      byCaseNumber.set(match[1], file)
    }
  }
  return byCaseNumber
}

async function main() {
  console.log(`Gate 2 apply — min score ${MIN_SCORE}${DRY_RUN ? " (dry-run)" : ""}`)

  const rows = await loadMontenegroRows()
  console.log(`Loaded ${rows.length} Montenegro rows`)

  const preDist = await areaDistribution()
  console.log("\nPre-update legal_area distribution:")
  for (const { legal_area, count } of preDist) {
    console.log(`  ${legal_area}: ${count}`)
  }

  const targets = []
  for (const row of rows) {
    const { isLabor, score } = classifyLaborRow(row)
    if (isLabor && score >= MIN_SCORE) {
      targets.push({
        id: row.id,
        jurisdiction: row.jurisdiction,
        court: row.court,
        case_number: row.case_number,
        prior_legal_area: row.legal_area,
        score,
      })
    }
  }

  console.log(`\nTargets (isLabor && score>=${MIN_SCORE}): ${targets.length}`)

  // ID stability: ingest uses sha256(jurisdiction|case_number), not court or text.
  const idMismatches = []
  const duplicateCaseNumbers = new Map()
  for (const t of targets) {
    const expectedId = stableIdForCase(t.jurisdiction, t.case_number)
    if (expectedId !== t.id) {
      idMismatches.push({
        id: t.id,
        expectedId,
        case_number: t.case_number,
        court: t.court,
      })
    }
    const cnKey = `${t.jurisdiction}|${t.case_number.trim()}`
    if (!duplicateCaseNumbers.has(cnKey)) duplicateCaseNumbers.set(cnKey, [])
    duplicateCaseNumbers.get(cnKey).push(t)
  }

  const dupes = [...duplicateCaseNumbers.entries()].filter(
    ([, list]) => list.length > 1,
  )
  if (dupes.length > 0) {
    console.warn(
      `\nWARNING: ${dupes.length} case_number keys map to multiple DB rows (court disambiguates).`,
    )
    for (const [key, list] of dupes.slice(0, 5)) {
      console.warn(`  ${key}: ${list.map((x) => x.court).join(" | ")}`)
    }
  }

  const generatorCases = await loadGeneratorCaseNumbers()
  let missingFromGenerator = 0
  for (const t of targets) {
    if (!generatorCases.has(t.case_number)) missingFromGenerator += 1
  }

  console.log("\nID stability check (sha256(jurisdiction|case_number)):")
  console.log(`  mismatches vs DB id: ${idMismatches.length}`)
  console.log(`  targets absent from generator TS: ${missingFromGenerator}`)
  if (idMismatches.length > 0) {
    console.error("\nABORT: DB ids do not match stableIdForCase for some targets.")
    for (const m of idMismatches.slice(0, 10)) {
      console.error(
        `  ${m.case_number} @ ${m.court}: db=${m.id} expected=${m.expectedId}`,
      )
    }
    process.exit(1)
  }
  console.log(
    "  PASS — ids are deterministic from jurisdiction+case_number (filename-derived in generators).",
  )
  console.log(
    "  Overrides will use byId (stable uuid) plus byKey (jurisdiction|case_number|court) as belt-and-suspenders.",
  )

  if (TARGETS_OUT) {
    fs.writeFileSync(
      TARGETS_OUT,
      JSON.stringify(targets, null, 2) + "\n",
      "utf8",
    )
    console.log(`Wrote targets: ${TARGETS_OUT}`)
  }

  if (DRY_RUN) {
    console.log("\nDry-run complete; no DB or file writes.")
    return
  }

  const ids = targets.map((t) => t.id)
  let updatedCount = 0
  if (!SKIP_DB) {
    updatedCount = await batchUpdateLabor(ids)
    console.log(`\nUPDATE legal_area='labor': ${updatedCount} rows changed`)
  } else {
    console.log("\n--skip-db: skipping UPDATE (apply via direct SQL if needed).")
  }

  const existingOverrides = fs.existsSync(OVERRIDES_PATH)
    ? JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"))
    : {}

  const byId = { ...(existingOverrides.byId ?? {}) }
  const byKey = { ...(existingOverrides.byKey ?? {}) }
  for (const t of targets) {
    byId[t.id] = "labor"
    byKey[overrideCompositeKey(t.jurisdiction, t.case_number, t.court)] = "labor"
  }

  const overridesDoc = {
    _meta: {
      description:
        "Persistent legal_area overrides applied during case-law ingest upserts.",
      montenegroLaborGate2: {
        appliedAt: new Date().toISOString(),
        threshold: `score>=${MIN_SCORE}`,
        count: targets.length,
        idDerivation: "sha256(jurisdiction|case_number)",
      },
    },
    byId,
    byKey,
  }

  fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overridesDoc, null, 2) + "\n", "utf8")
  console.log(`Wrote ${OVERRIDES_PATH} (${targets.length} new labor overrides)`)

  const rollbackDoc = {
    _meta: {
      description:
        "Rollback list for Montenegro labor Gate 2 — restore prior legal_area per id.",
      appliedAt: overridesDoc._meta.montenegroLaborGate2.appliedAt,
      threshold: `score>=${MIN_SCORE}`,
    },
    rows: targets.map((t) => ({
      id: t.id,
      case_number: t.case_number,
      court: t.court,
      prior_legal_area: t.prior_legal_area,
      score: t.score,
    })),
  }
  fs.writeFileSync(ROLLBACK_PATH, JSON.stringify(rollbackDoc, null, 2) + "\n", "utf8")
  console.log(`Wrote rollback list: ${ROLLBACK_PATH}`)

  const analyzed = SKIP_DB ? false : await runAnalyze()
  if (analyzed) console.log("Ran ANALYZE public.case_law")

  const postDist = await areaDistribution()
  console.log("\nPost-update legal_area distribution:")
  for (const { legal_area, count } of postDist) {
    console.log(`  ${legal_area}: ${count}`)
  }
}

await main()
