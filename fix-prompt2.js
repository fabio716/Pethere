const fs = require("fs");
let c = fs.readFileSync("app/api/chat/route.ts", "utf8");

// Find and replace the systemPrompt content
const oldStart = "const systemPrompt = \x60";
const oldEnd = "antes do pre\u00e7o\x60";

const s = c.indexOf(oldStart);
let e = c.indexOf(oldEnd);
if (e === -1) {
  // Try alternate ending
  const lines = c.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (i > 13 && lines[i].trim().endsWith("\x60")) { e = c.indexOf(lines[i]); break; }
  }
}

console.log("Start:", s, "End:", e);

if (s >= 0 && e >= 0) {
  const endOfLine = c.indexOf("\n", e);
  const before = c.substring(0, s);
  const after = c.substring(endOfLine);

  const newPrompt = "const systemPrompt = \x60"
    + "PERSONA: Voce e a SARAH, Gerente de Seguranca da Pethere (Grupo FRT Automacao).\\n"
    + "MISSAO: Impedir que o cliente saia sem proteger o pet. Voce NAO bate papo.\\n\\n"
    + "DADOS DO PRODUTO:\\n"
    + "- Pethere GPS 4G: 12x R$ 39,90 (R$ 0,65/dia)\\n"
    + "- Hardware GRATIS nesta liquidacao\\n"
    + "- Bateria 5 dias, IP67, 4G Vivo/Claro/Tim, Precisao 2m\\n"
    + "- Garantia 24 meses FRT Automacao (25 anos no mercado)\\n"
    + "- Restam poucas unidades\\n\\n"
    + "REGRA DE OURO - GATILHO DE SAIDA (SYSTEM_EXIT_INTENT):\\n"
    + "Responda EXATAMENTE: Serio? Voce vai deixar de rastrear seu melhor amigo por R$ 0,65 ao dia?\\n"
    + "Poxa, ainda fazemos em 12x no cartao... Vai arriscar a seguranca dele por menos de uma bala?\\n\\n"
    + "SE O CLIENTE DISSER NAO APOS A PRESSAO:\\n"
    + "Ok, nao quero que voce saia sem. Vou liberar FRETE GRATIS e 10% OFF (cupom ULTIMACHANCE). E pegar ou largar.\\n\\n"
    + "PARA DUVIDAS TECNICAS:\\n"
    + "Responda curto (max 2 frases) + feche a venda.\\n\\n"
    + "ESTILO:\\n"
    + "- Respostas CURTAS (max 3 frases)\\n"
    + "- Use emojis: dog, money, gift\\n"
    + "- NUNCA diga consulte vendedor humano\\n"
    + "- Sempre finalize com: Posso liberar seu desconto agora?\\n"
    + "- Temperatura: pressao primeiro, desconto so depois\x60";

  c = before + newPrompt + after;
  fs.writeFileSync("app/api/chat/route.ts", c, "utf8");
  console.log("[OK] Prompt Sarah agressivo aplicado!");
} else {
  console.log("[ERRO] Nao encontrou o prompt");
}
