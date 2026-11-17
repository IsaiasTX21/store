import Link from "next/link";
import { t } from "@/lib/i18n";
import { site } from "@/site.config";

const A = ({ l }) =>
  l.external ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
  ) : (
    <Link href={l.href}>{l.label}</Link>
  );

const SVG = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);
const ICONS = {
  facebook: <SVG><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></SVG>,
  instagram: <SVG><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></SVG>,
  youtube: <SVG><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></SVG>,
  twitter: <SVG><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></SVG>,
};

export default function Footer({ columns = [], policies = [], hasSale = false }) {
  const socials = Object.entries(site.footer.social).filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>{t("footer.shop")}</h4>
          <ul>
            <li><Link href="/shop?sort=newest">{t("nav.new")}</Link></li>
            <li><Link href="/shop">{t("footer.all")}</Link></li>
            {hasSale && <li><Link href="/sale">{t("nav.sale")}</Link></li>}
            <li><Link href="/cart">{t("cart.title")}</Link></li>
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => <li key={l.href + l.label}><A l={l} /></li>)}
            </ul>
          </div>
        ))}
        {socials.length > 0 && (
          <div>
            <h4>{t("footer.social")}</h4>
            <div className="social">
              {socials.map(([n, url]) => (
                <a key={n} href={url} target="_blank" rel="noopener noreferrer" aria-label={n} title={n}>
                  {ICONS[n] || <span style={{ textTransform: "capitalize", fontSize: 12 }}>{n.slice(0, 2)}</span>}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="footer-base">
        <div className="legal">
          {policies.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
        <p>© {new Date().getFullYear()} {site.name}. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
