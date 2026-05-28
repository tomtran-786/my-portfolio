'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Lottie from 'lottie-react'
import animationData from '../public/animation.json'
import CursorGlow from './components/CursorGlow'
import NavLink from './components/NavLink'
import GoToTop from './components/Gototop'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const sections = ['home', 'projects', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return (
    <main style={{ background: '#0a0e1a', minHeight: '100vh', color: '#f1f5f9', fontFamily: "'Syne', sans-serif", overflowX: 'hidden' }}>

      {/* Grid Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none'
      }} />
      {/* SCROLL PROGRESS BAR */}
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 2,
          background: '#7c3aed', zIndex: 9999,
          scaleX, transformOrigin: 'left'
        }}
      />

      {/* CURSOR GLOW */}
      <CursorGlow />

      {/* NAV */}
     <nav style={{
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '1.2rem 2.5rem', borderBottom: '0.5px solid rgba(139,92,246,0.2)',
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
  background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(12px)'
}}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 800, color: '#a78bfa' }}>
          &lt;tomtran/&gt;
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Home', 'Projects', 'Experience', 'Contact'].map(s => (
            <NavLink key={s} href={`#${s.toLowerCase()}`} label={s} activeSection={activeSection} />
          ))}
        </div>
      </nav>

{/* HERO */}
<section id="home" style={{
  display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center',
  padding: '6rem 4rem 0rem 4rem', gap: '2rem', position: 'relative', zIndex: 5,
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
            borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#a78bfa',
            fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.2rem'
          }}>
            <span style={{ width: 6, height: 6, background: '#a78bfa', borderRadius: '50%', display: 'inline-block' }} />
            Open to opportunities
          </div>

          <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.8rem', whiteSpace: 'nowrap' }}>
  <span style={{ color: '#a78bfa' }}>Tuan (Tom)</span><br />Tran
          </h1>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: '#a78bfa', marginBottom: '1.2rem', minHeight: 28 }}>
            <span style={{ color: '#475569' }}>// </span>
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

          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, maxWidth: 420, marginBottom: '2rem' }}>
            A data-driven International Business student leveraging Python, SQL, and statistical modeling to optimize workflows and provide data-driven solutions.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: '2rem' }}>
            {[
              { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/tran-vo-manh-tuan' },
              { icon: 'ti-brand-github', href: '#' },
              { icon: 'ti-file-text', href: '#' },
              { icon: 'ti-mail', href: 'https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com' },
            ].map(({ icon, href }) => (
              <motion.a
  key={icon}
  href={href}
  target="_blank"
  rel="noreferrer"
  whileHover={{ y: -4, scale: 1.15, color: '#a78bfa', borderColor: '#a78bfa' }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    width: 36, height: 36, borderRadius: 8,
    border: '0.5px solid rgba(139,92,246,0.3)',
    background: 'rgba(139,92,246,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#94a3b8', fontSize: 16, textDecoration: 'none'
  }}
>
  <i className={`ti ${icon}`} />
</motion.a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.a
  href="/Resume_Tran Vo Manh Tuan.pdf"
  download="CV_Tran_Vo_Manh_Tuan.pdf"
  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124,58,237,0.5)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: '#7c3aed', color: '#fff', border: 'none',
    padding: '10px 22px', borderRadius: 8, fontSize: 13,
    fontFamily: "'Syne', sans-serif", fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    textDecoration: 'none'
  }}
>
  <i className="ti ti-download" /> Download CV
</motion.a>
            <motion.a
  href="https://calendly.com/tomtran-workcontact"
  target="_blank"
  rel="noreferrer"
  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(139,92,246,0.25)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  style={{
    background: 'transparent', color: '#a78bfa',
    border: '0.5px solid rgba(139,92,246,0.5)',
    padding: '10px 22px', borderRadius: 8, fontSize: 13,
    fontFamily: "'Syne', sans-serif", fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    textDecoration: 'none'
  }}
