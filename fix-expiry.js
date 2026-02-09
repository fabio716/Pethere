const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");
// Replace broken expiry mask with clean one
c = c.replace(/const maskExpiry[^}]+}/g, "const maskExpiry=(v)=>{let d=v.replace(/[^0-9]/g,\"\").slice(0,4);if(d.length>=3)return d.slice(0,2)+\"/\"+d.slice(2);return d}");
fs.writeFileSync("app/checkout/page.tsx", c, "utf8");
console.log("[OK] Mascara de validade corrigida: MM/AA");
