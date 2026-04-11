import https from "https"
import fs from "fs"

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "User-Agent": "Mozilla/5.0 (compatible; Legantis-ingest/1.0)" } },
        (res) => {
          let d = ""
          res.on("data", (c) => (d += c))
          res.on("end", () => resolve(d))
        },
      )
      .on("error", reject)
  })
}

function extractMrppscSpans(fragment) {
  const spans = [...fragment.matchAll(/<span class="mrppsc">([^<]*)<\/span>/g)]
  const lines = []
  for (const s of spans) {
    const line = s[1].replace(/\s+/g, " ").trim()
    if (line && !line.includes("Citirano besedilo")) lines.push(line)
  }
  return lines.join("\n\n")
}

/** ZJRM uses <div class="mrppsi">; ZP uses <p class="mrppsi"> */
function extractZakonodajaClen(html) {
  const divM = html.match(/<div class="mrppsi">([\s\S]*?)<\/div>\s*<blockquote>/)
  if (divM) {
    const t = extractMrppscSpans(divM[1])
    if (t) return t
  }
  const paras = [...html.matchAll(/<p class="mrppsi">([\s\S]*?)<\/p>/g)]
  const chunks = []
  for (const p of paras) {
    const t = extractMrppscSpans(p[1])
    if (t) chunks.push(t)
  }
  return chunks.length ? chunks.join("\n\n") : null
}

function extractParagrafClan(html, n) {
  const re = new RegExp(
    `<a name="clan_${n}(?:\\*\\*)?"></a>Član ${n}\\s*</p>([\\s\\S]*?)(?=<p class="clan"><a name="clan_)`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  return [...m[1].matchAll(/<p class="normal">([^<]*)<\/p>/gi)]
    .map((x) => x[1].replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
}

const zjrmPaths = {
  1: "1-clen-namen-zakona",
  2: "2-clen-opredelitev-izrazov",
  3: "3-clen-vzdrzevanje-javnega-reda-in-miru",
  4: "4-clen-izobesanje-tuje-zastave",
  5: "5-clen-zbiranje-prostovoljnih-prispevkov",
  6: "6-clen-nasilno-in-drzno-vedenje",
  8: "8-clen-povzrocanje-hrupa",
  11: "11-clen-uporaba-nevarnih-predmetov",
  14: "14-clen-izobesanje-tuje-zastave",
}

const zpPaths = {
  1: "1-clen-predpisovanje-prekrskov-in-sankcij",
  2: "2-clen-meje-sankcioniranja-prekrskov",
  5: "5-clen-veljavnost-predpisov",
  9: "9-clen-odgovornost-za-prekrsek",
  13: "13-clen-odgovornost-pravne-osebe-samostojnega-podjetnika-posameznika-posameznika-ki-samostojno-oprav",
  50: "50-clen-zacetek-postopka-o-prekrsku",
  100: "100-clen-posvetovanje-in-glasovanje",
  160: "160-clen-omejeno-sklicevanje-na-krsitve",
  200: "200-clen-izvrsitev-odlocbe",
}

function extractMeJrmFromKatalog(html, n) {
  const next = n + 1
  const re = new RegExp(
    `<p class=C30X>Član ${n}</p>\\s*((?:<p class=T30X>[\\s\\S]*?<\\/p>\\s*)+)(?=<p class=C30X>Član (?:${n}[a-z]|${next})</p>)`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  let t = m[1]
  t = t.replace(/<p class=T30X>/gi, "\n")
  t = t.replace(/<\/p>/gi, "")
  t = t.replace(/<[^>]+>/g, "")
  t = t.replace(/\s+\n/g, "\n").trim()
  return t.replace(/\n{3,}/g, "\n\n")
}

async function main() {
  const base = "https://zakonodaja.com"
  const out = { slovenia: { zjrm: {}, zp: {} }, montenegro: { zp: {}, jrm: {} } }

  for (const [num, path] of Object.entries(zjrmPaths)) {
    const url = `${base}/zakon/zjrm-1/${path}`
    const html = await get(url)
    out.slovenia.zjrm[num] = extractZakonodajaClen(html)
    if (!out.slovenia.zjrm[num]) console.error("MISS ZJRM", num, url)
  }

  for (const [num, path] of Object.entries(zpPaths)) {
    const url = `${base}/zakon/zp-1/${path}`
    const html = await get(url)
    out.slovenia.zp[num] = extractZakonodajaClen(html)
    if (!out.slovenia.zp[num]) console.error("MISS ZP", num, url)
  }

  const zpHtml = fs.readFileSync(
    "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-me-zp.html",
    "utf8",
  )
  for (const n of [1, 2, 5, 9, 13, 50, 100, 160, 200]) {
    out.montenegro.zp[String(n)] = extractParagrafClan(zpHtml, n)
    if (!out.montenegro.zp[String(n)]) console.error("MISS ME ZP", n)
  }

  const jrmHtml = fs.readFileSync(
    "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-me-jrm-katalog.html",
    "utf8",
  )
  for (const n of [1, 2, 3, 4, 5, 6, 7, 9, 12, 16, 18]) {
    out.montenegro.jrm[String(n)] = extractMeJrmFromKatalog(jrmHtml, n)
    if (!out.montenegro.jrm[String(n)]) console.error("MISS ME JRM", n)
  }

  fs.writeFileSync(
    "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-si-me-extracted.json",
    JSON.stringify(out, null, 2),
    "utf8",
  )
  console.log("Wrote tmp-si-me-extracted.json")
}

main().catch(console.error)
