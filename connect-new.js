const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");
let fixes = 0;

const lines = c.split("\n");
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];

  // Testimonials title
  if (L.includes("Mais de 5.000 Pets Protegidos")) {
    lines[i] = L.replace("Mais de 5.000 Pets Protegidos", "{config?.testimonialsTitle || \"Mais de 5.000 Pets Protegidos\"}");
    fixes++; console.log("[OK] testimonialsTitle (linha "+(i+1)+")");
  }

  // Testimonials subtitle
  if (L.includes("Veja o que nossos clientes dizem")) {
    lines[i] = L.replace("Veja o que nossos clientes dizem", "{config?.testimonialsSubtitle || \"Veja o que nossos clientes dizem\"}");
    fixes++; console.log("[OK] testimonialsSubtitle (linha "+(i+1)+")");
  }

  // Kit items - [FOTO REAL DO KIT AQUI]
  if (L.includes("[FOTO REAL DO KIT AQUI]")) {
    lines[i] = L.replace("[FOTO REAL DO KIT AQUI]", "{config?.kitImage ? \"\" : \"[FOTO REAL DO KIT AQUI]\"}");
    fixes++; console.log("[OK] kitImage placeholder (linha "+(i+1)+")");
  }

  // Kit item replacements
  if (L.includes("1x Rastreador GPS G2 (IP67)") && !L.includes("config")) {
    lines[i] = L.replace("1x Rastreador GPS G2 (IP67)", "{config?.kitItem1 || \"1x Rastreador GPS G2 (IP67)\"}");
    fixes++; console.log("[OK] kitItem1 (linha "+(i+1)+")");
  }
  if (L.includes("1x Cabo Magn") && !L.includes("config")) {
    lines[i] = L.replace(/1x Cabo[^<"]+/, "{config?.kitItem2 || \"1x Cabo Magnetico USB-C\"}");
    fixes++; console.log("[OK] kitItem2 (linha "+(i+1)+")");
  }
  if (L.includes("1x Manual em Portugu") && !L.includes("config")) {
    lines[i] = L.replace(/1x Manual[^<"]+/, "{config?.kitItem3 || \"1x Manual em Portugues\"}");
    fixes++; console.log("[OK] kitItem3 (linha "+(i+1)+")");
  }
  if (L.includes("1x Certificado de Garantia") && !L.includes("config")) {
    lines[i] = L.replace(/1x Certificado[^<"]+/, "{config?.kitItem4 || \"1x Certificado de Garantia 24 Meses\"}");
    fixes++; console.log("[OK] kitItem4 (linha "+(i+1)+")");
  }
  if (L.includes("1x Adesivos Pethere") && !L.includes("config")) {
    lines[i] = L.replace("1x Adesivos Pethere", "{config?.kitItem5 || \"1x Adesivos Pethere\"}");
    fixes++; console.log("[OK] kitItem5 (linha "+(i+1)+")");
  }

  // Como Funciona title
  if (L.includes("Como Funciona o Pethere GPS") && L.includes("className")) {
    lines[i] = L.replace("Como Funciona o Pethere GPS", "{config?.howTitle || \"Como Funciona o Pethere GPS\"}");
    fixes++; console.log("[OK] howTitle (linha "+(i+1)+")");
  }

  // Como Funciona steps
  if (L.includes("Receba em Casa") && !L.includes("config")) {
    lines[i] = L.replace("Receba em Casa", "{config?.howStep1Title || \"Receba em Casa\"}");
    fixes++; console.log("[OK] howStep1Title (linha "+(i+1)+")");
  }
  if (L.includes("Configure em 2 Min") && !L.includes("config")) {
    lines[i] = L.replace("Configure em 2 Min", "{config?.howStep2Title || \"Configure em 2 Min\"}");
    fixes++; console.log("[OK] howStep2Title (linha "+(i+1)+")");
  }
  if (L.includes("Rastreie em Tempo Real") && !L.includes("config")) {
    lines[i] = L.replace("Rastreie em Tempo Real", "{config?.howStep3Title || \"Rastreie em Tempo Real\"}");
    fixes++; console.log("[OK] howStep3Title (linha "+(i+1)+")");
  }
}

c = lines.join("\n");
fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("\n=== " + fixes + " campos conectados ao CMS ===");
