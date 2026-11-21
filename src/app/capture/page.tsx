"use client"

import { useState, FormEvent } from "react"

export default function CapturePage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    if (formData.get("website")) {
      setLoading(false)
      setSubmitted(true)
      return
    }

    const data = {
      firstName: (formData.get("firstName") as string).trim(),
      lastName: (formData.get("lastName") as string).trim(),
      email: (formData.get("email") as string).trim(),
      phone: (formData.get("phone") as string || "").trim(),
      source: "in-person-qr",
      website: "",
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.ok) throw new Error("Not saved")
      setSaved(j.saved === true)
      setSubmitted(true)
    } catch (err) {
      // A dropped connection means we can't tell whether the signup reached us.
      setError(err instanceof TypeError ? "unconfirmed" : "not-saved")
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FDF8F0",
        padding: "24px",
        fontFamily: "var(--font-body), Georgia, serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e4ddd3",
          borderRadius: "12px",
          padding: "32px 24px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(42,37,32,.05)",
        }}
      >
        {submitted ? (
          <div>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>&#x2713;</div>
            <h2
              style={{
                fontFamily: "var(--font-type), 'Courier New', monospace",
                fontSize: "1.5rem",
                color: "#6B3A5D",
                marginBottom: "8px",
              }}
            >
              {saved ? "Thank you. You are on the list." : "Preview: not saved"}
            </h2>
            <p style={{ color: "#7A5C4F", fontSize: "1rem" }}>
              {saved
                ? "We will write to you now and then about Sister Wisdoms."
                : "This is a preview site. Nothing was added to the list."}
            </p>
          </div>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "var(--font-type), 'Courier New', monospace",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: "#6B3A5D",
                marginBottom: "4px",
              }}
            >
              Sister Wisdoms
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#7A5C4F",
                marginBottom: "24px",
                fontFamily: "var(--font-type), 'Courier New', monospace",
                fontStyle: "italic",
              }}
            >
              A letter, by mail
            </p>
            <form method="post" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" }}>
              <div>
                <label htmlFor="firstName" style={labelStyle}>First Name</label>
                <input id="firstName" name="firstName" type="text" required placeholder="First name" autoComplete="given-name" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                <input id="lastName" name="lastName" type="text" required placeholder="Last name" autoComplete="family-name" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="phone" style={labelStyle}>
                  Phone <span style={{ color: "#7A5C4F" }}>(optional)</span>
                </label>
                <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" autoComplete="tel" style={inputStyle} />
              </div>
              <input type="text" name="website" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} tabIndex={-1} autoComplete="off" />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#6B3A5D",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? "Submitting…" : "Keep me posted"}
              </button>
              {error && (
                <p role="alert" style={{ color: "#9b2c3d", fontSize: "0.875rem", textAlign: "center", lineHeight: 1.4 }}>
                  {error === "unconfirmed" ? "We couldn\u2019t confirm you were added." : "We couldn\u2019t add you to the list just now."} Email us at{" "}
                  <a href="mailto:cherie@solasgallery.com?subject=Please%20add%20me%20to%20the%20Sister%20Wisdoms%20waitlist" style={{ color: "#6B3A5D", fontWeight: 600 }}>cherie@solasgallery.com</a>{" "}
                  and we&apos;ll add you by hand.
                </p>
              )}
              <p style={{ fontSize: "0.8125rem", color: "#6b5a50", marginTop: "8px", textAlign: "center", lineHeight: 1.4 }}>
                We will email you about Sister Wisdoms only. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#7A5C4F",
  display: "block",
  marginBottom: "4px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #e4ddd3",
  borderRadius: "8px",
  background: "#faf7f3",
  color: "#2a2520",
  fontSize: "1rem",
}
