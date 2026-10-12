import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

interface ContactCtaProps {
  title?: string;
  description?: string;
  tone?: "dark" | "light";
}

/**
 * Site-wide closing call-to-action band.
 * Copy is phrased to invite a conversation without promising response times
 * or outcomes that the owner has not approved.
 */
export function ContactCta({
  title = "Discuss your site with Your Tech Eye",
  description = "Tell us about your property, your existing cameras, and what worries you most — we will help you work out the right monitoring approach.",
  tone = "dark",
}: ContactCtaProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className={tone === "dark" ? "bg-ink" : "bg-brand-tint"}
    >
      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="cta-heading"
              className={`text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
                tone === "dark" ? "text-white" : "text-ink"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-base leading-relaxed sm:text-lg ${
                tone === "dark" ? "text-[#b6c6d8]" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full font-semibold sm:w-auto">
                <Link href="/contact">Discuss Your Site</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant={tone === "dark" ? "outline" : "outline"}
                className={`w-full font-semibold sm:w-auto ${
                  tone === "dark"
                    ? "border-[#3d5570] bg-transparent text-white hover:bg-[#16304b] hover:text-white"
                    : ""
                }`}
              >
                <a href={site.contact.phoneHref}>Call {site.contact.phone}</a>
              </Button>
            </div>
            <p
              className={`mt-5 text-sm ${
                tone === "dark" ? "text-[#8aa0b8]" : "text-muted-foreground"
              }`}
            >
              Prefer email? Write to{" "}
              <a
                href={site.contact.emailHref}
                className={`font-semibold underline underline-offset-2 ${
                  tone === "dark" ? "text-white" : "text-ink"
                }`}
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
