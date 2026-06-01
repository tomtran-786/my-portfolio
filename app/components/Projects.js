'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'


const projects = [
  {
    id: 1,
    category: 'Investment Analysis',
    title: 'Unpacking the "Black Box": The Multidimensional Impact of Institutional Quality on Bilateral Services Trade',
    desc: 'This paper examines the impact of institutional quality and cultural distance on global services trade within a gravity model framework.',
    image: "/Research.png",
    highlights: ['77 countries panel', 'Gravity Model', 'PPML'],
    tags: ['Stata', 'Python', 'Finance', 'International Trade'],
    link: 'https://drive.google.com/file/d/1xFxPuf6ykARBo1waxaLqcBMRiCsad5xj/view?usp=sharing',
  },
  {
    id: 2,
    category: 'Market Research',
    title: 'Mindflow - Market Analysis',
    desc: 'Competitive landscape study with customer segmentation and growth projections.',
    image: "/apec.png",
    highlights: ['Customer segmentation', 'Growth projections', 'Competitive landscape', 'Business Model Analysis', 'Cost-Benefit Analysis'],
    tags: ['NotebookLM', 'Excel', 'Gemini'],
    link: 'https://docs.google.com/document/d/1uUeDXTasFKTTIk1FaE-1w5xGx_iC2dxf/edit',
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
  }
]

const ALL = 'All'
const categories = [ALL, 'Investment Analysis', 'Market Research', 'Data Analysis', 'Consulting Case']

export default function Projects() {
  const [active, setActive] = useState(ALL)
  const [selected, setSelected] = useState(null)
   useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const filtered = active === ALL ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" style={{ padding: '4rem 2.5rem', position: 'relative', zIndex: 5 }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: '#9B51E0', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
          My Works
        </h2>
        <p style={{ fontSize: 22, fontWeight: 500, color: '#FFFFFF', margin: 0 }}>
          What I do at 2 AM on a Saturday
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', border: '0.5px solid rgba(139,92,246,0.4)',
              background: active === cat ? '#7c3aed' : 'rgba(139,92,246,0.08)',
              color: active === cat ? '#fff' : '#a78bfa',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {filtered.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(proj)}
            style={{
              background: '#0f1629',
              border: '0.5px solid rgba(139,92,246,0.2)',
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Cover image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1e293b' }}>
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="33vw"
                style={{ objectFit: 'cover' }}
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
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                {proj.title}
              </h3>
              <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                {proj.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {proj.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 12, fontWeight: 600,
                    background: 'rgba(139,92,246,0.12)', color: '#fff',
                    border: '0.5px solid rgba(139,92,246,0.3)',
                    borderRadius: 25, padding: '3px 9px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
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
        zIndex: 9999, padding: '2rem',
        overflowY: 'auto',
      }}
    >
      <motion.div
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
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="680px"
                  style={{ objectFit: 'cover' }}
                />
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

                <h3 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>
                  {selected.title}
                </h3>
                <p style={{ fontSize: 15, color: '#B2BEC3', lineHeight: 1.75, marginBottom: '1.2rem' }}>
                  {selected.desc}
                </p>

                {/* Key highlights */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: '#475569',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem',
                  }}>Key Highlights</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.highlights.map(h => (
                      <span key={h} style={{
                        fontSize: 14, fontWeight: 600, color: '#fff',
                        background: 'rgba(255,255,255,0.06)',
                        border: '0.5px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, padding: '6px 14px',
                      }}>{h}</span>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: '#475569',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem',
                  }}>Tech Stack</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 14, fontWeight: 600,
                        background: 'rgba(139,92,246,0.12)', color: '#fff',
                        border: '0.5px solid rgba(139,92,246,0.3)',
                        borderRadius: 25, padding: '6px 14px',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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