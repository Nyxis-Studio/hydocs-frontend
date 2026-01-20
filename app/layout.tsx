import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import { SidebarProvider } from "@/components/docs/sidebar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/docs/sidebar";
import { MobileNav } from "@/components/docs/nav-mobile";
import { getDocsTree } from "@/lib/docs";
import { GAConsent } from "@/components/analytics/ga-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hytale Docs",
  description: "Documentation for Hytale Server",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree = getDocsTree();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? "";
  const analyticsEnabled = process.env.NODE_ENV === "production";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden flex flex-col`}
      >
        <GAConsent measurementId={measurementId} enabled={analyticsEnabled} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex h-full w-full">
              <Sidebar tree={tree} />
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <MobileNav tree={tree} />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
