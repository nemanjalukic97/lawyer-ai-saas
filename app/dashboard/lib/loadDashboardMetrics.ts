import type { ServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import { PRICING_TIERS } from "@/types"
import {
  getRecentActivity,
  getScopeFromProfile,
  type ActivityItem,
  type DashboardScope,
} from "./activity"
import { isPaidPlanId } from "./entitlements"
import type { DashboardFirm, DashboardProfile } from "./dashboardIdentity"

export type FeatureUsagePoint = {
  feature_type: string
  usage_count: number
}

export type RoiData = {
  hoursSaved: number
  savingsEur: number
  subscriptionCostEur: number
  subscriptionTier: string
}

export type DashboardMetrics = {
  totals: {
    clients: number
    contracts: number
    documents: number
    analyses: number
    predictions: number
    invoices: number
  }
  invoiceMetrics: {
    outstandingTotalEur: number
    overdueCount: number
    paidThisMonthTotalEur: number
  }
  signatureMetrics: {
    pendingCount: number
    signedThisMonthCount: number
  }
  usageSummary: { totalTokens: number; totalCost: number }
  featureUsage: FeatureUsagePoint[]
  recentActivity: ActivityItem[]
  roiData: RoiData
  upcomingDeadlines: Array<{
    id: string
    title: string
    due_date: string
    status: Tables<"deadlines">["status"]
  }>
  top3Deadlines: Array<{
    id: string
    title: string
    due_date: string
    status: Tables<"deadlines">["status"]
  }>
  unbilledHours: number
  activeMatters: {
    openCount: number
    recent: Array<{
      id: string
      title: string
      matter_number: string
      status: "open"
      updated_at: string | null
    }>
  }
}

async function getRoiData(
  supabase: ServerSupabaseClient,
  scope: DashboardScope,
  profile: {
    law_firm_id: string | null
    subscription_tier?: string | null
  },
  firmTier: string | null,
): Promise<RoiData> {
  const filterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const filterVal = scope.lawFirmId ?? scope.userId

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Parallelize former sequential time_entries → clients → firm reads.
  const [{ data: timeEntries }, { data: clients }] = await Promise.all([
    supabase
      .from("time_entries")
      .select("duration_minutes, hourly_rate, status")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .gte("work_date", startOfMonth.toISOString()),
    supabase
      .from("clients")
      .select("default_hourly_rate")
      .eq(filterCol, filterVal)
      .is("deleted_at", null),
  ])

  const relevant = (
    (timeEntries ?? []) as Array<{
      duration_minutes: number | null
      hourly_rate: number | null
      status: string | null
    }>
  ).filter((t) => ["approved", "billed"].includes(t.status ?? ""))

  const totalHoursTracked = relevant.reduce(
    (sum: number, t) => sum + (t.duration_minutes ?? 0) / 60,
    0,
  )

  const avgClientRate =
    clients && clients.length
      ? (clients as Array<{ default_hourly_rate: number | null }>).reduce(
          (sum: number, c: { default_hourly_rate: number | null }) =>
            sum + Number(c.default_hourly_rate ?? 0),
          0,
        ) / clients.length
      : 60

  const hoursSaved = totalHoursTracked * 0.3
  const savingsEur = hoursSaved * avgClientRate

  const tier = firmTier ?? profile.subscription_tier ?? null
  const tierPrices = Object.fromEntries(
    PRICING_TIERS.map((t) => [t.id, t.price]),
  )
  const subscriptionCostEur = isPaidPlanId(tier) ? tierPrices[tier] : 0

  return {
    hoursSaved,
    savingsEur,
    subscriptionCostEur,
    subscriptionTier: tier ?? "none",
  }
}

/**
 * All below-the-fold dashboard reads in a single parallel round.
 * Deadlines are always fetched; the client gates display on plan entitlements
 * (same visual result, removes planId from the fetch critical path).
 */
export async function loadDashboardMetrics(
  supabase: ServerSupabaseClient,
  userId: string,
  profile: DashboardProfile,
  firm: DashboardFirm | null,
): Promise<DashboardMetrics> {
  const profileLawFirmId = profile.law_firm_id ?? null
  const scopeFilter = profileLawFirmId
    ? `user_id.eq.${userId},law_firm_id.eq.${profileLawFirmId}`
    : null
  const scope = getScopeFromProfile(userId, {
    law_firm_id: profileLawFirmId,
  })
  const scopeFilterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const scopeFilterVal = scope.lawFirmId ?? scope.userId

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const nowIso = now.toISOString()

  const [
    contractsCountResult,
    documentsCountResult,
    predictionsCountResult,
    analysesCountResult,
    clientsCountResult,
    invoicesCountResult,
    { data: usageRows },
    outstandingInvoicesResult,
    overdueInvoicesCountResult,
    paidThisMonthInvoicesResult,
    pendingSignaturesCountResult,
    signedThisMonthSignaturesCountResult,
    { data: unbilledTimeRows },
    { data: deadlineRows },
    recentActivity,
    roiData,
    activeMattersCountRes,
    activeMattersRecentRes,
  ] = await Promise.all([
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
    (() => {
      const q = supabase
        .from("invoices")
        .select("total_amount, status")
        .in("status", ["sent", "overdue"])
      return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", userId)
    })(),
    (() => {
      const q = supabase
        .from("invoices")
        .select("*", { count: "exact", head: true })
        .eq("status", "overdue")
      return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", userId)
    })(),
    (() => {
      const q = supabase
        .from("invoices")
        .select("total_amount, paid_at, status")
        .eq("status", "paid")
        .gte("paid_at", monthStart.toISOString())
        .lt("paid_at", monthEnd.toISOString())
      return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", userId)
    })(),
    (() => {
      const q = supabase
        .from("signature_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")
        .gt("expires_at", nowIso)
      return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", userId)
    })(),
    (() => {
      const q = supabase
        .from("signature_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "signed")
        .gte("signed_at", monthStart.toISOString())
        .lt("signed_at", monthEnd.toISOString())
      return scopeFilter ? q.or(scopeFilter) : q.eq("user_id", userId)
    })(),
    supabase
      .from("time_entries")
      .select("duration_minutes, status")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .eq("status", "pending"),
    supabase
      .from("deadlines")
      .select("id, title, due_date, status")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("due_date", { ascending: true })
      .limit(40),
    getRecentActivity(supabase, scope, { limit: 10 }),
    getRoiData(
      supabase,
      scope,
      {
        law_firm_id: profileLawFirmId,
        subscription_tier:
          profile.subscription_tier ?? firm?.subscription_tier ?? null,
      },
      firm?.subscription_tier ?? null,
    ),
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

  const usageRowsTyped = (usageRows ?? []) as Array<{
    feature_type: string | null
    tokens_used: number | null
    cost_usd: number | null
  }>

  const usageSummary = usageRowsTyped.reduce(
    (acc, row) => ({
      totalTokens: acc.totalTokens + (row.tokens_used ?? 0),
      totalCost: acc.totalCost + Number(row.cost_usd ?? 0),
    }),
    { totalTokens: 0, totalCost: 0 },
  )

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

  const outstandingInvoices = (outstandingInvoicesResult.data ?? []) as Array<{
    total_amount: number | null
  }>
  const paidThisMonthInvoices = (paidThisMonthInvoicesResult.data ??
    []) as Array<{ total_amount: number | null }>

  const dlRows = (deadlineRows ?? []) as Array<{
    id: string
    title: string
    due_date: string
    status: string | null
  }>

  const upcomingDeadlines = dlRows
    .filter((d) => d.status !== "completed" && d.status !== "cancelled")
    .slice(0, 5)
    .map((d) => ({
      id: d.id,
      title: d.title,
      due_date: d.due_date,
      status: d.status as Tables<"deadlines">["status"],
    }))

  const top3Deadlines = dlRows
    .filter(
      (d) =>
        d.status !== "completed" &&
        d.status !== "cancelled" &&
        new Date(d.due_date).getTime() >= Date.now(),
    )
    .slice(0, 3)
    .map((d) => ({
      id: d.id,
      title: d.title,
      due_date: d.due_date,
      status: (d.status ?? "open") as Tables<"deadlines">["status"],
    }))

  const unbilledHours =
    ((unbilledTimeRows ?? []) as Array<{ duration_minutes: number | null }>).reduce(
      (sum, r) => sum + Number(r.duration_minutes ?? 0),
      0,
    ) / 60

  return {
    totals: {
      clients: clientsCountResult.count ?? 0,
      contracts: contractsCountResult.count ?? 0,
      documents: documentsCountResult.count ?? 0,
      analyses: analysesCountResult.count ?? 0,
      predictions: predictionsCountResult.count ?? 0,
      invoices: invoicesCountResult.count ?? 0,
    },
    invoiceMetrics: {
      outstandingTotalEur: outstandingInvoices.reduce(
        (sum, inv) => sum + Number(inv.total_amount ?? 0),
        0,
      ),
      overdueCount: overdueInvoicesCountResult.count ?? 0,
      paidThisMonthTotalEur: paidThisMonthInvoices.reduce(
        (sum, inv) => sum + Number(inv.total_amount ?? 0),
        0,
      ),
    },
    signatureMetrics: {
      pendingCount: pendingSignaturesCountResult.count ?? 0,
      signedThisMonthCount: signedThisMonthSignaturesCountResult.count ?? 0,
    },
    usageSummary,
    featureUsage,
    recentActivity,
    roiData,
    upcomingDeadlines,
    top3Deadlines,
    unbilledHours,
    activeMatters: {
      openCount: activeMattersCountRes.count ?? 0,
      recent: (activeMattersRecentRes.data ?? []) as Array<{
        id: string
        title: string
        matter_number: string
        status: "open"
        updated_at: string | null
      }>,
    },
  }
}
