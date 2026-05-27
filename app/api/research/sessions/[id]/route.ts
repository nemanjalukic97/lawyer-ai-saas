import { getEntitlementPlanForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ id: string }>
}

function canSave(planId: string): boolean {
  return planId === "professional" || planId === "firm"
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  )
}

export async function DELETE(_request: Request, ctx: RouteContext) {
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

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid session id" }, { status: 400 })
  }

  const { data: row, error: loadError } = await supabase
    .from("research_sessions")
    .select("id")
    .eq("id", id)
    .maybeSingle()

  if (loadError) {
    return Response.json({ error: "Failed to load session" }, { status: 500 })
  }
  if (!row) {
    return Response.json({ error: "Session not found" }, { status: 404 })
  }

  const { error: deleteError } = await supabase
    .from("research_sessions")
    .delete()
    .eq("id", id)

  if (deleteError) {
    return Response.json({ error: "Failed to delete session" }, { status: 500 })
  }

  return Response.json({ success: true })
}
