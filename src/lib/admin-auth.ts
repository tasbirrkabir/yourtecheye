import { cookies } from "next/headers";
import { createHash, createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal, honest admin auth for the YTE blog panel.
 *
 * - A single shared password lives in ADMIN_PASSWORD (see .env.example).
 * - On login we set an HttpOnly, SameSite=Lax cookie holding an expiry
 *   timestamp plus an HMAC signature derived from the current password.
 *   Changing the password instantly invalidates every existing session.
 * - No tracking, no third parties, no database of sessions.
 *
 * SameSite=Lax also blocks cross-site POSTs, which is the CSRF surface
 * that matters for these endpoints. This is deliberately simple: it
 * protects a content panel, not a bank.
 */

export const ADMIN_COOKIE = "yte_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/** The effective admin password. Falls back to a documented dev default. */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "yourtecheye-admin";
}

function sessionSecret(): string {
  // Derived from the password so a password change revokes all sessions.
  return createHash("sha256")
    .update(`yte-admin-session::${adminPassword()}`)
    .digest("hex");
}

function sign(expiresAt: number): string {
  return createHmac("sha256", sessionSecret())
    .update(String(expiresAt))
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Verify a submitted password against ADMIN_PASSWORD. */
export function verifyPassword(submitted: string): boolean {
  if (!submitted) return false;
  return safeEqual(submitted, adminPassword());
}

/** Build the cookie value for a fresh session. */
export function issueToken(): { value: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_MS;
  return { value: `${expiresAt}.${sign(expiresAt)}`, maxAge: SESSION_MS / 1000 };
}

/** Check whether a cookie value is a valid, unexpired session token. */
export function verifyToken(value: string | undefined | null): boolean {
  if (!value) return false;
  const dot = value.indexOf(".");
  if (dot <= 0) return false;
  const expiresRaw = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!/^\d+$/.test(expiresRaw)) return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  return safeEqual(sig, sign(expiresAt));
}

/** Server-side check used by the /admin page and admin API routes. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
