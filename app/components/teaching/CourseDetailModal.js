"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const s = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,13,26,0.75)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: 100,
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
    background: "#2A2640",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1.75rem",
    padding: "2.5rem",
    boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
  },
  closeBtn: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#373254",
    border: "none",
    color: "#C9C5DC",
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
    borderRadius: "1.25rem",
    overflow: "hidden",
    aspectRatio: "4 / 3",
    background: "#373254",
  },
  image: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  ctaHeadline: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.2rem",
    lineHeight: 1.35,
  },
ctaRow: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.9rem" },
ctaPrimary: {
  background: "#F2684A",
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  padding: "0.85rem 1.5rem",
  borderRadius: "9999px",
  border: "none",
  cursor: "pointer",
  fontFamily: "Montserrat, sans-serif",
  transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
},
syllabusLink: {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: 13,
  fontWeight: 600,
  color: "#F2684A",
  textDecoration: "none",
  fontFamily: "Montserrat, sans-serif",
  background: "rgba(242,104,74,0.08)",
  border: "1px solid rgba(242,104,74,0.22)",
  borderRadius: "9999px",
  padding: "0.6rem 1rem",
  transition: "all 0.25s ease",
  cursor: "pointer",
},
  introRight: { display: "flex", flexDirection: "column" },
  tag: {
    color: "#F2684A",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "Montserrat, sans-serif",
  },
  title: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.85rem",
    margin: "0.2rem 0 0.4rem 0",
  },
  metaLine: {
    color: "#E5E5E5",
    fontSize: 13,
    fontFamily: "Montserrat, sans-serif",
    marginBottom: "1.25rem",
  },
  h3: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: "#fff",
    fontSize: "1.1rem",
    margin: "1.5rem 0 0.6rem 0",
  },
  paragraph: {
    color: "#E5E5E5",
    fontSize: 14.5,
    lineHeight: 1.8,
    fontFamily: "Montserrat, sans-serif",
  },
  checklist: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" },
  checklistItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    color: "#E5E5E5",
    fontSize: 14.5,
    fontFamily: "Montserrat, sans-serif",
    lineHeight: 1.6,
  },
  checkIconWrap: { marginTop: 2, flexShrink: 0 },

  // Pricing
  pricingSection: {
    textAlign: "center",
    padding: "2.5rem 0",
    borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  sectionLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "#373254",
    color: "#F2684A",
    fontSize: 12,
    fontWeight: 600,
    padding: "0.35rem 0.9rem",
    borderRadius: "9999px",
    marginBottom: "1rem",
    fontFamily: "Montserrat, sans-serif",
  },
  sectionHeadline: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.6rem",
    marginBottom: "0.6rem",
  },
  sectionSubtext: {
    color: "#E5E5E5",
    fontSize: 14,
    maxWidth: "32rem",
    margin: "0 auto 1.5rem auto",
    fontFamily: "Montserrat, sans-serif",
    lineHeight: 1.7,
  },
  billingToggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1.25rem",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
  },
  studentCheckRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13.5,
    color: "#E5E5E5",
    cursor: "pointer",
  },
  studentCheckbox: {
    width: 16,
    height: 16,
    accentColor: "#F2684A",
    cursor: "pointer",
  },
  priceOriginal: {
    fontSize: "1.05rem",
    color: "#7A7494",
    textDecoration: "line-through",
    fontWeight: 600,
    marginRight: "0.5rem",
  },
  fromLabel: {
    display: "inline-block",
    background: "rgba(242,104,74,0.15)",
    color: "#F2684A",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    padding: "0.2rem 0.55rem",
    borderRadius: "9999px",
    marginBottom: "0.5rem",
    fontFamily: "Montserrat, sans-serif",
  },
  toggleTrack: {
    width: 46,
    height: 26,
    borderRadius: "9999px",
    background: "#373254",
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
    background: "#F2684A",
  },
  savePill: {
    background: "rgba(242,104,74,0.15)",
    color: "#F2684A",
    fontSize: 12,
    fontWeight: 700,
    padding: "0.25rem 0.7rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
  },
  plansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    textAlign: "left",
  },
  planCard: (popular) => ({
    background: popular ? "#3D2E5E" : "#231f38",
    border: popular ? "1.5px solid #F2684A" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1.25rem",
    padding: "1.5rem",
    position: "relative",
  }),
  popularTag: {
    position: "absolute",
    top: "1.25rem",
    right: "1.25rem",
    background: "#fff",
    color: "#F2684A",
    fontSize: 10.5,
    fontWeight: 700,
    padding: "0.2rem 0.6rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
  },
  planName: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    color: "#fff",
    fontSize: 15,
    marginBottom: "0.6rem",
  },
  planPrice: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1.9rem",
    marginBottom: "0.5rem",
  },
  planPriceUnit: { fontSize: 12.5, fontWeight: 500, color: "#E5E5E5" },
  planDesc: {
    color: "#E5E5E5",
    fontSize: 13,
    lineHeight: 1.6,
    fontFamily: "Montserrat, sans-serif",
  },

  // FAQ
  faqSection: { padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.07)" },
  faqItem: { borderBottom: "1px solid rgba(255,255,255,0.07)" },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    color: "#fff",
    fontFamily: "Montserrat, sans-serif",
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
    color: "#F2684A",
    fontSize: 18,
    transition: "transform 0.2s ease",
    flexShrink: 0,
    marginLeft: "1rem",
    display: "inline-block",
  },
  faqAnswer: {
    color: "#E5E5E5",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
    paddingBottom: "1rem",
    margin: 0,
  },

  // Students say (testimonials)
  studentsSection: { padding: "2rem 0 0.5rem 0", borderTop: "1px solid rgba(255,255,255,0.07)" },
  studentsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
    marginTop: "1.25rem",
  },
  studentCard: {
    background: "#231f38",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "1.1rem",
    padding: "1.25rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  studentQuoteIcon: {
    color: "#F2684A",
    fontSize: 28,
    lineHeight: 1,
    fontFamily: "Georgia, serif",
    marginBottom: "-0.4rem",
  },
  studentComment: {
    color: "#E5E5E5",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
    fontStyle: "italic",
  },
  studentResultBadge: {
    display: "inline-block",
    background: "rgba(242,104,74,0.15)",
    color: "#F2684A",
    fontSize: 11.5,
    fontWeight: 700,
    padding: "0.25rem 0.65rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
    alignSelf: "flex-start",
  },
  studentFooter: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: "0.9rem",
  },
  studentAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #F2684A",
    flexShrink: 0,
  },
  studentName: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "Montserrat, sans-serif",
  },
  studentRole: {
    color: "#E5E5E5",
    fontSize: 11.5,
    fontFamily: "Montserrat, sans-serif",
  },
  studentStars: {
    display: "flex",
    gap: 1,
    color: "#F2684A",
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
    background: "#231f38",
    border: "1px solid rgba(255,255,255,0.07)",
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
    background: "#373254",
    border: "none",
    color: "#E5E5E5",
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
    background: active ? "#F2684A" : "rgba(255,255,255,0.18)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.25s ease",
  }),
};

