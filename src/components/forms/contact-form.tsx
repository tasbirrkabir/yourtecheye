"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/content/services";

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  [key: string]: string | undefined;
}

export function ContactForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<string>("");
  const [service, setService] = useState<string>(
    defaultService && services.some((s) => s.slug === defaultService)
      ? defaultService
      : ""
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // --- lightweight client-side validation (server re-validates everything) ---
    const nextErrors: FieldErrors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const consent = data.get("consent");

    if (!name) nextErrors.name = "Please tell us your name.";
    if (!email && !phone) {
      nextErrors.email = "Add an email address or a phone number so we can reply.";
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email address does not look right. Please check it.";
    }
    if (!message) nextErrors.message = "Please describe briefly what you need.";
    if (!consent) nextErrors.consent = "Please confirm you agree to being contacted about your enquiry.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormMessage("Please fix the highlighted fields and try again.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setFormMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organization: String(data.get("organization") || "").trim(),
          email,
          phone,
          service,
          siteLocation: String(data.get("siteLocation") || "").trim(),
          message,
          consent: Boolean(consent),
          website: String(data.get("website") || ""), // honeypot
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        setFormMessage(
          "Thank you: your request has been received. The Your Tech Eye team will get back to you using the contact details you provided."
        );
        form.reset();
        setService("");
      } else {
        setStatus("error");
        setErrors(json.fieldErrors ?? {});
        setFormMessage(
          json.error ??
            "Sorry: your request could not be sent right now. Please try again, or call us directly."
        );
      }
    } catch {
      setStatus("error");
      setFormMessage(
        "A network problem stopped the request. Please check your connection and try again, or call us directly."
      );
    }
  }

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`error-${key}`} className="mt-1.5 flex items-start gap-1.5 text-sm text-destructive">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{errors[key]}</span>
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-2 border-ink bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-signal" aria-hidden="true" />
          <div>
            <h3 className="stretch-wide text-lg font-black uppercase tracking-tight text-ink">Request received</h3>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              {formMessage}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-signal underline decoration-signal/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from humans, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            aria-describedby={errors.name ? "error-name" : undefined}
            aria-invalid={Boolean(errors.name)}
            className="mt-1.5"
          />
          {fieldError("name")}
        </div>
        <div>
          <Label htmlFor="cf-organization">
            Business / organisation <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="cf-organization"
            name="organization"
            autoComplete="organization"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-email">
            Email <span className="text-muted-foreground">(or phone)</span>
          </Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "error-email" : undefined}
            aria-invalid={Boolean(errors.email)}
            className="mt-1.5"
          />
          {fieldError("email")}
        </div>
        <div>
          <Label htmlFor="cf-phone">
            Phone <span className="text-muted-foreground">(or email)</span>
          </Label>
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-service">Service of interest</Label>
          <Select name="service" value={service} onValueChange={setService}>
            <SelectTrigger id="cf-service" className="mt-1.5 w-full">
              <SelectValue placeholder="Select a service (optional)" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.title}
                </SelectItem>
              ))}
              <SelectItem value="surveillance-security-solutions">
                Surveillance & Security Solutions
              </SelectItem>
              <SelectItem value="not-sure">Not sure yet, advise me</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cf-location">
            Site / project location <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="cf-location"
            name="siteLocation"
            autoComplete="off"
            placeholder="e.g. area or city"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="cf-message">
          How can we help? <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          aria-describedby={errors.message ? "error-message" : undefined}
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us about your site, your existing cameras, and what you want monitored."
          className="mt-1.5"
        />
        {fieldError("message")}
      </div>

      <div>
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="cf-consent"
            name="consent"
            aria-describedby={errors.consent ? "error-consent" : undefined}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5"
          />
          <Label
            htmlFor="cf-consent"
            className="text-sm font-normal leading-relaxed text-muted-foreground"
          >
            I agree that Your Tech Eye may use these details to respond to my enquiry.{" "}
            <span className="text-destructive">*</span>
          </Label>
        </div>
        {fieldError("consent")}
      </div>

      <div aria-live="polite">
        {status === "error" && formMessage ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formMessage}</span>
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className={cn("w-full font-semibold sm:w-auto", status === "submitting" && "opacity-80")}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        We use your details only to answer this enquiry, never for marketing lists,
        and never shared with third parties.
      </p>
    </form>
  );
}
