import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import ReduxProviderWrapper from "@/components/ReduxProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "OrderFlow - Product Order Management System",
  description: "A full-stack web application to place, track, and manage product orders with a customer-facing frontend and admin dashboard.",
  keywords: ["Order Management", "Admin Dashboard", "E-commerce", "Product Orders", "Next.js", "React", "Node.js", "MongoDB"],
  viewport: "width=device-width, initial-scale=1",
    icons: {
    icon: "iconorderflow.png",    
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
      </body>
    </html>
  );
}
