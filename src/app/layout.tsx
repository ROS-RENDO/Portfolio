import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Ros Rendo | Full-Stack Developer",
  description: "I'm a passionate Full-Stack Developer focused on building real-world applications, scalable backend systems, and modern user interfaces.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "Portfolio", "Ros Rendo", "Web Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#09090b] text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-100">
        <LenisProvider>
          <CursorGlow />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
