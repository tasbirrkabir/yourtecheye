import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

interface ContactCtaProps {
  title?: string;
  description?: string;
  tone?: "dark" | "light";
}

/**
 * Site-wide closing call-to-action band: ink block, giant display type,
 * mono contact line. Copy invites a conversation without promising response
 * times or outcomes the owner has not approved.
 */
export function ContactCta({
  title = "Put eyes on your site",
  description = "Tell us about your property, your existing cameras, and what worries you most. We will help you work out the right monitoring approach, honestly, before anything is agreed.",
  tone = "dark",
}: ContactCtaProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className={tone === "dark" ? "bg-ink text-paper" : "border-y-2 border-ink bg-paper text-ink"}
    >
      <Container className="py-16 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <p
              className={cn(
                "mb-6 flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] sm:text-xs",
                tone === "dark" ? "text-signal" : "text-ink"
              )}
            >
              <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
              <span className="rec-blink inline-block h-1.5 w-1.5 bg-signal" aria-hidden="true" />
              Contact
            </p>
            <h2
              id="cta-heading"
              className="stretch-wide text-balance text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {title}
              <span className="text-signal">.</span>
            </h2>
            <p className={cn("mt-6 max-w-2xl text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-paper/70" : "text-smoke")}>
              {description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-center gap-2 border-2 border-signal bg-signal px-8 text-base font-bold uppercase tracking-wide text-paper transition-colors hover:bg-signal-deep hover:border-signal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Start the conversation
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={site.contact.phoneHref}
                className={cn(
                  "inline-flex h-14 items-center justify-center gap-2 border-2 px-8 font-mono text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                  tone === "dark"
                    ? "border-line-dark text-paper hover:border-paper"
                    : "border-ink text-ink hover:bg-ink hover:text-paper"
                )}
              >
                {site.contact.phone}
              </a>
            </div>
            <p className={cn("mt-6 font-mono text-xs uppercase tracking-[0.15em]", tone === "dark" ? "text-paper/50" : "text-smoke")}>
              Prefer email:{" "}
              <a
                href={site.contact.emailHref}
                className={cn(
                  "font-bold underline underline-offset-4",
                  tone === "dark" ? "text-paper decoration-paper/40 hover:text-signal" : "text-ink decoration-ink/40 hover:text-signal"
                )}
              >
                {site.contact.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
