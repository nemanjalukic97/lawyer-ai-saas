import fs from "fs"
const s = fs.readFileSync("tmp-oz-pisrs.html", "utf8")
const needle = '<p class="center bold clen">619. člen</p>'
const i = s.indexOf(needle)
console.log("index", i)
if (i >= 0) console.log(s.slice(i, i + 2000))
