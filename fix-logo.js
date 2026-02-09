const fs = require("fs");
const p = require("path");

// Fix Logo API
const logo = [
  "import { NextResponse } from \"next/server\"",
  "import { writeFile, mkdir } from \"fs/promises\"",
  "import { existsSync } from \"fs\"",
  "import path from \"path\"",
  "import { prisma } from \"@/lib/prisma\"",
  "",
  "export async function GET() {",
  "  try {",
  "    const config = await prisma.siteConfig.findFirst()",
  "    return NextResponse.json({ success: true, logoUrl: config?.companyLogo || null })",
  "  } catch { return NextResponse.json({ success: true, logoUrl: null }) }",
  "}",
  "",
  "export async function POST(request: Request) {",
  "  try {",
  "    const formData = await request.formData()",
  "    const file = formData.get(\"logo\") as File",
  "    if (!file) return NextResponse.json({ success: false, error: \"Nenhum arquivo\" }, { status: 400 })",
  "    const uploadsDir = path.join(process.cwd(), \"public\", \"uploads\")",
  "    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true })",
  "    const bytes = await file.arrayBuffer()",
  "    const buffer = Buffer.from(bytes)",
  "    const filename = \"logo-\" + Date.now() + path.extname(file.name)",
  "    await writeFile(path.join(uploadsDir, filename), buffer)",
  "    const logoUrl = \"/uploads/\" + filename",
  "    const config = await prisma.siteConfig.findFirst()",
  "    if (config) await prisma.siteConfig.update({ where: { id: config.id }, data: { companyLogo: logoUrl } })",
  "    return NextResponse.json({ success: true, logoUrl })",
  "  } catch (error) {",
  "    console.error(\"Erro:\", error)",
  "    return NextResponse.json({ success: false, error: \"Erro no upload\" }, { status: 500 })",
  "  }",
  "}"
].join("\n");
fs.writeFileSync("app/api/settings/logo/route.ts", logo, "utf8");
console.log("[OK] Logo API salva no banco");

// Create upload API
const dir = "app/api/upload";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const upload = [
  "import { NextResponse } from \"next/server\"",
  "import { writeFile, mkdir } from \"fs/promises\"",
  "import { existsSync } from \"fs\"",
  "import path from \"path\"",
  "",
  "export async function POST(request: Request) {",
  "  try {",
  "    const formData = await request.formData()",
  "    const file = formData.get(\"file\") as File",
  "    if (!file) return NextResponse.json({ error: \"Nenhum arquivo\" }, { status: 400 })",
  "    const uploadsDir = path.join(process.cwd(), \"public\", \"uploads\")",
  "    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true })",
  "    const bytes = await file.arrayBuffer()",
  "    const buffer = Buffer.from(bytes)",
  "    const ext = path.extname(file.name) || \".jpg\"",
  "    const filename = \"img-\" + Date.now() + ext",
  "    await writeFile(path.join(uploadsDir, filename), buffer)",
  "    return NextResponse.json({ success: true, url: \"/uploads/\" + filename })",
  "  } catch (error) {",
  "    console.error(\"Upload error:\", error)",
  "    return NextResponse.json({ error: \"Falha\" }, { status: 500 })",
  "  }",
  "}"
].join("\n");
fs.writeFileSync("app/api/upload/route.ts", upload, "utf8");
console.log("[OK] API /api/upload criada");
