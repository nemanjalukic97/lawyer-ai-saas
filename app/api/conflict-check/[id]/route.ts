import { getEntitlementPlanForUser } from "@/app/dashboard/lib/getEntitlementPlan"
import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ id: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function DELETE(_request: Request, ctx: RouteContext) {
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

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid conflict check id" }, { status: 400 })
  }

  const { error } = await supabase.from("conflict_checks").delete().eq("id", id)

  if (error) {
    return Response.json({ error: "Failed to delete conflict check" }, { status: 500 })
  }

  return Response.json({ success: true })
}
