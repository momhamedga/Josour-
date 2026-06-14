import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/common/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👑 معمارية الميتا داتا السيادية الفاخرة لـ جسور الدولية 2026
export const metadata: Metadata = {
  title: {
    template: "%s | جسور الدولية للاستشارات",
    default: "جسور الدولية للاستشارات الإدارية وتأسيس الشركات دبي",
  },
  description: "بوابتك الرائدة لتأسيس الأعمال، وإصدار الرخص التجارية، وإقامات المستثمرين في دولة الإمارات بكفاءة وسرعة مطلقة.",
  icons: {
    icon: "/images/favicon.webp", // 🚀 الربط الصارم والمباشر بملفك النظيف
    shortcut: "/images/favicon.webp",
    apple: "/images/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-brand-light-bg text-brand-navy-dark">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}