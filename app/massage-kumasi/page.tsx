import type { Metadata } from "next";
import LandingPage from "@/components/landing-pages/LandingPage";
import { massageKumasiConfig } from "@/lib/landing-pages";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: massageKumasiConfig.title,
  description: massageKumasiConfig.description,
  alternates: { canonical: `${siteUrl}${massageKumasiConfig.canonical}` },
  openGraph: { title: massageKumasiConfig.title, description: massageKumasiConfig.description, url: `${siteUrl}${massageKumasiConfig.canonical}`, images: [massageKumasiConfig.heroImage], type: "website" },
};

export default function MassageKumasiPage() {
  return <LandingPage config={massageKumasiConfig} />;
}
