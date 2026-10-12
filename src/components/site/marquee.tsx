import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** dark = ink background (default), signal = vermilion band */
  tone?: "dark" | "signal";
  separator?: string;
}

/**
 * Brutalist ticker strip. Content is duplicated once so the CSS
 * translateX(-50%) loop is seamless.
 */
export function Marquee({
  items,
  className,
  tone = "dark",
  separator = "✱",
}: MarqueeProps) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className="mx-6 text-signal" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className={cn(
        "overflow-hidden border-y py-3",
        tone === "dark"
          ? "border-ink bg-ink text-paper"
          : "border-ink bg-signal text-paper",
        className
      )}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max font-mono text-xs font-medium uppercase tracking-[0.2em] sm:text-sm">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
