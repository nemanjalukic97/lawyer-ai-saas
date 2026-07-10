import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { DashboardNavbar } from "./components/DashboardNavbar"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { SidebarProvider } from "./components/SidebarProvider"
import { getDashboardIdentity } from "./lib/dashboardIdentity"

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

  // Deduped with page via React cache(): profile + optional firm, plan derived.
  const identity = await getDashboardIdentity(user.id)
  if (!identity) redirect("/login")

  const displayName =
    identity.profile.full_name ??
    identity.userMetadataFullName ??
    identity.userEmail ??
    "?"

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar
          planId={identity.planId}
          displayName={displayName}
          firmName={identity.firm?.name ?? null}
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
