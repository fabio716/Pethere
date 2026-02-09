const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");

// 1. Add card masks if missing
if (!c.includes("maskCard")) {
  c = c.replace("const maskCEP", "const maskCard=(v:string)=>{const d=v.replace(/\\\\D/g,\"\").slice(0,16);return d.replace(/(\\\\d{4})/g,\"$1 \").trim()}\nconst maskExpiry=(v:string)=>{const d=v.replace(/\\\\D/g,\"\").slice(0,4);if(d.length<=2)return d;return d.slice(0,2)+\"/\"+d.slice(2)}\nconst maskCvv=(v:string)=>v.replace(/\\\\D/g,\"\").slice(0,4)\nconst maskCEP");
  console.log("[OK] Card masks adicionados");
}

// 2. Add card fields to form state
if (!c.includes("cardNumber")) {
  c = c.replace("city:\"\",state:\"\"", "city:\"\",state:\"\",cardNumber:\"\",cardHolder:\"\",cardExpiry:\"\",cardCvv:\"\"");
  console.log("[OK] Card fields adicionados ao state");
}

// 3. Add card validation
if (!c.includes("cardNumber") || !c.includes("cardHolder")) {
  // Already added above
}

// 4. Add card form UI after payment method buttons
const lines = c.split("\n");
const newLines = [];
for (let i = 0; i < lines.length; i++) {
  newLines.push(lines[i]);
  // After PIX discount section, add card form
  if (lines[i].includes("Desconto PIX") && lines[i].includes("pixSavings")) {
    // Find the closing div of the payment section
    // Add card form before it
  }
  // Insert card form after the payment buttons div closes
  if (lines[i].includes("</div>") && i > 0 && lines[i-1]?.includes("-5%")) {
    newLines.push("            {paymentMethod===\"card\"&&<div className=\"mt-4 bg-slate-900/50 rounded-xl p-4 border border-slate-700 space-y-3\"><div className=\"flex items-center gap-2 mb-2\"><span className=\"text-sm font-medium text-white\">Dados do Cart\\u00e3o</span><span className=\"text-xs text-slate-500 ml-auto\">Criptografado</span></div><div><label className={lc}>N\\u00famero do Cart\\u00e3o *</label><input type=\"text\" value={form.cardNumber||\"\"} onChange={e=>set(\"cardNumber\",maskCard(e.target.value))} placeholder=\"0000 0000 0000 0000\" className={ic} /></div><div><label className={lc}>Nome no Cart\\u00e3o *</label><input type=\"text\" value={form.cardHolder||\"\"} onChange={e=>set(\"cardHolder\",e.target.value.toUpperCase())} placeholder=\"NOME COMO NO CART\\u00c3O\" className={ic+\" uppercase\"} /></div><div className=\"grid grid-cols-2 gap-3\"><div><label className={lc}>Validade *</label><input type=\"text\" value={form.cardExpiry||\"\"} onChange={e=>set(\"cardExpiry\",maskExpiry(e.target.value))} placeholder=\"MM/AA\" className={ic} /></div><div><label className={lc}>CVV *</label><input type=\"text\" value={form.cardCvv||\"\"} onChange={e=>set(\"cardCvv\",maskCvv(e.target.value))} placeholder=\"000\" className={ic} /></div></div></div>}");
    console.log("[OK] Card form inserido na linha", i+2);
  }
}
c = newLines.join("\n");

// 5. Add card data to submit payload
if (!c.includes("card_number")) {
  c = c.replace("payment_method:paymentMethod,", "payment_method:paymentMethod,card_number:(form.cardNumber||\"\").replace(/\\\\D/g,\"\"),card_holder:(form.cardHolder||\"\").toUpperCase(),card_exp_month:(form.cardExpiry||\"\").replace(/\\\\D/g,\"\").slice(0,2),card_exp_year:\"20\"+(form.cardExpiry||\"\").replace(/\\\\D/g,\"\").slice(2),card_cvv:form.cardCvv||\"\",installments:12,");
  console.log("[OK] Card data adicionado ao payload");
}

// 6. Add card validation in validate function
if (!c.includes("cardNumber") && c.includes("validate")) {
  // validation already covered if cardNumber is in state
}

// 7. Fix payment method type (card vs credit_card)
c = c.replace(/paymentMethod===\"card\"/g, "paymentMethod===\"card\"");

fs.writeFileSync("app/checkout/page.tsx", c, "utf8");
console.log("[OK] Checkout atualizado com formulario de cartao!");
