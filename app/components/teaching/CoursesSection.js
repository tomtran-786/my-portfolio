"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import testimonialsData from "@/data/teaching/testimonials";
import CourseDetailModal from "./CourseDetailModal";

const CATEGORIES = coursesData.categories;

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
    margin: 0,
  },
  headline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand)",
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
    lineHeight: 1.2,
    marginBottom: "0.75rem",
    maxWidth: "36rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: 15,
    lineHeight: 1.7,
    maxWidth: "36rem",
    marginBottom: "2rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  // Tabs lọc category
  tabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "2.5rem",
  },
  tabBtn: (active) => ({
    background: active ? "var(--teach-brand)" : "var(--teach-surface)",
    color: active ? "var(--teach-on-brand)" : "var(--teach-ink)",
    border: active ? "1px solid var(--teach-brand)" : "1px solid var(--teach-border)",
    fontSize: 13,
    fontWeight: 600,
    padding: "0.55rem 1.25rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  card: (highlighted) => ({
    background: highlighted ? "var(--teach-brand-soft)" : "var(--teach-surface)",
    border: highlighted ? "1.5px solid var(--teach-brand)" : "1px solid var(--teach-border)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "var(--teach-shadow-card)",
  }),
  // Là <button> thật chứ không phải <span>: card không còn role="button" nên đây
  // là đường vào modal bằng bàn phím. Reset lại style mặc định của button để giữ
  // nguyên hình dáng cũ.
  viewDetailHint: {
    color: "var(--teach-brand)",
    fontSize: 12.5,
    fontWeight: 600,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  popularBadge: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    background: "var(--teach-brand)",
    color: "var(--teach-on-brand)",
    fontSize: 11,
    fontWeight: 700,
    padding: "0.2rem 0.65rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  cardIcon: { fontSize: 32, lineHeight: 1 },
  cardTag: {
    color: "var(--teach-brand)",
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  cardTitle: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-ink)",
    fontSize: "1.1rem",
    margin: "0.1rem 0",
  },
  cardDesc: {
    color: "var(--teach-text)",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    flexGrow: 1,
  },
  metaRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    borderTop: "1px solid var(--teach-border)",
    paddingTop: "0.9rem",
    marginTop: "0.25rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    color: "var(--teach-text)",
    fontSize: 13,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  metaIcon: { fontSize: 13 },
  cardCta: (highlighted) => ({
    marginTop: "1rem",
    display: "block",
    textAlign: "center",
    background: highlighted ? "var(--teach-brand)" : "transparent",
    color: highlighted ? "var(--teach-on-brand)" : "var(--teach-brand)",
    border: highlighted ? "none" : "1.5px solid var(--teach-brand)",
    fontSize: 13,
    fontWeight: 700,
    padding: "0.7rem",
    borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  }),
  emptyState: {
    color: "var(--teach-text)",
    fontSize: 14,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    textAlign: "center",
    padding: "3rem 0",
  },
};

export default function CoursesSection() {
  const { headline, subtext, items, cta, ctaHref, faqs } = coursesData;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="teach-section" style={s.section} id="courses">
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
            aria-pressed={activeCategory === cat.id}
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
                  boxShadow: "var(--teach-shadow-hover)",
                  borderColor: "var(--teach-border-strong)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                // Card không còn là role="button" nữa. Nó bọc một <Link> thật, nên
                // nested-interactive: onKeyDown của card gọi preventDefault() và
                // nuốt luôn Enter bấm trên nút CTA bên trong -> modal mở thay vì
                // link chạy. Giờ click chuột trên card vẫn tiện như cũ, còn đường
                // vào bằng bàn phím là nút "Xem chi tiết khóa học" bên dưới.
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

                <button
                  type="button"
                  style={s.viewDetailHint}
                  aria-label={`Xem chi tiết khóa học ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(item);
                  }}
                >
                  Xem chi tiết khóa học →
                </button>

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
