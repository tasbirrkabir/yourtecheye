import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { slugify } from "@/lib/slugify";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

/**
 * POST /api/admin/upload
 * multipart/form-data with one or more "file" fields.
 * Images are normalised to webp (max 1920px wide) with sharp and stored in
 * /public/uploads. Returns { src } paths usable in next/image directly.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Expected multipart form data." }, { status: 400 });
  }

  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const uploaded: { src: string; width: number; height: number }[] = [];
  const errors: string[] = [];

  for (const file of files.slice(0, 10)) {
    if (!ALLOWED.has(file.type)) {
      errors.push(`${file.name}: unsupported format. Use JPG, PNG, WebP, GIF or AVIF.`);
      continue;
    }
    if (file.size > MAX_BYTES) {
      errors.push(`${file.name}: too large. Maximum 8 MB.`);
      continue;
    }

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const sharpModule = await import("sharp");
      const sharp = sharpModule.default;
      const base = sharp(buffer).rotate().resize({ width: 1920, withoutEnlargement: true });
      const meta = await base.metadata();
      const outName = `${Date.now().toString(36)}-${slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 48) || "photo"}.webp`;
      const outBuffer = await base.webp({ quality: 82 }).toBuffer();
      await writeFile(path.join(UPLOAD_DIR, outName), outBuffer);
      uploaded.push({
        src: `/uploads/${outName}`,
        width: meta.width ?? 1920,
        height: meta.height ?? 1080,
      });
    } catch (err) {
      console.error("[admin/upload] failed:", err);
      errors.push(`${file.name}: could not be processed.`);
    }
  }

  if (uploaded.length === 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(" ") || "Upload failed." },
      { status: 422 }
    );
  }

  return NextResponse.json({ ok: true, uploaded, errors });
}
