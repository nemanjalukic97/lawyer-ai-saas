import { SignupPageClient } from "@/components/auth/SignupPageClient"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SignupSearchParams = {
  error?: string
  success?: string
  plan?: string
  email?: string
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<SignupSearchParams>
}) {
  const params = await searchParams
  const errorCode = params?.error
  const hasSuccess = params?.success === "true"
  const selectedPlanKey = params?.plan ?? null
  const rawEmail = (params?.email ?? "").trim()
  const email = EMAIL_REGEX.test(rawEmail) ? rawEmail : null

  return (
    <SignupPageClient
      errorCode={errorCode}
      hasSuccess={hasSuccess}
      selectedPlanKey={selectedPlanKey}
      email={email}
    />
  )
}
