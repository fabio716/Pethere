const{PrismaClient}=require("@prisma/client");const p=new PrismaClient();
async function main(){
  const c=await p.siteConfig.findFirst();
  if(!c){console.log("ERRO");return}
  await p.siteConfig.update({where:{id:c.id},data:{
    heroTitle:String.fromCharCode(80,114,111,116,101,106,97,32,113,117,101,109,32,118,111,99,234,32,97,109,97,32,99,111,109,32,97,32,116,101,99,110,111,108,111,103,105,97,32,113,117,101,32,101,108,101,32,109,101,114,101,99,101,46),
    heroSubtitle:"Assine o plano de 24 meses e ganhe o Rastreador GPS Pethere de presente!",
    heroCTA:String.fromCharCode(81,85,69,82,79,32,77,69,85,32,71,80,83,32,71,82,193,84,73,83,32,65,71,79,82,65),
    companyName:"Pethere GPS"
  }})
  console.log("OK! Textos corrigidos.")
}
main().catch(e=>console.error(e.message)).finally(()=>p.$disconnect());
