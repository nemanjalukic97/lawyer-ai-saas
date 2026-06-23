import { type EmailOtpType } from "@supabase/supabase-js"

import { EmailConfirmPageClient } from "@/components/auth/EmailConfirmPageClient"
import { createClient } from "@/lib/supabase/server"

type ConfirmSearchParams = {
  token_hash?: string
  type?: string
}

export default async function EmailConfirmPage({
  searchParams,
}: {
  searchParams: Promise<ConfirmSearchParams>
}) {
  const params = await searchParams
  const tokenHash = params?.token_hash
  const type = params?.type

  let verified = false

  if (tokenHash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    })

    verified = !error
  }

  return <EmailConfirmPageClient verified={verified} />
}
