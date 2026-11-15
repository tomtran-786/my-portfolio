'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import GoToTop from '@/app/components/Gototop'
import Timeline from '@/app/components/Timeline'
import Projects, { projects } from '@/app/components/Projects'
import Activity from '@/app/components/Activity'
import Certifications, { certs } from '@/app/components/Certifications'
import CountUp from '@/app/components/CountUp'
import Footer from '@/app/components/Footer'
import HeroAurora from '@/app/components/HeroAurora'

const HeroLottie = dynamic(() => import('@/app/components/HeroLottie'), { ssr: false })

const ROLES = [
  'Finance & Investment Analysis',
  'Data-Driven Strategy',
  'Python & SQL Modeling',
  'Business Intelligence',
]

const SOCIAL_LINKS = [
  // Nội dung thẻ chỉ là icon-font, không có text nào -> thiếu aria-label thì
  // trình đọc màn hình chỉ đọc được URL thô. Footer.js đã làm đúng như vậy.
  { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/tran-vo-manh-tuan', label: 'LinkedIn' },
  { icon: 'ti-brand-github', href: 'https://github.com/tomtran-786', label: 'GitHub' },
  { icon: 'ti-mail', href: 'https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com', label: 'Email' },
]

// Hover scale + spring là hiệu ứng giữ lại có chủ đích (xem DESIGN.md).
// Tắt khi người dùng bật giảm chuyển động.
const HOVER_LIFT = { whileHover: { scale: 1.05, boxShadow: 'var(--pf-shadow-hover)' }, whileTap: { scale: 0.97 } }
const SPRING = { type: 'spring', stiffness: 400, damping: 20 }

const EDUCATION_ENTRIES = [
  {
    id: 'mcu',
    logo: '/education/ming-chuan.svg',
    degree: 'Bachelor of International Business · Minor in International Finance',
    institution: 'Ming Chuan University · Taiwan Joint Transfer Program',
    badges: [],
    courses: '',
    dateLabel: 'Expected 2028',
  },
  {
    id: 'ftu',
    logo: '/education/ftu.svg',
    degree: 'Bachelor of International Business',
    institution: 'Foreign Trade University (FTU) · Ho Chi Minh City',
    badges: ['GPA 4.0/4.0', 'IELTS 7.5', 'TOEIC 980'],
    courses:
      'Data Analytics · Statistics for Business · International Economics · Macroeconomics · Corporate Finance · Accounting Principles',
    dateLabel: '2024 – 2026',
  },
]

export default function Portfolio() {
  // Scorecard chỉ đếm khi cuộn tới — cùng cách AboutSection của /teaching làm
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 })
  const reduceMotion = useReducedMotion()
  const hover = reduceMotion ? {} : HOVER_LIFT

  const issuers = [...new Set(certs.map(cert => cert.issuer))]

  return (
    <main className="pf-theme">
      {/* HERO */}
      <section id="home" className="pf-hero">
        <HeroAurora />
        <motion.div
          className="pf-hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="pf-hero-title">
            <span style={{ color: 'var(--pf-brand)' }}>Tuan (Tom)</span>{' '}Tran
          </h1>

          <p className="pf-hero-role" data-impeccable-ignore="decorative-blinking-cursor">
            <span aria-hidden="true" style={{ color: 'var(--pf-accent)' }}>{'// '}</span>
            {reduceMotion ? (
              <span>{ROLES[0]}</span>
            ) : (
              <TypeAnimation
                sequence={ROLES.flatMap(role => [role, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            )}
          </p>

          <p className="pf-hero-lead">
            An International Business student who uses Python, SQL, and statistical modeling to
            streamline workflows and back business decisions with data.
          </p>

          <div className="pf-hero-ctas">
            <motion.a
              className="btn btn--primary"
              href="/documents/resume-tran-vo-manh-tuan.pdf"
              download="Resume_Tran_Vo_Manh_Tuan.pdf"
              {...hover}
              transition={SPRING}
            >
              <i className="ti ti-download" aria-hidden="true" /> Download resume
            </motion.a>
            <motion.a
              className="btn btn--secondary"
              href="https://calendly.com/tomtran-workcontact"
              target="_blank"
              rel="noreferrer"
              {...hover}
              transition={SPRING}
            >
              <i className="ti ti-coffee" aria-hidden="true" /> Book a coffee chat
            </motion.a>
          </div>

          <div className="pf-hero-meta">
            <p className="pf-hero-status">
              <span aria-hidden="true" className="pf-hero-status-dot" />
              Open to internships and graduate roles
            </p>
            <div className="pf-hero-social">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <motion.a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  transition={SPRING}
                >
                  <i className={`ti ${icon}`} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lottie Animation. Halo phía sau là hiệu ứng giữ lại có chủ đích. */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          className="pf-hero-art"
        >
          <div
            aria-hidden="true"
            className="pf-hero-halo"
            data-impeccable-ignore="radial-gradient-halo soft-spotlight"
          />
          <HeroLottie />
        </motion.div>
      </section>

      {/* STATS: hai con số kèm ngữ cảnh, không phải dải "hero metric" trang trí */}
      <div ref={statsRef} className="pf-stats">
        <div className="pf-stat-cell">
          <div className="pf-stat-number">
            <CountUp value={String(projects.length)} start={statsInView} />
          </div>
          <p className="pf-stat-label">
            <strong>Projects</strong> in investment analysis, market research, and data
          </p>
        </div>
        <div className="pf-stat-cell">
          <div className="pf-stat-number">
            <CountUp value={String(certs.length)} start={statsInView} />
          </div>
          <p className="pf-stat-label">
            <strong>Certifications</strong> from {issuers.slice(0, -1).join(', ')} and {issuers.at(-1)}
          </p>
        </div>
      </div>

      {/* PROJECTS */}
      <Projects />

      {/* ACTIVITY */}
      <Activity />

      {/* EXPERIENCE */}
      <Timeline />

      {/* EDUCATION */}
      <section id="education" className="pf-section">
        <div className="pf-section-heading">
          <h2 className="pf-section-title">Education</h2>
          <p className="pf-section-subtitle pf-section-context">
            Two International Business degrees, in Vietnam and Taiwan
          </p>
        </div>
        <div className="pf-edu-stack">
          {EDUCATION_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
              className="card pf-edu-card"
            >
              <div className="pf-edu-logo">
                <Image src={entry.logo} alt={`${entry.institution} logo`} width={56} height={56} style={{ objectFit: 'contain' }} />
              </div>
              <div>
                <h3 className="pf-edu-degree">{entry.degree}</h3>
                <p className="pf-edu-institution">{entry.institution}</p>
                {entry.badges.length > 0 && (
                  <div className="pf-edu-tags">
                    {entry.badges.map(badge => (
                      <span key={badge} className="tag">{badge}</span>
                    ))}
                  </div>
                )}
                {entry.courses && <p className="pf-edu-courses">{entry.courses}</p>}
              </div>
              <div className="pf-edu-date">{entry.dateLabel}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <Certifications />

      {/* CONTACT: một heading duy nhất, không lồng card trong section */}
      <section id="contact" className="pf-section pf-contact">
        <div className="pf-section-heading">
          <h2 className="pf-section-title">Let&apos;s work together</h2>
          <p className="pf-section-subtitle pf-section-context">
            Open to internships, graduate roles, and freelance projects in finance, data analysis,
            and business strategy.
          </p>
        </div>
        <div className="pf-contact-btns">
          <a
            className="btn btn--primary"
            href="https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ti ti-mail" aria-hidden="true" /> tomtran.workcontact@gmail.com
          </a>
          <a className="btn btn--secondary" href="tel:+84398434620">
            <i className="ti ti-phone" aria-hidden="true" /> (+84) 398 434 620
          </a>
        </div>
      </section>
      <Footer />
      <GoToTop />
    </main>
  )
}
