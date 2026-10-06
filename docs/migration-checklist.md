# Move checklist — outside a database dump

Checked 2026-10-06 against the LawModel Supabase project (`mgzljuyvmidtwkjqylmm`, eu-west-3) and this repo. Names only. Do not paste secret values into this file.

Tick the `copied` column while moving. A full Postgres dump brings schemas, rows, RLS, and triggers. It does not bring the items below unless a row says the schedule already lives in git.

The Vercel project is not linked in this checkout (no `.vercel` directory, no Vercel CLI), so the live Vercel env list could not be read. Where a route comment says a variable is required on Vercel, that is recorded in the `declared in` column.

---

## 1. Environment variables

### App runtime

| copied | name | declared in | what breaks without it |
| --- | --- | --- | --- |
| [ ] | `NEXT_PUBLIC_SUPABASE_URL` | `.env.local`; GitHub Actions secret in `.github/workflows/quarterly-sync.yml`; required on Vercel | Browser and server cannot reach Supabase. Login and every data call fail. |
| [ ] | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local`; `.env.example` | User-scoped Supabase client has no key. Login and RLS requests fail. |
| [ ] | `SUPABASE_URL` | `.env.local` | Admin client and scripts lose their fallback when `NEXT_PUBLIC_SUPABASE_URL` is unset. |
| [ ] | `SUPABASE_ANON_KEY` | `.env.local` | `scripts/lighthouse-dashboard-auth.mjs` cannot sign in. The Next app reads `NEXT_PUBLIC_SUPABASE_ANON_KEY` instead. |
| [ ] | `SUPABASE_PUBLISHABLE_KEY` | `.env.local` | Server Supabase clients lose the publishable-key fallback and use the anon key. The code also reads `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which is not declared in any env file. |
| [ ] | `SUPABASE_SERVICE_ROLE_KEY` | `.env.local`; GitHub Actions secret; required on Vercel (cron route comments) | Admin writes fail: Paddle webhook updates, intake submit, contract signing, cron mail, and the quarterly corpus sync. |
| [ ] | `DATABASE_URL` | `.env.local` and `scripts/outreach/.env` | Legal research throws when it opens a direct Postgres pool (`lib/legalActParent.ts`, keyword document-frequency in `lib/legalRag.ts`). Ingest and outreach scripts that use this URL fail. |
| [ ] | `OPENAI_API_KEY` | `.env.local`; GitHub Actions secret; required on Vercel for AI routes | Chat, research embeddings, and institute distillation fail. Quarterly corpus sync cannot embed. |
| [ ] | `RESEND_API_KEY` | `.env.local`; GitHub Actions secret (failure mail); required on Vercel (cron route comments); also read by `send_beta_invitations.py` from the process environment | Invoice, signature, deadline, trial, and legal-article mail throw. The quarterly workflow cannot send its failure notice. |
| [ ] | `CRON_SECRET` | `.env.local`; required on Vercel | All four `/api/cron/*` routes return 401. Vercel must send `Authorization: Bearer <this value>`. |
| [ ] | `PADDLE_API_KEY` | `.env.local` | `POST /api/paddle/checkout` refuses to start a transaction. |
| [ ] | `PADDLE_WEBHOOK_SECRET` | `.env.local` | `POST /api/paddle/webhook` rejects every event. Production subscription status stops updating. |
| [ ] | `PADDLE_ENV` | Read by `lib/paddle.ts`. Not present in `.env.local`. Falls back to `NEXT_PUBLIC_PADDLE_ENV`. | Server Paddle client cannot choose sandbox vs production if the key prefix is also ambiguous. |
| [ ] | `NEXT_PUBLIC_PADDLE_ENV` | `.env.local` | Billing checkout and the server Paddle client cannot tell sandbox from production when the token or key prefix does not. |
| [ ] | `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | `.env.local` | Billing page never calls `initializePaddle`. Checkout UI does not open. |
| [ ] | `NEXT_PUBLIC_PADDLE_SOLO_PRICE_ID` | `.env.local` | Solo checkout has no price. |
| [ ] | `NEXT_PUBLIC_PADDLE_PROFESSIONAL_PRICE_ID` | `.env.local` | Professional checkout has no price. |
| [ ] | `NEXT_PUBLIC_PADDLE_FIRM_PRICE_ID` | `.env.local` | Firm checkout has no price. |
| [ ] | `NEXT_PUBLIC_SITE_URL` | `.env.example` only. Not in `.env.local`. Set this on Vercel for production. | Signup confirmation links fall back to the incoming request host (`lib/site-url.ts`). They miss the public origin when that host is not the site. Must match Supabase Auth URL configuration. |
| [ ] | `DRY_RUN` | Optional. Read by `app/api/cron/trial-lifecycle/route.ts`. Not declared in an env file. | Unset is normal. Set to `1` or `true` and the trial cron sends no mail and writes no trial changes. |

`NODE_ENV` is set by Next.js and Vercel. It only gates debug logging and a few non-production test controls.

### Outreach mailbox (`scripts/outreach/.env`)

| copied | name | declared in | what breaks without it |
| --- | --- | --- | --- |
| [ ] | `GMAIL_ADDRESS` | `scripts/outreach/.env` | `send_outreach.py`, `welcome_sequence.py`, and `ask_blockers.py` cannot log in to Gmail. The web app does not read this. |
| [ ] | `GMAIL_APP_PASSWORD` | `scripts/outreach/.env` | Those scripts cannot authenticate to `smtp.gmail.com:587`. |
| [ ] | `DATABASE_URL` | `scripts/outreach/.env` (same name as the app) | `welcome_sequence.py` cannot read the database. |

### Optional research flags (code only, not declared)

| copied | name | declared in | what breaks without it |
| --- | --- | --- | --- |
| [ ] | `LEGAL_KEYWORD_BUDGET_MS` | Read by `lib/legalRag.ts`. Not in an env file. | Unset uses the in-code budget. Set it only to change keyword-search time limits. |
| [ ] | `LEGAL_SYNONYMS_DISABLED` | Read by `lib/keywordVariants.ts`. Not in an env file. | Unset keeps synonyms on. `1` turns them off. |

### GitHub Actions secrets (names in the workflow, values in GitHub)

| copied | name | declared in | what breaks without it |
| --- | --- | --- | --- |
| [ ] | `OPENAI_API_KEY` | `.github/workflows/quarterly-sync.yml` | Scheduled legal corpus sync cannot embed. |
| [ ] | `SUPABASE_SERVICE_ROLE_KEY` | same workflow | Sync cannot write to Supabase. |
| [ ] | `NEXT_PUBLIC_SUPABASE_URL` | same workflow | Sync has no project URL. |
| [ ] | `RESEND_API_KEY` | same workflow, failure step only | A failed sync does not email `support@legantis.app`. |

---

## 2. External services

### Supabase — LawModel (`mgzljuyvmidtwkjqylmm`)

Called from `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`, `lib/supabase/proxy.ts`, and `proxy.ts`.

| copied | what to reconfigure on a move |
| --- | --- |
| [ ] | New project URL, anon (or publishable) key, and service-role key in `.env.local` and Vercel. A new project issues new keys. The old keys are not inside the dump. |
| [ ] | `DATABASE_URL` for the new database (direct connection used by research and scripts). |
| [ ] | Auth URL configuration in the dashboard: Site URL = the public origin, and an additional redirect URL `{origin}/auth/confirm`. Signup sets `emailRedirectTo` in `app/signup/actions.ts`. |
| [ ] | Auth email template and SMTP settings (section 3). They live in the dashboard. |
| [ ] | Storage files for bucket `signed-contracts` (section 5). |
| [ ] | No Edge Functions to redeploy (section 6). |

An older project named `nemanjalukic97's Project` is inactive. `.env.local` points at LawModel.

