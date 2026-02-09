const fs = require("fs");
let c = fs.readFileSync("app/api/checkout/create/route.ts", "utf8");
// Fix: cleanDoc was applied inside destructuring, move it outside
c = c.replace("document: cleanDoc(document),", "document,");
// Apply cleanDoc where document is used in customerData
c = c.replace("phone: cleanPhone(whatsapp), document,", "phone: cleanPhone(whatsapp), document: cleanDoc(document),");
fs.writeFileSync("app/api/checkout/create/route.ts", c, "utf8");
console.log("[OK] cleanDoc movido para o lugar correto");
