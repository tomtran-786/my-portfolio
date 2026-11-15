"use client";

import { useEffect, useState } from "react";
import ctaData from "@/data/teaching/cta";

/*
 * Thanh Zalo cố định ở đáy màn hình, chỉ trên mobile.
 * Hiện sau khi cuộn qua hero; ẩn khi đang xem phần liên hệ hoặc footer,
 * vì ở đó đã có sẵn nút Zalo cùng nội dung.
 */
export default function StickyZaloBar() {
  const zalo = ctaData.buttons.find((btn) => btn.primary);
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Dùng id, không dùng querySelector("footer"): thẻ học viên cũng có <footer>.
    const targets = [document.getElementById("contact"), document.getElementById("footer")].filter(Boolean);
    if (targets.length === 0) return;
    const inView = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      });
      setAtContact(inView.size > 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!zalo) return null;
  const visible = pastHero && !atContact;

  return (
    <div
      className="sticky-zalo"
      data-visible={visible ? "true" : "false"}
      // inert khi ẩn để nút không nhận focus bàn phím lúc đang ngoài màn hình.
      inert={visible ? undefined : true}
    >
      <style>{`
        .sticky-zalo { display: none; }
        @media (max-width: 768px) {
          .sticky-zalo {
            background: var(--teach-surface);
            border-top: 1px solid var(--teach-border);
            bottom: 0;
            display: block;
            left: 0;
            padding: 0.75rem var(--teach-content-gutter) calc(0.75rem + env(safe-area-inset-bottom));
            position: fixed;
            right: 0;
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            transform: translateY(100%);
            z-index: var(--z-gototop);
          }
          .sticky-zalo[data-visible="true"] { transform: translateY(0); }
          .sticky-zalo .btn { width: 100%; min-height: 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sticky-zalo { transition: none; }
        }
      `}</style>
      <a
        href={zalo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary"
      >
        <i className={`ti ${zalo.icon}`} aria-hidden="true" />
        {zalo.label}
      </a>
    </div>
  );
}
