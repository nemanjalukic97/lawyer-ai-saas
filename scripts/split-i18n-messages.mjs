import fs from "fs"
import path from "path"

const src = fs.readFileSync("components/LanguageProvider.tsx", "utf8")
const lines = src.split(/\r?\n/)

const langs = [
  { code: "en", start: 25, end: 2277 },
  { code: "sr", start: 2280, end: 4534 },
  { code: "bs", start: 4537, end: 6794 },
  { code: "hr", start: 6797, end: 9041 },
  { code: "sl", start: 9044, end: 11227 },
  { code: "me", start: 11230, end: 13399 },
]

const outDir = "lib/i18n/messages"
fs.mkdirSync(outDir, { recursive: true })

for (const { code, start, end } of langs) {
  const body = lines.slice(start - 1, end).join("\n")
  const file = [
    "import type { Messages } from '@/lib/i18n/types'",
    "",
    `export const ${code}Messages: Messages = {`,
    body,
    "}",
    "",
  ].join("\n")
  fs.writeFileSync(path.join(outDir, `${code}.ts`), file, "utf8")
}

const index = [
  "import type { LanguageCode, Messages } from '@/lib/i18n/types'",
  "import { enMessages } from './en'",
  "import { srMessages } from './sr'",
  "import { bsMessages } from './bs'",
  "import { hrMessages } from './hr'",
  "import { slMessages } from './sl'",
  "import { meMessages } from './me'",
  "",
  "export const MESSAGES: Record<LanguageCode, Messages> = {",
  "  en: enMessages,",
  "  sr: srMessages,",
  "  bs: bsMessages,",
  "  hr: hrMessages,",
  "  sl: slMessages,",
  "  me: meMessages,",
  "}",
  "",
].join("\n")

fs.writeFileSync(path.join(outDir, "index.ts"), index, "utf8")
console.log("Split complete")
