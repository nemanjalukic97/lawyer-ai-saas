/**
 * A stored law_name_local shown to a person must go through normaliseLawName.
 * Comment lines are not reads. Every other hit in app/, components/, and lib/
 * is either the argument of that function or an entry below.
 *
 * Run: npx tsx --test lib/lawNameDisplay.sites.test.ts
 */
import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "fs"
import path from "path"
import test from "node:test"

const ROOT = path.resolve(__dirname, "..")
const SCAN = ["app", "components", "lib"]

type Allow = { file: string; line: string; why: string }

const ALLOW: Allow[] = [
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "law_name_local: string",
    why: "search result type. The card title is researchStatuteTitle.",
  },
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "law_name_local?: string | null",
    why: "argument type of researchStatuteTitle.",
  },
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "if (!first?.law_name_local) return null",
    why: "implementing-act lookup needs a stored statute before it can match a group.",
  },
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "item.statute === first.law_name_local &&",
    why: "group match against the stored statute. The printed child names go through normaliseLawName.",
  },
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "const local = item.law_name_local",
    why: "researchStatuteTitle passes a non-blank value to normaliseLawName and otherwise falls back to law_name.",
  },
  {
    file: "app/dashboard/research/ResearchPageClient.tsx",
    line: "{isUnofficialConsolidation(r.jurisdiction, r.law_name_local) ? (",
    why: "caption match is the stored Породични закон and Закон о раду, not the display title.",
  },
  {
    file: "lib/legalRag.ts",
    line: "law_name_local: string",
    why: "LegalChunk field and the cap-exclusion report type. Retrieval keeps the stored string.",
  },
  {
    file: "lib/legalRag.ts",
    line: '"id, jurisdiction, law_name, law_name_local, law_category, article_num, paragraph_num, amending_act, is_excerpt, text, text_local, source_url",',
    why: "column list of the article select.",
  },
  {
    file: "lib/legalRag.ts",
    line: 'law_name_local: String(row.law_name_local ?? ""),',
    why: "row mapping onto the chunk. Scores read this stored value.",
  },
  {
    file: "lib/legalRag.ts",
    line: 'const lawName = String(r.law_name_local ?? r.law_name ?? "")',
    why: "land-register title bonus. A display rewrite would move scores.",
  },
  {
    file: "lib/legalRag.ts",
    line: "const law = chunk.law_name_local || chunk.law_name",
    why: "cap key and the cap-exclusion report. Identity, not a title.",
  },
  {
    file: "lib/legalRag.ts",
    line: "law_name_local: law,",
    why: "cap-exclusion report keeps the stored name.",
  },
  {
    file: "lib/legalRag.ts",
    line: "const { tier } = classifyActType(chunk.law_name_local)",
    why: "act-type penalty. Classification reads the stored title, including the glued forms.",
  },
  {
    file: "lib/legalRag.ts",
    line: "if (a.law_name_local < b.law_name_local) return -1",
    why: "sort key. Normalising it would reorder rows.",
  },
  {
    file: "lib/legalRag.ts",
    line: "if (a.law_name_local > b.law_name_local) return 1",
    why: "sort key. Normalising it would reorder rows.",
  },
  {
    file: "lib/research/logLegalSearch.ts",
    line: "law_name_local: chunk.law_name_local,",
    why: "search log stores the column.",
  },
  {
    file: "app/api/research/search/route.ts",
    line: "law_name_local: string",
    why: "response type. The card normalises on read.",
  },
  {
    file: "app/api/research/search/route.ts",
    line: "law_name_local: chunk.law_name_local,",
    why: "API transport of the stored column, and the parent-lookup key.",
  },
  {
    file: "app/api/ai/route.ts",
    line: "law_name_local: c.law_name_local,",
    why: "sources payload. RagSourcesPanel normalises on read.",
  },
  {
    file: "app/api/ai/route.ts",
    line: "c.law_name_local,",
    why: "unofficial-consolidation check against the stored name.",
  },
  {
    file: "app/api/ai/route.ts",
    line: "law_name: s.law_name_local,",
    why: "validation chunk copies the stored name. validateCitations normalises when it compares.",
  },
  {
    file: "app/api/ai/route.ts",
    line: "law_name_local: s.law_name_local,",
    why: "validation chunk keeps the stored name.",
  },
  {
    file: "app/api/rag-debug/route.ts",
    line: "law_name_local: c.law_name_local,",
    why: "debug JSON transport, not a lawyer-facing title.",
  },
  {
    file: "lib/excerptPrompt.test.ts",
    line: "law_name_local: fields.law,",
    why: "test fixture.",
  },
  {
    file: "lib/lawNameDisplay.test.ts",
    line: "law_name_local: stored,",
    why: "fixture. The chunk keeps the stored title while the LAW line is normalised.",
  },
  {
    file: "lib/lawNameDisplay.test.ts",
    line: "assert.equal(chunk.law_name_local, stored)",
    why: "asserts the stored column on the chunk is not rewritten.",
  },
  {
    file: "lib/unofficialConsolidation.ts",
    line: "law_name_local: string",
    why: "stored-name equality for the two Republika Srpska consolidations.",
  },
  {
    file: "lib/unofficialConsolidation.ts",
    line: '{ jurisdiction: "bih_rs", law_name_local: "Породични закон" },',
    why: "stored title the caption matches.",
  },
  {
    file: "lib/unofficialConsolidation.ts",
    line: '{ jurisdiction: "bih_rs", law_name_local: "Закон о раду" },',
    why: "stored title the caption matches.",
  },
  {
    file: "lib/unofficialConsolidation.ts",
    line: "row.jurisdiction === jurisdiction && row.law_name_local === lawNameLocal,",
    why: "equality against the stored column.",
  },
  {
    file: "lib/legal-articles/sendLegalArticlesNotifications.ts",
    line: "law_name_local: string",
    why: "row type. The email builder normalises when it renders.",
  },
  {
    file: "lib/legal-articles/sendLegalArticlesNotifications.ts",
    line: "lawNameLocal: row.law_name_local,",
    why: "payload copy. buildLegalArticlesNotificationEmail normalises both lists.",
  },
  {
    file: "lib/legal-articles/sendLegalArticlesNotifications.ts",
    line: '.select("jurisdiction, law_name, law_name_local, created_at")',
    why: "column list of the notification select.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "SELECT c.child_law_name_local AS name,",
    why: "parent-table aggregate. The research line normalises act.name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "count(a.law_name_local)::int AS rows",
    why: "row count of the stored child name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "SELECT DISTINCT child_law_name_local",
    why: "parent lookup identity.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "AND parent_law_name_local = $2",
    why: "parent lookup matches the stored statute.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "AND a.law_name_local = c.child_law_name_local",
    why: "join on the stored name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "GROUP BY c.child_law_name_local",
    why: "group by the stored child name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "ORDER BY count(a.law_name_local) DESC, c.child_law_name_local ASC",
    why: "order of the stored child names.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "hits: Array<{ jurisdiction: string; law_name_local: string }>,",
    why: "lookup argument type. The caller passes the stored statute.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "const statute = hit.law_name_local.trim()",
    why: "parent lookup key is the stored statute.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "law_name_local: string",
    why: "ingested-article type.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "const key = `${article.jurisdiction}\\0${article.law_name_local}`",
    why: "ingest identity of the stored name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: 'if (article.law_name_local === "Untitled 1") continue',
    why: "shape 5 is left stored. No invented title.",
  },
  {
    file: "lib/legalActParent.ts",
    line: '.eq("child_law_name_local", article.law_name_local)',
    why: "delete key is the stored child name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "child_law_name_local: article.law_name_local,",
    why: "citation row stores the column.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "parent_law_name_local: matchParentLawName(parent.parentNameParsed, laws),",
    why: "resolved parent is a stored name.",
  },
  {
    file: "lib/legalActParent.ts",
    line: '.select("law_name_local")',
    why: "name list for parent matching.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "const page = (data ?? []) as Array<{ law_name_local: string }>",
    why: "page type of the stored names.",
  },
  {
    file: "lib/legalActParent.ts",
    line: "const name = row.law_name_local",
    why: "parent-match fold input. That fold is legalActParentParse, not the display title.",
  },
]

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue
      out.push(...walk(full))
    } else if (/\.(ts|tsx)$/.test(entry.name) && entry.name !== "lawNameDisplay.sites.test.ts") {
      out.push(full)
    }
  }
  return out
}

