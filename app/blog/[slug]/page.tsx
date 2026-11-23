import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) return { title: "Article not found | Appi", robots: { index: false, follow: false } };
  const url = `${siteUrl}/blog/${post.slug}`;
  return { title: post.seoTitle, description: post.seoDescription, alternates: { canonical: url }, openGraph: { type: "article", title: post.seoTitle, description: post.seoDescription, url, publishedTime: new Date(`${post.publishedAt}T00:00:00Z`).toISOString(), modifiedTime: new Date(`${post.modifiedAt}T00:00:00Z`).toISOString(), authors: [post.author], images: [{ url: post.coverImage, alt: post.coverAlt }] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const safeJsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.seoDescription, image: [post.coverImage], datePublished: `${post.publishedAt}T00:00:00Z`, dateModified: `${post.modifiedAt}T00:00:00Z`, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: "Appi" }, mainEntityOfPage: `${siteUrl}/blog/${post.slug}` }).replace(/</g, "\\u003c");

  return <main className="app-page min-h-screen flex-1"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-app-ink-muted"><Link href="/blog" className="app-link">Blog</Link><span aria-hidden="true"> / </span><span>{post.category}</span></nav>
      <header><p className="text-sm font-semibold text-app-primary">{post.category}{post.isSample ? " · Sample article" : ""}</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-8 text-app-ink-muted">{post.excerpt}</p><p className="mt-5 text-sm text-app-ink-muted">By {post.author} · {new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} · {post.readingMinutes} min read</p></header>
      <figure className="relative mt-9 h-64 overflow-hidden sm:h-[28rem]"><Image src={post.coverImage} alt={post.coverAlt} fill priority sizes="(max-width: 768px) 100vw, 800px" className="object-cover" /></figure>
      <div className="prose prose-zinc mx-auto mt-10 max-w-[68ch] text-base leading-8">
        {post.content.map((block, blockIndex) => {
          if (block.type === "paragraph") return <p key={blockIndex}>{block.text}</p>;
          if (block.type === "heading") return block.level === 2 ? <h2 key={blockIndex} className="mt-10 text-2xl font-semibold tracking-tight">{block.text}</h2> : <h3 key={blockIndex} className="mt-8 text-xl font-semibold">{block.text}</h3>;
          if (block.type === "list") { const List = block.ordered ? "ol" : "ul"; return <List key={blockIndex} className={block.ordered ? "list-decimal pl-6" : "list-disc pl-6"}>{block.items.map((item) => <li key={item} className="pl-1">{item}</li>)}</List>; }
          if (block.type === "quote") return <blockquote key={blockIndex} className="border-l-2 border-app-primary pl-5 text-xl italic">{block.text}{block.attribution && <cite className="mt-3 block text-sm not-italic text-app-ink-muted">— {block.attribution}</cite>}</blockquote>;
          return <figure key={blockIndex} className="my-10"><div className="relative h-60 sm:h-80"><Image src={block.src} alt={block.alt} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" /></div><figcaption className="mt-2 text-sm text-app-ink-muted">{block.caption}</figcaption></figure>;
        })}
      </div>
      <footer className="mx-auto mt-12 max-w-[68ch] border-t border-app-border pt-8"><h2 className="font-semibold">About the author</h2><p className="mt-2 text-sm leading-6 text-app-ink-muted">{post.authorBio}</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/massage-kumasi" className="app-button app-button-primary">Explore massage services</Link><Link href="/home-massage-kumasi" className="app-button app-button-secondary">Home massage in Kumasi</Link></div></footer>
    </article>
    {related.length > 0 && <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8"><h2 className="text-2xl font-semibold">Related articles</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="border border-app-border bg-app-surface p-5"><p className="text-xs font-semibold uppercase tracking-wider text-app-primary">{item.category}</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-app-ink-muted">{item.excerpt}</p></Link>)}</div></section>}
    <nav aria-label="Article navigation" className="mx-auto flex max-w-4xl justify-between px-5 pb-12 sm:px-8"><div>{posts[index - 1] && <Link href={`/blog/${posts[index - 1].slug}`} className="app-link">← Next article</Link>}</div><div className="flex gap-5"><Link href="/blog" className="app-link">Back to the blog</Link>{posts[index + 1] && <Link href={`/blog/${posts[index + 1].slug}`} className="app-link">Previous article →</Link>}</div></nav>
  </main>;
}
