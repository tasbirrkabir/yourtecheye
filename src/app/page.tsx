import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactCta } from "@/components/site/contact-cta";
import { Marquee } from "@/components/site/marquee";
import { FeedOverlay } from "@/components/site/feed-overlay";
import { AutoVideo } from "@/components/site/auto-video";
import { PhotoHeading } from "@/components/site/photo-heading";
import { homeFaqs } from "@/content/faq";
import { services, howItWorks, useCases } from "@/content/services";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live CCTV Monitoring by Trained Operators",
  description:
    "Cameras record. Your Tech Eye intervenes. Live operators watch your CCTV, verify threats in real time, speak through on-site speakers, and escalate fast: for businesses, properties, and families.",
  alternates: { canonical: "/" },
};

const marqueeItems = [
  "Live threat verification",
  "Audio intervention",
  "Emergency escalation",
  "Footage review",
  "Camera installation",
  "Incident reporting",
  "Remote access",
] as const;

const problemRows = [
  {
    index: "01",
    label: "Passive recording",
    detail:
      "The camera sees. Nobody looks. You get evidence of the loss after the loss is done.",
  },
  {
    index: "02",
    label: "Human verification",
    detail:
      "Operators watch live and confirm what is real before anyone reacts. False alarms stay out of the loop.",
  },
  {
    index: "03",
    label: "Live intervention",
    detail:
      "A voice on site, alerts to your people, escalation per the agreed plan. While it is still happening.",
  },
] as const;

