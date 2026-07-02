"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import testimonialsData from "@/data/teaching/testimonials";
import CourseDetailModal from "./CourseDetailModal";

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "ielts", label: "IELTS" },
  { id: "toeic", label: "TOEIC" },
  { id: "giao-tiep", label: "Giao Tiếp" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const s = {
  section: {
    maxWidth: "72rem",
    margin: "6rem auto",
    padding: "0 1rem",
  },
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#373254",
    color: "#E5E5E5",
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
    lineHeight: 1.2,
    marginBottom: "0.75rem",
    maxWidth: "36rem",
  },
  subtext: {
    color: "#E5E5E5",
    fontSize: 15,
    lineHeight: 1.7,
    maxWidth: "36rem",
    marginBottom: "2rem",
    fontFamily: "Montserrat, sans-serif",
  },
  // Tabs lọc category
  tabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "2.5rem",
  },
  tabBtn: (active) => ({
    background: active ? "#F2684A" : "#373254",
    color: active ? "#fff" : "#D8D4EA",
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    padding: "0.55rem 1.25rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  card: (highlighted) => ({
    background: highlighted ? "#3D2E5E" : "#2F2B47",
    border: highlighted ? "1.5px solid #F2684A" : "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  }),
  viewDetailHint: {
    color: "#F2684A",
    fontSize: 12.5,
    fontWeight: 600,
    fontFamily: "Montserrat, sans-serif",
  },
  popularBadge: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    background: "#F2684A",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "0.2rem 0.65rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
  },
  cardIcon: { fontSize: 32, lineHeight: 1 },
  cardTag: {
    color: "#F2684A",
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  cardTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.1rem",
    margin: "0.1rem 0",
  },
  cardDesc: {
    color: "#E5E5E5",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
    flexGrow: 1,
  },
  metaRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: "0.9rem",
    marginTop: "0.25rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    color: "#E5E5E5",
    fontSize: 13,
    fontFamily: "Montserrat, sans-serif",
  },
  metaIcon: { fontSize: 13 },
  cardCta: (highlighted) => ({
    marginTop: "1rem",
    display: "block",
    textAlign: "center",
    background: highlighted ? "#F2684A" : "transparent",
    color: highlighted ? "#fff" : "#F2684A",
    border: highlighted ? "none" : "1.5px solid #F2684A",
    fontSize: 13,
    fontWeight: 700,
    padding: "0.7rem",
    borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
  }),
  emptyState: {
    color: "#E5E5E5",
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    padding: "3rem 0",
  },
};

export default function CoursesSection() {
  const { sectionLabel, headline, subtext, items, cta, ctaHref, faqs } = coursesData;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section style={s.section} id="courses">
      {/* Header */}
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 style={s.headline}>{headline}</h2>
        <p style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Tabs lọc category */}
      <div style={s.tabRow}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            style={s.tabBtn(activeCategory === cat.id)}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards — fade khi đổi tab + hover lift */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          style={s.grid}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stagger}
        >
          {filteredItems.length === 0 ? (
            <p style={s.emptyState}>Chưa có khóa học trong mục này.</p>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                style={s.card(item.highlighted)}
                whileHover={{
                  y: -10,
                  boxShadow: "0 16px 32px rgba(0,0,0,0.35)",
                  borderColor: "rgba(242,104,74,0.4)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setSelectedCourse(item)}
              >
                {item.highlighted && (
                  <span style={s.popularBadge}>⭐ {item.tag}</span>
                )}

                <span style={s.cardIcon}>{item.icon}</span>
                {!item.highlighted && <span style={s.cardTag}>{item.tag}</span>}
                <h3 style={s.cardTitle}>{item.title}</h3>
                <p style={s.cardDesc}>{item.description}</p>

                <div style={s.metaRow}>
                  <div style={s.metaItem}><span style={s.metaIcon}>📶</span>{item.level}</div>
                  <div style={s.metaItem}><span style={s.metaIcon}>👥</span>{item.format}</div>
                  <div style={s.metaItem}><span style={s.metaIcon}>🗓</span>{item.duration}</div>
                </div>

                <span style={s.viewDetailHint}>Xem chi tiết khóa học →</span>

                <Link
                  href={ctaHref}
                  style={s.cardCta(item.highlighted)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (ctaHref.startsWith("#")) {
                      e.preventDefault();
                      document.getElementById(ctaHref.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {cta}
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal chi tiết khóa học */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailModal
            course={selectedCourse}
            faqs={faqs}
            testimonials={testimonialsData.items}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}