'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'

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
const getToolStyle = (tag) => toolStyle[tag] || { color: '#7c3aed', bg: 'rgba(139,92,246,0.12)' }

export const projects = [
  {
    id: 1,
    category: 'Investment Analysis',
    title: 'Unpacking the "Black Box": The Multidimensional Impact of Institutional Quality on Bilateral Services Trade',
    desc: 'This paper examines the impact of institutional quality and cultural distance on global services trade within a gravity model framework.',
    image: "/Research.png",
    highlights: ['77 countries panel', 'Gravity Model', 'PPML','Finance', 'International Trade'],
    tags: ['Stata', 'Python'],
    link: 'https://drive.google.com/file/d/19NL0Z4VLhkoKpsxZJSJYtplDTQBO8iGA/view?usp=drive_link',
  },
  {
    id: 2,
    category: 'Market Research',
    title: 'Mindflow - Market Analysis',
    desc: 'Competitive landscape study with customer segmentation and growth projections.',
    image: "/Mindflow.png",
    highlights: ['Customer segmentation', 'Growth projections', 'Competitive landscape', 'Business Model Analysis', 'Cost-Benefit Analysis'],
    tags: ['NotebookLM', 'Excel', 'Gemini'],
    link: 'https://drive.google.com/file/d/1OwGnORnC7wxXaYlUFP-ephV0sCxtBsXk/view?usp=sharing',
  },
  {
    id: 3,
    category: 'Data Analysis',
    title: 'Phun Xam Vic',
    desc: 'Automated ETL pipeline pulling live market data into structured dashboards.',
    image: '/phun_xam_vic.png',
    highlights: ['Live market data', 'Automated ETL', 'Structured dashboards'],
    tags: ['Python', 'Excel', 'Looker Studio'],
    link: 'https://github.com/tomtran-786/Phun-Xam-Vic---Data-Analysis/tree/main',
  },
  {
    id: 4,
    category: 'Market Research',
    title: 'SME Lending and Transational Data as a moat',
    desc: 'A deep landscape and competitor analysis adopted from a VNG assignment during my job application as a Strategic Finance Intern.',
    image: '/VNG.jpg',
    highlights: ['Landscape Analysis', 'Competitor Analysis', 'Credit lending'],
    tags: ['NotebookLM', 'Powerpoint'],
    link: 'https://drive.google.com/file/d/1Vkv03y4sedCX6xB1TBuW9aGCMyBeBEg4/view?usp=sharing'
  },
  {
    id: 5,
    category: 'Consulting Case',
    title: 'Cosmo Launch: Winning Sensory-First Premium',
    desc: 'A data-driven NPD launch plan for Cosmo - a sensory -first premium product in 2026 adopted from a Unilever assignment during my job application as a CSP Planning Intern.',
    image: '/unilever.jpg',
    highlights: ['Landscape Analysis', 'Competitor Analysis', 'Product Launch Strategy'],
    tags: ['NotebookLM', 'Powerpoint'],
    link: 'https://drive.google.com/file/d/14W1O3aFSrPmrmwhGcCrI3XILGVEWKwcp/view?usp=drive_link'
  },
  {
    id: 6,
    category: 'Product Management',
    title: 'Chemistery — Chemistry Course Platform',
    desc: 'An e-learning platform I built end to end for a chemistry instructor preparing students for the national gifted student exam. I designed and set up the database, built the site, and shipped the payment and checkout flow.',
    image: '/chemistery.png',
    highlights: ['Database design', 'Payment & checkout', 'Course catalog', 'Order management'],
    tags: ['Next.js', 'React', 'Tailwind', 'Prisma', 'Supabase', 'Looker Studio'],
    link: 'https://github.com/trungkt2006/portfolio-app',
    dashboardLink: 'https://datastudio.google.com/reporting/91c25284-8111-4a8b-8106-698dfe304239',
  }
]

const ALL = 'All'
const categoryList = [ALL, 'Investment Analysis', 'Market Research', 'Data Analysis', 'Consulting Case', 'Product Management']

