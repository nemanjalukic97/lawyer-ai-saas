"use client"

import Link from "next/link"
import { useMemo } from "react"

import { useLanguage } from "@/components/LanguageProvider"
import { countOutdatedCaseLaw } from "@/lib/outdatedCaseLaw"
import type { CaseLawSource } from "@/types/rag"

type Props = {
  caseLawSources: CaseLawSource[]
}

export function OutdatedCaseLawWarningBanner({ caseLawSources }: Props) {
  const { t } = useLanguage()

  const { outdatedCount, totalCount } = useMemo(
    () => countOutdatedCaseLaw(caseLawSources),
    [caseLawSources],
  )

  if (totalCount < 1 || outdatedCount < 1) {
    return null
  }

  return (
    <div
      className="mt-3 flex gap-2 rounded border border-amber-200 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:border-amber-800 dark:text-amber-400"
      role="status"
    >
      <span aria-hidden="true">⚠️</span>
      <p>
        {t("rag.caseLaw.outdatedWarning", {
          outdated: outdatedCount,
          total: totalCount,
        })}{" "}
        <Link
          href="/dashboard/research"
          className="font-medium underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300"
        >
          {t("rag.caseLaw.outdatedWarningLink")}
        </Link>
      </p>
    </div>
  )
}
