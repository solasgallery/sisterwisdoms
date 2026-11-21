import type { Metadata } from "next";
import Script from "next/script";
import { Courier_Prime, Cormorant_Garamond } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

const typeFont = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-type", display: "swap" });
const bodyFont = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });

const TITLE = "Sister Wisdoms | A Monthly Letter Subscription Gift";
const DESC =
  "Give a monthly paper letter from a wise old friend, mailed to her door. Write a note, pick a start month, and we'll email you to finish. $18 a month, one tier.";
const OG_ALT = "Sister Wisdoms. A letter, by mail.";
// Trackers load on the production deployment only (not preview or local).
const TRACK = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: "Sister Wisdoms",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og-default.jpg", alt: OG_ALT }],
  },
  verification: { google: "YSl8UjrL_9v6Jdo-C0G5RD-g7Umk4I6jn8lvIn95Hec" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${typeFont.variable} ${bodyFont.variable}`}>
      <head>
        {/*
          Google Tag Manager
          Container: GTM-5TBFTKZT
          IMPORTANT: this snippet only loads the container.
          GA4, Meta Pixel, and Brevo are configured INSIDE GTM as tags.
          If tracking isn't firing, the container is likely unpublished —
          open tagmanager.google.com > the container > Submit > Publish.
        */}
        {TRACK && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5TBFTKZT');`}
        </Script>
        )}

        {/*
          Brevo page-view tracker (belt & suspenders alongside the GTM tag).
          Required for email marketing campaign attribution.
          Replace BREVO_CLIENT_KEY with the key from
          app.brevo.com > Automation > Settings > Tracking Code.
        */}
        {TRACK && (
        <Script id="brevo-tracker" strategy="afterInteractive">
          {`(function() {
            var key = '9u1hsxe9gvu5e6i2ar4j28q2';
            if (key === 'BREVO_CLIENT_KEY') return;
            var js, fjs = document.getElementsByTagName('script')[0];
            js = document.createElement('script');
            js.id = 'sendinblue-js';
            js.src = 'https://sibautomation.com/sa.js?key=' + key;
            fjs.parentNode.insertBefore(js, fjs);
          })();`}
        </Script>
        )}

      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {TRACK && <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5TBFTKZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
