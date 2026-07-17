'use client'

import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import dynamic from 'next/dynamic'
import Cursor from './components/Cursor'
import NavLink from './components/NavLink'
import GoToTop from './components/Gototop'
import Timeline from './components/Timeline'
import Projects, { projects } from './components/Projects'
import Certifications, { certs } from './components/Certifications'
import { inter } from './fonts'
import CountUp from './components/CountUp'
import Footer from './components/Footer'

const HeroLottie = dynamic(() => import('./components/HeroLottie'), { ssr: false })

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  // Navbar visibility scroll logic
  const [navVisible, setNavVisible] = useState(true)
  const lastY = useRef(0)

  // Scorecard chỉ đếm khi cuộn tới — cùng cách AboutSection của /teaching làm
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const handleNavScroll = () => {
      const currentY = window.scrollY
      if (currentY < 60) {
        setNavVisible(true)
      } else {
        setNavVisible(currentY < lastY.current)
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleNavScroll)
  }, [])

  return (
    <main className={inter.variable} style={{ background: '#0a0e1a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'var(--font-inter)', overflowX: 'hidden' }}>

      {/* Grid Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none'
      }} />
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 2,
          background: '#7c3aed', zIndex: 9999,
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
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '0.5px solid rgba(139,92,246,0.2)',
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
              background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(12px)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 20, fontWeight: 800, color: '#a78bfa' }}>
          &lt;tomtran/&gt;
        </span>
        <div className="pf-nav-links">
          {[
  { label: 'Home', href: '#home' },
  { label: 'My Works', href: '#projects' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'My Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
  { label: "Teaching", href: "/teaching" },
].map(({ label, href }) => (
  <NavLink key={label} href={href} label={label} />
))}
          </div>
          </motion.nav>
        )}
      </AnimatePresence>

{/* HERO */}
<section id="home" className="pf-hero" style={{
  alignItems: 'center',
  gap: '2rem', position: 'relative', zIndex: 5,
  minHeight: '90vh', overflow: 'hidden'
}}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(139,92,246,0.12)', border: '0.5px solid rgba(139,92,246,0.4)',
            borderRadius: 20, padding: '4px 14px', fontSize: 16, color: '#019A02',
            fontFamily: 'var(--font-inter)', marginBottom: '1.2rem'
          }}>
            <span style={{ width: 6, height: 6, background: '#019A02', borderRadius: '50%', display: 'inline-block' }} />
            Open to opportunities
          </div>

         <h1 className="pf-hero-title" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: '0.8rem' }}>
  <span style={{ color: '#a78bfa' }}>Tuan (Tom)</span>{' '}Tran
</h1>

          <div style={{ fontWeight: 600, fontFamily: 'var(--font-inter)', fontSize: 25, color: '#a78bfa', marginBottom: '1.2rem', minHeight: 28 }}>
            <span style={{ color: '#475569' }}>{'// '}</span>
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
              style={{ color: '#a78bfa' }}
            />
          </div>

          <p style={{ fontSize: 18, fontWeight:500, color: '#E6E7EB', lineHeight: 1.8, maxWidth: 420, marginBottom: '2rem' }}>
            A data-driven International Business student leveraging Python, SQL, and statistical modeling to optimize workflows and provide data-driven solutions.
          </p>

      {/* Social icons */}
<div style={{ display: 'flex', gap: 16, marginBottom: '2rem' }}>
  {[
    { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/tran-vo-manh-tuan' },
    { icon: 'ti-brand-github', href: 'https://github.com/tomtran-786' },
    { icon: 'ti-mail', href: 'https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com' },
  ].map(({ icon, href }) => (
    <motion.a
      key={icon}
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        width: 64, height: 64, borderRadius: '50%',
        background: '#ffffff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#0a0e1a', fontSize: 28, textDecoration: 'none',
        border: 'none',
      }}
    >
      <i className={`ti ${icon}`} />
    </motion.a>
  ))}
</div>

          <div className="pf-hero-ctas">
            <motion.a
  href="/Resume_Tran Vo Manh Tuan.pdf"
  download="Resume_Tran_Vo_Manh_Tuan.pdf"
  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124,58,237,0.5)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: '#7c3aed', color: '#fff', border: 'none',
    padding: '10px 22px', borderRadius: 25, fontSize: 18,
    fontFamily: 'var(--font-inter)', fontWeight: 500, cursor: 'pointer',
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
  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(139,92,246,0.25)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: '#fff', color: '#0a0e1a',
    border: '0.5px solid rgba(139,92,246,0.5)',
    padding: '10px 22px', borderRadius: 25, fontSize: 18,
    fontFamily: 'var(--font-inter)', fontWeight: 500, cursor: 'pointer',
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
    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0
  }} />
  <HeroLottie />
