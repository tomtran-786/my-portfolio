"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import navData from "@/data/teaching/nav";

const s = {
  // Wrapper fixed neo trên cùng, căn giữa ngang
  navWrapper: {
    position: "fixed",
    top: "1.5rem",
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "0 1rem",
    pointerEvents: "none",   // bắt click xuyên qua vùng trống
  },
  nav: {
    maxWidth: "72rem",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    background: "rgba(54,49,78,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    pointerEvents: "auto",   // khôi phục click cho chính navbar
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    flexShrink: 0,
  },
  backBtn: {
    width: 38, height: 38,
    borderRadius: "50%",
    background: "#373254",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#C9C5DC",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    outline: "none",
  },
  logoIcon: {
    width: 40, height: 40,
    borderRadius: "12px",
    background: "#F2684A",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 700,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
  },
  accent: { color: "#F2684A" },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  },
  navLink: {
    position: "relative",
    color: "#E5E5E5",
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Montserrat, sans-serif",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0 0 4px 0",
    outline: "none",
  },
  ctaBtn: {
    flexShrink: 0,
    background: "#F2684A",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    padding: "0.85rem 1.75rem",
    borderRadius: "9999px",
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
};

function scrollTo(href) {
  if (href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function TeachingNavbar() {
  const { brand, links, cta, backLink } = navData;

  // Đo chiều cao thực của navbar và apply trực tiếp vào body.paddingTop.
  // KHÔNG dùng spacer div nữa: spacer chỉ đẩy được sibling cùng nhánh DOM,
  // còn TeachingNavbar và HeroSection nằm ở 2 nhánh khác nhau (qua <main>
  // trong layout.js) nên spacer không có tác dụng → navbar che nội dung.
  // body.style hoạt động bất kể cấu trúc DOM, đây là cách chuẩn cho fixed navbar.
  const wrapperRef = useRef(null);
  const lastHeightRef = useRef(88); // fallback ban đầu

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const apply = () => {
      const h = el.getBoundingClientRect().bottom;
      // Khi navbar tự ẩn lúc cuộn xuống, wrapper co về ~0 chiều cao.
      // Chỉ ghi đè lastHeightRef khi đo được chiều cao "thật" (navbar đang hiện),
      // để padding-top không bị co lại theo, tránh giật layout.
      if (h > lastHeightRef.current * 0.5) {
        lastHeightRef.current = h;
      }
      document.body.style.paddingTop = `${lastHeightRef.current + 40}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);

    return () => {
      ro.disconnect();
      document.body.style.paddingTop = "";
    };
  }, []);

  // Ẩn khi scroll xuống, hiện khi scroll lên
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Luôn hiện khi gần top (< 60px)
      if (currentY < 60) {
        setVisible(true);
      } else {
        setVisible(currentY < lastY.current);
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={s.navWrapper} ref={wrapperRef}>
        <AnimatePresence>
        {visible && (
          <motion.nav
            key="navbar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={s.nav}
            id="top"
          >
      <style>{`
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: #F2694B;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .nav-cta:hover {
          background: #ff7c5c;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(242, 104, 74, 0.4);
        }
      `}</style>

      {/* Trái: back + logo */}
      <div style={s.left}>
        <Link href={backLink.href} title={backLink.label} style={s.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>

        <button style={s.logoBtn} onClick={() => scrollTo("#top")}>
  <img src="/teaching/english-svgrepo-com.svg" alt="English with Tom" style={s.logoIcon} />
  <span style={s.logoText}>
    {brand.name} {brand.accent}<span style={s.accent}>.</span>
  </span>
</button>
      </div>

      {/* Giữa: nav links */}
      <div style={s.navLinks}>
        {links.map((link) => (
          <button
            key={link.href}
            className="nav-link"
            style={s.navLink}
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Phải: CTA */}
      <button className="nav-cta" style={s.ctaBtn} onClick={() => scrollTo(cta.href)}>
        {cta.label}
      </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}