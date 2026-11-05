import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shanghaiexport.vercel.app"
  ),
  title: "ShanghaiExport | Buy Cars in China. Ship Worldwide.",
  description:
    "ShanghaiExport is your trusted partner for exporting electric vehicles, passenger cars, and commercial vehicles from China to destinations worldwide.",
  icons: {
    icon: [
      { url: "/icon.jpg" },
    ],
    apple: [
      { url: "/apple-touch-icon.jpg" },
    ],
  },
  openGraph: {
    title: "ShanghaiExport | Buy Cars in China. Ship Worldwide.",
    description:
      "Buy cars in China. Ship worldwide. Trusted global automotive export platform.",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
