import { type EmailOtpType } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

import { EmailConfirmPageClient } from "@/components/auth/EmailConfirmPageClient"
import { createClient } from "@/lib/supabase/server"

type ConfirmSearchParams = {
  token_hash?: string
  type?: string
  code?: string
  verified?: string
}

export default async function EmailConfirmPage({
  searchParams,
}: {
  searchParams: Promise<ConfirmSearchParams>
}) {
  const params = await searchParams
  const tokenHash = params?.token_hash
  const type = params?.type

  if (params?.code) {
    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") search.set(key, value)
    }
    redirect(`/auth/callback?${search.toString()}`)
  }

  let verified = false

  if (params?.verified === "true") {
    verified = true
  } else if (tokenHash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    })

    verified = !error
  }

  return <EmailConfirmPageClient verified={verified} />
}
