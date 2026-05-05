import { SignupPageClient } from "@/components/auth/SignupPageClient"

type SignupSearchParams = {
  error?: string
  success?: string
  plan?: string
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

  return (
    <SignupPageClient
      errorCode={errorCode}
      hasSuccess={hasSuccess}
      selectedPlanKey={selectedPlanKey}
    />
  )
}
