import { NextRequest } from "next/server"

import { getEntitlementPlanForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { createClient } from "@/lib/supabase/server"

type ConflictMatch =
  | {
      source: "clients"
      id: string
      title: string
      subtitle?: string | null
      createdAt?: string | null
      context?: string | null
    }
  | {
      source: "contracts"
      id: string
      title: string
      subtitle?: string | null
      createdAt?: string | null
      context?: string | null
    }
  | {
      source: "case_predictions"
      id: string
      title: string
      subtitle?: string | null
      createdAt?: string | null
      context?: string | null
    }

type ConflictCheckResults = {
  status: "clear" | "conflict"
  query: {
    raw: string
    normalized: string
  }
  matches: {
    clients: ConflictMatch[]
    contracts: ConflictMatch[]
    case_predictions: ConflictMatch[]
  }
}

function normalizeQuery(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/,/g, " ")
    .trim()
    .toLowerCase()
}

function safeLikePattern(normalized: string): string {
  // Avoid commas (used as separators in PostgREST .or filters) and escape LIKE wildcards.
  const cleaned = normalized.replace(/,/g, " ").trim()
  const escaped = cleaned.replace(/[%_]/g, "\\$&")
  return `%${escaped}%`
}

function excerptAround(haystack: string, needle: string, radius = 80): string | null {
  const h = haystack ?? ""
  const n = needle?.trim()
  if (!h || !n) return null
  const idx = h.toLowerCase().indexOf(n.toLowerCase())
  if (idx === -1) return null
  const start = Math.max(0, idx - radius)
  const end = Math.min(h.length, idx + n.length + radius)
  const prefix = start > 0 ? "…" : ""
  const suffix = end < h.length ? "…" : ""
  return `${prefix}${h.slice(start, end).trim()}${suffix}`
}

