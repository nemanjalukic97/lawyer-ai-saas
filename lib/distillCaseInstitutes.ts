import OpenAI from "openai"

import type { DistillLog, DistillSkipReason } from "./legalRag"

export const DISTILL_TIMEOUT_MS = 4000

const DISTILL_SYSTEM = `You write statute-search queries for a legal RAG index of Croatian, Serbian, Bosnian, Montenegrin and Slovenian laws.

A lawyer does not search the facts. A lawyer names the institute or remedy the facts raise — even when the client never used that word.

Return JSON only: {"queries":["..."]}
Rules:
- 2 or 3 queries, never 4
- each query is 3 to 8 words
- no commas, no article numbers, no statute titles, no party names, no cities, no fractions
- use the statutory language of the jurisdiction (Croatian in Croatia, Serbian in Serbia, and so on)
- name the legal institute, statutory heading, or claim, not a story about what happened
- case type is only a hint; if the facts raise a different branch (for example property rather than civil), follow the facts
- if the facts allege a specific statutory condition was skipped (notice period, written reasons, form of a contract), name that condition
- do not name a different offence or area than the facts support
- do not name downstream practical outcomes (eviction, moving out, police, sentencing) unless that is itself the legal claim
- do not return sentencing, procedure, or remedy-stage terms as a standalone query (for example kazna zatvora, zatvorska kazna, presuda, žalba, troškovi postupka)
- keep the specific form of the remedy when the facts distinguish it (isplatom vs fizičkom diobom vs javnom prodajom); do not shorten to a bare institute name

Examples:

Jurisdiction: Croatia
Case type: civil
Facts: Troje suvlasnika poslovnog prostora. Jedan ima četiri petine i nudi ostalima novčanu naknadu da postane jedini vlasnik; oni odbijaju.
{"queries":["razvrgnuće suvlasništva isplatom","isplata suvlasničkog dijela"]}

Jurisdiction: Serbia
Case type: labor
Facts: Poslodavac je otkazao ugovor radnici koja je trudna, pozivajući se na smanjenje posla.
{"queries":["zabrana otkaza trudnoći","nezakoniti otkaz ugovora o radu"]}

Jurisdiction: Croatia
Case type: criminal
Facts: Optuženi je iz trgovine uzeo mobitel i izašao bez plaćanja.
{"queries":["krađa tuđe pokretne stvari","protupravno prisvajanje"]}`

const JURISDICTION_LABELS: Record<string, string> = {
  croatia: "Croatia",
  serbia: "Serbia",
  slovenia: "Slovenia",
  montenegro: "Montenegro",
  bih_fbih: "Bosnia and Herzegovina (FBiH)",
  bih_rs: "Bosnia and Herzegovina (RS)",
  bih_brcko: "Brčko District",
}

function sanitizeQueries(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const out: string[] = []
  const seen = new Set<string>()
  for (const item of raw) {
    if (typeof item !== "string") continue
    const q = item.replace(/,/g, " ").replace(/\s+/g, " ").trim()
    if (!q) continue
    const key = q.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
    if (out.length >= 3) break
  }
  return out
}

export function jurisdictionLabelForDistill(jurisdiction: string): string {
  return JURISDICTION_LABELS[jurisdiction] ?? jurisdiction
}

export function extractPredictionKeyFacts(userPrompt: string): string {
  const match = userPrompt.match(
    /Key Facts:\s*([\s\S]*?)(?:\n+Evidence Quality:|\n+Provide detailed analysis|$)/i,
  )
  const facts = match?.[1]?.trim()
  return facts && facts.length > 0 ? facts : userPrompt.trim()
}

function skipped(
  reason: DistillSkipReason,
  latencyMs: number,
  queries: string[] = [],
  inferredArea: string | null = null,
): DistillLog {
  return { queries, inferredArea, latencyMs, skippedReason: reason }
}

export async function distillCaseInstitutes(args: {
  facts: string
  jurisdiction: string
  caseType: string
  forceFail?: boolean
}): Promise<DistillLog> {
  const started = Date.now()
  if (args.forceFail) {
    return skipped("forced_fail", Date.now() - started)
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return skipped("error", Date.now() - started)
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DISTILL_TIMEOUT_MS)

  try {
    const openai = new OpenAI({ apiKey })
    const res = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 120,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: DISTILL_SYSTEM },
          {
            role: "user",
            content:
              `Jurisdiction: ${jurisdictionLabelForDistill(args.jurisdiction)}\n` +
              `Case type: ${args.caseType.trim() || "unknown"}\n` +
              `Facts: ${args.facts}`,
          },
        ],
      },
      { signal: controller.signal },
    )

    const raw = res.choices[0]?.message?.content ?? ""
    let parsed: unknown
    try {
      parsed = JSON.parse(raw) as unknown
    } catch {
      return skipped("parse", Date.now() - started)
    }

    const queries = sanitizeQueries(
      parsed && typeof parsed === "object" && "queries" in parsed
        ? (parsed as { queries: unknown }).queries
        : null,
    )
    if (queries.length === 0) {
      return skipped("empty", Date.now() - started)
    }

    return {
      queries,
      inferredArea: null,
      latencyMs: Date.now() - started,
    }
  } catch (err) {
    const aborted =
      controller.signal.aborted ||
      (err instanceof Error && err.name === "AbortError")
    return skipped(aborted ? "timeout" : "error", Date.now() - started)
  } finally {
    clearTimeout(timer)
  }
}
