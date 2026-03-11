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

function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function ClientsPage() {
  const supabase = useMemo(() => createClient(), [])

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
          setListError("You must be logged in to view clients.")
          return
        }

        const { data, error } = await supabase
          .from("clients")
          .select(
            "id, user_id, name, email, phone, company_name, notes, created_at"
          )
          .eq("user_id", user.id)
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
        setListError("Failed to load clients. Please try again.")
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
      setFormError("Full name and email are required.")
      return
    }

    setCreating(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setFormError("You must be logged in to add clients.")
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
      setSuccessMessage("Client added successfully.")
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to add client:", error)
      }
      setFormError("Failed to add client. Please try again.")
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
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Legantis · Clients
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              Clients
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Manage your client list, store key contact details, and prepare
              for secure client-portal access.
            </p>
            {successMessage && (
              <p className="mt-2 text-sm text-emerald-600">{successMessage}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setIsAdding((prev) => !prev)
                setFormError(null)
              }}
            >
              {isAdding ? "Cancel" : "Add client"}
            </Button>
          </div>
        </header>

        {isAdding && (
          <Card className="p-6">
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="e.g. Ana Kovač"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ana.kovac@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+387 61 000 000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="e.g. ACME d.o.o."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Key information about this client, typical matters, preferences..."
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
                  {creating ? "Saving client..." : "Save client"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetForm()
                    setIsAdding(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Client list</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All clients you have added to your workspace.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1 text-muted-foreground">
                <span>Sort by</span>
                <select
                  className="rounded-md border bg-background px-2 py-1 text-xs"
                  value={sortField}
                  onChange={(event) =>
                    setSortField(
                      event.target.value as "name" | "created_at"
                    )
                  }
                >
                  <option value="name">Name</option>
                  <option value="created_at">Date added</option>
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
                    ? "Sort descending"
                    : "Sort ascending"
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
                <span>Loading clients...</span>
              </div>
            ) : sortedClients.length === 0 ? (
              <div className="space-y-2 p-4 text-sm text-muted-foreground">
                <p>No clients yet.</p>
                <p>Add your first client using the “Add client” button above.</p>
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
                        Added {formatDisplayDate(client.created_at)}
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
                        aria-label="Delete client"
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
    </div>
  )
}

