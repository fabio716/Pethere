Write-Host "CORRIGINDO ENCODING..." -ForegroundColor Cyan

# Parar servidor
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep 2

# Limpar cache
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue

# PAGE.TSX SEM EMOJIS
$page = @"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pethere GPS - Rastreador para Pets',
  description: 'Rastreador GPS para proteger seu pet'
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-blue-900 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            <h1 className="text-2xl font-bold">Pethere GPS</h1>
          </div>
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-bold transition">
            RASTREAR MEU PET
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-bold mb-6 animate-pulse">
              OFERTA LIMITADA - 111 unidades disponiveis
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Proteja quem voce ama com a tecnologia que ele <span className="text-green-400">merece</span>
            </h2>
            <p className="text-2xl text-green-400 mb-4 font-bold">
              Ganhe o Rastreador GPS Pethere de presente!
            </p>
            <p className="text-xl mb-8 text-gray-300">
              Assine o plano de 24 meses e receba o aparelho GPS + App Premium completamente GRATIS
            </p>
            <button className="bg-green-500 hover:bg-green-600 px-12 py-4 rounded-full text-xl font-bold transition transform hover:scale-105 shadow-xl">
              QUERO MEU GPS GRATIS
            </button>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex">
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-yellow-400 text-2xl">★</span>
              </div>
              <span className="text-gray-300">Mais de 50.000 pets protegidos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Tecnologia de Ponta</h3>
            <p className="text-gray-600 text-xl">Recursos que fazem toda a diferenca</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2">Rastreamento Real</h4>
              <p className="text-gray-600">Acompanhe seu pet 24/7</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2">Bateria Longa</h4>
              <p className="text-gray-600">Ate 7 dias sem recarregar</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2">App Intuitivo</h4>
              <p className="text-gray-600">Controle total pelo celular</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2">Historico Completo</h4>
              <p className="text-gray-600">Veja todos os trajetos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-red-500 px-6 py-2 rounded-full font-bold mb-6 animate-pulse">
              VOCE ECONOMIZA 78% HOJE
            </div>
            <h3 className="text-4xl font-bold mb-12">Oferta Exclusiva</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 p-8 rounded-2xl">
                <p className="text-sm mb-2">De</p>
                <p className="text-4xl font-bold line-through opacity-60">R$ 2.150,20</p>
              </div>
              <div className="bg-green-500 p-8 rounded-2xl relative">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  78% OFF
                </div>
                <p className="text-sm mb-2">Por apenas</p>
                <p className="text-5xl font-bold">R$ 478,80</p>
                <p className="text-sm mt-2">ou 12x de R$ 39,90</p>
              </div>
            </div>

            <button className="bg-green-500 hover:bg-green-600 px-12 py-4 rounded-full text-xl font-bold transition transform hover:scale-105 shadow-2xl">
              GARANTIR MEU GPS AGORA
            </button>
            <p className="mt-4 text-sm">Ultimas unidades com frete gratis!</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-3">Pethere GPS</h4>
              <p className="text-gray-400">Especialistas em rastreamento GPS para pets ha mais de 25 anos.</p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Contato</h5>
              <p className="text-gray-400 mb-2">(43) 99984-1451</p>
              <p className="text-gray-400 mb-2">contato@pethere.com.br</p>
              <p className="text-gray-400">Cambara, PR - Brasil</p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Informacoes</h5>
              <p className="text-gray-400">CNPJ: 05.325.823/0001-00</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Pethere GPS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
"@

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines("$PWD\app\page.tsx", $page, $Utf8NoBomEncoding)

Write-Host "PRONTO! Execute: npm run dev" -ForegroundColor Green