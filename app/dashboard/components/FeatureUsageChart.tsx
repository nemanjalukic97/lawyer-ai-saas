"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useLanguage } from "@/components/LanguageProvider"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type FeatureUsagePoint = {
  feature_type: string
  usage_count: number
}

type Props = {
  data: FeatureUsagePoint[]
}

function formatFeatureTypeLabel(
  value: string,
  t: (key: string) => string
): string {
  const normalized = value.toLowerCase().replace(/[\s-]/g, "_")
  const key = `dashboard.featureUsage.labels.${normalized}`
  const resolved = t(key)
  return resolved === key ? value : resolved
}

/** Stacked ticks on tablet/mobile; narrower width uses smaller tick text so labels fit. */
type ChartXMode = "desktop" | "compact" | "narrow"

function useFeatureUsageChartXMode(): ChartXMode {
  const [mode, setMode] = useState<ChartXMode>("desktop")
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth
      if (w > 1023) setMode("desktop")
      else if (w <= 480) setMode("narrow")
      else setMode("compact")
    }
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [])
  return mode
}

type RechartsXTickProps = {
  x: number
  y: number
  payload: { value: string }
  index: number
  visibleTicksCount: number
}

function StackedXAxisTick({
  x,
  y,
  payload,
  fontSize,
  lineHeight,
}: RechartsXTickProps & { fontSize: number; lineHeight: number }) {
  const { t } = useLanguage()
  const label = formatFeatureTypeLabel(String(payload.value), t)
  const words = label.trim().split(/\s+/)
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={fontSize}
        dominantBaseline="hanging"
      >
        {words.map((w, i) => (
          <tspan
            key={`${i}-${w}`}
            x={0}
            dy={i === 0 ? 0 : lineHeight}
            className="recharts-text recharts-cartesian-axis-tick-value"
          >
            {w}
          </tspan>
        ))}
      </text>
    </g>
  )
}

export function FeatureUsageChart({ data }: Props) {
  const { t } = useLanguage()
  const xMode = useFeatureUsageChartXMode()
  const compactX = xMode !== "desktop"
  const stackedTick =
    xMode === "narrow"
      ? { fontSize: 8, lineHeight: 10 }
      : { fontSize: 9, lineHeight: 11 }
  const chartData = data.map((d) => ({
    feature_type: d.feature_type,
    usage_count: d.usage_count,
  }))

  return (
    <Card className="w-full min-w-0">
      <CardHeader>
        <CardTitle>{t("dashboard.featureUsage.title")}</CardTitle>
      </CardHeader>
      <CardContent className="w-full min-w-0 min-h-[200px] px-3 sm:px-6">
        {chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("dashboard.usage.featuresEmpty")}
          </p>
        ) : (
          <div className="h-[200px] w-full min-w-0 sm:h-[220px] md:h-[240px] lg:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={
                compactX
                  ? {
                      top: 8,
                      right: xMode === "narrow" ? 14 : 10,
                      left: 0,
                      bottom: xMode === "narrow" ? 18 : 14,
                    }
                  : {
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 20,
                    }
              }
            >
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="feature_type"
                type="category"
                interval={0}
                axisLine={false}
                tickLine={false}
                tickMargin={compactX ? 6 : 8}
                padding={!compactX ? { left: 60, right: 30 } : undefined}
                height={
                  compactX ? (xMode === "narrow" ? 74 : 70) : 36
                }
                tick={
                  compactX
                    ? (props: RechartsXTickProps) => (
                        <StackedXAxisTick
                          {...props}
                          fontSize={stackedTick.fontSize}
                          lineHeight={stackedTick.lineHeight}
                        />
                      )
                    : {
                        fill: "#94a3b8",
                        fontSize: 11,
                      }
                }
                tickFormatter={
                  compactX
                    ? undefined
                    : (v) => formatFeatureTypeLabel(String(v), t)
                }
                angle={0}
                textAnchor="middle"
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={compactX ? 40 : 50}
                dx={compactX ? -2 : -10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                  fontSize: 12,
                }}
                cursor={{ stroke: "#6366f1", strokeWidth: 1 }}
                labelFormatter={(label) =>
                  typeof label === "string"
                    ? formatFeatureTypeLabel(label, t)
                    : label
                }
              />
              <Area
                type="monotone"
                dataKey="usage_count"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorUsage)"
                dot={{ fill: "#6366f1", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#818cf8" }}
              />
            </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
