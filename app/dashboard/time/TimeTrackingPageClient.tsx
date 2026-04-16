"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

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
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("time.header.kicker")}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              {t("time.header.title")}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {t("time.header.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">{t("time.header.back")}</Link>
          </Button>
        </header>

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

