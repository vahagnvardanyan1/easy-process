import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://process-easy.com";
  const locales = ["en", "ru", "hy"] as const;

  const now = new Date();

  return locales.flatMap((locale) => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: locale === "en" ? 1 : 0.9,
      },
      {
        url: `${baseUrl}/${locale}/privacy-policy`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.2,
      },
      {
        url: `${baseUrl}/${locale}/terms-of-service`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.2,
      },
    ];
  });
};

export default sitemap;


