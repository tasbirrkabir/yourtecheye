"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";

/**
 * Password gate for the YTE admin panel. The password lives in
 * ADMIN_PASSWORD (.env). Nothing else: no email, no reset flow, no
 * third-party identity provider.
 */
export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        router.refresh();
      } else {
        setError(data.error || "Login failed. Check the password and try again.");
        setBusy(false);
      }
    } catch {
      setError("Network error. Check the connection and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink">
            <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
            Your Tech Eye: staff access
          </p>
          <h1 className="stretch-xwide mt-4 text-4xl font-black uppercase leading-none tracking-tight text-ink sm:text-5xl">
            Ops desk<span className="text-signal">.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-smoke">
            Write field notes, upload photos, publish. Access is limited to the
            YTE team.
          </p>

          <form onSubmit={onSubmit} className="mt-8 border-2 border-ink bg-paper p-6 hard-shadow" noValidate>
            <label htmlFor="admin-password" className="block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink">
              Admin password
            </label>
            <div className="mt-3 flex items-stretch border-2 border-ink bg-paper focus-within:ring-2 focus-within:ring-ring">
              <span className="flex items-center pl-3 text-smoke" aria-hidden="true">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full bg-transparent px-3 font-mono text-sm text-ink outline-none"
                placeholder="Enter the admin password"
                aria-describedby="admin-password-error"
              />
            </div>
            <div id="admin-password-error" aria-live="polite">
              {error && (
                <p className="mt-3 border-l-2 border-signal bg-secondary/70 px-3 py-2 text-sm font-medium text-ink">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={busy}
              className="mt-5 h-12 w-full border-2 border-ink bg-ink text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-signal hover:bg-signal disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {busy ? "Checking..." : "Enter the ops desk"}
            </button>
          </form>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
            Sessions last seven days. Set the password via the ADMIN_PASSWORD environment variable.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink hover:border-signal hover:text-signal"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to the site
          </Link>
        </div>
      </div>
      <footer className="border-t-2 border-ink bg-ink px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
        YTE internal panel / Dhaka, Bangladesh
      </footer>
    </div>
  );
}
