import { createClient } from "@/lib/supabase/server"
import { createSignedContractDownloadUrl } from "@/lib/storage/signedContracts"

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
    .select("id, status, signed_pdf_path")
    .eq("id", id)
    .maybeSingle()

  if (error) return Response.json({ error: "Failed to load signature request" }, { status: 500 })
  if (!reqRow) return Response.json({ error: "Signature request not found" }, { status: 404 })

  const status = (reqRow as any).status as string | null
  const path = (reqRow as any).signed_pdf_path as string | null
  if (status !== "signed" || !path) {
    return Response.json({ error: "Signed PDF is not available" }, { status: 400 })
  }

  const downloadUrl = await createSignedContractDownloadUrl(path, 60 * 10)
  return Response.json({ downloadUrl })
}

