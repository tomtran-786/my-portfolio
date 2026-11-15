"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import heroData from "@/data/teaching/hero";
import coursesData from "@/data/teaching/courses";
import { formatVnd, startingPrice, GOAL_EVENT } from "./courseUtils";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Mục tiêu trên dòng prompt: id khớp category của coursesData.
const GOALS = [
  { id: "ielts", label: "IELTS" },
  { id: "toeic", label: "TOEIC" },
  { id: "giao-tiep", label: "Giao tiếp" },
];

function scrollToCourses() {
  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
}

function pickGoal(id) {
  window.dispatchEvent(new CustomEvent(GOAL_EVENT, { detail: id }));
  scrollToCourses();
}

export default function HeroSection() {
  const { headline, subtext, proof, cta, socialProof } = heroData;
  const reduce = useReducedMotion();
  const { items } = coursesData;

  return (
    <motion.section
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <style>{`
        .hero {
          padding: clamp(2rem, 5vw, 4rem) var(--teach-content-gutter) clamp(2rem, 4vw, 3.5rem);
        }
        .hero-title {
          color: var(--teach-ink);
          font-size: clamp(2.25rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          margin: 0 0 var(--sp-3) 0;
          max-width: 18ch;
        }
        .hero-part { display: block; }
        .hero-sub {
          color: var(--teach-text);
          font-size: var(--fs-lead);
          line-height: 1.6;
          margin: 0;
          max-width: 40rem;
        }
        .hero-grid {
          align-items: start;
          display: grid;
          gap: clamp(2rem, 5vw, 4.5rem);
          grid-template-columns: minmax(0, 27rem) minmax(0, 1fr);
          margin-top: clamp(1.75rem, 3.5vw, 3rem);
        }

        /* Thẻ tên ghim trên bảng. */
        .name-card {
          background: var(--teach-paper);
          border-radius: var(--r-md);
          box-shadow: 0 10px 0 rgba(0, 0, 0, 0.35);
          color: var(--teach-board);
          padding: var(--sp-5);
          position: relative;
          transform: rotate(-1.5deg);
        }
        .name-card__pin {
          background: var(--teach-brand);
          border-radius: 50%;
          height: 18px;
          left: 50%;
          position: absolute;
          top: -8px;
          width: 18px;
        }
        .name-card__top { align-items: center; display: flex; gap: var(--sp-4); }
        .name-card__photo { border-radius: var(--r-sm); flex-shrink: 0; object-fit: cover; }
        .name-card__name { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; margin: 0; }
        .name-card__role { font-size: var(--fs-small); margin: var(--sp-1) 0 0 0; }
        .name-card__creds { display: flex; flex-wrap: wrap; gap: var(--sp-2); list-style: none; margin: var(--sp-4) 0; padding: 0; }
        .name-card__creds li {
          border: 1px solid rgba(14, 23, 51, 0.35);
          border-radius: var(--r-sm);
          font-family: var(--teach-mono);
          font-size: var(--fs-label);
          padding: 0.1rem 0.5rem;
        }
        .name-card .btn { width: 100%; }

        /* Dòng prompt kiểu AI, viết bằng phấn. */
        .hero-prompt { margin: 0 0 var(--sp-4) 0; }
        .hero-prompt__line {
          color: var(--teach-paper);
          font-family: var(--teach-mono);
          font-size: var(--fs-body);
          margin: 0 0 var(--sp-3) 0;
        }
        .hero-prompt__cursor {
          animation: hero-blink 1.1s steps(1) infinite;
          color: var(--teach-brand);
        }
        @keyframes hero-blink { 50% { opacity: 0; } }
        .hero-prompt__goals { display: flex; flex-wrap: wrap; gap: var(--sp-2); }
        .hero-goal {
          background: transparent;
          border: 1px solid var(--teach-border);
          border-radius: var(--r-pill);
          color: var(--teach-ink);
          cursor: pointer;
          font-size: var(--fs-label);
          font-weight: 600;
          min-height: 44px;
          padding: 0 var(--sp-4);
          transition: background-color 0.2s, border-color 0.2s, color 0.2s;
        }
        .hero-goal:hover { background: var(--teach-brand-soft); border-color: var(--teach-brand); }

        /* Các khóa viết bằng phấn, mỗi dòng cuộn xuống khu vực khóa học. */
        .chalk-list { list-style: none; margin: 0; padding: 0; }
        .chalk-list li + li { border-top: 2px dashed var(--teach-border); }
        .chalk-row {
          align-items: baseline;
          color: var(--teach-ink);
          display: grid;
          gap: var(--sp-3);
          grid-template-columns: minmax(0, 1fr) auto;
          padding: var(--sp-3) 0;
          text-decoration: none;
        }
        .chalk-row:hover .chalk-row__name { color: var(--teach-brand-deep); }
        .chalk-row__name { font-size: var(--fs-h3); font-weight: 600; transition: color 0.2s; }
        .chalk-row__meta { color: var(--teach-text-secondary); display: block; font-family: var(--teach-mono); font-size: var(--fs-label); font-weight: 400; margin-top: 2px; }
        .chalk-row__price { color: var(--teach-brand-deep); font-family: var(--teach-mono); font-size: var(--fs-body); font-weight: 700; white-space: nowrap; }
        .hero-proof { color: var(--teach-text-secondary); font-size: var(--fs-label); margin: var(--sp-4) 0 0 0; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .name-card { max-width: 30rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-prompt__cursor { animation: none; }
          .name-card { transform: none; }
        }
      `}</style>

      <motion.h1 variants={fadeUp} className="hero-title">
        <span className="hero-part">{headline.before}</span>{" "}
        <span className="hero-part">{headline.after}</span>
      </motion.h1>
      <motion.p variants={fadeUp} className="hero-sub">{subtext}</motion.p>

      <div className="hero-grid">
        <motion.div variants={fadeUp} className="name-card">
          <span className="name-card__pin" aria-hidden="true" />
          <div className="name-card__top">
            <Image
              className="name-card__photo"
              src="/teaching/me.jpeg"
              alt="Thầy Tom"
              width={96}
              height={112}
            />
            <div>
              <p className="name-card__name">Tuấn (Tom) Tran</p>
              <p className="name-card__role">Giáo viên IELTS, TOEIC và giao tiếp</p>
            </div>
          </div>
          <ul className="name-card__creds" aria-label="Chứng chỉ">
            {proof.split(" · ").map((c) => <li key={c}>{c}</li>)}
          </ul>
          <motion.a
            href={cta.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ minHeight: 52, fontSize: "1.0625rem" }}
            whileHover={reduce ? undefined : { scale: 1.02 }}
          >
            <i className="ti ti-message-circle" aria-hidden="true" />
            {cta.primary.label}
          </motion.a>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="hero-prompt">
            <p className="hero-prompt__line">
              &gt; Bạn muốn đạt band nào?
              <span className="hero-prompt__cursor" data-impeccable-ignore="decorative-blinking-cursor" aria-hidden="true">▌</span>
            </p>
            <div className="hero-prompt__goals" role="group" aria-label="Chọn mục tiêu">
              {GOALS.map((g) => (
                <button key={g.id} type="button" className="hero-goal" onClick={() => pickGoal(g.id)}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="chalk-list" aria-label="Các khóa đang dạy">
            {items.map((item) => {
              const plan = startingPrice(item);
              return (
                <li key={item.id}>
                  <a
                    className="chalk-row"
                    href="#courses"
                    onClick={(e) => { e.preventDefault(); pickGoal(item.category); }}
                  >
                    <span className="chalk-row__name">
                      {item.title}
                      <span className="chalk-row__meta">{item.level}</span>
                    </span>
                    {plan && <span className="chalk-row__price">{formatVnd(plan.monthlyPrice)}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="hero-proof">{socialProof.count}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
