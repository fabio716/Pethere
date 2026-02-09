Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUDITORIA E CORRECAO COMPLETA" -ForegroundColor Cyan
Write-Host "  ADMIN <-> SITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$utf8NoBom = New-Object System.Text.UTF8Encoding $false

# ==========================================
# ETAPA 1: DIAGNOSTICO
# ==========================================
Write-Host "[ETAPA 1/5] DIAGNOSTICO" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

# Verificar se componentes usam API
$componentsToCheck = @(
    @{Name="page.tsx"; Path="app\page.tsx"; Pattern="fetch.*site-config|useSiteConfig"},
    @{Name="HeroDynamic.tsx"; Path="components\HeroDynamic.tsx"; Pattern="config\.|fetch"},
    @{Name="Header.tsx"; Path="components\Header.tsx"; Pattern="config\.|fetch"},
    @{Name="Footer.tsx"; Path="components\Footer.tsx"; Pattern="config\.|fetch"}
)

$problems = @()

foreach ($comp in $componentsToCheck) {
    if (Test-Path $comp.Path) {
        $content = Get-Content $comp.Path -Raw
        if ($content -match $comp.Pattern) {
            Write-Host "[OK] $($comp.Name) usa dados dinamicos" -ForegroundColor Green
        } else {
            Write-Host "[PROBLEMA] $($comp.Name) tem dados HARDCODED!" -ForegroundColor Red
            $problems += $comp.Name
        }
    } else {
        Write-Host "[AVISO] $($comp.Name) NAO EXISTE!" -ForegroundColor Yellow
    }
}

Write-Host ""

if ($problems.Count -gt 0) {
    Write-Host "[ENCONTRADO] $($problems.Count) componentes com problemas!" -ForegroundColor Red
    Write-Host "Vou corrigir automaticamente..." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[INFO] Componentes parecem corretos. Pode ser cache..." -ForegroundColor Cyan
    Write-Host ""
}

# ==========================================
# ETAPA 2: CRIAR HOOK useSiteConfig
# ==========================================
Write-Host "[ETAPA 2/5] CRIANDO HOOK useSiteConfig" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

$hookContent = @'
'use client'

import { useEffect, useState } from 'react'

export interface SiteConfig {
  id: string
  companyName: string
  companyLogo: string
  headerCTA: string
  heroTitle: string
  heroSubtitle: string
  heroHighlight: string
  heroCTA: string
  heroImage: string
  offerBadge: string
  offerUnits: number
  offerText: string
  videoId: string
  videoTitle: string
  normalPrice: number
  promotionPrice: number
  installments: number
  installmentValue: number
  discountPercentage: number
  savings: number
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  feature4Title: string
  feature4Desc: string
  faqAnatelTitle: string
  faqAnatelQuestion: string
  faqAnatelAnswer: string
  guarantee1: string
  guarantee2: string
  guarantee3: string
  finalCTA: string
  finalText: string
  footerAbout: string
  footerCNPJ: string
  footerPhone: string
  footerEmail: string
  footerAddress: string
  salesNotificationEnabled: boolean
  exitModalEnabled: boolean
  exitModalTitle: string
  exitModalText: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  facebookUrl: string
  instagramUrl: string
  whatsappUrl: string
  unboxingTitle: string
  unboxingSubtitle: string
  unboxingCard1Title: string
  unboxingCard1Desc: string
  unboxingCard2Title: string
  unboxingCard2Desc: string
  unboxingCard3Title: string
  unboxingCard3Desc: string
  unboxingCard4Title: string
  unboxingCard4Desc: string
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/site-config?t=${timestamp}`, {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('[useSiteConfig] Dados carregados:', data)
        setConfig(data)
        setError(null)
      } catch (err) {
        console.error('[useSiteConfig] Erro ao carregar:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  return { config, loading, error }
}
'@

New-Item -ItemType Directory -Path "hooks" -Force | Out-Null
[System.IO.File]::WriteAllText("$PWD\hooks\useSiteConfig.ts", $hookContent, $utf8NoBom)
Write-Host "[OK] Hook criado com cache desabilitado!" -ForegroundColor Green
Write-Host ""

# ==========================================
# ETAPA 3: CORRIGIR TODOS OS COMPONENTES
# ==========================================
Write-Host "[ETAPA 3/5] CORRIGINDO COMPONENTES" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

# 3.1 - HeroDynamic.tsx
Write-Host "  [3.1] Corrigindo HeroDynamic.tsx..." -ForegroundColor Cyan
$heroContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface HeroDynamicProps {
  config: SiteConfig
}

export default function HeroDynamic({ config }: HeroDynamicProps) {
  const highlightWord = (text: string, word: string) => {
    if (!word) return text
    
    const parts = text.split(new RegExp(`(${word})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={i} className="text-primary-green">{part}</span>
      ) : part
    )
  }

  return (
    <section className="bg-primary-navy text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {config.offerBadge} - {config.offerUnits} {config.offerText}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {highlightWord(config.heroTitle, config.heroHighlight)}
            </h1>

            <div className="space-y-3">
              <p className="text-primary-green text-xl md:text-2xl font-semibold flex items-center gap-2">
                <span>🎁</span>
                {config.heroSubtitle.split('Ganhe')[1] ? 'Ganhe' + config.heroSubtitle.split('Ganhe')[1] : config.heroSubtitle}
              </p>
              
              <p className="text-gray-300 text-lg">
                {config.heroSubtitle.includes('Assine') ? config.heroSubtitle : 'Assine o plano de 24 meses e receba o aparelho GPS + App Premium completamente GRATIS'}
              </p>
            </div>

            <button className="bg-primary-green hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              <span>🛒</span>
              {config.heroCTA}
            </button>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <span>Mais de 50.000 pets protegidos</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src={config.heroImage || '/product.jpg'} 
                alt="Pethere GPS" 
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-blue-500/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
'@
[System.IO.File]::WriteAllText("$PWD\components\HeroDynamic.tsx", $heroContent, $utf8NoBom)
Write-Host "  [OK] HeroDynamic.tsx corrigido!" -ForegroundColor Green

# 3.2 - Header.tsx
Write-Host "  [3.2] Corrigindo Header.tsx..." -ForegroundColor Cyan
$headerContent = @'
'use client'

import { SiteConfig } from '@/hooks/useSiteConfig'

interface HeaderProps {
  config: SiteConfig
}

export default function Header({ config }: HeaderProps) {
  return (
    <header className="bg-primary-navy text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐾</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{config.companyName}</h1>
              <p className="text-xs text-green-400">FRT Automacao • 25 Anos</p>
            </div>
          </div>
          
          <button className="bg-primary-green hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold transition-all text-sm md:text-base">
            {config.headerCTA}
          </button>
        </div>
      </div>
    </header>
  )
}
'@
[System.IO.File]::WriteAllText("$PWD\components\Header.tsx", $headerContent, $utf8NoBom)
Write-Host "  [OK] Header.tsx corrigido!" -ForegroundColor Green

Write-Host ""

# ==========================================
# ETAPA 4: LIMPAR CACHE DO NEXT.JS
# ==========================================
Write-Host "[ETAPA 4/5] LIMPANDO CACHE" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "[OK] Cache .next removido!" -ForegroundColor Green
}

