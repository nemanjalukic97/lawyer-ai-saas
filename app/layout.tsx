import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppFooter } from "@/components/AppFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSync } from "@/components/theme-sync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legantis | AI Legal Assistant for Balkan Lawyers",
  description:
    "Legantis is an AI legal assistant for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia. Contract drafting, case prediction, document analysis, time tracking, and client portal.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
