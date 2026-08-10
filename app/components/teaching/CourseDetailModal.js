"use client";

import { useState, useEffect, useId, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "@/data/teaching/courses";
import useScrollLock from "../../hooks/useScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";

// Phải khớp `transition.duration` của panel bên dưới: goToContact chờ modal thoát
// xong (lúc đó khoá cuộn mới được gỡ) rồi mới cuộn tới #contact.
const EXIT_MS = 300;

const s = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "var(--teach-overlay)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: "var(--z-modal)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "3rem 1rem",
    overflowY: "auto",
  },
  panel: {
    position: "relative",
    width: "100%",
    maxWidth: "64rem",
    background: "var(--teach-surface)",
    border: "1px solid var(--teach-border)",
    borderRadius: "1.75rem",
    padding: "2.5rem",
    boxShadow: "0 30px 70px rgba(47,39,35,0.28)",
  },
  closeBtn: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--teach-surface-muted)",
    border: "1px solid var(--teach-border)",
    color: "var(--teach-text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 2,
  },

  // Intro: ảnh + CTA (trái) — nội dung (phải)
  introGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 300px) 1fr",
    gap: "2.5rem",
    marginBottom: "3rem",
  },
  introLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  imageWrap: {
    position: "relative",   // bắt buộc: <Image fill> neo theo parent positioned gần nhất
    borderRadius: "1.25rem",
    overflow: "hidden",
    aspectRatio: "4 / 3",
    background: "var(--teach-surface-muted)",
  },
  image: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  ctaHeadline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-ink)",
    fontSize: "1.2rem",
    lineHeight: 1.35,
  },
