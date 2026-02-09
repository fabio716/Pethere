const fs = require("fs");
let c = fs.readFileSync("app/page.tsx", "utf8");

// 1. Add testimonials state + fetch
if (!c.includes("testimonials, setTestimonials")) {
  c = c.replace(
    "const { config } = useSiteConfig()",
    "const { config } = useSiteConfig()\n  const [testimonials, setTestimonials] = useState<{id:string,name:string,role:string,content:string,rating:number,image:string|null}[]>([])"
  );
  console.log("[OK] State testimonials adicionado");
}

// 2. Add useEffect to fetch testimonials
if (!c.includes("fetch(\"/api/testimonials")) {
  c = c.replace(
    "useEffect(() => {\n    const handleScroll",
    "useEffect(() => {\n    fetch(\"/api/testimonials\").then(r=>r.json()).then(d=>{if(Array.isArray(d))setTestimonials(d.filter((t:any)=>t.active))}).catch(()=>{})\n  }, [])\n\n  useEffect(() => {\n    const handleScroll"
  );
  console.log("[OK] Fetch testimonials adicionado");
}

// 3. Replace hardcoded testimonials section
const OLD_START = "{/* DEPOIMENTOS DARK */}";
const OLD_END = "{/* CTA FINAL DARK";
const s = c.indexOf(OLD_START);
const e = c.indexOf(OLD_END);
if (s === -1 || e === -1) { console.log("ERRO: marcadores nao encontrados s="+s+" e="+e); process.exit(1); }

const NEW_SECTION = [
  "{/* DEPOIMENTOS DARK - CONECTADO AO CMS */}",
  "        <section className=\"py-16 bg-slate-800\">",
  "          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">",
  "            <div className=\"text-center mb-12\">",
  "              <h2 className=\"text-3xl font-black text-white mb-3\">Mais de 5.000 Pets Protegidos</h2>",
  "              <p className=\"text-lg text-slate-300\">Veja o que nossos clientes dizem</p>",
  "            </div>",
  "            <div className=\"grid md:grid-cols-3 gap-6\">",
  "              {(testimonials.length > 0 ? testimonials : [",
  "                { id:\"f1\", name:\"Ana Paula\", role:\"S\u00e3o Paulo, SP\", content:\"Meu golden fugiu e achei em 10 minutos!\", rating:5, image:null },",
  "                { id:\"f2\", name:\"Roberto Silva\", role:\"Curitiba, PR\", content:\"Funciona perfeitamente em \u00e1rea rural.\", rating:5, image:null },",
  "                { id:\"f3\", name:\"Mariana Costa\", role:\"Rio de Janeiro, RJ\", content:\"Cerca virtual \u00e9 perfeita!\", rating:5, image:null },",
  "              ]).map((t, i) => (",
  "                <motion.div key={t.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className=\"bg-slate-700 rounded-xl p-5 border border-slate-600\">",
  "                  <div className=\"flex gap-1 mb-3\">",
  "                    {[...Array(t.rating || 5)].map((_, j) => (",
  "                      <Star key={j} className=\"w-4 h-4 fill-yellow-400 text-yellow-400\" />",
  "                    ))}",
  "                  </div>",
  "                  <p className=\"text-slate-200 mb-4 text-sm italic\">\"{t.content}\"</p>",
  "                  <div className=\"flex items-center gap-3 pt-3 border-t border-slate-600\">",
  "                    {t.image ? (",
  "                      <img src={t.image} alt={t.name} className=\"w-10 h-10 rounded-full object-cover border-2 border-green-400\" />",
  "                    ) : (",
  "                      <div className=\"w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold\">{t.name.charAt(0)}</div>",
  "                    )}",
  "                    <div>",
  "                      <p className=\"font-bold text-white text-sm\">{t.name}</p>",
  "                      <p className=\"text-xs text-slate-400\">{t.role}</p>",
  "                    </div>",
  "                  </div>",
  "                </motion.div>",
  "              ))}",
  "            </div>",
  "          </div>",
  "        </section>","",
  "        "
].join("\n");

const before = c.substring(0, s);
const after = c.substring(e);
c = before + NEW_SECTION + after;

fs.writeFileSync("app/page.tsx", c, "utf8");
console.log("[OK] Depoimentos conectados ao banco!");
console.log("Agora os depoimentos do /admin/testimonials aparecem no site.");
console.log("Se nao tiver nenhum ativo, mostra 3 fallbacks.");
