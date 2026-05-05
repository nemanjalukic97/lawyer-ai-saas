"use client"

import Link from "next/link"

import { login } from "@/app/login/actions"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthSubmitButton from "@/components/auth/AuthSubmitButton"
import { useLanguage } from "@/components/LanguageProvider"

type Props = {
  errorMessage?: string
  infoMessage?: string
}

export function LoginPageClient({ errorMessage, infoMessage }: Props) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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

        <Card className="w-full space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("auth.loginTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("auth.loginDescription")}
            </p>
          </div>

          <form className="space-y-4">
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
              {errorMessage === "user_not_found" ? (
                <p className="mt-1 text-sm text-red-500">
                  {t("auth.userNotFound")}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {errorMessage && errorMessage !== "user_not_found" ? (
              <p className="text-sm text-destructive">
                {decodeURIComponent(errorMessage)}
              </p>
            ) : null}

            {infoMessage ? (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {decodeURIComponent(infoMessage)}
              </p>
            ) : null}

            <AuthSubmitButton
              className="w-full"
              formAction={login}
              loadingKey="auth.signingIn"
            >
              {t("auth.loginButton")}
            </AuthSubmitButton>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              {t("auth.signupButton")}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
