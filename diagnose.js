const fs=require("fs");const{PrismaClient}=require("@prisma/client");const p=new PrismaClient();
p.order.findMany({take:5,orderBy:{createdAt:"desc"}}).then(d=>{console.log("PEDIDOS:",d.length);d.forEach(o=>console.log(" ",o.orderNumber,"|",o.customerName,"|",o.total,"|",o.status))}).catch(e=>console.log("ERRO:",e.message)).finally(()=>p.$disconnect());
const ck=fs.readFileSync("app/api/checkout/create/route.ts","utf8");
console.log("Checkout passa city?",ck.includes("city:"));
console.log("Checkout passa cep?",ck.includes("cep:"));
const pm=fs.readFileSync("lib/pagarme.ts","utf8");
console.log("Pagarme tem zip_code?",pm.includes("zip_code"));
console.log("Pagarme tem country?",pm.includes("BR"));