function isComment(line: string): boolean {
  const trimmed = line.trim()
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*/")
  )
}

function rel(file: string): string {
  return path.relative(ROOT, file).split(path.sep).join("/")
}

test("law_name_local is not read for display outside the normaliser", () => {
  const hits: string[] = []
  const used = new Set<number>()
  for (const file of SCAN.flatMap((dir) => walk(path.join(ROOT, dir)))) {
    const fileRel = rel(file)
    const lines = readFileSync(file, "utf8").split(/\r?\n/)
    lines.forEach((line, index) => {
      if (!line.includes("law_name_local") || isComment(line)) return
      if (line.includes("normaliseLawName(")) return
      if (line.includes("{law_name_local}") && !line.includes("${")) return
      const trimmed = line.trim()
      const allow = ALLOW.findIndex((entry) => entry.file === fileRel && entry.line === trimmed)
      if (allow === -1) hits.push(`${fileRel}:${index + 1}: ${trimmed}`)
      else used.add(allow)
    })
  }
  const stale = ALLOW.filter((_, index) => !used.has(index)).map(
    (entry) => `${entry.file}: ${entry.why}`,
  )
  assert.deepEqual(hits, [], hits.join("\n"))
  assert.deepEqual(stale, [], stale.join("\n"))
})

test("the citation format token is not a column read", () => {
  const src = readFileSync(path.join(ROOT, "lib/legalRag.ts"), "utf8")
  assert.match(src, /"\(Article X, \{law_name_local\}\)"/)
  assert.doesNotMatch(src, /\$\{chunk\.law_name_local\}/)
})

