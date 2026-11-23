import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

const featuredPost = getPublishedPosts().find((post) => post.featured) ?? getPublishedPosts()[0];

export const metadata: Metadata = {
  title: "Appi Blog | Wellness, Massage & Better Living",
  description: "Explore practical guides to massage services, booking and everyday self-care from the Appi editorial team.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: { title: "Explore Wellness, Massage & Better Living | Appi", description: "Practical guides to massage services, booking and everyday self-care.", url: `${siteUrl}/blog`, type: "website", images: featuredPost ? [{ url: featuredPost.coverImage, alt: featuredPost.coverAlt }] : [] },
};

const PAGE_SIZE = 6;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string | string[]; page?: string | string[] }> }) {
  const params = await searchParams;
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Math.max(1, Number.parseInt(rawPage ?? "1", 10) || 1);
  const posts = getPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  const validCategory = categories.includes(category ?? "") ? category : undefined;
  const categoryPosts = validCategory ? posts.filter((post) => post.category === validCategory) : posts;
  const pageCount = Math.max(1, Math.ceil(categoryPosts.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const pagePosts = categoryPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured = posts.find((post) => post.featured) ?? posts[0];

  return <main className="app-page min-h-screen flex-1">
    <header className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-primary">The Appi Journal</p><h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Explore Wellness, Massage &amp; Better Living</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-app-ink-muted">Practical guides to massage services, booking and everyday self-care, from the Appi editorial team.</p></header>
    {featured && !validCategory && <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8"><article className="grid overflow-hidden border border-app-border bg-app-surface md:grid-cols-2"><Link href={`/blog/${featured.slug}`} className="relative min-h-64 md:min-h-96"><Image src={featured.coverImage} alt={featured.coverAlt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></Link><div className="flex flex-col justify-center p-6 sm:p-10"><p className="text-sm font-semibold text-app-primary">Featured · {featured.category}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight">{featured.title}</h2><p className="mt-4 leading-7 text-app-ink-muted">{featured.excerpt}</p><p className="mt-5 text-sm text-app-ink-muted">{new Date(`${featured.publishedAt}T12:00:00Z`).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} · {featured.readingMinutes} min read</p><Link href={`/blog/${featured.slug}`} className="app-button app-button-primary mt-6 w-fit">Read article</Link></div></article></section>}
    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl font-semibold">Latest articles</h2><nav aria-label="Blog categories" className="flex flex-wrap gap-2"><Link href="/blog" className={`border px-3 py-2 text-sm ${!validCategory ? "border-app-primary bg-app-primary text-white" : "border-app-border"}`}>All</Link>{categories.map((item) => <Link key={item} href={`/blog?category=${encodeURIComponent(item)}`} className={`border px-3 py-2 text-sm ${validCategory === item ? "border-app-primary bg-app-primary text-white" : "border-app-border"}`}>{item}</Link>)}</nav></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{pagePosts.map((post) => <article key={post.slug} className="overflow-hidden border border-app-border bg-app-surface"><Link href={`/blog/${post.slug}`} className="relative block h-52"><Image src={post.coverImage} alt={post.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></Link><div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-app-primary">{post.category}{post.isSample ? " · Sample article" : ""}</p><h3 className="mt-3 text-xl font-semibold leading-snug"><Link href={`/blog/${post.slug}`} className="app-link">{post.title}</Link></h3><p className="mt-3 text-sm leading-6 text-app-ink-muted">{post.excerpt}</p><p className="mt-4 text-xs text-app-ink-muted">{new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} · {post.readingMinutes} min read</p></div></article>)}</div>
      {pageCount > 1 && <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-4"><Link aria-disabled={page <= 1} className={`app-button app-button-secondary ${page <= 1 ? "pointer-events-none opacity-50" : ""}`} href={`/blog?${validCategory ? `category=${encodeURIComponent(validCategory)}&` : ""}page=${page - 1}`}>Previous</Link><span className="text-sm">Page {page} of {pageCount}</span><Link aria-disabled={page >= pageCount} className={`app-button app-button-secondary ${page >= pageCount ? "pointer-events-none opacity-50" : ""}`} href={`/blog?${validCategory ? `category=${encodeURIComponent(validCategory)}&` : ""}page=${page + 1}`}>Next</Link></nav>}
    </section>
    <section className="bg-app-surface-muted"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-semibold">Looking for a massage in Kumasi?</h2><p className="mt-2 text-app-ink-muted">Explore therapist profiles and current service listings on Appi.</p></div><Link href="/massage-kumasi" className="app-button app-button-primary w-fit">Explore services</Link></div></section>
  </main>;
}
