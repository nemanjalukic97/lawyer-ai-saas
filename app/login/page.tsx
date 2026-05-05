import { LoginPageClient } from "@/components/auth/LoginPageClient"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  const errorMessage = params?.error
  const infoMessage = params?.message

  return (
    <LoginPageClient errorMessage={errorMessage} infoMessage={infoMessage} />
  )
}
