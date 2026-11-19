import "server-only";

type BookingAlert = {
  therapistName: string;
  clientName: string;
  phoneNumber: string;
  treatment: string;
  durationMinutes: number;
  serviceLocation: string;
  address: string;
  date: string;
  time: string;
  timeZone: string;
  total: number;
};

function getSmsRecipients() {
  return (process.env.ARKESEL_SMS_RECIPIENTS ?? "")
    .split(/[\n,]/)
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

export async function sendBookingAlert(booking: BookingAlert) {
  const sms_recipients = getSmsRecipients();
  if (sms_recipients.length === 0) return;

  const apiKey = process.env.ARKESEL_API_KEY;
  if (!apiKey) throw new Error("Missing ARKESEL_API_KEY env var");

  const message = [
    `New Appi booking confirmed: ${booking.clientName} (${booking.phoneNumber})`,
    `${booking.treatment} · ${booking.durationMinutes} mins with ${booking.therapistName}`,
    `${booking.date} at ${booking.time} (${booking.timeZone})`,
    `${booking.serviceLocation}: ${booking.address}`,
    `Total: GHS ${booking.total.toFixed(2)}`,
  ].join(". ");

  const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: process.env.ARKESEL_SMS_SENDER || "Appi",
      message,
      recipients: sms_recipients,
    }),
    cache: "no-store",
  });

  let payload: { message?: string; error?: string } | null = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        payload?.error ||
        `Arkesel request failed with status ${response.status}`,
    );
  }
}