### Resend — direct API

SDK: `lib/email/resend.ts` (`RESEND_API_KEY`). HTTP: `https://api.resend.com/emails`.

| copied | call site | from address |
| --- | --- | --- |
| [ ] | `app/api/invoices/[invoiceId]/send/route.ts` | `Legantis <noreply@legantis.app>` |
| [ ] | `lib/invoices/sendInvoiceReminders.ts` | same |
| [ ] | `lib/deadlines/sendDeadlineReminders.ts` | same |
| [ ] | `lib/email/signatureEmails.ts` | same |
| [ ] | `lib/trials/runTrialLifecycle.ts` | same |
| [ ] | `lib/legal-articles/sendLegalArticlesNotifications.ts` | same |
| [ ] | `.github/workflows/quarterly-sync.yml` failure step | `Legantis <noreply@legantis.app>` to `support@legantis.app` |
| [ ] | `send_beta_invitations.py` | `support@legantis.app` |

On a move: create or copy the API key into env and GitHub. In Resend, keep the sending domain `legantis.app` verified (SPF, DKIM, DMARC at the DNS host). `supabase/dns-records.example.txt` is placeholders, not the live records. The app has no Resend inbound webhook.

### Paddle

Server SDK: `lib/paddle.ts`. Browser: `initializePaddle` in `app/dashboard/billing/BillingPageClient.tsx`.

