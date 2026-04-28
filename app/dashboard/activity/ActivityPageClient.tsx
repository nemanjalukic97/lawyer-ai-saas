"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/LanguageProvider"
import type { ActivityItem, ActivityItemType } from "../lib/activity"
import { ActivityListClient } from "./ActivityListClient"
import { AuditLogListClient } from "./AuditLogListClient"
import { Activity } from "lucide-react"

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
          <CardHeader className="mb-8 pb-6 border-b border-border/40 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
                LEGANTIS · ACTIVITY
              </p>
              <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                {t("activity.header.title")}
              </CardTitle>
              <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
                {t("activity.header.subtitle")}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15">
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="inline-flex rounded-lg border border-border/40 bg-muted/20 p-1">
                <TabsTrigger
                  value="feed"
                  className="text-sm px-4 py-1.5 rounded-md text-muted-foreground/60 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground data-[state=active]:font-medium"
                >
                  {t("activity.tabs.feed") ?? "Feed"}
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="text-sm px-4 py-1.5 rounded-md text-muted-foreground/60 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground data-[state=active]:font-medium"
                >
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

