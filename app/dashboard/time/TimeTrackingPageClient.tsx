"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/LanguageProvider"

import { InvoicesTab } from "./InvoicesTab"
import { TimeEntriesTab } from "./TimeEntriesTab"

export default function TimeTrackingPageClient({
  prefillMatterId,
}: {
  prefillMatterId: string | null
}) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<"time" | "invoices">("time")
  const [invoicesListKey, setInvoicesListKey] = useState(0)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background px-4 py-10">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-8">
        <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("time.header.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("time.header.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("time.header.subtitle")}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">{t("time.header.back")}</Link>
            </Button>
          </div>
        </header>

        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15">
          <Clock className="h-5 w-5 text-green-400" />
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "time" | "invoices")} className="space-y-6">
          <TabsList>
            <TabsTrigger value="time">{t("time.tabs.entries")}</TabsTrigger>
            <TabsTrigger value="invoices">{t("time.tabs.invoices")}</TabsTrigger>
          </TabsList>

          <TabsContent value="time">
            <TimeEntriesTab
              prefillMatterId={prefillMatterId}
              onInvoiceCreated={() => {
                toast.success(t("time.invoiceGenerate.successToast"))
                setInvoicesListKey((k) => k + 1)
                setTab("invoices")
              }}
            />
          </TabsContent>
          <TabsContent value="invoices">
            <InvoicesTab key={invoicesListKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

