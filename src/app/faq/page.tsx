import type { Metadata } from "next";
import { CircleHelp } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactCta } from "@/components/site/contact-cta";
import { faqCategories } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Straight answers about Your Tech Eye monitoring: coverage, equipment, detection, response, playback review, and how to get started.",
  alternates: { canonical: "/faq" },
};

const UPDATED = "12 October 2026";

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          <Reveal>
            <div className="mt-8 max-w-3xl">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-smoke">
                <CircleHelp className="h-4 w-4 text-signal" aria-hidden="true" />
                Knowledge base: {site.shortName}
              </p>
              <h1 className="stretch-xwide mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
                Questions, answered straight
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
                Everything people usually ask before putting their site under
                live monitoring. If your question is not here, call{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-bold text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
                >
                  {site.contact.phone}
                </a>{" "}
                or send the enquiry form: a human replies, not a autoresponder.
              </p>
              <p className="mt-6 inline-block border-2 border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
                Last updated: {UPDATED}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Frequently asked questions" className="bg-paper">
        <Container narrow className="py-14 sm:py-18">
          <div className="space-y-12">
            {faqCategories.map((cat, ci) => (
              <Reveal key={cat.id}>
                <div
                  id={cat.id}
                  className="scroll-mt-32 border-2 border-ink"
                  aria-labelledby={`${cat.id}-heading`}
                >
                  <header className="flex items-baseline gap-3 border-b-2 border-ink bg-secondary px-5 py-4 sm:px-7">
                    <span className="font-mono text-xs font-bold text-signal">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2
                        id={`${cat.id}-heading`}
                        className="stretch-wide text-base font-black uppercase tracking-tight text-ink sm:text-lg"
                      >
                        {cat.heading}
                      </h2>
                      <p className="mt-0.5 text-sm text-smoke">{cat.blurb}</p>
                    </div>
                    <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-smoke sm:block">
                      {cat.faqs.length} Q
                    </span>
                  </header>
                  <div className="px-5 py-2 sm:px-7">
                    <FaqAccordion items={cat.faqs} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 border-2 border-ink bg-ink p-6 text-paper sm:p-8">
              <h2 className="stretch-wide text-lg font-black uppercase tracking-tight">
                Still have a question?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/80">
                Ask it directly. Describe your site and what you want watched,
                and you will get a considered answer, usually within one working
                day, often much sooner.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center border-2 border-signal bg-signal px-5 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:bg-ink hover:border-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
                >
                  Send an enquiry
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex h-11 items-center border-2 border-line-dark px-5 font-mono text-sm font-bold text-paper transition-colors hover:border-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
                >
                  Call {site.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
