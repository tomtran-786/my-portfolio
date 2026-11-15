"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import aboutData from "@/data/teaching/about";
import CountUp from "@/app/components/CountUp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Dải số liệu kiểu bảng đo; CountUp chạy khi dải hiện ra.
function Stats({ stats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <div ref={ref} className="about-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="about-stat">
          <span className="about-stat__value"><CountUp value={stat.value} start={inView} /></span>
          <span className="about-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const { headline, paragraphs, image, stats, credentials } = aboutData;

  return (
    <section className="teach-section teach-section-soft" id="about">
      <motion.div
        className="about-profile"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div>
          <h2 className="about-title">{headline}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="about-text">{p}</p>
          ))}
          <div className="about-creds">
            {credentials.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
          <Stats stats={stats} />
        </div>

        {/* Ảnh kiểu polaroid; chú thích nằm dưới ảnh, không đè lên ảnh. */}
        <figure className="about-photo">
          <Image src={image.src} alt={image.alt} width={600} height={750} sizes="(max-width: 800px) 80vw, 22rem" />
          <figcaption>{image.caption}</figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
