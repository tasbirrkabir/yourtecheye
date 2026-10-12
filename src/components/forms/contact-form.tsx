"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  [key: string]: string | undefined;
}

const MESSAGE_MAX = 4000;

const cameraOptions = [
  { value: "1-4", label: "1 to 4 cameras" },
  { value: "5-8", label: "5 to 8 cameras" },
  { value: "9-16", label: "9 to 16 cameras" },
  { value: "17-plus", label: "More than 16 cameras" },
  { value: "not-installed", label: "No cameras installed yet" },
  { value: "unsure", label: "Not sure" },
];

const timeframeOptions = [
  { value: "immediately", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1 to 3 months" },
  { value: "exploring", label: "Just exploring options" },
];

const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "either", label: "Either is fine" },
];

/** Brutal-minimal input styles, shared by every field. */
const fieldClass =
  "mt-2 rounded-none border-2 border-ink bg-paper text-ink placeholder:text-smoke/60 focus-visible:ring-signal focus-visible:border-ink";
const labelClass =
  "font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink";
const optionalNote = <span className="ml-1 font-normal normal-case tracking-normal text-smoke">(optional)</span>;

export function ContactForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formMessage, setFormMessage] = useState<string>("");
  const [reference, setReference] = useState<string>("");

  const [service, setService] = useState<string>(
    defaultService && services.some((s) => s.slug === defaultService)
      ? defaultService
      : ""
  );
  const [contactMethod, setContactMethod] = useState<string>("either");
  const [cameraCount, setCameraCount] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");

  /**
   * Validate a full set of field values. Used both on blur (single field)
   * and on submit (everything).
   */
  function validateField(
    key: string,
    values: { name: string; email: string; phone: string; message: string; consent: boolean }
  ): string | undefined {
    switch (key) {
      case "name":
        if (!values.name.trim()) return "Please tell us your name.";
        return undefined;
      case "email":
        if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
          return "That email address does not look right. Please check it.";
        if (!values.email.trim() && !values.phone.trim())
          return "Add an email address or a phone number so we can reply.";
        return undefined;
      case "phone":
        if (
          values.phone.trim() &&
          values.phone.replace(/[^\d+]/g, "").length < 6
        )
          return "That phone number looks too short. Please check it.";
        if (!values.email.trim() && !values.phone.trim())
          return "Add an email address or a phone number so we can reply.";
        return undefined;
      case "message":
        if (!values.message.trim()) return "Please describe briefly what you need.";
        return undefined;
      case "consent":
        if (!values.consent) return "Please confirm you agree to being contacted about your enquiry.";
        return undefined;
      default:
        return undefined;
    }
  }

  function onBlurField(key: "name" | "email" | "phone" | "message") {
    setTouched((t) => ({ ...t, [key]: true }));
    const form = document.querySelector<HTMLFormElement>("form[data-yte-enquiry]");
    const consent = form?.querySelector<HTMLInputElement>("#cf-consent")?.checked ?? false;
    const error = validateField(key, { name, email, phone, message, consent });
    setErrors((e) => ({ ...e, [key]: error }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const consent = Boolean(data.get("consent"));

    // --- full client-side validation (server re-validates everything) ---
    const values = { name, email, phone, message, consent };
    const nextErrors: FieldErrors = {};
    for (const key of ["name", "email", "phone", "message", "consent"]) {
      const error = validateField(key, values);
      if (error) nextErrors[key] = error;
    }

    setTouched({ name: true, email: true, phone: true, message: true, consent: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormMessage("Please fix the highlighted fields and try again.");
      setStatus("error");
      const firstKey = ["name", "email", "phone", "message", "consent"].find(
        (k) => nextErrors[k]
      );
      form.querySelector<HTMLElement>(`#cf-${firstKey === "message" ? "message" : firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setFormMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          organization: String(data.get("organization") || "").trim(),
          email: email.trim(),
          phone: phone.trim(),
          service,
          contactMethod,
          cameraCount,
          timeframe,
          siteLocation: String(data.get("siteLocation") || "").trim(),
          message: message.trim(),
          consent,
          website: String(data.get("website") || ""), // honeypot
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        setReference(typeof json.ref === "string" ? json.ref : "");
        form.reset();
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setService("");
        setContactMethod("either");
        setCameraCount("");
        setTimeframe("");
        setTouched({});
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

  const fieldError = (key: string, hideUntouched = true) => {
    const show = errors[key] && (!hideUntouched || touched[key]);
    return show ? (
      <p id={`error-${key}`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-destructive">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{errors[key]}</span>
      </p>
    ) : null;
  };

  const successNextSteps = useMemo(
    () => [
      {
        icon: <Mail className="h-4 w-4" aria-hidden="true" />,
        text: `Written reply to the contact details you gave us, from ${site.contact.email}`,
      },
      {
        icon: <Phone className="h-4 w-4" aria-hidden="true" />,
        text: `Or call us now on ${site.contact.phone} if it is urgent`,
      },
      {
        icon: <ArrowRight className="h-4 w-4" aria-hidden="true" />,
        text: "A short site conversation, then a clear proposal: no obligation at any point",
      },
    ],
    []
  );

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-2 border-ink bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-signal" aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="stretch-wide text-xl font-black uppercase tracking-tight text-ink">
              Enquiry received
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              Thank you. Your request is with the team and we will get back to
              you using the contact details you provided.
            </p>
            {reference ? (
              <p className="mt-3 inline-block border-2 border-ink bg-secondary px-3 py-1.5 font-mono text-xs font-bold tracking-[0.1em] text-ink">
                Reference: {reference}
              </p>
            ) : null}
            <div className="mt-5 border-t-2 border-line pt-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                What happens next
              </p>
              <ul className="mt-3 space-y-2.5">
                {successNextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-smoke">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink text-ink">
                      {step.icon}
                    </span>
                    <span className="leading-relaxed">{step.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 border-2 border-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-yte-enquiry
      className="space-y-6"
    >
      {/* Honeypot: hidden from humans, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 01: Who you are */}
      <fieldset className="border-2 border-ink p-4 sm:p-5">
        <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
          01: About you
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="cf-name" className={labelClass}>
              Name <span className="text-signal">*</span>
            </Label>
            <Input
              id="cf-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => onBlurField("name")}
              aria-describedby={errors.name && touched.name ? "error-name" : undefined}
              aria-invalid={Boolean(errors.name && touched.name)}
              className={fieldClass}
            />
            {fieldError("name")}
          </div>
          <div>
            <Label htmlFor="cf-organization" className={labelClass}>
              Business / organisation {optionalNote}
            </Label>
            <Input
              id="cf-organization"
              name="organization"
              autoComplete="organization"
              className={fieldClass}
            />
          </div>
        </div>
      </fieldset>

      {/* 02: How we reach you */}
      <fieldset className="border-2 border-ink p-4 sm:p-5">
        <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
          02: How we reach you
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="cf-email" className={labelClass}>
              Email <span className="text-signal">*</span>
            </Label>
            <Input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => onBlurField("email")}
              aria-describedby={errors.email && touched.email ? "error-email" : undefined}
              aria-invalid={Boolean(errors.email && touched.email)}
              className={fieldClass}
            />
            {fieldError("email")}
          </div>
          <div>
            <Label htmlFor="cf-phone" className={labelClass}>
              Phone {optionalNote}
            </Label>
            <Input
              id="cf-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => onBlurField("phone")}
              aria-describedby={errors.phone && touched.phone ? "error-phone" : undefined}
              aria-invalid={Boolean(errors.phone && touched.phone)}
              className={fieldClass}
            />
            {fieldError("phone")}
          </div>
        </div>

        <div className="mt-5">
          <Label className={labelClass} asChild={false}>
            <span id="cf-method-label">Preferred way to be contacted {optionalNote}</span>
          </Label>
          <RadioGroup
            value={contactMethod}
            onValueChange={setContactMethod}
            aria-labelledby="cf-method-label"
            className="mt-2.5 grid grid-cols-3 gap-2"
          >
            {contactMethodOptions.map((opt) => (
              <Label
                key={opt.value}
                htmlFor={`cf-method-${opt.value}`}
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 border-2 border-ink px-2 py-2.5 text-xs font-bold uppercase tracking-wide text-ink transition-colors has-[[data-state=checked]]:bg-ink has-[[data-state=checked]]:text-paper hover:bg-secondary",
                  contactMethod === opt.value && "bg-ink text-paper"
                )}
              >
                <RadioGroupItem
                  id={`cf-method-${opt.value}`}
                  value={opt.value}
                  className="sr-only"
                />
                {opt.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
      </fieldset>

      {/* 03: About the site */}
      <fieldset className="border-2 border-ink p-4 sm:p-5">
        <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
          03: About the site
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="cf-service" className={labelClass}>
              Service of interest {optionalNote}
            </Label>
            <Select name="service" value={service} onValueChange={setService}>
              <SelectTrigger id="cf-service" className={cn(fieldClass, "mt-2 w-full")}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-ink">
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
            <Label htmlFor="cf-cameras" className={labelClass}>
              Cameras on site {optionalNote}
            </Label>
            <Select name="cameraCount" value={cameraCount} onValueChange={setCameraCount}>
              <SelectTrigger id="cf-cameras" className={cn(fieldClass, "mt-2 w-full")}>
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-ink">
                {cameraOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cf-timeframe" className={labelClass}>
              When should monitoring start {optionalNote}
            </Label>
            <Select name="timeframe" value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger id="cf-timeframe" className={cn(fieldClass, "mt-2 w-full")}>
                <SelectValue placeholder="Select a timeframe" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-ink">
                {timeframeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cf-location" className={labelClass}>
              Site / project location {optionalNote}
            </Label>
            <Input
              id="cf-location"
              name="siteLocation"
              autoComplete="off"
              placeholder="e.g. area or city"
              className={fieldClass}
            />
          </div>
        </div>
      </fieldset>

      {/* 04: Message */}
      <fieldset className="border-2 border-ink p-4 sm:p-5">
        <legend className="px-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
          04: Your message
        </legend>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <Label htmlFor="cf-message" className={labelClass}>
              How can we help <span className="text-signal">*</span>
            </Label>
            <span
              aria-hidden="true"
              className={cn(
                "font-mono text-[10px] tabular-nums",
                message.length > MESSAGE_MAX * 0.9 ? "text-signal font-bold" : "text-smoke"
              )}
            >
              {message.length} / {MESSAGE_MAX}
            </span>
          </div>
          <Textarea
            id="cf-message"
            name="message"
            required
            rows={6}
            maxLength={MESSAGE_MAX}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => onBlurField("message")}
            aria-describedby={errors.message && touched.message ? "error-message" : undefined}
            aria-invalid={Boolean(errors.message && touched.message)}
            placeholder="Tell us about your site, your existing cameras, and what you want monitored."
            className={cn(fieldClass, "resize-y")}
          />
          {fieldError("message")}
        </div>
      </fieldset>

      {/* Consent */}
      <div>
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="cf-consent"
            name="consent"
            aria-describedby={errors.consent ? "error-consent" : undefined}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 border-2 border-ink data-[state=checked]:border-signal data-[state=checked]:bg-signal"
          />
          <Label
            htmlFor="cf-consent"
            className="text-sm font-normal leading-relaxed text-smoke"
          >
            I agree that Your Tech Eye may use these details to respond to my
            enquiry, as described in the{" "}
            <a
              href="/privacy"
              className="font-medium text-ink underline decoration-signal underline-offset-2 hover:text-signal"
            >
              Privacy Policy
            </a>
            . <span className="text-signal">*</span>
          </Label>
        </div>
        {fieldError("consent", false)}
      </div>

      <div aria-live="polite">
        {status === "error" && formMessage ? (
          <p
            role="alert"
            className="flex items-start gap-2 border-2 border-destructive/40 bg-destructive/5 p-3 text-sm font-medium text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formMessage}</span>
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "group inline-flex h-13 w-full items-center justify-center gap-3 border-2 border-ink bg-ink px-8 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-paper transition-colors hover:border-signal hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto",
          status === "submitting" && "cursor-wait opacity-80"
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>
      <p className="-mt-2 font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed text-smoke">
        Your details are used only to answer this enquiry. Never sold, never
        added to marketing lists.
      </p>
    </form>
  );
}
