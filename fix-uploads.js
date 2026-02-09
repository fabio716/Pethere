const fs = require("fs");

// === FIX 1: Logo API - salvar no banco ===
const logoApi = [
  "import { NextResponse } from \"next/server\"","import { writeFile, mkdir } from \"fs/promises\"","import { existsSync } from \"fs\"","import path from \"path\"","import { prisma } from \"@/lib/prisma\"","",
  "export async function GET() {","  try {","    const config = await prisma.siteConfig.findFirst()","    return NextResponse.json({ success: true, logoUrl: config?.companyLogo || null })","  } catch { return NextResponse.json({ success: true, logoUrl: null }) }","}","",
  "export async function POST(request: Request) {","  try {","    const formData = await request.formData()","    const file = formData.get(\"logo\") as File","    if (!file) return NextResponse.json({ success: false, error: \"Nenhum arquivo enviado\" }, { status: 400 })","",
  "    const uploadsDir = path.join(process.cwd(), \"public\", \"uploads\")","    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true })","",
  "    const bytes = await file.arrayBuffer()","    const buffer = Buffer.from(bytes)","    const filename = \"logo-\" + Date.now() + path.extname(file.name)","    await writeFile(path.join(uploadsDir, filename), buffer)","",
  "    const logoUrl = \"/uploads/\" + filename","",
  "    // Salvar no banco","    const config = await prisma.siteConfig.findFirst()","    if (config) {","      await prisma.siteConfig.update({ where: { id: config.id }, data: { companyLogo: logoUrl } })","    }","",
  "    return NextResponse.json({ success: true, logoUrl })","  } catch (error) {","    console.error(\"Erro no upload:\", error)","    return NextResponse.json({ success: false, error: \"Erro ao fazer upload\" }, { status: 500 })","  }","}"
].join("\n");
fs.writeFileSync("app/api/settings/logo/route.ts", logoApi, "utf8");
console.log("[OK] Logo API agora salva no banco (SiteConfig.companyLogo)");

// === FIX 2: Criar API de upload geral ===
const uploadDir = "app/api/upload";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const uploadApi = [
  "import { NextResponse } from \"next/server\"","import { writeFile, mkdir } from \"fs/promises\"","import { existsSync } from \"fs\"","import path from \"path\"","",
  "export async function POST(request: Request) {","  try {","    const formData = await request.formData()","    const file = formData.get(\"file\") as File","    if (!file) return NextResponse.json({ error: \"Nenhum arquivo\" }, { status: 400 })","",
  "    const uploadsDir = path.join(process.cwd(), \"public\", \"uploads\")","    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true })","",
  "    const bytes = await file.arrayBuffer()","    const buffer = Buffer.from(bytes)","    const ext = path.extname(file.name) || \".jpg\"","    const filename = \"img-\" + Date.now() + ext","    await writeFile(path.join(uploadsDir, filename), buffer)","",
  "    return NextResponse.json({ success: true, url: \"/uploads/\" + filename })","  } catch (error) {","    console.error(\"Upload error:\", error)","    return NextResponse.json({ error: \"Falha no upload\" }, { status: 500 })","  }","}"
].join("\n");
fs.writeFileSync("app/api/upload/route.ts", uploadApi, "utf8");
console.log("[OK] API /api/upload criada");

// === FIX 3: Adicionar upload de imagem no admin de banners ===
let banners = fs.readFileSync("app/admin/banners/page.tsx", "utf8");
if (!banners.includes("handleImageUpload")) {
  // Add upload function before fetchBanners
  banners = banners.replace(
    "const fetchBanners = async",
    "const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {\\n    const file = e.target.files?.[0]\\n    if (!file) return\\n    const formData = new FormData()\\n    formData.append(\"file\", file)\\n    try {\\n      const res = await fetch(\"/api/upload\", { method: \"POST\", body: formData })\\n      const data = await res.json()\\n      if (data.url) setEditingBanner({ ...editingBanner, imageUrl: data.url })\\n    } catch { alert(\"Erro no upload\") }\\n  }\\n\\n  const fetchBanners = async"
  );

  // Add upload button before URL input
  banners = banners.replace(
    "<Label htmlFor=\\"imageUrl\\"","
    "<div className=\\"mb-3\\"><label className=\\"block text-sm font-medium text-white mb-2\\">Upload de Imagem</label><input type=\\"file\\" accept=\\"image/*\\" onChange={handleImageUpload} className=\\"w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-medium hover:file:bg-green-500 file:cursor-pointer\\" /></div>\\n              <Label htmlFor=\\"imageUrl\\""
  );

  // Change URL label to show its optional
  banners = banners.replace("URL da Imagem *", "URL da Imagem (ou use upload acima)");

  fs.writeFileSync("app/admin/banners/page.tsx", banners, "utf8");
  console.log("[OK] Banner admin agora tem upload de imagem");
} else {
  console.log("[INFO] Banner upload ja existe");
}

console.log("\\n=== UPLOADS CORRIGIDOS ===");
console.log("1. Logo: salva no banco permanentemente");
console.log("2. /api/upload: endpoint geral para qualquer imagem");
console.log("3. Banners: botao de upload + campo URL");
