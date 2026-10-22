import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, issueToken, verifyPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

/** Naive in-memory throttle: 10 attempts per window. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 10;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = list.length >= MAX_HITS;
  if (!limited) list.push(now);
  hits.set(key, list);
  return limited;
}

export async function POST(req: NextRequest) {
  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Wait ten minutes and try again." },
      { status: 429 }
    );
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyPassword(password)) {
    // Deliberately vague: never reveal whether the password exists.
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const token = issueToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: token.value,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: token.maxAge,
  });
  return res;
}
