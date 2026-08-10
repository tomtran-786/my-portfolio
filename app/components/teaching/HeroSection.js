"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import heroData from "@/data/teaching/hero";
import HeroIllustration from "./HeroIllustration";

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
wrapper: {
  maxWidth: "none",
  margin: 0,
  paddingLeft: "var(--teach-content-gutter)",
  paddingRight: "var(--teach-content-gutter)",
  paddingTop: "clamp(2.5rem, 6vw, 5rem)",
  paddingBottom: "clamp(2rem, 5vw, 4rem)",
},  textCol: {
    maxWidth: "34rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "var(--teach-surface-muted)",
    color: "var(--teach-text)",
    fontSize: 13,
    fontWeight: 500,
    padding: "0.4rem 1rem",
    borderRadius: "9999px",
    marginBottom: "2rem",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  badgeDot: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: "var(--teach-brand)",
    flexShrink: 0,
  },
  headline: {
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: 800,
    color: "var(--teach-brand-deep)",
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
    lineHeight: 1.15,
    marginBottom: "1.5rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
    margin: "0 0 2.5rem 0",
    lineHeight: 1.7,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  ctaRow: {
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "3.5rem",
    flexWrap: "wrap",
  },
  ctaPrimary: {
    background: "var(--teach-brand)",
    color: "var(--teach-on-brand)",
    fontWeight: 600,
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
    padding: "1rem 2rem",
    borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  ctaArrow: {
    background: "var(--teach-brand)",
    color: "var(--teach-on-brand)",
    width: 52, height: 52,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    textDecoration: "none",
  },
  socialProof: {
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  avatarStack: { display: "flex" },
  avatar: {
    width: 48, height: 48,
    borderRadius: "50%",
    border: "2px solid var(--teach-bg)",
    objectFit: "cover",
    marginLeft: -10,
  },
  avatarFirst: {
    width: 48, height: 48,
    borderRadius: "50%",
    border: "2px solid var(--teach-bg)",
    objectFit: "cover",
    marginLeft: 0,
  },
  ratingWrap: { textAlign: "left" },
  stars: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    color: "var(--teach-brand)",
  },
  ratingText: {
    color: "var(--teach-ink)",
    fontWeight: 600,
    fontSize: 15,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  ratingCount: {
    color: "var(--teach-text)",
    fontSize: 13,
    marginTop: 2,
    fontFamily: "var(--font-portfolio), Helvetica Neue, Helvetica, Arial, sans-serif",
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
  const { headline, subtext, cta, socialProof } = heroData;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={s.wrapper}
    >
      <style>{`
        .hero-cta-primary, .hero-cta-arrow {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .hero-cta-primary:hover {
          background: var(--teach-brand-deep);
          transform: translateY(-3px);
          box-shadow: var(--teach-shadow-hover);
        }
        .hero-cta-arrow:hover {
          background: var(--teach-brand-deep);
          transform: translateY(-3px) scale(1.06);
          box-shadow: var(--teach-shadow-hover);
        }

        .hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 34rem) 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
        .hero-text { text-align: left; }
        .hero-cta-row { display: flex; justify-content: flex-start; }
        .hero-social-row { display: flex; justify-content: flex-start; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-illustration { order: -1; max-width: 380px; margin: 0 auto 1.5rem auto; }
          .hero-text { text-align: center !important; }
          .hero-text .hero-cta-row { justify-content: center !important; }
          .hero-text .hero-social-row { justify-content: center !important; }
          .hero-text .hero-subtext { margin-left: auto !important; margin-right: auto !important; max-width: 36rem; }
        }
      `}</style>

      <div className="hero-grid">
        <div className="hero-text" style={s.textCol}>

          <motion.h1 variants={fadeUp} style={s.headline}>
            {headline.before}{" "}{headline.after}
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtext" style={s.subtext}>
            {subtext}
          </motion.p>

          <motion.div variants={fadeUp} className="hero-cta-row" style={s.ctaRow}>
            <Link 
              href={cta.primary.href} 
              className="hero-cta-primary" 
              style={s.ctaPrimary}
              onClick={(e) => {
                if (cta.primary.href.startsWith("#")) {
                  e.preventDefault();
                  document.getElementById(cta.primary.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {cta.primary.label}
            </Link>
            <Link 
              href={cta.arrow.href} 
              aria-label="Đặt lịch ngay" 
              className="hero-cta-arrow" 
              style={s.ctaArrow}
              onClick={(e) => {
                if (cta.arrow.href.startsWith("#")) {
                  e.preventDefault();
                  document.getElementById(cta.arrow.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <ArrowIcon />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-social-row" style={s.socialProof}>
            <div style={s.avatarStack}>
              {socialProof.avatars.map((avatar, i) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={48}
                  height={48}
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
        </div>

        <motion.div variants={fadeUp} className="hero-illustration">
          <HeroIllustration />
        </motion.div>
      </div>
    </motion.section>
  );
}
