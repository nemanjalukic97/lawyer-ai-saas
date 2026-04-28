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

function dotClassForType(type: ActivityItemType): string {
  switch (type) {
    case "contract":
      return "bg-blue-500"
    case "document":
      return "bg-purple-500"
    case "client":
      return "bg-emerald-500"
    case "matter":
      return "bg-indigo-500"
    case "prediction":
    case "analysis":
      return "bg-amber-500"
    default:
      return "bg-muted-foreground/40"
  }
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
      <div className="flex flex-wrap gap-2 mb-4">
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
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange(value)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border border-border/40",
              currentFilter === value
                ? "bg-foreground text-background"
                : "bg-transparent text-muted-foreground/60 hover:bg-muted/40"
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
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted/20 transition-colors -mx-3"
                >
                  <span
                    className={cn(
                      "mt-0.5 size-2 shrink-0 rounded-full",
                      dotClassForType(item.type)
                    )}
                    aria-hidden
                  />
                  <div className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                    {typeLabel}: {item.title}
                  </p>
                  <span className="text-xs text-muted-foreground/40 ml-auto shrink-0">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            )
          })
        )}
      </ul>

      {/* Load more */}
      {hasMore && (
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
        >
          {t("activity.actions.loadMore")}
        </Button>
      )}
    </div>
  )
}
