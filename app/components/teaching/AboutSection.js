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
    color: "#E5E5E5",
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
    color: "#E5E5E5",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
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
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "1rem",
    padding: "1.1rem 1rem",
  },
  statValue: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#F2684A",
    fontSize: "1.6rem",
    fontVariantNumeric: "tabular-nums",
  },
  statLabel: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Montserrat, sans-serif",
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
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section style={s.section} id="about">
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