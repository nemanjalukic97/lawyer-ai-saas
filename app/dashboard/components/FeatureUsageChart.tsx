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

/** Tablet and below: stack label words (one per line) for readability. */
function useCompactXLabels() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const apply = () => setCompact(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  return compact
}

type RechartsXTickProps = {
  x: number
  y: number
  payload: { value: string }
  index: number
  visibleTicksCount: number
}

function StackedXAxisTick({ x, y, payload }: RechartsXTickProps) {
  const { t } = useLanguage()
  const label = formatFeatureTypeLabel(String(payload.value), t)
  const words = label.trim().split(/\s+/)
  const lineHeight = 12
  const fontSize = 10
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
  const compactX = useCompactXLabels()
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
                      right: 6,
                      left: 0,
                      bottom: 4,
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
                tickMargin={8}
                padding={!compactX ? { left: 60, right: 30 } : undefined}
                height={compactX ? 80 : 36}
                tick={
                  compactX
                    ? (props: RechartsXTickProps) => (
                        <StackedXAxisTick {...props} />
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
