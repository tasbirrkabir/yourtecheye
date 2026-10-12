"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping video that retries play() after mount, so autoplay works
 * even where browser autoplay heuristics initially block it.
 */
export function AutoVideo({
  src,
  className,
  ariaLabel,
}: {
  src: string;
  className?: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    // Retry once after a short delay (some engines need a tick after load).
    const id = setTimeout(tryPlay, 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
      className={className}
    />
  );
}
