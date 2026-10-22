import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { SLUG_RE, slugify, estimateReadMinutes } from "@/lib/blog";

export const runtime = "nodejs";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(160),
  slug: z.string().trim().max(90).optional().default(""),
  excerpt: z
    .string()
    .trim()
    .max(400, "Keep the excerpt under 400 characters.")
    .optional()
    .default(""),
  content: z.string().max(60000).optional().default(""),
  coverImage: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default(""),
  gallery: z
    .array(z.object({ src: z.string().trim().min(1).max(300), alt: z.string().trim().max(300).optional().default("") }))
    .max(24)
    .optional()
    .default([]),
  tags: z.string().trim().max(200).optional().default(""),
  author: z.string().trim().max(80).optional().default("Md Al-Amin"),
  sourceUrl: z.string().trim().max(400).optional().default(""),
  readMinutes: z.number().int().min(1).max(120).optional(),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

async function uniqueSlug(base: string): Promise<string> {
  let candidate = base || "post";
  let n = 1;
  // Prisma needs a distinct slug; append -2, -3, ... until free.
  for (;;) {
    const clash = await db.blogPost.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!clash) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

/** GET /api/admin/posts: every post, any status, newest first. */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  const posts = await db.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true, slug: true, title: true, excerpt: true, status: true,
      tags: true, author: true, coverImage: true, publishedAt: true,
      createdAt: true, updatedAt: true, readMinutes: true,
    },
  });
  return NextResponse.json({ ok: true, posts });
}

/** POST /api/admin/posts: create a post. */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 }
    );
  }
  const data = parsed.data;

  let slug = slugify(data.slug || data.title);
  if (!SLUG_RE.test(slug)) slug = `post-${Date.now().toString(36)}`;
  slug = await uniqueSlug(slug);

  const created = await db.blogPost.create({
    data: {
      slug,
      title: data.title,
      excerpt: data.excerpt || data.content.replace(/[#>*!\-\[\]()\n]/g, " ").split(/\s+/).filter(Boolean).slice(0, 28).join(" ") + "…",
      content: data.content,
      coverImage: data.coverImage || null,
      gallery: JSON.stringify(data.gallery),
      tags: data.tags,
      author: data.author || "Md Al-Amin",
      sourceUrl: data.sourceUrl || null,
      readMinutes: data.readMinutes ?? estimateReadMinutes(data.content),
      status: data.status,
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });

  return NextResponse.json({ ok: true, id: created.id, slug: created.slug }, { status: 201 });
}
