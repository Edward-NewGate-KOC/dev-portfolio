import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Background } from "@/components/visuals/Background";
import { Dock } from "@/components/visuals/Dock";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

import { LoaderProvider } from "@/context/LoaderContext";


import { BackToTop } from "@/components/visuals/BackToTop";
import { Footer } from "@/components/features/Footer";

import { SystemHeader } from "@/components/visuals/SystemHeader";
import { LogPose } from "@/components/visuals/LogPose";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoaderProvider>
            <LogPose />
            <SystemHeader />
            <Background />
            <Dock />
            {children}
            <Footer />
            <BackToTop />
          </LoaderProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
