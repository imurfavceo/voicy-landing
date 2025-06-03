import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Voicy - Turn Voice Notes into Perfect Messages",
  description: "Transform any voice note into a perfectly-formatted message in seconds. Record, transcribe, and share with ease.",
  keywords: ["voice notes", "transcription", "messaging", "voice to text", "audio transcription"],
  authors: [{ name: "Voicy Team" }],
  creator: "Voicy",
  publisher: "Voicy",
  openGraph: {
    title: "Voicy - Turn Voice Notes into Perfect Messages",
    description: "Transform any voice note into a perfectly-formatted message in seconds. Record, transcribe, and share with ease.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voicy - Turn Voice Notes into Perfect Messages",
    description: "Transform any voice note into a perfectly-formatted message in seconds. Record, transcribe, and share with ease.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
