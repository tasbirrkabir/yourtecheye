"use client";

import { useEffect, useState } from "react";

/**
 * Surveillance overlay for media panels: blinking REC marker and a live
 * UTC+6 timestamp. Renders a stable server placeholder, then ticks.
 */
export function FeedOverlay({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
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
    <div
      className={
        "pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-[11px] " +
        (className ?? "")
      }
    >
      <span className="flex items-center gap-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
        <span className="rec-blink inline-block h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
        REC
      </span>
      <span className="[text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">{label}</span>
      <span suppressHydrationWarning className="tabular-nums [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
        {time ?? "--:--:--"}
      </span>
    </div>
  );
}