// Render text với **keyword** → <strong> bold, màu trắng sáng hơn để nổi bật
function renderBold(text) {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "#fff", fontWeight: 700 }}>{part}</strong>
      : part
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2684A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div style={s.faqItem}>
      <button style={s.faqQuestion} onClick={onToggle}>
        <span>{faq.question}</span>
        <span style={{ ...s.faqChevron, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
      </button>
      {isOpen && <p style={s.faqAnswer}>{faq.answer}</p>}
    </div>
  );
}

export default function CourseDetailModal({ course, faqs, testimonials, onClose }) {
  const [billing, setBilling] = useState("monthly");
  const [isStudent, setIsStudent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);

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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!course || !course.detail) return null;
  const { detail } = course;

function goToContact() {
  document.body.style.overflow = "";
  onClose();
  setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

function openSyllabus() {
  if (detail.syllabusUrl) {
    window.open(detail.syllabusUrl, "_blank", "noopener,noreferrer");
  }
}
  return (
    <motion.div
      style={s.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <style>{`
        .course-modal-cta-primary:hover {
          background: #ff7c5c;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(242, 104, 74, 0.4);
        }
        .course-modal-syllabus-link:hover {
          background: rgba(242,104,74,0.15);
          border-color: rgba(242,104,74,0.45);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(242,104,74,0.18);
          color: #ff7c5c;
        }
        .course-modal-close:hover {
          background: #F2684A;
          color: #fff;
        }
        .course-modal-student-nav:hover {
          background: #F2684A;
          color: #fff;
        }
        @media (max-width: 700px) {
          .course-modal-intro { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <motion.div
        style={s.panel}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="course-modal-close" style={s.closeBtn} onClick={onClose} aria-label="Đóng">
          <CloseIcon />
        </button>

        {/* Ảnh + CTA (trái) / Overview - What you'll learn - How it works - Who it's for (phải) */}
        <div className="course-modal-intro" style={s.introGrid}>
          <div style={s.introLeft}>
            <div style={s.imageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={detail.image.src} alt={detail.image.alt} style={s.image} />
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
            <span style={s.tag}>{course.tag}</span>
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
            <span style={{ color: billing === "monthly" ? "#fff" : "#ADA8C4" }}>Theo tháng</span>
            <button
              style={s.toggleTrack}
              onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
              aria-label="Chuyển đổi chu kỳ thanh toán"
            >
              <motion.span
                style={s.toggleThumb}
                animate={{ x: billing === "annual" ? 20 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </button>
            <span style={{ color: billing === "annual" ? "#fff" : "#ADA8C4" }}>Trọn khóa</span>
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
            <FaqItem key={i} faq={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
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
                    <span style={s.studentQuoteIcon}>"</span>
                    <p style={s.studentComment}>{activeTestimonial.quote}</p>
                    <span style={s.studentResultBadge}>🎉 {activeTestimonial.result}</span>
                    <div style={s.studentFooter}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activeTestimonial.avatar} alt={activeTestimonial.name} style={s.studentAvatar} />
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