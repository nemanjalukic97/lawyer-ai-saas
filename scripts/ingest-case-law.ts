import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createHash } from "crypto"
import dotenv from "dotenv"
import OpenAI from "openai"

import { ALL_CASE_LAW } from "./case-law-index"

dotenv.config({ path: ".env.local" })

type LegalArea = CaseLawInput["legal_area"]

type CaseLawAreaOverrides = {
  byId: Partial<Record<string, LegalArea>>
  byKey: Partial<Record<string, LegalArea>>
}

const LEGAL_AREA_VALUES = new Set<LegalArea>([
  "labor",
  "civil",
  "commercial",
  "family",
  "criminal",
  "administrative",
  "constitutional",
  "procedural",
  "enforcement",
  "inheritance",
])

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function parseOverrideEntries(
  obj: Record<string, unknown>,
): Partial<Record<string, LegalArea>> {
  const out: Partial<Record<string, LegalArea>> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("_")) continue
    if (typeof v === "string" && LEGAL_AREA_VALUES.has(v as LegalArea)) {
      out[k] = v as LegalArea
    }
  }
  return out
}

function loadCaseLawAreaOverrides(): CaseLawAreaOverrides {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const overridePath = path.join(__dirname, "case-law-area-overrides.json")
  if (!fs.existsSync(overridePath)) {
    return { byId: {}, byKey: {} }
  }
  try {
    const raw = fs.readFileSync(overridePath, "utf8")
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object") {
      return { byId: {}, byKey: {} }
    }

    const obj = parsed as Record<string, unknown>
    if (obj.byId && typeof obj.byId === "object") {
      return {
        byId: parseOverrideEntries(obj.byId as Record<string, unknown>),
        byKey:
          obj.byKey && typeof obj.byKey === "object"
            ? parseOverrideEntries(obj.byKey as Record<string, unknown>)
            : {},
      }
    }

    // Legacy flat map: keys are stable case ids (UUID).
    const flat = parseOverrideEntries(obj)
    const byId: Partial<Record<string, LegalArea>> = {}
    const byKey: Partial<Record<string, LegalArea>> = {}
    for (const [k, v] of Object.entries(flat)) {
      if (UUID_RE.test(k)) byId[k] = v
      else byKey[k] = v
    }
    return { byId, byKey }
  } catch {
    // Malformed overrides JSON should fail open (no overrides).
    return { byId: {}, byKey: {} }
  }
}

const CASE_LAW_AREA_OVERRIDES = loadCaseLawAreaOverrides()

function resolveOverriddenLegalArea(
  id: string,
  row: CaseLawInput,
): LegalArea {
  const fromId = CASE_LAW_AREA_OVERRIDES.byId[id]
  if (fromId) return fromId

  const caseNumber = row.case_number.trim()
  const keyWithCourt = `${row.jurisdiction}|${caseNumber}|${row.court}`
  const keyCaseOnly = `${row.jurisdiction}|${caseNumber}`
  return (
    CASE_LAW_AREA_OVERRIDES.byKey[keyWithCourt] ??
    CASE_LAW_AREA_OVERRIDES.byKey[keyCaseOnly] ??
    row.legal_area
  )
}

export type CaseLawInput = {
  jurisdiction: string
  court: string
  court_level:
    | "supreme"
    | "appellate"
    | "high"
    | "basic"
    | "constitutional"
    | "administrative"
  case_number: string
  decision_date?: string
  legal_area:
    | "labor"
    | "civil"
    | "commercial"
    | "family"
    | "criminal"
    | "administrative"
    | "constitutional"
    | "procedural"
    | "enforcement"
    | "inheritance"
  legal_question: string
  court_position: string
  reasoning: string
  keywords?: string[]
  related_articles?: string[]
  headnote?: string
  outcome?:
    | "plaintiff_won"
    | "defendant_won"
    | "partially"
    | "procedural"
    | "remanded"
  source_url?: string
}

export type IngestCaseLawStats = {
  new: number
  updated: number
  unchanged: number
  failed: number
}

function fingerprintCaseLaw(c: CaseLawInput): string {
  return createHash("sha256")
    .update([c.legal_question, c.court_position, c.reasoning].join("\n\n"))
    .digest("hex")
}

