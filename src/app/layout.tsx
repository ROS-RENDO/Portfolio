import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Ros Rendo | Full-Stack Software Engineer",
  description: "Full-Stack Engineer specializing in scalable backend systems, AI/CV pipelines, quantitative trading automation, and modern web applications. Available for collaboration.",
  keywords: [
    "Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Python",
    "AI Engineer", "Computer Vision", "MetaTrader 5", "Portfolio", "Ros Rendo",
    "Backend Architecture", "Go", "Kubernetes", "WebGL", "Three.js"
  ],
  authors: [{ name: "Ros Rendo" }],
  creator: "Ros Rendo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rosrendo.dev",
    siteName: "Ros Rendo — Portfolio",
    title: "Ros Rendo | Full-Stack Software Engineer",
    description: "Full-Stack Engineer specializing in scalable backend systems, AI/CV pipelines, quantitative trading automation, and premium web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ros Rendo | Full-Stack Software Engineer",
    description: "Full-Stack Engineer specializing in scalable backend systems, AI pipelines, and premium web experiences.",
    creator: "@rosrendo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ros Rendo",
  jobTitle: "Full-Stack Software Engineer",
  url: "https://rosrendo.dev",
  sameAs: [
    "https://github.com/rosrendo",
    "https://linkedin.com/in/rosrendo"
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Node.js", "Express",
    "Python", "YOLOv8", "Computer Vision", "MetaTrader 5",
    "Go", "Kubernetes", "Redis", "PostgreSQL", "Docker",
    "Three.js", "WebGL", "React Three Fiber"
  ],
  description: "Full-Stack Engineer specializing in scalable backend systems, AI/CV pipelines, quantitative trading automation, and modern web applications."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

