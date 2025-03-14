import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './component/navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
            style={{
              background: "linear-gradient(to bottom,rgb(227, 199, 239),rgb(251, 231, 249))", 
              color: "#171717"
            }}>
        <Navbar />
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  );
}
