const fs = require("fs");

// 1. Criar componente EvidenceGallery.tsx
const comp = [
"\"use client\"","",
"import { useState } from \"react\"","import { Droplets, MapPin, Ruler, Dog, ZoomIn, X } from \"lucide-react\"","",
"const items = [",
"  { id:1, title:\"Teste de Resist\u00eancia \u00e0 \u00c1gua\", desc:\"Certifica\u00e7\u00e3o IP67 \u2014 submerso em 1m por 30min sem falhas.\", icon:\"Droplets\", color:\"blue\" },",
"  { id:2, title:\"Precis\u00e3o do Mapa\", desc:\"GPS 4G multi-operadora com margem de apenas 2 metros.\", icon:\"MapPin\", color:\"green\" },",
"  { id:3, title:\"Tamanho Compacto\", desc:\"Menor que uma moeda de R$ 1,00. Leve na coleira.\", icon:\"Ruler\", color:\"purple\" },",
"  { id:4, title:\"Pet Confort\u00e1vel\", desc:\"Design ergon\u00f4mico \u2014 seu pet nem percebe.\", icon:\"Dog\", color:\"amber\" },",
"]","",
"const icons: Record<string, React.ElementType> = { Droplets, MapPin, Ruler, Dog }","",
"const colors: Record<string, string> = {",
"  blue: \"from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400\",",
"  green: \"from-green-500/20 to-green-600/10 border-green-500/20 text-green-400\",",
"  purple: \"from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400\",",
"  amber: \"from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400\",",
"}","",
"export default function EvidenceGallery() {",
"  const [selected, setSelected] = useState<number | null>(null)","",
"  return (",
"    <section className=\"py-16 md:py-24 bg-slate-50\">",
"      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">",
"        <div className=\"text-center mb-12\">",
"          <h2 className=\"text-3xl md:text-4xl font-bold text-slate-900 mb-3\">Veja a Tecnologia FRT em A\u00e7\u00e3o</h2>",
"          <p className=\"text-lg text-slate-500 max-w-2xl mx-auto\">Imagens reais de clientes e testes de campo.</p>",
"        </div>",
"        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\">",
"          {items.map(item => {",
"            const Icon = icons[item.icon] || Droplets",
"            const c = colors[item.color] || colors.blue",
"            return (",
"              <div key={item.id} onClick={() => setSelected(item.id === selected ? null : item.id)} className=\"group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1\">",
"                <div className={`relative h-48 bg-gradient-to-br ${c} flex items-center justify-center`}>",
"                  <div className=\"w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300\">",
"                    <Icon className=\"w-10 h-10\" />",
"                  </div>",
"                  <div className=\"absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition\">",
"                    <ZoomIn className=\"w-4 h-4 text-white\" />",
"                  </div>",
"                  <p className=\"absolute bottom-3 left-3 text-xs font-medium text-white/70 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg\">Foto em breve</p>",
"                </div>",
"                <div className=\"p-5\">",
"                  <h3 className=\"font-bold text-slate-900 mb-1\">{item.title}</h3>",
"                  <p className={`text-sm text-slate-500 leading-relaxed transition-all duration-300 ${selected === item.id ? \"max-h-40 opacity-100\" : \"max-h-0 opacity-0 sm:max-h-40 sm:opacity-100\"}`}>{item.desc}</p>",
"                </div>",
"              </div>",
"            )",
"          })}",
"        </div>",
"        <p className=\"text-center text-sm text-slate-400 mt-8\">Fotos e testes realizados pela equipe FRT Automa\u00e7\u00e3o.</p>",
"      </div>",
"    </section>",
"  )",
"}",
].join("\n");
fs.writeFileSync("components/EvidenceGallery.tsx", comp, "utf8");
console.log("[OK] components/EvidenceGallery.tsx criado");

// 2. Adicionar import no page.tsx
let page = fs.readFileSync("app/page.tsx", "utf8");
if (!page.includes("EvidenceGallery")) {
  page = page.replace("import UnboxingSection", "import EvidenceGallery from \"@/components/EvidenceGallery\"\nimport UnboxingSection");
  console.log("[OK] Import adicionado");
}

// 3. Inserir a galeria antes dos depoimentos
if (!page.includes("<EvidenceGallery")) {
  page = page.replace("{/* DEPOIMENTOS DARK */}", "<EvidenceGallery />\n\n        {/* DEPOIMENTOS DARK */}");
  console.log("[OK] Galeria inserida antes dos Depoimentos");
}

fs.writeFileSync("app/page.tsx", page, "utf8");
console.log("[OK] Tudo pronto! Recarregue localhost:3000");
