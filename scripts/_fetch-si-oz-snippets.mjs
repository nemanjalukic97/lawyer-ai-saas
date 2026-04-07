async function extract(url) {
  const t = await fetch(url).then((r) => r.text())
  const blocks = [...t.matchAll(/<p class="mrppsi">([\s\S]*?)<\/p>/g)]
  const parts = blocks.map((m) =>
    m[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  )
  return parts.join("\n\n")
}

const urls = [
  ["990", "https://zakonodaja.com/zakon/oz/990-clen-pojem"],
  ["991", "https://zakonodaja.com/zakon/oz/991-clen-prispevki"],
  ["992", "https://zakonodaja.com/zakon/oz/992-clen-odlocanje-in-poslovodstvo"],
  ["994", "https://zakonodaja.com/zakon/oz/994-clen-koristi-in-izguba"],
  ["997", "https://zakonodaja.com/zakon/oz/997-clen-razmerja-med-druzbeniki"],
  ["1000", "https://zakonodaja.com/zakon/oz/1000-clen-prenehanje-druzbe"],
]

for (const [num, url] of urls) {
  // eslint-disable-next-line no-console
  console.log("\n###", num, "###\n")
  // eslint-disable-next-line no-console
  console.log(await extract(url))
}