>
  <i className="ti ti-coffee" /> Book a chat
</motion.a>
          </div>
        </motion.div>

      {/* Lottie Animation */}
       <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
  whileHover={{ scale: 1.03 }}
  style={{ 
    display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
    cursor: 'pointer', position: 'relative',
    marginRight: '-2.5rem', marginBottom: '-2rem'
  }}
>
  <div style={{
    position: 'absolute', top: '40%', left: '30%',
    transform: 'translate(-50%, -50%)',
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0
  }} />
  <Lottie
  animationData={animationData}
  loop={true}
  style={{ width: '100%', maxWidth: 580, position: 'relative', zIndex: 1 }}
/>
</motion.div>
</section>

      {/* STATS */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        margin: '0 2.5rem 3rem',
        border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: 10, overflow: 'hidden',
        position: 'relative', zIndex: 5
      }}>
        {[
          { num: '12+', label: 'Projects' },
          { num: '8', label: 'GitHub Repos' },
          { num: '3', label: 'Certifications' },
        ].map(({ num, label }, i) => (
          <div key={label} style={{
            background: '#0a0e1a', padding: '1rem 1.2rem', textAlign: 'center',
            borderRight: i < 2 ? '0.5px solid rgba(139,92,246,0.2)' : 'none'
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>{num}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

     {/* PROJECTS */}
      <section id="projects" style={{ padding: '0 2.5rem 4rem', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// featured projects</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(139,92,246,0.2)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            {
              type: 'Investment Analysis', title: 'DCF Valuation Engine', accent: '#7c3aed',
              desc: 'Python-based DCF model with sensitivity analysis across 50+ companies.',
              tags: ['Python', 'Plotly', 'Finance'], github: '#'
            },
            {
              type: 'Market Research', title: 'Vietnam E-commerce Analysis', accent: '#0d9488',
              desc: 'Competitive landscape study with customer segmentation and growth projections.',
              tags: ['Pandas', 'Strategy', 'Streamlit'], github: '#'
            },
            {
              type: 'Data Engineering', title: 'Financial Data Pipeline', accent: '#d97706',
              desc: 'Automated ETL pipeline pulling live market data into structured dashboards.',
              tags: ['Python', 'SQL', 'APIs'], github: '#'
            },
            {
              type: 'Consulting Case', title: 'Market Entry Strategy', accent: '#db2777',
              desc: 'Full consulting deck for Southeast Asia market entry with financial modelling.',
              tags: ['Strategy', 'Excel', 'Research'], github: '#'
            },
          ].map(({ type, title, accent, desc, tags, github }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, boxShadow: `0 8px 30px ${accent}30` }}
              style={{
                background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
                borderRadius: 10, padding: '1.1rem 1.2rem', position: 'relative', overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, borderRadius: '10px 10px 0 0' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{type}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{title}</div>
              <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, marginBottom: 10 }}>{desc}</p>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    background: 'rgba(139,92,246,0.12)', color: '#7c3aed',
                    border: '0.5px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 7px'
                  }}>{tag}</span>
                ))}
              </div>
              <a href={github} style={{ fontSize: 12, color: '#a78bfa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="ti ti-brand-github" /> View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </section>

     {/* EXPERIENCE */}
      <section id="experience" style={{ padding: '0 2.5rem 4rem', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// experience</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(139,92,246,0.2)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              role: 'Research Team Leader & Data Analyst',
              company: 'Scientific Research Competition',
              period: 'Jan 2026 — Present',
              desc: 'Led a team of 4 to analyze institutional quality and macro demand drivers affecting international services trade. Built time-series models in Stata and Python, improving forecasting accuracy by 80% through rigorous robustness testing.'
            },
            {
              role: 'Marketing Data Consultant',
              company: 'Phun Xam Vic',
              period: 'Jan 2026 — Feb 2026',
              desc: 'Digitized 2000+ customer records using Pandas and Power Query, accelerating workflows by 50%. Automated lead-to-transaction pipelines and delivered interactive Looker Studio dashboards improving revenue visibility by 20%.'
            },
            {
              role: 'Research Assistant',
              company: 'University of Economics and Finance (UEF) — Mentored by Dr. Trinh Cong Tam',
              period: 'Nov 2025 — Jan 2026',
              desc: 'Structured and cleaned complex datasets via Python and Stata with 98% accuracy. Optimized reporting cycles by saving 2–3 hours per report through proactive data pipeline improvements.'
            },
            {
              role: 'Commercial Strategy Analyst',
              company: 'Project: Mindflow | APEC Innovation',
              period: 'Jan 2026 — Mar 2026',
              desc: 'Secured Top 150 national ranking (Semifinalist) by conducting demand modeling and market feasibility analysis. Projected 20% net profit margin at 5,000 users via rolling forecasts and scenario analysis in Excel.'
            },
          ].map(({ role, company, period, desc }, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              style={{
                background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
                borderRadius: 10, padding: '1.2rem 1.5rem',
                display: 'grid', gridTemplateColumns: '1fr auto'
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>{role}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa', marginBottom: 8 }}>{company}</div>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{desc}</p>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#475569', whiteSpace: 'nowrap', marginLeft: 16 }}>{period}</div>
            </motion.div>
          ))}
        </div>

        {/* EDUCATION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2.5rem 0 1.5rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// education</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(139,92,246,0.2)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
            borderRadius: 10, padding: '1.2rem 1.5rem',
            display: 'grid', gridTemplateColumns: '1fr auto'
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>Bachelor of International Business</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#a78bfa', marginBottom: 8 }}>Foreign Trade University — Taiwan Joint Transfer Program</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {['GPA: 4.0/4.0', 'IELTS 7.5', 'TOEIC 980'].map(badge => (
                <span key={badge} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  background: 'rgba(139,92,246,0.12)', color: '#a78bfa',
                  border: '0.5px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 8px'
                }}>{badge}</span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
              Data Analytics · Statistics for Business · International Economics · Macroeconomics · Corporate Finance · Accounting Principles
            </p>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#475569', whiteSpace: 'nowrap', marginLeft: 16 }}>Expected 2028</div>
        </motion.div>
      </section>

{/* CONTACT */}
      <section id="contact" style={{ padding: '0 2.5rem 5rem', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// contact</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(139,92,246,0.2)' }} />
        </div>
        <div style={{
          background: '#0f1629', border: '0.5px solid rgba(139,92,246,0.2)',
          borderRadius: 12, padding: '2.5rem', textAlign: 'center', maxWidth: 500, margin: '0 auto'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem' }}>Let's work together</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Open to internships, graduate roles, and freelance projects in finance, data analysis, and business strategy.
          </p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
  <a href="https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com"
    target="_blank" rel="noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#7c3aed', color: '#fff', textDecoration: 'none',
      padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
      fontFamily: "'Syne', sans-serif"
    }}>
    <i className="ti ti-mail" style={{ fontSize: 16 }} /> tomtran.workcontact@gmail.com
  </a>
 <a href="tel:+84398434620"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'transparent', color: '#a78bfa', textDecoration: 'none',
    border: '0.5px solid rgba(139,92,246,0.5)',
    padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
    fontFamily: "'Syne', sans-serif",
    whiteSpace: 'nowrap'
  }}>
  <i className="ti ti-phone" style={{ fontSize: 16, fontFamily: 'tabler-icons', color: '#a78bfa' }} />
  <span style={{ fontFamily: "'Syne', sans-serif", color: '#a78bfa' }}>(+84) 398 434 620</span>
</a>
</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '1.5rem', borderTop: '0.5px solid rgba(139,92,246,0.15)',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#475569',
        position: 'relative', zIndex: 5
      }}>
        built with Next.js · deployed on Vercel · © 2026
      </footer>
      <GoToTop />
    </main>
  )
}