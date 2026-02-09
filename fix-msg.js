const fs = require("fs");
const lines = fs.readFileSync("app/checkout/page.tsx", "utf8").split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("paymentMethod") && lines[i].includes("WhatsApp") && lines[i].includes("frete")) {
    lines[i] = "        <p className=\"text-sm text-slate-400 mb-6\">{paymentMethod === \"card\" ? \"Entraremos em contato via WhatsApp para finalizar o pagamento com cartao.\" : \"GPS enviado com frete gratis!\"}</p>";
    console.log("[OK] Mensagem corrigida na linha", i+1);
  }
}
fs.writeFileSync("app/checkout/page.tsx", lines.join("\n"), "utf8");
