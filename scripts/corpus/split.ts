import path from "path"
import { buildInsert } from "./_tmp-a42-build.ts"
import { runCutter } from "./_tmp-a26-driver.ts"
import { JURISDICTIONS, type JurisdictionId } from "./jurisdictions.ts"

const REPO = "C:/Users/neco9/OneDrive/Desktop/CursorModel/my-app"

function arg(flag: string): string | null {
  const index = process.argv.indexOf(flag)
  if (index < 0) return null
  return process.argv[index + 1] ?? null
}

const id = arg("--jurisdiction")
const stage = arg("--stage") ?? "both"
const known = Object.keys(JURISDICTIONS)
if (id == null || !known.includes(id) || (stage !== "article" && stage !== "insert" && stage !== "both")) {
  process.stderr.write(`usage: split.ts --jurisdiction ${known.join("|")} --stage article|insert|both\n`)
  process.exit(1)
}

const config = JURISDICTIONS[id as JurisdictionId]

async function main(): Promise<void> {
  if (stage === "article" || stage === "both") await runCutter(config)
  if (stage === "insert" || stage === "both") {
    const articles = config.id === "serbia"
      ? path.join(REPO, "scripts/out/serbia-article-file.jsonl")
      : path.join(REPO, "scripts/out", config.articleFile)
    await buildInsert({
      articles,
      insert: path.join(REPO, "scripts/out", config.insertFile),
      plan: path.join(REPO, "scripts/out", config.planFile),
      report: path.join(REPO, "scripts/out", config.reportFile),
      dropped: path.join(REPO, "scripts/out", config.droppedFile),
      phrases: config.commencementPhrases,
      useSerbiaNamed: config.useSerbiaNamed,
      expectedLaws: config.expectedLaws,
    })
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "failed"
  process.stderr.write(`${message.includes("://") ? "failed" : message}\n`)
  process.exit(1)
})
