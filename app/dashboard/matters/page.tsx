import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { MattersPageClient } from "./MattersPageClient"

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return <MattersPageClient />
}

