import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteFooter from "./SiteFooter";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appi",
  description: "Get the massage you need!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-KDHG5LH4" />
        <script>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GTM-KDHG5LH4');
gtag('config', 'AW-18564324117');`}
        </script> */}
      </head>
      <body className="flex min-h-full flex-col">
        <div className="flex flex-1 flex-col pb-[calc(6rem+env(safe-area-inset-bottom))]">
          {children}
          <SiteFooter />
        </div>
        <BottomNav />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
