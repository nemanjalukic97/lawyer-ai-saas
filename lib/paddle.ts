import { Paddle } from "@paddle/paddle-node-sdk"

const apiKey = process.env.PADDLE_API_KEY

function resolvePaddleEnvironment(): "sandbox" | "production" | null {
  const explicit =
    (process.env.PADDLE_ENV ?? process.env.NEXT_PUBLIC_PADDLE_ENV)?.toLowerCase() ?? ""

  // Heuristic fallback to avoid common "not permitted" misconfiguration:
  // live keys must use production; test keys must use sandbox.
  const inferredFromKey: "sandbox" | "production" | null = apiKey?.includes("_live_")
    ? "production"
    : apiKey?.includes("_test_")
      ? "sandbox"
      : null

  const explicitEnv: "sandbox" | "production" | null =
    explicit === "sandbox" || explicit === "production" ? (explicit as "sandbox" | "production") : null

  // If explicit is set but contradicts the key type, prefer the key type.
  if (explicitEnv && inferredFromKey && explicitEnv !== inferredFromKey) return inferredFromKey
  if (explicitEnv) return explicitEnv
  if (inferredFromKey) return inferredFromKey

  return null
}

const paddleEnv = resolvePaddleEnvironment()

export const paddle =
  apiKey && paddleEnv
    ? new Paddle(apiKey, {
        environment: paddleEnv,
      })
    : null

