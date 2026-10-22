import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { db } from "@/lib/db";
import { parseGallery, parseTags } from "@/lib/blog";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { BlogMarkdown } from "@/components/site/blog-markdown";
import { ContactCta } from "@/components/site/contact-cta";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

async function loadPost(slug: string) {
  try {
    return await db.blogPost.findUnique({ where: { slug } });
  } catch (err) {
    console.error("[blog] failed to load post", err);
    return null;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post || post.status !== "published") {
    return { title: "Entry not found", robots: { index: false } };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author ? [post.author] : undefined,
    },
  };
}

function formatDate(date: Date | null): string {
  if (!date) return "Unscheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await loadPost(slug);

  // Drafts exist only inside the admin panel; the public URL 404s for them.
  if (!post || post.status !== "published") notFound();

  const gallery = parseGallery(post.gallery);
  const tags = parseTags(post.tags);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author || "Your Tech Eye" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    ...(post.coverImage ? { image: `${site.url}${post.coverImage}` } : {}),
    ...(post.sourceUrl ? { isBasedOn: post.sourceUrl } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="bg-paper">
        {/* ------------------------------------------------ Header */}
        <header className="border-b border-line bg-paper">
          <Container narrow className="py-10 sm:py-14">
            <Reveal>
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.title.length > 42 ? `${post.title.slice(0, 42)}…` : post.title },
                ]}
              />
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-smoke sm:text-xs">
                <span className="text-signal">Log entry</span>
                <span aria-hidden="true">/</span>
                <time dateTime={post.publishedAt?.toISOString()}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">/</span>
                <span>{post.readMinutes} min read</span>
                <span aria-hidden="true">/</span>
                <span>By {post.author}</span>
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="stretch-xwide mt-6 text-balance text-3xl font-black uppercase leading-[1.0] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl border-l-2 border-signal pl-5 text-base leading-relaxed text-smoke sm:text-lg">
                {post.excerpt}
              </p>
            </Reveal>
            {tags.length > 0 && (
              <Reveal delay={220}>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Topics">
                  {tags.map((tag) => (
                    <li key={tag} className="border border-line px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-smoke">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </Container>
        </header>

        {/* ------------------------------------------------ Cover */}
        {post.coverImage && (
          <Container className="py-10 sm:py-12">
            <Reveal>
              <figure>
                <div className="border-2 border-ink bg-paper p-1.5 hard-shadow">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={1920}
                    height={1080}
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="h-auto max-h-[32rem] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  <span>Fig: {post.title}</span>
                  <span>YTE / Field note</span>
                </figcaption>
              </figure>
            </Reveal>
          </Container>
        )}

        {/* ------------------------------------------------ Body */}
        <Container narrow className="pb-4 pt-2 sm:pb-8">
          <Reveal>
            <div className="border-2 border-ink bg-paper px-5 py-8 sm:px-10 sm:py-12">
              <BlogMarkdown content={post.content} />
              {post.sourceUrl && (
                <p className="mt-10 border-t-2 border-ink pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-smoke">
                  Source note: originally reported by{" "}
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-ink underline decoration-signal/50 underline-offset-4 hover:text-signal"
                  >
                    {post.author} on LinkedIn
                  </a>
                  . Rewritten for the YTE field notes.
                </p>
              )}
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                Filed by {post.author} / Last revised{" "}
                <time dateTime={post.updatedAt.toISOString()}>{formatDate(post.updatedAt)}</time>
              </p>
            </div>
          </Reveal>
        </Container>

        {/* ------------------------------------------------ Gallery */}
        {gallery.length > 0 && (
          <Container narrow className="pb-12 sm:pb-16">
            <Reveal>
              <h2 className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink">
                <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                From the case file
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {gallery.map((img, i) => (
                  <li key={`${img.src}-${i}`} className="border-2 border-ink bg-paper p-1.5">
                    <Image
                      src={img.src}
                      alt={img.alt || `Case file photo ${i + 1}`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="h-auto w-full object-cover photo-brutal"
                    />
                    {img.alt && (
                      <p className="px-1 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">
                        {img.alt}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        )}

        {/* ------------------------------------------------ Back + next */}
        <Container narrow className="pb-16 sm:pb-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 border-2 border-ink px-5 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              All field notes
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Discuss your site with the team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </article>

      <ContactCta
        title="Want this kind of attention on your cameras"
        description="Every entry in this blog is a workday at YTE: watching feeds, verifying threats, intervening early. Tell us about your site and we will tell you honestly what monitoring can and cannot do for it."
      />
    </>
  );
}
