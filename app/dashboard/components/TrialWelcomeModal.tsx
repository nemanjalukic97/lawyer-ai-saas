"use client"

import { useState } from "react"

import { LegantisLogo } from "@/components/LegantisLogo"
import { useLanguage } from "@/components/LanguageProvider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type TrialWelcomeModalProps = {
  trialEndsAt: string
}

/** Numeric DD.MM.YYYY — avoids Intl nominative month names / trailing periods. */
function formatTrialEndDate(iso: string): string {
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return iso
  const day = String(dt.getDate()).padStart(2, "0")
  const month = String(dt.getMonth() + 1).padStart(2, "0")
  const year = String(dt.getFullYear())
  return `${day}.${month}.${year}`
}

function dismissWelcome() {
  void fetch("/api/dashboard/dismiss-welcome", { method: "POST" }).catch(() => {
    // Fire-and-forget: UI already closed; retry on next visit if write failed.
  })
}

export function TrialWelcomeModal({ trialEndsAt }: TrialWelcomeModalProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(true)
  const formattedDate = formatTrialEndDate(trialEndsAt)

  function handleOpenChange(next: boolean) {
    if (!next) {
      setOpen(false)
      dismissWelcome()
      return
    }
    setOpen(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-1 flex items-center gap-0">
            <LegantisLogo className="h-8 w-8 shrink-0 text-foreground" />
            <span className="-ml-1.5 text-sm font-semibold tracking-tight text-foreground">
              Legantis
            </span>
          </div>
          <DialogTitle>{t("welcomeModal.title")}</DialogTitle>
          <DialogDescription>
            {t("welcomeModal.bodyWithDate", { date: formattedDate })}
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>{t("welcomeModal.bullet1")}</li>
          <li>{t("welcomeModal.bullet2")}</li>
          <li>{t("welcomeModal.bullet3")}</li>
        </ul>
        <DialogFooter>
          <Button type="button" onClick={() => handleOpenChange(false)}>
            {t("welcomeModal.cta")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
