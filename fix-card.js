const fs = require("fs");
let c = fs.readFileSync("app/api/checkout/create/route.ts", "utf8");

// For card payments, dont send to pagarme API directly
// Instead, return order info and let frontend handle card via redirect
if (c.includes("createCardOrder")) {
  c = c.replace(
    "paymentResult = await createCardOrder({ name, email, phone: whatsapp, document, amount: amountCents, installments: 12, orderId: order.id, address: address || \"\", city: city || \"\", state: state || \"\", cep: cep || \"\", number: number || \"\", neighborhood: neighborhood || \"\" })",
    "// Card: salva pedido como pending, retorna para frontend processar\\n      paymentResult = { success: true, orderId: \\\"pending_card\\\", status: \\\"pending_card\\\" }"
  );
  console.log("[OK] Cartao agora salva pedido sem chamar Pagar.me direto");
} else { console.log("[INFO] Ja ajustado"); }
fs.writeFileSync("app/api/checkout/create/route.ts", c, "utf8");

// Update checkout page success screen for card
let ck = fs.readFileSync("app/checkout/page.tsx", "utf8");
if (!ck.includes("paymentMethod === \\\"card\\\"") || !ck.includes("whatsapp para")) {
  ck = ck.replace(
    "GPS enviado com frete gr",
    "\" + (paymentMethod === \"card\" ? \"Entraremos em contato via WhatsApp para finalizar o pagamento com cartao.\" : \"GPS enviado com frete gr"
  );
}
fs.writeFileSync("app/checkout/page.tsx", ck, "utf8");
console.log("[OK] Card flow ajustado");
