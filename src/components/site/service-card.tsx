import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <Link
      href={`/${service.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden border-2 border-ink bg-paper transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-ink bg-secondary">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="photo-brutal object-cover group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-signal">
          {service.tagline}
        </p>
        <h3 className="stretch-wide mt-2 text-lg font-black uppercase leading-tight tracking-tight text-ink group-hover:text-paper sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-smoke group-hover:text-paper/70">
          {service.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink group-hover:text-signal">
          Open
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
