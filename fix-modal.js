const fs = require("fs");
let c = fs.readFileSync("components/ExitIntentModal.tsx", "utf8");
// Replace the broken inner fixed positioning with simple relative
c = c.replace(
  "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl mx-4",
  "relative z-[101] w-full max-w-md mx-auto"
);
fs.writeFileSync("components/ExitIntentModal.tsx", c, "utf8");
console.log("[OK] Exit modal: fixed -> relative, max-w-2xl -> max-w-md");
