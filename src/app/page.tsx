import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MonitorPlay, PhoneCall, ShieldCheck, Volume2, FileSearch, Siren, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/site/service-card";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactCta } from "@/components/site/contact-cta";
import { homeFaqs } from "@/content/faq";
import {
  services,
  howItWorks,
  useCases,
  trustStrip,
  heroPoints,
  proactivePoints,
} from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "24/7 Surveillance & Monitoring — Detect Early. Prevent Instantly.",
  description:
    "Your Tech Eye watches your CCTV cameras 24/7 with real human response: live threat detection, audio intervention, and escalation that helps protect businesses, properties, and families.",
  alternates: { canonical: "/" },
};

const stepIcons = [MonitorPlay, ShieldCheck, CheckCircle2, Siren, FileSearch];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------ 1. Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-tint/70 blur-3xl" aria-hidden="true" />
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-brand-strong">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-strong" />
                  </span>
                  24/7 monitoring, day and night
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h1
                  id="hero-heading"
                  className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
                >
                  Detect early.{" "}
                  <span className="text-brand-strong">Prevent instantly.</span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  We go beyond recording — Your Tech Eye actively monitors your
                  cameras, detects threats in real time, and responds before
                  incidents escalate.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                  {heroPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[0.95rem] text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-strong" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact">Discuss Your Site</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-semibold">
                    <a href="#services">
                      Explore Our Services
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-border shadow-[0_24px_60px_rgba(10,27,46,0.16)]">
                  <Image
                    src="/media/hero-property-dusk.webp"
                    alt="Office building facade at dusk, with lit interiors visible through the glass"
                    width={2000}
                    height={1499}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </div>
                {/* quiet status card — states verifiable facts only */}
                <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-border bg-white/95 p-4 shadow-[0_12px_32px_rgba(10,27,46,0.14)] backdrop-blur sm:left-8 sm:right-auto sm:w-72">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">Monitored around the clock</p>
                      <p className="text-xs text-muted-foreground">
                        Real humans. Real-time verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 2. Trust strip */}
      <section aria-label="Service commitments" className="border-y border-border bg-paper">
        <Container className="py-10 sm:py-12">
          <Reveal>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {trustStrip.map((item) => (
                <div key={item.title} className="text-center lg:text-left">
                  <dt className="text-base font-bold text-ink sm:text-lg">{item.title}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 3. The problem */}
      <section aria-labelledby="problem-heading" className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border border-border">
                  <Image
                    src="/media/warehouse-overhead.webp"
                    alt="Overhead view of a warehouse floor with stacked goods and a conveyor line"
                    width={1456}
                    height={816}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-[16/10] h-auto w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Illustrative image — not a Your Tech Eye site or customer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="order-1 lg:order-2">
                <SectionHeading
                  eyebrow="The gap we close"
                  title="Cameras that only record leave you finding out too late"
                  description="Most security systems simply record incidents after they happen. By the time someone reviews the footage, the loss is done. Your Tech Eye actively monitors situations in real time to help prevent damage, theft, and security threats before they escalate."
                />
                <ul className="mt-7 space-y-3">
                  {proactivePoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.95rem]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                      <span className="font-medium text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl border border-border bg-paper p-4 text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-ink">Proactive protection</strong>{" "}
                  instead of passive recording — that is the difference between a
                  camera and a monitored site.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 4. Core services */}
      <section id="services" aria-labelledby="services-heading" className="bg-paper">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Four ways we keep your site protected"
              description="Every service works from the same principle: watch live, verify what is seen, and act while it still matters."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center">
              <Button asChild variant="ghost" className="gap-1.5 font-semibold text-brand-strong hover:bg-brand-tint hover:text-brand-strong">
                <Link href="/services">
                  See how the services fit together
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 5. How it works */}
      <section aria-labelledby="how-heading" className="bg-ink">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Protected in five clear steps"
              description="A simple system designed to protect your site without complexity or constant management."
              tone="dark"
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal key={step.step} delay={i * 70}>
                  <li className="relative flex h-full flex-col rounded-xl border border-ink-line bg-ink-soft p-5">
                    <span
                      className="absolute right-4 top-4 text-3xl font-extrabold leading-none text-[#22374e]"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#16304b] text-[#7db8e0]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 pr-6 text-base font-bold text-white">{step.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9db1c7]">{step.detail}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
          <Reveal>
            <p className="mt-10 text-sm text-[#8aa0b8]">
              Want the same setup on your site?{" "}
              <Link href="/contact" className="font-semibold text-white underline underline-offset-4 hover:text-[#7db8e0]">
                Discuss your site with us
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 6. Use cases */}
      <section aria-labelledby="usecases-heading" className="bg-white">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Environments we monitor"
              title="Wherever losing visibility hurts"
              description="Monitoring is shaped around what each kind of site actually needs — not a one-size-fits-all camera package."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, i) => (
              <Reveal key={useCase.name} delay={i * 60}>
                <article className="flex h-full flex-col rounded-xl border border-border bg-paper p-6 transition-colors hover:border-[#b9d3e8]">
                  <h3 className="text-lg font-bold text-ink">{useCase.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{useCase.need}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">{useCase.benefit}</p>
                  <Link
                    href={useCase.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Relevant services
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="flex h-full flex-col justify-between rounded-xl bg-ink p-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Something else in mind?</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#b6c6d8]">
                    If your site does not fit a category above, describe it to us —
                    monitoring is built around your risks, hours, and equipment.
                  </p>
                </div>
                <Button asChild variant="outline" className="mt-5 w-full border-[#3d5570] bg-transparent font-semibold text-white hover:bg-[#16304b] hover:text-white">
                  <Link href="/contact">Ask about your site</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 7. Operational clarity */}
      <section aria-labelledby="clarity-heading" className="bg-paper">
        <Container className="py-16 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What to expect"
                  title="Clear about what we do — and what we don't"
                  description="A monitoring service should be understood before it is bought. Here is how a working relationship looks in practice."
                />
                <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src="/media/monitoring-room-illustrative.webp"
                    alt="Operators working in a monitoring room with a wall of screens (illustrative stock image)"
                    width={1600}
                    height={1200}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Illustrative image of a monitoring room — not a Your Tech Eye facility.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <dl className="space-y-5">
                {[
                  {
                    icon: MonitorPlay,
                    term: "What you provide",
                    detail:
                      "Working CCTV coverage of the areas you want monitored — or ask us to supply and install cameras where coverage is missing.",
                  },
                  {
                    icon: ShieldCheck,
                    term: "What YTE does",
                    detail:
                      "Watches your feeds live 24/7, verifies suspicious activity, and documents incidents in reports you can access anytime.",
                  },
                  {
                    icon: Volume2,
                    term: "What triggers a response",
                    detail:
                      "Verified suspicious activity: intrusions, loitering, perimeter breaches, or anything unusual agreed in your monitoring plan. Live audio warnings where speakers are installed.",
                  },
                  {
                    icon: PhoneCall,
                    term: "What a response means",
                    detail:
                      "Your nominated contacts are alerted, live warnings go out where possible, and incidents are escalated according to the plan agreed with you — including coordination with authorities when needed.",
                  },
                  {
                    icon: Info,
                    term: "What is not included",
                    detail:
                      "We do not promise crime elimination, specific response times, or on-site guarding. Response details are agreed per site during setup — nothing is improvised.",
                  },
                ].map((row) => (
                  <div key={row.term} className="flex gap-4 rounded-xl border border-border bg-white p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-strong">
                      <row.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-bold text-ink">{row.term}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 8. FAQ */}
      <section aria-labelledby="faq-heading" className="bg-white">
        <Container narrow className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Practical questions, straight answers"
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10">
              <FaqAccordion items={homeFaqs} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 9. Final CTA */}
      <ContactCta />
    </>
  );
}
