import { site } from "@/site.config";

// Endereço do botão "Checkout". Modos (site.config.js > checkout.mode):
//  "direct"   -> usa o checkoutUrl que a Shopify devolve (padrão)
//  "cn"       -> vai direto para /checkouts/cn/... (pula a página da loja; experimente primeiro este)
//  "password" -> passa pela página de senha da loja de desenvolvimento e volta ao checkout (usa os trechos de shopify-theme/)
export function checkoutHref(url) {
  if (!url) return "#";
  const mode = site.checkout?.mode ?? "direct";
  try {
    const u = new URL(url);
    if (mode === "cn") {
      u.pathname = u.pathname.replace(/^\/cart\/c\//, "/checkouts/cn/");
      return u.toString();
    }
    if (mode === "password") return `${u.origin}/password?next=${encodeURIComponent(url)}`;
  } catch {}
  return url;
}
