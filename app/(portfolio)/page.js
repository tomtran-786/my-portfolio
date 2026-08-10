'use client'

import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import dynamic from 'next/dynamic'
import Cursor from '@/app/components/Cursor'
import NavLink from '@/app/components/NavLink'
import MobileDrawer from '@/app/components/MobileDrawer'
import GoToTop from '@/app/components/Gototop'
import Timeline from '@/app/components/Timeline'
import Projects, { projects } from '@/app/components/Projects'
import Certifications, { certs } from '@/app/components/Certifications'
import CountUp from '@/app/components/CountUp'
import Footer from '@/app/components/Footer'
import HeroAurora from '@/app/components/HeroAurora'
import ThemeToggle from '@/app/components/ThemeToggle'

const HeroLottie = dynamic(() => import('@/app/components/HeroLottie'), { ssr: false })

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'My Works', href: '#projects' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'My Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
  { label: 'Teaching', href: '/teaching' },
]

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  // Navbar visibility scroll logic
  const [navVisible, setNavVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  // Scorecard chỉ đếm khi cuộn tới — cùng cách AboutSection của /teaching làm
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 })

  useEffect(() => {
    // Phải mồi bằng vị trí hiện tại: trình duyệt khôi phục scroll khi reload, mà
    // lastY khởi tạo 0 thì so sánh đầu tiên (currentY < 0) luôn sai -> navbar ẩn
    // ngay ở cú cuộn LÊN đầu tiên, đúng ngược lại ý đồ.
    lastY.current = window.scrollY
    const handleNavScroll = () => {
      const currentY = window.scrollY
      if (currentY < 60 || menuOpen) {
        setNavVisible(true)
      } else {
        setNavVisible(currentY < lastY.current)
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleNavScroll)
  }, [menuOpen])

  return (
    <main className="pf-theme">
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--pf-brand-deep) 0%, var(--pf-accent) 100%)', zIndex: 'var(--z-progress)',
          scaleX, transformOrigin: 'left'
        }}
      />

      {/* CUSTOM CURSOR */}
      <Cursor />

      {/* NAV */}
      <AnimatePresence>
        {navVisible && (
          <motion.nav
            className="pf-nav"
            aria-label="Primary navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              borderBottom: '1px solid var(--pf-border)',
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'var(--z-nav)',
              background: 'var(--pf-nav-bg)', backdropFilter: 'blur(14px)',
              boxShadow: 'var(--pf-nav-shadow)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-portfolio)', fontSize: 20, fontWeight: 700, color: 'var(--pf-brand)' }}>
          &lt;tomtran/&gt;
        </span>
        <div className="pf-nav-links">
          {NAV_LINKS.slice(0, -1).map(({ label, href }) => (
            <NavLink key={label} href={href} label={label} />
          ))}
          </div>
        <div className="pf-nav-actions">
          <a className="pf-nav-route" href="/teaching">
            Teaching <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
          <button
            className="pf-nav-burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
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

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        theme="portfolio"
      />

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
          { num: '1', label: 'GitHub Repos' },
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="pf-edu-card"
    style={{
      background: 'var(--pf-surface)', border: '1px solid var(--pf-border)',
      borderRadius: 12.5, padding: '1.5rem 1.875rem'
    }}
  >
    <div>
      <div style={{ fontSize: 17.5, fontWeight: 700, color: 'var(--pf-ink)', marginBottom: 2.5 }}>Bachelor of International Business</div>
      <div style={{ fontFamily: 'var(--font-portfolio)', fontSize: 15, color: 'var(--pf-link)', marginBottom: 10 }}>Foreign Trade University — Taiwan Joint Transfer Program</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        {['GPA: 4.0/4.0', 'IELTS 7.5', 'TOEIC 980'].map(badge => (
          <span key={badge} style={{
            fontFamily: 'var(--font-portfolio)', fontSize: 12.5,
            background: 'var(--pf-brand-soft)', color: 'var(--pf-brand)',
            border: '1px solid var(--pf-border-strong)', borderRadius: 5, padding: '2.5px 10px'
          }}>{badge}</span>
        ))}
      </div>
      <p style={{ fontSize: 16.25, color: 'var(--pf-text)', lineHeight: 1.7 }}>
        Data Analytics · Statistics for Business · International Economics · Macroeconomics · Corporate Finance · Accounting Principles
      </p>
    </div>
    <div style={{ fontWeight: 600, fontFamily: 'var(--font-portfolio)', fontSize: 16, color: 'var(--pf-brand)', whiteSpace: 'nowrap', marginLeft: 20 }}>Expected 2028</div>
  </motion.div>
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