ctaRow: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.9rem" },
ctaPrimary: {
  background: "var(--teach-brand)",
  color: "var(--teach-on-brand)",
  fontWeight: 700,
  fontSize: 14,
  padding: "0.85rem 1.5rem",
  borderRadius: "9999px",
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
},
syllabusLink: {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--teach-brand-deep)",
  textDecoration: "none",
  fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  background: "rgba(var(--teach-brand-rgb), 0.08)",
  border: "1px solid rgba(var(--teach-brand-rgb), 0.22)",
  borderRadius: "9999px",
  padding: "0.6rem 1rem",
  transition: "all 0.25s ease",
  cursor: "pointer",
},
  introRight: { display: "flex", flexDirection: "column" },
  tag: {
    color: "var(--teach-brand-deep)",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  title: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-ink)",
    fontSize: "1.85rem",
    margin: "0.2rem 0 0.4rem 0",
  },
  metaLine: {
    color: "var(--teach-text)",
    fontSize: 13,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    marginBottom: "1.25rem",
  },
  h3: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: "1.1rem",
    margin: "1.5rem 0 0.6rem 0",
  },
  paragraph: {
    color: "var(--teach-text)",
    fontSize: 14.5,
    lineHeight: 1.8,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  checklist: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" },
  checklistItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    color: "var(--teach-text)",
    fontSize: 14.5,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    lineHeight: 1.6,
  },
  checkIconWrap: { marginTop: 2, flexShrink: 0 },

  // Pricing
  pricingSection: {
    textAlign: "center",
    padding: "2.5rem 0",
    borderTop: "1px solid var(--teach-border)",
  },
  sectionLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "var(--teach-surface-muted)",
    color: "var(--teach-brand-deep)",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.35rem 0.9rem",
    borderRadius: "9999px",
    marginBottom: "1rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  sectionHeadline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-ink)",
    fontSize: "1.6rem",
    marginBottom: "0.6rem",
  },
  sectionSubtext: {
    color: "var(--teach-text)",
    fontSize: 14,
    maxWidth: "32rem",
    margin: "0 auto 1.5rem auto",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    lineHeight: 1.7,
  },
  billingToggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1.25rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontSize: 14,
  },
  studentCheckRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontSize: 13.5,
    color: "var(--teach-text)",
    cursor: "pointer",
  },
  studentCheckbox: {
    width: 16,
    height: 16,
    accentColor: "var(--teach-brand-deep)",
    cursor: "pointer",
  },
  priceOriginal: {
    fontSize: "1.05rem",
    color: "var(--teach-text-secondary)",
    textDecoration: "line-through",
    fontWeight: 600,
    marginRight: "0.5rem",
  },
  fromLabel: {
    display: "inline-block",
    background: "rgba(var(--teach-brand-rgb), 0.15)",
    color: "var(--teach-brand-deep)",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    padding: "0.2rem 0.55rem",
    borderRadius: "9999px",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  toggleTrack: {
    width: 46,
    height: 26,
    borderRadius: "9999px",
    background: "var(--teach-surface-muted)",
    border: "none",
    cursor: "pointer",
    padding: 2,
    display: "flex",
    alignItems: "center",
  },
  toggleThumb: {
    display: "block",
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "var(--teach-brand)",
  },
  savePill: {
    background: "rgba(var(--teach-brand-rgb), 0.15)",
    color: "var(--teach-brand-deep)",
    fontSize: 12,
    fontWeight: 700,
    padding: "0.25rem 0.7rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  plansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    textAlign: "left",
  },
  planCard: (popular) => ({
    background: popular ? "var(--teach-brand-soft)" : "var(--teach-bg-soft)",
    border: popular ? "1.5px solid var(--teach-brand-deep)" : "1px solid var(--teach-border)",
    borderRadius: "1.25rem",
    padding: "1.5rem",
    position: "relative",
  }),
  popularTag: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    background: "var(--teach-surface)",
    color: "var(--teach-brand-deep)",
    fontSize: 10.5,
    fontWeight: 700,
    padding: "0.2rem 0.6rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  planName: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: 15,
    marginBottom: "0.6rem",
  },
  planPrice: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-ink)",
    fontSize: "1.9rem",
    marginBottom: "0.5rem",
  },
  planPriceUnit: { fontSize: 12.5, fontWeight: 500, color: "var(--teach-text)" },
  planDesc: {
    color: "var(--teach-text)",
    fontSize: 13,
    lineHeight: 1.6,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },

  // FAQ
  faqSection: { padding: "2rem 0", borderTop: "1px solid var(--teach-border)" },
  faqItem: { borderBottom: "1px solid var(--teach-border)" },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    color: "var(--teach-ink)",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    fontSize: 14.5,
    padding: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },
  faqChevron: {
    color: "var(--teach-brand-deep)",
    fontSize: 18,
    transition: "transform 0.2s ease",
    flexShrink: 0,
    marginLeft: "1rem",
    display: "inline-block",
  },
  faqAnswer: {
    color: "var(--teach-text)",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    paddingBottom: "1rem",
    margin: 0,
  },

  // Students say (testimonials)
  studentsSection: { padding: "2rem 0 0.5rem 0", borderTop: "1px solid var(--teach-border)" },
  studentsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
    marginTop: "1.25rem",
  },
  studentCard: {
    background: "var(--teach-bg-soft)",
    border: "1px solid var(--teach-border)",
    borderRadius: "1.1rem",
    padding: "1.25rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  studentQuoteIcon: {
    color: "var(--teach-brand-deep)",
    fontSize: 28,
    lineHeight: 1,
    fontFamily: "Georgia, serif",
    marginBottom: "-0.4rem",
  },
  studentComment: {
    color: "var(--teach-text)",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontStyle: "italic",
  },
  studentResultBadge: {
    display: "inline-block",
    background: "rgba(var(--teach-brand-rgb), 0.15)",
    color: "var(--teach-brand-deep)",
    fontSize: 11.5,
    fontWeight: 700,
    padding: "0.25rem 0.65rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    alignSelf: "flex-start",
  },
  studentFooter: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    borderTop: "1px solid var(--teach-border)",
    paddingTop: "0.9rem",
  },
  studentAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid var(--teach-brand-deep)",
    flexShrink: 0,
  },
  studentName: {
    color: "var(--teach-ink)",
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  studentRole: {
    color: "var(--teach-text)",
    fontSize: 11.5,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  studentStars: {
    display: "flex",
    gap: 1,
    color: "var(--teach-brand-deep)",
    marginLeft: "auto",
    flexShrink: 0,
  },

  // Students say — single view + nav
  studentsSingleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.25rem",
  },
  studentCardSingle: {
    background: "var(--teach-bg-soft)",
    border: "1px solid var(--teach-border)",
    borderRadius: "1.1rem",
    padding: "1.75rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    width: "100%",
    maxWidth: "30rem",
  },
  studentNavRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.25rem",
    marginTop: "1.25rem",
  },
  studentNavBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--teach-surface-muted)",
    border: "none",
    color: "var(--teach-text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  studentDots: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
  },
  studentDot: (active) => ({
    width: active ? 18 : 7,
    height: 7,
    borderRadius: "9999px",
    background: active ? "var(--teach-brand)" : "var(--teach-border-strong)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.25s ease",
  }),
};

