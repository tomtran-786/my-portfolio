"use client";

import { motion } from "framer-motion";
import testimonialsData from "@/data/teaching/testimonials";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const s = {
  section: {
    maxWidth: "72rem",
    margin: "6rem auto",
    padding: "0 1rem",
  },
  header: { marginBottom: "3rem", textAlign: "center" },
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#373254",
    color: "#D8D4EA",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.35rem 0.9rem",
    borderRadius: "9999px",
    marginBottom: "1.25rem",
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  labelDot: { width: 7, height: 7, borderRadius: "50%", background: "#F2684A" },
  headline: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    marginBottom: "0.75rem",
  },
  subtext: {
    color: "#ADA8C4",
    fontSize: 15,
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#2F2B47",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  quoteIcon: {
    color: "#F2684A",
    fontSize: 36,
    lineHeight: 1,
    fontFamily: "Georgia, serif",
    marginBottom: "-0.5rem",
  },
  quote: {
    color: "#D8D4EA",
    fontSize: 14,
    lineHeight: 1.8,
    fontFamily: "Montserrat, sans-serif",
    flexGrow: 1,
    fontStyle: "italic",
  },
  resultBadge: {
    display: "inline-block",
    background: "rgba(242,104,74,0.15)",
    color: "#F2684A",
    fontSize: 12,
    fontWeight: 700,
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: "1.25rem",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #F2684A",
    flexShrink: 0,
  },
  name: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: "#fff",
    fontSize: 14,
  },
  role: {
    color: "#ADA8C4",
    fontSize: 12,
    fontFamily: "Montserrat, sans-serif",
  },
  stars: {
    display: "flex",
    gap: 2,
    color: "#F2684A",
    marginLeft: "auto",
  },
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.3 4.4 18.2l1.1-6.2L1 7.6l6.2-.9z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const { sectionLabel, headline, subtext, items } = testimonialsData;

  return (
    <section style={s.section} id="testimonials">
      {/* Header */}
      <motion.div
        style={s.header}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <span style={s.label}><span style={s.labelDot} />{sectionLabel}</span>
        <h2 style={s.headline}>{headline}</h2>
        <p style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Cards */}
      <motion.div
        style={s.grid}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={fadeUp} style={s.card}>
            <div style={s.quoteIcon}>"</div>
            <p style={s.quote}>{item.quote}</p>
            <span style={s.resultBadge}>🎉 {item.result}</span>
            <div style={s.footer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.avatar} alt={item.name} style={s.avatar} />
              <div>
                <p style={s.name}>{item.name}</p>
                <p style={s.role}>{item.role}</p>
              </div>
              <div style={s.stars}>
                {Array.from({ length: item.rating }).map((_, i) => <StarIcon key={i} />)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
