"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDown, ArrowUp, Loader2, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/components/LanguageProvider"

type Client = {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  company_name: string | null
  notes: string | null
  created_at: string
}

type ClientDetail = Client & {
  address?: string | null
  default_hourly_rate?: number | null
  currency?: string | null
  status?: string | null
}

function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type Props = {
  selectedId: string | null
}

export default function ClientsPageClient({ selectedId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [clients, setClients] = useState<Client[]>([])
  const [loadingClients, setLoadingClients] = useState(true)
  const [listError, setListError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [isAdding, setIsAdding] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [notes, setNotes] = useState("")
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [sortField, setSortField] = useState<"name" | "created_at">(
    "created_at"
  )
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const [selectedClient, setSelectedClient] = useState<ClientDetail | null>(
    null
  )
  const [selectedLoading, setSelectedLoading] = useState(false)
  const [selectedError, setSelectedError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadClients() {
      setLoadingClients(true)
      setListError(null)

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          if (!isMounted) return
          setListError(t("clients.errors.mustBeLoggedInToView"))
          return
        }

        const { data, error } = await supabase
          .from("clients")
          .select(
            "id, user_id, name, email, phone, company_name, notes, created_at"
          )
          .eq("user_id", user.id)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        if (!isMounted) return

        const normalized: Client[] =
          data?.map((row) => ({
            id: row.id,
            user_id: row.user_id,
            name: row.name,
            email: row.email,
            phone: row.phone ?? null,
            company_name: row.company_name ?? null,
            notes: row.notes ?? null,
            created_at: row.created_at,
          })) ?? []

        setClients(normalized)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load clients:", error)
        }
        setListError(t("clients.errors.loadFailed"))
      } finally {
        if (isMounted) {
          setLoadingClients(false)
        }
      }
    }

    void loadClients()

    return () => {
      isMounted = false
    }
  }, [supabase])

  useEffect(() => {
    let isMounted = true

    async function loadSelectedClient() {
      if (!selectedId) {
        setSelectedClient(null)
        setSelectedError(null)
        return
      }

      setSelectedLoading(true)
      setSelectedError(null)

      try {
        const { data, error } = await supabase
          .from("clients")
          .select(
            "id, user_id, name, email, phone, company_name, notes, address, default_hourly_rate, currency, status, created_at"
          )
          .eq("id", selectedId)
          .is("deleted_at", null)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isMounted) return

        if (!data) {
          setSelectedClient(null)
          setSelectedError(t("clients.sidebar.recordNotFound"))
          return
        }

        const detail: ClientDetail = {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          company_name: data.company_name ?? null,
          notes: data.notes ?? null,
          created_at: data.created_at,
          address: data.address ?? null,
          default_hourly_rate: data.default_hourly_rate ?? null,
          currency: data.currency ?? null,
          status: data.status ?? null,
        }

        setSelectedClient(detail)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load client detail:", error)
        }
        setSelectedClient(null)
        setSelectedError(t("clients.sidebar.recordNotFound"))
      } finally {
        if (isMounted) {
          setSelectedLoading(false)
        }
      }
    }

    void loadSelectedClient()

    return () => {
      isMounted = false
    }
  }, [selectedId, supabase])

  function resetForm() {
    setFullName("")
    setEmail("")
    setPhone("")
    setCompanyName("")
    setNotes("")
    setFormError(null)
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    if (!fullName.trim() || !email.trim()) {
      setFormError(t("clients.form.errors.nameAndEmailRequired"))
      return
    }

    setCreating(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setFormError(t("clients.form.errors.mustBeLoggedInToAdd"))
        return
      }

      const payload = {
        user_id: user.id,
        law_firm_id: null,
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        company_name: companyName.trim() || null,
        notes: notes.trim() || null,
      }

      const { data, error } = await supabase
        .from("clients")
        .insert(payload)
        .select(
          "id, user_id, name, email, phone, company_name, notes, created_at"
        )
        .single()

      if (error) {
        throw error
      }

      const newClient: Client = {
        id: data.id,
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company_name: data.company_name ?? null,
        notes: data.notes ?? null,
        created_at: data.created_at,
      }

      setClients((prev) => [newClient, ...prev])
      resetForm()
      setIsAdding(false)
      setSuccessMessage(t("clients.messages.added"))
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to add client:", error)
      }
      setFormError(t("clients.form.errors.createFailed"))
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    setListError(null)

    try {
      const { error } = await supabase.from("clients").delete().eq("id", id)

      if (error) {
        throw error
      }

      setClients((prev) => prev.filter((client) => client.id !== id))
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to delete client:", error)
      }
      setListError("Failed to delete client. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const sortedClients = [...clients].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1

    if (sortField === "name") {
      const nameA = (a.name ?? "").toLocaleLowerCase()
      const nameB = (b.name ?? "").toLocaleLowerCase()
      if (nameA < nameB) return -1 * direction
      if (nameA > nameB) return 1 * direction
      return 0
    }

    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    if (dateA < dateB) return -1 * direction
    if (dateA > dateB) return 1 * direction
    return 0
  })

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("clients.header.kicker")}
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {t("clients.header.title")}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {t("clients.header.subtitle")}
              </p>
              {successMessage && (
                <p className="mt-2 text-sm text-emerald-600">
                  {successMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">{t("clients.header.back")}</Link>
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setIsAdding((prev) => !prev)
                  setFormError(null)
                }}
              >
                {isAdding ? t("clients.actions.cancel") : t("clients.actions.addClient")}
              </Button>
            </div>
          </header>

          {isAdding && (
            <Card className="p-6">
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("clients.form.fullName.label")}</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder={t("clients.form.fullName.placeholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("clients.form.email.label")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t("clients.form.email.placeholder")}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("clients.form.phone.label")}</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={t("clients.form.phone.placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t("clients.form.companyName.label")}</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder={t("clients.form.companyName.placeholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t("clients.form.notes.label")}</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    placeholder={t("clients.form.notes.placeholder")}
                  />
                </div>

                {formError && (
                  <p className="text-sm text-destructive" role="alert">
                    {formError}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={creating}>
                    {creating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {creating ? t("clients.form.actions.saving") : t("clients.form.actions.save")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      resetForm()
                      setIsAdding(false)
                    }}
                  >
                    {t("clients.actions.cancel")}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{t("clients.list.title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("clients.list.subtitle")}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1 text-muted-foreground">
                  <span>{t("clients.list.sortBy")}</span>
                  <select
                    className="rounded-md border bg-background px-2 py-1 text-xs"
                    value={sortField}
                    onChange={(event) =>
                      setSortField(
                        event.target.value as "name" | "created_at"
                      )
                    }
                  >
                    <option value="name">{t("clients.list.sort.name")}</option>
                    <option value="created_at">{t("clients.list.sort.dateAdded")}</option>
                  </select>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() =>
                    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                  aria-label={
                    sortDirection === "asc"
                      ? t("clients.list.sortDescending")
                      : t("clients.list.sortAscending")
                  }
                >
                  {sortDirection === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {listError && (
              <p className="text-sm text-destructive" role="alert">
                {listError}
              </p>
            )}

            <div className="rounded-md border">
              {loadingClients ? (
                <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t("clients.list.loading")}</span>
                </div>
              ) : sortedClients.length === 0 ? (
                <div className="space-y-2 p-4 text-sm text-muted-foreground">
                  <p>{t("clients.list.emptyTitle")}</p>
                  <p>
                    {t("clients.list.emptySubtitle")}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {sortedClients.map((client) => (
                    <div
                      key={client.id}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{client.name}</p>
                          {client.company_name && (
                            <span className="text-xs text-muted-foreground">
                              · {client.company_name}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col text-xs text-muted-foreground">
                          <span>{client.email}</span>
                          {client.phone && <span>{client.phone}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t("clients.list.added")} {formatDisplayDate(client.created_at)}
                        </p>
                        {client.notes && (
                          <p className="max-w-xl text-xs text-muted-foreground line-clamp-2">
                            {client.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => void handleDelete(client.id)}
                          disabled={deletingId === client.id}
                          aria-label={t("clients.actions.deleteAria")}
                        >
                          {deletingId === client.id ? (
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
        </div>

        <Card className="h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">{t("clients.sidebar.title")}</h2>
          {!selectedId ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("clients.sidebar.empty")}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/activity">{t("clients.sidebar.viewActivity")}</Link>
              </Button>
            </div>
          ) : selectedLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("clients.sidebar.loading")}</span>
            </div>
          ) : selectedError ? (
            <p className="text-sm text-destructive">{selectedError}</p>
          ) : selectedClient ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{selectedClient.name}</p>
                {selectedClient.company_name && (
                  <p className="text-xs text-muted-foreground">
                    {selectedClient.company_name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Added {formatDisplayDate(selectedClient.created_at)}
                </p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  {t("clients.sidebar.email")} {selectedClient.email}
                </p>
                {selectedClient.phone && (
                  <p>
                    {t("clients.sidebar.phone")} {selectedClient.phone}
                  </p>
                )}
                {selectedClient.address && (
                  <p>
                    {t("clients.sidebar.address")} {selectedClient.address}
                  </p>
                )}
              </div>
              {(selectedClient.default_hourly_rate ||
                selectedClient.currency) && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>
                    {t("clients.sidebar.defaultRate")}{" "}
                    {selectedClient.default_hourly_rate
                      ? `${selectedClient.default_hourly_rate} ${
                          selectedClient.currency ?? "EUR"
                        }/h`
                      : t("clients.common.notSet")}
                  </p>
                </div>
              )}
              {selectedClient.status && (
                <p className="text-xs text-muted-foreground">
                  {t("clients.sidebar.status")} {selectedClient.status}
                </p>
              )}
              {selectedClient.notes && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {t("clients.form.notes.label")}
                  </p>
                  <p className="whitespace-pre-wrap">{selectedClient.notes}</p>
                </div>
              )}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}

