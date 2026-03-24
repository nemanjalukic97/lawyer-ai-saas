import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import SettingsPageClient from "./SettingsPageClient"

type ProfileSettings = Pick<
  Tables<"user_profiles">,
  | "full_name"
  | "law_firm_id"
  | "preferred_jurisdiction"
  | "preferred_language"
  | "subscription_tier"
  | "subscription_status"
  | "theme_preference"
>

type FirmSettings = Pick<
  Tables<"law_firms">,
  "id" | "name" | "subscription_tier" | "subscription_status" | "default_jurisdiction"
>

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select(
      "full_name, law_firm_id, preferred_jurisdiction, preferred_language, subscription_tier, subscription_status, theme_preference"
    )
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const typedProfile = profile
    ? (profile as ProfileSettings & { law_firm_id: string | null })
    : null

  const lawFirmId = typedProfile?.law_firm_id ?? null

  const { data: firm } = lawFirmId
    ? await supabase
        .from("law_firms")
        .select(
          "id, name, subscription_tier, subscription_status, default_jurisdiction"
        )
        .eq("id", lawFirmId)
        .is("deleted_at", null)
        .maybeSingle()
    : { data: null as unknown }

  const typedFirm = firm ? (firm as FirmSettings) : null

  return (
    <SettingsPageClient
      user={{
        id: user.id,
        email: user.email ?? null,
      }}
      profile={typedProfile}
      firm={typedFirm}
    />
  )
}

