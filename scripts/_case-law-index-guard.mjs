/**
 * Guard: every generated export must be spread into ALL_CASE_LAW (Serbia/BiH pattern).
 */
export function assertCaseLawIndexSpreads(indexSource, exportNames, label = "updateIndex") {
  const names = exportNames.filter(Boolean)
  if (names.length === 0) return
  const missing = names.filter(
    (en) => !new RegExp(`^[ \\t]*\\.\\.\\.${en},`, "m").test(indexSource),
  )
  if (missing.length > 0) {
    console.error(
      `✗ ${label}: ${missing.length} export(s) imported but not spread into ALL_CASE_LAW: ${missing.join(", ")}`,
    )
    process.exit(1)
  }
}
