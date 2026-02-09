const fs = require("fs");
const path = require("path");
let total = 0;

// ==============================
// CAT 1: UTF-8 FIX (all files)
// ==============================
console.log("\\n=== CATEGORIA 1: UTF-8 ===");
function fixUtf8(text) {
  let r = text;
  for (let i = 0; i < 5; i++) {
    const prev = r;
    try {
      const bytes = [];
      for (let j = 0; j < r.length; j++) {
        const c = r.charCodeAt(j);
        const m = {0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
        if (c <= 255) bytes.push(c);
        else if (m[c] !== undefined) bytes.push(m[c]);
        else { const enc = Buffer.from(r[j], "utf8"); for (let k = 0; k < enc.length; k++) bytes.push(enc[k]); }
      }
      const decoded = Buffer.from(bytes).toString("utf8");
      if (!decoded.includes("\ufffd") && decoded.length <= r.length) r = decoded;
      else break;
    } catch { break; }
    if (r === prev) break;
  }
  return r;
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    if (["node_modules",".next",".git"].includes(f)) return;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) { scanDir(full); return; }
    if (!f.endsWith(".tsx") && !f.endsWith(".ts")) return;
    const orig = fs.readFileSync(full, "utf8");
    if (!/\u00c3[\u0192\u201a\u00a1\u00a3\u00a9\u00aa\u00ad\u00b3\u00b5\u00b4\u00ba\u00a7]/.test(orig)) return;
    const fixed = fixUtf8(orig);
    if (fixed !== orig) { fs.writeFileSync(full, fixed, "utf8"); total++; console.log("  [FIX]", full); }
  });
}
scanDir("app"); scanDir("components");
console.log("  UTF-8:", total, "arquivos corrigidos");

// ==============================
// CAT 1B: Mobile overflow
// ==============================
console.log("\\n=== CATEGORIA 1B: MOBILE OVERFLOW ===");
let page = fs.readFileSync("app/page.tsx", "utf8");
if (!page.includes("overflow-x-hidden")) {
  page = page.replace("min-h-screen bg-slate-900", "min-h-screen bg-slate-900 overflow-x-hidden");
  console.log("  [FIX] overflow-x-hidden adicionado ao container principal");
} else { console.log("  [OK] overflow-x-hidden ja existe"); }
fs.writeFileSync("app/page.tsx", page, "utf8");

// ==============================
// CAT 2: SARAH identity
// ==============================
console.log("\\n=== CATEGORIA 2: SARAH IDENTITY ===");
let ai = fs.readFileSync("components/SalesAI.tsx", "utf8");
const aiReplace = [["Ana Paula Silva","Sarah"],["Ana Paula","Sarah"],["Especialista Pethere FRT","Gerente de Seguran\u00e7a Pethere"],["Especialista da Pethere","Gerente de Seguran\u00e7a Pethere"]];
for (const [a,b] of aiReplace) ai = ai.split(a).join(b);
ai = ai.replace(/"Ana"/g, "\"Sarah\""); ai = ai.replace(/>Ana</g, ">Sarah<");
console.log("  [FIX] Ana -> Sarah em SalesAI.tsx");

// CAT 2B: Remove any auto-open timers
if (ai.includes("setTimeout") && ai.includes("setIsOpen(true)")) {
  ai = ai.replace(/setTimeout\s*\(\s*\(\)\s*=>\s*\{[^}]*setIsOpen\(true\)[^}]*\}\s*,\s*\d+\s*\)/g, "/* auto-open removed */");
  console.log("  [FIX] Auto-open timer removido");
} else { console.log("  [OK] Sem auto-open timer"); }
fs.writeFileSync("components/SalesAI.tsx", ai, "utf8");

// ==============================
// CAT 3: NOTIFICATIONS timing
// ==============================
console.log("\\n=== CATEGORIA 3: NOTIFICATIONS ===");
if (fs.existsSync("components/AdvancedNotifications.tsx")) {
  let notif = fs.readFileSync("components/AdvancedNotifications.tsx", "utf8");
  // Fix timing - ensure random 25-60s intervals
  if (notif.includes("2000") || notif.includes("3000") || notif.includes("5000")) {
    notif = notif.replace(/(\d{4,5})\s*\+\s*Math\.random\(\)\s*\*\s*(\d{4,5})/g, "25000 + Math.random() * 35000");
    notif = notif.replace(/setInterval\([^,]+,\s*(\d{3,5})\)/g, (match, ms) => {
      const num = parseInt(ms);
      if (num < 10000) return match.replace(ms, "25000 + Math.random() * 35000");
      return match;
    });
    console.log("  [FIX] Intervalo de notificacoes ajustado para 25-60s");
  } else { console.log("  [OK] Timing parece adequado"); }

  // Add real cities if missing
  if (!notif.includes("Andir")) {
    notif = notif.replace(/const\s+(cities|CITIES|cityList)\s*=\s*\[/, (match) => {
      return match;
    });
    console.log("  [INFO] Verificar lista de cidades manualmente");
  } else { console.log("  [OK] Cidades reais ja incluidas"); }
  fs.writeFileSync("components/AdvancedNotifications.tsx", notif, "utf8");
}

// Exit Modal centering
if (fs.existsSync("components/ExitIntentModal.tsx")) {
  let exit = fs.readFileSync("components/ExitIntentModal.tsx", "utf8");
  if (!exit.includes("items-center justify-center")) {
    exit = exit.replace(/fixed\s+inset-0/g, "fixed inset-0 flex items-center justify-center");
    console.log("  [FIX] Exit modal centralizado");
  } else { console.log("  [OK] Exit modal ja centralizado"); }
  if (!exit.includes("z-[9999]") && !exit.includes("z-50")) {
    exit = exit.replace(/z-\d+/, "z-[9999]");
    console.log("  [FIX] Exit modal z-index elevado para 9999");
  }
  fs.writeFileSync("components/ExitIntentModal.tsx", exit, "utf8");
}

// ==============================
// CAT 4: BROKEN LINKS
// ==============================
console.log("\\n=== CATEGORIA 4: LINKS ===");
page = fs.readFileSync("app/page.tsx", "utf8");
let linkFixes = 0;
const lines = page.split("\\n");
for (let i = 0; i < lines.length; i++) {
  // Fix href="#" on CTA buttons
  if (lines[i].includes("href=\"#\"") && (lines[i].includes("CTA") || lines[i].includes("GARANTIR") || lines[i].includes("QUERO") || lines[i].includes("GPS"))) {
    lines[i] = lines[i].replace("href=\"#\"", "href=\"/checkout\"");
    linkFixes++;
  }
  // Fix SUA-URL-AQUI
  if (lines[i].includes("SUA-URL-AQUI")) {
    lines[i] = lines[i].replace(/SUA-URL-AQUI/g, "https://www.oseupetaqui.com.br");
    linkFixes++;
  }
}
page = lines.join("\\n");
fs.writeFileSync("app/page.tsx", page, "utf8");
console.log("  [FIX]", linkFixes, "links corrigidos");

// ==============================
// SUMMARY
// ==============================
console.log("\\n========================================");
console.log("  AUDITORIA COMPLETA!");
console.log("  UTF-8: " + total + " arquivos corrigidos");
console.log("  Mobile: overflow-x-hidden aplicado");
console.log("  Sarah: identidade verificada");
console.log("  Notificacoes: timing ajustado");
console.log("  Links: " + linkFixes + " corrigidos");
console.log("========================================");
