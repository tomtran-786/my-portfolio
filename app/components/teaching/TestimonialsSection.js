"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import testimonialsData from "@/data/teaching/testimonials";

const ITEMS_PER_PAGE = 3;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const s = {
  section: {
    margin: 0,
  },
  header: { marginBottom: "3rem", textAlign: "center" },
  headline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand-deep)",
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
    marginBottom: "0.75rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: 15,
    lineHeight: 1.7,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "var(--teach-surface)",
    border: "1px solid var(--teach-border)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    cursor: "default",
    boxShadow: "var(--teach-shadow-card)",
  },
  quoteIcon: {
    color: "var(--teach-brand-deep)",
    fontSize: 36,
    lineHeight: 1,
    fontFamily: "Georgia, serif",
    marginBottom: "-0.5rem",
  },
  quote: {
    color: "var(--teach-text)",
    fontSize: 14,
    lineHeight: 1.8,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    flexGrow: 1,
    fontStyle: "italic",
  },
  resultBadge: {
    display: "inline-block",
    background: "rgba(var(--teach-brand-rgb), 0.15)",
    color: "var(--teach-brand-deep)",
    fontSize: 12,
    fontWeight: 700,
    padding: "0.3rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderTop: "1px solid var(--teach-border)",
    paddingTop: "1.25rem",
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
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: 14,
  },
  role: {
    color: "var(--teach-text)",
    fontSize: 12,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  stars: {
    display: "flex",
    gap: 2,
    color: "var(--teach-brand-deep)",
    marginLeft: "auto",
  },
  // Pagination controls
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2.5rem",
  },
  pageBtn: (disabled) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: disabled ? "var(--teach-bg-soft)" : "var(--teach-surface-muted)",
    border: "1px solid var(--teach-border)",
    color: disabled ? "var(--teach-text-secondary)" : "var(--teach-text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
    flexShrink: 0,
  }),
  pageDots: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  pageDot: (active) => ({
    width: active ? 22 : 8,
    height: 8,
    borderRadius: "9999px",
    background: active ? "var(--teach-brand)" : "var(--teach-border-strong)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "width 0.25s ease, background 0.25s ease",
  }),
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.3 4.4 18.2l1.1-6.2L1 7.6l6.2-.9z" />
    </svg>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export default function TestimonialsSection() {
  const { headline, subtext, items } = testimonialsData;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goToPage = (p) => {
    if (p < 0 || p >= totalPages) return;
    setPage(p);
  };

  return (
    <section className="teach-section" style={s.section} id="testimonials">
      {/* Header */}
      <motion.div
        style={s.header}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 style={s.headline}>{headline}</h2>
        <p style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Cards — đổi page sẽ fade ra/vào */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          style={s.grid}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stagger}
        >
          {paginatedItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              style={s.card}
              whileHover={{
                y: -10,
                boxShadow: "var(--teach-shadow-hover)",
                borderColor: "var(--teach-border-strong)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div style={s.quoteIcon}>&ldquo;</div>
              <p style={s.quote}>{item.quote}</p>
              <span style={s.resultBadge}>🎉 {item.result}</span>
              <div style={s.footer}>
                <Image src={item.avatar} alt={item.name} width={44} height={44} style={s.avatar} />
                <div>
                  <p style={s.name}>{item.name}</p>
                  <p style={s.role}>{item.role}</p>
                </div>
                <div style={s.stars}>
                  {Array.from({ length: item.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination — chỉ hiện khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <div style={s.pagination}>
          <button
            style={s.pageBtn(page === 0)}
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            aria-label="Trang trước"
          >
            <ArrowIcon direction="left" />
          </button>

          <div style={s.pageDots}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                style={s.pageDot(i === page)}
                onClick={() => goToPage(i)}
                aria-label={`Trang ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
              />
            ))}
          </div>

          <button
            style={s.pageBtn(page === totalPages - 1)}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Trang sau"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      )}
    </section>
  );
}
