/**
 * Re-embed Croatian Gr rows after the legal_question template UPDATE.
 *
 *   npx tsx scripts/reembed-croatia-gr-questions.ts
 *     Print classification counts and the 28 "other" venue-transfer rows.
 *
 *   npx tsx scripts/reembed-croatia-gr-questions.ts --confirm
 *     Same printout, then re-embed all 276 rows and run Ivana + stečaj retrieval.
 *
 *   npx tsx scripts/reembed-croatia-gr-questions.ts --verify
 *     Retrieval only (after a previous --confirm).
 */
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config({ path: ".env.local" })

const TEMPLATES = {
  izuzece: "Osnovanost zahtjeva za izuzeće suca?",
  delegacija: "Osnovanost zahtjeva za delegaciju?",
  nadleznost: "Koji je sud stvarno nadležan?",
} as const

const TEMPLATE_VALUES = new Set<string>(Object.values(TEMPLATES))
const EMBED_SLEEP_MS = 50

type GrRow = {
  id: string
  case_number: string
  legal_question: string
  court_position: string
  reasoning: string
  keywords: string[] | null
}

function classifyFromIzreka(courtPosition: string): keyof typeof TEMPLATES {
  if (courtPosition.toLowerCase().includes("izuze")) return "izuzece"
  if (courtPosition.toLowerCase().includes("delegacij")) return "delegacija"
  return "nadleznost"
}

function oldKind(courtPosition: string, reasoning: string): string {
  const cp = courtPosition.toLowerCase()
  const rs = reasoning.toLowerCase()
  if (cp.includes("sukob")) return "sukob"
  if (cp.includes("delegacij") || /zahtjev.*delegacij/.test(rs)) return "delegacija"
  if (cp.includes("izuze") || rs.includes("izuzeće") || rs.includes("izuzece")) {
    return "izuzece"
  }
  if (cp.includes("nadležn") || cp.includes("nadlezn") || rs.includes("drugi stvarno nadležni")) {
    return "other"
  }
  return "unmatched"
}

function izrekaFromCourtPosition(cp: string): string | null {
  const m = cp.match(/riješ(?:io|ila|ili)\s*je\s*:?\s*([\s\S]+)$/i)
  const iz = m?.[1]?.replace(/\s+/g, " ").trim()
  return iz && iz.length >= 20 ? iz : null
}

/** Question + operative izreka only. Full court_position/reasoning still contain
 *  "radi {underlying dispute}" and dominate the vector. */
function embeddingSource(row: GrRow): string {
  const izreka = izrekaFromCourtPosition(row.court_position)
  if (!izreka) {
    throw new Error(
      `No izreka after "riješio je" in ${row.case_number}`,
    )
  }
  return `${row.legal_question}\n\n${izreka}`
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function countBy(rows: GrRow[], fn: (r: GrRow) => string) {
  const m = new Map<string, number>()
  for (const r of rows) {
    const k = fn(r)
    m.set(k, (m.get(k) ?? 0) + 1)
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

async function loadRows(): Promise<GrRow[]> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const { data, error } = await supabaseAdmin
    .from("case_law")
    .select("id, case_number, legal_question, court_position, reasoning, keywords")
    .eq("jurisdiction", "croatia")
    .ilike("case_number", "Gr%")
    .order("case_number")
  if (error) throw new Error(error.message)
  return (data ?? []) as GrRow[]
}

function printClassification(rows: GrRow[]) {
  const old = countBy(rows, (r) => oldKind(r.court_position, r.reasoning))
  const neu = countBy(rows, (r) => classifyFromIzreka(r.court_position))
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ n: rows.length, oldKind: Object.fromEntries(old), newTemplate: Object.fromEntries(neu) }, null, 2))

  const others = rows.filter(
    (r) => oldKind(r.court_position, r.reasoning) === "other",
  )
  // eslint-disable-next-line no-console
  console.log(`\n--- ${others.length} "other" venue-transfer (old cascade) ---`)
  for (const r of others) {
    const kind = classifyFromIzreka(r.court_position)
    const tail = r.court_position.replace(/\s+/g, " ").slice(-280)
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        case_number: r.case_number,
        current_q: r.legal_question,
        new_template: TEMPLATES[kind],
        izreka_tail: tail,
      }),
    )
  }
}

