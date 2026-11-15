"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import testimonialsData from "@/data/teaching/testimonials";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const s = {
  section: {
    margin: 0,
  },
  header: {},
  headline: {
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.15,
    margin: 0,
    maxWidth: "36rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-body)",
    lineHeight: 1.7,
    margin: 0,
  },
  card: {
    background: "var(--teach-surface)",
    border: "1px solid var(--teach-border)",
    borderRadius: "var(--r-md)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    cursor: "default",
    boxShadow: "none",
  },
  // Kết quả đứng đầu: đây là thứ người đọc đang tìm.
  result: {
    color: "var(--teach-ink)",
    fontSize: "var(--fs-lead)",
    fontWeight: 700,
    lineHeight: 1.35,
    margin: 0,
  },
  quote: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-small)",
    lineHeight: 1.65,
    margin: 0,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderTop: "1px solid var(--teach-border)",
    paddingTop: "1rem",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid var(--teach-brand)",
    flexShrink: 0,
  },
  name: {
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: "var(--fs-small)",
    margin: 0,
  },
  role: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-label)",
    margin: 0,
  },
};

export default function TestimonialsSection() {
  const { headline, subtext, items } = testimonialsData;

  return (
    <section className="teach-section" style={s.section} id="testimonials">
      <motion.div
        className="teach-section-heading"
        style={s.header}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 style={s.headline}>{headline}</h2>
        <p className="teach-section-context" style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Hiện đủ mọi học viên, xếp cột để không bị thẻ lẻ ở hàng cuối. */}
      <motion.ul
        className="teach-stories"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {items.map((item) => (
          <motion.li key={item.id} variants={fadeUp} className="teach-story" style={s.card}>
            <h3 style={s.result}>{item.result}</h3>
            <blockquote style={s.quote}>{item.quote}</blockquote>
            <div style={s.footer}>
              <Image src={item.avatar} alt="" width={44} height={44} style={s.avatar} />
              <div>
                <p style={s.name}>{item.name}</p>
                <p style={s.role}>{item.role}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
