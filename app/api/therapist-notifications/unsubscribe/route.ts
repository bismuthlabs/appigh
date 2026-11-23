import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "This unsubscribe link is invalid." }, { status: 400 });
  }
  const token = payload && typeof payload === "object" && "token" in payload && typeof payload.token === "string" ? payload.token : "";
  if (token.length < 32 || token.length > 128) {
    return NextResponse.json({ error: "This unsubscribe link is invalid." }, { status: 400 });
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const { error } = await getSupabaseAdmin()
      .from("therapist_notification_signups")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("unsubscribe_token_hash", tokenHash)
      .is("unsubscribed_at", null);
    if (error) throw error;
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not unsubscribe WhatsApp signup:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "We couldn’t process that request. Please try again." }, { status: 503 });
  }
}