function formatPostDate(date: Date | null): string {
  if (!date) return "Unscheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function HomePage() {
  const fieldNotes = await getPublishedPosts(3);

  return (
    <>
      {/* ------------------------------------------------ 1. Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-paper">
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            {/* Type block */}
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink sm:text-xs">
                  <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
                  Your Tech Eye: live monitoring, Dhaka
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h1
                  id="hero-heading"
                  className="stretch-xwide mt-6 text-[12.5vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[4.7rem] xl:text-[5.2rem]"
                >
                  <PhotoHeading
                    as="span"
                    src="/media/city-lights-aerial-bw.webp"
                    scrim={0.5}
                    preload
                    className="block whitespace-nowrap"
                  >
                    A camera
                  </PhotoHeading>
                  <span className="block whitespace-nowrap text-stroke-ink">is not</span>
                  <span className="block whitespace-nowrap">
                    a guard<span className="text-signal">.</span>
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  Recording proves what happened. It does not stop it. Your
                  Tech Eye puts trained operators behind your cameras: watching
                  live, verifying what they see, and intervening while it still
                  counts.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink px-7 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Put us on your cameras
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <a
                    href="#method"
                    className="group inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-transparent px-7 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    How it works
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
                  {[
                    ["Coverage", "Every hour of every day"],
                    ["Detection", "Verified by humans, not guesses"],
                    ["Access", "Your feeds and reports, anytime"],
                  ].map(([term, detail]) => (
                    <div key={term} className="bg-paper p-4">
                      <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-signal">
                        {term}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Image block */}
            <Reveal delay={140}>
              <figure className="relative">
                <div className="relative border-2 border-ink">
                  <Image
                    src="/media/monitoring-operator-wall.webp"
                    alt="Operator silhouette facing a wall of live surveillance feeds in a dark control room"
                    width={1541}
                    height={1156}
                    priority
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                  <FeedOverlay label="Ops floor / Feed 004" />
                  <div className="absolute -bottom-10 -left-4 hidden w-40 border-2 border-ink bg-paper p-1.5 hard-shadow-signal sm:block lg:-left-10 lg:w-44">
                    <Image
                      src="/media/cctv-corner-dramatic-sky.webp"
                      alt="Black and white photograph of a PTZ camera on a rooftop against dramatic clouds"
                      width={1536}
                      height={1536}
                      sizes="192px"
                      className="aspect-square h-auto w-full object-cover photo-brutal"
                    />
                  </div>
                </div>
                <figcaption className="mt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-smoke sm:mt-14">
                  <span>Fig.01: Operations floor, live feeds</span>
                  <span>Illustrative image</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 2. Ticker */}
      <Marquee items={marqueeItems} />

      {/* ------------------------------------------------ 3. The problem */}
      <section aria-labelledby="problem-heading" className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  index="01"
                  eyebrow="The problem"
                  title="Footage tells you what you lost. Not what to do about it."
                />
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                  Most CCTV systems are built to record. When something
                  happens, the evidence exists, but nobody was watching, nobody
                  reacted, and the loss is already done. Your Tech Eye exists
                  for the gap between those two: the moment where a person sees
                  it and does something.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="mt-10 border-t border-line">
                  {problemRows.map((row) => (
                    <li
                      key={row.index}
                      className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[5rem_14rem_1fr] sm:gap-6"
                    >
                      <span className="font-mono text-sm font-bold text-signal">
                        {row.index}
                      </span>
                      <span className="text-base font-bold uppercase tracking-wide text-ink sm:text-lg">
                        {row.label}
                      </span>
                      <span className="col-span-2 pl-14 text-sm leading-relaxed text-smoke sm:col-span-1 sm:pl-0">
                        {row.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <figure className="lg:pt-14">
                <div className="relative border-2 border-ink">
                  <Image
                    src="/media/night-watch-walker.webp"
                    alt="A person crossing an empty, dark yard at night, lit only by a doorway"
                    width={1800}
                    height={1166}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="aspect-[4/3] h-auto w-full object-cover photo-brutal"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig.02: After hours. The exact moment a recorder alone fails you.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 3.5 Field notes (blog) */}
      {fieldNotes.length > 0 && (
        <section aria-labelledby="notes-heading" className="border-t border-line bg-paper">
          <Container className="py-16 sm:py-24">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                  index="02"
                  eyebrow="Field notes"
                  title="Case notes from behind the glass"
                  description="What live monitoring catches, what it prevents, and what the work looks like from the ops floor. Written by the team that watches."
                />
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  All field notes
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {fieldNotes.map((post, i) => (
                <li key={post.id}>
                  <Reveal delay={i * 70}>
                    <article className="group h-full border-2 border-ink bg-paper transition-shadow hover:hard-shadow-signal">
                      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col" aria-label={`Read field note: ${post.title}`}>
                        <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-ink bg-ink">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              width={1200}
                              height={800}
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="h-full w-full object-cover photo-brutal"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="font-mono text-xs uppercase tracking-[0.3em] text-paper/40">
                                YTE / Log entry
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <p className="flex flex-wrap items-center gap-x-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                            <time dateTime={post.publishedAt?.toISOString()}>{formatPostDate(post.publishedAt)}</time>
                            <span aria-hidden="true">/</span>
                            <span>{post.readMinutes} min</span>
                          </p>
                          <h3 className="stretch-wide mt-3 text-lg font-black uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-signal sm:text-xl">
                            {post.title}
                          </h3>
                          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-smoke">
                            {post.excerpt}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink group-hover:text-signal">
                            Read the entry
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------ 4. Services index */}
      <section id="services" aria-labelledby="services-heading" className="border-t border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                index="03"
                eyebrow="Services"
                title="Four lines of defense"
                description="Watch live. Verify what is seen. Act while it matters. Pick one line or stack all four: they are built to work as a system."
              />
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Compare all services
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-12 border-t-2 border-ink">
              {services.map((service, i) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b-2 border-ink py-6 transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[5rem_1fr_auto_auto] sm:gap-8 sm:py-8"
                  >
                    <span className="pl-2 font-mono text-sm font-bold text-signal sm:pl-4 sm:text-base">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="stretch-wide block text-xl font-black uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-paper sm:text-3xl lg:text-4xl">
                        {service.navTitle}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-smoke transition-colors group-hover:text-paper/60 sm:text-xs">
                        {service.tagline}
                      </span>
                    </span>
                    <span className="hidden max-w-[16rem] text-sm leading-relaxed text-smoke transition-colors group-hover:text-paper/70 lg:block">
                      {service.summary}
                    </span>
                    <span className="pr-2 sm:pr-4">
                      <span className="flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-paper sm:h-12 sm:w-12">
                        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 5. Field of view */}
      <section aria-labelledby="field-heading" className="border-y border-line bg-secondary/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Field of view"
              title="What our eyes actually see"
              description="Perimeters, floors, ramps, and feeds: the places where losses happen, watched by people who are awake and looking."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Video feed panel */}
            <Reveal className="sm:col-span-2">
              <figure className="group relative border-2 border-ink bg-ink">
                <AutoVideo
                  src="/media/cctv-feed-loop.webm"
                  ariaLabel="Security camera footage of a parking lot, captured by a PTZ camera"
                  className="aspect-video h-auto w-full object-cover photo-brutal"
                />
                <FeedOverlay label="Feed 001: Parking, PTZ" />
                <figcaption className="flex items-center justify-between border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  <span>Fig.03: Live camera feed</span>
                  <span>Public-archive footage</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={70}>
              <figure className="group relative border-2 border-ink">
                <Image
                  src="/media/cameras-dark-wall-pair.webp"
                  alt="Two CCTV cameras mounted on a dark concrete wall"
                  width={1536}
                  height={864}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="aspect-[16/10] h-auto w-full object-cover photo-brutal"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig.04: Hardware on post
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100}>
              <figure className="group relative border-2 border-ink">
                <Image
                  src="/media/street-night-rain.webp"
                  alt="A rainy city street at night, seen from above, with traffic reflections"
                  width={1024}
                  height={1280}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="aspect-[3/4] h-auto w-full object-cover photo-brutal"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig.05: Street, 02:40
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={140}>
              <figure className="group relative border-2 border-ink">
                <Image
                  src="/media/garage-ramp-amber.webp"
                  alt="A parking garage ramp lit in amber tones at night"
                  width={1500}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="aspect-[3/4] h-auto w-full object-cover photo-brutal"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig.06: Garage ramp
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={180}>
              <figure className="group relative border-2 border-ink">
                <Image
                  src="/media/camera-concrete-bw.webp"
                  alt="Black and white photograph of a security camera bolted to a raw concrete column"
                  width={1200}
                  height={1800}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="aspect-[3/4] h-auto w-full object-cover photo-brutal"
                />
                <figcaption className="border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  Fig.07: Camera on concrete
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 6. Method (dark) */}
      <section id="method" aria-labelledby="method-heading" className="relative overflow-hidden bg-ink text-paper">
        <Image
          src="/media/city-night-grid.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-[0.13]"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  index="05"
                  eyebrow="The method"
                  title="We put people behind the glass."
                  tone="dark"
                />
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70 sm:text-lg">
                  Five steps, agreed with you before the first shift starts.
                  Nothing improvised, nothing vague: a system that runs whether
                  or not you are thinking about security.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <Link
                  href="/contact"
                  className="group mt-9 inline-flex h-13 items-center gap-2 border-2 border-paper bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:bg-signal hover:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Discuss your site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <ol className="border-t border-line-dark">
                {howItWorks.map((step, i) => (
                  <li key={step.step} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-line-dark py-6 sm:grid-cols-[6rem_16rem_1fr] sm:gap-8">
                    <span className="font-mono text-2xl font-bold text-signal sm:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold uppercase tracking-wide text-paper sm:text-lg">
                      {step.step}
                    </span>
                    <span className="col-span-2 pl-16 text-sm leading-relaxed text-paper/60 sm:col-span-1 sm:pl-0">
                      {step.detail}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ 7. Who it is for */}
      <section aria-labelledby="usecases-heading" className="bg-paper">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              index="06"
              eyebrow="Who it is for"
              title="Built around the site, not the other way around"
              description="Monitoring is shaped around what each kind of property actually needs. No one-size-fits-all camera package."
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-12 border-t border-line">
              {useCases.map((useCase) => (
                <li key={useCase.name} className="border-b border-line">
                  <Link
                    href={useCase.href}
                    className="group grid gap-2 py-6 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[16rem_1fr_auto] sm:items-center sm:gap-8"
                  >
                    <span className="stretch-wide pl-1 text-lg font-black uppercase tracking-tight text-ink sm:pl-2 sm:text-xl">
                      {useCase.name}
                    </span>
                    <span className="text-sm leading-relaxed text-smoke sm:max-w-xl">
                      {useCase.need}
                    </span>
                    <span className="inline-flex items-center gap-1.5 pl-9 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink group-hover:text-signal sm:pl-0 sm:pr-2">
                      Relevant services
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 border border-line bg-paper p-5 text-sm leading-relaxed text-smoke">
              <strong className="font-bold uppercase tracking-wide text-ink">
                Something else in mind:
              </strong>{" "}
              if your site does not fit a category above, describe it to us.
              Monitoring is built around your risks, hours, and equipment.
              {" "}
              <Link href="/contact" className="font-bold text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal">
                Ask about your site
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 8. FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-line bg-paper">
        <Container narrow className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading index="07" eyebrow="FAQ" title="Practical questions, straight answers" align="center" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 border-t-2 border-ink">
              <FaqAccordion items={homeFaqs} />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="group inline-flex items-center gap-2 border-2 border-ink px-5 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                All questions, answered
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------ 9. Final CTA */}
      <ContactCta />
    </>
  );
}
