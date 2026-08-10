"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import classMoments, { classMomentsHeading } from "@/data/teaching/classMoments";

const s = {
  wrapper: {
    margin: 0,
  },
  heading: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand-deep)",
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
    lineHeight: 1.15,
    margin: 0,
    maxWidth: "36rem",
  },
  stage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 8.2",
    borderRadius: "1.5rem",
    overflow: "hidden",
    background: "var(--teach-surface-muted)",
    border: "1px solid var(--teach-border)",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  caption: {
    borderLeft: "3px solid var(--teach-brand)",
    color: "var(--teach-text)",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.7,
    paddingLeft: "1rem",
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 44, height: 44,
    borderRadius: "50%",
    background: "rgba(47, 39, 35, 0.62)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  dots: { display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" },
  dot: { height: 8, borderRadius: "9999px", border: "none", cursor: "pointer", padding: 0 },
};

function ArrowIcon({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: direction === "prev" ? "rotate(180deg)" : "none" }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ClassMomentsSection() {
  const [index, setIndex] = useState(0);
  const hasMultiple = classMoments.length > 1;
  const current = classMoments[index];

  // data/teaching/classMoments.js mời người dùng tự thêm/bớt ảnh lớp. Mảng rỗng
  // (hoặc index vượt biên) mà không guard sẽ ném khi đọc current.src và làm sập
  // toàn bộ trang /teaching, chứ không chỉ mất mỗi carousel.
  if (!current) return null;

  const goTo = (i) => {
    const total = classMoments.length;
    setIndex(((i % total) + total) % total);
  };

  return (
    <section className="teach-section teach-section-soft" style={s.wrapper} id="class-moments">
      <style>{`
        .moment-nav-btn { transition: background 0.2s ease, transform 0.2s ease; }
        .moment-nav-btn:hover { background: rgba(var(--teach-brand-rgb), 0.92) !important; color: var(--teach-on-brand) !important; transform: translateY(-50%) scale(1.06); }
        .moment-dot { transition: background 0.2s ease, width 0.2s ease; }
        @media (max-width: 600px) {
          .moment-stage { aspect-ratio: 4 / 3 !important; border-radius: 1rem !important; }
        }
      `}</style>

      <div className="teach-section-heading">
        <h2 style={s.heading}>{classMomentsHeading}</h2>
        {current.caption && (
          <p className="teach-section-context" style={s.caption} aria-live="polite">
            {current.caption}
          </p>
        )}
      </div>

      <div className="moment-stage" style={s.stage}>
        <AnimatePresence mode="wait">
          {/* Bọc motion.div quanh next/image: <Image fill> tự set position/inset
              nên không nhận được style animate trực tiếp như motion.img trước đây. */}
          <motion.div
            key={current.src}
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Image
              src={current.src}
              alt={current.caption}
              fill
              sizes="(max-width: 900px) 100vw, 75rem"
              priority
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>

        {hasMultiple && (
          <>
            <button aria-label="Ảnh trước" className="moment-nav-btn"
              style={{ ...s.navBtn, left: "1rem" }} onClick={() => goTo(index - 1)}>
              <ArrowIcon direction="prev" />
            </button>
            <button aria-label="Ảnh tiếp theo" className="moment-nav-btn"
              style={{ ...s.navBtn, right: "1rem" }} onClick={() => goTo(index + 1)}>
              <ArrowIcon direction="next" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div style={s.dots}>
          {classMoments.map((_, i) => (
            <button
              key={i}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className="moment-dot"
              style={{ ...s.dot, width: i === index ? 22 : 8, background: i === index ? "var(--teach-brand)" : "var(--teach-border-strong)" }}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
