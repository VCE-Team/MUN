import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/header";
import { Sidebar } from "@/app/components/sidebar";
import { Footer } from "@/app/components/footer";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";
import { ScrollReset } from "./components/scroll-reset";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VCE Model United Nations",
  description: "Welcome to VCE Model United Nations - Advocate Aspire Achieve",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <ScrollReset />
        <div id="main-content" className="flex flex-col min-h-screen">
          <Header />
          <Sidebar />
          <main className="flex-1 mt-16">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
