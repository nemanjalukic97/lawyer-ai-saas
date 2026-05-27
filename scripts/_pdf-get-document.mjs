/**
 * Open a PDF with pdf.js and standard fonts configured (avoids standardFontDataUrl warnings).
 */
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"

const standardFontDataUrl = new URL(
  "../node_modules/pdfjs-dist/standard_fonts/",
  import.meta.url,
).href

export async function openPdfFromFileBuffer(buf) {
  // pdf.js rejects Node Buffer even though it extends Uint8Array
  const data =
    typeof Buffer !== "undefined" && Buffer.isBuffer(buf)
      ? new Uint8Array(buf)
      : buf instanceof Uint8Array
        ? buf
        : new Uint8Array(buf)
  return pdfjs.getDocument({
    data,
    disableWorker: true,
    standardFontDataUrl,
  }).promise
}
