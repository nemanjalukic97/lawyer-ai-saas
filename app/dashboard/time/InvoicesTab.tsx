"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { useLanguage } from "@/components/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { logActivity } from "@/lib/activity/logActivity"
import { Loader2, Trash2 } from "lucide-react"

import { sendTestInvoiceReminders } from "./actions"

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled"

type InvoiceRow = {
  id: string
  invoice_number: string
  status: InvoiceStatus
  total_amount: number
  currency: string | null
  due_date: string | null
  sent_at: string | null
  paid_at: string | null
  client: { name: string; email: string | null } | null
}

function badgeClass(status: InvoiceStatus) {
  switch (status) {
    case "draft":
      return "border-border bg-muted text-foreground"
    case "sent":
      return "border-blue-500/50 bg-blue-500/10 text-blue-700"
    case "paid":
      return "border-emerald-500/50 bg-emerald-500/10 text-emerald-700"
    case "overdue":
      return "border-red-500/50 bg-red-500/10 text-red-700"
    case "cancelled":
      return "border-border bg-muted text-muted-foreground"
    default:
      return "border-border bg-muted text-foreground"
  }
}

export function InvoicesTab() {
  const { t } = useLanguage()
  const supabase = useMemo(() => createClient(), [])
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<InvoiceRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [actionId, setActionId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [testSending, setTestSending] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError(t("time.invoices.errors.mustBeLoggedIn"))
        return
      }

      const { data, error } = await supabase
        .from("invoices")
        .select(
          "id, invoice_number, status, total_amount, currency, due_date, sent_at, paid_at, client:clients(name,email)"
        )
        .eq("user_id", user.id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })

      if (error) throw error

      const normalized: InvoiceRow[] =
        (data ?? []).map((r: any) => ({
          id: r.id,
          invoice_number: r.invoice_number,
          status: (r.status ?? "draft") as InvoiceStatus,
          total_amount: Number(r.total_amount ?? 0),
          currency: r.currency ?? "EUR",
          due_date: r.due_date ?? null,
          sent_at: r.sent_at ?? null,
          paid_at: r.paid_at ?? null,
          client: r.client
            ? { name: r.client.name as string, email: (r.client.email ?? null) as string | null }
            : null,
        })) ?? []

      setRows(normalized)
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t("time.invoices.errors.loadFailed")
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function runTestReminders() {
    if (process.env.NODE_ENV === "production") return
    setTestSending(true)
    try {
      const result = await sendTestInvoiceReminders()
      const errCount = result.errors?.length ?? 0
      toast.success(
        `Sent: ${result.sent}, Overdue: ${result.markedOverdue}, Skipped: ${result.skippedNotEntitled}${
          errCount ? `, Errors: ${errCount}` : ""
        }`
      )
    } catch (e) {
      toast.error("Failed to run test invoice reminders")
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    } finally {
      setTestSending(false)
    }
  }

  async function postAction(invoiceId: string, path: string) {
    setActionId(invoiceId)
    setError(null)
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/${path}`, {
        method: "POST",
      })
      const json: unknown = await res.json().catch(() => null)
      if (!res.ok) {
        const msg =
          json && typeof json === "object" && typeof (json as Record<string, unknown>).error === "string"
            ? ((json as Record<string, unknown>).error as string)
            : t("time.invoices.errors.actionFailed")
        throw new Error(msg)
      }
      await load()
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t("time.invoices.errors.actionFailed")
      )
    } finally {
      setActionId(null)
    }
  }

  async function softDeleteInvoice(inv: InvoiceRow) {
    const ok = window.confirm("Delete this invoice?")
    if (!ok) return
    setDeletingId(inv.id)
    setError(null)
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ deleted_at: new Date().toISOString() } as never)
        .eq("id", inv.id)
      if (error) throw error

      void logActivity(
        supabase,
        "invoice.deleted",
        "invoice",
        inv.id,
        inv.invoice_number ?? "Invoice"
      )

      await load()
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t("time.invoices.errors.actionFailed")
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card className="space-y-4 p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t("time.invoices.title")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("time.invoices.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {process.env.NODE_ENV !== "production" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => void runTestReminders()}
              disabled={loading || testSending}
            >
              {testSending ? "Testing…" : "Test invoice reminders"}
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
            {loading ? t("time.invoices.loading") : t("time.invoices.refresh")}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="rounded-md border">
        {loading ? (
          <div className="p-4 text-sm text-muted-foreground">
            {t("time.invoices.loadingList")}
          </div>
        ) : rows.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">{t("time.invoices.empty")}</div>
        ) : (
          <div className="divide-y">
            {rows.map((inv) => (
              <div key={inv.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{inv.invoice_number}</p>
                    <Badge variant="outline" className={badgeClass(inv.status)}>
                      {t(`time.invoices.status.${inv.status}`)}
                    </Badge>
                    {inv.due_date && (
                      <span className="text-xs text-muted-foreground">
                        {t("time.invoices.duePrefix")} {inv.due_date}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {inv.client?.name ?? t("time.invoices.clientFallback")} ·{" "}
                    {inv.total_amount.toFixed(2)} {inv.currency ?? "EUR"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/api/invoices/${inv.id}/pdf`, "_blank", "noopener,noreferrer")}
                  >
                    {t("time.invoices.actions.downloadPdf")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={actionId === inv.id || inv.status === "paid" || inv.status === "cancelled"}
                    onClick={() => void postAction(inv.id, "send")}
                  >
                    {actionId === inv.id
                      ? t("time.invoices.actions.sending")
                      : t("time.invoices.actions.send")}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={actionId === inv.id || inv.status === "paid"}
                    onClick={() => void postAction(inv.id, "mark-paid")}
                  >
                    {t("time.invoices.actions.markPaid")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={actionId === inv.id || inv.status === "paid" || inv.status === "cancelled"}
                    onClick={() => void postAction(inv.id, "mark-overdue")}
                  >
                    {t("time.invoices.actions.markOverdue")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    disabled={deletingId === inv.id}
                    onClick={() => void softDeleteInvoice(inv)}
                    aria-label="Delete invoice"
                  >
                    {deletingId === inv.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

