"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import testimonialsData from "@/data/teaching/testimonials";
import CourseDetailModal from "./CourseDetailModal";
import { formatVnd, startingPrice, GOAL_EVENT } from "./courseUtils";

const CATEGORIES = coursesData.categories;
const categoryLabel = (id) => CATEGORIES.find((cat) => cat.id === id)?.label ?? id;

// Gợi ý khóa theo mục tiêu + trình độ hiện tại. Giao tiếp chỉ có một khóa nên không cần hỏi.
const PATHS = {
  ielts: { start: "ielts-basic", base: "ielts-intermediate" },
  toeic: { start: "toeic-basic", base: "toeic-intermediate" },
};
const LEVEL_CHOICES = [
  { id: "start", label: "Mới bắt đầu hoặc mất gốc" },
  { id: "base", label: "Đã có nền tảng" },
];

// Thanh level: đoạn xám là trình độ hiện tại, đoạn cam là mục tiêu. Chỉ là hình
// minh họa (aria-hidden); chữ "Trình độ" bên cạnh mới là nội dung chính.
function LevelBar({ bar }) {
  const [min, max] = bar.scale;
  const pos = (v) => ((v - min) / (max - min)) * 100;
  const seg = ([from, to], kind) => (
    <span
      key={kind}
      className={`level-bar__seg level-bar__seg--${kind}`}
      style={{ left: `${pos(from)}%`, width: `${Math.max(pos(to) - pos(from), 3)}%` }}
    />
  );
  return (
    <span className="level-bar" aria-hidden="true">
      {bar.now && seg(bar.now, "now")}
      {seg(bar.goal, "goal")}
    </span>
  );
}

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
  levelRow: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    margin: "-1.5rem 0 2rem 0",
  },
  levelLabel: {
    color: "var(--teach-text-secondary)",
    fontSize: "var(--fs-label)",
    fontWeight: 600,
    marginRight: "0.25rem",
  },
  suggestion: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-small)",
    margin: "0 0 1.5rem 0",
  },
  card: (highlighted, recommended) => ({
    background: highlighted ? "var(--teach-surface-muted)" : "var(--teach-surface)",
    border: recommended
      ? "1px solid var(--teach-brand-deep)"
      : highlighted ? "1px solid var(--teach-border-strong)" : "1px solid var(--teach-border)",
    borderRadius: "var(--r-md)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  }),
  cardImage: {
    aspectRatio: "4 / 3",
    display: "block",
    height: "auto",
    objectFit: "cover",
    width: "100%",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: "0.75rem",
    padding: "1.25rem 1.5rem 1.5rem",
  },
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
    top: "0.75rem",
    right: "0.75rem",
    background: "var(--teach-brand)",
    color: "var(--teach-on-brand)",
    fontWeight: 600,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
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
    gap: "0.5rem",
    borderTop: "1px solid var(--teach-border)",
    paddingTop: "0.9rem",
    marginTop: "0.25rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.45rem",
    color: "var(--teach-text)",
    fontSize: "var(--fs-label)",
  },
  metaLabel: {
    color: "var(--teach-text-secondary)",
    fontWeight: 600,
    flexShrink: 0,
    minWidth: "5.25rem",
  },
  levelBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  price: {
    color: "var(--teach-ink)",
    fontWeight: 700,
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
  const [level, setLevel] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const askLevel = Boolean(PATHS[activeCategory]);
  const recommendedId = PATHS[activeCategory]?.[level] ?? null;
  const recommended = items.find((item) => item.id === recommendedId);

  // Hero có dòng prompt "Bạn muốn đạt band nào?": nó phát sự kiện này để lọc khóa.
  useEffect(() => {
    const onGoal = (e) => {
      setActiveCategory(e.detail);
      setLevel(null);
    };
    window.addEventListener(GOAL_EVENT, onGoal);
    return () => window.removeEventListener(GOAL_EVENT, onGoal);
  }, []);

  const chooseCategory = (id) => {
    setActiveCategory(id);
    setLevel(null);
  };

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
            onClick={() => chooseCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Chọn mục tiêu IELTS/TOEIC thì hỏi thêm trình độ để gợi ý đúng một khóa. */}
      {askLevel && (
        <div style={s.levelRow} role="group" aria-label="Trình độ hiện tại">
          <span style={s.levelLabel}>Trình độ của bạn</span>
          {LEVEL_CHOICES.map((choice) => (
            <button
              key={choice.id}
              type="button"
              style={s.tabBtn(level === choice.id)}
              onClick={() => setLevel(level === choice.id ? null : choice.id)}
              aria-pressed={level === choice.id}
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}
      {recommended && (
        <p style={s.suggestion} role="status">
          Hợp với bạn: <strong>{recommended.title}</strong> ({recommended.level}).
        </p>
      )}

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
                style={s.card(item.highlighted, item.id === recommendedId)}
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
                <Image
                  src={item.detail.image.src}
                  alt=""
                  width={1000}
                  height={750}
                  sizes="(max-width: 600px) 100vw, 320px"
                  style={s.cardImage}
                />
                {item.highlighted && (
                  <span className="tag" style={s.popularBadge}>{item.tag}</span>
                )}

                <div style={s.cardBody}>
                  <div style={s.cardTop}>
                    <span style={s.cardTag}>{categoryLabel(item.category)}</span>
                    {item.id === recommendedId && <span className="tag">Hợp với bạn</span>}
                  </div>
                  <h3 style={s.cardTitle}>{item.title}</h3>
                  <p style={s.cardDesc}>{item.description}</p>

                  <div style={s.metaRow}>
                    <div style={s.metaItem}>
                      <span style={s.metaLabel}>Trình độ</span>
                      <span style={s.levelBlock}>
                        {item.level}
                        {item.levelBar && <LevelBar bar={item.levelBar} />}
                      </span>
                    </div>
                    <div style={s.metaItem}><span style={s.metaLabel}>Hình thức</span>{item.format}</div>
                    {startingPrice(item) && (
                      <div style={s.metaItem}>
                        <span style={s.metaLabel}>Học phí</span>
                        <span>
                          <span style={s.price}>Từ {formatVnd(startingPrice(item).monthlyPrice)}/tháng</span>
                          {startingPrice(item).id === "nhom" ? ", học nhóm" : ", học 1-1"}
                        </span>
                      </div>
                    )}
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
                </div>
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
