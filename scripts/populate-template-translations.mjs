import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import fs from "node:fs"
import path from "node:path"

const LANGS = [
  { code: "sr", name: "Serbian" },
  { code: "bs", name: "Bosnian" },
  { code: "hr", name: "Croatian" },
  { code: "sl", name: "Slovenian" },
  { code: "me", name: "Montenegrin" },
]

const FORCE = process.argv.includes("--force")

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing env var: ${name}`)
  }
}

function loadEnvLocalIfPresent() {
  const envPath = path.resolve(process.cwd(), ".env.local")
  if (!fs.existsSync(envPath)) return
  const raw = fs.readFileSync(envPath, "utf8")
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const idx = trimmed.indexOf("=")
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

async function main() {
  loadEnvLocalIfPresent()
  assertEnv("OPENAI_API_KEY")
  assertEnv("SUPABASE_SERVICE_ROLE_KEY")
  assertEnv("SUPABASE_URL")

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  )

  const { data: templates, error: templatesError } = await supabaseAdmin
    .from("templates")
    .select("id,title,description,content,content_html")
    .is("deleted_at", null)
    .is("user_id", null)
    .is("law_firm_id", null)
    .order("title", { ascending: true })

  if (templatesError) throw templatesError
  if (!templates?.length) {
    console.log("No templates found.")
    return
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("template_translations")
    .select("template_id,language_code")

  if (existingError) throw existingError
  const existingSet = new Set(
    (existing ?? []).map((r) => `${r.template_id}:${r.language_code}`)
  )

  const systemPrompt =
    "You are a legal translation engine. Translate the provided text to the requested language.\n" +
    "- Preserve all placeholders exactly (e.g. {{effective_date}}, {{tenant_name}}).\n" +
    "- Preserve numbering and headings.\n" +
    "- Keep formatting and line breaks.\n" +
    "- Output MUST be valid JSON only (no markdown, no prose).\n" +
    "- JSON shape: {\"title\": string, \"description\": string|null, \"content\": string}."

  let totalWrites = 0
  for (const lang of LANGS) {
    console.log(`\n== ${lang.code} (${lang.name}) ==`)
    const pending = templates.filter((t) => FORCE || !existingSet.has(`${t.id}:${lang.code}`))
    console.log(`Need translations: ${pending.length}/${templates.length}`)

    // Translate sequentially to avoid hammering the API.
    let idx = 0
    for (const tpl of pending) {
      idx += 1
      console.log(`[${lang.code}] ${idx}/${pending.length} Translating: ${tpl.title}`)
      const userPrompt = JSON.stringify(
        {
          language: lang.name,
          title: tpl.title,
          description: tpl.description,
          content: tpl.content,
        },
        null,
        2
      )

      const resp = await openai.responses.create(
        {
          model: "gpt-4o-mini",
          input: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content:
                `Translate the following JSON values to ${lang.name} and return JSON with the same shape.\n\n` +
                userPrompt,
            },
          ],
        },
        {
          timeout: 120_000,
        }
      )

      const text = (resp.output_text ?? "").trim()
      let parsed
      try {
        parsed = JSON.parse(text)
      } catch {
        parsed = null
      }

      const title =
        parsed && typeof parsed === "object" && typeof parsed.title === "string"
          ? parsed.title.trim() || tpl.title
          : tpl.title
      const description =
        tpl.description == null
          ? null
          : parsed &&
              typeof parsed === "object" &&
              (typeof parsed.description === "string" || parsed.description === null)
            ? (parsed.description == null ? null : parsed.description.trim()) || tpl.description
            : tpl.description
      const content =
        parsed && typeof parsed === "object" && typeof parsed.content === "string"
          ? parsed.content.trim() || tpl.content
          : tpl.content

      const { error: upsertError } = await supabaseAdmin
        .from("template_translations")
        .upsert(
          {
            template_id: tpl.id,
            language_code: lang.code,
            title,
            description,
            content,
            content_html: null,
          },
          { onConflict: "template_id,language_code" }
        )

      if (upsertError) throw upsertError
      existingSet.add(`${tpl.id}:${lang.code}`)
      totalWrites += 1
      console.log(`[${lang.code}] Saved (${totalWrites} total)`)

      // Small delay to be nice to OpenAI & avoid rate limits.
      await sleep(150)
    }

    console.log(`== ${lang.code} DONE ==`)
  }

  console.log(`\nDone. Upserted ${totalWrites} translation rows.`)
  console.log("ALL DONE")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

