"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/LanguageProvider"
import type { ActivityItem, ActivityItemType } from "../lib/activity"
import { ActivityListClient } from "./ActivityListClient"
import { AuditLogListClient } from "./AuditLogListClient"

export function ActivityPageClient({
  items,
  currentFilter,
  auditLogs,
}: {
  items: ActivityItem[]
  currentFilter: "all" | ActivityItemType
  auditLogs: Array<{
    id: string
    action: string
    entity_type: string
    entity_id: string | null
    description: string | null
    metadata: unknown | null
    created_at: string | null
  }>
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
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="feed" className="flex-1">
                  {t("activity.tabs.feed") ?? "Feed"}
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex-1">
                  {t("activity.tabs.audit") ?? "Audit log"}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="feed">
                <ActivityListClient items={items} currentFilter={currentFilter} />
              </TabsContent>
              <TabsContent value="audit">
                <AuditLogListClient logs={auditLogs} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

