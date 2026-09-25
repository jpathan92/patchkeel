import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Patchkeel — Drupal 7 migrations and care plans",
  description:
    "Drupal 7 reached end of life in January 2025. Patchkeel migrates legacy Drupal 7 sites to modern Drupal and keeps them patched, backed up and monitored every month.",
  openGraph: {
    title: "Patchkeel — Drupal 7 migrations and care plans",
    description: "Fixed-price Drupal 7 migrations and monthly care plans. Get a free risk check.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#13212C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
