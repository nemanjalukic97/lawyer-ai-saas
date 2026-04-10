export type PaidPlanId = "solo" | "professional" | "firm"

/** Resolved plan for gating (not a Paddle product — no subscription in DB). */
export type EntitlementPlanId = "free" | PaidPlanId

export type FeatureId =
  | "document_generation"
  | "contract_drafting"
  | "template_library"
  | "case_prediction"
  | "document_analysis"
  | "time_tracking"
  | "client_portal"
  | "activity_feed"

type PlanEntitlements = {
  id: EntitlementPlanId
  label: string
  aiCallsPerDay: number
  features: Record<FeatureId, boolean>
}

export const PLAN_ENTITLEMENTS: Record<EntitlementPlanId, PlanEntitlements> = {
  free: {
    id: "free",
    label: "Free",
    aiCallsPerDay: 10,
    features: {
      document_generation: true,
      contract_drafting: false,
      template_library: false,
      case_prediction: false,
      document_analysis: false,
      time_tracking: false,
      client_portal: false,
      activity_feed: false,
    },
  },
  solo: {
    id: "solo",
    label: "Solo",
    aiCallsPerDay: 20,
    features: {
      document_generation: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: false,
      document_analysis: false,
      time_tracking: false,
      client_portal: false,
      activity_feed: true,
    },
  },
  professional: {
    id: "professional",
    label: "Professional",
    aiCallsPerDay: 100,
    features: {
      document_generation: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: true,
      document_analysis: true,
      time_tracking: true,
      client_portal: true,
      activity_feed: true,
    },
  },
  firm: {
    id: "firm",
    label: "Firm",
    aiCallsPerDay: 300,
    features: {
      document_generation: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: true,
      document_analysis: true,
      time_tracking: true,
      client_portal: true,
      activity_feed: true,
    },
  },
}

export function normalizePlanId(
  raw: string | null | undefined
): EntitlementPlanId {
  if (raw === "solo" || raw === "professional" || raw === "firm") return raw
  return "free"
}

export function resolveSubscriptionTier(
  profileTier: string | null | undefined,
  lawFirmId: string | null | undefined,
  firmTier: string | null | undefined
): string | null {
  if (lawFirmId) {
    return firmTier ?? profileTier ?? null
  }
  return profileTier ?? null
}

export function hasFeature(
  planId: EntitlementPlanId,
  feature: FeatureId
): boolean {
  return PLAN_ENTITLEMENTS[planId].features[feature] === true
}

export function isPaidPlanId(
  tier: string | null | undefined
): tier is PaidPlanId {
  return tier === "solo" || tier === "professional" || tier === "firm"
}
