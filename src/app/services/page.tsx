import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/site/service-card";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { services, howItWorks } from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Surveillance, Monitoring & Response",
  description:
    "Explore Your Tech Eye's services: live CCTV monitoring, live audio intervention, emergency escalation, and playback footage analysis — built around your site.",
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
      <section className="border-b border-border bg-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <Reveal>
            <div className="mt-8 max-w-3xl">
              <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                Monitoring services built around your site
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Your Tech Eye keeps watch over your cameras, verifies what is
                seen, and acts while it still matters. Pick the service that
                matches your problem — or combine them into one complete
                monitoring arrangement.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/contact">Discuss Your Site</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link href="/surveillance-security-solutions">
                    Equipment & solutions
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Service cards */}
      <section aria-labelledby="all-services-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Core services"
              title="What Your Tech Eye does"
              description="Each service answers a specific question: who is watching, how are intruders deterred, what happens after an alert, and what really occurred."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions strip */}
      <section aria-labelledby="solutions-heading" className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 rounded-2xl border border-border bg-paper p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-strong">
                  Behind the monitoring
                </p>
                <h2 id="solutions-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Surveillance & Security Solutions
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  The systems side of the service: HD/4K cameras, motion-detection
                  alerts, secure cloud or local storage, remote access, and
                  continuous recording — supplied, installed, and supported for
                  homes, offices, shops, and warehouses.
                </p>
                <Button asChild className="mt-6 font-semibold">
                  <Link href="/surveillance-security-solutions">
                    Explore the solutions
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ul className="space-y-2.5 text-sm">
                {howItWorks.slice(0, 3).map((step) => (
                  <li key={step.step} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-strong" aria-hidden="true" />
                    <span className="font-medium text-foreground">{step.step}</span>
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
            <div className="text-center">
              <h2 id="choose-heading" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Not sure which service fits?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Describe your site and what worries you — we will advise which
                monitoring arrangement makes sense, honestly, before anything is
                agreed.
              </p>
              <Button asChild size="lg" className="mt-7 font-semibold">
                <Link href="/contact?service=not-sure">Help me choose</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
