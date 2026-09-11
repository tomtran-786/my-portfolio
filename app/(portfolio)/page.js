'use client'

import { motion, useInView } from 'framer-motion'
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

const EDUCATION_ENTRIES = [
  {
    id: 'ftu',
    logo: '/education/ftu.svg',
    degree: 'Bachelor of International Business',
    institution: 'Foreign Trade University (FTU) · Ho Chi Minh City',
    badges: ['GPA: 4.0/4.0', 'IELTS 7.5', 'TOEIC 980'],
    courses:
      'Data Analytics · Statistics for Business · International Economics · Macroeconomics · Corporate Finance · Accounting Principles',
    dateLabel: 'Years 1–2',
  },
  {
    id: 'mcu',
    logo: '/education/ming-chuan.svg',
    degree: 'Bachelor of International Business · Minor in International Finance',
    institution: 'Ming Chuan University · Taiwan Joint Transfer Program',
    badges: ['Minor: International Finance'],
    courses: '',
    dateLabel: 'Expected 2028',
  },
]

export default function Portfolio() {
  // Scorecard chỉ đếm khi cuộn tới — cùng cách AboutSection của /teaching làm
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 })

  return (
    <main className="pf-theme">
{/* HERO */}
<section id="home" className="pf-hero" style={{
  alignItems: 'center',
  gap: '2rem', position: 'relative', zIndex: 5,
  minHeight: '90vh', overflow: 'hidden'
}}>
        <HeroAurora />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--pf-success-soft)', border: '1px solid var(--pf-success-border)',
            borderRadius: 20, padding: '4px 14px', fontSize: 16, color: 'var(--pf-success)',
            fontFamily: 'var(--font-portfolio)', marginBottom: '1.2rem'
          }}>
            <span style={{ width: 6, height: 6, background: 'var(--pf-success)', borderRadius: '50%', display: 'inline-block' }} />
            Open to opportunities
          </div>

         <h1 className="pf-hero-title" style={{ fontWeight: 700, lineHeight: 1.08, marginBottom: '0.8rem', color: 'var(--pf-ink)' }}>
  <span style={{ color: 'var(--pf-brand)' }}>Tuan (Tom)</span>{' '}Tran
</h1>

          <div style={{ fontWeight: 600, fontFamily: 'var(--font-portfolio)', fontSize: 25, color: 'var(--pf-brand)', marginBottom: '1.2rem', minHeight: 28 }}>
            <span style={{ color: 'var(--pf-accent)' }}>{'// '}</span>
            <TypeAnimation
              sequence={[
                'Finance & Investment Analysis',
                2000,
                'Data-Driven Strategy',
                2000,
                'Python & SQL Modeling',
                2000,
                'Business Intelligence',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ color: 'var(--pf-brand)' }}
            />
          </div>

          <p style={{ fontSize: 18, fontWeight: 400, color: 'var(--pf-text)', lineHeight: 1.75, maxWidth: 460, marginBottom: '2rem' }}>
            A data-driven International Business student leveraging Python, SQL, and statistical modeling to optimize workflows and provide data-driven solutions.
          </p>

      {/* Social icons */}
<div style={{ display: 'flex', gap: 16, marginBottom: '2rem' }}>
  {[
    // Nội dung thẻ chỉ là icon-font, không có text nào -> thiếu aria-label thì
    // trình đọc màn hình chỉ đọc được URL thô. Footer.js đã làm đúng như vậy.
    { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/tran-vo-manh-tuan', label: 'LinkedIn' },
    { icon: 'ti-brand-github', href: 'https://github.com/tomtran-786', label: 'GitHub' },
    { icon: 'ti-mail', href: 'https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com', label: 'Email' },
  ].map(({ icon, href, label }) => (
    <motion.a
      key={icon}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'var(--pf-surface)',
        boxShadow: 'var(--pf-shadow-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--pf-brand-deep)', fontSize: 22, textDecoration: 'none',
        border: '1px solid var(--pf-border)',
      }}
    >
      <i className={`ti ${icon}`} />
    </motion.a>
  ))}
</div>

          <div className="pf-hero-ctas">
            <motion.a
  href="/documents/resume-tran-vo-manh-tuan.pdf"
  download="Resume_Tran_Vo_Manh_Tuan.pdf"
  whileHover={{ scale: 1.05, boxShadow: 'var(--pf-shadow-hover)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: 'var(--pf-brand)', color: 'var(--pf-on-brand)', border: 'none',
    padding: '10px 22px', borderRadius: 25, fontSize: 18,
    fontFamily: 'var(--font-portfolio)', fontWeight: 600, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    textDecoration: 'none'
  }}
>
  <i className="ti ti-download" /> Download Resume
</motion.a>
            <motion.a
  href="https://calendly.com/tomtran-workcontact"
  target="_blank"
  rel="noreferrer"
  whileHover={{ scale: 1.05, boxShadow: 'var(--pf-shadow-hover)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: 'var(--pf-surface)', color: 'var(--pf-brand-deep)',
    border: '1px solid var(--pf-border-strong)',
    padding: '10px 22px', borderRadius: 25, fontSize: 18,
    fontFamily: 'var(--font-portfolio)', fontWeight: 600, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    textDecoration: 'none'
  }}
>
  <i className="ti ti-coffee" /> Book a coffee chat
</motion.a>
          </div>
        </motion.div>

      {/* Lottie Animation */}
       <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
  whileHover={{ scale: 1.03 }}
  className="pf-hero-art"
  style={{
    display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
    cursor: 'pointer', position: 'relative',
  }}
