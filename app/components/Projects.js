'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'
import useScrollLock from '../hooks/useScrollLock'
import useFocusTrap from '../hooks/useFocusTrap'

// Easing nảy của bản gốc: cubic-bezier(0.34, 1.56, 0.64, 1)
const BACK_EASE = [0.34, 1.56, 0.64, 1]

// Map tool → màu + icon
const toolStyle = {
  'Stata':           { color: '#1a5276', bg: '#d6eaf8', logo: '/logos/stata.svg' },
  'Python':          { color: '#3572A5', bg: '#e8f0fe', logo: '/logos/python.svg' },
  'Excel':           { color: '#217346', bg: '#d5f5e3', logo: '/logos/excel.svg' },
  'Looker Studio':   { color: '#4285F4', bg: '#e8f0fe', logo: '/logos/looker.svg' },
  'NotebookLM':      { color: '#ea4335', bg: '#fce8e6', logo: '/logos/notebooklm.svg' },
  'Gemini':          { color: '#1a73e8', bg: '#e8f0fe', logo: '/logos/gemini.svg' },
  'Powerpoint':      { color: '#d24726', bg: '#fde9e4', logo: '/logos/powerpoint.svg' },
  'Next.js':         { color: '#000000', bg: '#ececec', logo: '/logos/nextjs.svg' },
  'React':           { color: '#0b7285', bg: '#e0f7fb', logo: '/logos/react.svg' },
  'Tailwind':        { color: '#0e7490', bg: '#e0f5fa', logo: '/logos/tailwind.svg' },
  'Prisma':          { color: '#2D3748', bg: '#e8eaed', logo: '/logos/prisma.svg' },
  'Supabase':        { color: '#1c7a4d', bg: '#e3f7ed', logo: '/logos/supabase.svg' },
}
const getToolStyle = (tag) => toolStyle[tag] || { color: 'var(--pf-brand)', bg: 'var(--pf-brand-soft)' }

