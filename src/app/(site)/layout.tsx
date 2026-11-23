import { Header } from "@/components/site/Header";
import { Menu } from "@/components/site/Menu";
import { Footer } from "@/components/site/Footer";
import "./sections.css";
import "./racing.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Menu />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
