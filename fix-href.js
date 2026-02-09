const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");
const lines = c.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("href=window.open")) {
    lines[i] = "                <a href=\"#\" onClick={(e)=>{e.preventDefault();handleBuyClick()}} className=\"hover:underline\">";
  }
  if (lines[i].trim().startsWith("window.open") && lines[i].includes("</a>")) {
    lines[i] = "                  Ver oferta completa</a>";
  }
}
fs.writeFileSync("app/page.tsx", lines.join("\n"), "utf8");
console.log("Linhas 337-338 corrigidas!");
