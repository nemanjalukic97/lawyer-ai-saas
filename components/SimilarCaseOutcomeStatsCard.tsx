"use client"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import type { SimilarCaseOutcomeStats } from "@/lib/similarCaseOutcomeStats"

type Props = {
  stats: SimilarCaseOutcomeStats
}

type SignalLevel = "good" | "uncertain" | "risky"

function getSignalLevel(pct: number): SignalLevel {
  if (pct > 60) return "good"
  if (pct >= 40) return "uncertain"
  return "risky"
}

const signalStyles: Record<
  SignalLevel,
  { bar: string; text: string; ring: string }
> = {
  good: {
    bar: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "stroke-emerald-500",
  },
  uncertain: {
    bar: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    ring: "stroke-amber-500",
  },
  risky: {
    bar: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    ring: "stroke-red-500",
  },
}

function CircularProgress({
  pct,
  ringClass,
}: {
  pct: number
  ringClass: string
}) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      <svg
        className="-rotate-90"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          className={ringClass}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-lg font-semibold tabular-nums text-foreground">
        {pct}%
      </span>
    </div>
  )
}

export function SimilarCaseOutcomeStatsCard({ stats }: Props) {
  const { t } = useLanguage()
  const signal = getSignalLevel(stats.plaintiffWinPct)
  const styles = signalStyles[signal]

  const signalLabel =
    signal === "good"
      ? t("predictions.similarCases.signalGood")
      : signal === "uncertain"
        ? t("predictions.similarCases.signalUncertain")
        : t("predictions.similarCases.signalRisky")

  return (
    <section className="mt-4 space-y-2">
      <h3 className="text-sm font-semibold text-foreground">
        {t("predictions.similarCases.sectionTitle")}
      </h3>
      <div className="rounded-md border border-border bg-muted/30 p-4">
        <p className="text-sm font-medium text-foreground">
          {t("predictions.similarCases.cardTitle")}
        </p>

        <div className="mt-3 flex items-center gap-4">
          <CircularProgress
            pct={stats.plaintiffWinPct}
            ringClass={styles.ring}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <p className={cn("text-sm font-medium", styles.text)}>
              {t("predictions.similarCases.plaintiffWinRate", {
                pct: stats.plaintiffWinPct,
              })}
            </p>
            <p className="text-xs text-muted-foreground">{signalLabel}</p>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={stats.plaintiffWinPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t("predictions.similarCases.plaintiffWinRate", {
                pct: stats.plaintiffWinPct,
              })}
            >
              <div
                className={cn("h-full rounded-full transition-all", styles.bar)}
                style={{ width: `${stats.plaintiffWinPct}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {t("predictions.similarCases.plaintiffWon")}: {stats.plaintiffWon}
          {" | "}
          {t("predictions.similarCases.defendantWon")}: {stats.defendantWon}
          {" | "}
          {t("predictions.similarCases.partially")}: {stats.partially}
        </p>

        <p className="mt-2 text-xs text-muted-foreground/80">
          {t("predictions.similarCases.basedOn", {
            count: stats.knownOutcomeCount,
          })}
        </p>
      </div>
    </section>
  )
}
