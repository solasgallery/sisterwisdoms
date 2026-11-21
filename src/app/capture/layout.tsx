import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Join the Sister Wisdoms list" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/capture" },
};

export default function CaptureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
