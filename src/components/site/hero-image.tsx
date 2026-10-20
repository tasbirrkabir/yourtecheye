import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  src: string;
  alt: string;
  /** Mono caption rendered under the frame, e.g. "FIG.02: ...". */
  caption: string;
  /** Prioritise loading (set on the hero image above the fold). */
  priority?: boolean;
  className?: string;
}

/**
 * Brutalist framed photograph used beside page headings:
 * hard ink frame, offset signal outline, hard shadow, mono figure caption,
 * grayscale-to-colour reveal on hover (respects prefers-reduced-motion via
 * the .photo-brutal utility).
 */
export function HeroImage({
  src,
  alt,
  caption,
  priority = false,
  className,
}: HeroImageProps) {
  return (
    <figure
      className={cn(
        "group relative w-full max-w-sm shrink-0 lg:w-[26rem]",
        className
      )}
    >
      {/* Offset signal outline behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -top-2 h-full w-full border-2 border-signal"
      />
      <div className="relative border-2 border-ink bg-paper p-2 shadow-[10px_10px_0_0_var(--ink)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 416px"
            className="photo-brutal object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Corner ticks */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-paper/90"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-paper/90"
          />
        </div>
        <figcaption className="flex items-baseline justify-between gap-3 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
          <span>{caption}</span>
          <span className="font-bold text-signal" aria-hidden="true">
            REC
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
