"use client"

import Link from "next/link"

import { signup } from "@/app/signup/actions"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import JurisdictionSelect from "@/components/JurisdictionSelect"
import AuthSubmitButton from "@/components/auth/AuthSubmitButton"
import { useLanguage } from "@/components/LanguageProvider"

const PLAN_KEYS = new Set(["solo", "professional", "firm"])

type Props = {
  errorCode?: string
  hasSuccess: boolean
  selectedPlanKey?: string | null
}

export function SignupPageClient({
  errorCode,
  hasSuccess,
  selectedPlanKey,
}: Props) {
  const { t } = useLanguage()
  const planTierKey =
    selectedPlanKey && PLAN_KEYS.has(selectedPlanKey)
      ? (selectedPlanKey as "solo" | "professional" | "firm")
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
          <span>{t("auth.returnToHomepage")}</span>
        </Link>

        {hasSuccess ? (
          <Card className="w-full space-y-4 p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600 text-sm font-semibold">
                ✔
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                  {t("auth.signupSuccessTitle")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("auth.signupSuccessBody1")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("auth.signupSuccessBody2")}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="w-full space-y-6 p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("auth.signupTitle")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("auth.signupDescription")}
              </p>
              {planTierKey ? (
                <p className="text-xs text-muted-foreground">
                  {t("auth.planSelected", {
                    plan: t(`dashboard.planTier.${planTierKey}`),
                  })}
                </p>
              ) : null}
            </div>

            <form className="space-y-4" action={signup}>
              <div className="space-y-2">
                <Label htmlFor="full_name">{t("auth.fullNameLabel")}</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="law_firm_name">{t("auth.lawFirmLabel")}</Label>
                <Input
                  id="law_firm_name"
                  name="law_firm_name"
                  type="text"
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t("auth.jurisdictionLabel")}</Label>
                <JurisdictionSelect />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.emailLabel")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                  title={t("auth.emailInvalidTitle")}
                />
                {errorCode === "email_taken" ? (
                  <p className="mt-1 text-sm text-red-500">
                    {t("auth.emailTakenBeforeLink")}{" "}
                    <Link href="/login" className="underline text-red-500">
                      {t("auth.emailTakenLink")}
                    </Link>{" "}
                    {t("auth.emailTakenAfterLink")}
                  </p>
                ) : null}
                {errorCode === "invalid_email" ? (
                  <p className="mt-1 text-sm text-red-500">
                    {t("auth.invalidEmailError")}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
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
                    {t("auth.weakPasswordError")}
                  </p>
                ) : null}
              </div>

              {errorCode &&
              errorCode !== "email_taken" &&
              errorCode !== "weak_password" &&
              errorCode !== "invalid_email" ? (
                <p className="text-sm text-destructive">
                  {decodeURIComponent(errorCode) ===
                  "email rate limit exceeded"
                    ? t("auth.duplicateEmailSuggestion")
                    : decodeURIComponent(errorCode)}
                </p>
              ) : null}

              <AuthSubmitButton
                className="w-full"
                loadingKey="auth.creatingAccount"
              >
                {t("auth.signupButton")}
              </AuthSubmitButton>
            </form>

            <p className="text-sm text-center text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                {t("auth.loginButton")}
              </Link>
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
