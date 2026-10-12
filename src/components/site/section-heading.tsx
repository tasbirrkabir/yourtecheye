import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Brutalist editorial heading: mono kicker with index, then a huge
 * uppercase display title set in expanded Archivo Black.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] sm:text-xs",
            align === "center" && "justify-center",
            tone === "dark" ? "text-signal" : "text-ink"
          )}
        >
          <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
          {index ? <span>{index} /</span> : null}
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <h2
        className={cn(
          "stretch-wide text-balance text-3xl font-black uppercase leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-paper/70" : "text-smoke"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
