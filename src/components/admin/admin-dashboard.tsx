"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  FilePlus2,
  ImagePlus,
  LogOut,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface AdminPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  tags: string;
  author: string;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readMinutes: number;
}

interface PostFull extends AdminPostRow {
  content: string;
  sourceUrl: string | null;
  gallery: string;
}

interface GalleryItem {
  src: string;
  alt: string;
}

interface MediaImage {
  src: string;
  name: string;
  bytes: number;
  modified: string;
}

interface Draft {
  id: string | null;
  title: string;
  slug: string;
  slugTouched: boolean;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery: GalleryItem[];
  tags: string;
  author: string;
  sourceUrl: string;
  status: "draft" | "published";
}

const EMPTY_DRAFT: Draft = {
  id: null,
  title: "",
  slug: "",
  slugTouched: false,
  excerpt: "",
  content: "",
  coverImage: "",
  gallery: [],
  tags: "",
  author: "Md Al-Amin",
  sourceUrl: "",
  status: "draft",
};

function slugifyLocal(input: string): string {
  return input
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function fmtDate(iso: string | null): string {
  if (!iso) return "unscheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

export function AdminDashboard() {
  const router = useRouter();

  const [tab, setTab] = useState<"posts" | "media">("posts");
  const [posts, setPosts] = useState<AdminPostRow[]>([]);
  const [media, setMedia] = useState<MediaImage[]>([]);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null); // which action is running
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const messageTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((kind: "ok" | "err", text: string) => {
    setMessage({ kind, text });
    window.clearTimeout(messageTimer.current);
    messageTimer.current = window.setTimeout(() => setMessage(null), 6000);
  }, []);

  /* ----------------------------- data loading --------------------- */

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/admin/posts", { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) setPosts(data.posts as AdminPostRow[]);
    else notify("err", "Could not load posts.");
  }, [router, notify]);

  const loadMedia = useCallback(async () => {
    const res = await fetch("/api/admin/images", { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) setMedia(data.images as MediaImage[]);
    else notify("err", "Could not load the media library.");
  }, [router, notify]);

  useEffect(() => {
    Promise.all([loadPosts(), loadMedia()]).finally(() => setLoading(false));
    return () => window.clearTimeout(messageTimer.current);
  }, [loadPosts, loadMedia]);

  /* ----------------------------- editor --------------------------- */

  function openNew() {
    setDraft({ ...EMPTY_DRAFT });
    setTab("posts");
    requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function openEdit(id: string) {
    setBusy(`open:${id}`);
    const res = await fetch(`/api/admin/posts/${id}`, { cache: "no-store" });
    setBusy(null);
    if (res.status === 401) return router.refresh();
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return notify("err", "Could not open that entry.");

    const p = data.post as PostFull;
    let gallery: GalleryItem[] = [];
    try {
      const parsed: unknown = JSON.parse(p.gallery || "[]");
      if (Array.isArray(parsed)) {
        gallery = parsed.filter(
          (g): g is GalleryItem => !!g && typeof g === "object" && typeof (g as GalleryItem).src === "string"
        );
      }
    } catch {
      gallery = [];
    }

    setDraft({
      id: p.id,
      title: p.title,
      slug: p.slug,
      slugTouched: true,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage ?? "",
      gallery,
      tags: p.tags,
      author: p.author,
      sourceUrl: p.sourceUrl ?? "",
      status: p.status === "published" ? "published" : "draft",
    });
    setTab("posts");
    requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setTitle(value: string) {
    setDraft((d) => ({
      ...d,
      title: value,
      slug: d.slugTouched ? d.slug : slugifyLocal(value),
    }));
  }

  /* ----------------------------- saving --------------------------- */

  function buildPayload(status?: "draft" | "published") {
    const effectiveStatus = status ?? draft.status;
    return {
      title: draft.title.trim(),
      slug: draft.slug.trim() || slugifyLocal(draft.title.trim()),
      excerpt: draft.excerpt.trim(),
      content: draft.content,
      coverImage: draft.coverImage,
      gallery: draft.gallery,
      tags: draft.tags,
      author: draft.author.trim() || "Md Al-Amin",
      sourceUrl: draft.sourceUrl.trim(),
      status: effectiveStatus,
    };
  }

  function validate(): string | null {
    if (!draft.title.trim()) return "A title is required before saving.";
    if (draft.excerpt.length > 400) return "The excerpt must stay under 400 characters.";
    return null;
  }

  async function save(status?: "draft" | "published") {
    const problem = validate();
    if (problem) return notify("err", problem);

    const effectiveStatus = status ?? draft.status;
    setBusy("save");
    try {
      const res = await fetch(draft.id ? `/api/admin/posts/${draft.id}` : "/api/admin/posts", {
        method: draft.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(status)),
      });
      if (res.status === 401) return router.refresh();
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        notify("err", data?.error || "Save failed. Try again.");
      } else {
        setDraft((d) => ({
          ...d,
          id: data.id ?? d.id,
          slug: data.slug ?? d.slug,
          status: effectiveStatus,
        }));
        notify("ok", effectiveStatus === "published" ? "Entry published." : "Draft saved.");
        await loadPosts();
      }
    } catch {
      notify("err", "Network error while saving.");
    } finally {
      setBusy(null);
    }
  }

  async function removePost(id: string, title: string) {
    if (!window.confirm(`Delete "${title}" permanently? This cannot be undone.`)) return;
    setBusy(`delete:${id}`);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.status === 401) return router.refresh();
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        if (draft.id === id) setDraft({ ...EMPTY_DRAFT });
        notify("ok", `Deleted "${title}".`);
        await loadPosts();
      } else {
        notify("err", data?.error || "Delete failed.");
      }
    } catch {
      notify("err", "Network error while deleting.");
    } finally {
      setBusy(null);
    }
  }

  async function togglePublish(row: AdminPostRow) {
    const next = row.status === "published" ? "draft" : "published";
    setBusy(`toggle:${row.id}`);
    try {
      const res = await fetch(`/api/admin/posts/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.status === 401) return router.refresh();
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        notify("ok", next === "published" ? `"${row.title}" is live.` : `"${row.title}" moved back to draft.`);
        await loadPosts();
        if (draft.id === row.id) setDraft((d) => ({ ...d, status: next as Draft["status"] }));
      } else {
        notify("err", data?.error || "Status change failed.");
      }
    } catch {
      notify("err", "Network error.");
    } finally {
      setBusy(null);
    }
  }

  /* ----------------------------- uploads -------------------------- */

  async function uploadFiles(files: FileList | File[]): Promise<{ src: string; width: number; height: number }[]> {
    const fd = new FormData();
    for (const f of Array.from(files)) fd.append("file", f);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.status === 401) {
      router.refresh();
      return [];
    }
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
      notify("err", data?.error || "Upload failed.");
      return [];
    }
    const uploaded = data.uploaded as { src: string; width: number; height: number }[];
    if (data.errors?.length) notify("err", (data.errors as string[]).join(" "));
    await loadMedia();
    return uploaded;
  }

  async function onCoverSelected(files: FileList | null) {
    if (!files?.length) return;
    setBusy("cover");
    const [img] = await uploadFiles(files);
    setBusy(null);
    if (img) {
      setField("coverImage", img.src);
      notify("ok", "Cover image updated.");
    }
    if (coverInputRef.current) coverInputRef.current.value = "";
  }

  async function onGallerySelected(files: FileList | null) {
    if (!files?.length) return;
    setBusy("gallery");
    const uploaded = await uploadFiles(files);
    setBusy(null);
    if (uploaded.length) {
      setDraft((d) => ({
        ...d,
        gallery: [...d.gallery, ...uploaded.map((u) => ({ src: u.src, alt: "" }))].slice(0, 24),
      }));
      notify("ok", `${uploaded.length} photo${uploaded.length === 1 ? "" : "s"} added to the gallery.`);
    }
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  async function onMediaSelected(files: FileList | null) {
    if (!files?.length) return;
    setBusy("media");
    const uploaded = await uploadFiles(files);
    setBusy(null);
    if (uploaded.length) notify("ok", `${uploaded.length} file${uploaded.length === 1 ? "" : "s"} uploaded to the library.`);
    if (mediaInputRef.current) mediaInputRef.current.value = "";
  }

  async function deleteMedia(img: MediaImage) {
    if (!window.confirm(`Delete ${img.name} from the library? Posts that embed it will show a broken image.`)) return;
    setBusy(`media-del:${img.src}`);
    try {
      const res = await fetch(`/api/admin/images?src=${encodeURIComponent(img.src)}`, { method: "DELETE" });
      if (res.status === 401) return router.refresh();
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setMedia((m) => m.filter((x) => x.src !== img.src));
        setDraft((d) => ({
          ...d,
          coverImage: d.coverImage === img.src ? "" : d.coverImage,
          gallery: d.gallery.filter((g) => g.src !== img.src),
        }));
        notify("ok", `Deleted ${img.name}.`);
      } else {
        notify("err", data?.error || "Delete failed.");
      }
    } finally {
      setBusy(null);
    }
  }

  async function copyPath(src: string) {
    try {
      await navigator.clipboard.writeText(src);
      setCopied(src);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      notify("err", "Clipboard blocked by the browser. Path: " + src);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  /* ----------------------------- rendering ------------------------ */

  const draftRead = Math.max(1, Math.round(wordCount(draft.content) / 200));
  const publishedCount = posts.filter((p) => p.status === "published").length;

  const labelCls = "block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink";
  const inputCls =
    "mt-2 w-full border-2 border-ink bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-smoke/60 focus-visible:ring-2 focus-visible:ring-ring";
  const smallBtn =
    "inline-flex items-center gap-1.5 border-2 border-ink px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.25em]">
            <span className="rec-blink inline-block h-2 w-2 bg-signal" aria-hidden="true" />
            YTE ops desk
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1.5 border border-line-dark px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/80 hover:border-paper hover:text-paper sm:inline-flex"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 border border-line-dark px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/80 hover:border-signal hover:bg-signal hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Status line */}
      <div aria-live="polite" className="sr-only">
        {message?.text}
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs + actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex" role="tablist" aria-label="Admin sections">
            {(
              [
                ["posts", `Entries (${posts.length})`],
                ["media", `Library (${media.length})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={
                  "-mb-px border-2 border-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (tab === key ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-secondary")
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={openNew} className={smallBtn + " border-signal bg-signal text-paper hover:border-ink hover:bg-ink hover:text-paper"}>
              <FilePlus2 className="h-3.5 w-3.5" aria-hidden="true" />
              New entry
            </button>
            <button
              type="button"
              onClick={() => Promise.all([loadPosts(), loadMedia()]).then(() => notify("ok", "Lists refreshed."))}
              className={smallBtn}
              aria-label="Refresh lists"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Message bar */}
        {message && (
          <p
            className={
              "mt-5 border-2 px-4 py-3 text-sm font-bold " +
              (message.kind === "ok"
                ? "border-ink bg-paper text-ink"
                : "border-signal bg-signal/10 text-ink")
            }
          >
            <span className={"mr-2 inline-block h-2 w-2 " + (message.kind === "ok" ? "bg-signal" : "bg-signal rec-blink")} aria-hidden="true" />
            {message.text}
          </p>
        )}

        {loading ? (
          <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.25em] text-smoke">
            Loading the desk…
          </p>
        ) : tab === "media" ? (
          /* ------------------------------------------------ Media tab */
          <section aria-label="Media library" className="mt-8">
            <div className="border-2 border-ink bg-paper p-6">
              <h2 className="stretch-wide text-xl font-black uppercase tracking-tight text-ink">Media library</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-smoke">
                Uploads are converted to WebP and stored on the server. Paste a
                path into the body with the figure syntax:{" "}
                <code className="border border-line bg-secondary px-1.5 py-0.5 font-mono text-xs">![alt](/uploads/name.webp)</code>
              </p>
              <input
                ref={mediaInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                multiple
                onChange={(e) => onMediaSelected(e.target.files)}
                className="hidden"
                aria-label="Upload images to the library"
              />
              <button
                type="button"
                onClick={() => mediaInputRef.current?.click()}
                disabled={busy === "media"}
                className="mt-5 inline-flex h-12 items-center gap-2 border-2 border-ink bg-ink px-6 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                {busy === "media" ? "Uploading…" : "Upload images"}
              </button>
            </div>

            {media.length === 0 ? (
              <p className="mt-6 border-2 border-dashed border-line bg-paper p-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-smoke">
                Library is empty. Upload the first photo above.
              </p>
            ) : (
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {media.map((img) => (
                  <li key={img.src} className="border-2 border-ink bg-paper">
                    <div className="relative aspect-[4/3] bg-ink">
                      <Image src={img.src} alt={img.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" unoptimized={img.src.endsWith(".webp") ? false : undefined} />
                    </div>
                    <div className="p-3">
                      <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-smoke" title={img.name}>
                        {img.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">
                        {fmtBytes(img.bytes)} / {fmtDate(img.modified)}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => copyPath(img.src)} className={smallBtn + " flex-1 justify-center px-2"}>
                          {copied === img.src ? "Copied" : "Copy path"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMedia(img)}
                          disabled={busy === `media-del:${img.src}`}
                          className="inline-flex items-center justify-center border-2 border-ink px-2.5 py-2 text-ink transition-colors hover:border-signal hover:bg-signal hover:text-paper disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`Delete ${img.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          /* ------------------------------------------------ Posts tab */
          <div className="mt-8 grid gap-8 xl:grid-cols-[22rem_1fr]">
            {/* List */}
            <section aria-label="All entries" className="min-w-0">
              <h2 className="sr-only">All blog entries</h2>
              {posts.length === 0 ? (
                <p className="border-2 border-dashed border-line bg-paper p-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-smoke">
                  No entries yet. Start the first one.
                </p>
              ) : (
                <ul className="border-t-2 border-ink">
                  {posts.map((p) => (
                    <li key={p.id} className="border-b-2 border-ink bg-paper">
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                            <span
                              className={"inline-block h-2 w-2 " + (p.status === "published" ? "bg-signal" : "border border-ink bg-transparent")}
                              aria-hidden="true"
                            />
                            <span className={p.status === "published" ? "text-signal" : "text-smoke"}>
                              {p.status === "published" ? "Live" : "Draft"}
                            </span>
                            <span aria-hidden="true" className="text-line">/</span>
                            <span className="text-smoke">{fmtDate(p.publishedAt ?? p.updatedAt)}</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                            {p.readMinutes} min
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openEdit(p.id)}
                          className="mt-2 block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="stretch-wide block text-base font-black uppercase leading-tight tracking-tight text-ink hover:text-signal">
                            {p.title}
                          </span>
                          <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">
                            /blog/{p.slug}
                          </span>
                        </button>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePublish(p)}
                            disabled={busy === `toggle:${p.id}`}
                            className={smallBtn + " px-2.5 py-1.5"}
                          >
                            {p.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                          {p.status === "published" && (
                            <Link href={`/blog/${p.slug}`} target="_blank" className={smallBtn + " px-2.5 py-1.5"}>
                              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                              View
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => removePost(p.id, p.title)}
                            disabled={busy === `delete:${p.id}`}
                            className="inline-flex items-center gap-1.5 border-2 border-ink px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-signal hover:bg-signal hover:text-paper disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-smoke">
                {publishedCount} live / {posts.length - publishedCount} draft. Drafts are hidden from the public site.
              </p>
            </section>

            {/* Editor */}
            <section ref={editorRef} aria-label="Entry editor" className="min-w-0 border-2 border-ink bg-paper">
              <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-secondary/60 px-5 py-3">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink">
                  {draft.id ? "Editing entry" : "New entry"}
                </p>
                {draft.id && (
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
                    /blog/{draft.slug}
                  </p>
                )}
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="f-title" className={labelCls}>Title</label>
                    <input
                      id="f-title"
                      type="text"
                      value={draft.title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. How a garage break-in was stopped at 02:41"
                      className={inputCls}
                      maxLength={160}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-slug" className={labelCls}>URL slug</label>
                      <input
                        id="f-slug"
                        type="text"
                        value={draft.slug}
                        onChange={(e) => setDraft((d) => ({ ...d, slug: slugifyLocal(e.target.value), slugTouched: true }))}
                        placeholder="auto-generated-from-title"
                        className={inputCls + " font-mono"}
                        maxLength={90}
                      />
                    </div>
                    <div>
                      <label htmlFor="f-status" className={labelCls}>Status</label>
                      <select
                        id="f-status"
                        value={draft.status}
                        onChange={(e) => setField("status", e.target.value as Draft["status"])}
                        className={inputCls}
                      >
                        <option value="draft">Draft: hidden from the site</option>
                        <option value="published">Published: live on the site</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-excerpt" className={labelCls}>
                      Excerpt <span className="font-normal text-smoke">({draft.excerpt.length}/400)</span>
                    </label>
                    <textarea
                      id="f-excerpt"
                      value={draft.excerpt}
                      onChange={(e) => setField("excerpt", e.target.value)}
                      rows={2}
                      maxLength={400}
                      placeholder="One or two sentences shown in lists and search results."
                      className={inputCls + " resize-y leading-relaxed"}
                    />
                  </div>

                  <div>
                    <label htmlFor="f-content" className={labelCls}>Body</label>
                    <textarea
                      id="f-content"
                      value={draft.content}
                      onChange={(e) => setField("content", e.target.value)}
                      rows={16}
                      placeholder={"## A heading\n\nA paragraph.\n\n- a bullet point\n1. a numbered point\n\n> A pull quote\n\n![alt text](/uploads/photo.webp)\n\n---"}
                      className={inputCls + " resize-y font-mono text-[13px] leading-relaxed"}
                    />
                    <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-smoke">
                      Syntax: ## heading / - bullet / 1. number / &gt; quote / ![alt](path) figure / --- rule / **bold** / [text](https://link).
                      About {draftRead} min read at the current length.
                    </p>
                  </div>

                  {/* Cover image */}
                  <fieldset className="border-2 border-ink p-4">
                    <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink">Cover image</legend>
                    {draft.coverImage ? (
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative aspect-video w-full border-2 border-ink bg-ink sm:w-64">
                          <Image src={draft.coverImage} alt="Cover preview" fill sizes="256px" className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                          <p className="break-all font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">{draft.coverImage}</p>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => coverInputRef.current?.click()} disabled={busy === "cover"} className={smallBtn}>
                              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                              Replace
                            </button>
                            <button
                              type="button"
                              onClick={() => setField("coverImage", "")}
                              className={smallBtn + " hover:border-signal hover:bg-signal hover:text-paper"}
                            >
                              <X className="h-3.5 w-3.5" aria-hidden="true" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={busy === "cover"}
                        className="flex h-28 w-full items-center justify-center gap-2 border-2 border-dashed border-line bg-secondary/40 font-mono text-xs font-bold uppercase tracking-[0.18em] text-smoke transition-colors hover:border-ink hover:text-ink disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ImagePlus className="h-4 w-4" aria-hidden="true" />
                        {busy === "cover" ? "Uploading…" : "Upload a cover image"}
                      </button>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      onChange={(e) => onCoverSelected(e.target.files)}
                      className="hidden"
                      aria-label="Upload cover image"
                    />
                  </fieldset>

                  {/* Gallery */}
                  <fieldset className="border-2 border-ink p-4">
                    <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink">
                      Photo gallery ({draft.gallery.length}/24)
                    </legend>
                    {draft.gallery.length === 0 ? (
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">
                        No gallery photos. They appear under the entry body.
                      </p>
                    ) : (
                      <ul className="grid gap-4 sm:grid-cols-2">
                        {draft.gallery.map((img, i) => (
                          <li key={`${img.src}-${i}`} className="border-2 border-ink p-2">
                            <div className="relative aspect-[4/3] bg-ink">
                              <Image src={img.src} alt={img.alt || "Gallery photo"} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
                            </div>
                            <label htmlFor={`g-alt-${i}`} className="sr-only">Alt text for photo {i + 1}</label>
                            <input
                              id={`g-alt-${i}`}
                              type="text"
                              value={img.alt}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  gallery: d.gallery.map((g, gi) => (gi === i ? { ...g, alt: e.target.value } : g)),
                                }))
                              }
                              placeholder="Alt text (what the photo shows)"
                              className="mt-2 w-full border border-line bg-paper px-2 py-1.5 font-mono text-xs text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              maxLength={300}
                            />
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">{img.src}</span>
                              <button
                                type="button"
                                onClick={() => setDraft((d) => ({ ...d, gallery: d.gallery.filter((_, gi) => gi !== i) }))}
                                className="inline-flex items-center gap-1 border border-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink hover:border-signal hover:bg-signal hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <X className="h-3 w-3" aria-hidden="true" />
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      multiple
                      onChange={(e) => onGallerySelected(e.target.files)}
                      className="hidden"
                      aria-label="Upload gallery photos"
                    />
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={busy === "gallery"}
                      className={smallBtn + " mt-4"}
                    >
                      <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                      {busy === "gallery" ? "Uploading…" : "Add photos"}
                    </button>
                  </fieldset>

                  {/* Meta */}
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label htmlFor="f-author" className={labelCls}>Author</label>
                      <input id="f-author" type="text" value={draft.author} onChange={(e) => setField("author", e.target.value)} className={inputCls} maxLength={80} />
                    </div>
                    <div>
                      <label htmlFor="f-tags" className={labelCls}>Tags (comma separated)</label>
                      <input id="f-tags" type="text" value={draft.tags} onChange={(e) => setField("tags", e.target.value)} placeholder="case study, response" className={inputCls} maxLength={200} />
                    </div>
                    <div>
                      <label htmlFor="f-source" className={labelCls}>Source URL (optional)</label>
                      <input id="f-source" type="url" value={draft.sourceUrl} onChange={(e) => setField("sourceUrl", e.target.value)} placeholder="https://www.linkedin.com/in/…" className={inputCls + " font-mono text-xs"} maxLength={400} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink pt-5">
                    <button
                      type="button"
                      onClick={() => save()}
                      disabled={busy === "save"}
                      className="inline-flex h-12 items-center gap-2 border-2 border-ink bg-ink px-6 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Save className="h-4 w-4" aria-hidden="true" />
                      {busy === "save" ? "Saving…" : draft.id ? "Save changes" : "Save draft"}
                    </button>
                    <button
                      type="button"
                      onClick={() => save(draft.status === "published" ? "draft" : "published")}
                      disabled={busy === "save" || !draft.title.trim()}
                      className={
                        "inline-flex h-12 items-center gap-2 border-2 px-6 text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                        (draft.status === "published"
                          ? "border-ink bg-paper text-ink hover:bg-secondary"
                          : "border-signal bg-signal text-paper hover:bg-signal-deep hover:border-signal-deep")
                      }
                    >
                      {draft.status === "published" ? "Move to draft" : "Publish now"}
                    </button>
                    {draft.id && (
                      <Link
                        href={`/blog/${draft.slug}`}
                        target="_blank"
                        className="ml-auto inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink hover:border-signal hover:text-signal"
                      >
                        Preview live
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer strip */}
      <footer className="border-t-2 border-ink bg-ink px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
        YTE ops desk / entries: {posts.length} / library: {media.length} files
      </footer>
    </div>
  );
}
