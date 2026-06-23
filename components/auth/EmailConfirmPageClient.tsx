"use client"

import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"

type Props = {
  verified: boolean
}

export function EmailConfirmPageClient({ verified }: Props) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:py-16">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base transition-transform duration-200 group-hover:scale-110">
              ←
            </span>
            <span>{t("auth.returnToHomepage")}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        {verified ? (
          <Card className="w-full space-y-4 p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600 text-sm font-semibold">
                ✔
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                  {t("auth.emailConfirmedTitle")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("auth.emailConfirmedBody")}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard">{t("auth.goToDashboard")}</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="w-full space-y-4 p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <p className="text-sm text-destructive">
                {t("auth.emailConfirmError")}
              </p>
              <Link
                href="/login"
                className="font-medium text-primary hover:underline text-sm"
              >
                {t("auth.loginButton")}
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
