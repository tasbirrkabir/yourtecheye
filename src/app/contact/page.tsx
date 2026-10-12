import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Request a Consultation",
  description:
    "Talk to Your Tech Eye about monitoring your site. Call, email, or send the short enquiry form — we respond to every genuine enquiry.",
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

      <section className="border-b border-border bg-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <Reveal>
            <div className="mt-8 max-w-2xl">
              <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                Let&apos;s talk about your site
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Tell us about your property, your existing cameras, and what you
                want protected. We read every enquiry and reply using the contact
                details you provide — no obligation, no pressure.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Contact options and form" className="bg-paper">
        <Container className="py-14 sm:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Direct contact paths */}
            <Reveal>
              <div className="space-y-4">
                <a
                  href={site.contact.phoneHref}
                  className="group block rounded-xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#b9d3e8] hover:shadow-[0_10px_28px_rgba(10,27,46,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-bold text-ink">Call us</h2>
                      <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground">
                        {site.contact.phone}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Fastest route for urgent site questions.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={site.contact.emailHref}
                  className="group block rounded-xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#b9d3e8] hover:shadow-[0_10px_28px_rgba(10,27,46,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-bold text-ink">Email us</h2>
                      <p className="mt-1 break-all text-sm text-muted-foreground group-hover:text-foreground">
                        {site.contact.email}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Good for plans, layouts, and detailed enquiries.
                      </p>
                    </div>
                  </div>
                </a>

                <div className="rounded-xl border border-border bg-white p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-bold text-ink">Where we are</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {site.contact.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-ink p-5 text-[#b6c6d8]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#16304b] text-[#7db8e0]">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-bold text-white">24/7 Monitoring Services</h2>
                      <p className="mt-1 text-sm leading-relaxed">
                        The monitoring operation runs around the clock — day and
                        night. Enquiries are answered by the team as quickly as
                        possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_8px_30px_rgba(10,27,46,0.06)] sm:p-8">
                <h2 className="text-xl font-bold text-ink">Request a consultation</h2>
                <p className="mb-6 mt-1.5 text-sm text-muted-foreground">
                  Fields marked <span className="text-destructive">*</span> are required.
                </p>
                <Suspense fallback={<p className="text-sm text-muted-foreground">Loading form…</p>}>
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
