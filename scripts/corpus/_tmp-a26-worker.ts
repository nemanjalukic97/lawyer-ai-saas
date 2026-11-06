import { parentPort } from "worker_threads"
import { runLaw, type Chunk } from "./_tmp-a26-run.ts"

type Request = { id: number; index: number; law: string; chunks: Chunk[] }

parentPort?.on("message", (msg: Request) => {
  try {
    const result = runLaw(msg.law, msg.chunks)
    parentPort?.postMessage({ id: msg.id, index: msg.index, result })
  } catch (error) {
    parentPort?.postMessage({
      id: msg.id,
      index: msg.index,
      result: {
        law: msg.law,
        kept: false,
        reason: "error",
        chunks: msg.chunks.length,
        error: error instanceof Error ? error.message : String(error),
        output_rows: 0,
        articles: 0,
        max_tokens: 0,
        boundary_failed: 0,
        paragraph_bad: 0,
        text_mismatch: 0,
        conservation_stripped: 0,
        conservation_rebuilt: 0,
        exceptions: [],
        deduped: 0,
        six_groups_before: 0,
        joined_chars: 0,
        rows: [],
      },
    })
  }
})
