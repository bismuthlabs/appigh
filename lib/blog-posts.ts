export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  authorBio: string;
  publishedAt: string;
  modifiedAt: string;
  readingMinutes: number;
  status: "draft" | "published";
  featured: boolean;
  isSample: boolean;
  seoTitle: string;
  seoDescription: string;
  content: ArticleBlock[];
};

const author = "Appi Editorial Team";
const authorBio = "The Appi editorial team shares practical guides to massage services, booking and everyday self-care.";
const cover = "https://images.unsplash.com/photo-1544161515-733932c60011?auto=format&fit=crop&w=1400&q=85";

export const blogPosts: BlogPost[] = [
  {
    slug: "what-to-expect-from-your-first-massage-booking",
    title: "What to Expect When Booking Your First Massage",
    excerpt: "A simple guide to comparing therapist profiles, sharing preferences and preparing for your appointment.",
    category: "Massage & Wellness",
    coverImage: cover,
    coverAlt: "A welcoming room set up for a massage appointment",
    author,
    authorBio,
    publishedAt: "2026-11-18",
    modifiedAt: "2026-11-18",
    readingMinutes: 4,
    status: "published",
    featured: true,
    isSample: true,
    seoTitle: "What to Expect When Booking Your First Massage | Appi",
    seoDescription: "Learn how to compare massage profiles, share your preferences and prepare for your first appointment booking on Appi.",
    content: [
      { type: "paragraph", text: "Booking a massage can feel easier when you know what information to review and what to share before the appointment. This sample guide walks through the booking steps available on Appi." },
      { type: "heading", level: 2, text: "Start with the therapist profile" },
      { type: "paragraph", text: "Review the services, session lengths, prices and locations listed on a therapist's profile. Profiles can help you understand what is offered, but you can contact the therapist to clarify details before you submit a request." },
      { type: "image", src: cover, alt: "Massage room with a prepared treatment table", caption: "Take a moment to review the service and location details before booking." },
      { type: "heading", level: 2, text: "Share your preferences" },
      { type: "paragraph", text: "Use the booking form to choose a service, enter the date and time you prefer, add the appointment location, and provide contact details. Notes can help you communicate preferences or useful directions." },
      { type: "list", items: ["Check the therapist's listed service and price.", "Enter a date and start time that suit you.", "Provide a clear location and contact number.", "Agree on any preferences and boundaries before the session begins."] },
      { type: "heading", level: 2, text: "Review your confirmation" },
      { type: "paragraph", text: "After submitting a booking, review the confirmation summary and keep the contact details available in case you need to coordinate with the therapist. A request is subject to the therapist confirming the appointment." },
      { type: "quote", text: "Clear details make it easier for both sides to understand the appointment request.", attribution: "Appi Editorial Team" },
      { type: "heading", level: 2, text: "Explore therapists on Appi" },
      { type: "paragraph", text: "Browse the profiles currently listed in Kumasi on Appi, compare the published services and prices, and use the booking form to share your preferred appointment details." },
    ],
  },
  {
    slug: "choosing-a-massage-style-that-fits-your-preferences",
    title: "Choosing a Massage Style That Fits Your Preferences",
    excerpt: "A practical way to read service descriptions and decide what questions to ask before you book.",
    category: "Massage Techniques",
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
    coverAlt: "A quiet wellness setting prepared for a massage session",
    author,
    authorBio,
    publishedAt: "2026-11-20",
    modifiedAt: "2026-11-20",
    readingMinutes: 5,
    status: "published",
    featured: false,
    isSample: true,
    seoTitle: "Choosing a Massage Style That Fits Your Preferences | Appi",
    seoDescription: "Compare massage service descriptions and learn what to clarify with a therapist before choosing a session.",
    content: [
      { type: "paragraph", text: "Massage service names can describe different approaches. This sample article offers a straightforward way to compare the options listed by Appi therapists without making health claims." },
      { type: "heading", level: 2, text: "Read the service details" },
      { type: "paragraph", text: "Look at the therapist's description, session length, price and appointment location. If a detail is unclear, ask the therapist before booking rather than assuming every provider offers the same experience." },
      { type: "heading", level: 2, text: "Questions you can ask" },
      { type: "list", ordered: true, items: ["What movements or pressure are generally part of this service?", "Can I ask for lighter or firmer pressure during the session?", "What should I prepare for a home or hotel appointment?", "How can I communicate preferences or boundaries?"] },
      { type: "quote", text: "A good booking starts with a clear conversation about expectations and consent.", attribution: "Appi Editorial Team" },
      { type: "heading", level: 2, text: "Choose a comfortable setting" },
      { type: "paragraph", text: "Some therapists list home or hotel visits, while others may offer different locations. Select a location shown on the therapist's profile and include clear directions in the booking form." },
      { type: "heading", level: 2, text: "Browse the services currently listed" },
      { type: "paragraph", text: "Service options on Appi depend on the therapist. Browse the current profiles and compare the information each provider has published before sending a booking request." },
    ],
  },
  {
    slug: "planning-a-home-massage-appointment",
    title: "Planning a Home Massage Appointment",
    excerpt: "A checklist for sharing your preferred time, address and appointment details with a therapist.",
    category: "Self-Care",
    coverImage: cover,
    coverAlt: "A neatly prepared massage space",
    author,
    authorBio,
    publishedAt: "2026-11-21",
    modifiedAt: "2026-11-21",
    readingMinutes: 3,
    status: "draft",
    featured: false,
    isSample: true,
    seoTitle: "Planning a Home Massage Appointment | Appi",
    seoDescription: "A draft checklist for preparing home massage booking details.",
    content: [{ type: "paragraph", text: "Draft sample content. This post is not published and should not appear in public blog pages or the sitemap." }],
  },
];

export function getPublishedPosts() {
  return blogPosts.filter((post) => post.status === "published").sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublishedPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}
