/**
 * Wall clock of the research search route's retrieval for the two
 * slowest stage-2 specs, under the current DEFAULT_KEYWORD_BUDGET_MS.
 * Mirrors app/api/research/search: page 1, limit 10, scope both,
 * one jurisdiction, laws and case law in parallel, then the inferred
 * area case-law retry when the first case-law pass is empty.
 * No model call: that route returns JSON and does not synthesize.
 */
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.join("scripts", "outreach", ".env") })
dotenv.config({ path: ".env.local" })

const QUERIES = [
  {
    id: "fbih_ostavinski",
    query: "ostavinski postupak i prava nasljednika",
    jurisdiction: "bih_fbih",
  },
  {
    id: "park_prvokup",
    query:
      "Kupio sam kuću unutar nacionalnog parka, a prodavatelj prije prodaje nije ponudio nekretninu jedinici lokalne samouprave koja ima pravo prvokupa. Je li kupoprodajni ugovor ništetan?",
    jurisdiction: "croatia",
  },
]

async function main(): Promise<void> {
  const { matchLegalArticles, retrieveCaseLawContext } = await import(
    "../lib/legalRag"
  )
  const { inferLegalAreasFromLawChunks } = await import(
    "../lib/normalizeResearchCategory"
  )

  const limit = 10
  const matchCount = Math.min(50, limit + 1)

  for (const spec of QUERIES) {
    const runOnce = async () => {
      const started = Date.now()
      const [laws, cases] = await Promise.all([
        matchLegalArticles({
          query: spec.query,
          jurisdiction: spec.jurisdiction,
          category: null,
          matchCount,
          similarityThreshold: 0.25,
          retryIfEmpty: true,
          applyActTypePenalty: true,
        }),
        retrieveCaseLawContext(spec.query, spec.jurisdiction, {
          k: Math.max(10, matchCount),
        }),
      ])
      let caseRetryMs = 0
      let caseRetryAreas: string[] = []
      if (cases.cases.length === 0 && laws.chunks.length > 0) {
        caseRetryAreas = inferLegalAreasFromLawChunks(laws.chunks)
        if (caseRetryAreas.length > 0) {
          const retryStarted = Date.now()
          await Promise.all(
            caseRetryAreas.map((area) =>
              retrieveCaseLawContext(spec.query, spec.jurisdiction, {
                k: Math.max(10, matchCount),
                legalArea: area,
              }),
            ),
          )
          caseRetryMs = Date.now() - retryStarted
        }
      }
      return {
        wallMs: Date.now() - started,
        lawTotalMs: laws.timing.totalMs,
        embedMs: laws.timing.embedMs,
        vectorRpcMs: laws.timing.vectorRpcMs,
        keywordMs: laws.timing.keywordMs,
        keywordStage1Ms: laws.timing.keywordStage1Ms ?? null,
        keywordStage2Ms: laws.timing.keywordStage2Ms ?? null,
        keywordTimedOut: laws.timing.keywordTimedOut,
        keywordSkipReason: laws.timing.keywordSkipReason ?? null,
        vectorRetried: laws.timing.vectorRetried,
        caseLawMs: cases.timing?.totalMs ?? null,
        caseCount: cases.cases.length,
        caseRetryMs,
        caseRetryAreas,
        lawChunks: laws.chunks.length,
      }
    }

    await runOnce()
    const runs = []
    for (let i = 0; i < 3; i++) runs.push(await runOnce())
    console.log(JSON.stringify({ id: spec.id, matchCount, runs }))
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    setTimeout(() => process.exit(process.exitCode ?? 0), 50)
  })
