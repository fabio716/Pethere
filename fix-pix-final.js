const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");
const lines = c.split("\n");
let fixed = 0;
for (let i = 0; i < lines.length; i++) {
  // Find the setStep success line and ensure pixQrCode is captured
  if (lines[i].includes("setStep(\"success\")") && !lines[i-1]?.includes("pixQrCode")) {
    lines.splice(i, 0, "    if(data.pixQrCode)setPixCode(data.pixQrCode)");
    fixed++;
    break;
  }
}

// Add pixCode state if missing
c = lines.join("\n");
if (!c.includes("pixCode") || !c.includes("setPixCode")) {
  c = c.replace("const [orderId, setOrderId] = useState(\"\")", "const [orderId, setOrderId] = useState(\"\")\n  const [pixCode, setPixCode] = useState(\"\")");
  fixed++;
}

// Add QR code display in success screen
if (!c.includes("pixCode") || !c.includes("QR Code PIX")) {
  c = c.replace("Pedido #{orderId}</p>", "Pedido #{orderId}</p>\"\n\"        {pixCode && <div className=\\\"bg-slate-900 rounded-xl p-4 my-4 border border-slate-700 text-center\\\"><p className=\\\"text-xs text-slate-400 mb-2\\\">QR Code PIX:</p><img src={\\\"https://api.pagar.me/core/v5/transactions/\\\"+orderId+\\\"/qrcode?payment_method=pix\\\"} alt=\\\"QR Code\\\" className=\\\"mx-auto w-48 h-48 bg-white rounded-lg p-2\\\" /><p className=\\\"text-xs text-green-400 mt-2 font-mono break-all\\\">{pixCode}</p></div>}");
  fixed++;
}

fs.writeFileSync("app/checkout/page.tsx", c, "utf8");
console.log("[OK]", fixed, "fixes aplicados para exibir PIX QR Code");
