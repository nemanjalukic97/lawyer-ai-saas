import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getDashboardIdentity } from "../lib/dashboardIdentity"
import { ResearchPageClient } from "./ResearchPageClient"

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Cached with layout: profile → firm → derived planId (2 DB rounds max).
  const identity = await getDashboardIdentity(user.id)
  if (!identity) redirect("/login")

  const { profile, firm, planId } = identity

  return (
    <ResearchPageClient
      planId={planId}
      preferredJurisdiction={
        profile.preferred_jurisdiction ?? firm?.default_jurisdiction ?? null
      }
    />
  )
}
