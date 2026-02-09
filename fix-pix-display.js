const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");
// Fix: frontend expects pixCode but API returns pixQrCode
if (c.includes("data.pixCode")) {
  c = c.replace("data.pixCode", "data.pixQrCode");
  console.log("[OK] pixCode -> pixQrCode corrigido");
}
// Also show pixQrCodeUrl as image if available
if (!c.includes("pixQrCodeUrl")) {
  c = c.replace("setOrderId(data.orderNumber", "if(data.pixQrCode)setPixCode(data.pixQrCode)\n    setOrderId(data.orderNumber");
  console.log("[OK] setPixCode adicionado antes do setOrderId");
}
fs.writeFileSync("app/checkout/page.tsx", c, "utf8");
