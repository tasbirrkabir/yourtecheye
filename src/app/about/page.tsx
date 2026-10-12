import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Eye, Users, Target, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — A Modern Monitoring & Technology Company",
  description:
    "Your Tech Eye combines advanced surveillance systems with trained professionals to deliver real-time monitoring, rapid response, and intelligent security solutions.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Matthew Brown", role: "Chief Executive Officer (CEO)" },
  { name: "Syed Mahdi", role: "Chief Operating Officer (COO)" },
  { name: "Md Alamin", role: "Head of Human Resources" },
];

const whatWeDo = [
  "Live surveillance monitoring",
  "CCTV monitoring & playback analysis",
  "Real-time incident detection",
  "Voice intervention system to prevent theft",
  "Property management services",
  "Data analysis for business insights",
];

const whyChooseUs = [
  "Advanced CCTV & surveillance solutions tailored to your security needs",
  "Proactive monitoring that helps detect potential threats before they become incidents",
  "Reliable technology from trusted, industry-leading security brands",
  "Expert support & consultation to ensure optimal system performance",
  "Scalable security solutions for homes, offices, commercial spaces, and industries",
  "Fast response & dedicated service focused on protecting what matters most",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "About" }]),
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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                  Welcome to Your Tech Eye
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  Your Tech Eye is a modern monitoring and technology company
                  providing smart, secure, and reliable protection solutions for
                  businesses, properties, and families. We combine advanced
                  surveillance systems with trained professionals to deliver
                  real-time monitoring, rapid response, and intelligent security
                  solutions that keep our clients protected at all times.
                </p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Our services include CCTV and advanced surveillance, emergency
                  response, playback analysis, and specialised monitoring for
                  retail, warehouses, parking areas, homes, and care environments.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2 text-sm font-bold text-ink">
                  <ShieldCheck className="h-4 w-4 text-brand-strong" aria-hidden="true" />
                  {site.tagline}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_20px_48px_rgba(10,27,46,0.14)]">
                <Image
                  src="/media/monitoring-operator-wall.webp"
                  alt="Monitoring operator at a wall of live camera feeds (illustrative image)"
                  width={1800}
                  height={1350}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission + approach */}
      <section aria-labelledby="mission-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-2xl border border-border bg-white p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 id="mission-heading" className="mt-4 text-xl font-bold text-ink sm:text-2xl">
                  Our mission
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  To create safer environments through intelligent surveillance
                  and security solutions. We are committed to helping businesses,
                  organisations, and homeowners stay protected by providing
                  reliable CCTV monitoring, early threat detection, and advanced
                  security technologies.
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Through innovation, quality service, and continuous improvement,
                  we strive to ensure that risks are identified early and
                  prevented instantly.
                </p>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="h-full rounded-2xl border border-border bg-white p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-xl font-bold text-ink sm:text-2xl">
                  How we work
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  At Your Tech Eye, we don&apos;t just install security systems —
                  we provide peace of mind through intelligent monitoring and
                  dependable protection. Monitoring is shaped around each site&apos;s
                  risks, hours, and equipment, and every alert follows an
                  escalation plan agreed with the client in advance.
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Our commitment is simple:{" "}
                  <strong className="font-semibold text-ink">
                    Detect Early, Prevent Instantly.
                  </strong>
                </p>
              </article>
            </Reveal>
          </div>

          {/* What we do */}
          <Reveal>
            <div className="mt-12 rounded-2xl border border-border bg-white p-7 sm:p-9">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">What we do</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {whatWeDo.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.95rem]">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-strong" aria-hidden="true" />
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-heading" className="bg-white">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Why choose us"
              title="Working principles, not slogans"
              description="Everything below describes how the service is delivered — no unverifiable promises."
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item} delay={i * 55}>
                <li className="flex h-full items-start gap-3 rounded-xl border border-border bg-paper p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                  <span className="text-[0.95rem] font-medium leading-relaxed text-foreground">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team — verified names & roles from the official site; portraits omitted pending owner approval */}
      <section aria-labelledby="team-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Our team"
              title="The people leading Your Tech Eye"
              description="Leadership accountable for the service you receive."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 70}>
                <article className="flex h-full items-center gap-4 rounded-xl border border-border bg-white p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-strong">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-sm text-muted-foreground">
              Want to work with us?{" "}
              <Link href="/contact" className="font-semibold text-brand-strong underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <ContactCta
        title="Put our monitoring to work on your site"
        description="A short conversation about your property and cameras is the best way to see whether YTE is the right fit."
      />
    </>
  );
}
