"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import testimonialsData from "@/data/teaching/testimonials";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const s = {
  section: {
    margin: 0,
  },
  header: {},
  headline: {
    fontWeight: 700,
    color: "var(--teach-brand-deep)",
    fontSize: "var(--fs-h2)",
    lineHeight: 1.15,
    margin: 0,
    maxWidth: "36rem",
  },
  subtext: {
    color: "var(--teach-text)",
    fontSize: "var(--fs-body)",
    lineHeight: 1.7,
    margin: 0,
  },
};

export default function TestimonialsSection() {
  const { headline, subtext, items } = testimonialsData;

  return (
    <section className="teach-section" style={s.section} id="testimonials">
      <motion.div
        className="teach-section-heading"
        style={s.header}
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 style={s.headline}>{headline}</h2>
        <p className="teach-section-context" style={s.subtext}>{subtext}</p>
      </motion.div>

      {/* Một câu chuyện nổi bật, sáu câu chuyện còn lại gọn bên dưới. Giữ nguyên lời học viên. */}
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
      >
        <article className="story-feature">
          <div>
            <h3>{items[0].result}</h3>
            <blockquote>{items[0].quote}</blockquote>
          </div>
          <aside>
            <Image src={items[0].avatar} alt="" width={160} height={160} />
            <b>{items[0].name}</b>
            <small>{items[0].role}</small>
          </aside>
        </article>
        <ul className="story-grid">
          {items.slice(1).map((item) => (
            <li key={item.id} className="story-card">
              <h3>{item.result}</h3>
              <blockquote>{item.quote}</blockquote>
              <footer>
                <Image src={item.avatar} alt="" width={40} height={40} />
                <div>
                  <b>{item.name}</b>
                  <small>{item.role}</small>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
