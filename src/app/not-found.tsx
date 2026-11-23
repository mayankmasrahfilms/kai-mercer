import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="text-page nf" data-theme="olive">
      <div className="text-page__inner" style={{ textAlign: "center" }}>
        <p className="label">Error 404</p>
        <h1 className="display" style={{ marginTop: "2vw" }}>
          Off <span className="serif">track</span>
        </h1>
        <p>This page has spun off the circuit. Head back to the pit lane.</p>
        <p style={{ marginTop: "2em" }}>
          <Link href="/" className="btn btn--green">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
