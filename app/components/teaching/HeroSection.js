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
    maxWidth: "36rem",
  },
  headline: {
    fontWeight: 700,
    color: "var(--teach-ink)",
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
    lineHeight: 1.15,
    marginBottom: "1.5rem",
    textWrap: "pretty",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-lead)",
    margin: "0 0 0.75rem 0",
    lineHeight: 1.7,
  },
  ctaRow: {
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "3.5rem",
    flexWrap: "wrap",
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
  proof: {
    color: "var(--teach-ink)",
    fontSize: "var(--fs-small)",
    fontWeight: 600,
    margin: "0 0 2.5rem 0",
  },
  ratingCount: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-label)",
    marginTop: 2,
  },
};

export default function HeroSection() {
  const { headline, subtext, proof, cta, socialProof } = heroData;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={s.wrapper}
    >
      <style>{`
        .hero-cta-primary {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: var(--teach-shadow-hover);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cta-primary:hover { transform: none; }
        }
        .hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 36rem) 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
        .hero-text { text-align: left; }
        .hero-headline-part { display: block; }
        @media (max-width: 600px) {
          .hero-headline-part { display: inline; }
        }
        .hero-cta-row { display: flex; justify-content: flex-start; flex-wrap: wrap; gap: 0.75rem; }
        .hero-social-row { display: flex; justify-content: flex-start; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-illustration { max-width: 380px; margin: 1.5rem auto 0 auto; }
          .hero-text { text-align: left !important; }
          .hero-text .hero-cta-row { justify-content: flex-start !important; }
          .hero-text .hero-social-row { justify-content: flex-start !important; }
          .hero-text .hero-subtext { max-width: 36rem; }
        }
      `}</style>

      <div className="hero-grid">
        <div className="hero-text" style={s.textCol}>

          <motion.h1 variants={fadeUp} style={s.headline}>
            {/* Ngắt dòng đúng chỗ data đã tách, để không cắt đôi cụm từ. */}
            <span className="hero-headline-part">{headline.before}</span>{" "}
            <span className="hero-headline-part">{headline.after}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtext" style={s.subtext}>
            {subtext}
          </motion.p>

          <motion.p variants={fadeUp} style={s.proof}>{proof}</motion.p>

          <motion.div variants={fadeUp} className="hero-cta-row" style={s.ctaRow}>
            <a
              href={cta.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary hero-cta-primary"
              style={{ minHeight: 52, padding: "0.9rem 1.75rem", fontSize: "1.0625rem" }}
            >
              <i className="ti ti-message-circle" aria-hidden="true" />
              {cta.primary.label}
            </a>
            <Link
              href={cta.secondary.href}
              className="btn btn--secondary"
              style={{ minHeight: 52, padding: "0.9rem 1.5rem", fontSize: "1.0625rem" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(cta.secondary.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {cta.secondary.label}
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
            <p style={s.ratingCount}>{socialProof.count}</p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="hero-illustration">
          <HeroIllustration />
        </motion.div>
      </div>
    </motion.section>
  );
}