function buildSummary(results: ConflictCheckResults): string {
  const c = results.matches.clients.length
  const k = results.matches.contracts.length
  const p = results.matches.case_predictions.length
  if (c + k + p === 0) return "No conflicts found."
  const parts = [
    c ? `${c} client match${c === 1 ? "" : "es"}` : null,
    k ? `${k} contract match${k === 1 ? "" : "es"}` : null,
    p ? `${p} case match${p === 1 ? "" : "es"}` : null,
  ].filter(Boolean)
  return `Potential conflicts: ${parts.join(", ")}.`
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json().catch(() => null)) as
    | {
        query?: string
        details?: Record<string, unknown> | null
        override?: boolean
        overrideConfirmed?: boolean
        overrideReason?: string | null
      }
    | null

  const rawQuery = (body?.query ?? "").toString()
  const normalized = normalizeQuery(rawQuery)
  if (!normalized) {
    return Response.json({ error: "Missing search query" }, { status: 400 })
  }

  const { data: profileRaw, error: profileErr } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  if (profileErr) {
    return Response.json({ error: "Failed to resolve scope" }, { status: 500 })
  }

  const lawFirmId =
    profileRaw && typeof (profileRaw as any).law_firm_id === "string"
      ? ((profileRaw as any).law_firm_id as string)
      : null

  const scopeOr = lawFirmId
    ? `user_id.eq.${user.id},law_firm_id.eq.${lawFirmId}`
    : `user_id.eq.${user.id}`

  const like = safeLikePattern(normalized)

  const [clientsResult, contractsResult, predictionsResult] = await Promise.all([
    supabase
      .from("clients")
      .select("id, name, company_name, email, status, created_at")
      .is("deleted_at", null)
      .or(scopeOr)
      .or(
        `name.ilike.${like},company_name.ilike.${like},email.ilike.${like}`
      )
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("contracts")
      .select("id, title, contract_type, status, created_at, party_names_text")
      .is("deleted_at", null)
      .or(scopeOr)
      .or(`title.ilike.${like},party_names_text.ilike.${like}`)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("case_predictions")
      .select("id, case_name, case_type, jurisdiction, created_at, case_facts")
      .is("deleted_at", null)
      .or(scopeOr)
      .or(`case_name.ilike.${like},case_facts.ilike.${like}`)
      .order("created_at", { ascending: false })
      .limit(20),
  ])

  if (clientsResult.error || contractsResult.error || predictionsResult.error) {
    return Response.json(
      {
        error: "Search failed",
        details: {
          clients: clientsResult.error?.message ?? null,
          contracts: contractsResult.error?.message ?? null,
          case_predictions: predictionsResult.error?.message ?? null,
        },
      },
      { status: 500 }
    )
  }

  const clientMatches: ConflictMatch[] = (clientsResult.data ?? []).map((r: any) => ({
    source: "clients",
    id: r.id,
    title: r.name as string,
    subtitle: r.company_name ? `${r.company_name}` : r.email ?? null,
    createdAt: r.created_at ?? null,
    context: r.status ? `Status: ${r.status}` : null,
  }))

  const contractMatches: ConflictMatch[] = (contractsResult.data ?? []).map((r: any) => ({
    source: "contracts",
    id: r.id,
    title: r.title as string,
    subtitle: r.contract_type ? `${r.contract_type}` : null,
    createdAt: r.created_at ?? null,
    context: excerptAround((r.party_names_text ?? "") as string, normalized) ??
      (r.status ? `Status: ${r.status}` : null),
  }))

  const predictionMatches: ConflictMatch[] = (predictionsResult.data ?? []).map((r: any) => ({
    source: "case_predictions",
    id: r.id,
    title: (r.case_name ?? "Untitled case") as string,
    subtitle: r.case_type ? `${r.case_type} · ${r.jurisdiction}` : (r.jurisdiction ?? null),
    createdAt: r.created_at ?? null,
    context: excerptAround((r.case_facts ?? "") as string, normalized),
  }))

  const results: ConflictCheckResults = {
    status:
      clientMatches.length || contractMatches.length || predictionMatches.length
        ? "conflict"
        : "clear",
    query: { raw: rawQuery, normalized },
    matches: {
      clients: clientMatches,
      contracts: contractMatches,
      case_predictions: predictionMatches,
    },
  }

  const resultsSummary = buildSummary(results)
  const hasConflict = results.status === "conflict"

  const override = Boolean(body?.override)
  const overrideConfirmed = Boolean(body?.overrideConfirmed)
  const overrideReason =
    typeof body?.overrideReason === "string" && body.overrideReason.trim()
      ? body.overrideReason.trim()
      : null

  const { data: logRow, error: logErr } = await supabase
    .from("conflict_checks")
    .insert({
      user_id: user.id,
      law_firm_id: lawFirmId,
      search_query: rawQuery,
      normalized_query: normalized,
      search_details: body?.details ?? null,
      results: results as unknown as never,
      results_summary: resultsSummary,
      has_conflict: hasConflict,
      override,
      override_confirmed: overrideConfirmed,
      override_reason: overrideReason,
    } as never)
    .select("id, created_at")
    .maybeSingle()

  if (logErr) {
    return Response.json(
      { error: "Failed to log conflict check", details: logErr.message },
      { status: 500 }
    )
  }

  return Response.json({
    results,
    log: logRow ? { id: (logRow as any).id, created_at: (logRow as any).created_at } : null,
  })
}

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  const canViewHistory = planId === "professional" || planId === "firm"
  if (!canViewHistory) {
    return Response.json({ error: "History is not enabled on your plan" }, { status: 403 })
  }

  const { data: profileRaw } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const lawFirmId =
    profileRaw && typeof (profileRaw as any).law_firm_id === "string"
      ? ((profileRaw as any).law_firm_id as string)
      : null

  const base = supabase
    .from("conflict_checks")
    .select(
      "id, created_at, user_id, law_firm_id, search_query, results_summary, has_conflict, override, override_confirmed"
    )
    .order("created_at", { ascending: false })
    .limit(25)

  const scoped = lawFirmId
    ? base.or(`law_firm_id.eq.${lawFirmId},user_id.eq.${user.id}`)
    : base.eq("user_id", user.id)

  const { data, error } = await scoped
  if (error) {
    return Response.json({ error: "Failed to load history" }, { status: 500 })
  }

  return Response.json({ items: data ?? [] })
}

