"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export default function TrackedLink({ href, children, className, target, rel, eventName, eventParameters }: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  eventName: string;
  eventParameters?: Record<string, unknown>;
}) {
  return <Link href={href} className={className} target={target} rel={rel} onClick={() => trackEvent(eventName, eventParameters)}>{children}</Link>;
}
