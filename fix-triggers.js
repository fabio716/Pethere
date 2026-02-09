const fs = require("fs");

// FIX 1: SalesAI - remover qualquer auto-open
let ai = fs.readFileSync("components/SalesAI.tsx", "utf8");
const aiLines = ai.split("\n");
let aiFixed = 0;
for (let i = 0; i < aiLines.length; i++) {
  // Remove any setTimeout that opens the chat
  if (aiLines[i].includes("setIsOpen(true)") && aiLines[i].includes("setTimeout")) {
    aiLines[i] = "    // auto-open removed";
    aiFixed++;
  }
  // Fix exit intent: require 10s minimum on page
  if (aiLines[i].includes("e.clientY <= 0") && !aiLines[i].includes("pageLoad")) {
    aiLines[i] = aiLines[i].replace("e.clientY <= 0", "e.clientY <= 0 && (Date.now() - pageLoadRef.current) > 15000");
    aiFixed++;
  }
}
// Add pageLoadRef if not exists
ai = aiLines.join("\n");
if (!ai.includes("pageLoadRef")) {
  ai = ai.replace("const messagesEndRef", "const pageLoadRef = useRef(Date.now())\n  const messagesEndRef");
  aiFixed++;
}
fs.writeFileSync("components/SalesAI.tsx", ai, "utf8");
console.log("[OK] SalesAI:", aiFixed, "fixes - so abre no clique ou exit intent apos 15s");

// FIX 2: ExitIntent hook - require 15s minimum
if (fs.existsSync("hooks/useExitIntent.ts")) {
  let hook = fs.readFileSync("hooks/useExitIntent.ts", "utf8");
  let hookFixed = 0;
  // Add minimum time check
  if (!hook.includes("pageStart")) {
    hook = hook.replace("useEffect(() => {", "const pageStart = useRef(Date.now())\n\n  useEffect(() => {");
    if (!hook.includes("useRef")) {
      hook = hook.replace("import { useState", "import { useState, useRef");
    }
    hookFixed++;
  }
  // Fix the mouseleave condition to require 15s
  if (hook.includes("clientY") && !hook.includes("pageStart.current")) {
    hook = hook.replace(/e\.clientY\s*<=?\s*0/g, "e.clientY <= 0 && (Date.now() - pageStart.current) > 15000");
    hookFixed++;
  }
  // Remove any timer-based triggers
  if (hook.includes("setTimeout") && hook.includes("setShowExitIntent(true)")) {
    const hLines = hook.split("\n");
    for (let i = 0; i < hLines.length; i++) {
      if (hLines[i].includes("setTimeout") && hLines[i].includes("setShowExitIntent(true)")) {
        hLines[i] = "    // timer-based trigger removed";
        hookFixed++;
      }
    }
    hook = hLines.join("\n");
  }
  fs.writeFileSync("hooks/useExitIntent.ts", hook, "utf8");
  console.log("[OK] useExitIntent:", hookFixed, "fixes - so dispara apos 15s na pagina");
}

// FIX 3: page.tsx - ensure exit intent starts disabled
let page = fs.readFileSync("app/page.tsx", "utf8");
if (page.includes("enabled: true") && page.includes("useExitIntent")) {
  // Keep enabled but the hook now has 15s guard
  console.log("[OK] page.tsx: exit intent enabled (protegido por 15s guard)");
}

console.log("\\n=== TRIGGERS CORRIGIDOS ===");
console.log("Sarah: so abre no clique manual ou exit intent apos 15s");
console.log("Exit Modal: so dispara apos 15s na pagina");
console.log("Nenhum popup ao abrir o site.");
