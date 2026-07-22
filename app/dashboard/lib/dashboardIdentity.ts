import { cache } from "react"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import {
  normalizePlanId,
  resolveSubscriptionTier,
  type EntitlementPlanId,
} from "./entitlements"

export type DashboardProfile = Pick<
  Tables<"user_profiles">,
  | "full_name"
  | "role"
  | "preferred_jurisdiction"
  | "subscription_tier"
  | "subscription_status"
  | "trial_ends_at"
  | "welcome_modal_seen_at"
  | "law_firm_id"
>

export type DashboardFirm = {
  name: string | null
  subscription_tier: string | null
  subscription_status: string | null
  trial_ends_at: string | null
  default_jurisdiction: string | null
}

export type DashboardIdentity = {
  userId: string
  userEmail: string | null
  userMetadataFullName: string | null
  profile: DashboardProfile
  firm: DashboardFirm | null
  planId: EntitlementPlanId
}

/**
 * Per-request identity for layout + dashboard page.
 * One profile read, then optional firm read; planId is derived (no extra round).
 * React cache() dedupes layout and page within the same request.
 */
export const getDashboardIdentity = cache(
  async (userId: string): Promise<DashboardIdentity | null> => {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user || user.id !== userId) return null

    const { data: profileRaw } = await supabase
      .from("user_profiles")
      .select(
        "full_name, role, preferred_jurisdiction, subscription_tier, subscription_status, trial_ends_at, welcome_modal_seen_at, law_firm_id",
      )
      .eq("id", userId)
      .is("deleted_at", null)
      .maybeSingle()

    if (!profileRaw) return null
    const profile = profileRaw as DashboardProfile
    const lawFirmId = profile.law_firm_id ?? null

    let firm: DashboardFirm | null = null
    if (lawFirmId) {
      const { data: firmRaw } = await supabase
        .from("law_firms")
        .select(
          "name, subscription_tier, subscription_status, trial_ends_at, default_jurisdiction",
        )
        .eq("id", lawFirmId)
        .maybeSingle()
      firm = (firmRaw as DashboardFirm | null) ?? null
    }

    const rawTier = resolveSubscriptionTier(
      profile.subscription_tier ?? null,
      lawFirmId,
      firm?.subscription_tier ?? null,
    )

    return {
      userId,
      userEmail: user.email ?? null,
      userMetadataFullName:
        (user.user_metadata as { full_name?: string } | null)?.full_name ?? null,
      profile,
      firm,
      planId: normalizePlanId(rawTier),
    }
  },
)
