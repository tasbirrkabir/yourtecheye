import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Eye, Users, Target, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { FeedOverlay } from "@/components/site/feed-overlay";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About: A Modern Monitoring & Technology Company",
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
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <div>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  About
                </p>
                <h1 className="stretch-xwide mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
                  Welcome to Your Tech Eye<span className="text-signal">.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  Your Tech Eye is a modern monitoring and technology company
                  providing smart, secure, and reliable protection solutions for
                  businesses, properties, and families. We combine advanced
                  surveillance systems with trained professionals to deliver
                  real-time monitoring, rapid response, and intelligent security
                  solutions that keep our clients protected at all times.
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  Our services include CCTV and advanced surveillance, emergency
                  response, playback analysis, and specialised monitoring for
                  retail, warehouses, parking areas, homes, and care environments.
                </p>
                <p className="mt-7 inline-flex items-center gap-2.5 border-2 border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink">
                  <ShieldCheck className="h-4 w-4 text-signal" aria-hidden="true" />
                  {site.tagline}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <figure className="relative border-2 border-ink">
                <Image
                  src="/media/monitoring-operator-wall.webp"
                  alt="Monitoring operator at a wall of live camera feeds (illustrative image)"
                  width={1541}
                  height={1156}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
                <FeedOverlay label="Ops floor / Feed 004" />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission + approach */}
      <section aria-labelledby="mission-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-px border-2 border-ink bg-ink lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="h-full bg-paper p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center border-2 border-ink text-ink">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 id="mission-heading" className="stretch-wide mt-5 text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
                  Our mission
                </h2>
                <p className="mt-4 leading-relaxed text-smoke">
                  To create safer environments through intelligent surveillance
                  and security solutions. We are committed to helping businesses,
                  organisations, and homeowners stay protected by providing
                  reliable CCTV monitoring, early threat detection, and advanced
                  security technologies.
                </p>
                <p className="mt-3 leading-relaxed text-smoke">
                  Through innovation, quality service, and continuous improvement,
                  we strive to ensure that risks are identified early and
                  prevented instantly.
                </p>
              </article>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <article className="h-full bg-paper p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center border-2 border-ink text-ink">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="stretch-wide mt-5 text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
                  How we work
                </h2>
                <p className="mt-4 leading-relaxed text-smoke">
                  At Your Tech Eye, we don&apos;t just install security systems:
                  we provide peace of mind through intelligent monitoring and
                  dependable protection. Monitoring is shaped around each site&apos;s
                  risks, hours, and equipment, and every alert follows an
                  escalation plan agreed with the client in advance.
                </p>
                <p className="mt-3 leading-relaxed text-smoke">
                  Our commitment is simple:{" "}
                  <strong className="font-black uppercase tracking-wide text-ink">
                    Detect Early, Prevent Instantly.
                  </strong>
                </p>
              </article>
            </Reveal>
          </div>

          {/* What we do */}
          <Reveal>
            <div className="mt-12 border-2 border-ink bg-paper p-7 sm:p-9">
              <h2 className="stretch-wide text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
                What we do
              </h2>
              <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {whatWeDo.map((item) => (
                  <li key={item} className="bg-paper p-4 text-sm font-medium leading-snug text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-heading" className="border-y-2 border-ink bg-secondary/60">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Why choose us"
              title="Working principles, not slogans"
              description="Everything below describes how the service is delivered. No unverifiable promises."
            />
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item} delay={i * 55}>
                <li className="flex h-full items-start gap-4 bg-paper p-5">
                  <span className="font-mono text-sm font-bold text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-medium leading-relaxed text-ink">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team: verified names & roles from the official site; portraits omitted pending owner approval */}
      <section aria-labelledby="team-heading" className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Our team"
              title="The people leading Your Tech Eye"
              description="Leadership accountable for the service you receive."
            />
          </Reveal>
          <div className="mt-10 grid gap-px border-2 border-ink bg-ink sm:grid-cols-3">
            {team.map((member) => (
              <Reveal key={member.name}>
                <article className="flex h-full items-center gap-4 bg-paper p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink text-ink">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="stretch-wide text-base font-black uppercase tracking-tight text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-smoke">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-sm text-smoke">
              Want to work with us?{" "}
              <Link href="/contact" className="font-bold text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal">
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
