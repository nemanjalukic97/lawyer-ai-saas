const nums = [80, 84, 86, 89, 92, 95, 141, 144, 147]
for (const n of nums) {
  const t = await fetch(`https://zakonodaja.com/zakon/zgd-1/${n}-clen`).then((r) =>
    r.text(),
  )
  const href = t.match(/canonical" href="([^"]+)"/)?.[1]
  // eslint-disable-next-line no-console
  console.log(n, href)
}