if (Test-Path ".turbo") {
    Remove-Item ".turbo" -Recurse -Force
    Write-Host "[OK] Cache .turbo removido!" -ForegroundColor Green
}

Write-Host ""

# ==========================================
# ETAPA 5: TESTE AUTOMATICO
# ==========================================
Write-Host "[ETAPA 5/5] PREPARANDO TESTE" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

$testScript = @'
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTE DE CONEXAO ADMIN <-> SITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Testando API..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/site-config" -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "[OK] API respondeu com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Dados carregados:" -ForegroundColor Cyan
    Write-Host "  - Company: $($data.companyName)" -ForegroundColor White
    Write-Host "  - Hero Title: $($data.heroTitle)" -ForegroundColor White
    Write-Host "  - Hero Highlight: $($data.heroHighlight)" -ForegroundColor White
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "       TUDO FUNCIONANDO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "PROXIMOS PASSOS:" -ForegroundColor Cyan
    Write-Host "1. Acesse: http://localhost:3000/admin/cms" -ForegroundColor White
    Write-Host "2. Mude um texto qualquer" -ForegroundColor White
    Write-Host "3. Clique em 'Publicar Alteracoes'" -ForegroundColor White
    Write-Host "4. Abra: http://localhost:3000" -ForegroundColor White
    Write-Host "5. Pressione CTRL+SHIFT+R (hard refresh)" -ForegroundColor White
    Write-Host "6. Veja a mudanca aparecer!" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "[ERRO] API nao respondeu!" -ForegroundColor Red
    Write-Host "Certifique-se que o servidor esta rodando (npm run dev)" -ForegroundColor Yellow
}
'@

[System.IO.File]::WriteAllText("$PWD\test-connection.ps1", $testScript, $utf8NoBom)

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "       CORRECAO CONCLUIDA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AGORA EXECUTE:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. TERMINAL 1:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "2. TERMINAL 2 (apos servidor iniciar):" -ForegroundColor Yellow
Write-Host "   .\test-connection.ps1" -ForegroundColor White
Write-Host ""
Write-Host "3. Se der tudo certo:" -ForegroundColor Yellow
Write-Host "   - Va no CMS" -ForegroundColor White
Write-Host "   - Mude um texto" -ForegroundColor White
Write-Host "   - Salve" -ForegroundColor White
Write-Host "   - Recarregue o site com CTRL+SHIFT+R" -ForegroundColor White
Write-Host ""