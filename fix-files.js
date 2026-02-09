const fs = require("fs");
const path = require("path");
function findFiles(dir, ext, results) {
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === "node_modules" || item === ".next") continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) findFiles(full, ext, results);
    else if (item.endsWith(ext)) results.push(full);
  }
  return results;
}
function fix(text) {
  let r = text;
  for (let i = 0; i < 5; i++) {
    const prev = r;
    try {
      const bytes = [];
      for (let j = 0; j < r.length; j++) {
        const c = r.charCodeAt(j);
        const m = {0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
        if (c <= 255) bytes.push(c);
        else if (m[c] !== undefined) bytes.push(m[c]);
        else { const enc = Buffer.from(r[j], "utf8"); for (const b of enc) bytes.push(b); }
      }
      const decoded = Buffer.from(bytes).toString("utf8");
      if (!decoded.includes("\uFFFD") && decoded.length <= r.length) r = decoded;
      else break;
    } catch(e) { break; }
    if (r === prev) break;
  }
  return r;
}
const files = [];
findFiles("app", ".tsx", files);
findFiles("app", ".ts", files);
findFiles("components", ".tsx", files);
findFiles("components", ".ts", files);
findFiles("lib", ".ts", files);
let totalFixed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  if (!/\u00c3[\u0192\u201a\u00a1\u00a3\u00a9\u00aa\u00ab\u00ad\u00b3\u00b5\u00b4\u00ba\u00a7\u00a2]|\u00c3\u2?|\u00c3\u0192\u00c6/.test(original)) continue;
  const fixed = fix(original);
  if (fixed !== original) {
    fs.writeFileSync(file, fixed, "utf8");
    totalFixed++;
    console.log("[CORRIGIDO]", file);
  }
}
if (totalFixed === 0) console.log("Nenhum arquivo com mojibake encontrado.");
else console.log("Total:", totalFixed, "arquivos corrigidos. Reinicie o servidor.");
