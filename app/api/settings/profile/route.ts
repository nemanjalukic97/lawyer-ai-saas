import { NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"

type ProfileBody = {
  fullName?: string | null
  preferredJurisdiction?: string | null
  preferredLanguage?: string | null
  lawFirmName?: string | null
}

function isProfileBody(value: unknown): value is ProfileBody {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  const keys = [
    "fullName",
    "preferredJurisdiction",
    "preferredLanguage",
    "lawFirmName",
  ]
  return keys.some((key) => key in v)
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

    let body: ProfileBody
    try {
      const parsed: unknown = await req.json()
      if (!isProfileBody(parsed)) {
        return Response.json({ error: "Invalid request body" }, { status: 400 })
      }
      body = parsed
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const { fullName, preferredJurisdiction, preferredLanguage, lawFirmName } = body

    const updatePayload: Record<string, unknown> = {}
    if (typeof fullName === "string" && fullName.trim()) {
      updatePayload.full_name = fullName.trim()
    }
    if (typeof preferredJurisdiction === "string" && preferredJurisdiction) {
      updatePayload.preferred_jurisdiction = preferredJurisdiction
    }
    if (typeof preferredLanguage === "string" && preferredLanguage) {
      updatePayload.preferred_language = preferredLanguage
    }

    if (Object.keys(updatePayload).length > 0) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update(updatePayload)
        .eq("id", user.id)
        .is("deleted_at", null)

      if (profileError) {
        return Response.json(
          { error: "Failed to update profile" },
          { status: 500 }
        )
      }
    }

    if (lawFirmName && lawFirmName.trim()) {
      const { data: profileRow, error: profileFetchError } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .is("deleted_at", null)
        .maybeSingle()

      if (profileFetchError) {
        return Response.json(
          { error: "Failed to load user profile" },
          { status: 500 }
        )
      }

      const typedProfile = profileRow as
        | Pick<Tables<"user_profiles">, "law_firm_id">
        | null

      const lawFirmId = typedProfile?.law_firm_id ?? null

      if (lawFirmId) {
        const { error: firmError } = await supabase
          .from("law_firms")
          .update({ name: lawFirmName.trim() })
          .eq("id", lawFirmId)
          .is("deleted_at", null)

        if (firmError) {
          return Response.json(
            { error: "Failed to update law firm" },
            { status: 500 }
          )
        }
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Settings profile route error:", error)
    return Response.json(
      { error: "Unexpected error while updating profile" },
      { status: 500 }
    )
  }
}

