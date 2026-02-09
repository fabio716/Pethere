const fs = require("fs");
let c = fs.readFileSync("app/admin/testimonials/page.tsx", "utf8");

// Fix field names to match Prisma schema
// Prisma: name, role, content, rating, image, active
// My page was using: name, location, text, rating, photoUrl, published

c = c.replace(/location/g, "role");
c = c.replace(/photoUrl/g, "image");
c = c.replace(/\.text/g, ".content");
c = c.replace(/text:/g, "content:");
c = c.replace(/text,/g, "content,");
c = c.replace(/form\.content\.trim/g, "form.content.trim");
c = c.replace(/published/g, "active");

// Fix interface
c = c.replace("role: string\\n  image: string\\n  rating: number\\n  content: string\\n  active: boolean", "role: string\\n  image: string\\n  rating: number\\n  content: string\\n  active: boolean");

// Fix labels
c = c.replace("Localiza", "Cidade / Cargo");
c = c.replace("Publicado no site", "Ativo no site");
c = c.replace("Ativo no Site", "Ativo no Site");

// Fix placeholder
c = c.replace(/S..o Paulo, SP/g, "Tutor do Max, SP");

// Fix depoimento obrigatorios text (content was replaced)
c = c.replace("Nome e depoimento obrigat", "Nome e depoimento obrigat");

fs.writeFileSync("app/admin/testimonials/page.tsx", c, "utf8");
console.log("[OK] Campos corrigidos: location->role, text->content, photoUrl->image, published->active");

// Also fix the API route if it uses wrong fields
let api = fs.readFileSync("app/api/testimonials/route.ts", "utf8");
if (api.includes("photo_url") || api.includes("city")) {
  api = api.replace(/photo_url/g, "image");
  api = api.replace(/city/g, "role");
  api = api.replace(/state/g, "");
  api = api.replace(/quote/g, "content");
  api = api.replace(/published/g, "active");
  fs.writeFileSync("app/api/testimonials/route.ts", api, "utf8");
  console.log("[OK] API testimonials corrigida");
} else {
  console.log("[INFO] API ja usa campos corretos");
}

console.log("Reinicie: npm run dev");
