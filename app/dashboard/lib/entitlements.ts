export type PaidPlanId = "solo" | "professional" | "firm"

/** Resolved plan for gating (not a Paddle product — no subscription in DB). */
export type EntitlementPlanId = "free" | PaidPlanId

export type FeatureId =
  | "document_generation"
  | "conflict_check"
  | "legal_research"
  | "contract_drafting"
  | "template_library"
  | "case_prediction"
  | "document_analysis"
  | "document_redlining"
  | "time_tracking"
  | "invoice_sending"
  | "invoice_reminders"
  | "client_portal"
  | "activity_feed"
  | "intake_forms"
  | "deadline_tracking"
  | "matter_management"

type PlanEntitlements = {
  id: EntitlementPlanId
  label: string
  aiCallsPerDay: number
  maxActiveSignatureRequests: number | "unlimited"
  features: Record<FeatureId, boolean>
}

export const PLAN_ENTITLEMENTS: Record<EntitlementPlanId, PlanEntitlements> = {
  free: {
    id: "free",
    label: "Free",
    aiCallsPerDay: 10,
    maxActiveSignatureRequests: 0,
    features: {
      document_generation: true,
      conflict_check: true,
      legal_research: true,
      contract_drafting: false,
      template_library: false,
      case_prediction: false,
      document_analysis: false,
      document_redlining: false,
      time_tracking: false,
      invoice_sending: false,
      invoice_reminders: false,
      client_portal: false,
      activity_feed: false,
      intake_forms: false,
      deadline_tracking: false,
      matter_management: true,
    },
  },
  solo: {
    id: "solo",
    label: "Solo",
    aiCallsPerDay: 20,
    maxActiveSignatureRequests: 5,
    features: {
      document_generation: true,
      conflict_check: true,
      legal_research: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: false,
      document_analysis: false,
      document_redlining: false,
      time_tracking: false,
      invoice_sending: false,
      invoice_reminders: false,
      client_portal: false,
      activity_feed: true,
      intake_forms: false,
      deadline_tracking: false,
      matter_management: true,
    },
  },
  professional: {
    id: "professional",
    label: "Professional",
    aiCallsPerDay: 100,
    maxActiveSignatureRequests: "unlimited",
    features: {
      document_generation: true,
      conflict_check: true,
      legal_research: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: true,
      document_analysis: true,
      document_redlining: true,
      time_tracking: true,
      invoice_sending: true,
      invoice_reminders: true,
      client_portal: true,
      activity_feed: true,
      intake_forms: true,
      deadline_tracking: true,
      matter_management: true,
    },
  },
  firm: {
    id: "firm",
    label: "Firm",
    aiCallsPerDay: 300,
    maxActiveSignatureRequests: "unlimited",
    features: {
      document_generation: true,
      conflict_check: true,
      legal_research: true,
      contract_drafting: true,
      template_library: true,
      case_prediction: true,
      document_analysis: true,
      document_redlining: true,
      time_tracking: true,
      invoice_sending: true,
      invoice_reminders: true,
      client_portal: true,
      activity_feed: true,
      intake_forms: true,
      deadline_tracking: true,
      matter_management: true,
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

export function getMaxActiveSignatureRequests(
  planId: EntitlementPlanId
): number | "unlimited" {
  return PLAN_ENTITLEMENTS[planId].maxActiveSignatureRequests
}

export function isPaidPlanId(
  tier: string | null | undefined
): tier is PaidPlanId {
  return tier === "solo" || tier === "professional" || tier === "firm"
}
