Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CORRIGIR BOM E RECRIAR BANCO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. BACKUP
Write-Host "[1/6] Fazendo backup..." -ForegroundColor Yellow
Copy-Item "prisma\schema.prisma" "prisma\schema.prisma.bom_backup" -Force
Copy-Item "prisma\dev.db" "prisma\dev.db.backup" -Force
Write-Host "[OK] Backup criado!" -ForegroundColor Green
Write-Host ""

# 2. CRIAR SCHEMA SEM BOM
Write-Host "[2/6] Criando schema.prisma sem BOM..." -ForegroundColor Yellow

$schema = 'generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id            String      @id @default(cuid())
  name          String
  description   String
  price         Float
  originalPrice Float
  stock         Int
  totalStock    Int
  images        String
  videoUrl      String?
  features      String
  active        Boolean     @default(true)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  orders        OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  customerName    String
  customerEmail   String
  customerPhone   String
  customerState   String?
  customerCPF     String
  shippingAddress String
  items           OrderItem[]
  subtotal        Float
  shipping        Float
  total           Float
  paymentMethod   String
  paymentStatus   String
  paymentId       String?
  status          String      @default("pending")
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

model Media {
  id        String   @id @default(cuid())
  url       String
  type      String
  name      String
  alt       String?
  createdAt DateTime @default(now())
}

model Content {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  type      String
  updatedAt DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String
  content   String
  rating    Int      @default(5)
  image     String?
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("testimonials")
}

model Settings {
  id             String   @id @default(cuid())
  whatsappNumber String?
  emailContact   String?
  videoYoutubeId String?
  stockAlert     Int      @default(10)
  pagarmeApiKey  String?
  getnetSellerId String?
  updatedAt      DateTime @updatedAt
}

