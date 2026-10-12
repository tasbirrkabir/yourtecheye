import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { services } from "@/content/services";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Please tell us your name.").max(120),
    organization: z.string().trim().max(160).optional().default(""),
    email: z.string().trim().toLowerCase().max(200).optional().default(""),
    phone: z.string().trim().max(40).optional().default(""),
    service: z.string().trim().max(80).optional().default(""),
    siteLocation: z.string().trim().max(160).optional().default(""),
    message: z
      .string()
      .trim()
      .min(1, "Please describe briefly what you need.")
      .max(4000),
    consent: z.literal(true, {
      message: "Please confirm you agree to being contacted about your enquiry.",
    }),
    website: z.string().optional().default(""), // honeypot
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message:
          "Add an email address or a phone number so we can reply.",
      });
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "That email address does not look right. Please check it.",
      });
    }
    if (data.phone && data.phone.replace(/[^\d+]/g, "").length < 6) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "That phone number looks too short. Please check it.",
      });
    }
    const validServices = [
      ...services.map((s) => s.slug),
      "surveillance-security-solutions",
      "not-sure",
    ];
    if (data.service && !validServices.includes(data.service)) {
      ctx.addIssue({ code: "custom", path: ["service"], message: "Unknown service selected." });
    }
  });

/* ------------------------------------------------------------------ */
/* Spam protection                                                     */
/* ------------------------------------------------------------------ */

/** Naive in-memory rate limit: 5 submissions per IP hash per 10 minutes. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_LIMIT) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

function hashIp(ip: string): string {
  const salt = process.env.CONTACT_RATELIMIT_SALT ?? "yte-local-salt";
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}

/* ------------------------------------------------------------------ */
/* Optional email delivery                                             */
/* ------------------------------------------------------------------ */

async function emailDeliver(payload: {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  siteLocation: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false; // delivery not configured, handled honestly below

  const lines = [
    `Name: ${payload.name}`,
    `Organisation: ${payload.organization || "not provided"}`,
    `Email: ${payload.email || "not provided"}`,
    `Phone: ${payload.phone || "not provided"}`,
    `Service interest: ${payload.service || "not provided"}`,
    `Site location: ${payload.siteLocation || "not provided"}`,
    "",
    payload.message,
  ];
  const subject = `Website enquiry: ${payload.name}${payload.organization ? ` (${payload.organization})` : ""}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "website@yourtecheye.com",
        to: [to],
        reply_to: payload.email || undefined,
        subject,
        text: lines.join("\n"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: pretend success so bots do not learn, but store nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, stored: false, emailed: false });
  }

  const ipHash = hashIp(
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown"
  );

  if (rateLimited(ipHash)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests from this connection. Please wait a few minutes, or call us directly.",
      },
      { status: 429 }
    );
  }

  // Store first: a lead must never be silently lost.
  let stored = false;
  try {
    await db.contactSubmission.create({
      data: {
        name: data.name,
        organization: data.organization || null,
        email: data.email || null,
        phone: data.phone || null,
        service: data.service || null,
        siteLocation: data.siteLocation || null,
        message: data.message,
        ipHash,
        userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      },
    });
    stored = true;
  } catch (err) {
    console.error("[contact] failed to store submission", err);
  }

  const emailed = await emailDeliver(data);
  if (emailed && stored) {
    try {
      await db.contactSubmission.updateMany({
        where: {
          name: data.name,
          message: data.message,
          emailSent: false,
        },
        data: { emailSent: true },
      });
    } catch {
      // non-fatal
    }
  }

  if (!stored && !emailed) {
    // Nothing succeeded: be honest, never claim the enquiry was sent.
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not receive your request right now. Please email us directly at yourtecheye@gmail.com or call +8801780145132.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored,
    emailed,
    // Honest status surfaced to the owner/ops, not the visitor:
    note: emailed
      ? "delivered to inbox and stored"
      : "stored in the enquiries database (email delivery not configured)",
  });
}
