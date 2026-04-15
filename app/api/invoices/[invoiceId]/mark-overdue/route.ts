import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ invoiceId: string }>
}

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  )
}

export async function POST(_req: NextRequest, ctx: RouteContext) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { invoiceId } = await ctx.params
  if (!invoiceId || !isUuidLike(invoiceId)) {
    return Response.json({ error: "Invalid invoice id" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("invoices")
    .update(
      {
        status: "overdue",
      } as never
    )
    .eq("id", invoiceId)
    .select("id")
    .maybeSingle()

  if (error) {
    return Response.json({ error: "Failed to mark invoice as overdue" }, { status: 500 })
  }
  if (!data) {
    return Response.json({ error: "Invoice not found" }, { status: 404 })
  }

  return Response.json({ success: true })
}

