import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function extractArticleText(html) {
  const blocks = [];
  const re = /<p class="mrppsi">([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(html))) {
    let inner = m[1];
    inner = inner.replace(
      /<span class="mrppfc">\((\d+)\)\s*<\/span>/g,
      "($1) ",
    );
    inner = inner.replace(/<span class="mrppsc">/g, "").replace(/<\/span>/g, "");
    inner = inner.replace(/<br\s*\/?>/gi, "\n");
    inner = inner.replace(/&nbsp;/g, " ");
    inner = inner.replace(/<[^>]+>/g, "");
    inner = inner.replace(/Citirano besedilo se bo naložilo v trenutku\./g, "");
    inner = inner.replace(/\(\d+\)\. alineja[^\n]*/g, "");
    inner = inner.replace(/[ \t]+/g, " ").replace(/\n +/g, "\n").trim();
    inner = inner.replace(/\s{3,}/g, " ");
    blocks.push(inner);
  }
  return blocks.join("\n\n");
}

const files = [
  "tmp-zgd-1.html",
  "tmp-zgd-4.html",
  "tmp-zgd-32.html",
  "tmp-zgd-76.html",
  "tmp-zgd-139.html",
  "tmp-zgd-404.html",
  "tmp-zgd-471.html",
  "tmp-zgd-516.html",
  "tmp-zfp-1.html",
  "tmp-zfp-14.html",
  "tmp-zfp-34.html",
  "tmp-zfp-98.html",
  "tmp-zfp-224.html",
  "tmp-zfp-368.html",
];

const out = {};
for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) {
    console.error("missing", f);
    continue;
  }
  const html = fs.readFileSync(p, "utf8");
  out[f] = extractArticleText(html);
}
fs.writeFileSync(
  path.join(root, "tmp-zakonodaja-extract.json"),
  JSON.stringify(out, null, 2),
  "utf8",
);
console.log("wrote tmp-zakonodaja-extract.json");
