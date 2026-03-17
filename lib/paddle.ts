import { Paddle } from "@paddle/paddle-node-sdk"

const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV
const apiKey = process.env.PADDLE_API_KEY

export const paddle =
  apiKey && paddleEnv
    ? new Paddle(apiKey, {
        environment: paddleEnv === "sandbox" ? "sandbox" : "production",
      })
    : null

