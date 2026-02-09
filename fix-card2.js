const fs = require("fs");
const lines = fs.readFileSync("app/api/checkout/create/route.ts", "utf8").split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("pending_card") || lines[i].includes("Card: salva")) {
    lines[i] = "      paymentResult = { success: true, orderId: \"pending_card\", status: \"pending_card\" }";
    console.log("[OK] Linha", i+1, "corrigida");
  }
}
fs.writeFileSync("app/api/checkout/create/route.ts", lines.join("\n"), "utf8");
