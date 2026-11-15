"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import testimonialsData from "@/data/teaching/testimonials";
import CourseDetailModal from "./CourseDetailModal";
import { formatVnd, startingPrice, GOAL_EVENT } from "./courseUtils";

const CATEGORIES = coursesData.categories;

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
  // Là <button> thật chứ không phải <span>: card không còn role="button" nên đây
  // là đường vào modal bằng bàn phím. Reset lại style mặc định của button.
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

  const lead = filteredItems.find((item) => item.highlighted) ?? filteredItems[0];
  const orderedItems = lead ? [lead, ...filteredItems.filter((item) => item !== lead)] : [];

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
      {/* Khóa nổi bật (đang "Phổ biến nhất") thành thẻ giấy lớn, các khóa khác là thẻ gọn. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {filteredItems.length === 0 ? (
            <p className="course-empty">Chưa có khóa học trong mục này.</p>
          ) : (
            <div className="course-grid">
              {orderedItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`course-card${idx === 0 && filteredItems.length > 1 ? " course-card--feature" : ""}`}
                  // Click chuột trên cả thẻ mở modal; đường vào bằng bàn phím là nút "Xem chi tiết" bên dưới.
                  onClick={() => setSelectedCourse(item)}
                >
                  <Image src={item.detail.image.src} alt="" width={1000} height={750} sizes="(max-width: 600px) 100vw, 320px" />
                  <div className="course-card__body">
                    {item.highlighted && idx === 0 && filteredItems.length > 1 && <span className="tag course-badge">{item.tag}</span>}
                    <h3>{item.title}</h3>
                    <p className="course-card__desc">{item.description}</p>
                    <small>{item.level.replace(/ → /g, "\u00a0→\u00a0")}</small>
                    {item.levelBar && <LevelBar bar={item.levelBar} />}
                    {startingPrice(item) && (
                      <span className="course-price-row">
                        <span className="course-price">Từ {formatVnd(startingPrice(item).monthlyPrice)}/tháng</span>
                        <span className="course-plan">{startingPrice(item).id === "nhom" ? "học nhóm" : "học 1-1"}</span>
                      </span>
                    )}
                    {item.id === recommendedId && <span className="tag course-badge">Hợp với bạn</span>}
                    <button
                      type="button"
                      className="course-open"
                      aria-label={`Xem chi tiết khóa học ${item.title}`}
                      onClick={(e) => { e.stopPropagation(); setSelectedCourse(item); }}
                    >
                      Xem chi tiết khóa học →
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
