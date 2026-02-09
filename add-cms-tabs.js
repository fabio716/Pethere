const fs = require("fs");
let c = fs.readFileSync("app/admin/cms/page.tsx", "utf8");

// Find the last TabsContent closing tag before the form closing
const lines = c.split("\n");
let insertLine = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes("</Tabs>")) { insertLine = i; break; }
}
console.log("Tabs fecha na linha:", insertLine + 1);

// Also need to add the tab triggers
let triggerLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("</TabsList>")) { triggerLine = i; break; }
}
console.log("TabsList fecha na linha:", triggerLine + 1);

// Add new tab triggers before </TabsList>
if (triggerLine >= 0 && !c.includes("value=\"kit\"")) {
  const newTriggers = "              <TabsTrigger value=\"kit\">Kit</TabsTrigger>\n              <TabsTrigger value=\"galeria\">Galeria</TabsTrigger>\n              <TabsTrigger value=\"passos\">Como Funciona</TabsTrigger>";
  lines.splice(triggerLine, 0, newTriggers);
  console.log("[OK] Tab triggers adicionados");
  // Recalculate insertLine after splice
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes("</Tabs>")) { insertLine = i; break; }
  }
}

// Build new tab content sections
const kitTab = [
  "          <TabsContent value=\"kit\" className=\"space-y-4\">",  
  "            <Card><CardHeader><CardTitle>Conte\u00fado do Pacote</CardTitle><CardDescription>Itens exibidos na se\u00e7\u00e3o do kit</CardDescription></CardHeader><CardContent className=\"space-y-3\">",  
  "              <div><Label>Imagem do Kit (URL)</Label><Input {...register(\"kitImage\")} placeholder=\"/uploads/kit.jpg\" /></div>",  
  "              <div><Label>Item 1</Label><Input {...register(\"kitItem1\")} /></div>",  
  "              <div><Label>Item 2</Label><Input {...register(\"kitItem2\")} /></div>",  
  "              <div><Label>Item 3</Label><Input {...register(\"kitItem3\")} /></div>",  
  "              <div><Label>Item 4</Label><Input {...register(\"kitItem4\")} /></div>",  
  "              <div><Label>Item 5</Label><Input {...register(\"kitItem5\")} /></div>",  
  "              <div className=\"grid grid-cols-2 gap-4\">",  
  "                <div><Label>T\u00edtulo Depoimentos</Label><Input {...register(\"testimonialsTitle\")} /></div>",  
  "                <div><Label>Subt\u00edtulo Depoimentos</Label><Input {...register(\"testimonialsSubtitle\")} /></div>",  
  "              </div>",  
  "            </CardContent></Card>",  
  "          </TabsContent>",  
].join("\n");

const galeriaTab = [
  "          <TabsContent value=\"galeria\" className=\"space-y-4\">",  
  "            <Card><CardHeader><CardTitle>Galeria de Evid\u00eancias</CardTitle><CardDescription>Imagens e v\u00eddeos dos 4 cards</CardDescription></CardHeader><CardContent className=\"space-y-4\">",  
  "              {[1,2,3,4].map(n => (",  
  "                <div key={n} className=\"border rounded-lg p-3 space-y-2\">",  
  "                  <p className=\"font-bold text-sm\">Card {n}</p>",  
  "                  <div className=\"grid grid-cols-2 gap-3\">",  
  "                    <div><Label>T\u00edtulo</Label><Input {...register(`gallery${n}Title` as any)} /></div>",  
  "                    <div><Label>Descri\u00e7\u00e3o</Label><Input {...register(`gallery${n}Desc` as any)} /></div>",  
  "                    <div><Label>URL Imagem</Label><Input {...register(`gallery${n}Image` as any)} placeholder=\"/uploads/foto.jpg\" /></div>",  
  "                    <div><Label>YouTube ID</Label><Input {...register(`gallery${n}Video` as any)} placeholder=\"dQw4w9WgXcQ\" /></div>",  
  "                  </div>",  
  "                </div>",  
  "              ))}",  
  "            </CardContent></Card>",  
  "          </TabsContent>",  
].join("\n");

const passosTab = [
  "          <TabsContent value=\"passos\" className=\"space-y-4\">",  
  "            <Card><CardHeader><CardTitle>Como Funciona</CardTitle><CardDescription>3 passos exibidos na landing page</CardDescription></CardHeader><CardContent className=\"space-y-4\">",  
  "              <div><Label>T\u00edtulo da Se\u00e7\u00e3o</Label><Input {...register(\"howTitle\")} /></div>",  
  "              {[1,2,3].map(n => (",  
  "                <div key={n} className=\"border rounded-lg p-3\">",  
  "                  <p className=\"font-bold text-sm mb-2\">Passo {n}</p>",  
  "                  <div className=\"grid grid-cols-3 gap-3\">",  
  "                    <div><Label>\u00cdcone</Label><Input {...register(`howStep${n}Icon` as any)} placeholder=\"Package\" /></div>",  
  "                    <div><Label>T\u00edtulo</Label><Input {...register(`howStep${n}Title` as any)} /></div>",  
  "                    <div><Label>Descri\u00e7\u00e3o</Label><Input {...register(`howStep${n}Desc` as any)} /></div>",  
  "                  </div>",  
  "                </div>",  
  "              ))}",  
  "            </CardContent></Card>",  
  "          </TabsContent>",  
].join("\n");

if (insertLine >= 0) {
  lines.splice(insertLine, 0, kitTab + "\n" + galeriaTab + "\n" + passosTab);
  c = lines.join("\n");
  fs.writeFileSync("app/admin/cms/page.tsx", c, "utf8");
  console.log("[OK] 3 novas abas adicionadas no admin CMS!");
  console.log("  - Kit (imagem + 5 itens + titulo depoimentos)");
  console.log("  - Galeria (4 cards com titulo/desc/imagem/video)");
  console.log("  - Como Funciona (titulo + 3 passos)");
} else {
  console.log("[ERRO] Nao encontrou </Tabs>");
}