function summarizeCases(
  label: string,
  cases: {
    case_number: string
    legal_area: string
    court: string
    similarity: number
    legal_question: string
  }[],
) {
  const gr = cases.filter((c) => /^Gr\b/i.test(c.case_number))
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        label,
        n: cases.length,
        grCount: gr.length,
        rows: cases.map((c, i) => ({
          rank: i + 1,
          case_number: c.case_number,
          legal_area: c.legal_area,
          court: c.court,
          sim: Math.round(c.similarity * 10000) / 10000,
          q: c.legal_question.slice(0, 140),
          gr: /^Gr\b/i.test(c.case_number),
        })),
      },
      null,
      2,
    ),
  )
}

async function verifyRetrieval() {
  const { retrieveCaseLawContext } = await import("../lib/legalRag")

  const facts =
    "Stranka je suvlasnik stana u zagrebu zajedno sa svojim suprugom. Oboje su upisani u zemljišni knjigu kao suvlasnici tako da supruga ima 9/10, a suprug 1/10. Supruga, naša stranka želi postati individualni vlasnik. Supruga živi u drugom stanu koji je naslijedila od roditelja, dok je suprug u zajedničkom stanu.  Suprug odbija iseliti i tvrdi da nema drugi stan u kojem bi živio."

  const ivana = `Predict the outcome for this civil case in Croatia:

Key Facts: ${facts}

Evidence Quality: medium
Amount in Dispute: 290000
Additional Context: None provided

`.trim()

  const stecaj =
    "koji je sud nadležan kad je nad ovršenikom otvoren stečaj"

  const ivanaResult = await retrieveCaseLawContext(ivana, "croatia", {
    legalArea: "civil",
    legalAreaMode: "hint",
    k: 8,
  })
  summarizeCases("ivana co-ownership (civil hint k=8)", ivanaResult.cases)

  const stecajResult = await retrieveCaseLawContext(stecaj, "croatia", {
    legalAreaMode: "hint",
    k: 8,
  })
  summarizeCases(
    "jurisdiction / stečaj (hint, no category, k=8)",
    stecajResult.cases,
  )
}

async function reembed(rows: GrRow[]) {
  const notMigrated = rows.filter((r) => !TEMPLATE_VALUES.has(r.legal_question))
  if (notMigrated.length > 0) {
    throw new Error(
      `Refusing to embed: ${notMigrated.length} rows still have a merits-style legal_question. ` +
        `Run supabase/migrations/20260907153000_croatia_gr_legal_question_templates.sql first. ` +
        `Example: ${notMigrated[0]!.case_number} → ${notMigrated[0]!.legal_question}`,
    )
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const { supabaseAdmin } = await import("../lib/supabase/admin")

  let ok = 0
  for (const row of rows) {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: embeddingSource(row),
    })
    const embedding = res.data[0]?.embedding
    if (!embedding || embedding.length !== 1536) {
      throw new Error(`Bad embedding for ${row.case_number}`)
    }
    const { error } = await supabaseAdmin
      .from("case_law")
      .update({ embedding })
      .eq("id", row.id)
    if (error) throw new Error(`${row.case_number}: ${error.message}`)
    ok += 1
    if (ok % 25 === 0 || ok === rows.length) {
      // eslint-disable-next-line no-console
      console.log(`embedded ${ok}/${rows.length}`)
    }
    await sleep(EMBED_SLEEP_MS)
  }
}

async function main() {
  const confirm = process.argv.includes("--confirm")
  const verifyOnly = process.argv.includes("--verify")
  const rows = await loadRows()
  if (rows.length !== 276) {
    // eslint-disable-next-line no-console
    console.warn(`Expected 276 Croatian Gr rows, got ${rows.length}`)
  }
  if (verifyOnly) {
    await verifyRetrieval()
    return
  }
  printClassification(rows)
  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log("\nDry run. Re-run with --confirm after the migration to re-embed.")
    return
  }
  await reembed(rows)
  // eslint-disable-next-line no-console
  console.log(`\nDone. Re-embedded ${rows.length} Croatian Gr rows.`)
  // eslint-disable-next-line no-console
  console.log("\n--- post-embed retrieval ---")
  await verifyRetrieval()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
