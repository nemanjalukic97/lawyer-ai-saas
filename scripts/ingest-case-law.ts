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
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const { data, error } = await (supabaseAdmin as any)
    .from("case_law")
    .select("jurisdiction")

  if (error) throw error

  const counts = new Map<string, number>()
  for (const row of data ?? []) {
    const j = (row as { jurisdiction?: string }).jurisdiction ?? "unknown"
    counts.set(j, (counts.get(j) ?? 0) + 1)
  }

  const entries = [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
  for (const [jurisdiction, count] of entries) {
    // eslint-disable-next-line no-console
    console.log(`${jurisdiction}: ${count}`)
  }

  return (data ?? []).length
}

export async function ingest() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var.")
  }

  const existingTotal = await checkExistingCaseLaw()
  // eslint-disable-next-line no-console
  console.log(`Existing total: ${existingTotal}`)

  const jurisdictionSet = new Set<string>()
  const succeededByJurisdiction = new Map<string, number>()
  let succeeded = 0

  for (const row of ALL_CASE_LAW) {
    jurisdictionSet.add(row.jurisdiction)

    try {
      const embedding = await embedCaseLaw(row)
      const id = stableIdForCase(row)

      const payload = {
        id,
        jurisdiction: row.jurisdiction,
        court: row.court,
        court_level: row.court_level,
        case_number: row.case_number,
        decision_date: row.decision_date ?? null,
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

      succeeded += 1
      succeededByJurisdiction.set(
        row.jurisdiction,
        (succeededByJurisdiction.get(row.jurisdiction) ?? 0) + 1,
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

  const jurisdictionOrder = [...succeededByJurisdiction.keys()].sort((a, b) =>
    a.localeCompare(b),
  )
  // eslint-disable-next-line no-console
  console.log("✅ Ingest summary (succeeded per jurisdiction):")
  for (const j of jurisdictionOrder) {
    // eslint-disable-next-line no-console
    console.log(`  ${j}: ${succeededByJurisdiction.get(j) ?? 0}`)
  }
  // eslint-disable-next-line no-console
  console.log(
    `✅ Total: ${succeeded} decisions (${jurisdictionSet.size} jurisdictions)`,
  )
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
