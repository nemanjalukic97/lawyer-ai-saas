"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/LanguageProvider"
import type { ActivityItem, ActivityItemType } from "../lib/activity"
import { ActivityListClient } from "./ActivityListClient"

export function ActivityPageClient({
  items,
  currentFilter,
}: {
  items: ActivityItem[]
  currentFilter: "all" | ActivityItemType
}) {
  const { t } = useLanguage()

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>{t("activity.header.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("activity.header.subtitle")}
            </p>
          </CardHeader>
          <CardContent>
            <ActivityListClient items={items} currentFilter={currentFilter} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