// Render text với **keyword** → <strong> để từ khóa nổi bật.
function renderBold(text) {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "var(--teach-ink)", fontWeight: 700 }}>{part}</strong>
      : part
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teach-brand-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function formatPrice(n) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

function PricingCard({ plan, billing, discountPercent, isStudent }) {
  const basePrice = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const hasDiscount = isStudent && discountPercent > 0;
  const finalPrice = hasDiscount ? Math.round(basePrice * (1 - discountPercent / 100)) : basePrice;
  const unit = billing === "annual" ? "/ khóa" : "/ tháng";
  return (
    <div style={s.planCard(plan.popular)}>
      {plan.popular && <span style={s.popularTag}>Phổ biến nhất</span>}
      <p style={s.planName}>{plan.name}</p>
      {plan.startingFrom && <span style={s.fromLabel}>Chỉ từ</span>}
      <p style={s.planPrice}>
        {hasDiscount && <span style={s.priceOriginal}>{formatPrice(basePrice)}</span>}
        {formatPrice(finalPrice)} <span style={s.planPriceUnit}>{unit}</span>
      </p>
      <p style={s.planDesc}>{plan.description}</p>
    </div>
  );
}

function FaqItem({ faq, isOpen, onToggle, buttonId, panelId }) {
  return (
    <div style={s.faqItem}>
      <button
        id={buttonId}
        style={s.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{faq.question}</span>
        <span style={{ ...s.faqChevron, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
      </button>
      <p
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        style={s.faqAnswer}
      >
        {faq.answer}
      </p>
    </div>
  );
}

export default function CourseDetailModal({ course, faqs, testimonials, onClose }) {
  const [billing, setBilling] = useState("monthly");
  const [isStudent, setIsStudent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);
  const faqIdPrefix = useId();

  const testimonialList = testimonials || [];
  const activeTestimonial = testimonialList[testimonialIndex];

  function prevTestimonial() {
    setTestimonialDirection(-1);
    setTestimonialIndex((i) => (i - 1 + testimonialList.length) % testimonialList.length);
  }

  function nextTestimonial() {
    setTestimonialDirection(1);
    setTestimonialIndex((i) => (i + 1) % testimonialList.length);
  }

  function goToTestimonial(i) {
    setTestimonialDirection(i > testimonialIndex ? 1 : -1);
    setTestimonialIndex(i);
  }

  // Khóa scroll trang nền khi modal mở + cho phép nhấn Esc để đóng
  // Chỉ khoá cuộn khi thật sự render modal. Nếu khoá vô điều kiện, một khoá học
  // thiếu `detail` sẽ rơi vào nhánh `return null` bên dưới -> trang bị khoá cuộn
  // mà không có modal nào hiện ra.
  const canRender = Boolean(course && course.detail);

  useScrollLock(canRender);
  const panelRef = useFocusTrap(canRender);

  // onClose là arrow tạo mới mỗi lần CoursesSection render. Để nó trong dep array
  // khiến effect teardown + đăng ký lại sau mỗi lần parent re-render; giữ trong
  // ref thì listener gắn đúng một lần cho mỗi lần mở modal.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!canRender) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canRender]);

  if (!canRender) return null;
  const { detail } = course;

  const categoryLabel =
    coursesData.categories.find((c) => c.id === course.category)?.label ?? course.tag;

function goToContact() {
  onClose();
  // Khoá cuộn chỉ được gỡ khi modal unmount xong (sau animation thoát), và lúc
  // gỡ nó khôi phục lại vị trí cuộn cũ — cuộn sớm hơn sẽ bị ghi đè ngay.
  setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, EXIT_MS + 80);
}

function openSyllabus() {
  if (detail.syllabusUrl) {
    window.open(detail.syllabusUrl, "_blank", "noopener,noreferrer");
  }
}
  // Modal render inline trong <section id="courses">, nhưng không tổ tiên nào của
  // nó tạo stacking context mới (layout /teaching chỉ có position:relative, không
  // z-index/transform), nên nó nằm cùng stacking context gốc với navbar và nút
  // go-to-top — chỉ cần --z-modal lớn hơn --z-nav là đủ để nổi lên trên.
  return (
    <motion.div
      style={s.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <style>{`
        .course-modal-panel:focus {
          outline: 2px solid var(--teach-focus);
          outline-offset: -2px;
        }
        .course-modal-cta-primary:hover {
          background: var(--teach-brand-hover) !important;
          transform: translateY(-3px);
          box-shadow: var(--teach-shadow-hover);
        }
        .course-modal-syllabus-link:hover {
          background: rgba(var(--teach-brand-rgb), 0.15) !important;
          border-color: rgba(var(--teach-brand-rgb), 0.45) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(var(--teach-brand-rgb), 0.18);
          color: var(--teach-brand-deep) !important;
        }
        .course-modal-close:hover {
          background: var(--teach-brand) !important;
          color: var(--teach-on-brand) !important;
        }
        .course-modal-student-nav:hover {
          background: var(--teach-brand) !important;
          color: var(--teach-on-brand) !important;
        }
        @media (max-width: 700px) {
          .course-modal-intro { grid-template-columns: 1fr !important; }
          .course-modal-panel { padding: 3.5rem 1.25rem 1.5rem !important; border-radius: 1.25rem !important; }
        }
      `}</style>

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={course.title}
        className="course-modal-panel"
        style={s.panel}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="course-modal-close" style={s.closeBtn} onClick={onClose} aria-label="Đóng">
          <CloseIcon />
        </button>

        {/* Ảnh + CTA (trái) / Overview - What you'll learn - How it works - Who it's for (phải) */}
        <div className="course-modal-intro" style={s.introGrid}>
          <div style={s.introLeft}>
            <div style={s.imageWrap}>
              <Image src={detail.image.src} alt={detail.image.alt} fill sizes="300px" style={s.image} />
            </div>
            <p style={s.ctaHeadline}>Sẵn sàng bắt đầu với<br />{course.title}?</p>
<div style={s.ctaRow}>
  <button className="course-modal-cta-primary" style={s.ctaPrimary} onClick={goToContact}>
    Đặt buổi học thử miễn phí
 </button>
  {detail.syllabusUrl && (
    <a className="course-modal-syllabus-link" href={detail.syllabusUrl} target="_blank" rel="noopener noreferrer" style={s.syllabusLink}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      Xem lộ trình chi tiết
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:"0.1rem",opacity:0.7}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
    </a>
  )}
</div>
          </div>

          <div style={s.introRight}>
            {/* `tag` là nhãn badge trên card, có khoá dùng "Phổ biến nhất" — dùng
                nó ở ô category sẽ hiện "PHỔ BIẾN NHẤT" thay vì IELTS/TOEIC. */}
            <span style={s.tag}>{categoryLabel}</span>
            <h2 style={s.title}>{course.title}</h2>
            <p style={s.metaLine}>{course.level} · {course.format} · {course.duration}</p>

            <h3 style={s.h3}>Tổng quan</h3>
            <p style={s.paragraph}>{renderBold(detail.overview)}</p>

            <h3 style={s.h3}>Bạn sẽ học được gì</h3>
            <ul style={s.checklist}>
              {detail.whatYouLearn.map((point, i) => (
                <li key={i} style={s.checklistItem}>
                  <span style={s.checkIconWrap}><CheckIcon /></span>
                  <span>{renderBold(point)}</span>
                </li>
              ))}
            </ul>

            <h3 style={s.h3}>Buổi học diễn ra như thế nào</h3>
            <p style={s.paragraph}>{renderBold(detail.howLessonsWork)}</p>

            <h3 style={s.h3}>Phù hợp với ai</h3>
            <p style={s.paragraph}>{renderBold(detail.whoItsFor)}</p>
          </div>
        </div>

        {/* Pricing */}
        <div style={s.pricingSection}>
          <span style={s.sectionLabel}>✷ Pricing</span>
          <h3 style={s.sectionHeadline}>Bảng Giá Khóa Học</h3>
          <p style={s.sectionSubtext}>{detail.pricing.subtext}</p>

          <div style={s.billingToggleRow}>
            <span style={{ color: billing === "monthly" ? "var(--teach-ink)" : "var(--teach-text-secondary)" }}>Theo tháng</span>
            <button
              style={s.toggleTrack}
              onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
              aria-label="Chuyển đổi chu kỳ thanh toán"
              role="switch"
              aria-checked={billing === "annual"}
            >
              <motion.span
                style={s.toggleThumb}
                animate={{ x: billing === "annual" ? 20 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </button>
            <span style={{ color: billing === "annual" ? "var(--teach-ink)" : "var(--teach-text-secondary)" }}>Trọn khóa</span>
            <span style={s.savePill}>Đóng 1 lần</span>
          </div>

          <label style={s.studentCheckRow}>
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
              style={s.studentCheckbox}
            />
            Tôi là học sinh/sinh viên (giảm {detail.pricing.studentDiscountPercent}%)
          </label>

          <div style={s.plansGrid}>
            {detail.pricing.plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billing={billing}
                discountPercent={detail.pricing.studentDiscountPercent}
                isStudent={isStudent}
              />
            ))}
          </div>
        </div>

        {/* FAQ — dùng chung cho mọi khóa học */}
        <div style={s.faqSection}>
          <h3 style={s.sectionHeadline}>Câu hỏi thường gặp</h3>
          {(faqs || []).map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              buttonId={`${faqIdPrefix}-faq-button-${i}`}
              panelId={`${faqIdPrefix}-faq-panel-${i}`}
            />
          ))}
        </div>

        {/* Học viên nói gì — tái dùng dữ liệu testimonials chung của trang, hiện 1 cái tại 1 thời điểm */}
        <div style={s.studentsSection}>
          <h3 style={s.sectionHeadline}>Học viên nói gì</h3>

          {testimonialList.length > 0 && (
            <div style={s.studentsSingleWrap}>
              <div style={{ width: "100%", maxWidth: "30rem", overflow: "hidden" }}>
                <AnimatePresence mode="wait" custom={testimonialDirection}>
                  <motion.div
                    key={activeTestimonial.id}
                    style={s.studentCardSingle}
                    custom={testimonialDirection}
                    initial={(dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 })}
                    animate={{ opacity: 1, x: 0 }}
                    exit={(dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24 })}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <span style={s.studentQuoteIcon}>&ldquo;</span>
                    <p style={s.studentComment}>{activeTestimonial.quote}</p>
                    <span style={s.studentResultBadge}>🎉 {activeTestimonial.result}</span>
                    <div style={s.studentFooter}>
                      <Image src={activeTestimonial.avatar} alt={activeTestimonial.name} width={44} height={44} style={s.studentAvatar} />
                      <div>
                        <p style={s.studentName}>{activeTestimonial.name}</p>
                        <p style={s.studentRole}>{activeTestimonial.role}</p>
                      </div>
                      <span style={s.studentStars}>{"★".repeat(activeTestimonial.rating)}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {testimonialList.length > 1 && (
                <div style={s.studentNavRow}>
                  <button
                    className="course-modal-student-nav"
                    style={s.studentNavBtn}
                    onClick={prevTestimonial}
                    aria-label="Testimonial trước"
                  >
                    <ChevronLeftIcon />
                  </button>

                  <div style={s.studentDots}>
                    {testimonialList.map((item, i) => (
                      <button
                        key={item.id}
                        style={s.studentDot(i === testimonialIndex)}
                        onClick={() => goToTestimonial(i)}
                        aria-label={`Xem testimonial ${i + 1}`}
                        aria-current={i === testimonialIndex ? "true" : undefined}
                      />
                    ))}
                  </div>

                  <button
                    className="course-modal-student-nav"
                    style={s.studentNavBtn}
                    onClick={nextTestimonial}
                    aria-label="Testimonial tiếp theo"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
