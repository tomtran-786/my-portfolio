"use client";

import { motion } from "framer-motion";
import aboutData from "@/data/teaching/about";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const s = {
  section: {
    maxWidth: "72rem",
    margin: "6rem auto",
    padding: "0 1rem",
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
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
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
    lineHeight: 1.25,
    marginBottom: "1.5rem",
  },
  accentLine: {
    display: "block",
    width: 48,
    height: 4,
    background: "#F2684A",
    borderRadius: 4,
    margin: "0 0 1.5rem 0",
  },
  paragraph: {
    color: "#ADA8C4",
    fontSize: 15,
    lineHeight: 1.8,
    fontFamily: "Montserrat, sans-serif",
    marginBottom: "1rem",
  },
  credentials: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.5rem",
    marginBottom: "2rem",
  },
  credentialTag: {
    background: "#373254",
    color: "#D8D4EA",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
  },
  statsRow: {
    display: "flex",
    gap: "2rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: "1.5rem",
  },
  statItem: { display: "flex", flexDirection: "column", gap: "0.2rem" },
  statValue: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.75rem",
  },
  statLabel: {
    color: "#ADA8C4",
    fontSize: 13,
    fontFamily: "Montserrat, sans-serif",
  },
  imageWrap: {
    position: "relative",
    borderRadius: "1.5rem",
    overflow: "hidden",
    aspectRatio: "4/5",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(42,38,64,0.6) 0%, transparent 50%)",
  },
  imageBadge: {
    position: "absolute",
    bottom: "1.5rem",
    left: "1.5rem",
    right: "1.5rem",
    background: "rgba(54,49,78,0.9)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  badgeIcon: { fontSize: 28 },
  badgeText: {
    fontFamily: "Montserrat, sans-serif",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
  },
  badgeSubtext: {
    color: "#ADA8C4",
    fontSize: 12,
    fontFamily: "Montserrat, sans-serif",
  },
};

// Responsive: stack on mobile
const innerStyle = {
  ...s.inner,
  // Dùng media query không được trong inline styles → dùng CSS variable fallback
  // Component này render ok trên desktop; mobile sẽ stack tự nhiên qua grid
};

export default function AboutSection() {
  const { sectionLabel, headline, paragraphs, image, stats, credentials } = aboutData;

  return (
    <section style={s.section} id="about">
      <style>{`
        @media (max-width: 768px) {
          .about-inner { grid-template-columns: 1fr !important; }
          .about-image { order: -1; }
        }
      `}</style>

      <div className="about-inner" style={s.inner}>
        {/* Text side */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeLeft}
        >
          <span style={s.label}><span style={s.labelDot} />{sectionLabel}</span>
          <h2 style={s.headline}>{headline}</h2>
          <span style={s.accentLine} />

          {paragraphs.map((p, i) => (
            <p key={i} style={s.paragraph}>{p}</p>
          ))}

          <div style={s.credentials}>
            {credentials.map((c) => (
              <span key={c} style={s.credentialTag}>{c}</span>
            ))}
          </div>

          <div style={s.statsRow}>
            {stats.map((stat) => (
              <div key={stat.label} style={s.statItem}>
                <span style={s.statValue}>{stat.value}</span>
                <span style={s.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image side */}
        <motion.div
          className="about-image"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeRight}
          style={s.imageWrap}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} style={s.img} />
          <div style={s.imageOverlay} />
          <div style={s.imageBadge}>
            <span style={s.badgeIcon}>🏆</span>
            <div>
              <p style={s.badgeText}>IELTS 8.0 · 3+ năm kinh nghiệm</p>
              <p style={s.badgeSubtext}>Cử nhân Kinh tế, Đại học Đà Nẵng</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