export const projects = [
  {
    id: 1,
    category: 'Investment Analysis',
    title: 'Unpacking the "Black Box": The Multidimensional Impact of Institutional Quality on Bilateral Services Trade',
    desc: 'This paper examines the impact of institutional quality and cultural distance on global services trade within a gravity model framework.',
    image: "/projects/research.png",
    highlights: ['77 countries panel', 'Gravity Model', 'PPML','Finance', 'International Trade'],
    tags: ['Stata', 'Python'],
    link: 'https://drive.google.com/file/d/19NL0Z4VLhkoKpsxZJSJYtplDTQBO8iGA/view?usp=drive_link',
  },
  {
    id: 2,
    category: 'Market Research',
    title: 'Mindflow - Market Analysis',
    desc: 'Competitive landscape study with customer segmentation and growth projections.',
    image: "/projects/mindflow.png",
    highlights: ['Customer segmentation', 'Growth projections', 'Competitive landscape', 'Business Model Analysis', 'Cost-Benefit Analysis'],
    tags: ['NotebookLM', 'Excel', 'Gemini'],
    link: 'https://drive.google.com/file/d/1OwGnORnC7wxXaYlUFP-ephV0sCxtBsXk/view?usp=sharing',
  },
  {
    id: 3,
    category: 'Data Analysis',
    title: 'Phun Xam Vic',
    desc: 'Automated ETL pipeline pulling live market data into structured dashboards.',
    image: '/projects/phun-xam-vic.png',
    highlights: ['Live market data', 'Automated ETL', 'Structured dashboards'],
    tags: ['Python', 'Excel', 'Looker Studio'],
    link: 'https://github.com/tomtran-786/Phun-Xam-Vic---Data-Analysis/tree/main',
    dashboardLink: 'https://datastudio.google.com/u/0/reporting/19939443-e921-49d9-948d-03b4d663c5da/page/jQvqF',
  },
  {
    id: 4,
    category: 'Market Research',
    title: 'SME Lending and Transational Data as a moat',
    desc: 'A deep landscape and competitor analysis adopted from a VNG assignment during my job application as a Strategic Finance Intern.',
    image: '/projects/vng.jpg',
    highlights: ['Landscape Analysis', 'Competitor Analysis', 'Credit lending'],
    tags: ['NotebookLM', 'Powerpoint'],
    link: 'https://drive.google.com/file/d/1Vkv03y4sedCX6xB1TBuW9aGCMyBeBEg4/view?usp=sharing'
  },
  {
    id: 5,
    category: 'Consulting Case',
    title: 'Cosmo Launch: Winning Sensory-First Premium',
    desc: 'A data-driven NPD launch plan for Cosmo - a sensory -first premium product in 2026 adopted from a Unilever assignment during my job application as a CSP Planning Intern.',
    image: '/projects/unilever.jpg',
    highlights: ['Landscape Analysis', 'Competitor Analysis', 'Product Launch Strategy'],
    tags: ['NotebookLM', 'Powerpoint'],
    link: 'https://drive.google.com/file/d/14W1O3aFSrPmrmwhGcCrI3XILGVEWKwcp/view?usp=drive_link'
  },
  {
    id: 6,
    category: 'Product Management',
    title: 'Chemistery — Chemistry Course Platform',
    desc: 'An e-learning platform I built end to end for a chemistry instructor preparing students for the national gifted student exam. I designed and set up the database, built the site, and shipped the payment and checkout flow.',
    image: '/projects/chemistery.png',
    highlights: ['Database design', 'Payment & checkout', 'Course catalog', 'Order management'],
    tags: ['Next.js', 'React', 'Tailwind', 'Prisma', 'Supabase', 'Looker Studio'],
    link: 'https://chemisteryacademy.com/courses',
    dashboardLink: 'https://datastudio.google.com/reporting/91c25284-8111-4a8b-8106-698dfe304239',
  },
  {
    id: 7,
    category: 'Learning',
    title: 'Xom Data Practice Portfolio',
    desc: 'A version-controlled collection of SQL and Python solutions, organized by language and difficulty to document consistent problem-solving practice.',
    image: '/projects/xomdata-practice.svg',
    highlights: ['SQL problem solving', 'Python practice', 'Difficulty-based structure', 'Documented learning progress'],
    tags: ['Python', 'SQL', 'GitHub'],
    link: 'https://github.com/tomtran-786/xomdata-practice',
  },
  {
    id: 8,
    category: 'Consulting Case',
    title: 'UniSweet FY2024 Performance Review',
    desc: 'An end-to-end Finance Business Partner case that turns raw market, sales, and P&L data into an executive performance review and action plan.',
    image: '/projects/unisweet-performance-review.png',
    highlights: ['Sales & P&L analysis', 'Market diagnostics', 'Financial storytelling', 'Leadership action plan'],
    tags: ['Python', 'Excel', 'Powerpoint'],
    link: 'https://github.com/tomtran-786/Unisweet---Sales-and-Financial-Analysis',
  }
]

const ALL = 'All'
const categoryList = [ALL, 'Investment Analysis', 'Market Research', 'Data Analysis', 'Consulting Case', 'Product Management', 'Learning']

