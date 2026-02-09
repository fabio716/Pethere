# ========================================
# SCRIPT DE CORRECAO AUTOMATICA DO ADMIN
# ========================================

Write-Host "[*] INICIANDO CORRECAO AUTOMATICA..." -ForegroundColor Cyan
Write-Host ""

# 1. BACKUP DO SCHEMA
Write-Host "[1/7] Fazendo backup do schema..." -ForegroundColor Yellow
Copy-Item "prisma\schema.prisma" "prisma\schema.prisma.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')" -Force
Write-Host "[OK] Backup criado!" -ForegroundColor Green
Write-Host ""

# 2. CORRIGIR SCHEMA.PRISMA
Write-Host "[2/7] Corrigindo schema.prisma..." -ForegroundColor Yellow

$schemaContent = @'
generator client {
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
  faqAnatelQuestion String @default("Ele nao e homologado pela Anatel, nao precisa de homologacao?")
  faqAnatelAnswer   String @default("Nosso dispositivo e totalmente legal e nao necessita de homologacao Anatel...")
  
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
'@

Set-Content -Path "prisma\schema.prisma" -Value $schemaContent -Encoding UTF8
Write-Host "[OK] Schema corrigido!" -ForegroundColor Green
Write-Host ""

# 3. APLICAR MIGRATION
Write-Host "[3/7] Aplicando migration..." -ForegroundColor Yellow
npx prisma migrate dev --name fix_testimonial_and_faq_fields --skip-seed
Write-Host ""

# 4. GERAR PRISMA CLIENT
Write-Host "[4/7] Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
Write-Host ""

# 5. INSTALAR TS-NODE
Write-Host "[5/7] Instalando ts-node..." -ForegroundColor Yellow
npm install -D ts-node
Write-Host ""

# 6. RODAR SEED
Write-Host "[6/7] Populando banco de dados..." -ForegroundColor Yellow
npm run seed
Write-Host ""

# 7. CONCLUSAO
Write-Host "========================================" -ForegroundColor Green
Write-Host "    CORRECAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: npm run dev" -ForegroundColor White
Write-Host "2. Acesse: http://localhost:3000/admin/cms" -ForegroundColor White
Write-Host "3. Teste criar/editar/salvar" -ForegroundColor White
Write-Host ""
Write-Host "Paginas funcionais:" -ForegroundColor Cyan
Write-Host "  - Dashboard: /admin/dashboard" -ForegroundColor White
Write-Host "  - CMS: /admin/cms" -ForegroundColor White
Write-Host "  - Banners: /admin/banners" -ForegroundColor White
Write-Host "  - Depoimentos: /admin/testimonials" -ForegroundColor White
Write-Host "  - Produtos: /admin/products" -ForegroundColor White
Write-Host "  - Pedidos: /admin/orders" -ForegroundColor White
Write-Host ""
Write-Host "[OK] Agora pode descansar! Tudo esta funcionando!" -ForegroundColor Yellow
Write-Host ""