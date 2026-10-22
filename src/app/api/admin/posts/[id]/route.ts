import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { SLUG_RE, slugify, estimateReadMinutes } from "@/lib/blog";

export const runtime = "nodejs";

const patchSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(160).optional(),
  slug: z.string().trim().max(90).optional(),
  excerpt: z.string().trim().max(400).optional(),
  content: z.string().max(60000).optional(),
  coverImage: z.string().trim().max(300).optional(),
  gallery: z
    .array(
      z.object({
        src: z.string().trim().min(1).max(300),
        alt: z.string().trim().max(300).optional().default(""),
      })
    )
    .max(24)
    .optional(),
  tags: z.string().trim().max(200).optional(),
  author: z.string().trim().max(80).optional(),
  sourceUrl: z.string().trim().max(400).optional(),
  readMinutes: z.number().int().min(1).max(120).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

type Params = { params: Promise<{ id: string }> };

async function resolvePost(id: string) {
  // Accept either the cuid or the slug (admin links may use either).
  return (
    (await db.blogPost.findUnique({ where: { id } })) ??
    (await db.blogPost.findUnique({ where: { slug: id } }))
  );
}

/** GET /api/admin/posts/[id]: full row, any status. */
export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  const { id } = await params;
  const post = await resolvePost(id);
  if (!post) return NextResponse.json({ ok: false, error: "Post not found." }, { status: 404 });
  return NextResponse.json({ ok: true, post });
}

/** PATCH /api/admin/posts/[id]: update any subset of fields. */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await resolvePost(id);
  if (!existing) return NextResponse.json({ ok: false, error: "Post not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 }
    );
  }
  const data = parsed.data;

  // Slug change: validate + keep unique.
  let slug: string | undefined;
  if (data.slug !== undefined && data.slug !== existing.slug) {
    slug = slugify(data.slug || data.title || existing.title);
    if (!SLUG_RE.test(slug)) slug = existing.slug;
    if (slug !== existing.slug) {
      const clash = await db.blogPost.findUnique({ where: { slug }, select: { id: true } });
      if (clash && clash.id !== existing.id) slug = existing.slug;
    }
  }

  const updated = await db.blogPost.update({
    where: { id: existing.id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(slug !== undefined ? { slug } : {}),
      ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.coverImage !== undefined ? { coverImage: data.coverImage || null } : {}),
      ...(data.gallery !== undefined ? { gallery: JSON.stringify(data.gallery) } : {}),
      ...(data.tags !== undefined ? { tags: data.tags } : {}),
      ...(data.author !== undefined ? { author: data.author || "Md Al-Amin" } : {}),
      ...(data.sourceUrl !== undefined ? { sourceUrl: data.sourceUrl || null } : {}),
      ...(data.readMinutes !== undefined
        ? { readMinutes: data.readMinutes }
        : data.content !== undefined
          ? { readMinutes: estimateReadMinutes(data.content) }
          : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      // First publish stamps publishedAt; re-publishing keeps the original date.
      ...(data.status === "published" && !existing.publishedAt ? { publishedAt: new Date() } : {}),
    },
  });

  return NextResponse.json({ ok: true, post: { id: updated.id, slug: updated.slug, status: updated.status } });
}

/** DELETE /api/admin/posts/[id] */
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  const { id } = await params;
  const existing = await resolvePost(id);
  if (!existing) return NextResponse.json({ ok: false, error: "Post not found." }, { status: 404 });
  await db.blogPost.delete({ where: { id: existing.id } });
  return NextResponse.json({ ok: true });
}
