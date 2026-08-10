"use client";

import Link from "next/link";
import navData from "@/data/teaching/nav";
import ctaData from "@/data/teaching/cta";
import heroData from "@/data/teaching/hero";

const s = {
  footer: {
    background: "var(--teach-bg)",
    borderTop: "1px solid var(--teach-border)",
    padding: "3rem var(--teach-content-gutter) 2.5rem",
  },
  heading: {
    color: "var(--teach-text-secondary)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  link: {
    background: "none",
    border: 0,
    color: "var(--teach-ink)",
    cursor: "pointer",
    display: "block",
    fontFamily: "inherit",
    fontSize: 14,
    marginBottom: "0.65rem",
    padding: 0,
    textAlign: "left",
    textDecoration: "none",
    transition: "color 0.2s ease",
    width: "fit-content",
  },
  body: {
    color: "var(--teach-text)",
    fontSize: 14,
    lineHeight: 1.7,
  },
  brand: {
    color: "var(--teach-ink)",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: "0.75rem",
  },
};

function scrollTo(href) {
  if (href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

export default function TeachingFooter() {
  const { brand, links, backLink } = navData;

  return (
    <footer id="footer" style={s.footer}>
      <style>{`
        .tf-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          max-width: 75rem;
          margin: 0 auto;
        }
        .tf-grid a:hover, .tf-grid button:hover { color: var(--teach-brand-deep) !important; }
        .tf-bottom {
          align-items: center;
          background: var(--teach-surface-muted);
          border: 1px solid var(--teach-border);
          border-radius: 8px;
          color: var(--teach-text-secondary);
          display: flex;
          font-size: 12px;
          gap: 0.5rem;
          justify-content: space-between;
          margin: 2.5rem auto 0;
          max-width: 75rem;
          padding: 1rem 1.25rem;
        }
        @media (max-width: 768px) {
          .tf-grid { grid-template-columns: 1fr 1fr; gap: 2rem 1.5rem; }
          .tf-bottom { flex-direction: column; text-align: center; }
        }
        @media (max-width: 420px) {
          .tf-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="tf-grid">
        <div>
          <div style={s.brand}>
            {brand.name} {brand.accent}<span style={{ color: "var(--teach-brand-deep)" }}>.</span>
          </div>
          <p style={{ ...s.body, maxWidth: "18rem" }}>{heroData.subtext}</p>
        </div>

        <div>
          <p style={s.heading}>Khám phá</p>
          {links.map((link) => (
            <button key={link.href} style={s.link} onClick={() => scrollTo(link.href)}>
              {link.label}
            </button>
          ))}
        </div>

        <div>
          <p style={s.heading}>Bắt đầu</p>
          <button style={s.link} onClick={() => scrollTo("#courses")}>Xem khóa học</button>
          <button style={s.link} onClick={() => scrollTo("#contact")}>Học thử miễn phí</button>
          <Link href={backLink.href} style={s.link}>{backLink.label} ↗</Link>
        </div>

        <div>
          <p style={s.heading}>Liên hệ</p>
          {ctaData.buttons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              style={s.link}
            >
              {button.primary ? "📧" : "💬"} {button.label}
            </a>
          ))}
          <p style={{ ...s.body, color: "var(--teach-text-secondary)", marginTop: "0.5rem" }}>
            ⏱ {ctaData.note}
          </p>
        </div>
      </div>

      <div className="tf-bottom">
        <span>© 2026 Tuan (Tom) Tran</span>
        <span>Built with Next.js &amp; framer-motion</span>
      </div>
    </footer>
  );
}
