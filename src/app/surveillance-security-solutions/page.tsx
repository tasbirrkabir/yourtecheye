import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Surveillance & Security Solutions" },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Solutions
                </p>
                <h1 className="stretch-xwide mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Surveillance &amp; Security Solutions<span className="text-signal">.</span>
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  {solutionsPage.intro}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact?service=surveillance-security-solutions"
                    className="group inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink px-7 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Discuss your site
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex h-14 items-center justify-center border-2 border-ink px-7 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    See the monitoring services
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <figure className="relative border-2 border-ink">
                <Image
                  src="/media/cctv-cameras-parapet.webp"
                  alt="Three bullet CCTV cameras installed on a building parapet"
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig: Perimeter hardware, illustrative
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capabilities grid */}
      <section aria-labelledby="capabilities-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="What we can do for you"
              title="Everything a watched site needs"
              description="Capabilities verified from our current offer. Your arrangement is shaped around your site: you only take what fits."
            />
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {solutionsPage.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 55}>
                <li className="flex h-full flex-col bg-paper p-5">
                  <span className="font-mono text-sm font-bold text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="stretch-wide mt-3 text-base font-black uppercase leading-tight tracking-tight text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{cap.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* Deployment imagery + technician note */}
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <figure className="border-2 border-ink">
                <Image
                  src="/media/technician-camera-maintenance.webp"
                  alt="Technician servicing a dome surveillance camera (illustrative image)"
                  width={960}
                  height={1280}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/5] h-auto w-full object-cover photo-brutal"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Illustrative image, not a Your Tech Eye technician or site
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <SectionHeading
                  index="02"
                  eyebrow="Deployment"
                  title="Existing cameras usually stay. Coverage is what matters."
                  description="Most sites do not need a rip-and-replace. YTE connects to your existing CCTV system, fills coverage gaps where needed, and brings the whole system under live monitoring. Where cameras are missing or outdated, a complete solution can be supplied and installed."
                />
                <ul className="mt-6 border-t border-line">
                  {[
                    "Works with most existing CCTV setups: no replacement needed in most cases",
                    "Continuous recording for maximum security coverage",
                    "Remote access stays in your hands: mobile, tablet, or PC",
                    "Storage on your terms: secure cloud or local recording",
                  ].map((item) => (
                    <li key={item} className="border-b border-line py-3 text-sm font-medium text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Service links */}
      <section aria-labelledby="monitor-services-heading" className="border-y-2 border-ink bg-ink text-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Monitoring services"
              title="Solutions are watched, not just installed"
              description="Hardware is only half of the protection. These monitoring services put eyes, voice, and escalation behind every camera."
              tone="dark"
            />
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <li className="h-full">
                  <Link
                    href={`/${service.slug}`}
                    className="group flex h-full flex-col bg-ink p-6 transition-colors hover:bg-coal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <h3 className="stretch-wide text-lg font-black uppercase leading-tight tracking-tight text-paper group-hover:text-signal">
                      {service.navTitle}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/60">
                      {service.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal">
                      Open
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta
        title="Plan your surveillance setup"
        description="Tell us about your site and existing cameras. We will map what you have, find the gaps, and advise what is worth adding."
      />
    </>
  );
}
