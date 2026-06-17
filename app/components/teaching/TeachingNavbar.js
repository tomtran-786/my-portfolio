"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import navData from "@/data/teaching/nav";

const s = {
  nav: {
    maxWidth: "72rem",
    margin: "0 auto 5rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    background: "rgba(54,49,78,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "9999px",
    padding: "0.6rem 1.25rem",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
  },
  backBtn: {
    width: 36, height: 36,
    borderRadius: "50%",
    background: "#373254",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#C9C5DC",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    background: "none",   // reset browser button default
    border: "none",       // reset browser button default
    padding: 0,           // reset browser button default
    outline: "none",
  },
  logoIcon: {
    width: 36, height: 36,
    borderRadius: "10px",
    background: "#F2684A",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 700,
    color: "#fff",
    fontSize: 17,
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
  },
  accent: { color: "#F2684A" },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  navLink: {
    color: "#C9C5DC",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Montserrat, sans-serif",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    outline: "none",
    transition: "color 0.2s",
  },
  ctaBtn: {
    flexShrink: 0,
    background: "#F2684A",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    padding: "0.6rem 1.25rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
};

function scrollTo(href) {
  if (href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function TeachingNavbar() {
  const { brand, links, cta, backLink } = navData;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={s.nav}
      id="top"
    >
      {/* Trái: back + logo */}
      <div style={s.left}>
        <Link href={backLink.href} title={backLink.label} style={s.backBtn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>

        <button style={s.logoBtn} onClick={() => scrollTo("#top")}>
          <span style={s.logoIcon}>{brand.logoText}</span>
          <span style={s.logoText}>
            {brand.name}<span style={s.accent}>.</span> {brand.accent}
          </span>
        </button>
      </div>

      {/* Giữa: nav links */}
      <div style={s.navLinks}>
        {links.map((link) => (
          <button
            key={link.href}
            style={s.navLink}
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Phải: CTA */}
      <button style={s.ctaBtn} onClick={() => scrollTo(cta.href)}>
        {cta.label}
      </button>
    </motion.nav>
  );
}
