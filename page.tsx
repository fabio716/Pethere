'use client'

import {
  Coffee, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Shield, CheckCircle2, Star, Gift, MapPin, Award, 
  Clock, TrendingUp, Zap, ChevronRight, Settings, Package, 
  Smartphone, Heart, BadgeCheck, CreditCard, ExternalLink
} from 'lucide-react'
import YouTubePlayer from '@/components/YouTubePlayer'
import DynamicLogo from '@/components/DynamicLogo'
import FAQSection from '@/components/FAQSection'
import PriceAnchorTable from '@/components/PriceAnchorTable'
import AdvancedNotifications from '@/components/AdvancedNotifications'
import { useSiteConfig } from "@/hooks/useSiteConfig"
import { useExitIntent } from '@/hooks/useExitIntent'
import ExitIntentModal from '@/components/ExitIntentModal'
import SalesAI from '@/components/SalesAI'
import EvidenceGallery from "@/components/EvidenceGallery"
import UnboxingSection from '@/components/UnboxingSection'
import ParallaxBanner from '@/components/ParallaxBanner'

export default function Home() {
  const { config } = useSiteConfig()
  const [testimonials, setTestimonials] = useState<{id:string,name:string,role:string,content:string,rating:number,image:string|null}[]>([])
  const [showStickyBar, setShowStickyBar] = useState(false)
  const { showExitIntent, setShowExitIntent } = useExitIntent({ enabled: true })

  useEffect(() => {
    fetch("/api/testimonials").then(r=>r.json()).then(d=>{if(Array.isArray(d))setTestimonials(d.filter((t:any)=>t.active))}).catch(()=>{})
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBuyClick = () => {
    window.location.href="/checkout" }

  const handleExitIntentAccept = () => {
    setShowExitIntent(false)
    localStorage.setItem('discount_coupon', 'ULTIMACHANCE')
    alert('Cupom ULTIMACHANCE aplicado! Desconto de 10% + Frete Grátis!')
    handleBuyClick()
  }

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      
      <AdvancedNotifications />
      <SalesAI />

      {/* HEADER DARK */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
              <DynamicLogo size="sm" />
              <div className="hidden md:block">
                <h1 className="text-base font-bold text-white leading-tight">{config?.companyName || "Pethere GPS"}</h1>
                <p className="text-xs text-green-400 font-semibold">FRT Automação • 25 Anos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {process.env.NODE_ENV === 'development' && (
                <a href="/admin/login" className="p-2 text-slate-400 hover:text-white">
                  <Settings className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={handleBuyClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all shadow-lg shadow-green-500/30"
              >
                RASTREAR MEU PET
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        
        {/* HERO DARK - CAFÉ VS SEGURANÇA */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                {/* Badge Estoque */}
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-full shadow-md text-xs font-bold animate-pulse">
                  <Gift className="w-4 h-4" />
                  Estoque Promocional acabando em... {config?.offerUnits || 111} unidades!
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  {config?.heroTitle || "Proteja quem você ama com a tecnologia que ele merece"}
                
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {config?.heroSubtitle || "Assine o plano de 24 meses e ganhe o Rastreador GPS Pethere de presente!"}
                </p>

                {/* Badge R$ 0,65/dia */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center gap-4">
                  <div className="text-4xl sm:text-5xl font-black text-blue-400">
                    R$ 0,65<span className="text-lg text-blue-400/60">/dia</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Menos que uma bala na padaria.<br />
                    <span className="font-bold text-white">{config?.installments || 12}x de R$ {String((config?.installmentValue || 39.90).toFixed(2)).replace(".",",")} no cartão.</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={handleBuyClick} className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2 group">
                    <ShoppingCart className="w-5 h-5" />
                    <span>{config?.heroCTA || "QUERO MEU GPS GRATIS"}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* RIGHT: Video + Comparação */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800 rounded-xl p-3 shadow-2xl border border-slate-700">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <YouTubePlayer videoId={config?.videoId || "EcN6NLiqSXk"} autoplay={true} loop={true} controls={true} />
                    </div>
                  </div>
                </div>

                {/* Comparação Café vs Proteção */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-xl">&#9749;</span>
                      </div>
                      <p className="text-xs text-slate-400 line-through">1 Café Expresso</p>
                      <p className="text-lg font-bold text-red-400 line-through">R$ 7,50</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-xs text-slate-300">10 Dias de Proteção</p>
                      <p className="text-lg font-bold text-green-400">R$ 6,50</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-slate-400 mt-3 font-medium">Faça a escolha inteligente.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TABELA DE ANCORAGEM DARK - MANTÉM LÓGICA */}
        <section className="py-16 bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-full mb-3">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold text-sm">VOCÊ ECONOMIZA {config?.discountPercentage || 78}% HOJE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Veja Quanto Você Economiza
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Compare os preços normais com a promoção de lançamento
              </p>
            </motion.div>

            <PriceAnchorTable />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <button
                onClick={handleBuyClick}
                className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-4 rounded-xl text-xl shadow-lg shadow-green-500/30 transition-all inline-flex items-center gap-2 group"
              >
                <Gift className="w-6 h-6" />
                <span>SIM! QUERO ECONOMIZAR R$ {(config?.savings || 1671.40).toLocaleString("pt-BR",{minimumFractionDigits:2})}</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-slate-300 mt-3 text-sm">
                Pague apenas <span className="font-black text-green-400">{config?.installments || 12}x de R$ {String((config?.installmentValue || 39.90).toFixed(2)).replace(".",",")}</span> e ganhe o GPS + App
              </p>
            </motion.div>
          </div>
        </section>

        {/* UNBOXING DARK - MANTÉM COMPONENTE */}
        <UnboxingSection />

        {/* PARALLAX DARK - MANTÉM COMPONENTE */}
        <ParallaxBanner />

        {/* COMO FUNCIONA DARK */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-3">
                Como Funciona o Pethere GPS
              </h2>
              <p className="text-lg text-slate-300">
                Tecnologia simples e eficaz em 3 passos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', icon: Package, title: '{config?.howStep1Title || "Receba em Casa"}', description: 'Kit completo em até 7 dias' },
                { step: '2', icon: Smartphone, title: '{config?.howStep2Title || "Configure em 2 Min"}', description: 'App + QR Code' },
                { step: '3', icon: Heart, title: 'Fique Tranquilo', description: '24/7 protegido' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-colors"
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-black shadow-lg">
                    {item.step}
                  </div>
                  
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-green-400" />
                  </div>

                  <h3 className="text-xl font-black text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <EvidenceGallery />

        {/* DEPOIMENTOS DARK - CONECTADO AO CMS */}
        <section className="py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-3">{config?.testimonialsTitle || "Mais de 5.000 Pets Protegidos"}</h2>
              <p className="text-lg text-slate-300">{config?.testimonialsSubtitle || "Veja o que nossos clientes dizem"}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {(testimonials.length > 0 ? testimonials : [
                { id:"f1", name:"Ana Paula", role:"São Paulo, SP", content:"Meu golden fugiu e achei em 10 minutos!", rating:5, image:null },
                { id:"f2", name:"Roberto Silva", role:"Curitiba, PR", content:"Funciona perfeitamente em área rural.", rating:5, image:null },
                { id:"f3", name:"Mariana Costa", role:"Rio de Janeiro, RJ", content:"Cerca virtual é perfeita!", rating:5, image:null },
              ]).map((t, i) => (
                <motion.div key={t.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-700 rounded-xl p-5 border border-slate-600">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 mb-4 text-sm italic">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-600">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-green-400" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
                    )}
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL DARK */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Proteja Seu Pet Agora Mesmo
              </h2>

              <p className="text-xl text-green-100 mb-6">
                Ganhe o GPS + App e economize R$ {(config?.savings || 1671.40).toLocaleString("pt-BR",{minimumFractionDigits:2})}
              </p>

              <div className="bg-white rounded-xl p-6 mb-6 inline-block">
                <p className="text-xs text-slate-600 mb-1">Plano de 24 meses:</p>
                <div className="flex items-baseline gap-2 justify-center">
                  <span className="text-4xl font-black text-slate-900">12x</span>
                  <span className="text-5xl font-black text-green-600">R$ 39,90</span>
                </div>
                <p className="text-sm text-slate-600">ou R$ {(config?.promotionPrice || 478.80).toLocaleString("pt-BR",{minimumFractionDigits:2})} à vista</p>
              </div>

              <button
                onClick={handleBuyClick}
                className="bg-white hover:bg-slate-100 text-green-600 font-black px-10 py-4 rounded-xl text-lg shadow-2xl transition-all inline-flex items-center gap-2 group"
              >
                <Gift className="w-6 h-6" />
                <span>GARANTIR PROMOÇÃO</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-white/90 mt-6 text-sm">
                <ExternalLink className="w-4 h-4" />
                <a href="/checkout" onClick={(e)=>{e.preventDefault();handleBuyClick()}} className="hover:underline">
                  Ver oferta completa</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER DARK */}
        <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <DynamicLogo size="sm" />
              <div>
                <h3 className="text-lg font-bold">{config?.companyName || "Pethere GPS"}</h3>
                <p className="text-xs text-slate-400">by FRT Automação</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Tecnologia GPS 4G. 25 anos FRT Automação.
            </p>
            <p className="text-slate-500 text-xs">
              © 2026 Pethere GPS - CNPJ: {config?.footerCNPJ || "05.325.823/0001-00"}
            </p>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-green-600 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-white font-bold text-sm">Economize R$ {(config?.savings || 1671.40).toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <button onClick={handleBuyClick} className="bg-white text-green-600 font-bold px-6 py-2 rounded-lg text-sm">
                  GARANTIR AGORA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExitIntentModal
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        onAccept={handleExitIntentAccept}
      />
    </div>
  )
}