function emitIngestCaseStats(stats: IngestCaseLawStats): void {
  // eslint-disable-next-line no-console
  console.log(`INGEST_CASE_STATS:${JSON.stringify(stats)}`)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stableIdForCase(c: CaseLawInput): string {
  const key = [c.jurisdiction, c.case_number.trim()].join("|")

  const bytes = createHash("sha256").update(key).digest()
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

/** Postgres DATE rejects year-only strings; coerce YYYY to YYYY-01-01. */
function normalizeDecisionDate(raw: string | undefined): string | null {
  if (raw == null || raw.trim() === "") return null
  const s = raw.trim()
  if (/^\d{4}$/.test(s)) return `${s}-01-01`
  const isoDayZero = /^(\d{4}-\d{2})-00$/.exec(s)
  if (isoDayZero) return `${isoDayZero[1]}-01`
  const isoDay = /^(\d{4}-\d{2}-\d{2})/.exec(s)
  if (isoDay) return isoDay[1]!
  const t = Date.parse(s)
  if (!Number.isNaN(t)) return new Date(t).toISOString().slice(0, 10)
  return null
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/** text-embedding-3-small hard limit: 8192 tokens. Chars ≠ tokens; stay conservative. */
const MAX_EMBEDDING_INPUT_CHARS = 10_000

function buildEmbeddingSource(c: CaseLawInput): string {
  const kw = (c.keywords ?? []).join(" ")
  return [c.legal_question, c.court_position, c.reasoning, kw]
    .filter(Boolean)
    .join("\n\n")
}

function sanitizeEmbeddingSource(raw: string): string {
  let s = raw.replace(/\0/g, "")
  s = s.replace(/\u2028/g, "\n").replace(/\u2029/g, "\n")
  s = s.replace(/\ufeff/g, "")
  return [...s]
    .filter((ch) => {
      const cp = ch.codePointAt(0)!
      if (cp < 32 && cp !== 9 && cp !== 10 && cp !== 13) return false
      return true
    })
    .join("")
}

function truncateEmbeddingInput(raw: string): string {
  const cleaned = sanitizeEmbeddingSource(raw)
  if (cleaned.length <= MAX_EMBEDDING_INPUT_CHARS) return cleaned
  return cleaned.slice(0, MAX_EMBEDDING_INPUT_CHARS)
}

function verifyCaseLawIngestEnv(): void {
  const missing: string[] = []
  if (!process.env.OPENAI_API_KEY) missing.push("OPENAI_API_KEY")
  if (!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL")
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY")
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing env: ${missing.join(", ")}. Set them in .env.local (loaded by this script).`,
    )
  }
}

async function getCaseLawRowCounts(): Promise<{
  total: number
  byJurisdiction: Map<string, number>
}> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const byJurisdiction = new Map<string, number>()
  let total = 0
  const pageSize = 1000
  let offset = 0

  for (;;) {
    const { data, error } = await (supabaseAdmin as any)
      .from("case_law")
      .select("jurisdiction")
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const rows = data ?? []
    total += rows.length
    for (const row of rows) {
      const j = (row as { jurisdiction?: string }).jurisdiction ?? "unknown"
      byJurisdiction.set(j, (byJurisdiction.get(j) ?? 0) + 1)
    }

    if (rows.length < pageSize) break
    offset += pageSize
  }

  return { total, byJurisdiction }
}

/** All stable ids currently in case_law (paginated). */
async function loadExistingCaseLawIds(): Promise<Set<string>> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const ids = new Set<string>()
  const pageSize = 1000
  let offset = 0

  for (;;) {
    const { data, error } = await (supabaseAdmin as any)
      .from("case_law")
      .select("id")
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const rows = data ?? []
    for (const row of rows) {
      const id = (row as { id?: string }).id
      if (id) ids.add(id)
    }

    if (rows.length < pageSize) break
    offset += pageSize
  }

  return ids
}

/** Content fingerprints for case_law rows in selected jurisdictions. */
async function loadExistingCaseLawFingerprints(
  jurisdictions: Set<string>,
): Promise<Map<string, string>> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const fingerprints = new Map<string, string>()
  const jurisdictionList = [...jurisdictions]
  const pageSize = 1000
  let offset = 0

  for (;;) {
    const { data, error } = await (supabaseAdmin as any)
      .from("case_law")
      .select("id, legal_question, court_position, reasoning")
      .in("jurisdiction", jurisdictionList)
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const rows = data ?? []
    for (const row of rows) {
      const id = (row as { id?: string }).id
      if (!id) continue
      const legalQuestion = (row as { legal_question?: string }).legal_question ?? ""
      const courtPosition = (row as { court_position?: string }).court_position ?? ""
      const reasoning = (row as { reasoning?: string }).reasoning ?? ""
      fingerprints.set(
        id,
        createHash("sha256")
          .update([legalQuestion, courtPosition, reasoning].join("\n\n"))
          .digest("hex"),
      )
    }

    if (rows.length < pageSize) break
    offset += pageSize
  }

  return fingerprints
}

export async function embedCaseLaw(c: CaseLawInput): Promise<number[]> {
  const input = truncateEmbeddingInput(buildEmbeddingSource(c))

  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  })

  const embedding = res.data[0].embedding

  if (!embedding || embedding.length !== 1536) {
    throw new Error(
      `Invalid embedding for case ${c.case_number}: expected 1536 dimensions, ` +
        `got ${embedding?.length ?? 0}`,
    )
  }

  return embedding
}

export async function checkExistingCaseLaw(): Promise<number> {
  const { total, byJurisdiction } = await getCaseLawRowCounts()

  const entries = [...byJurisdiction.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )
  for (const [jurisdiction, count] of entries) {
    // eslint-disable-next-line no-console
    console.log(`${jurisdiction}: ${count}`)
  }

  return total
}

function parseUpdateJurisdictions(): Set<string> {
  const set = new Set<string>()
  for (const arg of process.argv.slice(2)) {
    const m = /^--update-jurisdictions=(.+)$/.exec(arg)
    if (m) {
      for (const j of m[1].split(",")) {
        const t = j.trim()
        if (t) set.add(t)
      }
    }
  }
  return set
}

export async function ingest(options?: {
  updateJurisdictions?: Set<string>
}): Promise<IngestCaseLawStats | void> {
  verifyCaseLawIngestEnv()

  const updateJurisdictions =
    options?.updateJurisdictions ?? parseUpdateJurisdictions()
  if (updateJurisdictions.size > 0) {
    // eslint-disable-next-line no-console
    console.log(
      `♻️  Update mode for jurisdictions: ${[...updateJurisdictions].sort().join(", ")}`,
    )
  }

  // eslint-disable-next-line no-console
  console.log("📊 Case law counts in DB (before ingest):\n")
  const existingTotal = await checkExistingCaseLaw()
  // eslint-disable-next-line no-console
  console.log(`Existing total: ${existingTotal}`)

  const existingIds = await loadExistingCaseLawIds()
  const isUpdateMode = updateJurisdictions.size > 0
  const existingFingerprints = isUpdateMode
    ? await loadExistingCaseLawFingerprints(updateJurisdictions)
    : null

  const rowsToProcess =
    isUpdateMode
      ? ALL_CASE_LAW.filter(
          (row) => row?.jurisdiction && updateJurisdictions.has(row.jurisdiction),
        )
      : ALL_CASE_LAW

  const jurisdictionSet = new Set<string>()
  const embeddedByJurisdiction = new Map<string, number>()
  const skippedByJurisdiction = new Map<string, number>()
  let embedded = 0
  let updated = 0
  let skippedExisting = 0
  let unchangedContent = 0
  let failed = 0

  const ingestStats: IngestCaseLawStats = {
    new: 0,
    updated: 0,
    unchanged: 0,
    failed: 0,
  }

  for (const row of rowsToProcess) {
    if (!row?.jurisdiction || !row.case_number) {
      // eslint-disable-next-line no-console
      console.warn("Skipping invalid ALL_CASE_LAW entry (missing row or fields).")
      continue
    }

    jurisdictionSet.add(row.jurisdiction)

    const id = stableIdForCase(row)
    const shouldUpdate = updateJurisdictions.has(row.jurisdiction)
    const contentHash = fingerprintCaseLaw(row)
    const hadPrior = existingFingerprints?.has(id) ?? existingIds.has(id)

    if (existingIds.has(id) && !shouldUpdate) {
      skippedExisting += 1
      skippedByJurisdiction.set(
        row.jurisdiction,
        (skippedByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
      )
      // eslint-disable-next-line no-console
      console.log(
        `○ skip (exists) ${row.jurisdiction} / ${row.court} / ${row.case_number}`,
      )
      await sleep(10)
      continue
    }

    if (isUpdateMode && existingFingerprints) {
      const priorHash = existingFingerprints.get(id)
      if (priorHash !== undefined && priorHash === contentHash) {
        unchangedContent += 1
        ingestStats.unchanged += 1
        skippedByJurisdiction.set(
          row.jurisdiction,
          (skippedByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
        )
        // eslint-disable-next-line no-console
        console.log(
          `○ unchanged ${row.jurisdiction} / ${row.court} / ${row.case_number}`,
        )
        await sleep(10)
        continue
      }
    }

    try {
      const embedding = await embedCaseLaw(row)

      // Persisted reclassification override:
      // - `fingerprintCaseLaw` deliberately excludes `legal_area`, so a
      //   future sync that changes only text will still treat content as
      //   updated and would otherwise overwrite `legal_area` back to the
      //   generator's value.
      // - Applying an override here ensures the upsert payload always
      //   uses the reclassified area for known case ids.
      const overriddenLegalArea: LegalArea = resolveOverriddenLegalArea(
        id,
        row,
      )

      const payload = {
        id,
        jurisdiction: row.jurisdiction,
        court: row.court,
        court_level: row.court_level,
        case_number: row.case_number,
        decision_date: normalizeDecisionDate(row.decision_date) ?? null,
        legal_area: overriddenLegalArea,
        legal_question: row.legal_question,
        court_position: row.court_position,
        reasoning: row.reasoning,
        keywords: row.keywords ?? null,
        related_articles: row.related_articles ?? null,
        headnote: row.headnote ?? null,
        outcome: row.outcome ?? null,
        source_url: row.source_url ?? null,
        embedding,
      }

      const { supabaseAdmin } = await import("../lib/supabase/admin")
      const { error } = await (supabaseAdmin as any)
        .from("case_law")
        .upsert(payload, { onConflict: "id" })

      if (error) throw error

      existingIds.add(id)
      if (shouldUpdate) {
        if (hadPrior) {
          updated += 1
          ingestStats.updated += 1
        } else {
          embedded += 1
          ingestStats.new += 1
        }
        existingFingerprints?.set(id, contentHash)
      } else {
        embedded += 1
      }
      embeddedByJurisdiction.set(
        row.jurisdiction,
        (embeddedByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
      )
      const marker = shouldUpdate && hadPrior ? "↻" : "✓"
      // eslint-disable-next-line no-console
      console.log(
        `${marker} ${row.jurisdiction} / ${row.court} / ${row.case_number}`,
      )
    } catch (err) {
      if (isUpdateMode) {
        failed += 1
        ingestStats.failed += 1
      }
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${row.jurisdiction} / ${row.case_number}`,
        err,
      )
    }

    await sleep(shouldUpdate ? 50 : 200)
  }

  const jurisdictionOrder = [...jurisdictionSet].sort((a, b) =>
    a.localeCompare(b),
  )
  // eslint-disable-next-line no-console
  console.log("✅ Ingest summary (embedded this run, per jurisdiction):")
  for (const j of jurisdictionOrder) {
    // eslint-disable-next-line no-console
    console.log(`  ${j}: ${embeddedByJurisdiction.get(j) ?? 0}`)
  }
  // eslint-disable-next-line no-console
  console.log("⏭️ Skipped (already in DB, per jurisdiction):")
  for (const j of jurisdictionOrder) {
    // eslint-disable-next-line no-console
    console.log(`  ${j}: ${skippedByJurisdiction.get(j) ?? 0}`)
  }
  // eslint-disable-next-line no-console
  console.log(
    `✅ Embedded: ${embedded} | Updated: ${updated} | Skipped (existing id): ${skippedExisting}` +
      (isUpdateMode ? ` | Unchanged (content): ${unchangedContent}` : "") +
      ` | Jurisdictions in index: ${jurisdictionSet.size}`,
  )

  if (isUpdateMode) {
    // eslint-disable-next-line no-console
    console.log(
      `♻️  Update stats: ${ingestStats.new} new, ${ingestStats.updated} updated, ` +
        `${ingestStats.unchanged} unchanged, ${ingestStats.failed} failed`,
    )
    emitIngestCaseStats(ingestStats)
  }

  // eslint-disable-next-line no-console
  console.log("\n📊 Case law counts in DB (after ingest):\n")
  const after = await getCaseLawRowCounts()
  const afterEntries = [...after.byJurisdiction.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )
  for (const [jurisdiction, count] of afterEntries) {
    // eslint-disable-next-line no-console
    console.log(`${jurisdiction}: ${count}`)
  }
  // eslint-disable-next-line no-console
  console.log(`Existing total: ${after.total}`)

  const indexRowsByJurisdiction = new Map<string, number>()
  const uniqueKeysByJurisdiction = new Map<string, Set<string>>()

  for (const row of ALL_CASE_LAW) {
    if (!row?.jurisdiction || !row.case_number) continue
    indexRowsByJurisdiction.set(
      row.jurisdiction,
      (indexRowsByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
    )
    if (!uniqueKeysByJurisdiction.has(row.jurisdiction)) {
      uniqueKeysByJurisdiction.set(row.jurisdiction, new Set())
    }
    uniqueKeysByJurisdiction
      .get(row.jurisdiction)!
      .add(row.case_number.trim())
  }
  // eslint-disable-next-line no-console
  console.log("\n🔎 Index vs database (by jurisdiction):")
  const verifyOrder = [...uniqueKeysByJurisdiction.keys()].sort((a, b) =>
    a.localeCompare(b),
  )
  for (const j of verifyOrder) {
    const rowCount = indexRowsByJurisdiction.get(j) ?? 0
    const uniqueCount = uniqueKeysByJurisdiction.get(j)?.size ?? 0
    const dbCount = after.byJurisdiction.get(j) ?? 0
    const ok = uniqueCount === dbCount
    const dupNote =
      rowCount !== uniqueCount
        ? ` | index rows: ${rowCount}, duplicate keys: ${rowCount - uniqueCount}`
        : ""
    // eslint-disable-next-line no-console
    console.log(
      `  ${j}: unique case_number=${uniqueCount} case_law=${dbCount} ${ok ? "OK" : "MISMATCH"}${dupNote}`,
    )
  }

  if (isUpdateMode) {
    return ingestStats
  }
}

async function testRetrieval() {
  // eslint-disable-next-line no-console
  console.log("\n🔍 Testing case law retrieval after ingestion...\n")

  const testCases = [
    {
      query: "Wrongful dismissal and termination of employment contract",
      jurisdiction: "serbia",
    },
    {
      query: "Contract validity and essential elements",
      jurisdiction: "croatia",
    },
    {
      query: "prekovremeni rad naknada FBiH",
      jurisdiction: "bih_fbih",
    },
    {
      query: "otkaz ugovor o radu RS",
      jurisdiction: "bih_rs",
    },
  ]

  for (const tc of testCases) {
    const { retrieveCaseLawContext } = await import("../lib/legalRag")
    const result = await retrieveCaseLawContext(tc.query, tc.jurisdiction, {
      k: 3,
    })

    // eslint-disable-next-line no-console
    console.log(`Query: "${tc.query}"`)
    // eslint-disable-next-line no-console
    console.log(
      `Jurisdiction: ${tc.jurisdiction} | Confidence: ${result.confidence} | Cases: ${result.cases.length} | Top similarity: ${result.topSimilarity.toFixed(3)}`,
    )

    result.cases.forEach((c) => {
      // eslint-disable-next-line no-console
      console.log(
        `  → ${c.court}, ${c.case_number} (${(c.similarity * 100).toFixed(1)}%)`,
      )
    })
    // eslint-disable-next-line no-console
    console.log("")
  }
}

async function main() {
  const updateJurisdictions = parseUpdateJurisdictions()
  await ingest({ updateJurisdictions })
  if (updateJurisdictions.size === 0) {
    await testRetrieval()
  }
}

if (process.argv[1]?.includes("ingest-case-law")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
