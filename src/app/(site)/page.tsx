import type { Metadata } from "next";
import { HeroMessage } from "@/components/home/HeroMessage";
import { Collage } from "@/components/home/Collage";
import { Champion, Helmets, OnOffTrack, Partners, Socials, Statement } from "@/components/home/Sections";
import { collageHome } from "@/data/content";
import { site } from "@/data/site";


export const metadata: Metadata = {
  title: { absolute: "Kai Mercer | Official Website of F1 Driver #7" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroMessage />
      <Statement />
      <Collage data={collageHome} />
      <OnOffTrack />
      <Helmets />
      <Champion />
      <Partners />
      <Socials />
    </>
  );
}
