import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { PhotoHeading } from "@/components/site/photo-heading";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ContactCta } from "@/components/site/contact-cta";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Field Notes: Live Monitoring Case Studies & Insights",
  description:
    "Case notes from the YTE ops floor: what live CCTV monitoring catches, how white-label monitoring works for security companies, and what deterrence actually looks like.",
  alternates: { canonical: "/blog" },
};

function formatDate(date: Date | null): string {
  if (!date) return "Unscheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section aria-labelledby="blog-hero-heading" className="border-b border-line bg-paper">
        <Container className="py-12 sm:py-16">
          <Reveal>
            <Breadcrumbs
              className="mb-8"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
          </Reveal>
          <Reveal delay={60}>
            <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
              <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
              YTE: field notes from the ops floor
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1
              id="blog-hero-heading"
              className="stretch-xwide mt-6 text-[13vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            >
              <PhotoHeading as="span" src="/media/city-night-aerial.webp" scrim={0.48} preload className="block">
                Field
              </PhotoHeading>
              <span className="block">notes<span className="text-signal">.</span></span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
              Case notes and working observations from live monitoring: what
              operators catch before a loss happens, how white-label
              monitoring fits security companies, and what the work actually
              looks like from behind the glass.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ Posts */}
      <section aria-label="Published posts" className="bg-paper">
        <Container className="py-14 sm:py-20">
          {posts.length === 0 ? (
            <Reveal>
              <div className="border-2 border-ink bg-paper p-8 sm:p-12">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-signal">
                  Status: empty feed
                </p>
                <h2 className="stretch-wide mt-4 text-2xl font-black uppercase tracking-tight text-ink sm:text-4xl">
                  No entries published yet.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">
                  The first field notes are being written. In the meantime, the
                  fastest way to understand how live monitoring works is to ask
                  us directly.
                </p>
                <Link
                  href="/contact"
                  className="group mt-8 inline-flex h-13 items-center gap-2 border-2 border-ink bg-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal"
                >
                  Talk to the ops team
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <>
              {/* Lead entry: latest post, full-width editorial row */}
              {lead && (
                <Reveal>
                  <article className="border-2 border-ink">
                    <Link
                      href={`/blog/${lead.slug}`}
                      className="group grid gap-0 lg:grid-cols-[1.05fr_0.95fr]"
                      aria-label={`Read: ${lead.title}`}
                    >
                      <div className="relative border-b-2 border-ink bg-ink lg:border-b-0 lg:border-r-2">
                        {lead.coverImage ? (
                          <Image
                            src={lead.coverImage}
                            alt={lead.title}
                            width={1600}
                            height={1000}
                            priority
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="h-56 w-full object-cover photo-brutal sm:h-72 lg:h-full lg:min-h-[24rem]"
                          />
                        ) : (
                          <div className="flex h-56 items-center justify-center bg-ink sm:h-72 lg:h-full">
                            <span className="stretch-xwide font-mono text-sm uppercase tracking-[0.3em] text-paper/40">
                              YTE / Log entry
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between p-6 sm:p-9">
                        <div>
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-smoke sm:text-[11px]">
                            <span className="text-signal">Latest entry</span>
                            <span aria-hidden="true">/</span>
                            <time dateTime={lead.publishedAt?.toISOString()}>{formatDate(lead.publishedAt)}</time>
                            <span aria-hidden="true">/</span>
                            <span>{lead.readMinutes} min read</span>
                          </p>
                          <h2 className="stretch-wide mt-4 text-2xl font-black uppercase leading-[1.02] tracking-tight text-ink transition-colors group-hover:text-signal sm:text-4xl">
                            {lead.title}
                          </h2>
                          <p className="mt-4 text-sm leading-relaxed text-smoke sm:text-base">
                            {lead.excerpt}
                          </p>
                        </div>
                        <div className="mt-7 flex items-center justify-between gap-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                            By {lead.author}
                          </span>
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-paper">
                            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              )}

              {/* Older entries: hard-bordered grid */}
              {rest.length > 0 && (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <li key={post.id}>
                      <Reveal delay={Math.min(i * 60, 180)}>
                        <article className="group h-full border-2 border-ink bg-paper transition-shadow hover:hard-shadow-signal">
                          <Link href={`/blog/${post.slug}`} className="flex h-full flex-col" aria-label={`Read: ${post.title}`}>
                            <div className="relative border-b-2 border-ink bg-ink">
                              {post.coverImage ? (
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  width={1200}
                                  height={800}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="h-44 w-full object-cover photo-brutal"
                                />
                              ) : (
                                <div className="flex h-44 items-center justify-center bg-ink">
                                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-paper/40">
                                    YTE / Log entry
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                                <time dateTime={post.publishedAt?.toISOString()}>{formatDate(post.publishedAt)}</time>
                                <span aria-hidden="true">/</span>
                                <span>{post.readMinutes} min</span>
                              </p>
                              <h3 className="stretch-wide mt-3 text-lg font-black uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-signal sm:text-xl">
                                {post.title}
                              </h3>
                              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-smoke">
                                {post.excerpt}
                              </p>
                              <div className="mt-auto flex items-center justify-between pt-5">
                                {post.tags[0] ? (
                                  <span className="border border-line px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-smoke">
                                    {post.tags[0]}
                                  </span>
                                ) : (
                                  <span />
                                )}
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink group-hover:text-signal">
                                  Read
                                  <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </article>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}

              <Reveal delay={120}>
                <p className="mt-10 border border-line bg-secondary/60 p-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-smoke">
                  {posts.length} entr{posts.length === 1 ? "y" : "ies"} published. Written by the YTE team from{" "}
                  {site.contact.location}. Enquiries:{" "}
                  <a href={site.contact.emailHref} className="font-bold text-ink underline decoration-signal/50 underline-offset-4 hover:text-signal">
                    {site.contact.email}
                  </a>
                </p>
              </Reveal>
            </>
          )}
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
