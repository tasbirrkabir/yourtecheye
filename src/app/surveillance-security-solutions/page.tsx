import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { solutionsPage, services } from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: solutionsPage.metaTitle,
  description: solutionsPage.metaDescription,
  alternates: { canonical: "/surveillance-security-solutions" },
  openGraph: {
    title: solutionsPage.metaTitle,
    description: solutionsPage.metaDescription,
    url: "/surveillance-security-solutions",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function SolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Surveillance & Security Solutions" },
      ]),
      {
        "@type": "Service",
        name: solutionsPage.title,
        description: solutionsPage.intro,
        url: `${site.url}/surveillance-security-solutions`,
        provider: { "@type": "Organization", name: site.name, url: site.url },
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
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Surveillance & Security Solutions" },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                  Surveillance & Security Solutions
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {solutionsPage.intro}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?service=surveillance-security-solutions">
                      Discuss Your Site
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-semibold">
                    <Link href="/services">See the monitoring services</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_20px_48px_rgba(10,27,46,0.14)]">
                <Image
                  src="/media/cctv-cameras-parapet.jpg"
                  alt="Three bullet CCTV cameras installed on a building parapet"
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

      {/* Capabilities grid */}
      <section aria-labelledby="capabilities-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="What we can do for you"
              title="Everything a watched site needs"
              description="Capabilities verified from our current offer. Your arrangement is shaped around your site — you only take what fits."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutionsPage.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 55}>
                <article className="flex h-full flex-col rounded-xl border border-border bg-white p-5">
                  <CheckCircle2 className="h-5 w-5 text-brand-strong" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-ink">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Deployment imagery + technician note */}
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <Image
                    src="/media/technician-camera-maintenance.webp"
                    alt="Technician servicing a dome surveillance camera (illustrative image)"
                    width={960}
                    height={1280}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="aspect-[4/5] h-auto w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Illustrative image — not a Your Tech Eye technician or site.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <SectionHeading
                  eyebrow="Deployment"
                  title="Existing cameras usually stay. Coverage is what matters."
                  description="Most sites do not need a rip-and-replace. YTE connects to your existing CCTV system, fills coverage gaps where needed, and brings the whole system under live monitoring. Where cameras are missing or outdated, a complete solution can be supplied and installed."
                />
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Works with most existing CCTV setups — no replacement needed in most cases",
                    "Continuous recording for maximum security coverage",
                    "Remote access stays in your hands: mobile, tablet, or PC",
                    "Storage on your terms: secure cloud or local recording",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-strong" aria-hidden="true" />
                      <span className="font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Service links */}
      <section aria-labelledby="monitor-services-heading" className="bg-white">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Monitoring services"
              title="Solutions are watched — not just installed"
              description="Hardware is only half of the protection. These monitoring services put eyes, voice, and escalation behind every camera."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60}>
                <Link
                  href={`/${service.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-[#b9d3e8] hover:shadow-[0_10px_28px_rgba(10,27,46,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h3 className="font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brand-strong">
                    Learn more
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta
        title="Plan your surveillance setup"
        description="Tell us about your site and existing cameras — we will map what you have, find the gaps, and advise what is worth adding."
      />
    </>
  );
}
