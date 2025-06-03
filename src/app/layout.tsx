import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
