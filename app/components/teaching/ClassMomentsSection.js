"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import classMoments, { classMomentsHeading } from "@/data/teaching/classMoments";

const s = {
  heading: {
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.15,
    margin: 0,
    maxWidth: "36rem",
  },
  caption: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-body)",
    lineHeight: 1.6,
  },
  dots: { display: "flex", justifyContent: "center", marginTop: "0.75rem" },
  // Vùng bấm 32px, chấm nhìn thấy vẫn nhỏ.
  dot: {
    minWidth: 32, height: 32, padding: 0,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    background: "transparent", border: "none", cursor: "pointer",
  },
  dotMark: { display: "block", height: 8, borderRadius: "var(--r-pill)" },
};

function ArrowIcon({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
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

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="teach-section teach-section-soft" id="class-moments">
      <div className="teach-section-heading">
        <h2 style={s.heading}>{classMomentsHeading}</h2>
        {current.caption && (
          <p className="teach-section-context" style={s.caption} aria-live="polite">
            {current.caption}
          </p>
        )}
      </div>

      {/* Khung ngắm: bốn góc ngoặc cam, bộ đếm đơn cách bên dưới. */}
      <div className="moment-frame">
        <div className="moment-shot">
          <i className="tl" aria-hidden="true" />
          <i className="tr" aria-hidden="true" />
          <i className="bl" aria-hidden="true" />
          <i className="br" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Image
                className="moment-img"
                src={current.src}
                alt={current.caption}
                width={1600}
                height={900}
                sizes="(max-width: 900px) 100vw, 70rem"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <button type="button" aria-label="Ảnh trước" className="moment-nav moment-nav--prev" onClick={() => goTo(index - 1)}>
                <ArrowIcon direction="prev" />
              </button>
              <button type="button" aria-label="Ảnh tiếp theo" className="moment-nav moment-nav--next" onClick={() => goTo(index + 1)}>
                <ArrowIcon direction="next" />
              </button>
            </>
          )}
        </div>
        <p className="moment-count">{pad(index + 1)} / {pad(classMoments.length)}</p>
      </div>

      {hasMultiple && (
        <div style={s.dots}>
          {classMoments.map((_, i) => (
            <button
              key={i}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              style={s.dot}
              onClick={() => goTo(i)}
            >
              <span
                aria-hidden="true"
                className="moment-dot-mark"
                style={{ ...s.dotMark, width: i === index ? 22 : 8, background: i === index ? "var(--teach-brand)" : "var(--teach-border-strong)" }}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
