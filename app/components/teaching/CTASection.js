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
    maxWidth: "72rem",
    margin: "6rem auto 4rem auto",
    padding: "0 1rem",
  },
  card: {
    background: "linear-gradient(135deg, #3D2E5E 0%, #2A2640 100%)",
    border: "1.5px solid rgba(242,104,74,0.3)",
    borderRadius: "2rem",
    padding: "4rem 3rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  decorCircle: {
    position: "absolute", top: -80, right: -80,
    width: 280, height: 280, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(242,104,74,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  decorCircle2: {
    position: "absolute", bottom: -60, left: -60,
    width: 200, height: 200, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(242,104,74,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  emoji: { fontSize: 48, display: "block", marginBottom: "1.25rem" },
  headline: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800, color: "#fff",
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
    lineHeight: 1.25, marginBottom: "1rem",
    position: "relative", zIndex: 1,
  },
  subtext: {
    color: "#ADA8C4", fontSize: 15, lineHeight: 1.8,
    maxWidth: "30rem", margin: "0 auto 2.5rem auto",
    fontFamily: "Montserrat, sans-serif",
    position: "relative", zIndex: 1,
  },
  btnRow: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "0.75rem",
    flexWrap: "wrap", position: "relative", zIndex: 1,
  },
  btnPrimary: {
    background: "#F2684A", color: "#fff",
    fontWeight: 700, fontSize: 15,
    padding: "1rem 2rem", borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  },
  btnSecondary: {
    background: "transparent", color: "#fff",
    fontWeight: 700, fontSize: 15,
    padding: "1rem 2rem", borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
    border: "1.5px solid rgba(255,255,255,0.25)",
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
  },
  note: {
    color: "#7B7898", fontSize: 12,
    marginTop: "1.5rem", fontFamily: "Montserrat, sans-serif",
    position: "relative", zIndex: 1,
  },
};

export default function CTASection() {
  const { headline, subtext, buttons, note } = ctaData;

  return (
    <section style={s.section} id="contact">
      <style>{`
        .cta-btn-primary:hover {
          background: #ff7c5c;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(242, 104, 74, 0.4);
        }
        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.5);
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
             * Dùng <a> thay vì <Link> để:
             * - mailto: mở app soạn mail với địa chỉ người nhận điền sẵn
             * - https://zalo.me/... mở profile Zalo trong tab mới
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