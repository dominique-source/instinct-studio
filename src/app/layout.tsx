import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Instinct Studio | Cinematic Sports Storytelling",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "sports films",
    "athlete storytelling",
    "branded short films",
    "immersive sports experiences",
    "sports production studio",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Instinct Studio | Cinematic Sports Storytelling",
    description: site.description,
    url: site.url,
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instinct Studio | Cinematic Sports Storytelling",
    description: site.description,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  slogan: site.signature,
  url: site.url,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "Québec",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
