const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");
c = c.replace("Coffee,\n  ", "");
c = c.replace("Coffee,\r\n  ", "");
const lines = c.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("<Coffee")) {
    lines[i] = lines[i].replace(/<Coffee[^/]*\/>/g, "<span className=\"text-xl\">&#9749;</span>");
  }
}
fs.writeFileSync("app/page.tsx", lines.join("\n"), "utf8");
console.log("Coffee icon corrigido!");
