import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedRoutes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/massage-kumasi", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/home-massage-kumasi", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  ];
  return [
    ...fixedRoutes.map((route) => ({ url: `${siteUrl}${route.path}`, changeFrequency: route.changeFrequency, priority: route.priority })),
    ...getPublishedPosts().map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.modifiedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
