import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Join the Sister Wisdoms list" },
  robots: { index: false, follow: false },
  description: "Leave your name and email and we will keep you posted about Sister Wisdoms.",
  alternates: { canonical: "/capture" },
  openGraph: {
    type: "website",
    url: "/capture",
    title: "Join the Sister Wisdoms list",
    description: "Leave your name and email and we will keep you posted about Sister Wisdoms.",
    images: [{ url: "/og-teaser.jpg", width: 1200, height: 630, alt: "Sister Wisdoms. Something beautiful is on its way." }],
  },
};

export default function CaptureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