>
  <div style={{
    position: 'absolute', top: '40%', left: '30%',
    transform: 'translate(-50%, -50%)',
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, var(--pf-aurora-1) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0
  }} />
  <HeroLottie />
</motion.div>
</section>

      {/* STATS */}
      {/* margin nằm trong .pf-stats (globals.css) để co theo breakpoint cho khớp
          .pf-section — inline style không viết được @media. */}
      <div ref={statsRef} className="pf-stats" style={{
        border: '1px solid var(--pf-border)', borderRadius: 12, overflow: 'hidden',
        position: 'relative', zIndex: 5, boxShadow: 'var(--pf-shadow-card)', background: 'var(--pf-surface)'
      }}>
        {[
          { num: String(projects.length), label: 'Projects' },
          { num: String(projects.filter(project => project.link?.includes('github.com')).length), label: 'GitHub Projects' },
          { num: String(certs.length), label: 'Certifications' },
        ].map(({ num, label }) => (
          <div key={label} className="pf-stat-cell">
            <div className="pf-stat-number">
              <CountUp value={num} start={statsInView} />
            </div>
            <div className="pf-stat-label">{label}</div>
          </div>
        ))}
      </div>

     {/* PROJECTS */}
     <Projects />

    {/* ACTIVITY */}
    <Activity />

    {/* EXPERIENCE */}
<Timeline />

{/* EDUCATION */}
<section id="education" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
  <div className="pf-section-heading">
    <h2 className="pf-section-title" style={{ fontWeight: 700, display: 'block' }}>Education</h2>
    <p className="pf-section-subtitle pf-section-context" style={{ fontWeight: 500 }}>
      Where I experienced my academic journey
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
        className="pf-edu-card"
        style={{
          background: 'var(--pf-surface)', border: '1px solid var(--pf-border)',
          borderRadius: 12.5, padding: '1.5rem 1.875rem'
        }}
      >
        <div className="pf-edu-logo">
          <Image src={entry.logo} alt={`${entry.institution} logo`} width={56} height={56} style={{ objectFit: 'contain' }} />
        </div>
        <div>
          <div style={{ fontSize: 17.5, fontWeight: 700, color: 'var(--pf-ink)', marginBottom: 2.5 }}>{entry.degree}</div>
          <div style={{ fontFamily: 'var(--font-portfolio)', fontSize: 15, color: 'var(--pf-link)', marginBottom: 10 }}>{entry.institution}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: entry.courses ? 10 : 0 }}>
            {entry.badges.map(badge => (
              <span key={badge} style={{
                fontFamily: 'var(--font-portfolio)', fontSize: 12.5,
                background: 'var(--pf-brand-soft)', color: 'var(--pf-brand)',
                border: '1px solid var(--pf-border-strong)', borderRadius: 5, padding: '2.5px 10px'
              }}>{badge}</span>
            ))}
          </div>
          {entry.courses && (
            <p style={{ fontSize: 16.25, color: 'var(--pf-text)', lineHeight: 1.7 }}>
              {entry.courses}
            </p>
          )}
        </div>
        <div style={{ fontWeight: 600, fontFamily: 'var(--font-portfolio)', fontSize: 16, color: 'var(--pf-brand)', whiteSpace: 'nowrap', marginLeft: 20 }}>{entry.dateLabel}</div>
      </motion.div>
    ))}
  </div>
</section>

{/* CERTIFICATIONS */}
<Certifications />

{/* CONTACT */}
      <section id="contact" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
  <div className="pf-section-heading">
    <h2 className="pf-section-title" style={{ fontWeight: 700, display: 'block' }}>Contact</h2>
    <p className="pf-section-subtitle pf-section-context" style={{ fontWeight: 500 }}>
      Where you can reach out to me
    </p>
</div>
        <div style={{
          background: 'var(--pf-surface)', border: '1px solid var(--pf-border)',
          borderRadius: 15, padding: '3.1rem', textAlign: 'center', maxWidth: 625, margin: '0 auto',
          boxShadow: 'var(--pf-shadow-card)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>👋</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--pf-ink)', marginBottom: '1rem' }}>Let&apos;s work together</h2>
          <p style={{ fontSize: 17.5, color: 'var(--pf-text)', lineHeight: 1.8, marginBottom: '1.9rem' }}>
            Open to internships, graduate roles, and freelance projects in finance, data analysis, and business strategy.
          </p>
         <div className="pf-contact-btns">
  <a href="https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com"
    target="_blank" rel="noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'var(--pf-brand)', color: 'var(--pf-on-brand)', textDecoration: 'none',
      padding: '12.5px 25px', borderRadius: 25, fontSize: 16, fontWeight: 600,
      fontFamily: 'var(--font-portfolio)'
    }}>
    <i className="ti ti-mail" style={{ fontSize: 20 }} /> tomtran.workcontact@gmail.com
  </a>
 <a href="tel:+84398434620"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'var(--pf-surface)', color: 'var(--pf-brand-deep)', textDecoration: 'none',
    border: '1px solid var(--pf-border-strong)',
    padding: '12.5px 25px', borderRadius: 25, fontSize: 16, fontWeight: 600,
    fontFamily: 'var(--font-portfolio)',
    whiteSpace: 'nowrap'
  }}>
  <i className="ti ti-phone" style={{ fontSize: 20, fontFamily: 'tabler-icons', color: 'var(--pf-brand-deep)' }} />
  <span style={{ fontFamily: 'var(--font-portfolio)', color: 'var(--pf-brand-deep)' }}>(+84) 398 434 620</span>
</a>
</div>
        </div>
      </section>
      <Footer />
      <GoToTop />
    </main>
  )
}
