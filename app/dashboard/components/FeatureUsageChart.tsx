"use client"

import {
  Bar,
  BarChart,
  Legend,
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

function formatFeatureLabel(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function FeatureUsageChart({ data }: Props) {
  const { t } = useLanguage()
  const chartData = data.map((d) => ({
    feature: formatFeatureLabel(d.feature_type),
    Count: d.usage_count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.usage.featuresTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("dashboard.usage.featuresEmpty")}
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="feature" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Count" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

