import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { Container } from "./container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-2 border-ink bg-ink text-paper">
      {/* Giant wordmark */}
      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="stretch-wide select-none text-center font-black uppercase leading-[0.85] tracking-tight text-paper">
          <span className="block whitespace-nowrap text-[8.6vw]">Your Tech Eye</span>
        </p>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60 sm:text-xs">
          Live monitoring: verify: intervene: report
        </p>
      </div>

      <Container className="pb-10 pt-12 sm:pb-12">
        <div className="grid gap-10 border-t border-line-dark pt-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
          {/* Index */}
          <nav aria-label="Footer: company">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
              Index
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-bold uppercase tracking-wide text-paper/90 transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer: services">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="font-bold uppercase tracking-wide text-paper/90 transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s.navTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/surveillance-security-solutions"
                  className="font-bold uppercase tracking-wide text-paper/90 transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Surveillance &amp; Security Solutions
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="font-mono text-base font-bold tracking-wide text-paper transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="break-all text-paper/90 transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-paper/70">{site.contact.location}</li>
              <li className="pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Continuous monitoring: every hour of every day
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-dark pt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/50 sm:text-[11px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.name}. All rights reserved.
            </p>
            {/* Legal row */}
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-bold uppercase tracking-[0.15em] text-paper/70 transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="max-w-xl normal-case tracking-normal">
            Developed by{" "}
            <a
              href="https://tasbirkabir.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-paper/40 underline-offset-2 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Tasbir Kabir
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
