import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { LanguageProvider } from "@/components/LanguageProvider"
import { DashboardNavbar } from "./components/DashboardNavbar"
import { getEntitlementPlanForUser } from "./lib/getEntitlementPlan"
import type { EntitlementPlanId } from "./lib/entitlements"

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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <DashboardNavbar planId={planId} />
        <main>{children}</main>
      </div>
    </LanguageProvider>
  )
}
