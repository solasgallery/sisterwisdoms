import { SITE, isPreview } from "./config";

const API = "https://api.brevo.com/v3";

async function brevoCode(res: Response): Promise<string> {
  try {
    return String((await res.json())?.code ?? "");
  } catch {
    return "";
  }
}

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendMail(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.error("[SW-BREVO] BREVO_API_KEY missing — mail NOT sent");
    return false;
  }
  const res = await fetch(`${API}/smtp/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": key },
    body: JSON.stringify({
      sender: { name: SITE.senderName, email: SITE.senderEmail },
      to: opts.to.map((email) => ({ email })),
      replyTo: opts.replyTo ? { email: opts.replyTo } : undefined,
      subject: (isPreview() ? "[PREVIEW TEST] " : "") + opts.subject,
      htmlContent: opts.html,
    }),
  });
  // Log status + Brevo error code only: the body can echo addresses.
  if (!res.ok) console.error(`[SW-BREVO] mail error ${res.status} ${await brevoCode(res)} — mail NOT sent`);
  return res.ok;
}

/** Adds/updates a marketing contact. Skipped on preview. Returns true if it succeeded or was intentionally skipped. */
export async function addContact(email: string, attributes: Record<string, string>): Promise<boolean> {
  if (isPreview()) return true;
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.error("[SW-BREVO] BREVO_API_KEY missing — contact NOT saved");
    return false;
  }
  const res = await fetch(`${API}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": key },
    body: JSON.stringify({
      email,
      attributes,
      listIds: [parseInt(process.env.BREVO_LIST_ID || "45")],
      updateEnabled: true,
    }),
  });
  if (!res.ok && res.status !== 204) console.error(`[SW-BREVO] contact error ${res.status} ${await brevoCode(res)} — contact NOT saved`);
  return res.ok || res.status === 204;
}
