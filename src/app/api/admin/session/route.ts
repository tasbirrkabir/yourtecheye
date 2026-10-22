import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

/** Used by the admin client to check whether the session is still valid. */
export async function GET() {
  return NextResponse.json({ authenticated: await isAdmin() });
}