| copied | what to reconfigure |
| --- | --- |
| [ ] | API key (`PADDLE_API_KEY`) and client-side token (`NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`) for the same sandbox or live account. |
| [ ] | Environment (`NEXT_PUBLIC_PADDLE_ENV`, optional `PADDLE_ENV`) must match the key: test keys with sandbox, live keys with production. |
| [ ] | Price ids for solo, professional, and firm. |
| [ ] | Notification destination URL: `https://<public-host>/api/paddle/webhook` (`app/api/paddle/webhook/route.ts`). Destination secret must match `PADDLE_WEBHOOK_SECRET`. |
| [ ] | Checkout default payment link / approved website in the Paddle dashboard (sandbox: checkout settings). The checkout route tells you to set this when it is missing. |
| [ ] | `POST /api/paddle/confirm` is the in-app success path. It uses the same API key and does not have its own webhook. |

### OpenAI

`lib/openai.ts` (`gpt-4o`), `lib/legalRag.ts` (`text-embedding-3-small`), `lib/distillCaseInstitutes.ts` (`gpt-4o-mini`). No webhook. On a move, set `OPENAI_API_KEY` on Vercel and in GitHub Actions and confirm the account still allows those models.

### Gmail SMTP (outreach scripts only)

`scripts/outreach/send_outreach.py`, `welcome_sequence.py`, `ask_blockers.py` connect to `smtp.gmail.com` port 587 with `GMAIL_ADDRESS` and `GMAIL_APP_PASSWORD`. On a move, recreate the Google app password and put both names back in `scripts/outreach/.env`. The Next app does not send through Gmail.

### Vercel

Production host is hardcoded as `https://legantis.app` and `https://www.legantis.app` (`app/layout.tsx` and several mail builders). On a move, attach that domain to the new project and set the env vars in section 1. Cron schedules are in `vercel.json` (section 4).

### GitHub Actions

`.github/workflows/quarterly-sync.yml` runs `node scripts/sync-legal-corpus.mjs` on `0 8 1 */3 *` (08:00 UTC on the 1st day of every third month) and on manual dispatch. Copy the four secrets in section 1. The schedule is in git, so it moves with the repository.

`googleapis` is in `package.json` and is not imported anywhere.

---

## 3. Resend and Supabase Auth mail

Product mail is a direct Resend API call from the app (section 2). Signup confirmation is not. `app/signup/actions.ts` calls `supabase.auth.signUp` with `emailRedirectTo` set to `{site}/auth/confirm`, so that message is sent by Supabase Auth.

