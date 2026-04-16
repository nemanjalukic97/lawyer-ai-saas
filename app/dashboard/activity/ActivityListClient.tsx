"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  ACTIVITY_HREF_BY_TYPE,
  type ActivityItem,
  type ActivityItemType,
} from "../lib/activity"
import { BarChart3, FileText, Scale, User, FileSignature, Briefcase } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/LanguageProvider"

const INITIAL_VISIBLE = 20
const LOAD_MORE_STEP = 20

const TYPE_ICONS: Record<ActivityItemType, React.ComponentType<{ className?: string }>> = {
  contract: FileSignature,
  document: FileText,
  analysis: BarChart3,
  prediction: Scale,
  client: User,
  matter: Briefcase,
}

type ActivityListClientProps = {
  items: ActivityItem[]
  currentFilter: "all" | ActivityItemType
}

export function ActivityListClient({ items, currentFilter }: ActivityListClientProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const visible = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  const handleFilterChange = (value: "all" | ActivityItemType) => {
    if (value === "all") {
      router.push("/dashboard/activity")
    } else {
      router.push(`/dashboard/activity?type=${value}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {(
          [
            { value: "all", labelKey: "activity.filters.all" },
            { value: "matter", labelKey: "activity.filters.matters" },
            { value: "document", labelKey: "activity.filters.documents" },
            { value: "contract", labelKey: "activity.filters.contracts" },
            { value: "prediction", labelKey: "activity.filters.predictions" },
            { value: "analysis", labelKey: "activity.filters.analyses" },
            { value: "client", labelKey: "activity.filters.clients" },
          ] as const
        ).map(({ value, labelKey }) => (
          <Button
            key={value}
            variant={currentFilter === value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => handleFilterChange(value)}
            className={cn(
              currentFilter === value && "bg-accent text-accent-foreground"
            )}
          >
            {t(labelKey)}
          </Button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-3">
        {visible.length === 0 ? (
          <li className="py-8 text-center text-sm text-muted-foreground">
            {t("activity.list.empty")}
          </li>
        ) : (
          visible.map((item) => {
            const Icon = TYPE_ICONS[item.type]
            const href = `${ACTIVITY_HREF_BY_TYPE[item.type]}?id=${item.id}`
            const typeLabel = t(`activity.types.${item.type}`)
            return (
              <li key={`${item.type}-${item.id}`}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {typeLabel}: {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })
        )}
      </ul>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
          >
            {t("activity.actions.loadMore")}
          </Button>
        </div>
      )}
    </div>
  )
}
