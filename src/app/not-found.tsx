import Link from "next/link";
import { Container } from "@/components/site/container";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading" className="bg-paper">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p
          className="stretch-xwide text-[7rem] font-black uppercase leading-none tracking-tight text-stroke-ink sm:text-[10rem]"
          aria-hidden="true"
        >
          404
        </p>
        <h1
          id="notfound-heading"
          className="stretch-xwide -mt-4 text-2xl font-black uppercase tracking-tight text-ink sm:text-4xl"
        >
          This page is off camera<span className="text-signal">.</span>
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-smoke">
          The page you are looking for does not exist or may have moved. The
          links below will get you back to a monitored view.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 border-2 border-ink bg-ink px-6 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to home
          </Link>
          <a
            href={site.contact.phoneHref}
            className="inline-flex h-12 items-center justify-center gap-2 border-2 border-ink px-6 font-mono text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {site.contact.phone}
          </a>
        </div>
        <nav aria-label="Popular pages" className="mt-10 w-full max-w-xl">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink">
            Popular pages
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Services", href: "/services" },
              ...services.map((s) => ({ label: s.navTitle, href: `/${s.slug}` })),
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block border border-ink bg-paper px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