// Card với hover state nội bộ
function ProjectCard({ proj, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <TiltCard style={{ height: '100%' }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: BACK_EASE }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${proj.title}`}
      className="pf-project-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      // `y` phải nằm ở whileHover chứ không phải animate: whileInView ở trên đã
      // khoá y:0 và nó ưu tiên cao hơn animate, nên animate={{y:-8}} bị nuốt —
      // card chưa bao giờ nhấc lên. boxShadow thì chạy vì whileInView không đụng tới.
      whileHover={{ y: -8 }}
      animate={{
        boxShadow: hovered
          ? 'var(--pf-shadow-hover)'
          : '0 0 0 rgba(23,38,54,0)',
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--pf-surface)',
        border: hovered
          ? '1px solid var(--pf-border-strong)'
          : '1px solid var(--pf-border)',
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        transition: 'border 0.2s',
      }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--pf-surface-muted)', overflow: 'hidden' }}>
        <Image
          src={proj.image}
          alt={proj.title}
          fill
          // .pf-card-grid sập về 1 cột ở <=768px nên card rộng ~100vw; để nguyên
          // 33vw thì trình duyệt tải bản nhỏ hơn 3 lần khung thật -> ảnh mờ.
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.10)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'var(--pf-brand)', color: 'var(--pf-on-brand)',
          fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 999,
        }}>
          {proj.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.2rem 1.2rem', display: 'flex', flex: 1, flexDirection: 'column' }}>
        {/* Title đổi màu tím khi hover */}
        <h3 style={{
          fontSize: 17, fontWeight: 700,
          color: hovered ? 'var(--pf-brand)' : 'var(--pf-ink)',
          marginBottom: '0.5rem',
          lineHeight: 1.4,
          transition: 'color 0.2s ease',
        }}>
          {proj.title}
        </h3>

        <p style={{ fontSize: 13, color: 'var(--pf-text-secondary)', lineHeight: 1.7, marginBottom: '0.8rem' }}>
          {proj.desc}
        </p>

        {/* Tags với màu riêng */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
          {proj.tags.map(tag => {
  const { color, bg, logo } = getToolStyle(tag)
  return (
    <span key={tag} style={{
      fontSize: 11, fontWeight: 600,
      background: bg, color: color,
      borderRadius: 25, padding: '3px 10px',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      {logo && (
        <Image
          src={logo}
          alt={tag}
          width={14}
          height={14}
          style={{ objectFit: 'contain' }}
        />
      )}
      {tag}
    </span>
  )
})}
        </div>
      </div>

    </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const [active, setActive] = useState(ALL)
  const [selected, setSelected] = useState(null)
  const [portalTarget, setPortalTarget] = useState(null)

  // Chỉ lấy document.body sau khi hydrate. Modal được portal ra ngoài
  // section#projects để --z-modal không bị kẹt trong stacking context z-index: 5.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPortalTarget(document.body))
    return () => cancelAnimationFrame(frame)
  }, [])

  useScrollLock(Boolean(selected))
  const modalRef = useFocusTrap(Boolean(selected))

  // Đóng modal khi click nav hoặc nhấn Escape.
  // KHÔNG đóng theo sự kiện scroll: trên iOS Safari lớp phủ không chặn được
  // thao tác chạm, nên cú vuốt đầu tiên để đọc tiếp nội dung modal lại làm trang
  // nền cuộn -> scroll bắn -> modal tự biến mất giữa chừng.
  useEffect(() => {
    if (!selected) return
    const handleNavClick = (e) => { if (e.target.closest('nav')) setSelected(null) }
    const handleKeyDown = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('click', handleNavClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleNavClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])

  const filtered = active === ALL ? projects : projects.filter(p => p.category === active)

  // Đếm số project theo category
  const countFor = (cat) => cat === ALL
    ? projects.length
    : projects.filter(p => p.category === cat).length

  return (
    <section id="projects" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
      <style>{`
        .pf-project-card:focus-visible {
          outline: 3px solid #297fd6;
          outline-offset: 4px;
        }
      `}</style>

      {/* Header */}
      <div className="pf-section-heading">
        <h2 className="pf-section-title" style={{ fontWeight: 700, margin: 0 }}>
          My Works
        </h2>
        <p className="pf-section-subtitle pf-section-context" style={{ fontWeight: 500 }}>
          What I do at 2 AM on a Saturday
        </p>
      </div>

      {/* Filter tabs với bộ đếm */}
      <div className="pf-filter-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categoryList.map(cat => {
          const count = countFor(cat)
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', border: isActive ? '1px solid var(--pf-brand)' : '1px solid transparent',
                background: isActive ? 'var(--pf-brand)' : 'var(--pf-bg-soft)',
                color: isActive ? 'var(--pf-on-brand)' : 'var(--pf-brand)',
                transition: 'all 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              {cat}
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.22)' : 'transparent',
                color: isActive ? 'var(--pf-on-brand)' : 'var(--pf-brand)',
                borderRadius: 999, padding: '1px 7px',
                minWidth: 20, textAlign: 'center',
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="pf-card-grid">
        {filtered.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            proj={proj}
            index={i}
            onClick={() => setSelected(proj)}
          />
        ))}
      </div>

      {/* Portal giữ AnimatePresence mounted để exit animation vẫn chạy khi đóng. */}
      {portalTarget && createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0, background: 'var(--pf-overlay)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                zIndex: 'var(--z-modal)', padding: '2rem', overflowY: 'auto',
              }}
            >
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label={selected.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--pf-surface)', borderRadius: 18, overflow: 'hidden',
                  maxWidth: 680, width: '100%',
                  margin: 'auto 0',
                  border: '1px solid var(--pf-border)',
                  boxShadow: 'var(--pf-modal-shadow)',
                  fontFamily: 'var(--font-portfolio)',
                }}
              >
              {/* Modal image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--pf-surface-muted)' }}>
                <Image src={selected.image} alt={selected.title} fill sizes="680px" style={{ objectFit: 'cover' }} />
              </div>

              {/* Modal content */}
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{
                  display: 'inline-block', background: 'var(--pf-brand)', color: 'var(--pf-on-brand)',
                  fontSize: 12, fontWeight: 600, padding: '4px 12px',
                  borderRadius: 999, marginBottom: '0.8rem',
                }}>
                  {selected.category}
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--pf-ink)', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                  {selected.title}
                </h3>
                <p style={{ fontSize: 15, color: 'var(--pf-text-secondary)', lineHeight: 1.75, marginBottom: '1.2rem' }}>
                  {selected.desc}
                </p>

                {/* Key highlights */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pf-brand)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Key Highlights
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.highlights.map(h => (
                      <span key={h} style={{
                        fontSize: 13, fontWeight: 600, color: 'var(--pf-ink)',
                        background: 'var(--pf-bg-soft)',
                        border: '1px solid var(--pf-border)',
                        borderRadius: 8, padding: '6px 14px',
                      }}>{h}</span>
                    ))}
                  </div>
                </div>

                {/* Tech stack với màu */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pf-brand)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Tech Stack
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.tags.map(tag => {
  const { color, bg, logo } = getToolStyle(tag)
  return (
    <span key={tag} style={{
      fontSize: 11, fontWeight: 600,
      background: bg, color: color,
      borderRadius: 25, padding: '3px 10px',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      {logo && (
        <Image
          src={logo}
          alt={tag}
          width={14}
          height={14}
          style={{ objectFit: 'contain' }}
        />
      )}
      {tag}
    </span>
  )
})}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: selected.link?.includes('github.com') ? 'var(--pf-brand-deep)' : 'var(--pf-brand)',
                      color: 'var(--pf-on-brand)',
                      fontSize: 15, fontWeight: 600, padding: '12px 24px', borderRadius: 999,
                      textDecoration: 'none',
                    }}
                  >
                    {selected.link?.includes('github.com') ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        View on GitHub
                      </>
                    ) : (
                      <>View Project <i className="ti ti-external-link" /></>
                    )}
                  </a>
                  {selected.dashboardLink && (
                    <a
                      href={selected.dashboardLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'var(--pf-surface)', color: 'var(--pf-brand-deep)',
                        border: '1px solid var(--pf-border-strong)',
                        fontSize: 15, fontWeight: 600, padding: '12px 24px', borderRadius: 999,
                        textDecoration: 'none',
                      }}
                    >
                      View Dashboard <i className="ti ti-chart-bar" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      background: 'transparent', border: '1px solid var(--pf-border-strong)',
                      color: 'var(--pf-brand)', fontSize: 14, fontWeight: 600,
                      padding: '12px 20px', borderRadius: 999, cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        portalTarget
      )}
    </section>
  )
}
