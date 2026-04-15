import { NextRequest } from "next/server"

import { getEntitlementPlanForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { createClient } from "@/lib/supabase/server"

type SaveSessionBody = {
  query?: string
  jurisdiction_filter?: string | null
  category_filter?: string | null
  results?: unknown
}

function canSave(planId: string): boolean {
  return planId === "professional" || planId === "firm"
}

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!canSave(planId)) {
    return Response.json(
      { error: "Research history is not enabled on your plan" },
      { status: 403 },
    )
  }

  const { data, error } = await supabase
    .from("research_sessions")
    .select(
      "id, created_at, user_id, law_firm_id, query, jurisdiction_filter, category_filter, results",
    )
    .order("created_at", { ascending: false })
    .limit(25)

  if (error) {
    return Response.json({ error: "Failed to load history" }, { status: 500 })
  }

  return Response.json({ items: data ?? [] })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!canSave(planId)) {
    return Response.json(
      { error: "Saving research sessions is not enabled on your plan" },
      { status: 403 },
    )
  }

  const body = (await req.json().catch(() => null)) as SaveSessionBody | null
  const query = (body?.query ?? "").toString().trim()
  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 })
  }

  const jurisdictionFilter =
    typeof body?.jurisdiction_filter === "string" && body.jurisdiction_filter.trim()
      ? body.jurisdiction_filter.trim()
      : null
  const categoryFilter =
    typeof body?.category_filter === "string" && body.category_filter.trim()
      ? body.category_filter.trim()
      : null

  // Resolve firm scope (mirrors conflict-check route).
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

  const results = body?.results ?? null
  if (results === null) {
    return Response.json({ error: "Missing results" }, { status: 400 })
  }

  const { data: row, error } = await supabase
    .from("research_sessions")
    .insert({
      user_id: user.id,
      law_firm_id: lawFirmId,
      query,
      jurisdiction_filter: jurisdictionFilter,
      category_filter: categoryFilter,
      results: results as any,
    } as any)
    .select("id, created_at")
    .maybeSingle()

  if (error) {
    return Response.json(
      { error: "Failed to save research session", details: error.message },
      { status: 500 },
    )
  }

  return Response.json({ session: row })
}

