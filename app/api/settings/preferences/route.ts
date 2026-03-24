import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("theme_preference")
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle()

    if (error) {
      console.error("Settings preferences GET:", error)
      return Response.json({ error: "Failed to load preferences" }, { status: 500 })
    }

    const profile = data as
      | Pick<Tables<"user_profiles">, "theme_preference">
      | null

    if (!profile) {
      return Response.json({ theme: "light" as const })
    }

    const theme = profile.theme_preference === "dark" ? "dark" : "light"
    return Response.json({ theme })
  } catch (error) {
    console.error("Settings preferences GET error:", error)
    return Response.json(
      { error: "Unexpected error while loading preferences" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: unknown = await req.json().catch(() => ({}))
    const theme =
      body &&
      typeof body === "object" &&
      "theme" in body &&
      typeof (body as Record<string, unknown>).theme === "string"
        ? (body as Record<string, unknown>).theme
        : undefined

    if (theme !== undefined && theme !== "light" && theme !== "dark") {
      return Response.json({ error: "Invalid theme" }, { status: 400 })
    }

    if (theme === undefined) {
      return Response.json({ success: true })
    }

    const themeValue = theme as "light" | "dark"
    const { error } = await supabase
      .from("user_profiles")
      .update({ theme_preference: themeValue } as never)
      .eq("id", user.id)

    if (error) {
      console.error("Settings preferences POST:", error)
      return Response.json({ error: "Failed to save preferences" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Settings preferences POST error:", error)
    return Response.json(
      { error: "Unexpected error while saving preferences" },
      { status: 500 }
    )
  }
}
