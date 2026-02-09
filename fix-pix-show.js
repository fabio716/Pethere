const fs = require("fs");
let c = fs.readFileSync("app/checkout/page.tsx", "utf8");
const lines = c.split("\n");

// Check if pixCode state exists
let hasPixState = c.includes("pixCode");
let hasSetPixCode = c.includes("setPixCode");
console.log("pixCode state:", hasPixState);
console.log("setPixCode:", hasSetPixCode);

// Find what happens after successful submit
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("setStep") || lines[i].includes("setOrderId") || lines[i].includes("pixQrCode") || lines[i].includes("pixCode")) {
    console.log((i+1) + "|" + lines[i].trim());
  }
}
