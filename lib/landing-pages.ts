import { therapists } from "@/app/therapists-list/therapists";
import type { LandingPageConfig } from "@/components/landing-pages/LandingPage";

const kumasiTherapists = therapists.filter((therapist) =>
  therapist.location.toLowerCase().includes("kumasi"),
);
const homeTherapists = kumasiTherapists.filter((therapist) =>
  therapist.serviceLocations?.includes("home"),
);

export const sharedFaqs = [
  // {
  //   question: "How do I book a massage?",
  //   answer:
  //     "Choose a therapist and service, enter your preferred appointment date and time, add your location and contact details, then submit the booking. The confirmation page shows the booking summary.",
  // },
  // {
  //   question: "How much does a massage cost?",
  //   answer:
  //     "Prices depend on the therapist and service. The therapist listing and booking form show the price before you confirm.",
  // },
  // {
  //   question: "Can I change or cancel a booking?",
  //   answer:
  //     "Use the booking management link provided for your appointment or contact the therapist to discuss a change. Any change is subject to confirmation.",
  // },
  // {
  //   question: "Can I book a home or hotel massage?",
  //   answer:
  //     "The booking form shows the locations each therapist offers. Choose only a location listed for that therapist.",
  // },
  {
    question: "Does a massage therapist offer sexual services?",
    answer:
      "Massage therapy is not automatically a sexual service. Some therapists offer sensual or adult-oriented massage experiences, while others provide strictly professional therapeutic massages. Check the therapist's service description for details. Any additional intimate services must never be assumed and require clear, voluntary consent.",
  },
  {
    question: "What is the difference between sensual and erotic massage?",
    answer:
      "Sensual massage focuses on relaxation, body-to-body, soothing movements and heightened sensory awareness - it is mostly done n*ked. Erotic massage is more explicitly focused on sexual arousal or adult sensual experiences - it is done with a bikini. The exact meaning depends on the therapist's service description and boundaries.",
  },
  {
    question: "What is a Swedish massage?",
    answer:
      "Swedish massage is a traditional relaxation massage that uses long, flowing strokes, gentle kneading, circular movements and varying pressure to ease muscle tension, improve relaxation and promote general well-being. It is a non-sexual therapeutic massage.",
  },
  {
    question: "What is a Nuru massage?",
    answer:
      "Nuru massage is a Japanese-style body-to-body massage traditionally associated with a special slippery, water-based gel. It involves close body-to-body contact and flowing movements. It is generally considered an adult-oriented sensual massage rather than a conventional therapeutic massage. Services and boundaries vary between providers.",
  },
  // {
  //   question: "What is the difference between Swedish and Nuru massage?",
  //   answer:
  //     "Swedish massage uses hands and traditional massage techniques to relax muscles and relieve tension. Nuru massage is known for its slippery gel and close body-to-body contact, with a greater emphasis on sensual experiences. They are different massage styles with different purposes.",
  // },
  {
    question: "Does sensual or Nuru massage include sexual intercourse?",
    answer:
      "Not necessarily. Sensual and Nuru massage descriptions do not automatically mean that sexual intercourse or other sexual services are included. Always read the service description and discuss boundaries with the therapist before booking.",
  },
];

export const massageKumasiConfig: LandingPageConfig = {
  title: "Massage in Kumasi | Explore Appi Therapists",
  description:
    "Explore massage therapists and services listed in Kumasi on Appi. Compare profiles, view prices and book online.",
  canonical: "/massage-kumasi",
  heading: "Looking for a Massage in Kumasi?",
  intro:
    "Discover massage services listed in Kumasi, compare therapist profiles and prices, then request a booking with your preferred appointment details.",
  heroImage:
    "https://images.unsplash.com/photo-1544161515-733932c60011?auto=format&fit=crop&w=1400&q=85",
  heroAlt: "A calm massage room prepared for a wellness session",
  therapists: kumasiTherapists,
  benefits: [
    "Explore therapist profiles and the services they list.",
    "See service pricing before you submit a booking request.",
    "Choose a preferred appointment date and time in the booking form.",
    "The booking form shows which appointment locations each therapist offers.",
  ],
  steps: [
    "Explore the profiles and service options listed for Kumasi.",
    "Choose a massage and enter the appointment date, time and location you prefer.",
    "Review your details and submit the booking for confirmation.",
  ],
  faqs: sharedFaqs,
  servicesIntro:
    "These services are based on the offerings listed by therapists currently shown on Appi. Confirm preferences and boundaries with a therapist before the session.",
};

export const homeMassageKumasiConfig: LandingPageConfig = {
  title: "Home Massage in Kumasi | Book with Appi",
  description:
    "Find Kumasi massage therapists who list home visits. View their services and prices, then request a home appointment through Appi.",
  canonical: "/home-massage-kumasi",
  heading: "Professional Home Massage in Kumasi",
  intro:
    "Explore Kumasi therapists who list home visits, then request a session at your preferred date, time and location.",
  heroImage:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
  heroAlt: "A massage session in a quiet, comfortable setting",
  serviceLocation: "home",
  therapists: homeTherapists,
  benefits: [
    "Browse only Kumasi therapist profiles that list home visits.",
    "Review services and prices before starting a booking.",
    "Enter your preferred date, time and home address in the booking flow.",
    "Contact details and a booking summary are included in the confirmation flow.",
  ],
  steps: [
    "Choose a therapist who lists home visits.",
    "Select a massage and enter your preferred appointment date and time.",
    "Provide the home address and contact details, then submit your booking.",
  ],
  faqs: [
    {
      question: "Which therapists offer home massage in Kumasi?",
      answer:
        "This page lists Kumasi therapists whose profiles include home visits. The list reflects the service information currently in Appi's therapist data.",
    },
    {
      question: "How do I choose a time?",
      answer:
        "Enter the date and start time you prefer in the booking form. The therapist will need to confirm the request.",
    },
    {
      question: "What should I include as my location?",
      answer:
        "Enter a clear home address and any useful directions in the booking form so the therapist can review the request.",
    },
    ...sharedFaqs.filter((faq) => !faq.question.includes("home or hotel")),
  ],
  servicesIntro:
    "Service options below come from the current profiles of Kumasi therapists who list home visits. The booking form confirms the therapist's listed price.",
};
