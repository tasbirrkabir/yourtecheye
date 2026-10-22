import Image from "next/image";
import { Fragment, type ReactNode } from "react";

/**
 * Markdown-lite renderer for admin-written blog bodies.
 *
 * Supported syntax (kept intentionally small so the owner cannot break
 * the layout):
 *   ## Heading two
 *   ### Heading three
 *   - bullet list item
 *   1. numbered list item
 *   > blockquote line
 *   ![alt text](/uploads/photo.webp)   -> framed figure
 *   ---                                 -> rule
 *   **bold**, [text](https://link)
 *   blank line separates paragraphs
 */

interface InlineToken {
  type: "text" | "bold" | "link";
  value: string;
  href?: string;
}

const INLINE_RE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_RE)) {
    const start = match.index ?? 0;
    if (start > last) tokens.push({ type: "text", value: text.slice(last, start) });
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const href = match[3];
      const safeHref = /^(https?:\/\/|\/|mailto:|tel:)/i.test(href) ? href : "#";
      tokens.push({ type: "link", value: match[2], href: safeHref });
    }
    last = start + match[0].length;
  }
  if (last < text.length) tokens.push({ type: "text", value: text.slice(last) });
  return tokens;
}

function renderInline(text: string, keyBase: string): ReactNode {
  const tokens = tokenizeInline(text);
  if (tokens.length === 0) return null;
  return (
    <>
      {tokens.map((t, i) => {
        const key = `${keyBase}-${i}`;
        if (t.type === "bold")
          return <strong key={key} className="font-bold text-ink">{t.value}</strong>;
        if (t.type === "link" && t.href)
          return (
            <a
              key={key}
              href={t.href}
              target={t.href.startsWith("http") ? "_blank" : undefined}
              rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-bold text-ink underline decoration-signal/50 decoration-2 underline-offset-4 hover:text-signal hover:decoration-signal"
            >
              {t.value}
            </a>
          );
        return <Fragment key={key}>{t.value}</Fragment>;
      })}
    </>
  );
}

const FIG_RE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

function Figure({ alt, src, index }: { alt: string; src: string; index: number }) {
  // Only local paths from the admin media library are allowed in figures.
  const safeSrc = /^\/(media|uploads|brand)\//.test(src) ? src : "";
  if (!safeSrc) return null;
  return (
    <figure className="my-10">
      <div className="border-2 border-ink bg-paper p-1.5">
        <Image
          src={safeSrc}
          alt={alt || `Blog figure ${index + 1}`}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full object-cover"
        />
      </div>
      {alt ? (
        <figcaption className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
          <span className="inline-block h-1.5 w-1.5 bg-signal" aria-hidden="true" />
          Fig.{String(index + 1).padStart(2, "0")}: {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function BlogMarkdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];
  let figureCount = 0;

  const flushPara = () => {
    if (para.length) {
      const text = para.join(" ").trim();
      if (text) {
        blocks.push(
          <p key={`p-${blocks.length}`} className="my-5 text-base leading-[1.85] text-smoke sm:text-lg">
            {renderInline(text, `p-${blocks.length}`)}
          </p>
        );
      }
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const Tag = list.ordered ? "ol" : "ul";
      blocks.push(
        <Tag
          key={`l-${blocks.length}`}
          className={`my-6 space-y-2.5 border-l-2 border-ink pl-5 ${list.ordered ? "list-none" : "list-none"}`}
        >
          {list.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-smoke sm:text-lg">
              <span className="shrink-0 font-mono text-sm font-bold text-signal">
                {list!.ordered ? `${String(i + 1).padStart(2, "0")}` : "//"}
              </span>
              <span>{renderInline(item, `li-${blocks.length}-${i}`)}</span>
            </li>
          ))}
        </Tag>
      );
      list = null;
    }
  };
  const flushQuote = () => {
    if (quote.length) {
      blocks.push(
        <blockquote
          key={`q-${blocks.length}`}
          className="my-8 border-y-2 border-ink bg-secondary/50 px-5 py-5 sm:px-7"
        >
          <p className="stretch-wide text-lg font-bold uppercase leading-snug tracking-tight text-ink sm:text-xl">
            {renderInline(quote.join(" "), `q-${blocks.length}`)}
          </p>
        </blockquote>
      );
      quote = [];
    }
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const figure = line.match(FIG_RE);
    if (figure) {
      flushAll();
      blocks.push(
        <Figure key={`f-${blocks.length}`} alt={figure[1]} src={figure[2]} index={figureCount++} />
      );
      continue;
    }

    if (/^-{3,}$/.test(line.trim())) {
      flushAll();
      blocks.push(<hr key={`hr-${blocks.length}`} className="my-10 border-0 border-t-2 border-ink" />);
      continue;
    }

    if (line.startsWith("### ")) {
      flushAll();
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          className="mt-10 mb-3 stretch-wide text-xl font-black uppercase tracking-tight text-ink sm:text-2xl"
        >
          {line.slice(4)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushAll();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="mt-12 mb-4 flex items-baseline gap-3 stretch-wide text-2xl font-black uppercase leading-tight tracking-tight text-ink sm:text-3xl"
        >
          <span className="inline-block h-3 w-3 shrink-0 translate-y-[-2px] bg-signal" aria-hidden="true" />
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("> ")) {
      flushPara();
      flushList();
      quote.push(line.slice(2));
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushPara();
      flushQuote();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushPara();
      flushQuote();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(numbered[1]);
      continue;
    }

    flushList();
    flushQuote();
    para.push(line.trim());
  }
  flushAll();

  return <div className="blog-body">{blocks}</div>;
}
