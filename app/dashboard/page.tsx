import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

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

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Legantis dashboard
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              Welcome back,{" "}
              <span className="text-primary">{displayName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {roleLabel} · {jurisdictionLabel} ·{" "}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                {subscriptionTier} plan
              </span>{" "}
              <span className="text-muted-foreground">
                ({subscriptionStatus.toLowerCase()})
              </span>
            </p>
          </div>

          <form action="/auth/signout" method="post" className="self-start">
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Clients
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalClients}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Active clients in your workspace
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Contracts
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalContracts}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Drafted & signed contracts
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Documents & analyses
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {totalDocuments + totalAnalyses}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Generated documents and risk analyses
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Case predictions
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalPredictions}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Outcome predictions run so far
            </p>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {firm?.name || "Your Legantis workspace"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Overview of activity across contracts, documents, and cases.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">Billing & plans</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {subscriptionTier} ·{" "}
                  <span className="capitalize">
                    {subscriptionStatus.toLowerCase()}
                  </span>
                </p>
                {(firm?.trial_ends_at || profile?.trial_ends_at) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Trial ends{" "}
                    {new Date(
                      firm?.trial_ends_at ?? profile?.trial_ends_at!
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">Jurisdiction focus</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {jurisdictionLabel}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Used to tailor templates, clauses, and predictions.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  Billing documents
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {totalInvoices} invoice{totalInvoices === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Generated from tracked time and clients.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">AI usage snapshot</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recent Legantis activity across contract generation, analysis,
              and predictions.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">
                  Tokens used (recent)
                </span>
                <span className="font-semibold">
                  {usageSummary.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Estimated cost</span>
                <span className="font-semibold">
                  $
                  {usageSummary.totalCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Detailed per-feature usage will appear here as you start using
                contract generation, case prediction, and document analysis.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

