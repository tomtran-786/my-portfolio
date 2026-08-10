"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeachingGoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    // Trình duyệt khôi phục vị trí cuộn khi reload -> phải đọc scrollY ngay lúc
    // mount, không thì nút vẫn ẩn dù đang ở giữa trang.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          title="Về đầu trang"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: "var(--z-gototop)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--teach-surface)",
            border: "1.5px solid var(--teach-brand-deep)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--teach-brand-deep)",
            boxShadow: "0 4px 18px rgba(65, 48, 40, 0.16)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
