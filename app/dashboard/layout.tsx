import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"
import { DashboardNavbar } from "./components/DashboardNavbar"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { SidebarProvider } from "./components/SidebarProvider"
import { getEntitlementPlanForUser } from "./lib/getEntitlementPlan"
import type { EntitlementPlanId } from "./lib/entitlements"

type ProfilePick = Pick<Tables<"user_profiles">, "full_name" | "law_firm_id">

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

  const planId: EntitlementPlanId = await getEntitlementPlanForUser(
    supabase,
    user.id
  )

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name, law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const typedProfile = profile as ProfilePick | null
  const lawFirmId = typedProfile?.law_firm_id ?? null

  let firmName: string | null = null
  if (lawFirmId) {
    const { data: firm } = await supabase
      .from("law_firms")
      .select("name")
      .eq("id", lawFirmId)
      .is("deleted_at", null)
      .maybeSingle()

    firmName = firm?.name ?? null
  }

  const displayName =
    typedProfile?.full_name ??
    (user.user_metadata as { full_name?: string })?.full_name ??
    user.email ??
    "?"

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar
          planId={planId}
          displayName={displayName}
          firmName={firmName}
        />
        <div className="min-[992px]:ml-60">
          <div className="sticky top-3 z-30 px-3 sm:px-6">
            <DashboardNavbar />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
