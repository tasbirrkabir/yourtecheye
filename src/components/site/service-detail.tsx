import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { FeedOverlay } from "@/components/site/feed-overlay";
import { getService, services, type Service } from "@/content/services";
import { site } from "@/lib/site";

interface ServiceDetailProps {
  slug: string;
}

/**
 * Reusable service-detail template. All copy is unique per service and lives
 * in content/services.ts, where every entry records its official source URL
 * and verification date.
 */
export function ServiceDetail({ slug }: ServiceDetailProps) {
  const service: Service | undefined = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: service.title },
      ]),
      {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: `${site.url}/${service.slug}`,
        provider: { "@type": "Organization", name: site.name, url: site.url },
        areaServed: "Bangladesh",
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Service {String(services.findIndex((s) => s.slug === service.slug) + 1).padStart(2, "0")} / 04
                </p>
                <h1 className="stretch-xwide mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {service.title}
                  <span className="text-signal">.</span>
                </h1>
              </Reveal>
              <Reveal delay={70}>
                <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal sm:text-sm">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  {service.hero}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="group inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink px-7 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Discuss your site
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                  <a
                    href={site.contact.phoneHref}
                    className="inline-flex h-14 items-center justify-center gap-2 border-2 border-ink px-7 font-mono text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <figure className="relative border-2 border-ink">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
                <FeedOverlay label="Feed: live" />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Illustrative image, not a Your Tech Eye site
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="What's included"
              title={`How ${service.title.toLowerCase()} works for your site`}
            />
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <Reveal key={feature.title}>
                <li className="flex h-full flex-col bg-paper p-5 sm:p-6">
                  <span className="font-mono text-sm font-bold text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="stretch-wide mt-3 text-base font-black uppercase tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {feature.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          {service.scopeNote ? (
            <Reveal>
              <aside
                aria-label="Operational boundaries"
                className="mt-10 flex items-start gap-4 border-2 border-ink bg-paper p-5 sm:p-6"
              >
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink">
                    Good to know
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {service.scopeNote}
                  </p>
                </div>
              </aside>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* Related services */}
      <section aria-labelledby="related-heading" className="border-y-2 border-ink bg-ink text-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Related services"
              title="Often combined with this service"
              description="Layer services together so detection, deterrence, escalation, and investigation each have an owner."
              tone="dark"
            />
          </Reveal>
          <ul className="mt-10 border-t border-line-dark">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 60}>
                <li className="border-b border-line-dark">
                  <Link
                    href={`/${other.slug}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[4rem_1fr_auto] sm:gap-8"
                  >
                    <span className="font-mono text-sm font-bold text-signal">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="stretch-wide block text-lg font-black uppercase tracking-tight text-paper transition-colors group-hover:text-signal sm:text-2xl">
                        {other.navTitle}
                      </span>
                      <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-paper/60">
                        {other.summary}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center border-2 border-line-dark text-paper transition-colors group-hover:border-signal group-hover:bg-signal sm:h-11 sm:w-11">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Service FAQ */}
      <section aria-labelledby="service-faq-heading" className="bg-paper">
        <Container narrow className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading index="03" eyebrow="FAQ" title={`${service.title} questions`} align="center" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 border-t-2 border-ink">
              <FaqAccordion items={service.faqs} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pre-selected enquiry CTA */}
      <ContactCta
        title={`Talk to us about ${service.title.toLowerCase()}`}
        description="Tell us about your site and current setup. We will advise what fits, honestly, before anything is agreed."
      />
    </>
  );
}
