const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");
const lines = c.split("\n");
let fixes = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("window.open") || lines[i].includes("window.location.href") && lines[i].includes("oseupetaqui")) {
    lines[i] = lines[i].replace(/window\.open\([^)]*\)/g, "window.location.href=\"/checkout\"");
    fixes++;
  }
}
c = lines.join("\n");
fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("[OK]", fixes, "botoes corrigidos para /checkout");
