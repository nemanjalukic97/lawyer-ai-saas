import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("user_profiles")
      .update({ welcome_modal_seen_at: new Date().toISOString() } as never)
      .eq("id", user.id)
      .is("deleted_at", null)

    if (error) {
      console.error("dismiss-welcome POST:", error)
      return Response.json({ error: "Failed to dismiss welcome" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("dismiss-welcome POST error:", error)
    return Response.json(
      { error: "Unexpected error while dismissing welcome" },
      { status: 500 }
    )
  }
}
