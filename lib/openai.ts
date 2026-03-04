import OpenAI from "openai"

export interface CallAIParams {
  systemPrompt: string
  userPrompt: string
  maxTokens?: number
}

export interface CallAIResult {
  content: string
  tokensUsed: number
  costUsd: number
}

export class OpenAIConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "OpenAIConfigError"
  }
}

export class OpenAICallError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "OpenAICallError"
  }
}

const apiKey = process.env.OPENAI_API_KEY

const openai = apiKey ? new OpenAI({ apiKey }) : null

export async function callAI({
  systemPrompt,
  userPrompt,
  maxTokens = 4000,
}: CallAIParams): Promise<CallAIResult> {
  if (!apiKey || !openai) {
    throw new OpenAIConfigError("OPENAI_API_KEY is not set")
  }

  const safeMaxTokens = maxTokens > 0 ? maxTokens : 4000

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: safeMaxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    })

    const choice = response.choices[0]
    const rawContent = choice?.message?.content
    const content =
      typeof rawContent === "string"
        ? rawContent
        : rawContent == null
        ? ""
        : JSON.stringify(rawContent)

    const promptTokens = response.usage?.prompt_tokens ?? 0
    const completionTokens = response.usage?.completion_tokens ?? 0
    const tokensUsed = promptTokens + completionTokens

    // gpt-4o pricing
    const inputCost = (promptTokens * 0.005) / 1000
    const outputCost = (completionTokens * 0.015) / 1000
    const costUsd = Number((inputCost + outputCost).toFixed(6))

    return {
      content,
      tokensUsed,
      costUsd,
    }
  } catch (err) {
    // Log minimal information for debugging without exposing raw API details
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("OpenAI call failed:", err instanceof Error ? err.message : String(err))
    }

    throw new OpenAICallError(
      "Failed to generate AI response. Please try again or contact support if the problem persists."
    )
  }
}

