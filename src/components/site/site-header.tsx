"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";

const navLink =
  "rounded-md px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled || mobileOpen
          ? "border-border bg-white/95 shadow-[0_1px_12px_rgba(10,27,46,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/90"
          : "border-transparent bg-white"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src="/brand/yourtecheye-logo.png"
            alt={`${site.name} logo`}
            width={683}
            height={366}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          <Link
            href="/"
            className={cn(navLink, isActive("/") && "bg-secondary text-ink")}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(navLink, isActive("/about") && "bg-secondary text-ink")}
            aria-current={isActive("/about") ? "page" : undefined}
          >
            About
          </Link>

          {/* Services — dropdown works with keyboard & hover, not hover-only */}
          <div className="group relative">
            <button
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              className={cn(
                navLink,
                "inline-flex items-center gap-1",
                pathname !== "/" &&
                  pathname !== "/about" &&
                  pathname !== "/contact" &&
                  "bg-secondary text-ink"
              )}
            >
              Services
              <ChevronDown
                className="h-4 w-4 transition-transform group-hover:rotate-180"
                aria-hidden="true"
              />
            </button>
            <div
              className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-xl border border-border bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
              role="menu"
              aria-label="Services"
            >
              <Link
                href="/services"
                role="menuitem"
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
              >
                All services
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  Overview of everything YTE offers
                </span>
              </Link>
              <div className="my-1.5 h-px bg-border" role="presentation" />
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  role="menuitem"
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
                >
                  {s.title}
                </Link>
              ))}
              <div className="my-1.5 h-px bg-border" role="presentation" />
              <Link
                href="/surveillance-security-solutions"
                role="menuitem"
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
              >
                Surveillance & Security Solutions
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            className={cn(navLink, isActive("/contact") && "bg-secondary text-ink")}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 text-primary"
          >
            <a href={site.contact.phoneHref} className="font-semibold">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{site.contact.phone}</span>
            </a>
          </Button>
          <Button asChild size="sm" className="font-semibold">
            <Link href="/contact">Discuss Your Site</Link>
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "scrollbar-slim overflow-y-auto border-t border-border bg-white lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Mobile" className="space-y-1 px-4 py-4">
          <Link
            href="/"
            className="block rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-secondary"
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-secondary"
            aria-current={isActive("/about") ? "page" : undefined}
          >
            About
          </Link>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-ink hover:bg-secondary"
            aria-expanded={servicesExpanded}
            aria-controls="mobile-services"
            onClick={() => setServicesExpanded((v) => !v)}
          >
            Services
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform",
                servicesExpanded && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
          <div
            id="mobile-services"
            className={cn("ml-3 space-y-1 border-l-2 border-border pl-3", !servicesExpanded && "hidden")}
          >
            <Link
              href="/services"
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
            >
              All services
            </Link>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
              >
                {s.title}
              </Link>
            ))}
            <Link
              href="/surveillance-security-solutions"
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-secondary"
            >
              Surveillance & Security Solutions
            </Link>
          </div>
          <Link
            href="/contact"
            className="block rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-secondary"
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <Button asChild className="w-full font-semibold">
              <Link href="/contact">Discuss Your Site</Link>
            </Button>
            <Button asChild variant="outline" className="w-full gap-2 font-semibold">
              <a href={site.contact.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {site.contact.phone}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
