import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import PWAInstall from "@/components/PWAInstall";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pascal-ai.vercel.app"),

  title: "Pascal AI",
  description:
    "Your AI assistant for coding, research, and everyday tasks — built for Ghana.",

  manifest: "/manifest.json",

  applicationName: "Pascal AI",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pascal AI",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Pascal AI",
    description:
      "Your AI assistant for coding, research, and everyday tasks.",
    url: "https://pascal-ai.vercel.app",
    siteName: "Pascal AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pascal AI",
    description:
      "Your AI assistant for coding, research, and everyday tasks.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <PWARegister />
        <PWAInstall />
        {children}
      </body>
    </html>
  );
}