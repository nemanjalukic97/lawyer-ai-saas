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

    // Preferences will be persisted in a future iteration.
    // For now we just acknowledge the request.
    return Response.json({ success: true })
  } catch (error) {
    console.error("Settings preferences route error:", error)
    return Response.json(
      { error: "Unexpected error while saving preferences" },
      { status: 500 }
    )
  }
}

