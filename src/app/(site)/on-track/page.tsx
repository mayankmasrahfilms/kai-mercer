import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, ScriptWord } from "@/components/anim";
import { Laurel, Signature } from "@/components/icons";
import { Collage } from "@/components/home/Collage";
import { Helmets, Socials } from "@/components/home/Sections";
import { OnTrackHero, PodiumCount } from "@/components/racing/OnTrackHero";
import { Countdown, Highlights, NextRaceCard, SeasonResults } from "@/components/racing/Racing";
import { TLink } from "@/components/site/TLink";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { collageTrack } from "@/data/content";
import { career, juniorTitles } from "@/data/races";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "On Track: F1 Career Stats, Wins & Podiums",
  description: `${site.name}'s Formula 1 career on track: ${career.podiums} podiums, ${parseInt(career.wins)} wins, ${parseInt(
    career.poles
  )} pole positions, season-by-season results, race-win highlights and junior titles.`,
  path: "/on-track",
  type: "profile",
  keywords: ["Kai Mercer stats", "Kai Mercer wins", "Kai Mercer podiums", "F1 career statistics", "Vantor Racing driver"],
});

export default function OnTrackPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "On Track", path: "/on-track" }])} />
      <OnTrackHero />

      <section className="ot-statement" data-theme="dark" aria-labelledby="ot-statement-title">
        <div className="ot-statement__sig">
          <Signature />
        </div>
        <p className="label">{site.teamSince}</p>
        <Reveal as="h2" className="ot-statement__text display" id="ot-statement-title">
          Challenging the limits, <span className="serif">winning big</span>, bringing the heat each and every weekend.
        </Reveal>
        <div className="ot-statement__helmet" aria-hidden="true">
          <Image src="/images/helmet-11.jpg" alt="" fill sizes="20vw" />
        </div>
        <Laurel helmet={false} className="ot-statement__laurel" />
      </section>

      <PodiumCount count={career.podiums} />

      <section className="ot-career" data-theme="dark" aria-labelledby="career-title">
        <div className="ot-career__left">
          <Reveal as="h2" className="ot-career__title display" id="career-title">
            F1 career
            <br />
            <span className="serif">statistics</span>
          </Reveal>
          <div className="ot-career__img">
            <Image src="/images/collage-06.jpg" alt="Kai Mercer in the cockpit" fill sizes="(max-width: 860px) 92vw, 34vw" />
          </div>
        </div>
        <div>
          <dl className="ot-career__grid">
            <div>
              <dt className="label">Formula 1 wins</dt>
              <dd>
                {career.wins}
                <ScriptWord className="ot-career__p1" start="top 75%">
                  P1
                </ScriptWord>
              </dd>
            </div>
            <div>
              <dt className="label">Pole positions</dt>
              <dd>{career.poles}</dd>
            </div>
            <div>
              <dt className="label">Average finish</dt>
              <dd>{career.avgFinish}</dd>
            </div>
            <div>
              <dt className="label">Fastest laps</dt>
              <dd>{career.fastestLaps}</dd>
            </div>
          </dl>
          <p className="ot-seasons-title">F1 seasons</p>
          <div className="ot-seasons">
            <SeasonResults title={false} />
          </div>
          <TLink href="/calendar" className="btn btn--green">
            Full schedule &amp; results
          </TLink>
        </div>
      </section>

      <section className="ot-hl" data-theme="dark" aria-labelledby="hl-title">
        <div className="ot-hl__head">
          <Reveal as="h2" className="ot-hl__title display" id="hl-title">
            F1 result
            <br />
            <span className="serif">highlights</span>
          </Reveal>
          <Reveal as="p" className="ot-hl__intro">
            Across his {career.seasons} seasons in Formula 1, {site.first} has delivered a run of memorable results on tracks around the world.
          </Reveal>
        </div>
        <Highlights />
      </section>

      <Collage items={collageTrack} variant="dark" />

      <section className="ot-titles" data-theme="dark" aria-labelledby="titles-title">
        <div className="ot-titles__img">
          <Image src="/images/collage-05.jpg" alt="Kai Mercer karting as a junior" fill sizes="(max-width: 860px) 92vw, 34vw" />
        </div>
        <div>
          <Reveal as="h2" className="ot-titles__title display" id="titles-title">
            Junior
            <br />
            <span className="serif">titles</span>
          </Reveal>
          <ul className="ot-titles__list">
            {juniorTitles.map((t) => (
              <li key={t}>
                <Laurel helmet={false} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Countdown />

      <section className="ot-upcoming" data-theme="dark" aria-labelledby="upcoming-title">
        <NextRaceCard id="ot-next-race" />
        <div className="ot-upcoming__foot">
          <h2 className="ot-upcoming__title display" id="upcoming-title">
            Upcoming
            <br />
            <span className="serif">2026 schedule</span>
          </h2>
          <p className="ot-upcoming__text">{site.first}&rsquo;s upcoming racing schedule as he takes on the 2026 Formula 1 season.</p>
          <TLink href="/calendar" className="btn btn--green">
            See full schedule
          </TLink>
        </div>
      </section>

      <div className="ot-full" data-theme="dark">
        <Image src="/images/ontrack-fullbleed.jpg" alt="Kai Mercer pulling on his helmet before a race" fill sizes="100vw" />
      </div>

      <Helmets />
      <Socials />
    </>
  );
}
