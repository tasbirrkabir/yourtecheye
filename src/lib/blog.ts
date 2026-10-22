/**
 * Shared blog helpers: gallery parsing, slug rules, and the published-post
 * query used by the homepage, /blog, /blog/[slug] and the sitemap.
 */
import { db } from "@/lib/db";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PublicPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
  author: string;
  publishedAt: Date | null;
  readMinutes: number;
  sourceUrl: string | null;
}

export function parseGallery(json: string | null | undefined): GalleryImage[] {
  if (!json) return [];
  try {
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (g): g is GalleryImage =>
          !!g &&
          typeof g === "object" &&
          typeof (g as GalleryImage).src === "string" &&
          (g as GalleryImage).src.length > 0
      )
      .map((g) => ({ src: g.src, alt: typeof g.alt === "string" ? g.alt : "" }));
  } catch {
    return [];
  }
}

export function parseTags(csv: string | null | undefined): string[] {
  if (!csv) return [];
  return csv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

/** Rough reading time: 200 words per minute, minimum 1. */
export function estimateReadMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Latest published posts. Used by homepage + /blog. Never throws. */
export async function getPublishedPosts(limit?: number): Promise<PublicPost[]> {
  try {
    const rows = await db.blogPost.findMany({
      where: { status: "published" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      ...(limit ? { take: limit } : {}),
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      coverImage: r.coverImage,
      tags: parseTags(r.tags),
      author: r.author,
      publishedAt: r.publishedAt,
      readMinutes: r.readMinutes,
      sourceUrl: r.sourceUrl,
    }));
  } catch (err) {
    console.error("[blog] failed to load published posts", err);
    return [];
  }
}
