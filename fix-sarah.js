const fs = require("fs");
let ai = fs.readFileSync("components/SalesAI.tsx", "utf8");
const r = [["Ana Paula Silva","Sarah"],["Ana Paula","Sarah"],["Especialista Pethere FRT","Gerente de Seguran\u00e7a Pethere"],["Especialista da Pethere","Gerente de Seguran\u00e7a Pethere"]];
for (const [a,b] of r) ai = ai.split(a).join(b);
ai = ai.replace(/\"Ana\"/g, "\"Sarah\"");
ai = ai.replace(/>Ana</g, ">Sarah<");
fs.writeFileSync("components/SalesAI.tsx", ai, "utf8");
console.log("[OK] Ana -> Sarah no frontend");