// Card với hover state nội bộ
function ProjectCard({ proj, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <TiltCard>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: BACK_EASE }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      // `y` phải nằm ở whileHover chứ không phải animate: whileInView ở trên đã
      // khoá y:0 và nó ưu tiên cao hơn animate, nên animate={{y:-8}} bị nuốt —
      // card chưa bao giờ nhấc lên. boxShadow thì chạy vì whileInView không đụng tới.
      whileHover={{ y: -8 }}
      animate={{
        boxShadow: hovered
          ? '0 16px 40px rgba(124,58,237,0.3)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      style={{
        position: 'relative',
        background: '#0f1629',
        border: hovered
          ? '0.5px solid rgba(139,92,246,0.6)'
          : '0.5px solid rgba(139,92,246,0.2)',
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        transition: 'border 0.2s',
      }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1e293b', overflow: 'hidden' }}>
        <Image
          src={proj.image}
          alt={proj.title}
          fill
          sizes="33vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.10)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: '#7c3aed', color: '#fff',
          fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 999,
        }}>
          {proj.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
        {/* Title đổi màu tím khi hover */}
        <h3 style={{
          fontSize: 17, fontWeight: 700,
          color: hovered ? '#a78bfa' : '#fff',
          marginBottom: '0.5rem',
          lineHeight: 1.4,
          transition: 'color 0.2s ease',
        }}>
          {proj.title}
        </h3>

        <p style={{ fontSize: 13, color: '#B2BEC3', lineHeight: 1.7, marginBottom: '0.8rem' }}>
          {proj.desc}
        </p>

        {/* Tags với màu riêng */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
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
        <img
          src={logo}
          alt={tag}
          style={{ width: 14, height: 14, objectFit: 'contain' }}
        />
      )}
      {tag}
    </span>
  )
})}
        </div>
      </div>

      {/* Vạch gradient đáy — chỉ hiện khi hover.
          Điểm dừng siết vào 30%..70% để phần sáng gọn giữa thay vì loang hết
          chiều ngang card; hai bên tắt hẳn. */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent 30%, #7c3aed 50%, transparent 70%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />
    </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const [active, setActive] = useState(ALL)
  const [selected, setSelected] = useState(null)

  // Khóa scroll khi modal mở
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  // Đóng modal khi scroll, click nav, hoặc nhấn Escape
  useEffect(() => {
    if (!selected) return
    const handleScroll = () => setSelected(null)
    const handleNavClick = (e) => { if (e.target.closest('nav')) setSelected(null) }
    const handleKeyDown = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleNavClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
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

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: '#9B51E0', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
          My Works
        </h2>
        <p style={{ fontSize: 22, fontWeight: 500, color: '#FFFFFF', margin: 0 }}>
          What I do at 2 AM on a Saturday
        </p>
      </div>

      {/* Filter tabs với bộ đếm */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categoryList.map(cat => {
          const count = countFor(cat)
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', border: '0.5px solid rgba(139,92,246,0.4)',
                background: isActive ? '#7c3aed' : 'rgba(139,92,246,0.08)',
                color: isActive ? '#fff' : '#a78bfa',
                transition: 'all 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              {cat}
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(139,92,246,0.2)',
                color: isActive ? '#fff' : '#a78bfa',
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

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 9999, padding: '2rem', overflowY: 'auto',
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0f1629', borderRadius: 18, overflow: 'hidden',
                maxWidth: 680, width: '100%',
                border: '0.5px solid rgba(139,92,246,0.3)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Modal image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1e293b' }}>
                <Image src={selected.image} alt={selected.title} fill sizes="680px" style={{ objectFit: 'cover' }} />
              </div>

              {/* Modal content */}
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{
                  display: 'inline-block', background: '#7c3aed', color: '#fff',
                  fontSize: 12, fontWeight: 600, padding: '4px 12px',
                  borderRadius: 999, marginBottom: '0.8rem',
                }}>
                  {selected.category}
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                  {selected.title}
                </h3>
                <p style={{ fontSize: 15, color: '#B2BEC3', lineHeight: 1.75, marginBottom: '1.2rem' }}>
                  {selected.desc}
                </p>

                {/* Key highlights */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Key Highlights
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.highlights.map(h => (
                      <span key={h} style={{
                        fontSize: 13, fontWeight: 600, color: '#fff',
                        background: 'rgba(255,255,255,0.06)',
                        border: '0.5px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, padding: '6px 14px',
                      }}>{h}</span>
                    ))}
                  </div>
                </div>

                {/* Tech stack với màu */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
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
        <img
          src={logo}
          alt={tag}
          style={{ width: 14, height: 14, objectFit: 'contain' }}
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
                      background: '#7c3aed', color: '#fff',
                      fontSize: 15, fontWeight: 600, padding: '12px 24px', borderRadius: 999,
                      textDecoration: 'none',
                    }}
                  >
                    View Project <i className="ti ti-external-link" />
                  </a>
                  {selected.dashboardLink && (
                    <a
                      href={selected.dashboardLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: '#fff', color: '#0a0e1a',
                        border: '0.5px solid rgba(139,92,246,0.5)',
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
                      background: 'transparent', border: '0.5px solid rgba(139,92,246,0.3)',
                      color: '#a78bfa', fontSize: 14, fontWeight: 500,
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
      </AnimatePresence>
    </section>
  )
}