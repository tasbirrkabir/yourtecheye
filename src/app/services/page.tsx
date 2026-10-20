import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/site/service-card";
import { HeroImage } from "@/components/site/hero-image";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { services, howItWorks } from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services: Surveillance, Monitoring & Response",
  description:
    "Explore Your Tech Eye's services: live CCTV monitoring, live audio intervention, emergency escalation, and playback footage analysis, built around your site.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Services" },
      ]),
      ...services.map((s) => ({
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: `${site.url}/${s.slug}`,
        provider: { "@type": "Organization", name: site.name, url: site.url },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Intro */}
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <Reveal>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="max-w-3xl">
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Services
                </p>
                <h1 className="stretch-xwide mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
                  Monitoring services built around your site<span className="text-signal">.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
                  Your Tech Eye keeps watch over your cameras, verifies what is
                  seen, and acts while it still matters. Pick the service that
                  matches your problem, or combine them into one complete
                  monitoring arrangement.
                </p>
              </div>
              <HeroImage
                src="/media/cctv-cameras-parapet.webp"
                alt="Two CCTV cameras mounted on a rooftop parapet under a bright sky"
                caption="FIG.01: CAMERAS ON WATCH, ROOFTOP PARAPET"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Service cards */}
      <section aria-labelledby="all-services-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Core services"
              title="What Your Tech Eye does"
              description="Each service answers a specific question: who is watching, how are intruders deterred, what happens after an alert, and what really occurred."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions strip */}
      <section aria-labelledby="solutions-heading" className="border-y-2 border-ink bg-ink text-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Behind the monitoring
                </p>
                <h2 id="solutions-heading" className="stretch-wide mt-4 text-3xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl">
                  Surveillance &amp; Security Solutions
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/70">
                  The systems side of the service: HD/4K cameras, motion-detection
                  alerts, secure cloud or local storage, remote access, and
                  continuous recording. Supplied, installed, and supported for
                  homes, offices, shops, and warehouses.
                </p>
                <Link
                  href="/surveillance-security-solutions"
                  className="group mt-8 inline-flex items-center gap-2 border-2 border-paper px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:bg-signal hover:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore the solutions
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ul className="border-t border-line-dark">
                {howItWorks.slice(0, 3).map((step, i) => (
                  <li key={step.step} className="flex items-baseline gap-4 border-b border-line-dark py-4">
                    <span className="font-mono text-sm font-bold text-signal">0{i + 1}</span>
                    <span className="text-sm font-bold uppercase tracking-wide text-paper">
                      {step.step}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Help me choose */}
      <section aria-labelledby="choose-heading" className="bg-paper">
        <Container narrow className="py-16 sm:py-20">
          <Reveal>
            <div className="border-2 border-ink p-8 text-center hard-shadow sm:p-12">
              <h2 id="choose-heading" className="stretch-wide text-2xl font-black uppercase tracking-tight text-ink sm:text-4xl">
                Not sure which service fits?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-smoke">
                Describe your site and what worries you. We will advise which
                monitoring arrangement makes sense, honestly, before anything is
                agreed.
              </p>
              <Link
                href="/contact?service=not-sure"
                className="group mt-8 inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink px-8 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Help me choose
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
