import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local agent artifacts / scratch files:
    ".claude/**",
    "tmp-*.html",
    "tmp-*.htm",
    "tmp-*.txt",
    "tmp-*.json",
    "tmp-*.pdf",
    "tmp-*.doc",
    "tmp-*.bin",
    // Invalid/placeholder file (not actual TS source):
    "lib/supabase/database.types.ts",
  ]),
]);

export default eslintConfig;
