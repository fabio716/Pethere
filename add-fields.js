const fs = require("fs");
let schema = fs.readFileSync("prisma/schema.prisma", "utf8");

// Check if fields already exist
if (schema.includes("kitImage")) {
  console.log("[INFO] Campos ja existem"); process.exit(0);
}

// Add new fields before createdAt in SiteConfig
const newFields = [
  "",
  "  // Kit / Conteudo do Pacote",
  "  kitImage        String @default(\"/product.jpg\")",
  "  kitItem1        String @default(\"1x Rastreador GPS G2 (IP67)\")",
  "  kitItem2        String @default(\"1x Cabo Magn\u00e9tico USB-C\")",
  "  kitItem3        String @default(\"1x Manual em Portugu\u00eas\")",
  "  kitItem4        String @default(\"1x Certificado de Garantia 24 Meses\")",
  "  kitItem5        String @default(\"1x Adesivos Pethere\")",
  "",
  "  // Depoimentos",
  "  testimonialsTitle    String @default(\"Mais de 5.000 Pets Protegidos\")",
  "  testimonialsSubtitle String @default(\"Veja o que nossos clientes dizem\")",
  "",
  "  // Como Funciona",
  "  howTitle        String @default(\"Como Funciona o Pethere GPS\")",
  "  howStep1Icon    String @default(\"Package\")",
  "  howStep1Title   String @default(\"Receba em Casa\")",
  "  howStep1Desc    String @default(\"Frete Gr\u00e1tis + Caixa Premium\")",
  "  howStep2Icon    String @default(\"Smartphone\")",
  "  howStep2Title   String @default(\"Configure em 2 Min\")",
  "  howStep2Desc    String @default(\"App + QR Code\")",
  "  howStep3Icon    String @default(\"MapPin\")",
  "  howStep3Title   String @default(\"Rastreie em Tempo Real\")",
  "  howStep3Desc    String @default(\"GPS 4G + Cerca Virtual\")",
  "",
  "  // Evidence Gallery",
  "  gallery1Title   String @default(\"Teste de Resist\u00eancia \u00e0 \u00c1gua\")",
  "  gallery1Desc    String @default(\"Certifica\u00e7\u00e3o IP67\")",
  "  gallery1Image   String @default(\"\")",
  "  gallery1Video   String @default(\"\")",
  "  gallery2Title   String @default(\"Precis\u00e3o do Mapa\")",
  "  gallery2Desc    String @default(\"GPS 4G multi-operadora\")",
  "  gallery2Image   String @default(\"\")",
  "  gallery2Video   String @default(\"\")",
  "  gallery3Title   String @default(\"Tamanho Compacto\")",
  "  gallery3Desc    String @default(\"Menor que uma moeda\")",
  "  gallery3Image   String @default(\"\")",
  "  gallery3Video   String @default(\"\")",
  "  gallery4Title   String @default(\"Pet Confort\u00e1vel\")",
  "  gallery4Desc    String @default(\"Design ergon\u00f4mico\")",
  "  gallery4Image   String @default(\"\")",
  "  gallery4Video   String @default(\"\")",
].join("\\n");

schema = schema.replace("  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}", newFields + "\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}");

// Handle CRLF
if (schema.indexOf("  createdAt DateTime @default(now())\r\n") !== -1) {
  schema = schema.replace("  createdAt DateTime @default(now())\r\n  updatedAt DateTime @updatedAt\r\n}", newFields.replace(/\\n/g, "\r\n") + "\r\n\r\n  createdAt DateTime @default(now())\r\n  updatedAt DateTime @updatedAt\r\n}");
}

fs.writeFileSync("prisma/schema.prisma", schema, "utf8");
console.log("[OK] Schema atualizado com novos campos");
console.log("Rode: npx prisma db push");
