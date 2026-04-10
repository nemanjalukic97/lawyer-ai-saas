import type { ServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"

import {
  normalizePlanId,
  resolveSubscriptionTier,
  type EntitlementPlanId,
} from "./entitlements"

type UserProfileTierPick = Pick<
  Tables<"user_profiles">,
  "subscription_tier" | "law_firm_id"
>
type LawFirmTierPick = Pick<Tables<"law_firms">, "subscription_tier">

export async function getSubscriptionContextForUser(
  supabase: ServerSupabaseClient,
  userId: string
): Promise<{ planId: EntitlementPlanId; lawFirmId: string | null }> {
  const { data: profileRaw } = await supabase
    .from("user_profiles")
    .select("subscription_tier, law_firm_id")
    .eq("id", userId)
    .is("deleted_at", null)
    .maybeSingle()

  const profile = profileRaw as UserProfileTierPick | null
  if (!profile) {
    return { planId: "free", lawFirmId: null }
  }

  const lawFirmId = profile.law_firm_id ?? null
  let firmTier: string | null = null
  if (lawFirmId) {
    const { data: firmRaw } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", lawFirmId)
      .maybeSingle()
    const firm = firmRaw as LawFirmTierPick | null
    if (firm) {
      firmTier = firm.subscription_tier ?? null
    }
  }

  const raw = resolveSubscriptionTier(
    profile.subscription_tier ?? null,
    lawFirmId,
    firmTier
  )
  return {
    planId: normalizePlanId(raw),
    lawFirmId,
  }
}

export async function getEntitlementPlanForUser(
  supabase: ServerSupabaseClient,
  userId: string
): Promise<EntitlementPlanId> {
  const { planId } = await getSubscriptionContextForUser(supabase, userId)
  return planId
}
