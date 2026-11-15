"use client";

import { motion } from "framer-motion";
import ctaData from "@/data/teaching/cta";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Hai nút liên hệ: Zalo (chính, mở tab mới) và email (mailto: không cần target).
function CtaButtons({ buttons }) {
  return buttons.map((btn) => (
    <a
      key={btn.label}
      href={btn.href}
      {...(btn.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn cta-btn ${btn.primary ? "btn--primary" : "btn--secondary"}`}
    >
      <i className={`ti ${btn.icon}`} aria-hidden="true" />
      {btn.label}
    </a>
  ));
}

export default function CTASection() {
  const { headline, subtext, buttons, contactLine, note } = ctaData;

  return (
    <section className="teach-section teach-section-soft" id="contact">
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        {/* Phiếu giấy ghim trên bảng; dòng liên hệ nằm dưới đường xé nét đứt. */}
        <div className="cta-slip">
          <h2>{headline}</h2>
          <p className="cta-slip__sub">{subtext}</p>
          <div className="cta-slip__row"><CtaButtons buttons={buttons} /></div>
          <div className="cta-slip__tear">
            <p>{contactLine}</p>
            <p className="cta-slip__note"><i className="ti ti-clock" aria-hidden="true" /> {note}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
