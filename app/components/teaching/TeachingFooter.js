"use client";

// Cùng bố cục với app/components/Footer.js (dải cong -> 4 cột -> thanh bản quyền),
// phỏng theo footer của "folio" (Ayush Singh) — https://github.com/ayush013/folio (MIT).
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
// Ở đây đổi sang tone cam #F2684A và tiếng Việt cho trang /teaching.

import Link from "next/link";
import navData from "@/data/teaching/nav";
import ctaData from "@/data/teaching/cta";
import heroData from "@/data/teaching/hero";

const ACCENT = "#F2684A";
const PANEL = "#262238";

const s = {
  heading: {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "1rem",
    fontFamily: "Montserrat, sans-serif",
  },
  link: {
    display: "block",
    width: "fit-content",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    marginBottom: "0.65rem",
    fontFamily: "Montserrat, sans-serif",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    transition: "color 0.2s ease",
  },
  body: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
  },
  brand: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: "#fff",
    fontSize: 20,
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
    // margin âm để tràn hết bề ngang: <main> của trang teaching có padding 0 1rem,
    // không bù lại thì footer bị thụt hai bên và dải cong hụt mép.
    <footer id="footer" style={{ position: "relative", margin: "0 -1rem" }}>
      <style>{`
        .tf-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          max-width: 72rem;
          margin: 0 auto;
        }
        .tf-grid a:hover, .tf-grid button:hover { color: ${ACCENT}; }
        .tf-bottom {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          max-width: 72rem;
          margin: 2.5rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.12);
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          font-family: Montserrat, sans-serif;
        }
        @media (max-width: 768px) {
          .tf-grid { grid-template-columns: 1fr 1fr; gap: 2rem 1.5rem; }
          .tf-bottom { flex-direction: column; text-align: center; }
        }
        @media (max-width: 420px) {
          .tf-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: 90 }}
      >
        <path d="M0,120 C360,20 1080,20 1440,120 L1440,120 L0,120 Z" fill={PANEL} />
      </svg>

      <div style={{ background: PANEL, padding: "1rem 1.5rem 2.5rem" }}>
        <div className="tf-grid">
          {/* 1. Danh tính */}
          <div>
            <div style={s.brand}>
              {brand.name} {brand.accent}
              <span style={{ color: ACCENT }}>.</span>
            </div>
            <p style={{ ...s.body, maxWidth: "18rem" }}>{heroData.subtext}</p>
          </div>

          {/* 2. Khám phá */}
          <div>
            <p style={s.heading}>Khám phá</p>
            {links.map((l) => (
              <button key={l.href} style={s.link} onClick={() => scrollTo(l.href)}>
                {l.label}
              </button>
            ))}
          </div>

          {/* 3. Khóa học */}
          <div>
            <p style={s.heading}>Bắt đầu</p>
            <button style={s.link} onClick={() => scrollTo("#courses")}>
              Xem khóa học
            </button>
            <button style={s.link} onClick={() => scrollTo("#contact")}>
              Học thử miễn phí
            </button>
            <Link href={backLink.href} style={s.link}>
              {backLink.label} ↗
            </Link>
          </div>

          {/* 4. Liên hệ */}
          <div>
            <p style={s.heading}>Liên hệ</p>
            {ctaData.buttons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                style={s.link}
              >
                {btn.primary ? "📧" : "💬"} {btn.label}
              </a>
            ))}
            <p style={{ ...s.body, color: "rgba(255,255,255,0.65)", marginTop: "0.5rem" }}>
              ⏱ {ctaData.note}
            </p>
          </div>
        </div>

        <div className="tf-bottom">
          <span>© 2026 Tuan (Tom) Tran</span>
          <span>Built with Next.js &amp; framer-motion</span>
        </div>
      </div>
    </footer>
  );
}
