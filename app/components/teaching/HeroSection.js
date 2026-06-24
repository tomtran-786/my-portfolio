"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import heroData from "@/data/teaching/hero";

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const s = {
  section: {
    maxWidth: "52rem",
    margin: "0 auto",
    textAlign: "center",
    padding: "0 1rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#373254",
    color: "#D8D4EA",
    fontSize: 13,
    fontWeight: 500,
    padding: "0.4rem 1rem",
    borderRadius: "9999px",
    marginBottom: "2rem",
    fontFamily: "Montserrat, sans-serif",
  },
  badgeDot: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: "#F2684A",
    flexShrink: 0,
  },
  headline: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    lineHeight: 1.15,
    marginBottom: "1.5rem",
  },
  inlineImg: {
    display: "inline-block",
    height: "clamp(3rem, 5vw, 5rem)",
    width: "auto",
    borderRadius: "1rem",
    objectFit: "cover",
    verticalAlign: "middle",
    margin: "0 0.4rem",
    transform: "translateY(-4px)",
  },
  subtext: {
    color: "#E5E5E5",
    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
    maxWidth: "36rem",
    margin: "0 auto 2.5rem auto",
    lineHeight: 1.7,
    fontFamily: "Montserrat, sans-serif",
  },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "3.5rem",
  },
  ctaPrimary: {
    background: "#F2684A",
    color: "#fff",
    fontWeight: 600,
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
    padding: "1rem 2rem",
    borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
    transition: "background 0.2s",
  },
  ctaArrow: {
    background: "#F2684A",
    color: "#fff",
    width: 52, height: 52,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    textDecoration: "none",
  },
  socialProof: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  avatarStack: {
    display: "flex",
  },
  avatar: {
    width: 48, height: 48,
    borderRadius: "50%",
    border: "2px solid #2A2640",
    objectFit: "cover",
    marginLeft: -10,
  },
  avatarFirst: {
    width: 48, height: 48,
    borderRadius: "50%",
    border: "2px solid #2A2640",
    objectFit: "cover",
    marginLeft: 0,
  },
  ratingWrap: { textAlign: "left" },
  stars: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    color: "#F2684A",
  },
  ratingText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    fontFamily: "Montserrat, sans-serif",
  },
  ratingCount: {
    color: "#E5E5E5",
    fontSize: 13,
    marginTop: 2,
    fontFamily: "Montserrat, sans-serif",
  },
};

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.3 4.4 18.2l1.1-6.2L1 7.6l6.2-.9z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function HeroSection() {
  const { badge, headline, subtext, cta, socialProof } = heroData;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={s.section}
    >
      <style>{`
        .hero-cta-primary,
        .hero-cta-arrow {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .hero-cta-primary:hover {
          background: #ff7c5c;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(242, 104, 74, 0.4);
        }
        .hero-cta-arrow:hover {
          background: #ff7c5c;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 10px 24px rgba(242, 104, 74, 0.4);
        }
      `}</style>

      {/* Badge */}
      <motion.div variants={fadeUp} style={s.badge}>
        <span style={s.badgeDot} />
        {badge}
      </motion.div>

      {/* Headline */}
      <motion.h1 variants={fadeUp} style={s.headline}>
        {headline.before}{" "}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {" "}{headline.after}
      </motion.h1>

      {/* Subtext */}
      <motion.p variants={fadeUp} style={s.subtext}>
        {subtext}
      </motion.p>

      {/* CTAs */}
      <motion.div variants={fadeUp} style={s.ctaRow}>
        <Link href={cta.primary.href} className="hero-cta-primary" style={s.ctaPrimary}>
          {cta.primary.label}
        </Link>
        <Link href={cta.arrow.href} aria-label="Đặt lịch ngay" className="hero-cta-arrow" style={s.ctaArrow}>
          <ArrowIcon />
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div variants={fadeUp} style={s.socialProof}>
        <div style={s.avatarStack}>
          {socialProof.avatars.map((avatar, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={avatar.src}
              src={avatar.src}
              alt={avatar.alt}
              style={i === 0 ? s.avatarFirst : s.avatar}
            />
          ))}
        </div>
        <div style={s.ratingWrap}>
          <div style={s.stars}>
            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            <span style={s.ratingText}>{socialProof.rating}</span>
          </div>
          <p style={s.ratingCount}>{socialProof.count}</p>
        </div>
      </motion.div>
    </motion.section>
  );
}