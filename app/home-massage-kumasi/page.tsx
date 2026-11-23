import type { Metadata } from "next";
import LandingPage from "@/components/landing-pages/LandingPage";
import { homeMassageKumasiConfig } from "@/lib/landing-pages";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: homeMassageKumasiConfig.title,
  description: homeMassageKumasiConfig.description,
  alternates: { canonical: `${siteUrl}${homeMassageKumasiConfig.canonical}` },
  openGraph: { title: homeMassageKumasiConfig.title, description: homeMassageKumasiConfig.description, url: `${siteUrl}${homeMassageKumasiConfig.canonical}`, images: [homeMassageKumasiConfig.heroImage], type: "website" },
};

export default function HomeMassageKumasiPage() {
  return <LandingPage config={homeMassageKumasiConfig} />;
}
