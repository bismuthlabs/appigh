import Image from "next/image";
import Link from "next/link";
import type { Therapist } from "@/app/therapists-list/therapists";
import { formatGhs } from "@/app/money";
import NotificationSignup from "@/components/NotificationSignup";

export type LandingPageConfig = {
  title: string;
  description: string;
  canonical: string;
  heading: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  serviceLocation?: "home";
  therapists: Therapist[];
  benefits: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
  servicesIntro: string;
};

export default function LandingPage({ config }: { config: LandingPageConfig }) {
  const services = [...new Set(config.therapists.flatMap((t) => t.massageOfferings ?? []).map((o) => o.massageType))];
  const serviceImages: Record<string, string> = {
    Swedish: "https://images.unsplash.com/photo-1544161515-733932c60011?auto=format&fit=crop&w=900&q=80",
    Nuru: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    Erotic: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    Sensual: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    "Combo (Nuru + Swed)": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
  };
  const serviceCopy: Record<string, string> = {
    Swedish: "A flowing massage using long, gentle strokes for a relaxing session.",
    Nuru: "A smooth, full-body massage experience. Confirm preferences and boundaries with the therapist before your session.",
    Erotic: "A sensual massage experience. Discuss boundaries with the therapist before booking; all touch must be consensual.",
    Sensual: "A slow, relaxation-focused experience tailored to agreed preferences and boundaries.",
    "Combo (Nuru + Swed)": "A session combining flowing Swedish strokes with Nuru massage movements.",
  };

  return (
    <main className="app-page min-h-screen flex-1">
      <LandingHero config={config} />
      <TherapistListing therapists={config.therapists} serviceLocation={config.serviceLocation} />
      <section id="services" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">Massage services</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose an experience that suits you</h2>
        <p className="mt-3 max-w-2xl leading-7 text-app-ink-muted">{config.servicesIntro}</p>
        {services.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const provider = config.therapists.find((t) => t.massageOfferings?.some((o) => o.massageType === service));
            const offering = provider?.massageOfferings?.find((o) => o.massageType === service);
            const href = provider ? `/therapists-list/${provider.slug}/book?service=${encodeURIComponent(service)}${config.serviceLocation ? `&location=${config.serviceLocation}` : ""}` : "#therapists";
            return <article key={service} className="overflow-hidden border border-app-border bg-app-surface">
              <div className="relative h-48"><Image src={serviceImages[service] ?? config.heroImage} alt={`${service} massage`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div>
              <div className="p-5"><h3 className="text-xl font-semibold">{service}</h3><p className="mt-2 text-sm leading-6 text-app-ink-muted">{serviceCopy[service] ?? `Ask the therapist about this ${service} session before booking.`}</p>{offering && <p className="mt-3 text-sm">From {formatGhs(offering.price)} · {offering.durationMinutes} mins</p>}<Link href={href} className="app-link mt-4 inline-flex font-semibold">Explore this service →</Link></div>
            </article>;
          })}
        </div> : <p className="mt-6 text-app-ink-muted">Massage options are listed on each therapist profile. Contact a therapist to confirm services.</p>}
      </section>
      <section className="bg-app-surface-muted"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">Why Appi</p><h2 className="mt-3 text-3xl font-semibold">A straightforward way to find a therapist</h2></div><ul className="space-y-4">{config.benefits.map((benefit) => <li key={benefit} className="border-b border-app-border pb-4 leading-7">{benefit}</li>)}</ul></div></section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">How it works</p><h2 className="mt-3 text-3xl font-semibold">Book in three steps</h2><ol className="mt-8 grid gap-5 md:grid-cols-3">{config.steps.map((step, index) => <li key={step} className="border-t-2 border-app-primary pt-4"><span className="text-sm font-semibold text-app-primary">0{index + 1}</span><p className="mt-2 leading-7">{step}</p></li>)}</ol></section>
      {config.therapists.length > 0 && <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8"><NotificationSignup /></section>}
      <FAQSection faqs={config.faqs} />
      <section className="bg-app-primary text-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between"><div><h2 className="text-3xl font-semibold">Ready to find your massage therapist?</h2><p className="mt-2 text-white/80">Browse profiles, compare services and begin your booking.</p></div><Link href="#therapists" className="inline-flex w-fit items-center border border-white px-5 py-3 font-semibold hover:bg-white hover:text-app-primary">Explore therapists</Link></div></section>
    </main>
  );
}

export function LandingHero({ config }: { config: LandingPageConfig }) {
  return <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-20"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">Massage in Kumasi · Appi</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{config.heading}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-app-ink-muted">{config.intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#therapists" className="app-button app-button-primary">{config.serviceLocation ? "Find a Therapist" : "Explore Therapists"}</Link><Link href="#services" className="app-button app-button-secondary">Explore massage services</Link></div></div><div className="relative min-h-72 overflow-hidden sm:min-h-96"><Image src={config.heroImage} alt={config.heroAlt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div></section>;
}

export function TherapistListing({ therapists, serviceLocation }: { therapists: Therapist[]; serviceLocation?: "home" }) {
  return <section id="therapists" className="bg-app-surface-muted"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">Therapists</p><h2 className="mt-3 text-3xl font-semibold">{serviceLocation ? "Therapists offering home visits" : "Explore therapists in Kumasi"}</h2>{therapists.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2">{therapists.map((therapist) => { const service = therapist.massageOfferings?.[0]?.massageType; const query = new URLSearchParams(); if (service) query.set("service", service); if (serviceLocation) query.set("location", serviceLocation); return <article key={therapist.slug} className="flex flex-col border border-app-border bg-app-surface sm:flex-row"><div className="relative min-h-64 sm:w-2/5"><Image src={therapist.image} alt={`${therapist.firstName}, massage therapist in Kumasi`} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover" /></div><div className="flex flex-1 flex-col p-5"><h3 className="text-2xl font-semibold">{therapist.firstName}</h3><p className="mt-1 text-sm text-app-ink-muted">{therapist.location} · {therapist.experience}</p><p className="mt-4 leading-7">{therapist.about}</p>{therapist.massageOfferings?.length ? <p className="mt-3 text-sm text-app-ink-muted">{therapist.massageOfferings.map((o) => o.massageType).join(" · ")}</p> : null}<p className="mt-2 font-medium">{therapist.price}</p><Link href={`/therapists-list/${therapist.slug}/book${query.size ? `?${query.toString()}` : ""}`} className="app-button app-button-primary mt-5 w-fit">Book {therapist.firstName}</Link></div></article>;})}</div> : <div className="mt-7 border border-app-border bg-app-surface p-6"><p>There are no listed therapists for this service area right now.</p><p className="mt-2 text-sm text-app-ink-muted">Leave your WhatsApp number and we can let you know when the network grows.</p><div className="mt-5"><NotificationSignup /></div></div>}</div></section>;
}

export function FAQSection({ faqs }: { faqs: LandingPageConfig["faqs"] }) {
  return <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">FAQs</p><h2 className="mt-3 text-3xl font-semibold">Common questions</h2><div className="mt-6 divide-y divide-app-border border-y border-app-border">{faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 leading-7 text-app-ink-muted">{faq.answer}</p></details>)}</div></section>;
}
