"use client";

import Link from "next/link";
import { useState } from "react";

export default function UnsubscribeClient({ token }: { token: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function unsubscribe() {
    setBusy(true);
    try {
      const response = await fetch("/api/therapist-notifications/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to unsubscribe.");
      setMessage("You’re unsubscribed from therapist availability updates.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to unsubscribe.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="app-page flex min-h-[70vh] flex-1 items-center justify-center px-5 py-16"><section className="w-full max-w-lg border border-app-border bg-app-surface p-7"><h1 className="text-3xl font-semibold">WhatsApp updates</h1>{message ? <p role="status" className="mt-4 leading-7">{message}</p> : <><p className="mt-3 leading-7 text-app-ink-muted">Unsubscribe from messages about newly available therapists.</p><button type="button" disabled={busy || !token} onClick={unsubscribe} className="app-button app-button-primary mt-6 disabled:opacity-60">{busy ? "Processing…" : "Unsubscribe"}</button></>}{message && <Link href="/" className="app-link mt-6 inline-block">Return to Appi</Link>}</section></main>;
}