test("the five display sites and the child-name alias call the display normaliser", () => {
  const research = readFileSync(
    path.join(ROOT, "app/dashboard/research/ResearchPageClient.tsx"),
    "utf8",
  )
  const panel = readFileSync(path.join(ROOT, "components/RagSourcesPanel.tsx"), "utf8")
  const rag = readFileSync(path.join(ROOT, "lib/legalRag.ts"), "utf8")
  const email = readFileSync(
    path.join(ROOT, "lib/email/legalArticlesNotificationEmail.ts"),
    "utf8",
  )
  assert.match(research, /from "@\/lib\/lawNameDisplay"/)
  assert.match(research, /return normaliseLawName\(local\)/)
  assert.match(research, /normaliseLawName\(act\.name\)/)
  assert.match(panel, /from "@\/lib\/lawNameDisplay"/)
  assert.equal(panel.split("s.law_name_local").length - 1, 1)
  assert.match(panel, /const lawTitle = normaliseLawName\(s\.law_name_local\)/)
  assert.equal(panel.split("{lawTitle}").length - 1, 3)
  assert.match(rag, /from "\.\/lawNameDisplay"/)
  assert.match(rag, /const law = normaliseLawName\(chunk\.law_name_local\)/)
  assert.match(rag, /const name = normaliseLawName\(chunk\.law_name_local\.trim\(\)\)/)
  assert.match(email, /from "@\/lib\/lawNameDisplay"/)
  assert.equal(email.split("normaliseLawName(law.lawNameLocal)").length - 1, 2)
})
