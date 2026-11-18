import { Barlow_Condensed, Inter } from "next/font/google";
import CartDrawer from "@/components/LazyDrawer";
import CartProvider from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { accountsEnabled } from "@/lib/customer";
import { getFooter } from "@/lib/footer";
import { getCategories } from "@/lib/sale";
import { site } from "@/site.config";
import { t } from "@/lib/i18n";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const cond = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-cond", display: "swap" });

export const metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: t("meta.description", { name: site.name }),
};

// Define o tema antes da primeira pintura: escolha salva > configuração do site (sistema ou horário)
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){var m=${JSON.stringify(site.theme.default)};if(m==="auto-time"){var h=new Date().getHours();t=(h>=${Number(site.theme.darkFrom)}||h<${Number(site.theme.darkUntil)})?"dark":"light"}else if(m==="dark"||m==="light"){t=m}else{t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}}d.dataset.theme=t}catch(e){}})();`;

export default async function RootLayout({ children }) {
  // Nada aqui depende do visitante (cookies), então o HTML das páginas pode ser cacheado na CDN.
  const [collections, footer] = await Promise.all([
    getCategories(),
    getFooter().catch(() => ({ columns: [], policies: [], hasHelp: false })),
  ]);

  // Login e carrinho são carregados no navegador (/api/session e /api/cart), logo após a página abrir.
  const account = {
    loggedIn: false,
    name: "",
    href: accountsEnabled ? "/api/auth/login?returnTo=/account" : "/account",
  };

  const sale = collections.find((c) => c.isSale);
  const nav = [...collections.filter((c) => !c.isSale).slice(0, 5), ...(sale ? [sale] : [])];

  return (
    <html lang={t("html.lang")} className={`${body.variable} ${cond.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <CartProvider>
          <Header
            name={site.name}
            nav={nav}
            account={account}
            helpHref={footer.hasHelp ? "/pages/faq" : null}
            announcement={site.announcement}
          />
          <main>{children}</main>
          <Footer columns={footer.columns} policies={footer.policies} hasSale={Boolean(sale)} />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
