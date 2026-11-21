import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Preloader } from "@/components/animations/Preloader";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bhavyawade.dev"),
  title: "Bhavya Wade — Software Engineer / Full-Stack Developer",
  applicationName: "Bhavya Wade",
  creator: "Bhavya Wade",
  keywords: [
    "Bhavya Wade",
    "frontend developer",
    "full-stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI engineering",
    "AI and data science",
    "MERN stack",
    "WCAG accessibility",
    "Zustand",
    "portfolio",
  ],
  description:
    "Bhavya Wade — software engineer and full-stack developer in Mumbai building practical web products with React, Next.js and TypeScript. Frontend developer at Scogo Networks, hackathon winner and AI & data science graduate.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bhavya Wade — Software Engineer / Full-Stack Developer",
    description:
      "Software engineer building practical web products with React, Next.js and TypeScript — plus AI, data science and the story behind the builds.",
    type: "website",
    url: "/",
    siteName: "Bhavya Wade",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Wade — Software Engineer / Full-Stack Developer",
    description: "Software engineer building practical web products with React, Next.js, TypeScript and AI.",
    creator: "@wade_bhavy55123",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone">
        <SmoothScroll />
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <div className="grain-overlay" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
