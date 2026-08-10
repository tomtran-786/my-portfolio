"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import navData from "@/data/teaching/nav";
import MobileDrawer from "@/app/components/MobileDrawer";
import ThemeToggle from "@/app/components/ThemeToggle";

const s = {
  // Wrapper fixed neo trên cùng, căn giữa ngang
  navWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: "var(--z-nav)",
    padding: "0 var(--teach-content-gutter)",
    background: "var(--teach-nav-bg)",
    borderBottom: "1px solid var(--teach-border)",
    boxShadow: "var(--teach-nav-shadow)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    pointerEvents: "none",   // bắt click xuyên qua vùng trống
  },
  nav: {
    maxWidth: "75rem",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    gap: "clamp(1.25rem, 3vw, 3rem)",
    background: "transparent",
    padding: "0.85rem 0",
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
    background: "var(--teach-bg-soft)",
    border: "1px solid var(--teach-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--teach-text-secondary)",
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
    background: "var(--teach-brand)",
    color: "var(--teach-on-brand)",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: 20,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    whiteSpace: "nowrap",
  },
  accent: { color: "var(--teach-brand-deep)" },
  navLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2.5rem",
  },
  navLink: {
    position: "relative",
    color: "var(--teach-ink)",
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0 0 4px 0",
    outline: "none",
  },
  ctaBtn: {
    flexShrink: 0,
    background: "var(--teach-surface)",
    color: "var(--teach-brand-deep)",
    fontSize: 15,
    fontWeight: 600,
    padding: "0.85rem 1.75rem",
    borderRadius: "9999px",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "1.5px solid var(--teach-brand-deep)",
    outline: "none",
  },
  navActions: {
    alignItems: "center",
    display: "flex",
    gap: "0.65rem",
    justifySelf: "end",
  },
  burgerBtn: {
    display: "none",
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "var(--teach-bg-soft)",
    border: "1px solid var(--teach-border)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--teach-text)",
    flexShrink: 0,
    padding: 0,
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
  const lastHeightRef = useRef(70); // fallback ban đầu

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
      document.body.style.paddingTop = `${lastHeightRef.current}px`;
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
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    // Mồi bằng vị trí hiện tại: trình duyệt khôi phục scroll khi reload, mà lastY
    // khởi tạo 0 thì phép so sánh đầu tiên (currentY < 0) luôn sai -> navbar ẩn
    // ngay ở cú cuộn LÊN đầu tiên, đúng ngược lại ý đồ.
    lastY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Luôn hiện khi gần top (< 60px) hoặc khi drawer mở
      if (currentY < 60 || menuOpen) {
        setVisible(true);
      } else {
        setVisible(currentY < lastY.current);
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <>
      {/* id="top" phải nằm ở wrapper luôn-mounted, KHÔNG ở motion.nav bên trong:
          navbar unmount mỗi khi ẩn (visible=false), nên nếu id ở đó thì
          document.getElementById("top") trả null nửa thời gian và link /teaching#top
          im lặng không hoạt động. Wrapper fixed neo trên cùng nên vẫn đúng vị trí. */}
      <div style={s.navWrapper} ref={wrapperRef} id="top">
        <AnimatePresence>
        {visible && (
          <motion.nav
            key="navbar"
            aria-label="Điều hướng chính"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="nav-pill"
            style={s.nav}
          >
      <style>{`
        .nav-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .nav-cta:hover {
          background: var(--teach-brand-soft) !important;
          transform: translateY(-3px);
          box-shadow: var(--teach-shadow-hover);
        }

        /* Tablet hẹp không đủ chỗ cho 5 links + CTA; chuyển sang drawer trước
           khi nhãn bị ép thành nhiều dòng và làm navbar tăng chiều cao. */
        @media (max-width: 1050px) {
          .nav-pill { grid-template-columns: minmax(0, 1fr) auto !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
        }

        @media (max-width: 768px) {
          .nav-pill { padding: 0.6rem 0 !important; gap: 0.6rem !important; }
          .nav-logo-text { font-size: 17px !important; }
        }

        @media (max-width: 340px) {
          .nav-logo-text { display: none; }
        }

        .nav-burger:hover {
          background: var(--teach-brand-soft) !important;
          color: var(--teach-brand-deep) !important;
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
  <Image src="/teaching/english-svgrepo-com.svg" alt="English with Tom" width={40} height={40} style={s.logoIcon} />
  <span className="nav-logo-text" style={s.logoText}>
    {brand.name} {brand.accent}<span style={s.accent}>.</span>
  </span>
</button>
      </div>

      {/* Giữa: nav links */}
      <div className="nav-links" style={s.navLinks}>
        {links.map((link) => (
          <motion.button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            initial="initial"
            whileHover="hover"
            style={s.navLink}
            variants={{
              initial: { color: 'var(--teach-ink)' },
              hover: { color: 'var(--teach-brand-deep)' },
            }}
            transition={{ duration: 0.2 }}
          >
            {link.label}
            <motion.div
              variants={{
                initial: { width: '0%' },
                hover: { width: '100%' },
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                height: 2,
                background: 'var(--teach-brand)',
                borderRadius: 2,
              }}
            />
          </motion.button>
        ))}
      </div>

      <div style={s.navActions}>
        {/* Phải: CTA (desktop) */}
        <button className="nav-cta" style={s.ctaBtn} onClick={() => scrollTo(cta.href)}>
          {cta.label}
        </button>

        <ThemeToggle locale="vi" />

        {/* Phải: hamburger (mobile) */}
        <button
          className="nav-burger"
          style={s.burgerBtn}
          type="button"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>

    <MobileDrawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      links={links}
      cta={cta}
      theme="teaching"
    />
    </>
  );
}
