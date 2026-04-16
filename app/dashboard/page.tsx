import { redirect } from "next/navigation"

import { createClient, type ServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import {
  getEntitlementPlanForUser,
} from "./lib/getEntitlementPlan"
import {
  hasFeature,
  isPaidPlanId,
  resolveSubscriptionTier,
  type EntitlementPlanId,
} from "./lib/entitlements"
import {
  getRecentActivity,
  getScopeFromProfile,
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

async function getRoiData(
  supabase: ServerSupabaseClient,
  scope: DashboardScope,
  profile: {
    law_firm_id: string | null
    subscription_tier?: string | null
  }
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

  const relevant = (
    (timeEntries ?? []) as Array<{
      duration_minutes: number | null
      hourly_rate: number | null
      status: string | null
    }>
  ).filter((t) => ["approved", "billed"].includes(t.status ?? ""))

  const totalHoursTracked = relevant.reduce(
    (sum: number, t) => sum + ((t.duration_minutes ?? 0) / 60),
    0
  )

  const { data: clients } = await supabase
    .from("clients")
    .select("default_hourly_rate")
    .eq(filterCol, filterVal)
    .is("deleted_at", null)

  const avgClientRate =
    clients && clients.length
      ? (clients as Array<{ default_hourly_rate: number | null }>).reduce(
          (sum: number, c: { default_hourly_rate: number | null }) =>
            sum + Number(c.default_hourly_rate ?? 0),
          0
        ) / clients.length
      : 60

  const effectiveRate = avgClientRate

  const hoursSaved = totalHoursTracked * 0.3
  const savingsEur = hoursSaved * effectiveRate

  let tier: string | null = profile?.subscription_tier ?? null
  if (scope.lawFirmId) {
    const { data: firmRowRaw } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", scope.lawFirmId)
      .maybeSingle()
    const firmRow = firmRowRaw as
      | Pick<Tables<"law_firms">, "subscription_tier">
      | null
    if (firmRow) {
      tier = firmRow.subscription_tier ?? tier
    }
  }

  const tierPrices: Record<string, number> = {
    solo: 29,
    professional: 59,
    firm: 79,
  }
  const subscriptionCostEur = isPaidPlanId(tier) ? tierPrices[tier] : 0

  return {
    hoursSaved,
    savingsEur,
    subscriptionCostEur,
    subscriptionTier: tier ?? "none",
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
    { data: profile },
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

  if (!profile) {
    redirect("/login")
  }

  const userProfile = profile as Pick<
    Tables<"user_profiles">,
    | "full_name"
    | "role"
    | "preferred_jurisdiction"
    | "subscription_tier"
    | "subscription_status"
    | "trial_ends_at"
    | "law_firm_id"
  >

  let firm: {
    name: string | null
    subscription_tier: string | null
    subscription_status: string | null
    trial_ends_at: string | null
    default_jurisdiction: string | null
  } | null = null

  const profileLawFirmId = userProfile.law_firm_id ?? null
  if (profileLawFirmId) {
    const { data: firmRow } = await supabase
      .from("law_firms")
      .select(
        "name, subscription_tier, subscription_status, trial_ends_at, default_jurisdiction"
      )
      .eq("id", profileLawFirmId)
      .maybeSingle()

    firm = firmRow ?? null
  }

  const scopeFilter = profileLawFirmId
    ? `user_id.eq.${user.id},law_firm_id.eq.${profileLawFirmId}`
    : null

  const [outstandingInvoicesResult, overdueInvoicesCountResult, paidThisMonthInvoicesResult] =
    await Promise.all([
      (() => {
        const q = supabase
          .from("invoices")
          .select("total_amount, status")
          .in("status", ["sent", "overdue"])
        return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", user.id)
      })(),
      (() => {
        const q = supabase
          .from("invoices")
          .select("*", { count: "exact", head: true })
          .eq("status", "overdue")
        return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", user.id)
      })(),
      (() => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const q = supabase
          .from("invoices")
          .select("total_amount, paid_at, status")
          .eq("status", "paid")
          .gte("paid_at", start.toISOString())
          .lt("paid_at", end.toISOString())
        return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", user.id)
      })(),
    ])

  const [pendingSignaturesCountResult, signedThisMonthSignaturesCountResult] =
    await Promise.all([
      (() => {
        const nowIso = new Date().toISOString()
        const q = supabase
          .from("signature_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending")
          .gt("expires_at", nowIso)
        return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", user.id)
      })(),
      (() => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const q = supabase
          .from("signature_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "signed")
          .gte("signed_at", start.toISOString())
          .lt("signed_at", end.toISOString())
        return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", user.id)
      })(),
    ])

  const displayName =
    userProfile.full_name ||
    // fall back to auth user metadata full_name if profile row is not yet populated
    (user.user_metadata as { full_name?: string })?.full_name ||
    user.email ||
    "Your workspace"
  const roleLabel =
    (userProfile.role && ROLE_LABELS[userProfile.role]) || "Lawyer"

  const jurisdictionKey =
    userProfile.preferred_jurisdiction ?? firm?.default_jurisdiction ?? null
  const jurisdictionLabel = jurisdictionKey
    ? JURISDICTION_LABELS[jurisdictionKey] ?? jurisdictionKey
    : "Jurisdiction not set"

  const storedTier = resolveSubscriptionTier(
    userProfile.subscription_tier ?? null,
    userProfile.law_firm_id ?? null,
    firm?.subscription_tier ?? null
  )
  const subscriptionStatusRaw =
    firm?.subscription_status ?? userProfile.subscription_status ?? null
  const subscriptionStatusForClient = isPaidPlanId(storedTier)
    ? subscriptionStatusRaw ?? "trial"
    : null

  const planId: EntitlementPlanId = await getEntitlementPlanForUser(
    supabase,
    user.id
  )

  let upcomingDeadlines: Array<{
    id: string
    title: string
    due_date: string
    status: Tables<"deadlines">["status"]
  }> = []

  if (hasFeature(planId, "deadline_tracking")) {
    const { data: dlRows } = await supabase
      .from("deadlines")
      .select("id, title, due_date, status")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .order("due_date", { ascending: true })
      .limit(40)

    const rows = (dlRows ?? []) as Array<{
      id: string
      title: string
      due_date: string
      status: string | null
    }>

    upcomingDeadlines = rows
      .filter(
        (d) => d.status !== "completed" && d.status !== "cancelled"
      )
      .slice(0, 5)
      .map((d) => ({
        id: d.id,
        title: d.title,
        due_date: d.due_date,
        status: d.status as Tables<"deadlines">["status"],
      }))
  }

  const totalContracts = contractsCountResult.count ?? 0
  const totalDocuments = documentsCountResult.count ?? 0
  const totalPredictions = predictionsCountResult.count ?? 0
  const totalAnalyses = analysesCountResult.count ?? 0
  const totalClients = clientsCountResult.count ?? 0
  const totalInvoices = invoicesCountResult.count ?? 0
  const pendingSignatureCount = pendingSignaturesCountResult.count ?? 0
  const signedThisMonthSignatureCount =
    signedThisMonthSignaturesCountResult.count ?? 0

  const outstandingInvoices = (outstandingInvoicesResult.data ?? []) as Array<{
    total_amount: number | null
    status: string | null
  }>
  const outstandingTotalEur = outstandingInvoices.reduce(
    (sum, inv) => sum + Number(inv.total_amount ?? 0),
    0
  )
  const overdueCount = overdueInvoicesCountResult.count ?? 0
  const paidThisMonthInvoices = (paidThisMonthInvoicesResult.data ?? []) as Array<{
    total_amount: number | null
  }>
  const paidThisMonthTotalEur = paidThisMonthInvoices.reduce(
    (sum, inv) => sum + Number(inv.total_amount ?? 0),
    0
  )

  const usageRowsTyped = (usageRows ?? []) as Array<{
    feature_type: string | null
    tokens_used: number | null
    cost_usd: number | null
    created_at: string | null
  }>

  const usageSummary = usageRowsTyped.reduce(
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
    law_firm_id: userProfile.law_firm_id ?? null,
  })

  const scopeFilterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const scopeFilterVal = scope.lawFirmId ?? scope.userId

  const [
    recentActivity,
    roiData,
    activeMattersCountRes,
    activeMattersRecentRes,
  ] = await Promise.all([
    getRecentActivity(supabase, scope, { limit: 10 }),
    getRoiData(supabase, scope, {
      law_firm_id: userProfile.law_firm_id ?? null,
      subscription_tier:
        userProfile.subscription_tier ?? firm?.subscription_tier ?? null,
    }),
    supabase
      .from("matters")
      .select("id", { count: "exact", head: true })
      .eq(scopeFilterCol, scopeFilterVal)
      .eq("status", "open")
      .is("deleted_at", null),
    supabase
      .from("matters")
      .select("id, title, matter_number, status, updated_at")
      .eq(scopeFilterCol, scopeFilterVal)
      .eq("status", "open")
      .is("deleted_at", null)
      .order("updated_at", { ascending: false })
      .limit(3),
  ])

  const featureUsage: FeatureUsagePoint[] = (() => {
    const counts: Record<string, number> = {}
    for (const row of usageRowsTyped) {
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
      planId={planId}
      subscriptionStatus={subscriptionStatusForClient}
      firmName={firm?.name ?? null}
      firmTrialEndsAt={firm?.trial_ends_at ?? null}
      profileTrialEndsAt={userProfile.trial_ends_at ?? null}
      totals={{
        clients: totalClients,
        contracts: totalContracts,
        documents: totalDocuments,
        analyses: totalAnalyses,
        predictions: totalPredictions,
        invoices: totalInvoices,
      }}
      invoiceMetrics={{
        outstandingTotalEur,
        overdueCount,
        paidThisMonthTotalEur,
      }}
      signatureMetrics={{
        pendingCount: pendingSignatureCount,
        signedThisMonthCount: signedThisMonthSignatureCount,
      }}
      usageSummary={usageSummary}
      featureUsage={featureUsage}
      recentActivity={recentActivity}
      roiData={roiData}
      upcomingDeadlines={upcomingDeadlines}
      activeMatters={{
        openCount: activeMattersCountRes.count ?? 0,
        recent: (activeMattersRecentRes.data ?? []) as Array<{
          id: string
          title: string
          matter_number: string
          status: "open"
          updated_at: string | null
        }>,
      }}
    />
  )
}

