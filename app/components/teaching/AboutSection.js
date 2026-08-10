"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import aboutData from "@/data/teaching/about";
import CountUp from "@/app/components/CountUp";

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
    margin: 0,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  headline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand)",
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
    lineHeight: 1.25,
    marginBottom: "1.5rem",
  },
  accentLine: {
    display: "block",
    width: 48,
    height: 4,
    background: "var(--teach-brand)",
    borderRadius: 4,
    margin: "0 0 1.5rem 0",
  },
  paragraph: {
    color: "var(--teach-text)",
    fontSize: 15,
    lineHeight: 1.8,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
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
    background: "var(--teach-brand-soft)",
    color: "var(--teach-brand-deep)",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    background: "var(--teach-surface)",
    border: "1px solid var(--teach-border)",
    borderRadius: "1rem",
    padding: "1.1rem 1rem",
  },
  statValue: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand)",
    fontSize: "1.6rem",
    fontVariantNumeric: "tabular-nums",
  },
  statLabel: {
    color: "var(--teach-ink)",
    fontSize: 13,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    lineHeight: 1.4,
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
    background: "linear-gradient(to top, rgba(47,39,35,0.62) 0%, transparent 50%)",
  },
  imageBadge: {
    position: "absolute",
    bottom: "1.5rem",
    left: "1.5rem",
    right: "1.5rem",
    background: "rgba(47,39,35,0.9)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  badgeIcon: { fontSize: 28 },
  badgeText: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
  },
  badgeSubtext: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 12,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
};

function StatItem({ value, label, start }) {
  return (
    <div style={s.statItem}>
      <span style={s.statValue}>
        <CountUp value={value} start={start} />
      </span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

export default function AboutSection() {
  const { headline, paragraphs, image, stats, credentials } = aboutData;

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <section className="teach-section teach-section-soft" style={s.section} id="about">
      <style>{`
        @media (max-width: 768px) {
          .about-inner { grid-template-columns: 1fr !important; }
          .about-image { order: -1; }
        }
        @media (max-width: 420px) {
          .about-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="about-inner" style={s.inner}>
        {/* Text side */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeLeft}
        >
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

          <div ref={statsRef} className="about-stats" style={s.statsRow}>
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                start={statsInView}
              />
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
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 45vw" style={s.img} />
          <div style={s.imageOverlay} />
          <div style={s.imageBadge}>
            <span style={s.badgeIcon}>{image.badge.icon}</span>
            <div>
              <p style={s.badgeText}>{image.badge.text}</p>
              <p style={s.badgeSubtext}>{image.badge.subtext}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
