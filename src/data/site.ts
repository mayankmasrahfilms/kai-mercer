export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kai-mercer.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Kai Mercer",
  first: "Kai",
  last: "Mercer",
  number: "7",
  team: "Vantor Racing",
  teamSince: "Vantor F1 since 2021",
  nickname: "Late-brake Kai",
  age: 24,
  born: "2002-03-14",
  hometown: "Manchester, UK",
  nationality: "British",
  tagline: "Always chasing the apex.",
  description:
    "Official website of Kai Mercer, British Formula 1 driver #7 for Vantor Racing. 2026 race calendar, live results, career stats, helmets, partners and the official KM store.",
  email: "business@kaimercer.com",
  supportEmail: "support@kaimercer.com",
  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@kaimercer" },
    { label: "Instagram", href: "https://www.instagram.com/kaimercer" },
    { label: "YouTube", href: "https://www.youtube.com/@kaimercer" },
    { label: "Twitch", href: "https://www.twitch.tv/kaimercer" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "On Track", href: "/on-track" },
    { label: "Off Track", href: "/#off-track" },
    { label: "Calendar", href: "/calendar" },
  ],
  keywords: [
    "Kai Mercer",
    "Kai Mercer F1",
    "Kai Mercer Formula 1",
    "Formula 1 driver",
    "F1 driver website",
    "Vantor Racing",
    "F1 2026 calendar",
    "F1 race results",
    "British racing driver",
    "F1 helmets",
    "Kai Mercer store",
  ],
} as const;

export const partners = [
  { name: "Nova Energy", style: "nova" },
  { name: "Quadra", style: "quadra" },
  { name: "Halden", style: "halden" },
  { name: "Voltline", style: "volt" },
  { name: "Orbit", style: "orbit" },
  { name: "KM Kart", style: "kmkart" },
  { name: "Pulse", style: "pulse" },
  { name: "Atlas", style: "atlas" },
  { name: "Lumen", style: "lumen" },
  { name: "Strata", style: "strata" },
] as const;
