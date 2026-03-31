import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/common/NavbarWrapper";
import Footer from "@/components/common/Footer";
import { getNavbar } from "@/lib/queries/navbarData";
import { getFooter } from "@/lib/queries/footerData";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import PageLoader from "@/components/common/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ainorax",
  description: "Ainorax created @2026",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [navbarData, footerData] = await Promise.all([
    getNavbar(),
    getFooter()
  ])
  const theme = await getTheme();
  const bg = theme.background.homebg || "";
  const solidBg = bg.match(/#[a-fA-F0-9]{3,6}/)?.[0] || bg;

  return (
    <html lang="en" style={{ background: solidBg }}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Loader sits on top of everything, unmounts after window.load fires */}
        <PageLoader />
 
        <NavbarWrapper navbarData={navbarData} />
 
        <main className="flex-grow">
          {children}
        </main>
 
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
