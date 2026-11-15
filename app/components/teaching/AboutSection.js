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
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.25,
    marginBottom: "1.5rem",
  },
  paragraph: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-body)",
    lineHeight: 1.7,
    maxWidth: "68ch",
    marginBottom: "1rem",
  },
  credentials: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.5rem",
    marginBottom: "2rem",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0,
    marginTop: "0.5rem",
    borderTop: "1px solid var(--teach-border)",
    borderBottom: "1px solid var(--teach-border)",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    padding: "1.25rem 1rem",
  },
  statValue: {
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "1.9rem",
    fontVariantNumeric: "tabular-nums",
  },
  statLabel: {
    color: "var(--teach-ink)",
    fontSize: "var(--fs-label)",
    lineHeight: 1.4,
  },
  figure: {
    margin: 0,
  },
  caption: {
    color: "var(--teach-text-secondary)",
    fontSize: "var(--fs-label)",
    lineHeight: 1.5,
    marginTop: "var(--sp-3)",
  },
  imageWrap: {
    position: "relative",
    borderRadius: "var(--r-lg)",
    overflow: "hidden",
    aspectRatio: "4/5",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

function StatItem({ value, label, start }) {
  return (
    <div className="about-stat" style={s.statItem}>
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
        }
        @media (min-width: 421px) {
          .about-stat + .about-stat { border-left: 1px solid var(--teach-border); }
        }
        @media (max-width: 420px) {
          .about-stats { grid-template-columns: 1fr !important; }
          .about-stat { padding-inline: 0 !important; }
          .about-stat + .about-stat { border-top: 1px solid var(--teach-border); }
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

          {paragraphs.map((p, i) => (
            <p key={i} style={s.paragraph}>{p}</p>
          ))}

          <div style={s.credentials}>
            {credentials.map((c) => (
              <span key={c} className="tag">{c}</span>
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

        {/* Image side: ảnh để nguyên, chú thích nằm dưới thay vì lớp phủ
            gradient + thẻ kính mờ đè lên ảnh. */}
        <motion.figure
          className="about-image"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeRight}
          style={s.figure}
        >
          <div style={s.imageWrap}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 45vw" style={s.img} />
          </div>
          <figcaption style={s.caption}>{image.caption}</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
