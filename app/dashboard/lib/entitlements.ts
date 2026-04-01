export type PlanId = "solo" | "professional" | "firm"

export type FeatureId =
  | "document_generation"
  | "contract_drafting"
  | "template_library"
  | "case_prediction"
  | "document_analysis"
  | "time_tracking"
  | "client_portal"

type PlanEntitlements = {
  id: PlanId
  label: string
  aiCallsPerDay: number
  features: Record<FeatureId, boolean>
}

export const PLAN_ENTITLEMENTS: Record<PlanId, PlanEntitlements> = {
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
    },
  },
}

export function normalizePlanId(raw: string | null | undefined): PlanId {
  if (raw === "solo" || raw === "professional" || raw === "firm") return raw
  return "solo"
}

export function hasFeature(planId: PlanId, feature: FeatureId): boolean {
  return PLAN_ENTITLEMENTS[planId].features[feature] === true
}

