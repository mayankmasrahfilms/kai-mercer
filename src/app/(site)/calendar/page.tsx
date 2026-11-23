import type { Metadata } from "next";
import { DrawOn, Reveal } from "@/components/anim";
import { Signature, LoopArrowIcon } from "@/components/icons";
import { Countdown, NextRaceCard, RaceTable, SeasonResults } from "@/components/racing/Racing";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { races, standing } from "@/data/races";
import { SITE_URL, site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "2026 F1 Calendar & Race Results",
  description:
    "Kai Mercer's 2026 Formula 1 calendar: every round, date and circuit, his finishing positions and fastest laps, the next race at Lusail and a live countdown to lights out.",
  path: "/calendar",
  keywords: ["F1 2026 calendar", "F1 race schedule", "Kai Mercer results", "Qatar Grand Prix 2026", "Lusail International Circuit"],
});

export default function CalendarPage() {
  const eventsLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kai Mercer 2026 Formula 1 calendar",
    itemListElement: races.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SportsEvent",
        name: `${r.name} Grand Prix 2026`,
        sport: "Formula 1",
        startDate: r.startISO,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: r.circuit, address: { "@type": "PostalAddress", addressLocality: r.city, addressCountry: r.country } },
        performer: { "@type": "Person", name: site.name, url: SITE_URL },
        url: `${SITE_URL}/calendar`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Calendar", path: "/calendar" }]), eventsLd]} />
      <section className="cal-hero" data-theme="dark" aria-labelledby="cal-title">
        <div className="cal-hero__title-wrap">
          <Reveal as="h1" className="cal-hero__title display" id="cal-title" start="top 95%">
            Upcoming
            <br />
            <span className="serif">2026 calendar</span>
          </Reveal>
          <DrawOn className="cal-hero__sig" start="top 95%" duration={1.6}>
            <Signature />
          </DrawOn>
        </div>
        <div className="cal-hero__meta">
          <Reveal as="p" className="cal-hero__intro" start="top 98%">
            The Formula 1 season is underway, view {site.first}&rsquo;s schedule below.
          </Reveal>
          <dl className="cal-hero__stats">
            <div>
              <dt className="label">Standing</dt>
              <dd className="cond">
                {standing.position}
                <sup className="ord">{standing.suffix}</sup>
              </dd>
            </div>
            <div>
              <dt className="label">Round</dt>
              <dd className="cond">{standing.round}</dd>
            </div>
          </dl>
          <div className="cal-hero__btns">
            <a href="#track-visualiser" className="btn btn--outline">
              Track visualiser <LoopArrowIcon />
            </a>
            <a href="#calendar-list" className="btn btn--outline">
              Calendar list <LoopArrowIcon />
            </a>
          </div>
        </div>
        <NextRaceCard />
      </section>

      <section className="cal-list" data-theme="dark" aria-label="Race calendar">
        <RaceTable />
      </section>

      <section className="cal-results" data-theme="dark" aria-label="All results">
        <SeasonResults />
      </section>

      <Countdown />
    </>
  );
}
