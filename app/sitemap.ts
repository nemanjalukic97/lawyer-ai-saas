import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://legantis.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://legantis.app/login", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://legantis.app/signup", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://legantis.app/refund", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
