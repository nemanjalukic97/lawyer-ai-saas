import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

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

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid contract id" }, { status: 400 })
  }

  const { data: contract, error: loadError } = await supabase
    .from("contracts")
    .select("id, title, user_id, law_firm_id, signature_status, signature_request_id")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle()

  if (loadError) {
    return Response.json({ error: "Failed to load contract" }, { status: 500 })
  }
  if (!contract) {
    return Response.json({ error: "Contract not found" }, { status: 404 })
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const userFirmId =
    profile && typeof profile.law_firm_id === "string" ? profile.law_firm_id : null

  const row = contract as {
    user_id: string
    law_firm_id: string | null
    signature_status: string | null
    signature_request_id: string | null
  }

  const canDelete =
    row.user_id === user.id ||
    (row.law_firm_id !== null &&
      userFirmId !== null &&
      row.law_firm_id === userFirmId)

  if (!canDelete) {
    return Response.json({ error: "Not permitted to delete this contract" }, { status: 403 })
  }

  if (row.signature_status === "pending" && row.signature_request_id) {
    await supabaseAdmin
      .from("signature_requests")
      .update({ status: "cancelled" } as never)
      .eq("id", row.signature_request_id)
      .eq("status", "pending")
  }

  const deletedAt = new Date().toISOString()
  const { error: deleteError } = await supabaseAdmin
    .from("contracts")
    .update({ deleted_at: deletedAt } as never)
    .eq("id", id)
    .is("deleted_at", null)

  if (deleteError) {
    return Response.json({ error: "Failed to delete contract" }, { status: 500 })
  }

  return Response.json({ success: true, id, title: (contract as { title?: string }).title })
}
