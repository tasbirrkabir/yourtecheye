import { NextRequest, NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export interface UploadedImageInfo {
  src: string;
  name: string;
  bytes: number;
  modified: string;
}

/** GET /api/admin/images: list every uploaded image with basic metadata. */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  try {
    const entries = await readdir(UPLOAD_DIR);
    const images: UploadedImageInfo[] = [];
    for (const name of entries) {
      if (!/\.(webp|jpe?g|png|gif|avif)$/i.test(name)) continue;
      const full = path.join(UPLOAD_DIR, name);
      const info = await stat(full);
      if (!info.isFile()) continue;
      images.push({
        src: `/uploads/${name}`,
        name,
        bytes: info.size,
        modified: info.mtime.toISOString(),
      });
    }
    images.sort((a, b) => b.modified.localeCompare(a.modified));
    return NextResponse.json({ ok: true, images });
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      return NextResponse.json({ ok: true, images: [] });
    }
    console.error("[admin/images] list failed:", err);
    return NextResponse.json({ ok: false, error: "Could not list uploads." }, { status: 500 });
  }
}

/** DELETE /api/admin/images?src=/uploads/name.webp */
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }

  const src = req.nextUrl.searchParams.get("src") ?? "";
  // Strict guard: only files directly inside /public/uploads can be removed.
  if (!/^\/uploads\/[a-zA-Z0-9._-]+$/.test(src)) {
    return NextResponse.json({ ok: false, error: "Invalid image path." }, { status: 400 });
  }

  const full = path.join(UPLOAD_DIR, path.basename(src));
  try {
    await unlink(full);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      return NextResponse.json({ ok: true, note: "already gone" });
    }
    console.error("[admin/images] delete failed:", err);
    return NextResponse.json({ ok: false, error: "Could not delete image." }, { status: 500 });
  }
}