</motion.div>
</section>

      {/* STATS */}
      <div ref={statsRef} className="pf-stats" style={{
        margin: '0 2.5rem 3rem',
        border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: 10, overflow: 'hidden',
        position: 'relative', zIndex: 5
      }}>
        {[
          { num: String(projects.length), label: 'Projects' },
          { num: '1', label: 'GitHub Repos' },
          { num: String(certs.length), label: 'Certifications' },
        ].map(({ num, label }, i) => (
          <div key={label} style={{
            background: '#0a0e1a', padding: '1rem 1.2rem', textAlign: 'center',
            borderRight: i < 2 ? '0.5px solid rgba(139,92,246,0.2)' : 'none'
          }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '2rem', fontWeight: 800, color: '#a78bfa', fontVariantNumeric: 'tabular-nums' }}>
              <CountUp value={num} start={statsInView} />
            </div>
            <div style={{ fontSize: 14, fontWeight:500, color: '#fff', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

     {/* PROJECTS */}
     <Projects />

    {/* EXPERIENCE */}
<Timeline />

{/* EDUCATION */}
<section id="education" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 1.5rem' }}>
  <div>
    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 52, fontWeight: 700, color: '#9B51E0', display: 'block' }}>Education</span>
    <p style={{ fontSize: 22, fontWeight: 500, color: '#FFFFFF', margin: 0 }}>
      Where I experienced my academic journey
    </p>
  </div>
  <div style={{ flex: 1, height: '0.5px', background: 'rgba(139,92,246,0.2)', marginLeft: 16 }} />
</div>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="pf-edu-card"
    style={{
      background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
      borderRadius: 12.5, padding: '1.5rem 1.875rem',
    }}
  >
    <div>
      <div style={{ fontSize: 17.5, fontWeight: 700, color: '#e2e8f0', marginBottom: 2.5 }}>Bachelor of International Business</div>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: '#a78bfa', marginBottom: 10 }}>Foreign Trade University — Taiwan Joint Transfer Program</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        {['GPA: 4.0/4.0', 'IELTS 7.5', 'TOEIC 980'].map(badge => (
          <span key={badge} style={{
            fontFamily: 'var(--font-inter)', fontSize: 12.5,
            background: 'rgba(139,92,246,0.12)', color: '#a78bfa',
            border: '0.5px solid rgba(139,92,246,0.25)', borderRadius: 5, padding: '2.5px 10px'
          }}>{badge}</span>
        ))}
      </div>
      <p style={{ fontSize: 16.25, color: '#fff', lineHeight: 1.7 }}>
        Data Analytics · Statistics for Business · International Economics · Macroeconomics · Corporate Finance · Accounting Principles
      </p>
    </div>
    <div style={{ fontWeight: 600, fontFamily: 'var(--font-inter)', fontSize: 16, color: '#A29BFE', whiteSpace: 'nowrap', marginLeft: 20 }}>Expected 2028</div>
  </motion.div>
</section>
{/* CERTIFICATIONS */}
<Certifications />

{/* CONTACT */}
      <section id="contact" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 1.5rem' }}>
  <div>
    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 52, fontWeight: 700, color: '#9B51E0', display: 'block' }}>Contact</span>
    <p style={{ fontSize: 22, fontWeight: 500, color: '#FFFFFF', margin: 0 }}>
      Where you can reach out to me
    </p>
  </div>
  <div style={{ flex: 1, height: '0.6px', background: 'rgba(139,92,246,0.2)', marginLeft: 16 }} />
</div>
        <div style={{
          background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
          borderRadius: 15, padding: '3.1rem', textAlign: 'center', maxWidth: 625, margin: '0 auto'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>👋</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Let&apos;s work together</h2>
          <p style={{ fontSize: 17.5, color: '#fff', lineHeight: 1.8, marginBottom: '1.9rem' }}>
            Open to internships, graduate roles, and freelance projects in finance, data analysis, and business strategy.
          </p>
         <div className="pf-contact-btns">
  <a href="https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com"
    target="_blank" rel="noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: '#7c3aed', color: '#fff', textDecoration: 'none',
      padding: '12.5px 25px', borderRadius: 25, fontSize: 16, fontWeight: 500,
      fontFamily: 'var(--font-inter)'
    }}>
    <i className="ti ti-mail" style={{ fontSize: 20 }} /> tomtran.workcontact@gmail.com
  </a>
 <a href="tel:+84398434620"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: '#fff', color: '#0a0e1a', textDecoration: 'none',
    border: '0.5px solid rgba(139,92,246,0.5)',
    padding: '12.5px 25px', borderRadius: 25, fontSize: 16, fontWeight: 500,
    fontFamily: 'var(--font-inter)',
    whiteSpace: 'nowrap'
  }}>
  <i className="ti ti-phone" style={{ fontSize: 20, fontFamily: 'tabler-icons', color: '#0a0e1a' }} />
  <span style={{ fontFamily: 'var(--font-inter)', color: '#0a0e1a' }}>(+84) 398 434 620</span>
</a>
</div>
        </div>
      </section>
      <Footer />
      <GoToTop />
    </main>
  )
}