import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sisterwisdoms.com"),
  title: {
    default: "Sister Wisdoms — Letters Worth Keeping",
    template: "%s | Sister Wisdoms",
  },
  description:
    "A snail mail subscription club delivering hand-curated letters of wisdom, story, and connection to your mailbox each month.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sisterwisdoms.com",
    siteName: "Sister Wisdoms",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Sister Wisdoms — Letters Worth Keeping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sister Wisdoms — Letters Worth Keeping",
    description:
      "A snail mail subscription club delivering hand-curated letters of wisdom, story, and connection.",
    images: ["/og-default.jpg"],
  },
  verification: {
    google: "YSl8UjrL_9v6Jdo-C0G5RD-g7Umk4I6jn8lvIn95Hec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/*
          Google Tag Manager
          Container: GTM-5TBFTKZT
          IMPORTANT: this snippet only loads the container.
          GA4, Meta Pixel, and Brevo are configured INSIDE GTM as tags.
          If tracking isn't firing, the container is likely unpublished —
          open tagmanager.google.com > the container > Submit > Publish.
        */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5TBFTKZT');`}
        </Script>

        {/*
          Brevo page-view tracker (belt & suspenders alongside the GTM tag).
          Required for email marketing campaign attribution.
          Replace BREVO_CLIENT_KEY with the key from
          app.brevo.com > Automation > Settings > Tracking Code.
        */}
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

        {/*
          JSON-LD structured data for Sister Wisdoms
          Type: Organization + Service (subscription mail club)
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "Service"],
              "@id": "https://sisterwisdoms.com/#business",
              name: "Sister Wisdoms",
              description:
                "A snail mail subscription club delivering hand-curated letters of wisdom, story, and connection to your mailbox each month.",
              url: "https://sisterwisdoms.com",
              serviceType: "Subscription mail club",
              image: "https://sisterwisdoms.com/og-default.jpg",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5TBFTKZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
