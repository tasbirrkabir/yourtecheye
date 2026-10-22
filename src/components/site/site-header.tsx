"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { WordmarkLink } from "./wordmark";
import { OpsClock } from "./ops-clock";

const navLink =
  "px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on route change (render-time state adjustment,
  // per React docs: adjusting state when a prop/URL changes).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileOpen || servicesExpanded) {
      setMobileOpen(false);
      setServicesExpanded(false);
    }
  }

  // Escape to close + focus return + scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Services only lights up on the services index, the four service detail
  // pages, and the solutions page: never on FAQ or legal pages.
  const serviceActive =
    pathname === "/services" ||
    pathname === "/surveillance-security-solutions" ||
    services.some((s) => pathname.startsWith(`/${s.slug}`));

  return (
    <header className="sticky top-0 z-50 w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[70] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      {/* Utility strip */}
      <div className="bg-ink text-paper">
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.18em] sm:px-6 lg:px-8 lg:text-[11px]">
          <p className="truncate">Dhaka, Bangladesh: 23.81N 90.41E</p>
          <p className="flex items-center gap-2">
            <span className="hidden sm:inline">Ops status:</span>
            <span className="flex items-center gap-1.5 text-signal">
              <span className="rec-blink inline-block h-1.5 w-1.5 bg-signal" aria-hidden="true" />
              Active
            </span>
            <span aria-hidden="true" className="text-line-dark">/</span>
            <OpsClock className="tabular-nums" />
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <WordmarkLink />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <Link href="/" className={cn(navLink, isActive("/") && "text-signal")} aria-current={isActive("/") ? "page" : undefined}>
              Home
            </Link>
            <Link href="/about" className={cn(navLink, isActive("/about") && "text-signal")} aria-current={isActive("/about") ? "page" : undefined}>
              About
            </Link>

            {/* Services: dropdown works with keyboard & hover, not hover-only */}
            <div className="group relative">
              <button
                type="button"
                aria-expanded="false"
                aria-haspopup="true"
                className={cn(navLink, "inline-flex items-center gap-1", serviceActive && "text-signal")}
              >
                Services
                <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" aria-hidden="true" />
              </button>
              <div
                className="invisible absolute left-0 top-full z-50 w-80 translate-y-1 border-2 border-ink bg-paper opacity-0 shadow-[8px_8px_0_0_var(--ink)] transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                role="menu"
                aria-label="Services"
              >
                <Link
                  href="/services"
                  role="menuitem"
                  className="block border-b border-line px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper"
                >
                  All services
                  <span className="mt-0.5 block font-mono text-[10px] font-normal normal-case tracking-normal text-smoke group-hover:text-paper/70">
                    Overview of everything YTE offers
                  </span>
                </Link>
                {services.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    role="menuitem"
                    className="flex items-baseline gap-3 border-b border-line px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink last:border-b-0 hover:bg-ink hover:text-paper"
                  >
                    <span className="font-mono text-[10px] font-normal text-signal">0{i + 1}</span>
                    {s.navTitle}
                  </Link>
                ))}
                <Link
                  href="/surveillance-security-solutions"
                  role="menuitem"
                  className="block border-t-2 border-ink bg-secondary px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper"
                >
                  Surveillance &amp; Security Solutions
                </Link>
              </div>
            </div>

            <Link href="/faq" className={cn(navLink, isActive("/faq") && "text-signal")} aria-current={isActive("/faq") ? "page" : undefined}>
              FAQ
            </Link>

            <Link href="/blog" className={cn(navLink, isActive("/blog") && "text-signal")} aria-current={isActive("/blog") ? "page" : undefined}>
              Blog
            </Link>

            <Link href="/contact" className={cn(navLink, isActive("/contact") && "text-signal")} aria-current={isActive("/contact") ? "page" : undefined}>
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={site.contact.phoneHref}
              className="font-mono text-xs font-bold tracking-wide text-ink underline-offset-4 hover:text-signal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {site.contact.phone}
            </a>
            <Link
              href="/contact"
              className="group inline-flex h-10 items-center gap-2 border-2 border-ink bg-ink px-4 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:bg-signal hover:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Discuss your site
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-ink text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu: full-screen ink overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "scrollbar-slim fixed inset-x-0 bottom-0 top-[6.5rem] z-40 overflow-y-auto bg-ink text-paper lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="border-b border-line-dark py-4 text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="border-b border-line-dark py-4 text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-current={isActive("/about") ? "page" : undefined}
          >
            About
          </Link>
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-line-dark py-4 text-left text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-expanded={servicesExpanded}
            aria-controls="mobile-services"
            onClick={() => setServicesExpanded((v) => !v)}
          >
            Services
            <Plus
              className={cn("h-6 w-6 transition-transform", servicesExpanded && "rotate-45")}
              aria-hidden="true"
            />
          </button>
          <div id="mobile-services" className={cn("py-2", !servicesExpanded && "hidden")}>
            <Link href="/services" className="block py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-signal">
              All services
            </Link>
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="flex items-baseline gap-3 py-3 text-base font-bold uppercase tracking-wide text-paper/90 hover:text-signal"
              >
                <span className="font-mono text-[10px] text-signal">0{i + 1}</span>
                {s.navTitle}
              </Link>
            ))}
            <Link
              href="/surveillance-security-solutions"
              className="block py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-signal"
            >
              Surveillance &amp; Security Solutions
            </Link>
          </div>
          <Link
            href="/faq"
            className="border-b border-line-dark py-4 text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-current={isActive("/faq") ? "page" : undefined}
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            className="border-b border-line-dark py-4 text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-current={isActive("/blog") ? "page" : undefined}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="border-b border-line-dark py-4 text-2xl font-black uppercase tracking-tight text-paper hover:text-signal"
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>

          <div className="mt-8 space-y-3">
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center gap-2 border-2 border-signal bg-signal px-4 text-sm font-bold uppercase tracking-wide text-paper"
            >
              Discuss your site
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.contact.phoneHref}
              className="flex h-12 items-center justify-center gap-2 border-2 border-line-dark px-4 font-mono text-sm font-bold text-paper hover:border-paper"
            >
              Call {site.contact.phone}
            </a>
          </div>
          <p className="mt-8 pb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
            Dhaka, Bangladesh: 23.81N 90.41E
          </p>
        </nav>
      </div>
    </header>
  );
}
