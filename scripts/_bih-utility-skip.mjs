/**
 * BiH site-utility / non-decision filename exclusion (Serbia-style boilerplate skip).
 *
 * CMS download handlers often save as download.pdf / download__<hash>.pdf with no
 * court/case structure. Skip those so quarterly regen cannot re-ingest them.
 */
import path from "path"

/** Filename / case_number stems that are never real decisions. */
const BIH_UTILITY_STEM_RE =
  /^(download)(?:$|[\s_-])/i

/**
 * True when basename (pdf/txt/stem) or resolved case_number is a known utility name.
 * @param {string} name
 */
export function isBihUtilityStem(name) {
  if (!name) return false
  const base = path
    .basename(String(name))
    .replace(/\.(txt|pdf)$/i, "")
    .replace(/__+/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return BIH_UTILITY_STEM_RE.test(base)
}

/**
 * Serbia-style: skip utility filenames unless a real case number was resolved from text.
 * @param {string} filename
 * @param {string} [resolvedCaseNumber]
 */
export function shouldSkipBihUtilityFile(filename, resolvedCaseNumber) {
  if (!isBihUtilityStem(filename)) return false
  // Filename is download* — keep only if text yielded a non-utility case number
  if (resolvedCaseNumber && !isBihUtilityStem(resolvedCaseNumber)) return false
  return true
}
