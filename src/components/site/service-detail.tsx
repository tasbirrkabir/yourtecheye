import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { getService, services, type Service } from "@/content/services";
import { site } from "@/lib/site";

interface ServiceDetailProps {
  slug: string;
}

/**
 * Reusable service-detail template (per sitemap spec §5).
 * All copy is unique per service and lives in content/services.ts,
 * where every entry records its official source URL and verification date.
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
      <section className="border-b border-border bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                  {service.title}
                </h1>
              </Reveal>
              <Reveal delay={70}>
                <p className="mt-3 text-lg font-semibold text-brand-strong">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {service.hero}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href={`/contact?service=${service.slug}`}>
                      Discuss Your Site
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-semibold">
                    <a href={site.contact.phoneHref}>Call {site.contact.phone}</a>
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_20px_48px_rgba(10,27,46,0.14)]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="What's included"
              title={`How ${service.title.toLowerCase()} works for your site`}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60}>
                <article className="flex h-full flex-col rounded-xl border border-border bg-white p-5 sm:p-6">
                  <CheckCircle2 className="h-5 w-5 text-brand-strong" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {service.scopeNote ? (
            <Reveal>
              <aside
                aria-label="Operational boundaries"
                className="mt-10 flex items-start gap-3 rounded-xl border border-[#cfd9e4] bg-[#eef3f8] p-5"
              >
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                    Good to know
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.scopeNote}
                  </p>
                </div>
              </aside>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* Related services */}
      <section aria-labelledby="related-heading" className="bg-white">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Related services"
              title="Often combined with this service"
              description="Layer services together so detection, deterrence, escalation, and investigation each have an owner."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 60}>
                <Link
                  href={`/${other.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-[#b9d3e8] hover:shadow-[0_10px_28px_rgba(10,27,46,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h3 className="font-bold text-ink">{other.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {other.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service FAQ */}
      <section aria-labelledby="service-faq-heading" className="bg-paper">
        <Container narrow className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title={`${service.title} questions`} align="center" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 rounded-2xl border border-border bg-white px-5 py-2 sm:px-7">
              <FaqAccordion items={service.faqs} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pre-selected enquiry CTA */}
      <ContactCta
        title={`Talk to us about ${service.title.toLowerCase()}`}
        description="Tell us about your site and current setup — we will advise what fits, honestly, before anything is agreed."
      />
    </>
  );
}
