"use client";

import { useEffect, useState } from "react";

/**
 * Ops-clock: a live UTC+6 clock rendered on the client only.
 * Renders a stable placeholder on the server (and first paint) to avoid
 * hydration mismatches, then ticks every second.
 */
export function OpsClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const dhaka = new Date(now.getTime() + (6 * 60 + now.getTimezoneOffset()) * 60000);
      const hh = String(dhaka.getHours()).padStart(2, "0");
      const mm = String(dhaka.getMinutes()).padStart(2, "0");
      const ss = String(dhaka.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  );
}
