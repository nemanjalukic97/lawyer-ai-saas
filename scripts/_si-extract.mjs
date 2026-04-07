import fs from "fs"

function full(path) {
  const h = fs.readFileSync(path, "utf8")
  const start = h.indexOf("(neuradno pre")
  if (start < 0) return ""
  const sub = h.slice(start)
  const end = sub.indexOf("<blockquote>")
  let t = sub
    .slice(0, end)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s*\n\s*/g, "\n")
    .trim()
  t = t.replace(/^\(neuradno prečiščeno besedilo\)\s*/i, "")
  return t.replace(/\n{3,}/g, "\n\n")
}

const out = {
  "1": full("tmp-si-1.html"),
  "2": full("tmp-si-2.html"),
  "4": full("tmp-si-4.html"),
  "5": full("tmp-si-126.html"),
  "9": full("tmp-si-10.html"),
  "12": full("tmp-si-12.html"),
  "19": full("tmp-si-19.html"),
  "25": full("tmp-si-25.html"),
  "26": full("tmp-si-26.html"),
  "30": full("tmp-si-34.html"),
  "57": full("tmp-si-w59.html"),
  "60": full("tmp-si-w62.html"),
  "64": full("tmp-si-w63.html"),
  "68": [full("tmp-si-j65.html"), full("tmp-si-j66.html"), full("tmp-si-j67.html")]
    .filter(Boolean)
    .join("\n\n"),
  "102": full("tmp-si-102.html"),
  "137": full("tmp-si-137.html"),
  "175": full("tmp-si-175.html"),
}

fs.writeFileSync("tmp-si-articles.json", JSON.stringify(out), "utf8")
console.log("ok", Object.keys(out).length)
