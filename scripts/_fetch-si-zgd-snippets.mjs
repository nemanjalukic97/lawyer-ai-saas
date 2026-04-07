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
  ["78", "https://zakonodaja.com/zakon/zgd-1/78-clen-prijava-za-vpis-v-register"],
  ["80", "https://zakonodaja.com/zakon/zgd-1/80-clen-vlozki-v-druzbo"],
  ["85", "https://zakonodaja.com/zakon/zgd-1/85-clen-vodenje-poslov"],
  ["95", "https://zakonodaja.com/zakon/zgd-1/95-clen-razdelitev-dobicka-in-izgube"],
  ["100", "https://zakonodaja.com/zakon/zgd-1/100-clen-osebna-odgovornost-druzbenikov"],
  ["105", "https://zakonodaja.com/zakon/zgd-1/105-clen-razlogi-za-prenehanje"],
  ["106", "https://zakonodaja.com/zakon/zgd-1/106-clen-odpoved-druzbenika"],
  ["111", "https://zakonodaja.com/zakon/zgd-1/111-clen-izlocitev-druzbenika"],
  ["138", "https://zakonodaja.com/zakon/zgd-1/138-clen-vodenje-druzbe"],
  ["142", "https://zakonodaja.com/zakon/zgd-1/142-clen-razdelitev-dobicka-in-izgube"],
  ["145", "https://zakonodaja.com/zakon/zgd-1/145-clen-komanditistova-odgovornost-upnikom"],
]

for (const [num, url] of urls) {
  // eslint-disable-next-line no-console
  console.log("\n###", num, "###\n")
  // eslint-disable-next-line no-console
  console.log(await extract(url))
}
