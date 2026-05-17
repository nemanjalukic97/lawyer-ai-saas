import { createHash } from "crypto"
import dotenv from "dotenv"
import OpenAI from "openai"

import { ALL_CASE_LAW } from "./case-law-index"

dotenv.config({ path: ".env.local" })

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

/** text-embedding-3-small rejects inputs over ~8192 tokens */
const MAX_EMBEDDING_INPUT_CHARS = 24_000

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

export async function embedCaseLaw(c: CaseLawInput): Promise<number[]> {
  const input = truncateEmbeddingInput(
    `${c.legal_question} ${c.court_position} ${c.reasoning}`,
  )

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

export async function ingest() {
  verifyCaseLawIngestEnv()

  // eslint-disable-next-line no-console
  console.log("📊 Case law counts in DB (before ingest):\n")
  const existingTotal = await checkExistingCaseLaw()
  // eslint-disable-next-line no-console
  console.log(`Existing total: ${existingTotal}`)

  const existingIds = await loadExistingCaseLawIds()

  const jurisdictionSet = new Set<string>()
  const embeddedByJurisdiction = new Map<string, number>()
  const skippedByJurisdiction = new Map<string, number>()
  let embedded = 0
  let skippedExisting = 0

  for (const row of ALL_CASE_LAW) {
    if (!row?.jurisdiction || !row.case_number) {
      // eslint-disable-next-line no-console
      console.warn("Skipping invalid ALL_CASE_LAW entry (missing row or fields).")
      continue
    }

    jurisdictionSet.add(row.jurisdiction)

    const id = stableIdForCase(row)

    if (existingIds.has(id)) {
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

    try {
      const embedding = await embedCaseLaw(row)

      const payload = {
        id,
        jurisdiction: row.jurisdiction,
        court: row.court,
        court_level: row.court_level,
        case_number: row.case_number,
        decision_date: normalizeDecisionDate(row.decision_date) ?? null,
        legal_area: row.legal_area,
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
        .upsert(payload, { onConflict: "id", ignoreDuplicates: true })

      if (error) throw error

      existingIds.add(id)
      embedded += 1
      embeddedByJurisdiction.set(
        row.jurisdiction,
        (embeddedByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
      )
      // eslint-disable-next-line no-console
      console.log(`✓ ${row.jurisdiction} / ${row.court} / ${row.case_number}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${row.jurisdiction} / ${row.case_number}`,
        err,
      )
    }

    await sleep(200)
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
    `✅ Embedded: ${embedded} | Skipped (existing id): ${skippedExisting} | ` +
      `Jurisdictions in index: ${jurisdictionSet.size}`,
  )

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
      query: "Working hours and overtime compensation",
      jurisdiction: "bih_fbih",
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
  await ingest()
  await testRetrieval()
}

if (process.argv[1]?.includes("ingest-case-law")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
