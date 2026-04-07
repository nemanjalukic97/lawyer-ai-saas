import { callAI, OpenAIConfigError } from "@/lib/openai"
import { createClient } from "@/lib/supabase/server"
import { NextRequest } from "next/server"

const TARGET_LANG: Record<string, string> = {
  en: "English",
  sr: "Serbian (Latin script)",
  bs: "Bosnian",
  hr: "Croatian",
  sl: "Slovenian",
  me: "Montenegrin",
}

function parseTranslationsJson(content: string): { translations: string[] } {
  const trimmed = content.trim()
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = fence ? fence[1]!.trim() : trimmed
  const obj = JSON.parse(jsonStr) as { translations?: unknown }
  if (!Array.isArray(obj.translations)) {
    throw new Error("invalid translations shape")
  }
  return { translations: obj.translations.map((s) => String(s)) }
}

type Body = { texts: string[]; targetLanguage: string }

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { texts, targetLanguage } = body

  if (!Array.isArray(texts) || texts.length === 0) {
    return Response.json({ error: "texts required" }, { status: 400 })
  }

  if (typeof targetLanguage !== "string" || !TARGET_LANG[targetLanguage]) {
    return Response.json({ error: "invalid targetLanguage" }, { status: 400 })
  }

  if (targetLanguage === "en") {
    return Response.json({ translations: texts.map((t) => String(t)) })
  }

  if (texts.length > 24) {
    return Response.json({ error: "too many items" }, { status: 400 })
  }

  const totalLen = texts.reduce((a, s) => a + String(s ?? "").length, 0)
  if (totalLen > 16000) {
    return Response.json({ error: "payload too large" }, { status: 400 })
  }

  const langName = TARGET_LANG[targetLanguage]

  const systemPrompt = `You are a professional legal translator for attorneys. The user sends JSON: {"texts": string[]}.
Translate every element of "texts" into ${langName}.
Rules:
- Preserve legal meaning; use formal legal register natural for ${langName}.
- Do not add explanations, disclaimers, or markdown.
- Keep statute names (e.g. "Zakon o…") unchanged unless a standard official ${langName} form is universally used.
- Respond with ONLY valid JSON: {"translations": string[]} — same length and order as "texts".`

  const userPrompt = JSON.stringify({ texts })

  try {
    const { content } = await callAI({
      systemPrompt,
      userPrompt: `Translate each entry in "texts" to ${langName}.\n\n${userPrompt}`,
      maxTokens: 4000,
    })

    const parsed = parseTranslationsJson(content)
    if (parsed.translations.length !== texts.length) {
      return Response.json({ error: "translation_mismatch" }, { status: 502 })
    }
    return Response.json({ translations: parsed.translations })
  } catch (e) {
    if (e instanceof OpenAIConfigError) {
      return Response.json(
        { error: "translation_unavailable" },
        { status: 503 }
      )
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(
        "[translate-rag-previews]",
        e instanceof Error ? e.message : String(e)
      )
    }
    return Response.json({ error: "translation_failed" }, { status: 502 })
  }
}
