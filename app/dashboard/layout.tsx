import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { DashboardNavbar } from "./components/DashboardNavbar"
import { normalizePlanId, type PlanId } from "./lib/entitlements"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("subscription_tier, law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  let planId: PlanId = normalizePlanId(profile?.subscription_tier)
  if (profile?.law_firm_id) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("subscription_tier")
      .eq("id", profile.law_firm_id)
      .maybeSingle()
    planId = normalizePlanId(firm?.subscription_tier ?? profile.subscription_tier)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar planId={planId} />
      <main>{children}</main>
    </div>
  )
}
