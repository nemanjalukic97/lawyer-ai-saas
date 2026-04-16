import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { MatterDetailPageClient } from "./MatterDetailPageClient"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { id } = await params

  return <MatterDetailPageClient matterId={id} />
}

