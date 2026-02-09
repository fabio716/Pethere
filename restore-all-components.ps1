Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESTAURANDO LAYOUT COMPLETO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$utf8NoBom = New-Object System.Text.UTF8Encoding $false

# ===========================================
# 1. PAGE.TSX COMPLETO
# ===========================================
Write-Host "[1/9] Criando page.tsx completo..." -ForegroundColor Yellow

$pageContent = @'
'use client'

import { Suspense } from 'react'
import Header from '@/components/Header'
import HeroDynamic from '@/components/HeroDynamic'
import VideoSection from '@/components/VideoSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import PricingSection from '@/components/PricingSection'
import UnboxingSection from '@/components/UnboxingSection'
import FAQAnatel from '@/components/FAQAnatel'
import Guarantees from '@/components/Guarantees'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import BannerDisplay from '@/components/BannerDisplay'
import { useSiteConfig } from '@/hooks/useSiteConfig'

export default function Home() {
  const { config, loading, error } = useSiteConfig()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-navy to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-green mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Carregando sua experiência...</p>
        </div>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-navy to-blue-900">
        <div className="text-center max-w-md px-6">
          <div className="text-primary-orange text-7xl mb-4">🐾</div>
          <h1 className="text-white text-3xl font-bold mb-3">Ops! Algo deu errado</h1>
          <p className="text-gray-300 mb-6">{error || 'Não foi possível carregar as configurações'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary-green hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            🔄 Recarregar Página
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header config={config} />
      
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse"></div>}>
        <BannerDisplay />
      </Suspense>
      
      <HeroDynamic config={config} />
      
      <VideoSection config={config} />
      
      <FeaturesGrid config={config} />
      
      <PricingSection config={config} />
      
      <UnboxingSection config={config} />
      
      <TestimonialsSection />
      
      <FAQAnatel config={config} />
      
      <Guarantees config={config} />
      
      <Footer config={config} />
    </main>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\app\page.tsx", $pageContent, $utf8NoBom)
Write-Host "[OK] page.tsx criado!" -ForegroundColor Green

# ===========================================
# 2. VIDEO SECTION
# ===========================================
Write-Host "[2/9] Criando VideoSection..." -ForegroundColor Yellow

$videoContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface VideoSectionProps {
  config: SiteConfig
}

export default function VideoSection({ config }: VideoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {config.videoTitle}
          </h2>
          <p className="text-gray-600 text-lg">Veja como é fácil proteger seu pet</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${config.videoId}?rel=0`}
              title={config.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\VideoSection.tsx", $videoContent, $utf8NoBom)
Write-Host "[OK] VideoSection criado!" -ForegroundColor Green

# ===========================================
# 3. FEATURES GRID
# ===========================================
Write-Host "[3/9] Criando FeaturesGrid..." -ForegroundColor Yellow

$featuresContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface FeaturesGridProps {
  config: SiteConfig
}

export default function FeaturesGrid({ config }: FeaturesGridProps) {
  const features = [
    { icon: '📍', title: config.feature1Title, desc: config.feature1Desc },
    { icon: '🔋', title: config.feature2Title, desc: config.feature2Desc },
    { icon: '📱', title: config.feature3Title, desc: config.feature3Desc },
    { icon: '📊', title: config.feature4Title, desc: config.feature4Desc },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tecnologia de Ponta para Proteger Seu Pet
          </h2>
          <p className="text-gray-600 text-lg">Recursos que fazem toda a diferença</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\FeaturesGrid.tsx", $featuresContent, $utf8NoBom)
Write-Host "[OK] FeaturesGrid criado!" -ForegroundColor Green

# ===========================================
# 4. PRICING SECTION
# ===========================================
Write-Host "[4/9] Criando PricingSection..." -ForegroundColor Yellow

$pricingContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface PricingSectionProps {
  config: SiteConfig
}

export default function PricingSection({ config }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-primary-navy to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-bold mb-4 animate-pulse">
            🔥 VOCÊ ECONOMIZA {config.discountPercentage}% HOJE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Veja Quanto Você Economiza
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500 text-sm uppercase font-semibold mb-2">De</p>
                <p className="text-4xl font-bold text-gray-400 line-through mb-4">
                  R$ {config.normalPrice.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-gray-600">Preço normal</p>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-primary-green text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-orange text-white px-4 py-1 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
                OFERTA!
              </div>
              <div className="text-center relative z-10">
                <p className="text-sm uppercase font-semibold mb-2">Por apenas</p>
                <p className="text-5xl md:text-6xl font-bold mb-2">
                  R$ {config.promotionPrice.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-lg mb-4">
                  ou {config.installments}x de R$ {config.installmentValue.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm opacity-90">
                  💰 Você economiza R$ {config.savings.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 text-center bg-gray-900 text-white">
            <button className="bg-primary-green hover:bg-green-600 text-white px-12 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-3">
              <span>🛒</span>
              {config.finalCTA}
            </button>
            <p className="mt-4 text-sm text-gray-400">{config.finalText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\PricingSection.tsx", $pricingContent, $utf8NoBom)
Write-Host "[OK] PricingSection criado!" -ForegroundColor Green

# ===========================================
# 5. UNBOXING SECTION
# ===========================================
Write-Host "[5/9] Criando UnboxingSection..." -ForegroundColor Yellow

$unboxingContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface UnboxingSectionProps {
  config: SiteConfig
}

export default function UnboxingSection({ config }: UnboxingSectionProps) {
  const cards = [
    { icon: '💧', title: config.unboxingCard1Title, desc: config.unboxingCard1Desc },
    { icon: '☀️', title: config.unboxingCard2Title, desc: config.unboxingCard2Desc },
    { icon: '🌪️', title: config.unboxingCard3Title, desc: config.unboxingCard3Desc },
    { icon: '💪', title: config.unboxingCard4Title, desc: config.unboxingCard4Desc },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.unboxingTitle}</h2>
          <p className="text-gray-300 text-lg">{config.unboxingSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-gray-700 p-6 rounded-xl text-center hover:bg-gray-600 transition-all"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-primary-green font-bold text-xl">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\UnboxingSection.tsx", $unboxingContent, $utf8NoBom)
Write-Host "[OK] UnboxingSection criado!" -ForegroundColor Green

# ===========================================
# 6. FAQ ANATEL
# ===========================================
Write-Host "[6/9] Criando FAQAnatel..." -ForegroundColor Yellow

$faqContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface FAQAnatelProps {
  config: SiteConfig
}

export default function FAQAnatel({ config }: FAQAnatelProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{config.faqAnatelTitle}</h2>
          
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-start gap-2">
              <span className="text-primary-orange">❓</span>
              {config.faqAnatelQuestion}
            </h3>
            <p className="text-gray-700 leading-relaxed pl-7">
              {config.faqAnatelAnswer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\FAQAnatel.tsx", $faqContent, $utf8NoBom)
Write-Host "[OK] FAQAnatel criado!" -ForegroundColor Green

# ===========================================
# 7. GUARANTEES
# ===========================================
Write-Host "[7/9] Criando Guarantees..." -ForegroundColor Yellow

$guaranteesContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface GuaranteesProps {
  config: SiteConfig
}

export default function Guarantees({ config }: GuaranteesProps) {
  const guarantees = [
    { icon: '✅', text: config.guarantee1 },
    { icon: '🚚', text: config.guarantee2 },
    { icon: '💬', text: config.guarantee3 },
  ]

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {guarantees.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <span className="font-semibold text-gray-800">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\Guarantees.tsx", $guaranteesContent, $utf8NoBom)
Write-Host "[OK] Guarantees criado!" -ForegroundColor Green

# ===========================================
# 8. TESTIMONIALS SECTION
# ===========================================
Write-Host "[8/9] Criando TestimonialsSection..." -ForegroundColor Yellow

$testimonialsContent = @'
'use client'

import { useEffect, useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data.filter((t: Testimonial) => t.rating >= 4).slice(0, 3)))
      .catch(err => console.error('Erro ao carregar depoimentos:', err))
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 text-lg">Mais de 50.000 pets protegidos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                {testimonial.image ? (
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary-orange text-white flex items-center justify-center font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
              <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\TestimonialsSection.tsx", $testimonialsContent, $utf8NoBom)
Write-Host "[OK] TestimonialsSection criado!" -ForegroundColor Green

# ===========================================
# 9. FOOTER COMPLETO
# ===========================================
Write-Host "[9/9] Criando Footer completo..." -ForegroundColor Yellow

$footerContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface FooterProps {
  config: SiteConfig
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-primary-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span>🐾</span>
              {config.companyName}
            </h3>
            <p className="text-gray-400">{config.footerAbout}</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 {config.footerPhone}</p>
              <p>✉️ {config.footerEmail}</p>
              <p>📍 {config.footerAddress}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Informações</h4>
            <div className="space-y-2 text-gray-400">
              <p>CNPJ: {config.footerCNPJ}</p>
              <p>Especialistas há 25 anos</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 {config.companyName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\components\Footer.tsx", $footerContent, $utf8NoBom)
Write-Host "[OK] Footer criado!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    LAYOUT COMPLETO RESTAURADO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AGORA:" -ForegroundColor Cyan
Write-Host "1. Pare o servidor (Ctrl+C)" -ForegroundColor White
Write-Host "2. Limpe o cache: Remove-Item '.next' -Recurse -Force" -ForegroundColor White
Write-Host "3. Inicie: npm run dev" -ForegroundColor White
Write-Host "4. Acesse: http://localhost:3000" -ForegroundColor White
Write-Host ""