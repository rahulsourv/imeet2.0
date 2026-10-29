import type { Metadata } from "next";
import { Oswald, Rubik, Space_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ variable: "--font-app-sans", subsets: ["latin"] });
const rubik = Rubik({ variable: "--font-app-heading", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-app-mono", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IMEET 2026",
  description: "IMEET 2026, the departmental fest of the Department of IT, RCCIIT, Kolkata. 19–20 November 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${rubik.variable} ${spaceMono.variable}`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
