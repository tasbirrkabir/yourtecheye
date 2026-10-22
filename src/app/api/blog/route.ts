import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog";

export const runtime = "nodejs";

/**
 * GET /api/blog?limit=10
 * Public read-only feed of published posts (used for lightweight clients;
 * the pages query the DB directly).
 */
export async function GET(req: NextRequest) {
  const limitRaw = req.nextUrl.searchParams.get("limit");
  const limit = limitRaw ? Math.min(Math.max(parseInt(limitRaw, 10) || 10, 1), 50) : undefined;
  const posts = await getPublishedPosts(limit);
  return NextResponse.json({ ok: true, count: posts.length, posts });
}
