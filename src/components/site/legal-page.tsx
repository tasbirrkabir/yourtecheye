import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { Breadcrumbs } from "./breadcrumbs";
import { HeroImage } from "./hero-image";
import { site } from "@/lib/site";

export interface LegalSection {
  id: string;
  heading: string;
  /** Each string is one paragraph. A string starting with "> " renders as a highlighted note. */
  body: string[];
  /** Optional key: value detail list rendered as a definition grid (no bullets). */
  details?: { term: string; description: string }[];
}

export interface LegalPageProps {
  /** e.g. "Terms of Service" */
  title: string;
  /** Short standfirst under the title. */
  standfirst: string;
  /** Fixed "last updated" date shown in the document header. */
  updated: string;
  sections: LegalSection[];
}

/**
 * Shared shell for the legal documents (terms, privacy, cookies, disclaimer).
 * Renders as a numbered hard-bordered document in the brutal-minimal system.
 */
export function LegalPage({ title, standfirst, updated, sections }: LegalPageProps) {
  return (
    <>
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
          <Reveal>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="max-w-3xl">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-smoke">
                  <FileText className="h-4 w-4 text-signal" aria-hidden="true" />
                  Legal document: {site.shortName}
                </p>
                <h1 className="stretch-xwide mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
                  {standfirst}
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 border-2 border-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
                  <div className="flex gap-2">
                    <dt className="font-bold text-ink">Last updated:</dt>
                    <dd>{updated}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-ink">Applies to:</dt>
                    <dd>{site.url.replace(/^https?:\/\//, "")}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-ink">Governing law:</dt>
                    <dd>Bangladesh</dd>
                  </div>
                </dl>
              </div>
              <HeroImage
                src="/media/concrete-architecture-bw.webp"
                alt="Brutalist concrete architecture seen from below against the sky"
                caption="FIG: TERMS IN FORCE, STRUCTURE HONEST"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label={`${title} content`} className="bg-paper">
        <Container narrow className="py-14 sm:py-18">
          <Reveal>
            <div className="border-2 border-ink">
              {/* Table of contents */}
              <nav
                aria-label="Document contents"
                className="border-b-2 border-ink bg-secondary p-6 sm:p-8"
              >
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
                  Contents
                </h2>
                <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                  {sections.map((s, i) => (
                    <li key={s.id} className="flex items-baseline gap-2 text-sm">
                      <span className="font-mono text-[10px] text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${s.id}`}
                        className="font-bold uppercase tracking-wide text-ink underline-offset-4 hover:text-signal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Sections */}
              <div className="p-6 sm:p-10">
                {sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-labelledby={`${s.id}-heading`}
                    className={
                      i === 0
                        ? "scroll-mt-32"
                        : "scroll-mt-32 border-t border-line pt-8 mt-8"
                    }
                  >
                    <h2
                      id={`${s.id}-heading`}
                      className="flex items-baseline gap-3 stretch-wide text-lg font-black uppercase tracking-tight text-ink"
                    >
                      <span className="font-mono text-xs font-bold text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {s.body.map((para, j) =>
                        para.startsWith("> ") ? (
                          <p
                            key={j}
                            role="note"
                            className="border-l-4 border-signal bg-secondary px-4 py-3 text-sm font-medium leading-relaxed text-ink"
                          >
                            {para.replace(/^> /, "")}
                          </p>
                        ) : (
                          <p key={j} className="leading-relaxed text-smoke">
                            {para}
                          </p>
                        )
                      )}
                    </div>
                    {s.details ? (
                      <dl className="mt-4 border-2 border-line">
                        {s.details.map((d) => (
                          <div
                            key={d.term}
                            className="grid gap-1 border-b border-line p-4 last:border-b-0 sm:grid-cols-[200px_1fr] sm:gap-4"
                          >
                            <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink">
                              {d.term}
                            </dt>
                            <dd className="text-sm leading-relaxed text-smoke">
                              {d.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            {/* Cross-links to sibling legal documents */}
            <nav
              aria-label="Other legal documents"
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ]
                .filter((l) => l.label !== title)
                .map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {l.label}
                  </Link>
                ))}
              <Link
                href="/contact"
                className="border-2 border-signal bg-signal px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:border-ink hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Contact us
              </Link>
            </nav>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
