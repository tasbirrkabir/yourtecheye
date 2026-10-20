import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { HeroImage } from "@/components/site/hero-image";
import { PhotoHeading } from "@/components/site/photo-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: Request a Consultation",
  description:
    "Talk to Your Tech Eye about monitoring your site. Call, email, or send the short enquiry form. We respond to every genuine enquiry.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Contact" }])],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <Reveal>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="max-w-3xl">
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Contact
                </p>
                <PhotoHeading
                  src="/media/garage-entrance-night.webp"
                  scrim={0.46}
                  preload
                  className="stretch-xwide mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl"
                >
                  Let&apos;s talk about your site<span className="text-signal">.</span>
                </PhotoHeading>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
                  Tell us about your property, your existing cameras, and what you
                  want protected. We read every enquiry and reply using the contact
                  details you provide: no obligation, no pressure.
                </p>
              </div>
              <HeroImage
                src="/media/street-night-rain.webp"
                alt="City street at night after rain, lit by traffic and shop lights"
                caption="FIG.01: DHAKA STREET, AFTER MIDNIGHT"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Contact options and form" className="bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Direct contact paths */}
            <Reveal>
              <div className="space-y-px border border-line bg-line">
                <a
                  href={site.contact.phoneHref}
                  className="group block bg-paper p-5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink text-ink group-hover:bg-ink group-hover:text-paper">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="stretch-wide text-base font-black uppercase tracking-tight text-ink">
                        Call us
                      </h2>
                      <p className="mt-1 font-mono text-sm font-bold text-ink">
                        {site.contact.phone}
                      </p>
                      <p className="mt-0.5 text-xs text-smoke">
                        Fastest route for urgent site questions.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={site.contact.emailHref}
                  className="group block bg-paper p-5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink text-ink group-hover:bg-ink group-hover:text-paper">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="stretch-wide text-base font-black uppercase tracking-tight text-ink">
                        Email us
                      </h2>
                      <p className="mt-1 break-all text-sm font-medium text-ink">
                        {site.contact.email}
                      </p>
                      <p className="mt-0.5 text-xs text-smoke">
                        Good for plans, layouts, and detailed enquiries.
                      </p>
                    </div>
                  </div>
                </a>

                <div className="bg-paper p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink text-ink">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="stretch-wide text-base font-black uppercase tracking-tight text-ink">
                        Where we are
                      </h2>
                      <p className="mt-1 text-sm text-smoke">
                        {site.contact.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-ink p-5 text-paper">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line-dark text-signal">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="stretch-wide text-base font-black uppercase tracking-tight text-paper">
                        Continuous monitoring
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-paper/70">
                        The monitoring operation runs every hour of every day.
                        Enquiries are answered by the team as quickly as
                        possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={100}>
              <div className="border-2 border-ink bg-paper p-6 sm:p-8">
                <h2 className="stretch-wide text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
                  Request a consultation
                </h2>
                <p className="mb-6 mt-1.5 font-mono text-xs uppercase tracking-[0.15em] text-smoke">
                  Fields marked <span className="text-signal">*</span> are required.
                </p>
                <Suspense fallback={<p className="text-sm text-smoke">Loading form…</p>}>
                  <ContactForm defaultService={service} />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
