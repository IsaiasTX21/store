import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Tile from "@/components/Tile";
import { t } from "@/lib/i18n";
import { getCollections, getProducts } from "@/lib/shopify";
import { site } from "@/site.config";

// Cada coleção da Shopify é uma categoria da loja
const tileFor = (c) => ({
  href: `/collections/${c.handle}`,
  title: c.title,
  image: c.image || c.products.nodes[0]?.featuredImage || null,
});

export default async function Home() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 12 }),
    getCollections(20).catch(() => []),
  ]);

  // Capa: um slide por coleção que tenha imagem (a coleção definida em site.hero.collection vem primeiro)
  const heroCol = collections.find((c) => c.handle === site.hero.collection) || collections[0];
  const ordered = heroCol ? [heroCol, ...collections.filter((c) => c !== heroCol)] : collections;
  let slides = ordered.map(tileFor).filter((x) => x.image).slice(0, 8);
  if (!slides.length) slides = [{ href: "/shop", title: site.name, image: products[0]?.featuredImage || null }];

  const cards = collections.slice(0, 6).map(tileFor);
  const b = site.banner;

  return (
    <>
      {b.enabled && (
        <Link href={b.href} className="banner" style={{ "--banner-accent": b.color }}>
          <span>{b.left}</span>
          <strong>{b.center}</strong>
          <span className="banner-right">{b.right}</span>
        </Link>
      )}

      <h1 className="sr-only">{site.name}</h1>
      <HeroCarousel slides={slides} subtitle={site.hero.subtitle} cta={site.hero.cta} interval={site.hero.interval} />

      {cards.length > 0 && (
        <section className="wrap section" aria-label={site.sections.categoriesTitle}>
          <h2 className="title-sm">{site.sections.categoriesTitle}</h2>
          <div className="tiles-3">
            {cards.map((c) => <Tile key={c.href} {...c} size="tall" />)}
          </div>
        </section>
      )}

      <section className="wrap section" aria-label={site.sections.productsTitle}>
        <div className="section-head">
          <h2 className="title-xl">{site.sections.productsTitle}</h2>
          {products.length > 12 && <Link href="/shop" className="underline">{t("home.viewAll")}</Link>}
        </div>
        {products.length === 0 ? (
          <p className="empty-note">{t("home.empty")}</p>
        ) : (
          <div className="grid">
            {products.slice(0, 12).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {collections.length > 0 && (
        <section className="wrap section">
          <h2 className="title-sm">{t("home.allCategories")}</h2>
          <ul className="cat-links">
            {collections.map((c) => (
              <li key={c.id}><Link href={`/collections/${c.handle}`} className="cap">{c.title}</Link></li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
