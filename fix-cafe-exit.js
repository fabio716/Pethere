const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");

// FIX 1: Cafe values
const lines = c.split("\n");
let fixes = 0;
for (let i = 0; i < lines.length; i++) {
  // Fix cafe title
  if (lines[i].includes("1 Caf") && lines[i].includes("padaria")) {
    lines[i] = lines[i].replace(/1 Caf[^<]*padaria/, "1 Caf\u00e9 Expresso");
    fixes++; console.log("[OK] Cafe titulo -> Cafe Expresso (linha "+(i+1)+")");
  }
  // Fix cafe price R$ 6,00 -> R$ 7,50
  if (lines[i].includes("R$ 6,00") && lines[i].includes("red")) {
    lines[i] = lines[i].replace("R$ 6,00", "R$ 7,50");
    fixes++; console.log("[OK] Cafe preco -> R$ 7,50 (linha "+(i+1)+")");
  }
  // Fix protection price R$ 6,00 -> R$ 6,50
  if (lines[i].includes("R$ 6,00") && lines[i].includes("green")) {
    lines[i] = lines[i].replace("R$ 6,00", "R$ 6,50");
    fixes++; console.log("[OK] Protecao preco -> R$ 6,50 (linha "+(i+1)+")");
  }
  // Fix headline R$ 0,65 -> match
  if (lines[i].includes("custa R$ 6,00")) {
    lines[i] = lines[i].replace("custa R$ 6,00", "custa R$ 7,50");
    fixes++; console.log("[OK] Headline cafe -> R$ 7,50 (linha "+(i+1)+")");
  }
}
c = lines.join("\n");
fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("[OK]", fixes, "valores corrigidos no comparativo");

// FIX 2: Exit modal layout
if (fs.existsSync("components/ExitIntentModal.tsx")) {
  let exit = fs.readFileSync("components/ExitIntentModal.tsx", "utf8");
  // Ensure proper overlay + centered card
  const elines = exit.split("\n");
  for (let i = 0; i < elines.length; i++) {
    // Fix the outer container to be properly centered
    if (elines[i].includes("fixed") && elines[i].includes("inset-0") && !elines[i].includes("items-center justify-center")) {
      elines[i] = elines[i].replace(/fixed\s+inset-0([^"]*)"/, "fixed inset-0 flex items-center justify-center bg-black/60 p-4\"");
      console.log("[OK] Exit modal container centralizado (linha "+(i+1)+")");
    }
    // Ensure the card has max width
    if (elines[i].includes("bg-red") && elines[i].includes("rounded") && !elines[i].includes("max-w")) {
      elines[i] = elines[i].replace(/className="([^"]*)"/, (m, cls) => {
        return "className=\"" + cls + " max-w-md w-full mx-auto\"";
      });
      console.log("[OK] Exit modal card com max-w-md (linha "+(i+1)+")");
    }
  }
  exit = elines.join("\n");
  fs.writeFileSync("components/ExitIntentModal.tsx", exit, "utf8");
  console.log("[OK] ExitIntentModal layout corrigido");
}
