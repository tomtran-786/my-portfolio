"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import testimonialsData from "@/data/teaching/testimonials";
import CourseDetailModal from "./CourseDetailModal";

const CATEGORIES = coursesData.categories;
const categoryLabel = (id) => CATEGORIES.find((cat) => cat.id === id)?.label ?? id;

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
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.2,
    margin: 0,
    maxWidth: "36rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-body)",
    lineHeight: 1.7,
    maxWidth: "36rem",
    margin: 0,
  },
  // Tabs lọc category
  tabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "2.5rem",
  },
  tabBtn: (active) => ({
    background: active ? "var(--teach-brand)" : "var(--teach-bg-soft)",
    color: active ? "var(--teach-on-brand)" : "var(--teach-ink)",
    border: active ? "1px solid var(--teach-brand)" : "1px solid transparent",
    fontSize: "var(--fs-label)",
    fontWeight: 600,
    minHeight: 40,
    padding: "0 1.25rem",
    borderRadius: "var(--r-pill)",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  card: (highlighted) => ({
    background: highlighted ? "var(--teach-surface-muted)" : "var(--teach-surface)",
    border: highlighted ? "1px solid var(--teach-border-strong)" : "1px solid var(--teach-border)",
    borderRadius: "var(--r-md)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  }),
  // Là <button> thật chứ không phải <span>: card không còn role="button" nên đây
  // là đường vào modal bằng bàn phím. Reset lại style mặc định của button.
  viewDetailHint: {
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-label)",
    fontWeight: 600,
    background: "none",
    border: "none",
    padding: "0.6rem 0",
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
    fontWeight: 600,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    paddingRight: "7.5rem",
  },
  cardIcon: { fontSize: "1.125rem", lineHeight: 1 },
  cardTag: {
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-label)",
    fontWeight: 600,
  },
  cardTitle: {
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: "var(--fs-h3)",
    lineHeight: 1.3,
    margin: 0,
  },
  cardDesc: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-small)",
    lineHeight: 1.6,
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
    fontSize: "var(--fs-label)",
  },
  metaLabel: {
    color: "var(--teach-text-secondary)",
    fontWeight: 600,
    minWidth: "5.75rem",
  },
  emptyState: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-small)",
    textAlign: "center",
    padding: "3rem 0",
  },
};

export default function CoursesSection() {
  const { headline, subtext, items, faqs } = coursesData;
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
        className="teach-section-heading"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 style={s.headline}>{headline}</h2>
        <p className="teach-section-context" style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Tabs lọc category */}
      <div className="teach-course-tabs" style={s.tabRow}>
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
                  y: -6,
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
                  <span className="tag" style={s.popularBadge}>{item.tag}</span>
                )}

                {/* Icon nằm cùng hàng với nhãn khoá, không xếp thành ô riêng
                    phía trên tiêu đề (Impeccable: icon tile above heading). */}
                <div style={s.cardTop}>
                  <span aria-hidden="true" style={s.cardIcon}>{item.icon}</span>
                  <span style={s.cardTag}>{categoryLabel(item.category)}</span>
                </div>
                <h3 style={s.cardTitle}>{item.title}</h3>
                <p style={s.cardDesc}>{item.description}</p>

                <div style={s.metaRow}>
                  <div style={s.metaItem}><span style={s.metaLabel}>Trình độ</span>{item.level}</div>
                  <div style={s.metaItem}><span style={s.metaLabel}>Hình thức</span>{item.format}</div>
                  <div style={s.metaItem}><span style={s.metaLabel}>Thời lượng</span>{item.duration}</div>
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
