"use client";

import dynamic from "next/dynamic";

// A gaveta do carrinho só é baixada depois que a página abre (não pesa no carregamento inicial)
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });
export default CartDrawer;
