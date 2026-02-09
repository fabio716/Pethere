const fs = require("fs");
let c = fs.readFileSync("lib/pagarme.ts", "utf8");

// Rewrite with address support
const code = [
"const PAGARME_SECRET = process.env.PAGARME_SECRET_KEY || \"\"",
"const PAGARME_URL = \"https://api.pagar.me/core/v5\"","",
"function getAuth() { return \"Basic \" + Buffer.from(PAGARME_SECRET + \":\").toString(\"base64\") }","",
"interface CustomerData {",
"  name: string; email: string; phone: string; document: string",
"  address: string; city: string; state: string; cep: string; number: string; neighborhood: string",
"  amount: number; orderId: string; installments?: number",
"}","",
"function buildCustomer(data: CustomerData) {",
"  const phone = data.phone.replace(/\\D/g, \"\")",
"  return {",
"    name: data.name,",
"    email: data.email,",
"    type: \"individual\" as const,",
"    document: data.document.replace(/\\D/g, \"\"),",
"    document_type: \"CPF\" as const,",
"    phones: { mobile_phone: { country_code: \"55\", area_code: phone.slice(0,2), number: phone.slice(2) } },",
"    address: {",
"      country: \"BR\",",
"      state: data.state,",
"      city: data.city,",
"      neighborhood: data.neighborhood || \"Centro\",",
"      street: data.address,",
"      street_number: data.number || \"SN\",",
"      zip_code: data.cep.replace(/\\D/g, \"\")",
"    }",
"  }",
"}","",
"export async function createPixOrder(data: CustomerData) {",
"  const body = {",
"    items: [{ amount: data.amount, description: \"Pethere GPS + Plano 24 meses\", quantity: 1, code: \"GPS-G2\" }],",
"    customer: buildCustomer(data),",
"    payments: [{",
"      payment_method: \"pix\",",
"      pix: { expires_in: 900, additional_information: [{ name: \"Pedido\", value: data.orderId }] }",
"    }],",
"    metadata: { order_id: data.orderId }",
"  }",
"  try {",
"    const res = await fetch(PAGARME_URL + \"/orders\", {",
"      method: \"POST\",",
"      headers: { \"Content-Type\": \"application/json\", \"Authorization\": getAuth() },",
"      body: JSON.stringify(body)",
"    })",
"    const result = await res.json()",
"    console.log(\"[Pagar.me PIX]\", res.status, JSON.stringify(result).substring(0,200))",
"    if (!res.ok) return { success: false, error: result.message || JSON.stringify(result.errors || result) }",
"    const charge = result.charges?.[0]",
"    const tx = charge?.last_transaction",
"    return { success: true, orderId: result.id, status: result.status, pixQrCode: tx?.qr_code, pixQrCodeUrl: tx?.qr_code_url, pixExpiresAt: tx?.expires_at }",
"  } catch (err: any) { return { success: false, error: err.message } }",
"}","",
"export async function createCardOrder(data: CustomerData) {",
"  const body = {",
"    items: [{ amount: data.amount, description: \"Pethere GPS + Plano 24 meses\", quantity: 1, code: \"GPS-G2\" }],",
"    customer: buildCustomer(data),",
"    payments: [{ payment_method: \"credit_card\", credit_card: { installments: data.installments || 12, statement_descriptor: \"PETHERE\" } }],",
"    metadata: { order_id: data.orderId }",
"  }",
"  try {",
"    const res = await fetch(PAGARME_URL + \"/orders\", {",
"      method: \"POST\",",
"      headers: { \"Content-Type\": \"application/json\", \"Authorization\": getAuth() },",
"      body: JSON.stringify(body)",
"    })",
"    const result = await res.json()",
"    if (!res.ok) return { success: false, error: result.message || JSON.stringify(result.errors || result) }",
"    return { success: true, orderId: result.id, status: result.status }",
"  } catch (err: any) { return { success: false, error: err.message } }",
"}","",
"export async function getOrder(orderId: string) {",
"  const res = await fetch(PAGARME_URL + \"/orders/\" + orderId, { headers: { Authorization: getAuth() } })",
"  if (!res.ok) return null",
"  return res.json()",
"}"
].join("\n");
fs.writeFileSync("lib/pagarme.ts", code, "utf8");
console.log("[OK] Pagar.me V5 com endereco completo + log de debug");

// Also update checkout/create to pass address
let ck = fs.readFileSync("app/api/checkout/create/route.ts", "utf8");
if (!ck.includes("city:") || !ck.includes("cep:")) {
  ck = ck.replace("phone: whatsapp, document, amount: amountCents, orderId: order.id }", "phone: whatsapp, document, amount: amountCents, orderId: order.id, address: address || \"\", city: city || \"\", state: state || \"\", cep: cep || \"\", number: number || \"\", neighborhood: neighborhood || \"\" }");
  ck = ck.replace("phone: whatsapp, document, amount: amountCents, installments: 12, orderId: order.id }", "phone: whatsapp, document, amount: amountCents, installments: 12, orderId: order.id, address: address || \"\", city: city || \"\", state: state || \"\", cep: cep || \"\", number: number || \"\", neighborhood: neighborhood || \"\" }");
  fs.writeFileSync("app/api/checkout/create/route.ts", ck, "utf8");
  console.log("[OK] checkout/create passa endereco para Pagar.me");
}
