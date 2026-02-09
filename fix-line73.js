const fs = require("fs");
const lines = fs.readFileSync("app/checkout/page.tsx", "utf8").split("\n");
const clean = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith("\"") && lines[i].includes("pixCode")) {
    console.log("[REMOVIDA] Linha", i+1);
    continue;
  }
  if (lines[i].includes("Pedido #{orderId}") && !lines[i+1]?.includes("pixCode &&")) {
    clean.push(lines[i]);
    clean.push("        {pixCode && <div className=\"bg-slate-900 rounded-xl p-4 my-4 border border-slate-700\"><p className=\"text-xs text-slate-400 mb-2\">Copie o codigo PIX:</p><div className=\"bg-slate-800 p-3 rounded text-xs text-green-400 font-mono break-all\">{pixCode}</div></div>}");
    console.log("[INSERIDA] PIX display apos linha", i+1);
    continue;
  }
  clean.push(lines[i]);
}
fs.writeFileSync("app/checkout/page.tsx", clean.join("\n"), "utf8");
console.log("[OK] Total:", clean.length, "linhas");
