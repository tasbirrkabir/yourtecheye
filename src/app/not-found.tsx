import Link from "next/link";
import { Home, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          className="text-[6rem] font-extrabold leading-none tracking-tight text-[#d4dde7] sm:text-[8rem]"
          aria-hidden="true"
        >
          404
        </p>
        <h1 id="notfound-heading" className="-mt-6 text-2xl font-bold text-ink sm:text-3xl">
          This page is off camera
        </h1>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
          The page you are looking for doesn&apos;t exist or may have moved. The
          links below will get you back to a monitored view.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <a href={site.contact.phoneHref}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {site.contact.phone}
            </a>
          </Button>
        </div>
        <nav aria-label="Popular pages" className="mt-10 w-full max-w-xl">
          <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
            <Wrench className="h-4 w-4 text-brand-strong" aria-hidden="true" />
            Popular pages
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Services", href: "/services" },
              ...services.map((s) => ({ label: s.title, href: `/${s.slug}` })),
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-[#b9d3e8] hover:bg-brand-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
