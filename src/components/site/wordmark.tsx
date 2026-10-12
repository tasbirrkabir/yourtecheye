import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text wordmark for the brutalist identity.
 * The photographic logo is navy blue and clashes with the bone/ink/vermilion
 * palette, so the primary mark is typographic: heavy caps + signal full stop.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-sans font-black uppercase leading-none tracking-tight text-ink",
        className
      )}
    >
      <span className="stretch-xwide">Your&nbsp;Tech&nbsp;Eye</span>
      <span className="ml-0.5 inline-block h-[0.32em] w-[0.32em] translate-y-[-0.02em] bg-signal" aria-hidden="true" />
    </span>
  );
}

export function WordmarkLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Your Tech Eye: home"
      className={cn(
        "inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <Wordmark className="text-lg sm:text-xl" />
    </Link>
  );
}
