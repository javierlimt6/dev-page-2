import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Javier Lim Jun Yi",
  description: "The Portfolio Website of Javier Lim Jun Yi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  );
}
