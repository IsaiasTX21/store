import { NextResponse } from "next/server";
import { accountsEnabled } from "@/lib/customer";
import { readSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = await readSession();
  return NextResponse.json(
    { loggedIn: s.loggedIn, name: s.name, href: s.loggedIn || !accountsEnabled ? "/account" : "/api/auth/login?returnTo=/account" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
