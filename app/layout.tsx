import type { Metadata } from "next";
import { Fraunces, Onest } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantPal",
  description:
    "PlantPal is a plant care app that helps you keep track of your plants and their watering schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${onest.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
