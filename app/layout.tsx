import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";
import { ScrollReset } from "./components/scroll-reset";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VCE Model United Nations",
  description: "Welcome to VCE Model United Nations - Advocate Aspire Achieve",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ScrollReset />
        <div id="main-content" className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
