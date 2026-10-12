import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy: Pre-Launch Draft",
  description:
    "How Your Tech Eye handles enquiry data submitted through this website. Draft policy pending owner approval.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-paper">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
          <Reveal>
            <div className="mt-8 max-w-3xl">
              <h1 className="stretch-xwide text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
                Privacy
              </h1>
              <div
                role="note"
                className="mt-6 flex items-start gap-3 border-2 border-ink bg-paper p-4"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-smoke">
                  <strong className="font-semibold">Pre-launch draft.</strong> This
                  summary describes how this website currently handles your data.
                  The final legal privacy policy, with jurisdiction, retention
                  periods, and processors, must be reviewed and approved by the
                  business owner before public launch.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Privacy summary" className="bg-paper">
        <Container narrow className="py-14 sm:py-18">
          <Reveal>
            <div className="space-y-9 border-2 border-ink bg-paper p-7 sm:p-10">
              <section>
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">What this website collects</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  The enquiry form collects only what is needed to answer you:
                  your name, an email address and/or phone number, an optional
                  organisation and site location, the service you are interested
                  in, and your message. We also keep the date of your submission.
                </p>
              </section>

              <section>
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">Why we collect it</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  Your details are used for one purpose: to respond to your
                  enquiry. We do not add you to marketing lists, and we do not
                  sell or share your details with third parties for their own use.
                </p>
              </section>

              <section>
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">How it is stored</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  Enquiries are stored securely in the website&apos;s database and
                  are accessible only to the Your Tech Eye team. If email
                  forwarding is configured, the content of your enquiry is also
                  delivered to the company inbox so the team can reply.
                </p>
                <p className="mt-3 leading-relaxed text-smoke">
                  For security and spam prevention, a one-way hashed value derived
                  from your IP address may be stored with the submission. The raw
                  IP address is not stored, and submitted form content is never
                  placed in analytics.
                </p>
              </section>

              <section>
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">Your choices</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  You can ask us at any time to tell you what we hold about you,
                  correct it, or delete it. Just email{" "}
                  <a
                    href={site.contact.emailHref}
                    className="font-bold text-signal underline decoration-signal/40 underline-offset-4"
                  >
                    {site.contact.email}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={site.contact.phoneHref}
                    className="font-bold text-signal underline decoration-signal/40 underline-offset-4"
                  >
                    {site.contact.phone}
                  </a>
                  .
                </p>
              </section>

              <section id="media-credits">
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">Photography & media credits</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  Photography on this site is licensed stock or public-archive
                  material used illustratively; it does not depict Your Tech Eye
                  staff, clients, or customer sites unless stated. Full source,
                  creator, and licence records are maintained in the project&apos;s{" "}
                  <code className="border border-line bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]">MEDIA_CREDITS.md</code>{" "}
                  file. Images requiring attribution are credited there in
                  accordance with their licences.
                </p>
              </section>

              <section>
                <h2 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">Changes to this page</h2>
                <p className="mt-3 leading-relaxed text-smoke">
                  If this summary changes materially, the updated version will be
                  published on this page before it takes effect.
                </p>
              </section>

              <p className="text-sm text-muted-foreground">
                Questions about anything above? Contact{" "}
                <a
                  href={site.contact.emailHref}
                  className="font-bold text-signal underline decoration-signal/40 underline-offset-4"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
