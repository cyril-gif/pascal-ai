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

function AppleSplashScreens() {
  return (
    <>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Pascal AI" />
      <link rel="apple-touch-icon" href="/icon-192.png" />
      {/* iPhone splash - most common modern sizes */}
      <link
        rel="apple-touch-startup-image"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
        href="/icon-512.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)"
        href="/icon-512.png"
      />
    </>
  );
}

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
      <head>
        <AppleSplashScreens />
      </head>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <PWARegister />
        <PWAInstall />
        {children}
      </body>
    </html>
  );
}