model Lead {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  phone     String?
  source    String   @default("exit_intent")
  lastSeen  DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteConfig {
  id        String   @id @default(cuid())
  
  companyName String @default("Pethere GPS")
  companyLogo String @default("/logo.png")
  headerCTA   String @default("RASTREAR MEU PET")
  
  heroTitle     String @default("Proteja quem voce ama com a tecnologia que ele merece")
  heroSubtitle  String @default("Assine o plano de 24 meses e receba o aparelho GPS + App Premium completamente GRATIS")
  heroHighlight String @default("merece")
  heroCTA       String @default("QUERO MEU GPS GRATIS")
  heroImage     String @default("/product.jpg")
  
  offerBadge String @default("OFERTA LIMITADA")
  offerUnits Int    @default(111)
  offerText  String @default("unidades disponiveis")
  
  videoId    String @default("EcN6NLiqSXk")
  videoTitle String @default("Veja como funciona")
  
  normalPrice        Float @default(2150.20)
  promotionPrice     Float @default(478.80)
  installments       Int   @default(12)
  installmentValue   Float @default(39.90)
  discountPercentage Int   @default(78)
  savings            Float @default(1671.40)
  
  feature1Title String @default("Rastreamento em Tempo Real")
  feature1Desc  String @default("Acompanhe seu pet 24/7")
  feature2Title String @default("Bateria de Longa Duracao")
  feature2Desc  String @default("Ate 7 dias sem recarregar")
  feature3Title String @default("App Intuitivo")
  feature3Desc  String @default("Controle total pelo celular")
  feature4Title String @default("Historico Completo")
  feature4Desc  String @default("Veja todos os trajetos")
  
  faqAnatelTitle    String @default("Duvidas sobre Homologacao")
  faqAnatelQuestion String @default("Ele nao e homologado pela Anatel?")
  faqAnatelAnswer   String @default("Nosso dispositivo e totalmente legal.")
  
  guarantee1 String @default("Garantia de 12 meses")
  guarantee2 String @default("Entrega em todo Brasil")
  guarantee3 String @default("Suporte 24/7")
  
  finalCTA  String @default("GARANTIR MEU GPS AGORA")
  finalText String @default("Ultimas unidades com frete gratis!")
  
  footerAbout   String @default("Especialistas em rastreamento GPS para pets ha mais de 25 anos.")
  footerCNPJ    String @default("05.325.823/0001-00")
  footerPhone   String @default("(43) 99984-1451")
  footerEmail   String @default("contato@pethere.com.br")
  footerAddress String @default("Cambara, PR - Brasil")
  
  salesNotificationEnabled Boolean @default(true)
  
  exitModalEnabled Boolean @default(true)
  exitModalTitle   String  @default("ESPERA! Nao deixe seu Pet desprotegido agora!")
  exitModalText    String  @default("Vimos que voce quase garantiu seu Pethere GPS...")
  
  metaTitle       String @default("Pethere GPS - Rastreador para Pets")
  metaDescription String @default("Ganhe o GPS Pethere de presente ao assinar o plano de 24 meses")
  metaKeywords    String @default("rastreador pet, gps cachorro, localizador animal")
  
  facebookUrl  String @default("")
  instagramUrl String @default("")
  whatsappUrl  String @default("")
  
  unboxingTitle       String @default("Chuva, Sol ou Lama. A Tecnologia FRT aguenta tudo.")
  unboxingSubtitle    String @default("Resistente a agua, poeira e impactos. Desenvolvido para durar.")
  unboxingCard1Title  String @default("Agua")
  unboxingCard1Desc   String @default("IP67")
  unboxingCard2Title  String @default("Sol")
  unboxingCard2Desc   String @default("-20 a 60 C")
  unboxingCard3Title  String @default("Poeira")
  unboxingCard3Desc   String @default("Selado")
  unboxingCard4Title  String @default("Impacto")
  unboxingCard4Desc   String @default("Queda 2m")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Analytics {
  id        String   @id @default(cuid())
  date      DateTime @unique
  visitors  Int      @default(0)
  pageViews Int      @default(0)
  orders    Int      @default(0)
  revenue   Float    @default(0)
  
  @@index([date])
}

model Banner {
  id          String   @id @default(cuid())
  title       String
  subtitle    String?
  description String?
  imageUrl    String
  linkUrl     String?
  linkText    String?
  position    Int      @default(0)
  isActive    Boolean  @default(true)
  bgColor     String   @default("#1e293b")
  textColor   String   @default("#ffffff")
  buttonColor String   @default("#10b981")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("banners")
}
'

# Salvar sem BOM usando .NET
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$PWD\prisma\schema.prisma", $schema, $utf8NoBom)

Write-Host "[OK] Schema criado sem BOM!" -ForegroundColor Green
Write-Host ""

# 3. DELETAR MIGRATIONS ANTIGAS
Write-Host "[3/6] Limpando migrations antigas..." -ForegroundColor Yellow
if (Test-Path "prisma\migrations") {
    Remove-Item "prisma\migrations" -Recurse -Force
}
Write-Host "[OK] Migrations limpas!" -ForegroundColor Green
Write-Host ""

# 4. CRIAR BANCO NOVO
Write-Host "[4/6] Criando banco de dados..." -ForegroundColor Yellow
Remove-Item "prisma\dev.db" -Force -ErrorAction SilentlyContinue
Remove-Item "prisma\dev.db-journal" -Force -ErrorAction SilentlyContinue
npx prisma migrate dev --name init --skip-seed
Write-Host ""

# 5. GERAR CLIENT
Write-Host "[5/6] Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
Write-Host ""

# 6. POPULAR BANCO
Write-Host "[6/6] Populando banco..." -ForegroundColor Yellow
npm install -D ts-node
npm run seed
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "       TUDO CORRIGIDO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Agora execute:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "E teste:" -ForegroundColor Cyan
Write-Host "  curl http://localhost:3000/api/site-config" -ForegroundColor White
Write-Host ""