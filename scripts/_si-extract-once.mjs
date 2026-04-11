import fs from "fs";
import { execSync } from "child_process";

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSi(html) {
  const idx = html.indexOf('<div id="contentcolumnmain">');
  if (idx === -1) return null;
  const rest = html.slice(idx);
  const end = rest.indexOf("<blockquote>");
  const chunk = end === -1 ? rest : rest.slice(0, end);
  let divM = chunk.match(/<div class="mrppsi">([\s\S]*?)<\/div>/);
  let raw = divM ? divM[1] : "";
  if (!raw) {
    const ps = [...chunk.matchAll(/<p class="mrppsi">([\s\S]*?)<\/p>/g)];
    raw = ps.map((x) => x[1]).join("");
  }
  raw = raw.replace(/<span class="fld"[^>]*>[\s\S]*?<\/span>/gi, "");
  raw = raw.replace(/<a class="flr"[^>]*>[\s\S]*?<\/a>/gi, "");
  const parts = raw.split(/<\/p>/i);
  const segments = [];
  for (const p of parts) {
    const t = stripTags(p);
    if (t && !t.includes("Citirano besedilo")) segments.push(t);
  }
  return segments.join("\n");
}

const zjrm = {
  1: "1-clen-namen-zakona",
  2: "2-clen-opredelitev-izrazov",
  3: "3-clen-vzdrzevanje-javnega-reda-in-miru",
  4: "4-clen-izobesanje-tuje-zastave",
  5: "5-clen-zbiranje-prostovoljnih-prispevkov",
  6: "6-clen-nasilno-in-drzno-vedenje",
  8: "8-clen-povzrocanje-hrupa",
  11: "11-clen-uporaba-nevarnih-predmetov",
  14: "14-clen-izobesanje-tuje-zastave",
};
const zp = {
  1: "1-clen-predpisovanje-prekrskov-in-sankcij",
  2: "2-clen-meje-sankcioniranja-prekrskov",
  5: "5-clen-veljavnost-predpisov",
  9: "9-clen-odgovornost-za-prekrsek",
  13: "13-clen-odgovornost-pravne-osebe-samostojnega-podjetnika-posameznika-posameznika-ki-samostojno-oprav",
  50: "50-clen-zacetek-postopka-o-prekrsku",
  100: "100-clen-posvetovanje-in-glasovanje",
  160: "160-clen-omejeno-sklicevanje-na-krsitve",
  200: "200-clen-izvrsitev-odlocbe",
};
const out = { zjrm: {}, zp: {} };
for (const [num, slug] of Object.entries(zjrm)) {
  const u = "https://zakonodaja.com/zakon/zjrm-1/" + slug;
  try {
    const h = execSync("curl.exe -sL " + JSON.stringify(u), { encoding: "utf8", maxBuffer: 10e6 });
    out.zjrm[num] = extractSi(h) || "FAIL";
  } catch {
    out.zjrm[num] = "ERR";
  }
}
for (const [num, slug] of Object.entries(zp)) {
  const u = "https://zakonodaja.com/zakon/zp-1/" + slug;
  try {
    const h = execSync("curl.exe -sL " + JSON.stringify(u), { encoding: "utf8", maxBuffer: 10e6 });
    out.zp[num] = extractSi(h) || "FAIL";
  } catch {
    out.zp[num] = "ERR";
  }
}
fs.writeFileSync("tmp-si-extract-out.json", JSON.stringify(out, null, 2), "utf8");
console.log("ok");
