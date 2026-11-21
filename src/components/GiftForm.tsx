"use client";

import { useEffect, useRef, useState } from "react";
import type { StartOption } from "@/lib/config";

const field =
  "w-full px-4 py-3 rounded-md bg-soft-white border border-warm-brown/40 text-charcoal placeholder:text-warm-brown/60 text-base focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/20";
const label = "block font-type text-sm text-deep-plum mb-1";

export default function GiftForm({ options, price }: { options: StartOption[]; price: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [uncertain, setUncertain] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  // The form is replaced by the confirmation panel, which can land above the viewport. Bring it into view and focus it.
  useEffect(() => {
    if (state === "done" && doneRef.current) {
      doneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      doneRef.current.focus({ preventScroll: true });
    }
  }, [state]);
  const [done, setDone] = useState<{ giver: string; recipient: string; start: string; preview: boolean; copySent: boolean; listFailed: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = {
      giverName: f.get("giverName"), giverEmail: f.get("giverEmail"), giverPhone: f.get("giverPhone"),
      recipientName: f.get("recipientName"), addr1: f.get("addr1"), addr2: f.get("addr2"),
      city: f.get("city"), state: f.get("state"), zip: f.get("zip"),
      message: f.get("message"), startMonth: f.get("startMonth"),
      keepPosted: f.get("keepPosted") === "on", website: f.get("website"),
    };
    setState("sending");
    setError("");
    setUncertain(false);
    try {
      const res = await fetch("/api/gift", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || json.ok !== true) throw new Error(typeof json.error === "string" ? json.error : "failed");
      // The request counts as received once the server says ok. A failed giver copy or list add is a caveat, not a failure.
      const copySent = json.giverCopy ? json.giverCopy === "sent" : json.copySent === true;
      const listFailed = json.list ? json.list === "failed" : json.listAdded === false;
      setDone({ giver: String(body.giverEmail), recipient: String(body.recipientName), start: json.startLabel || "", preview: !!json.preview, copySent, listFailed });
      setState("done");
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "gift_request_submitted" });
    } catch (err) {
      // A TypeError here is the browser failing to reach us (offline, dropped connection): never show its raw text.
      // If the connection dropped we cannot know whether the request reached us, so don't say "Nothing was submitted".
      const lostInTransit = err instanceof TypeError;
      const serverMsg = err instanceof Error && !lostInTransit && err.message !== "failed" ? err.message : "";
      setUncertain(lostInTransit);
      setError(lostInTransit ? "We couldn't confirm your request reached us." : serverMsg || "We could not send your request just now.");
      setState("error");
    }
  }

  if (state === "done" && done) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="outline-none bg-soft-white border border-blush/60 rounded-md p-8 text-center">
        <p className="font-type text-2xl text-deep-plum mb-3">Your gift request is in.</p>
        <p className="text-lg text-warm-brown leading-relaxed">
          Thank you. We have your request for {done.recipient}, starting {done.start}.
        </p>
        <p className="text-lg text-warm-brown leading-relaxed mt-3">
          <strong>You have not been charged.</strong> Tim or Cherie will email you at {done.giver} to complete payment and confirm
          the details. {done.copySent
            ? "A copy of your request is on its way to that address."
            : "We could not send you a copy email just now, but your request reached us and we will follow up."}
        </p>
        {done.listFailed && (
          <p className="text-lg text-warm-brown leading-relaxed mt-3">
            We couldn&apos;t add you to the news list just now. Your gift request is not affected. Email us at{" "}
            <a className="underline" href="mailto:cherie@solasgallery.com?subject=Please%20add%20me%20to%20the%20Sister%20Wisdoms%20waitlist">cherie@solasgallery.com</a>{" "}
            and we&apos;ll add you by hand.
          </p>
        )}
        {done.preview && <p className="font-type text-xs text-warm-brown mt-4">Preview site: test request.</p>}
      </div>
    );
  }

  return (
    <form method="post" onSubmit={onSubmit} className="space-y-10">
      <fieldset className="space-y-4">
        <legend className="font-type text-lg text-deep-plum mb-2">1. Your message</legend>
        <div>
          <label htmlFor="message" className={label}>Gift message</label>
          <textarea id="message" name="message" rows={4} maxLength={500} className={field}
            placeholder="Something you would say to her, in your own words." />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-type text-lg text-deep-plum mb-2">2. Start month</legend>
        <div>
          <label htmlFor="startMonth" className={label}>First letter month</label>
          <select id="startMonth" name="startMonth" required className={field} defaultValue={options[0]?.value}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-type text-lg text-deep-plum mb-2">3. Who gets the letters</legend>
        <div>
          <label htmlFor="recipientName" className={label}>Her name</label>
          <input id="recipientName" name="recipientName" required maxLength={100} autoComplete="off" className={field} />
        </div>
        <div>
          <label htmlFor="addr1" className={label}>Mailing address</label>
          <input id="addr1" name="addr1" required maxLength={120} autoComplete="off" className={field} />
        </div>
        <div>
          <label htmlFor="addr2" className={label}>Apartment, suite (optional)</label>
          <input id="addr2" name="addr2" maxLength={120} autoComplete="off" className={field} />
        </div>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="city" className={label}>City</label>
            <input id="city" name="city" required maxLength={80} autoComplete="off" className={field} />
          </div>
          <div className="col-span-3 sm:col-span-1">
            <label htmlFor="state" className={label}>State</label>
            <input id="state" name="state" required maxLength={2} pattern="[A-Za-z]{2}" placeholder="TX" autoComplete="off" className={field + " uppercase"} />
          </div>
          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="zip" className={label}>ZIP</label>
            <input id="zip" name="zip" required inputMode="numeric" pattern="\d{5}(-\d{4})?" maxLength={10} autoComplete="off" className={field} />
          </div>
        </div>
        <p className="text-sm text-warm-brown">United States addresses only for now.</p>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-type text-lg text-deep-plum mb-2">4. Your details</legend>
        <div>
          <label htmlFor="giverName" className={label}>Your name</label>
          <input id="giverName" name="giverName" required maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="giverEmail" className={label}>Your email</label>
          <input id="giverEmail" name="giverEmail" type="email" required maxLength={160} autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="giverPhone" className={label}>Your phone (optional)</label>
          <input id="giverPhone" name="giverPhone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </div>
        <label className="flex items-center gap-3 text-base text-warm-brown min-h-[44px] py-2 cursor-pointer">
          <input type="checkbox" name="keepPosted" className="h-6 w-6 shrink-0" />
          <span>Also send me occasional Sister Wisdoms news by email.</span>
        </label>
        <div className="hidden" aria-hidden="true">
          <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
      </fieldset>

      <div>
        <button type="submit" disabled={state === "sending"}
          className="w-full bg-deep-plum text-soft-white px-8 py-4 rounded-md font-type text-base tracking-wide hover:bg-warm-brown transition-colors disabled:opacity-60">
          {state === "sending" ? "Sending..." : "Send my gift request"}
        </button>
        <p className="text-base text-warm-brown mt-3 leading-relaxed">
          This does not charge you. The subscription is {price}; we will email you to complete payment before anything is billed.
        </p>
        {state === "error" && (
          <p role="alert" className="mt-3 text-deep-plum font-semibold">
            {uncertain ? (
              <>
                {error} Please don&apos;t send it again yet. Email{" "}
                <a className="underline" href="mailto:cherie@solasgallery.com?subject=Sister%20Wisdoms%20gift%20-%20did%20it%20arrive%3F">cherie@solasgallery.com</a>{" "}
                and we&apos;ll check whether it arrived.
              </>
            ) : (
              <>
                {error}{error.includes("Nothing was submitted") ? "" : " Nothing was submitted."} Please try again, or email{" "}
                <a className="underline" href="mailto:cherie@solasgallery.com?subject=Sister%20Wisdoms%20gift">cherie@solasgallery.com</a>.
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
