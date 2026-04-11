import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sister Wisdoms — Letters Worth Keeping",
  description:
    "A snail mail subscription club delivering hand-curated letters of wisdom, story, and connection to your mailbox each month.",
  openGraph: {
    title: "Sister Wisdoms — Letters Worth Keeping",
    description:
      "A snail mail subscription club delivering hand-curated letters of wisdom, story, and connection.",
    url: "https://sisterwisdoms.com",
    siteName: "Sister Wisdoms",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
