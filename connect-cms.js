const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");

// 1. Add import
if (!c.includes("useSiteConfig")) {
  c = c.replace("import { useExitIntent }", "import { useSiteConfig } from \"@/hooks/useSiteConfig\"\nimport { useExitIntent }");
  console.log("[OK] Import adicionado");
}

// 2. Add hook call
if (!c.includes("= useSiteConfig()")) {
  c = c.replace("const [showStickyBar", "const { config } = useSiteConfig()\n  const [showStickyBar");
  console.log("[OK] Hook adicionado");
}

// 3. Replace hardcoded values line by line
const lines = c.split("\n");
let fixes = 0;
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];

  // Header company name
  if (L.includes(">Pethere GPS<") && L.includes("font-bold")) {
    lines[i] = L.replace(">Pethere GPS<", ">{config?.companyName || \"Pethere GPS\"}<");
    fixes++; console.log("[OK] companyName conectado (linha "+(i+1)+")");
  }

  // Header CTA
  if (L.includes("RASTREAR MEU PET") && L.includes("button")) {
    lines[i] = L.replace("RASTREAR MEU PET", "{config?.headerCTA || \"RASTREAR MEU PET\"}");
    fixes++; console.log("[OK] headerCTA conectado (linha "+(i+1)+")");
  }

  // Stock units
  if (L.includes("111 unidades")) {
    lines[i] = L.replace("111 unidades", "{config?.offerUnits || 111} unidades");
    fixes++; console.log("[OK] offerUnits conectado (linha "+(i+1)+")");
  }

  // Hero headline
  if (L.includes("Um cafezinho custa")) {
    lines[i] = "                  {config?.heroTitle || \"Proteja quem voc\u00ea ama com a tecnologia que ele merece\"}";
    if (lines[i+1] && lines[i+1].includes("A vida do seu pet")) {
      lines[i+1] = "                ";
    }
    fixes++; console.log("[OK] heroTitle conectado (linha "+(i+1)+")");
  }

  // Hero subtitle
  if (L.includes("arriscar perder seu melhor amigo")) {
    lines[i] = "                  {config?.heroSubtitle || \"Assine o plano de 24 meses e ganhe o Rastreador GPS Pethere de presente!\"}";
    fixes++; console.log("[OK] heroSubtitle conectado (linha "+(i+1)+")");
  }

  // Video ID
  if (L.includes("videoId=\"EcN6NLiqSXk\"")) {
    lines[i] = L.replace("videoId=\"EcN6NLiqSXk\"", "videoId={config?.videoId || \"EcN6NLiqSXk\"}");
    fixes++; console.log("[OK] videoId conectado (linha "+(i+1)+")");
  }

  // CTA buttons with QUERO MEU GPS
  if (L.includes("QUERO") && L.includes("GPS") && L.includes("<span")) {
    lines[i] = L.replace(/>QUERO[^<]*</, ">{config?.heroCTA || \"QUERO MEU GPS GRATIS\"}<");
    fixes++; console.log("[OK] heroCTA conectado (linha "+(i+1)+")");
  }

  // Installment: 12x de R$ 39,90
  if (L.includes("12x de R$ 39,90")) {
    lines[i] = L.replace("12x de R$ 39,90", "{config?.installments || 12}x de R$ {String((config?.installmentValue || 39.90).toFixed(2)).replace(\".\",\",\")}");
    fixes++; console.log("[OK] installments conectado (linha "+(i+1)+")");
  }

  // Sticky bar: 12x R$ 39,90
  if (L.includes("12x R$ 39,90")) {
    lines[i] = L.replace("12x R$ 39,90", "{config?.installments || 12}x R$ {String((config?.installmentValue || 39.90).toFixed(2)).replace(\".\",\",\")}");
    fixes++; console.log("[OK] sticky bar preco conectado (linha "+(i+1)+")");
  }
}

c = lines.join("\n");
fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("\n=== CMS CONECTADO! " + fixes + " campos ligados ===");
console.log("Teste: edite /admin/cms > salve > recarregue /");
