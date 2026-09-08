"use client"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function PredictionDisclaimerFooter({ className }: Props) {
  const { t } = useLanguage()

  return (
    <aside
      className={cn(
        "mt-4 rounded-md border border-border bg-muted/40 p-4",
        className,
      )}
      role="note"
    >
      <h3 className="text-sm font-semibold tracking-wide text-foreground">
        {t("predictions.disclaimer.title")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t("predictions.disclaimer.body")}
      </p>
    </aside>
  )
}
