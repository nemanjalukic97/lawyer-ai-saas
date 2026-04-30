"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { logActivity } from "@/lib/activity/logActivity"
import { Trash2 } from "lucide-react"

type ContractRow = {
  id: string
  title: string
  created_at: string | null
  signature_status: "none" | "pending" | "signed" | "expired" | "cancelled" | null
  signature_request_id: string | null
  signed_pdf_path: string | null
  status: string | null
}

function statusBadgeVariant(status: ContractRow["signature_status"]): "outline" | "secondary" | "destructive" | "default" {
  switch (status) {
    case "pending":
      return "secondary"
    case "signed":
      return "default"
    case "expired":
      return "destructive"
    default:
      return "outline"
  }
}

function statusLabel(t: (k: string) => string, status: ContractRow["signature_status"]): string {
  switch (status) {
    case "pending":
      return t("signature.status.pending")
    case "signed":
      return t("signature.status.signed")
    case "expired":
      return t("signature.status.expired")
    case "cancelled":
      return t("signature.status.cancelled")
    default:
      return t("signature.status.none")
  }
}

export default function ContractsListPanel() {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const pageSize = 3

  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<ContractRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContractId, setDialogContractId] = useState<string | null>(null)
  const [signerName, setSignerName] = useState("")
  const [signerEmail, setSignerEmail] = useState("")
  const [message, setMessage] = useState("")
  const [expiresDays, setExpiresDays] = useState("14")
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("contracts")
        .select("id, title, created_at, status, signature_status, signature_request_id, signed_pdf_path")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(50)

      if (error) throw error
      setRows((data as any) ?? [])
      setPage(1)
    } catch (e: any) {
      setError(t("signature.dashboard.failedToLoadContracts"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openSendDialog(contractId: string) {
    setDialogContractId(contractId)
    setSignerName("")
    setSignerEmail("")
    setMessage("")
    setExpiresDays("14")
    setDialogOpen(true)
  }

  async function handleCreateRequest() {
    if (!dialogContractId) return
    setSubmitting(true)
    setError(null)
    try {
      const days = Number(expiresDays)
      const expiresAt = Number.isFinite(days)
        ? new Date(Date.now() + Math.max(1, days) * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

      const res = await fetch("/api/signature-requests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId: dialogContractId,
          signerName,
          signerEmail,
          message,
          expiresAt: expiresAt.toISOString(),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError((json as any)?.error ?? t("signature.dashboard.failedToCreate"))
        return
      }
      setDialogOpen(false)
      await load()
    } catch {
      setError(t("signature.dashboard.failedToCreate"))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleCancel(requestId: string) {
    setError(null)
    const res = await fetch(`/api/signature-requests/${requestId}/cancel`, { method: "POST" })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError((json as any)?.error ?? t("signature.dashboard.failedToCancel"))
      return
    }
    await load()
  }

  async function handleResend(requestId: string) {
    setError(null)
    const res = await fetch(`/api/signature-requests/${requestId}/resend`, { method: "POST" })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError((json as any)?.error ?? t("signature.dashboard.failedToResend"))
      return
    }
  }

  async function handleCopyLink(requestId: string) {
    setError(null)
    const res = await fetch(`/api/signature-requests/${requestId}/link`, { method: "GET" })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError((json as any)?.error ?? t("signature.dashboard.failedToCopyLink"))
      return
    }
    const url = (json as any)?.signingUrl as string | undefined
    if (url) {
      await navigator.clipboard.writeText(url)
    }
  }

  async function handleDownload(requestId: string) {
    setError(null)
    const res = await fetch(`/api/signature-requests/${requestId}/download`, { method: "GET" })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError((json as any)?.error ?? t("signature.dashboard.failedToDownload"))
      return
    }
    const url = (json as any)?.downloadUrl as string | undefined
    if (url) window.open(url, "_blank", "noreferrer")
  }

  async function handleSoftDelete(contract: ContractRow) {
    const ok = window.confirm("Delete this contract?")
    if (!ok) return
    setDeletingId(contract.id)
    setError(null)
    try {
      const { error: uErr } = await supabase
        .from("contracts")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", contract.id)
      if (uErr) throw uErr

      void logActivity(
        supabase,
        "contract.deleted",
        "contract",
        contract.id,
        contract.title ?? "Contract"
      )

      await load()
    } catch {
      setError(t("signature.dashboard.failedToLoadContracts"))
    } finally {
      setDeletingId(null)
    }
  }

  const totalCount = rows.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return rows.slice(start, start + pageSize)
  }, [currentPage, rows])

  return (
    <Card className="border-border/80 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {t("signature.dashboard.contractsTitle")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("signature.dashboard.contractsSubtitle")}
          </p>
          {!loading ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {totalCount} {totalCount === 1 ? "contract" : "contracts"}
            </p>
          ) : null}
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/contracts">{t("signature.dashboard.refreshHint")}</Link>
        </Button>
      </div>

      {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

      <div className="mt-4 rounded-md border">
        <div className="grid grid-cols-[minmax(0,1fr),auto,auto] gap-3 border-b bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
          <div>{t("signature.dashboard.colContract")}</div>
          <div>{t("signature.dashboard.colSignatureStatus")}</div>
          <div className="text-right">{t("signature.dashboard.colActions")}</div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("signature.dashboard.loadingContracts")}</span>
          </div>
        ) : rows.length === 0 ? (
          <div className="px-4 py-4 text-sm text-muted-foreground">
            {t("signature.dashboard.noContracts")}
          </div>
        ) : (
          <div className="divide-y">
            {pagedRows.map((r) => {
              const s = (r.signature_status ?? "none") as ContractRow["signature_status"]
              const requestId = r.signature_request_id
              return (
                <div
                  key={r.id}
                  className="grid grid-cols-[minmax(0,1fr),auto,auto] items-center gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <Link
                      className="truncate font-medium hover:underline"
                      href={`/dashboard/contracts?id=${r.id}`}
                    >
                      {r.title}
                    </Link>
                    {r.created_at ? (
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Badge variant={statusBadgeVariant(s)}>{statusLabel(t, s)}</Badge>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">
                    {s === "none" || s === null ? (
                      <Button size="sm" onClick={() => openSendDialog(r.id)}>
                        {t("signature.actions.sendForSignature")}
                      </Button>
                    ) : s === "pending" && requestId ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleCopyLink(requestId)}>
                          {t("signature.actions.copySigningLink")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleResend(requestId)}>
                          {t("signature.actions.resendEmail")}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleCancel(requestId)}>
                          {t("signature.actions.cancelRequest")}
                        </Button>
                      </>
                    ) : s === "signed" && requestId ? (
                      <Button size="sm" variant="outline" onClick={() => handleDownload(requestId)}>
                        {t("signature.actions.downloadSignedPdf")}
                      </Button>
                    ) : s === "expired" ? (
                      <Button size="sm" onClick={() => openSendDialog(r.id)}>
                        {t("signature.actions.sendNewRequest")}
                      </Button>
                    ) : s === "cancelled" ? (
                      <Button size="sm" onClick={() => openSendDialog(r.id)}>
                        {t("signature.actions.sendNewRequest")}
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      disabled={deletingId === r.id}
                      onClick={() => void handleSoftDelete(r)}
                      aria-label="Delete contract"
                    >
                      {deletingId === r.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {!loading && rows.length > 0 ? (
        <div className="mt-3 flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {t("pagination.previous")}
          </Button>
          <div className="text-xs text-muted-foreground">
            {t("pagination.pageOf", { page: currentPage, total: totalPages })}
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            {t("pagination.next")}
          </Button>
        </div>
      ) : null}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("signature.dialog.title")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signerName">{t("signature.dialog.signerName")}</Label>
              <Input
                id="signerName"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signerEmail">{t("signature.dialog.signerEmail")}</Label>
              <Input
                id="signerEmail"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t("signature.dialog.message")}</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiresDays">{t("signature.dialog.expiresDays")}</Label>
              <Input
                id="expiresDays"
                inputMode="numeric"
                value={expiresDays}
                onChange={(e) => setExpiresDays(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCreateRequest} disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("signature.dialog.sending")}
                </span>
              ) : (
                t("signature.dialog.send")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

