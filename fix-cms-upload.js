const fs = require("fs");
let c = fs.readFileSync("app/admin/cms/page.tsx", "utf8");

// Ensure ImageUpload is imported
if (!c.includes("ImageUpload")) {
  c = c.replace("import { Save", "import ImageUpload from \"@/components/ImageUpload\"\nimport { Save");
  console.log("[OK] Import adicionado");
}

// Replace Kit image field
const lines = c.split("\n");
for (let i = 0; i < lines.length; i++) {
  // Kit image: "Imagem do Kit (URL)" input
  if (lines[i].includes("kitImage") && lines[i].includes("register") && lines[i].includes("Input")) {
    lines[i] = "              <ImageUpload value={watch(\"kitImage\")||\"\"} onChange={(url)=>setValue(\"kitImage\",url)} label=\"Imagem do Kit\" />";
    // Remove label line above if exists
    if (lines[i-1] && lines[i-1].includes("Imagem do Kit")) lines[i-1] = "";
    console.log("[OK] kitImage -> ImageUpload (linha "+(i+1)+")");
  }

  // Gallery image fields (gallery1Image, gallery2Image, etc)
  if (lines[i].includes("gallery") && lines[i].includes("Image") && lines[i].includes("register") && lines[i].includes("Input")) {
    // Extract the field name like gallery1Image
    const match = lines[i].match(/gallery(\d)Image/);
    if (match) {
      const n = match[1];
      lines[i] = "                    <ImageUpload value={watch(\"gallery\"+n+\"Image\")||\"\"} onChange={(url)=>setValue(\"gallery\"+n+\"Image\" as any,url)} label=\"Imagem Card \"+n />";
      // Fix: use literal n value instead of variable
      lines[i] = lines[i].replace(/\+n\+/g, "+"+n+"+").replace("\"gallery\"+"+n+"+\"Image\"", "\"gallery"+n+"Image\"").replace("\"gallery\"+"+n+"+\"Image\"", "\"gallery"+n+"Image\"").replace("\"Imagem Card \"+"+n, "\"Imagem Card "+n+"\"");
      console.log("[OK] gallery"+n+"Image -> ImageUpload (linha "+(i+1)+")");
      // Remove label above
      if (lines[i-1] && lines[i-1].includes("URL Imagem")) lines[i-1] = "";
    }
  }
}
c = lines.join("\n");
fs.writeFileSync("app/admin/cms/page.tsx", c, "utf8");
console.log("[OK] CMS atualizado com ImageUpload nos campos de imagem");
