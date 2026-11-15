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
  // Không còn khung card + bóng lồng trong section: nội dung đứng thẳng trên
  // nền trang, căn giữa trong một cột hẹp.
  inner: {
    maxWidth: "40rem",
    margin: "0 auto",
    textAlign: "center",
  },
  headline: {
    fontWeight: 700, color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.2, marginBottom: "1rem",
  },
  subtext: {
    color: "var(--teach-text)", fontSize: "var(--fs-body)", lineHeight: 1.7,
    maxWidth: "34rem", margin: "0 auto 2rem auto",
  },
  btnRow: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "0.75rem",
    flexWrap: "wrap",
  },
  contactLine: {
    color: "var(--teach-text)", fontSize: "var(--fs-small)",
    margin: "1.25rem 0 0 0",
  },
  note: {
    alignItems: "center",
    color: "var(--teach-text-secondary)", fontSize: "var(--fs-label)",
    display: "inline-flex", gap: "0.4rem",
    marginTop: "0.4rem",
  },
};

export default function CTASection() {
  const { headline, subtext, buttons, contactLine, note } = ctaData;

  return (
    <section className="teach-section teach-section-soft" style={s.section} id="contact">
      <style>{`
        .cta-btn { transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease; }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: var(--teach-shadow-hover); }
        @media (prefers-reduced-motion: reduce) {
          .cta-btn:hover { transform: none; }
        }
      `}</style>

      <motion.div
        style={s.inner}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} style={s.headline}>{headline}</motion.h2>
        <motion.p variants={fadeUp} style={s.subtext}>{subtext}</motion.p>

        <motion.div variants={fadeUp} style={s.btnRow}>
          {buttons.map((btn) => (
            /*
             * Dùng <a> thay vì <Link> vì href trỏ ra ngoài: Zalo mở tab mới,
             * mailto: mở ứng dụng mail nên không cần target.
             */
            <a
              key={btn.label}
              href={btn.href}
              {...(btn.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`btn cta-btn ${btn.primary ? "btn--primary" : "btn--secondary"}`}
              style={{ minHeight: 52, padding: "0.9rem 1.75rem" }}
            >
              <i className={`ti ${btn.icon}`} aria-hidden="true" />
              {btn.label}
            </a>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} style={s.contactLine}>{contactLine}</motion.p>
        <motion.p variants={fadeUp} style={s.note}>
          <i className="ti ti-clock" aria-hidden="true" /> {note}
        </motion.p>
      </motion.div>
    </section>
  );
}
