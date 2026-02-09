const fs = require("fs");
let c = fs.readFileSync("app/admin/banners/page.tsx", "utf8");

// Add upload handler function
if (!c.includes("handleImageUpload")) {
  const fn = "const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {\n    const file = e.target.files?.[0]\n    if (!file) return\n    const fd = new FormData()\n    fd.append(\"file\", file)\n    try {\n      const res = await fetch(\"/api/upload\", { method: \"POST\", body: fd })\n      const data = await res.json()\n      if (data.url) setEditingBanner((prev: any) => ({ ...prev, imageUrl: data.url }))\n    } catch { alert(\"Erro no upload\") }\n  }\n\n  ";
  c = c.replace("const fetchBanners = async", fn + "const fetchBanners = async");
  console.log("[OK] Funcao handleImageUpload adicionada");
}

// Add file input before URL field
if (!c.includes("type=\"file\"")) {
  const uploadInput = "<div className=\"mb-3\"><label className=\"block text-sm font-medium text-white mb-2\">Upload de Imagem</label><input type=\"file\" accept=\"image/*\" onChange={handleImageUpload} className=\"w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-medium hover:file:bg-green-500 file:cursor-pointer\" /></div>\n              ";
  const lines = c.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("URL da Imagem")) {
      lines[i] = "              " + uploadInput + lines[i].trim();
      lines[i] = lines[i].replace("URL da Imagem *", "URL da Imagem (ou use upload acima)");
      console.log("[OK] Upload input adicionado antes da URL (linha " + (i+1) + ")");
      break;
    }
  }
  c = lines.join("\n");
}

fs.writeFileSync("app/admin/banners/page.tsx", c, "utf8");
console.log("[OK] Banner admin atualizado!");
