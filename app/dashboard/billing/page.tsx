import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import BillingPageClient from "./BillingPageClient"

type SearchParams = {
  success?: string
}

export default async function BillingPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const params = await searchParams
  const success = params?.success === "true"

  const { data: profile } = await supabase
    .from("user_profiles")
    .select(
      "id, full_name, law_firm_id, subscription_tier, subscription_status, trial_ends_at"
    )
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const typedProfile = profile
    ? (profile as Pick<
        Tables<"user_profiles">,
        "law_firm_id" | "subscription_tier" | "subscription_status" | "trial_ends_at"
      >)
    : null

  const lawFirmId = typedProfile?.law_firm_id ?? null

  const { data: firm } = lawFirmId
    ? await supabase
        .from("law_firms")
        .select("id, name, subscription_tier, subscription_status, trial_ends_at")
        .eq("id", lawFirmId)
        .maybeSingle()
    : { data: null as unknown }

  const typedFirm = firm
    ? (firm as Pick<
        Tables<"law_firms">,
        "id" | "name" | "subscription_tier" | "subscription_status" | "trial_ends_at"
      >)
    : null

  return (
    <BillingPageClient
      success={success}
      billing={{
        userId: user.id,
        profile: typedProfile,
        firm: typedFirm,
      }}
    />
  )
}

