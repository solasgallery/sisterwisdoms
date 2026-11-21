// Client-side waitlist submit. Returns true ONLY when the server confirms the
// signup was saved; anything else means the page must show the email fallback.
export const WAITLIST_FALLBACK_EMAIL = "cherie@solasgallery.com";
export const WAITLIST_FALLBACK_MAILTO =
  `mailto:${WAITLIST_FALLBACK_EMAIL}?subject=` +
  encodeURIComponent("Please add me to the Sister Wisdoms waitlist");

export async function joinWaitlist(
  payload: Record<string, unknown>,
  fetchImpl: typeof fetch = fetch
): Promise<boolean> {
  try {
    const res = await fetchImpl("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return data?.ok === true;
  } catch {
    return false;
  }
}
