import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppFooter } from "@/components/AppFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSync } from "@/components/theme-sync";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.legantis.app"),
  title: "Legantis | AI Legal Assistant for Balkan Lawyers",
  description:
    "Legantis is an AI legal assistant for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia. Contract drafting, case prediction, document analysis, time tracking, and client portal.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg" }],
  },
  openGraph: {
    title: "Legantis | AI Legal Assistant for Balkan Lawyers",
    description:
      "AI-powered legal assistant for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro and Slovenia.",
    url: "https://legantis.app",
    siteName: "Legantis",
    images: [
      {
        url: "https://legantis.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Legantis - AI Legal Assistant",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legantis | AI Legal Assistant for Balkan Lawyers",
    description:
      "AI-powered legal assistant for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro and Slovenia.",
    images: ["https://legantis.app/og-image.png"],
  },
  keywords: [
    "AI pravni asistent",
    "advokat BiH",
    "advokat Srbija",
    "AI za advokate",
    "generisanje ugovora",
    "legal AI Balkans",
    "Legantis",
    "pravni softver",
    "ugovor AI",
    "NDA generator",
  ],
  authors: [{ name: "Legantis" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://legantis.app",
    languages: {
      sr: "https://legantis.app",
      bs: "https://legantis.app",
      hr: "https://legantis.app",
    },
  },
  verification: {
    google: "Y6f4WQUTKKD1_F5MxRzuz8UWs-W3AUpFjh84L3vTLSk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          storageKey="legantis-theme"
          disableTransitionOnChange
        >
          <ThemeSync />
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <AppFooter />
            </div>
            <Toaster richColors position="top-center" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
