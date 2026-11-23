import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

function responseError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return responseError("Request origin is not allowed.", 403);
      }
    } catch {
      return responseError("Request origin is not allowed.", 403);
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return responseError("Enter a valid WhatsApp number and provide consent.", 400);
  }

  const rawPhoneNumber = payload && typeof payload === "object" && "phoneNumber" in payload && typeof payload.phoneNumber === "string" ? payload.phoneNumber.trim() : "";
  const phoneNumber = rawPhoneNumber.replace(/[\s().-]/g, "");
  const consent = payload && typeof payload === "object" && "consent" in payload && payload.consent === true;
  const digits = phoneNumber.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]{7,30}$/.test(phoneNumber) || digits.length < 7 || digits.length > 15) {
    return responseError("Enter a valid WhatsApp number.", 400);
  }
  if (!consent) return responseError("Consent is required to receive WhatsApp updates.", 400);

  const now = new Date().toISOString();
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  try {
    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from("therapist_notification_signups")
      .select("id, unsubscribed_at")
      .eq("phone_number", phoneNumber)
      .maybeSingle();
    if (lookupError) throw lookupError;

    if (existing) {
      const { error } = await supabase
        .from("therapist_notification_signups")
        .update({ marketing_consent_at: now, unsubscribe_token_hash: tokenHash, unsubscribed_at: null })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("therapist_notification_signups").insert({
        phone_number: phoneNumber,
        marketing_consent_at: now,
        unsubscribe_token_hash: tokenHash,
        unsubscribed_at: null,
      });
      if (error && error.code === "23505") {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { headers: { "Cache-Control": "no-store" } });
      }
      if (error) throw error;
    }

    const unsubscribeUrl = new URL(`/notifications/unsubscribe?token=${encodeURIComponent(token)}`, request.url).toString();
    return NextResponse.json({ ok: true, alreadySubscribed: Boolean(existing), unsubscribeUrl }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not save therapist notification signup:", error instanceof Error ? error.message : "Unknown error");
    return responseError("We couldn’t save your number. Please try again.", 503);
  }
}
