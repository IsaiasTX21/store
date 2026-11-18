"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { addToCartAction, changeQuantityAction, removeFromCartAction } from "@/app/actions";
import { site } from "@/site.config";
import { t } from "@/lib/i18n";

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export default function CartProvider({ initialCart = null, children }) {
  const [cart, setCart] = useState(initialCart);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const busyRef = useRef(false);

  // O HTML da página não carrega o carrinho (fica cacheável); ele chega logo depois, com o navegador livre
  useEffect(() => {
    let off = false;
    const load = () =>
      fetch("/api/cart", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => { if (!off) setCart((prev) => prev ?? d.cart ?? null); })
        .catch(() => {});
    const id = "requestIdleCallback" in window ? window.requestIdleCallback(load, { timeout: 1500 }) : setTimeout(load, 250);
    return () => {
      off = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(id); else clearTimeout(id);
    };
  }, []);

  // Uma operação por vez: evita cliques rápidos usarem quantidades desatualizadas
  const run = useCallback(async (fn, openAfter = false) => {
    if (busyRef.current) return false;
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      const res = await fn();
      if (res?.cart) setCart(res.cart);
      if (res?.error) setError(res.error);
      else if (openAfter) setOpen(true);
      return !res?.error;
    } catch {
      setError(t("cart.error"));
      return false;
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }, []);

  const add = useCallback((variantId, qty = 1) => run(() => addToCartAction(variantId, qty), true), [run]);
  const setQuantity = useCallback((lineId, qty) => run(() => changeQuantityAction(lineId, qty)), [run]);
  const remove = useCallback((lineId) => run(() => removeFromCartAction(lineId)), [run]);

  const lines = cart?.lines?.nodes ?? [];
  const units = lines.reduce((n, l) => n + l.quantity, 0); // total de unidades
  const kinds = lines.length; // produtos diferentes (cor/tamanho distintos = itens distintos)
  // O contador do carrinho conta PRODUTOS (alterar quantidade não muda o contador).
  // Para contar unidades, use cartBadge: "unidades" em site.config.js
  const count = (site.cartBadge === "units" || site.cartBadge === "unidades") ? units : kinds;
  const subtotal =
    cart?.cost?.subtotalAmount ??
    (lines.length
      ? {
          amount: lines.reduce((s, l) => s + Number(l.cost.totalAmount.amount), 0),
          currencyCode: lines[0].cost.totalAmount.currencyCode,
        }
      : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo(
    () => ({
      cart, lines, count, units, kinds, subtotal, busy, error, open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add, setQuantity, remove,
    }),
    [cart, lines, count, units, kinds, subtotal, busy, error, open, add, setQuantity, remove]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
