"use client";

import Image from "next/image";
import heroData from "@/data/teaching/hero";
import coursesData from "@/data/teaching/courses";
import { formatVnd, startingPrice, GOAL_EVENT } from "./courseUtils";

// Mục tiêu trên dòng prompt: id khớp category của coursesData.
const GOALS = [
  { id: "ielts", label: "IELTS" },
  { id: "toeic", label: "TOEIC" },
  { id: "giao-tiep", label: "Giao tiếp" },
];

function pickGoal(id) {
  window.dispatchEvent(new CustomEvent(GOAL_EVENT, { detail: id }));
  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const { headline, subtext, proof, cta } = heroData;
  const { items } = coursesData;
  const creds = proof.split(" · ");

  return (
    <section className="hero">
      <style>{`
        .hero {
          color: var(--teach-text);
          padding: clamp(2rem, 5vw, 4rem) var(--teach-content-gutter) clamp(2rem, 4vw, 3.5rem);
        }
        .hero-grid {
          align-items: center;
          display: grid;
          gap: clamp(2rem, 4vw, 4rem);
          grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
        }
        .hero-title {
          color: var(--teach-ink);
          font-size: clamp(2.5rem, 5.4vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.04;
          margin: 0 0 var(--sp-3);
        }
        .hero-title span { display: block; }
        .hero-sub {
          font-size: var(--fs-lead);
          line-height: 1.6;
          margin: 0 0 var(--sp-4);
          max-width: 34rem;
        }
        .hero-mono { font-family: var(--teach-mono); }

        /* Dòng prompt kiểu AI, viết bằng phấn. */
        .hero-prompt { color: var(--teach-paper); margin: 0 0 var(--sp-3); }
        .hero-cursor { animation: hero-blink 1.1s steps(1) infinite; color: var(--teach-brand); }
        @keyframes hero-blink { 50% { opacity: 0; } }
        .hero-goals { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin-bottom: var(--sp-5); }
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
          transition: background-color 0.2s, border-color 0.2s;
        }
        .hero-goal:hover { background: var(--teach-brand-soft); border-color: var(--teach-brand); }

        /* Trang vở bên phải, thẻ tên kẹp ở đầu trang. */
        .hero-page {
          background-color: #f4f6fc;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='36'%3E%3Cpath d='M0 35.5h4' stroke='%2325305e' stroke-opacity='0.12'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='4'%3E%3Cpath d='M1.5 0v4' stroke='%23e0453a' stroke-opacity='0.7' stroke-width='2'/%3E%3C/svg%3E");
          background-position: 0 0, 40px 0;
          background-repeat: repeat-y, no-repeat;
          background-size: 100% 36px, 3px 100%;
          border-radius: var(--r-md);
          box-shadow: 0 10px 0 rgba(0, 0, 0, 0.35);
          color: #25305e;
          padding: var(--sp-6) var(--sp-5) var(--sp-5) 4rem;
          position: relative;
          transform: rotate(1.2deg);
        }
        .hero-card {
          align-items: center;
          background: var(--teach-paper);
          border-radius: var(--r-sm);
          box-shadow: 0 3px 0 rgba(14, 23, 51, 0.25);
          color: var(--teach-board);
          display: flex;
          gap: var(--sp-3);
          margin: calc(-1 * var(--sp-8)) 0 var(--sp-4) calc(-1 * var(--sp-3));
          padding: var(--sp-3);
          transform: rotate(-2deg);
        }
        .hero-card img { border-radius: var(--r-sm); object-fit: cover; }
        .hero-card b { display: block; font-size: 1.25rem; line-height: 1.1; }
        .hero-card small { font-family: var(--teach-mono); font-size: var(--fs-label); }
        .hero-creds { display: flex; flex-wrap: wrap; gap: 0 var(--sp-3); }
        .hero-creds span { white-space: nowrap; }
        .hero-h { color: #0e1733; font-size: var(--fs-h3); font-weight: 700; margin: 0 0 var(--sp-3); }
        .hero-list { list-style: none; margin: 0; padding: 0; }
        .hero-list a {
          align-items: baseline;
          color: #0e1733;
          display: grid;
          gap: var(--sp-3);
          grid-template-columns: minmax(0, 1fr) auto;
          padding: var(--sp-3) 0;
          text-decoration: none;
        }
        .hero-list a:hover b { color: #9c4700; }
        .hero-list small { color: #4a557f; display: block; font-family: var(--teach-mono); font-size: var(--fs-label); }
        .hero-list em { color: #9c4700; font-family: var(--teach-mono); font-style: normal; font-weight: 700; white-space: nowrap; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-page { margin-top: var(--sp-7); transform: none; }
          .hero-list a { grid-template-columns: minmax(0, 1fr); gap: var(--sp-1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cursor { animation: none; }
        }
      `}</style>

      <div className="hero-grid">
        <div>
          <h1 className="hero-title">
            <span>{headline.before}</span>
            <span>{headline.after}</span>
          </h1>
          <p className="hero-sub">{subtext}</p>
          <p className="hero-prompt hero-mono">
            &gt; Bạn muốn đạt band nào?
            <span className="hero-cursor" data-impeccable-ignore="decorative-blinking-cursor" aria-hidden="true">▌</span>
          </p>
          <div className="hero-goals" role="group" aria-label="Chọn mục tiêu">
            {GOALS.map((g) => (
              <button key={g.id} type="button" className="hero-goal" onClick={() => pickGoal(g.id)}>
                {g.label}
              </button>
            ))}
          </div>
          <a
            href={cta.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ minHeight: 52, fontSize: "1.0625rem" }}
          >
            <i className="ti ti-message-circle" aria-hidden="true" />
            {cta.primary.label}
          </a>
        </div>

        <div className="hero-page">
          <div className="hero-card">
            <Image src="/teaching/me.jpeg" alt="Thầy Tom" width={56} height={66} />
            <div>
              <b>Tuấn (Tom) Tran</b>
              <small className="hero-creds">{creds.slice(0, 2).map((c) => <span key={c}>{c}</span>)}</small>
            </div>
          </div>
          <h2 className="hero-h">Các khóa đang dạy</h2>
          <ul className="hero-list">
            {items.map((item) => {
              const plan = startingPrice(item);
              return (
                <li key={item.id}>
                  <a href="#courses" onClick={(e) => { e.preventDefault(); pickGoal(item.category); }}>
                    <span>
                      <b>{item.title}</b>
                      <small>{item.level.replace(/ → /g, "\u00a0→\u00a0")}</small>
                    </span>
                    {plan && <em>từ {formatVnd(plan.monthlyPrice)}/tháng</em>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
