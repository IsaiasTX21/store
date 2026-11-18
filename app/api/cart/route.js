import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCart } from "@/lib/shopify";

export const dynamic = "force-dynamic";
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) return NextResponse.json({ cart: null }, { headers: NO_STORE });
  try {
    return NextResponse.json({ cart: await getCart(cartId) }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ cart: null }, { headers: NO_STORE });
  }
}
