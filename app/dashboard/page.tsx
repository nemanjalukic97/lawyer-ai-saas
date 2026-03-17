import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import {
  ACTIVITY_HREF_BY_TYPE,
  getRecentActivity,
  getScopeFromProfile,
  type ActivityItem,
  type DashboardScope,
} from "./lib/activity"
import { DashboardClient } from "./DashboardClient"

type FeatureUsagePoint = {
  feature_type: string
  usage_count: number
}

type RoiData = {
  hoursSaved: number
  savingsEur: number
  subscriptionCostEur: number
  subscriptionTier: string
}

const JURISDICTION_LABELS: Record<string, string> = {
  serbia: "Serbia",
  croatia: "Croatia",
  montenegro: "Montenegro",
  slovenia: "Slovenia",
  bih_fbih: "Bosnia & Herzegovina – Federation",
  bih_rs: "Bosnia & Herzegovina – Republika Srpska",
  bih_brcko: "Bosnia & Herzegovina – Brcko District",
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  lawyer: "Lawyer",
  admin: "Admin",
  assistant: "Assistant",
}

const TIER_LABELS: Record<string, string> = {
  solo: "Solo",
  professional: "Professional",
  firm: "Firm",
}

async function getRoiData(
  supabase: ReturnType<typeof createClient>,
  scope: DashboardScope,
  profile: { law_firm_id: string | null; subscription_tier?: string | null }
): Promise<RoiData> {
  const filterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const filterVal = scope.lawFirmId ?? scope.userId

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: timeEntries } = await supabase
    .from("time_entries")
    .select("duration_minutes, hourly_rate, status")
    .eq(filterCol, filterVal)
    .is("deleted_at", null)
    .gte("work_date", startOfMonth.toISOString())

  const relevant = (timeEntries ?? []).filter((t: any) =>
    ["approved", "billed"].includes(t.status)
  )

  const totalHoursTracked = relevant.reduce(
    (sum: number, t: any) => sum + ((t.duration_minutes ?? 0) / 60),
    0
  )

  const { data: clients } = await supabase
    .from("clients")
    .select("default_hourly_rate")
    .eq(filterCol, filterVal)
    .is("deleted_at", null)

  const avgClientRate =
    clients && clients.length
      ? clients.reduce(
          (sum: number, c: any) => sum + Number(c.default_hourly_rate ?? 0),
          0
        ) / clients.length
      : 60

  const effectiveRate = avgClientRate

  const hoursSaved = totalHoursTracked * 0.3
  const savingsEur = hoursSaved * effectiveRate

  let tier = profile.subscription_tier ?? "professional"
  if (scope.lawFirmId) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", scope.lawFirmId)
      .maybeSingle()
    if (firm?.subscription_tier) tier = firm.subscription_tier
  }

  const tierPrices: Record<string, number> = {
    solo: 29,
    professional: 59,
    firm: 79,
  }
  const subscriptionCostEur = tierPrices[tier] ?? 59

  return {
    hoursSaved,
    savingsEur,
    subscriptionCostEur,
    subscriptionTier: tier,
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [
    { data: profile, error: profileError },
    contractsCountResult,
    documentsCountResult,
    predictionsCountResult,
    analysesCountResult,
    clientsCountResult,
    invoicesCountResult,
    { data: usageRows },
  ] = await Promise.all([
    supabase
      .from("user_profiles")
      .select(
        "full_name, role, preferred_jurisdiction, subscription_tier, subscription_status, trial_ends_at, law_firm_id"
      )
      .eq("id", user.id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase.from("contracts").select("*", { count: "exact", head: true }),
    supabase.from("documents").select("*", { count: "exact", head: true }),
    supabase
      .from("case_predictions")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("document_analyses")
      .select("*", { count: "exact", head: true }),
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("invoices").select("*", { count: "exact", head: true }),
    supabase
      .from("usage_stats")
      .select("feature_type, tokens_used, cost_usd, created_at")
      .order("created_at", { ascending: false })
      .limit(30),
  ])

  console.log("Profile data:", profile)
  console.log("Profile error:", profileError)

  let firm: {
    name: string | null
    subscription_tier: string | null
    subscription_status: string | null
    trial_ends_at: string | null
    default_jurisdiction: string | null
  } | null = null

  if (profile?.law_firm_id) {
    const { data: firmRow } = await supabase
      .from("law_firms")
      .select(
        "name, subscription_tier, subscription_status, trial_ends_at, default_jurisdiction"
      )
      .eq("id", profile.law_firm_id)
      .maybeSingle()

    firm = firmRow ?? null
  }

  const displayName =
    profile?.full_name ||
    // fall back to auth user metadata full_name if profile row is not yet populated
    (user.user_metadata as { full_name?: string })?.full_name ||
    user.email ||
    "Your workspace"
  const roleLabel =
    (profile?.role && ROLE_LABELS[profile.role]) || "Lawyer"

  const jurisdictionKey =
    profile?.preferred_jurisdiction ?? firm?.default_jurisdiction ?? null
  const jurisdictionLabel = jurisdictionKey
    ? JURISDICTION_LABELS[jurisdictionKey] ?? jurisdictionKey
    : "Jurisdiction not set"

  const tierKey =
    profile?.subscription_tier || firm?.subscription_tier || "solo"
  const subscriptionTier = TIER_LABELS[tierKey] || "Solo"
  const subscriptionStatus =
    profile?.subscription_status || firm?.subscription_status || "trial"

  const totalContracts = contractsCountResult.count ?? 0
  const totalDocuments = documentsCountResult.count ?? 0
  const totalPredictions = predictionsCountResult.count ?? 0
  const totalAnalyses = analysesCountResult.count ?? 0
  const totalClients = clientsCountResult.count ?? 0
  const totalInvoices = invoicesCountResult.count ?? 0

  const usageSummary = (usageRows ?? []).reduce(
    (acc, row) => {
      const tokens = row.tokens_used ?? 0
      const cost = Number(row.cost_usd ?? 0)
      return {
        totalTokens: acc.totalTokens + tokens,
        totalCost: acc.totalCost + cost,
      }
    },
    { totalTokens: 0, totalCost: 0 }
  )

  const scope = getScopeFromProfile(user.id, {
    law_firm_id: profile?.law_firm_id ?? null,
  })

  const [recentActivity, roiData] = await Promise.all([
    getRecentActivity(supabase, scope, { limit: 10 }),
    getRoiData(supabase, scope, {
      law_firm_id: profile?.law_firm_id ?? null,
      subscription_tier: profile?.subscription_tier ?? firm?.subscription_tier,
    }),
  ])

  const featureUsage: FeatureUsagePoint[] = (() => {
    const counts: Record<string, number> = {}
    for (const row of usageRows ?? []) {
      const key = row.feature_type as string
      counts[key] = (counts[key] ?? 0) + 1
    }
    return Object.entries(counts).map(([feature_type, usage_count]) => ({
      feature_type,
      usage_count,
    }))
  })()

  return (
    <DashboardClient
      displayName={displayName}
      roleLabel={roleLabel}
      jurisdictionLabel={jurisdictionLabel}
      subscriptionTier={subscriptionTier}
      subscriptionStatus={subscriptionStatus}
      firmName={firm?.name ?? null}
      firmTrialEndsAt={firm?.trial_ends_at ?? null}
      profileTrialEndsAt={profile?.trial_ends_at ?? null}
      totals={{
        clients: totalClients,
        contracts: totalContracts,
        documents: totalDocuments,
        analyses: totalAnalyses,
        predictions: totalPredictions,
        invoices: totalInvoices,
      }}
      usageSummary={usageSummary}
      featureUsage={featureUsage}
      recentActivity={recentActivity}
      roiData={roiData}
    />
  )
}