| copied | item | where it lives |
| --- | --- | --- |
| [ ] | Custom SMTP host, port, user, password, sender name, from-address | Supabase dashboard → Authentication → SMTP. Not in the database, so not in a dump. |
| [ ] | Confirm-signup HTML and subject | Source file is in git: `supabase/templates/confirmation.html` (subject in `supabase/config.toml`: `Confirm your Legantis account`). The hosted copy is dashboard → Authentication → Email Templates → Confirm signup, and that dashboard copy is not in a dump. |
| [ ] | Any other Auth templates edited only in the dashboard (invite, magic link, recovery, email change) | Dashboard only. The repo does not customize them. |
| [ ] | Site URL and redirect allow list | Dashboard → Authentication → URL Configuration. Not in a dump. Include `{origin}/auth/confirm`. |

Local `supabase/config.toml` has `[auth.email.smtp]` commented out. The commented example host is `smtp.sendgrid.net`, not Resend. `supabase/auth-email-production.txt` says to turn on custom SMTP in the dashboard, and its host, user, and password are placeholders. This checkout has no Supabase access token, and SMTP settings are not a database table, so the live SMTP host was not read. Treat dashboard SMTP as its own copy step. If that dashboard is pointed at Resend, re-enter the Resend SMTP host, user, and password there in addition to `RESEND_API_KEY`.

There is no Send Email Auth hook in the repo. The production note says that hook is unnecessary. No Edge Function implements it.

---

## 4. pg_cron

`pg_cron` is not installed. Installed extensions are `pg_stat_statements`, `pg_trgm`, `pgcrypto`, `plpgsql`, `supabase_vault`, `uuid-ossp`, and `vector`. There is no `cron` schema and no rows in `cron.job`. A dump of this database contains no pg_cron jobs.

The schedules that do run are Vercel Cron, defined in `vercel.json` (in git, not in the database). Each route checks `Authorization: Bearer <CRON_SECRET>`.

| copied | name | schedule | calls |
| --- | --- | --- | --- |
| [ ] | deadline reminders | `0 7 * * *` | `GET /api/cron/deadline-reminders` → `lib/deadlines/sendDeadlineReminders.ts` (Resend) |
| [ ] | invoice reminders | `0 8 * * *` | `GET /api/cron/invoice-reminders` → `lib/invoices/sendInvoiceReminders.ts` (Resend) |
| [ ] | legal-articles notification | `0 8 1 */3 *` | `GET /api/cron/legal-articles-notification` → `lib/legal-articles/sendLegalArticlesNotifications.ts` (Resend) |
| [ ] | trial lifecycle | `0 9 * * *` | `GET /api/cron/trial-lifecycle` → `lib/trials/runTrialLifecycle.ts` (Resend) |

On a new Vercel project, deploy `vercel.json` and set `CRON_SECRET`. The GitHub quarterly sync in section 2 is a separate scheduler.

---

## 5. Supabase Storage

| copied | bucket | public | objects | total bytes | files in the dump? |
| --- | --- | --- | --- | --- | --- |
| [ ] | `signed-contracts` | no | 3 | 34523 | No |

Used by `lib/storage/signedContracts.ts` (upload PDF, create a signed download URL). Every object has a `metadata.size`. One bucket exists.

A dump that includes the `storage` schema can include bucket rows and object metadata (path, size). The PDF bytes are in Supabase Storage, not in that dump. Copy the three objects separately, or signed-contract downloads 404 after a restore.

---

## 6. Database webhooks, pg_net, Edge Functions

| copied | item | result |
| --- | --- | --- |
| [ ] | Database webhooks | None. No `supabase_functions` schema and no hooks table. |
| [ ] | `pg_net` | Not installed. No `net` schema. No `public` function calls `net.http`, `pg_net`, or `http_post`. |
| [ ] | Edge Functions | None on the project. The repo has no `supabase/functions` directory. |
| [ ] | Vault secrets | `vault.secrets` has zero rows. Nothing to copy. |
| [ ] | Paddle webhook | This is an app route, `POST /api/paddle/webhook`, not a database webhook. Re-point it in the Paddle dashboard (section 2). |

`auth.users` trigger `on_auth_user_created` is a normal Postgres trigger. It is inside a dump of the `auth` schema. It is not an HTTP webhook.
