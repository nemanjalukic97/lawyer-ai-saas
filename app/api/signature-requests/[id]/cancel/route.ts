import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ id: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function POST(_request: Request, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid signature request id" }, { status: 400 })
  }

  const { data: reqRow, error: reqError } = await supabase
    .from("signature_requests")
    .select("id, contract_id, status")
    .eq("id", id)
    .maybeSingle()

  if (reqError) return Response.json({ error: "Failed to load signature request" }, { status: 500 })
  if (!reqRow) return Response.json({ error: "Signature request not found" }, { status: 404 })

  const status = (reqRow as any).status as string | null
  if (status !== "pending") {
    return Response.json({ error: "Only pending requests can be cancelled" }, { status: 400 })
  }

  const { error: updateError } = await supabase
    .from("signature_requests")
    .update({ status: "cancelled" } as any)
    .eq("id", id)
    .eq("status", "pending")

  if (updateError) {
    return Response.json({ error: "Failed to cancel request" }, { status: 500 })
  }

  const contractId = (reqRow as any).contract_id as string
  await supabase
    .from("contracts")
    .update({ signature_status: "cancelled" } as any)
    .eq("id", contractId)
    .eq("signature_request_id", id)

  return Response.json({ success: true })
}

