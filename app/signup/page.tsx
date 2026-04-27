import Link from "next/link"

import { signup } from "./actions"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import JurisdictionSelect from "@/components/JurisdictionSelect"
import AuthSubmitButton from "@/components/auth/AuthSubmitButton"
import { authCopy } from "@/lib/copy"

type SignupSearchParams = {
  error?: string
  success?: string
  plan?: string
}

const PLAN_LABELS: Record<string, string> = {
  solo: "Solo",
  professional: "Professional",
  firm: "Firm",
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<SignupSearchParams>
}) {
  const params = await searchParams
  const errorCode = params?.error
  const hasSuccess = params?.success === "true"
  const selectedPlanKey = params?.plan
  const selectedPlanLabel =
    selectedPlanKey && PLAN_LABELS[selectedPlanKey]
      ? PLAN_LABELS[selectedPlanKey]
      : null

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:py-16">
      <div className="w-full max-w-md space-y-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-base transition-transform duration-200 group-hover:scale-110">
            ←
          </span>
          <span>Return to Homepage</span>
        </Link>

        {hasSuccess ? (
          <Card className="w-full space-y-4 p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600 text-sm font-semibold">
                ✔
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                  You&apos;re almost ready to use Legantis
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your Legantis account has been created successfully. Please
                  check your inbox and confirm your email address to activate
                  your account.
                </p>
                <p className="text-sm text-muted-foreground">
                  Once confirmed, you can log in and start using Legantis.
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="w-full space-y-6 p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {authCopy.signupTitle}
              </h1>
              <p className="text-sm text-muted-foreground">
                {authCopy.signupDescription}
              </p>
              {selectedPlanLabel && (
                <p className="text-xs text-muted-foreground">
                  You selected the{" "}
                  <span className="font-medium text-foreground">
                    {selectedPlanLabel}
                  </span>{" "}
                  plan. You can change this later from your dashboard.
                </p>
              )}
            </div>

            <form className="space-y-4" action={signup}>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="law_firm_name">Lawyer office name</Label>
                <Input
                  id="law_firm_name"
                  name="law_firm_name"
                  type="text"
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Country / Jurisdiction</Label>
                <JurisdictionSelect />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{authCopy.emailLabel}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                  title="Please enter a valid email address (e.g. name@example.com)."
                />
                {errorCode === "email_taken" ? (
                  <p className="mt-1 text-sm text-red-500">
                    Account with that email is already registered. Try{" "}
                    <Link href="/login" className="underline text-red-500">
                      logging in
                    </Link>{" "}
                    instead.
                  </p>
                ) : null}
                {errorCode === "invalid_email" ? (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter a valid email address.
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{authCopy.passwordLabel}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
                {errorCode === "weak_password" ? (
                  <p className="mt-1 text-sm text-red-500">
                    Password must be at least 6 characters and include one
                    uppercase letter, one number, and one special character
                    (such as ., $ or #).
                  </p>
                ) : null}
              </div>

              {errorCode &&
              errorCode !== "email_taken" &&
              errorCode !== "weak_password" &&
              errorCode !== "invalid_email" ? (
                <p className="text-sm text-destructive">
                  {decodeURIComponent(errorCode) === "email rate limit exceeded"
                    ? "Account with that email is already registered. Try logging in instead."
                    : decodeURIComponent(errorCode)}
                </p>
              ) : null}

              <AuthSubmitButton
                className="w-full"
                loadingKey="auth.creatingAccount"
              >
                {authCopy.signupButton}
              </AuthSubmitButton>
            </form>

            <p className="text-sm text-center text-muted-foreground">
              {authCopy.alreadyHaveAccount}{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                {authCopy.loginButton}
              </Link>
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

