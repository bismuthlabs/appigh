import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  }

  const phoneNumber =
    payload && typeof payload === "object" && "phoneNumber" in payload &&
    typeof payload.phoneNumber === "string"
      ? payload.phoneNumber.trim()
      : "";
  const digits = phoneNumber.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]{7,30}$/.test(phoneNumber) || digits.length < 7 || digits.length > 15) {
    return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("therapist_notification_signups")
      .upsert({ phone_number: phoneNumber }, { onConflict: "phone_number", ignoreDuplicates: true });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not save therapist notification signup:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "We couldn’t save your number. Please try again." }, { status: 503 });
  }
}
