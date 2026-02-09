Write-Host "========================================" -ForegroundColor Red
Write-Host "  RESTAURACAO DE EMERGENCIA" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""

# Parar servidor se estiver rodando
Write-Host "[1/4] Parando servidor..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Limpar cache
Write-Host "[2/4] Limpando cache..." -ForegroundColor Yellow
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item ".turbo" -Recurse -Force -ErrorAction SilentlyContinue

# Restaurar do Git (se tiver)
Write-Host "[3/4] Verificando repositorio Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "Git encontrado! Vou mostrar os arquivos modificados..." -ForegroundColor Cyan
    git status
    Write-Host ""
    Write-Host "Deseja restaurar do Git? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "S" -or $response -eq "s") {
        git checkout app/page.tsx
        git checkout components/
        Write-Host "[OK] Arquivos restaurados do Git!" -ForegroundColor Green
    }
} else {
    Write-Host "Git nao encontrado. Vou criar versao limpa..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/4] Criando versao minima funcional..." -ForegroundColor Yellow

# Criar page.tsx minimo mas funcional
$pageMinimal = 'import { Metadata } from ''next''

export const metadata: Metadata = {
  title: ''Pethere GPS - Rastreador para Pets'',
  description: ''Rastreador GPS para proteger seu pet''
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pethere GPS</h1>
          <button className="bg-green-500 px-6 py-2 rounded-full font-bold">
            RASTREAR MEU PET
          </button>
        </div>
      </header>

      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Proteja quem voce ama com tecnologia
          </h2>
          <p className="text-2xl text-green-400 mb-8">
            Ganhe o Rastreador GPS Pethere de presente!
          </p>
          <button className="bg-green-500 hover:bg-green-600 px-12 py-4 rounded-full text-xl font-bold">
            QUERO MEU GPS GRATIS
          </button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Recursos</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="font-bold mb-2">Rastreamento Real</h4>
              <p className="text-gray-600">24/7</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🔋</div>
              <h4 className="font-bold mb-2">Bateria Longa</h4>
              <p className="text-gray-600">7 dias</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-bold mb-2">App Intuitivo</h4>
              <p className="text-gray-600">Facil uso</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-bold mb-2">Historico</h4>
              <p className="text-gray-600">Completo</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Pethere GPS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
'

Set-Content -Path "app\page.tsx" -Value $pageMinimal -Encoding UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SITE BASICO RESTAURADO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AGORA execute:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "O site vai funcionar! Depois conectamos o CMS." -ForegroundColor Yellow
Write-Host ""