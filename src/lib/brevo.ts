import { isPreview } from "./config";

const API = "https://api.brevo.com/v3";

async function brevoCode(res: Response): Promise<string> {
  try {
    return String((await res.json())?.code ?? "");
  } catch {
    return "";
  }
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
  // Log status + Brevo error code only: the body can echo addresses.
  if (!res.ok && res.status !== 204) console.error(`[SW-BREVO] contact error ${res.status} ${await brevoCode(res)} — contact NOT saved`);
  return res.ok || res.status === 204;
}
