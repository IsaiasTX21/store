"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";

export default function HeroCarousel({ slides, subtitle, cta, interval = 5000 }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;


  const [ready, setReady] = useState(() => new Set([0]));
  useEffect(() => {
    setReady((prev) => {
      const n = new Set(prev);
      n.add(i);
      n.add((i + 1) % count);
      return n;
    });
  }, [i, count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = count > 1 && !userPaused && !hover && !reduced;
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((n) => (n + 1) % count), interval);
    return () => clearInterval(t); 
  }, [playing, count, interval, i]);

  const go = (n) => setI(((n % count) + count) % count);

  function onTouchEnd(e) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t("hero.aria")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, k) => {
        const active = k === i;
        return (
          <div
            key={s.href}
            className={`hero-slide ${active ? "is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={t("hero.group", { i: k + 1, n: count })}
            aria-hidden={!active}
          >
            {s.image && ready.has(k) && <Image src={s.image.url} alt="" fill priority={k === 0} quality={60} sizes="(max-width: 700px) calc(100vw - 2rem), (max-width: 1500px) calc(100vw - 6rem), 1500px" />}
            <div className="hero-copy">
              <h2 className="cap">{s.title}</h2>
              {subtitle && <p>{subtitle}</p>}
              <Link href={s.href} className="pill pill-lg" tabIndex={active ? 0 : -1}>{cta}</Link>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <>
          <button className="hero-arrow left" onClick={() => go(i - 1)} aria-label={t("hero.prev")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button className="hero-arrow right" onClick={() => go(i + 1)} aria-label={t("hero.next")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          <div className="hero-ui">
            <div className="hero-dots">
              {slides.map((s, k) => (
                <button key={s.href} className={k === i ? "is-on" : ""} aria-label={t("hero.goto", { name: s.title })} aria-current={k === i} onClick={() => go(k)} />
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live={playing ? "off" : "polite"}>{t("hero.slideOf", { i: i + 1, n: count, name: slides[i].title })}</p>
        </>
      )}
    </section>
  );
}
