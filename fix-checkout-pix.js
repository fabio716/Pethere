const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");
const lines = c.split("\n");

// Remove the broken line (72-73)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Pedido #{orderId}") && lines[i].includes("\"")){
    // Fix line 72: remove trailing quote
    lines[i] = "        <p className=\"text-slate-400 mb-4\">Pedido #{orderId}</p>";
    console.log("[OK] Linha", i+1, "corrigida");
  }
  if (lines[i].includes("pixCode && <div className=\\\\")) {
    // Replace broken line with clean JSX
    lines[i] = "        {pixCode && <div className=\"bg-slate-900 rounded-xl p-4 my-4 border border-slate-700 text-center\"><p className=\"text-xs text-slate-400 mb-2\">Copie o codigo PIX:</p><div className=\"bg-slate-800 p-3 rounded-lg text-xs text-green-400 font-mono break-all\">{pixCode}</div></div>}";
    console.log("[OK] Linha", i+1, "PIX display corrigido");
  }
}
c = lines.join("\n");
fs.writeFileSync("app/checkout/page.tsx", c, "utf8");
console.log("[OK] Checkout corrigido");
