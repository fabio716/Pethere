const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");
let fixes = 0;
const lines = c.split("\n");

for (let i = 0; i < lines.length; i++) {
  const L = lines[i];

  // === TABELA ANCORAGEM ===
  if (L.includes("78%") && L.includes("ECONOMIZA") && !L.includes("config")) {
    lines[i] = L.replace("78%", "{config?.discountPercentage || 78}%");
    fixes++;
  }
  if (L.includes("2.150,20") && !L.includes("config")) {
    lines[i] = L.replace("2.150,20", "{(config?.normalPrice || 2150.20).toLocaleString(\"pt-BR\",{minimumFractionDigits:2})}");
    fixes++;
  }
  if (L.includes("1.671,40") && !L.includes("config")) {
    lines[i] = L.replace("1.671,40", "{(config?.savings || 1671.40).toLocaleString(\"pt-BR\",{minimumFractionDigits:2})}");
    fixes++;
  }
  if (L.includes("478,80") && !L.includes("config")) {
    lines[i] = L.replace("478,80", "{(config?.promotionPrice || 478.80).toLocaleString(\"pt-BR\",{minimumFractionDigits:2})}");
    fixes++;
  }

  // === FEATURES ===
  if (L.includes("Rastreamento em Tempo Real") && !L.includes("config")) { lines[i] = L.replace("Rastreamento em Tempo Real", "{config?.feature1Title || \"Rastreamento em Tempo Real\"}"); fixes++; }
  if (L.includes("Acompanhe seu pet 24") && !L.includes("config")) { lines[i] = L.replace(/Acompanhe seu pet 24[^"<]*/, "{config?.feature1Desc || \"Acompanhe seu pet 24/7\"}"); fixes++; }
  if (L.includes("Bateria de 7 Dias") && !L.includes("config") && !L.includes("Longa")) { lines[i] = L.replace("Bateria de 7 Dias", "{config?.feature2Title || \"Bateria de 7 Dias\"}"); fixes++; }

  // === GUARANTEES ===
  if (L.includes("Garantia de 24 meses") && L.includes("className") && !L.includes("config")) { lines[i] = L.replace("Garantia de 24 meses", "{config?.guarantee1 || \"Garantia de 24 meses\"}"); fixes++; }
  if (L.includes("Entrega em todo Brasil") && !L.includes("config")) { lines[i] = L.replace("Entrega em todo Brasil", "{config?.guarantee2 || \"Entrega em todo Brasil\"}"); fixes++; }
  if (L.includes("Suporte 24/7") && !L.includes("config")) { lines[i] = L.replace("Suporte 24/7", "{config?.guarantee3 || \"Suporte 24/7\"}"); fixes++; }

  // === CTA FINAL ===
  if (L.includes("GARANTIR MEU GPS AGORA") && !L.includes("config")) { lines[i] = L.replace("GARANTIR MEU GPS AGORA", "{config?.finalCTA || \"GARANTIR MEU GPS AGORA\"}"); fixes++; }
  if (L.includes("ltimas unidades com frete") && !L.includes("config")) { lines[i] = L.replace(/[UÚú]ltimas unidades[^"<]*/, "{config?.finalText || \"Ultimas unidades com frete gratis!\"}"); fixes++; }

  // === FOOTER ===
  if (L.includes("Especialistas em rastreamento") && !L.includes("config")) { lines[i] = L.replace(/Especialistas em rastreamento[^"<]*/, "{config?.footerAbout || \"Especialistas em rastreamento GPS\"}"); fixes++; }
  if (L.includes("05.325.823") && !L.includes("config")) { lines[i] = L.replace("05.325.823/0001-00", "{config?.footerCNPJ || \"05.325.823/0001-00\"}"); fixes++; }
  if (L.includes("99984-1451") && !L.includes("config")) { lines[i] = L.replace("(43) 99984-1451", "{config?.footerPhone || \"(43) 99984-1451\"}"); fixes++; }
  if (L.includes("contato@pethere") && !L.includes("config")) { lines[i] = L.replace("contato@pethere.com.br", "{config?.footerEmail || \"contato@pethere.com.br\"}"); fixes++; }
  if (L.includes("Cambar") && L.includes("Brasil") && !L.includes("config")) { lines[i] = L.replace(/Cambar[^"<]*Brasil/, "{config?.footerAddress || \"Cambara, PR - Brasil\"}"); fixes++; }
}

c = lines.join("\n");
fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("[OK]", fixes, "campos conectados ao CMS");

// === ADD revalidatePath to site-config API ===
let api = fs.readFileSync("app/api/site-config/route.ts", "utf8");
if (!api.includes("revalidatePath")) {
  api = api.replace("import { NextRequest", "import { revalidatePath } from \"next/cache\"\nimport { NextRequest");
  api = api.replace("return NextResponse.json(updated)", "revalidatePath(\"/\")\n    return NextResponse.json(updated)");
  fs.writeFileSync("app/api/site-config/route.ts", api, "utf8");
  console.log("[OK] revalidatePath(\"/\") adicionado na API site-config");
} else { console.log("[OK] revalidatePath ja existe"); }

console.log("\n=== WIRING COMPLETO ===");
console.log("Admin salva -> Banco atualiza -> Landing page reflete");
