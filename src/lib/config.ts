// Single source for every dated / priced element on sisterwisdoms.com.
// Nothing date-based is hard-coded elsewhere.

export const SITE = {
  url: "https://sisterwisdoms.com",
  name: "Sister Wisdoms",
  priceUsd: 18, // $18/mo as shown on the live site. Do not change here without Tim (STATUS/OM say $12 - see DECISIONS).
  priceLabel: "$18 a month",
  timezone: "America/Chicago",
  // First paid Letter 1 mails in this month (STATUS.md: "mailed by the 25th").
  firstLetterMonth: "2027-01", // YYYY-MM
  firstLetterMailBy: "2027-01-25",
  startMonthsOffered: 12,
  notifyEmails: (process.env.SW_NOTIFY_EMAIL || "cherie@solasgallery.com,tim@solasgallery.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  senderEmail: "info@solasgallery.com",
  senderName: "Sister Wisdoms",
  replyEmail: "cherie@solasgallery.com",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Current year-month in America/Chicago as [year, monthIndex0]. */
function nowChicago(now = new Date()): [number, number, string] {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE.timezone, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now); // YYYY-MM-DD
  const [y, m] = parts.split("-").map(Number);
  return [y, m - 1, parts];
}

export type StartOption = { value: string; label: string };

/** Start months a giver can pick. Past months drop off automatically (computed per request). */
export function startOptions(now = new Date()): StartOption[] {
  const [fy, fm] = SITE.firstLetterMonth.split("-").map(Number);
  const [cy, cm] = nowChicago(now);
  let y = fy;
  let m = fm - 1;
  // never offer a month before the current one
  if (cy > y || (cy === y && cm > m)) { y = cy; m = cm; }
  const out: StartOption[] = [];
  for (let i = 0; i < SITE.startMonthsOffered; i++) {
    const value = `${y}-${String(m + 1).padStart(2, "0")}`;
    out.push({ value, label: `${MONTHS[m]} ${y}` });
    m++;
    if (m > 11) { m = 0; y++; }
  }
  return out;
}

/** True while the first-letter date is still in the future. */
export function beforeFirstMailing(now = new Date()): boolean {
  return nowChicago(now)[2] <= SITE.firstLetterMailBy;
}

export function firstMailingPhrase(now = new Date()): string {
  const [fy, fm] = SITE.firstLetterMonth.split("-").map(Number);
  return beforeFirstMailing(now)
    ? `Our first letters mail in ${MONTHS[fm - 1]} ${fy}.`
    : "A new letter mails each month.";
}

export const isPreview = () => process.env.VERCEL_ENV === "preview";
