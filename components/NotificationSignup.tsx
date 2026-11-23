"use client";

import { useId, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

export default function NotificationSignup({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [unsubscribeUrl, setUnsubscribeUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const inputId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setIsError(false);
    try {
      const response = await fetch("/api/therapist-notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, consent }),
      });
      const result: {
        error?: string;
        alreadySubscribed?: boolean;
        unsubscribeUrl?: string;
      } = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "We couldn’t save your number. Please try again.",
        );
      setPhoneNumber("");
      setConsent(false);
      setUnsubscribeUrl(result.unsubscribeUrl ?? "");
      setMessage(
        result.alreadySubscribed
          ? "This number is already on the list."
          : "Thanks! We’ll let you know when new therapists become available.",
      );
      if (!result.alreadySubscribed)
        trackEvent("notification_signup", { marketing_consent: true });
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t save your number. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      // className={`bg-app-surface`}
    >
      {/* <h2 className={`${compact ? "text-lg" : "text-2xl"} font-semibold`}>
        {compact
          ? "Be the first to know when new therapists join."
          : "Looking for More Options?"}
      </h2>
      {!compact && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-app-ink-muted">
          We&apos;re continuously growing our therapist network. New therapists
          are added regularly. Leave your WhatsApp number and we&apos;ll notify
          you when new therapists become available.
        </p>
      )} */}
      <form onSubmit={submit} className="mt-0 space-y-3">
        <label htmlFor={`${inputId}-whatsapp`} className="sr-only">
          Your WhatsApp number
        </label>
        <input
          id={`${inputId}-whatsapp`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={30}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Your WhatsApp number"
          className="app-control w-full"
        />
        <label className="flex items-start gap-3 text-xs leading-5 text-app-ink-muted">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 accent-app-primary"
          />
          <span>
            I agree that Appi may contact me on WhatsApp about newly available
            massage therapists.
          </span>
        </label>
        <button
          type="submit"
          disabled={busy}
          className="app-button app-button-primary w-full disabled:opacity-60"
        >
          {busy ? "Saving…" : "Notify Me"}
        </button>
      </form>
      {message && (
        <p
          role={isError ? "alert" : "status"}
          className="mt-3 text-sm text-app-ink-muted"
        >
          {message}
          {unsubscribeUrl && (
            <>
              {" "}
              <a className="app-link underline" href={unsubscribeUrl}>
                Unsubscribe
              </a>
            </>
          )}
        </p>
      )}
    </section>
  );
}
