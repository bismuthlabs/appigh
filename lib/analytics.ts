"use client";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", name, parameters);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...parameters });
}
