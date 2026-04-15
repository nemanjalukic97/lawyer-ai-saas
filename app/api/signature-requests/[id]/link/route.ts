import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/site-url"

type RouteContext = {
  params: Promise<{ id: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function GET(_request: Request, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params
  if (!id || !isUuidLike(id)) {
    return Response.json({ error: "Invalid signature request id" }, { status: 400 })
  }

  const { data: reqRow, error } = await supabase
    .from("signature_requests")
    .select("id, token, status, expires_at")
    .eq("id", id)
    .maybeSingle()

  if (error) return Response.json({ error: "Failed to load signature request" }, { status: 500 })
  if (!reqRow) return Response.json({ error: "Signature request not found" }, { status: 404 })

  const status = (reqRow as any).status as string | null
  if (status !== "pending") {
    return Response.json({ error: "Signing link is not available for this request" }, { status: 400 })
  }

  const siteUrl = await getSiteUrl()
  const token = (reqRow as any).token as string
  const signingUrl = `${siteUrl}/sign/${token}`
  return Response.json({ signingUrl })
}

