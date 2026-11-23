import Image from "next/image";
import { DrawOn, Marquee, Reveal } from "@/components/anim";
import { Contours } from "@/components/Contours";
import { Signature } from "@/components/icons";
import { partners, site } from "@/data/site";
import { TLink } from "./TLink";

export function Footer() {
  const year = 2026;
  return (
    <div className="footer-wrap" data-theme="olive">
      <footer className="footer" id="footer">
        <span className="footer__tab" aria-hidden="true" />
        <Contours />
        <div className="footer__head">
          <DrawOn className="footer__sig" duration={1.4} start="top 85%">
            <Signature />
          </DrawOn>
          <Reveal as="p" className="footer__title display" start="top 85%">
            Always <span className="serif">chasing</span>
            <br />
            the <span className="serif">apex</span>.
          </Reveal>
        </div>

        <div className="footer__body">
          <nav className="footer__col" aria-label="Footer pages">
            <span className="label">Pages</span>
            {site.nav.map((n) => (
              <TLink key={n.href} href={n.href}>
                {n.label}
              </TLink>
            ))}
            <TLink href="/store" className="footer__store label lime">
              Store
            </TLink>
          </nav>

          <div className="footer__figure">
            <Image src="/images/kai-race-helmet.webp" alt="Kai Mercer wearing his lime race helmet" fill sizes="(max-width: 860px) 78vw, 34vw" quality={85} />
          </div>

          <div className="footer__col">
            <span className="label">Follow on</span>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <Marquee className="footer__partners" speed={45}>
            {partners.map((p) => (
              <span key={p.name} className={`partner partner--${p.style}`}>
                {p.name}
              </span>
            ))}
          </Marquee>
          <p className="footer__legal">© {year} {site.name}. All rights reserved.</p>
          <a href={`mailto:${site.email}`} className="btn btn--green">
            Business enquiries
          </a>
          <nav className="footer__links" aria-label="Legal">
            <TLink href="/privacy-policy">Privacy policy</TLink>
            <TLink href="/terms">Terms</TLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
