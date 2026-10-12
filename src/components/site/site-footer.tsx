import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-[#b6c6d8]">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="inline-flex rounded-xl bg-white p-3">
              <Image
                src="/brand/yourtecheye-logo.png"
                alt={`${site.name} logo`}
                width={683}
                height={366}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A monitoring and technology company providing smart, secure, and
              reliable protection for businesses, properties, and families.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7db8e0]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {site.tagline}
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/surveillance-security-solutions"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Surveillance & Security Solutions
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#7db8e0]" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#7db8e0]" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7db8e0]" aria-hidden="true" />
                <span>{site.contact.location}</span>
              </li>
              <li className="pt-1 text-xs font-semibold uppercase tracking-wider text-[#7db8e0]">
                24/7 Monitoring Services
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            Photography is licensed stock or public-archive material used
            illustratively — see{" "}
            <Link
              href="/privacy#media-credits"
              className="underline decoration-[#3d5570] underline-offset-2 hover:text-white"
            >
              media credits
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
