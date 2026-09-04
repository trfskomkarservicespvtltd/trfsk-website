export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_WEBSITE ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://trfskomkar.com",
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "TRFSK OMKAR SERVICES PVT LTD",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Financial awareness, business education, and professional networking — backed by clear documentation and enterprise-grade software.",
};

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
