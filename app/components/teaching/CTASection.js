"use client";

import { motion } from "framer-motion";
import ctaData from "@/data/teaching/cta";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const s = {
  section: {
    margin: 0,
  },
  card: {
    background: "var(--teach-surface)",
    border: "1px solid var(--teach-border)",
    borderRadius: "2rem",
    padding: "4rem 3rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "var(--teach-shadow-card)",
  },
  decorCircle: {
    position: "absolute", top: -80, right: -80,
    width: 280, height: 280, borderRadius: "50%",
    background: "radial-gradient(circle, var(--teach-brand-soft) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  decorCircle2: {
    position: "absolute", bottom: -60, left: -60,
    width: 200, height: 200, borderRadius: "50%",
    background: "radial-gradient(circle, var(--teach-brand-soft) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  emoji: { fontSize: 48, display: "block", marginBottom: "1.25rem" },
  headline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800, color: "var(--teach-ink)",
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
    lineHeight: 1.25, marginBottom: "1rem",
    position: "relative", zIndex: 1,
  },
  subtext: {
    color: "var(--teach-text)", fontSize: 15, lineHeight: 1.8,
    maxWidth: "30rem", margin: "0 auto 2.5rem auto",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    position: "relative", zIndex: 1,
  },
  btnRow: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "0.75rem",
    flexWrap: "wrap", position: "relative", zIndex: 1,
  },
  btnPrimary: {
    background: "var(--teach-brand)", color: "var(--teach-on-brand)",
    fontWeight: 700, fontSize: 15,
    padding: "1rem 2rem", borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  },
  btnSecondary: {
    background: "var(--teach-surface)", color: "var(--teach-brand-deep)",
    fontWeight: 700, fontSize: 15,
    padding: "1rem 2rem", borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    border: "1.5px solid var(--teach-brand-deep)",
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
  },
  note: {
    color: "var(--teach-text-secondary)", fontSize: 14,
    marginTop: "1.5rem", fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    position: "relative", zIndex: 1,
  },
};

export default function CTASection() {
  const { headline, subtext, buttons, note } = ctaData;

  return (
    <section className="teach-section teach-section-soft" style={s.section} id="contact">
      <style>{`
        .cta-btn-primary:hover {
          background: var(--teach-brand-hover) !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(65, 48, 40, 0.24);
        }
        .cta-btn-secondary:hover {
          background: var(--teach-brand-soft) !important;
          border-color: var(--teach-brand-deep) !important;
          transform: translateY(-3px);
        }
      `}</style>

      <motion.div
        style={s.card}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div style={s.decorCircle} />
        <div style={s.decorCircle2} />

        <motion.span variants={fadeUp} style={s.emoji}>✉️</motion.span>
        <motion.h2 variants={fadeUp} style={s.headline}>{headline}</motion.h2>
        <motion.p variants={fadeUp} style={s.subtext}>{subtext}</motion.p>

        <motion.div variants={fadeUp} style={s.btnRow}>
          {buttons.map((btn) => (
            /*
             * Dùng <a> thay vì <Link> vì cả hai href đều trỏ ra ngoài
             * (Gmail compose và profile Zalo) và cần mở ở tab mới.
             */
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={btn.primary ? "cta-btn-primary" : "cta-btn-secondary"}
              style={btn.primary ? s.btnPrimary : s.btnSecondary}
            >
              {btn.primary ? "📧" : "💬"} {btn.label}
            </a>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} style={s.note}>⏱ {note}</motion.p>
      </motion.div>
    </section>
  );
}
