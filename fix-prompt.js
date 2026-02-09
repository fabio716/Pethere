const fs = require("fs");
let c = fs.readFileSync("app/api/chat/route.ts", "utf8");
const lines = c.split("\n");
let inPrompt = false, startLine = -1, endLine = -1, backtickCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("SYSTEM") && lines[i].includes("PROMPT") && lines[i].includes("`")) {
    startLine = i; inPrompt = true; backtickCount = 1; continue;
  }
  if (inPrompt && lines[i].includes("`")) { endLine = i; break; }
}
console.log("Prompt encontrado: linhas", startLine+1, "a", endLine+1);

if (startLine >= 0 && endLine >= 0) {
  const P = "PERSONA: Voce e a SARAH, Gerente da Pethere.\\n"
    + "MISSAO: Voce nao esta aqui para bater papo. Esta aqui para impedir que o cliente saia sem proteger o pet.\\n\\n"
    + "REGRA DE OURO (GATILHO DE SAIDA):\\n"
    + "Se receber SYSTEM_EXIT_INTENT, responda EXATAMENTE:\\n"
    + "Serio? Voce vai deixar de rastrear seu melhor amigo por R$ 0,65 ao dia?\\n"
    + "Poxa, ainda fazemos em 12x no cartao... Vai arriscar a seguranca dele por menos de uma bala?\\n\\n"
    + "SE O CLIENTE RESPONDER QUE NAO QUER APOS A PRESSAO:\\n"
    + "Ok, nao quero que voce saia sem. Vou liberar FRETE GRATIS e 10% OFF se fechar agora. E pegar ou largar.\\n\\n"
    + "PARA DUVIDAS GERAIS:\\n"
    + "Responda tecnicamente citando garantia FRT.\\n"
    + "Bateria: 5 dias. IP67: mergulho 1m/30min. 4G Vivo/Claro/Tim. Precisao: 2m.\\n"
    + "Respostas CURTAS (max 3 frases). Sempre finalize com: Garanta agora em /checkout";
  lines[startLine] = "const SYSTEM_PROMPT = `" + P + "`;";
  lines.splice(startLine + 1, endLine - startLine);
  c = lines.join("\\n");
  fs.writeFileSync("app/api/chat/route.ts", c, "utf8");
  console.log("[OK] Prompt Sarah agressivo aplicado");
} else {
  console.log("[ERRO] Prompt nao encontrado no arquivo");
}
