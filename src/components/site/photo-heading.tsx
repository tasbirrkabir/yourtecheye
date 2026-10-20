import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhotoHeadingProps {
  /** Photographic texture clipped into the letterforms. Path under /public. */
  src: string;
  /** Semantic tag to render. Defaults to h1. */
  as?: "h1" | "h2" | "span";
  /** 0..1 dark scrim baked over the photo so the type stays readable. */
  scrim?: number;
  /** Vertical focus point of the background photo, any CSS position value. */
  position?: string;
  /** Preload the texture (set true only for above-the-fold headings). */
  preload?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Brutalist editorial heading with a photograph clipped into the letterforms
 * (background-clip: text). The heading stays real, selectable, indexable text;
 * the photo is purely decorative texture behind the glyphs.
 *
 * Fallbacks:
 * - Without background-clip: text support the heading renders as solid ink.
 * - If the image fails to load, an ink under-layer keeps the letters solid.
 * The signal-coloured dot span (`.text-signal`) keeps its solid vermilion.
 */
export function PhotoHeading({
  src,
  as: Tag = "h1",
  scrim = 0.42,
  position = "center",
  preload = false,
  id,
  className,
  children,
}: PhotoHeadingProps) {
  const style = {
    "--heading-img": `url('${src}')`,
    "--heading-scrim": `${scrim}`,
    "--heading-pos": position,
  } as CSSProperties;

  return (
    <>
      {preload ? (
        // React hoists rendered <link rel="preload"> into <head>.
        <link rel="preload" as="image" href={src} fetchPriority="high" />
      ) : null}
      <Tag id={id} className={cn("heading-photo", className)} style={style}>
        {children}
      </Tag>
    </>
  );
}
