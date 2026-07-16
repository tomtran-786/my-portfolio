'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { experiences } from '../../data/experiences'

export default function Timeline() {
  return (
    <section
      id="experience"
      className="pf-section"
      style={{ position: 'relative', zIndex: 5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h2 style={{
          fontSize: 52,
          fontWeight: 700,
          color: '#9B51E0',
          margin: '0 0 0.4rem',
          lineHeight: 1.1, fontFamily: 'var(--font-inter)'
        }}>
          Timeline
        </h2>
        <p style={{
          fontSize: 22,
          fontWeight: 500,
          color: '#FFFFFF',
          margin: 0,
        }}>
          A quick recap of proud moments
        </p>
      </div>

      {/* Timeline Container */}
      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>

        {/* Vertical Center Line */}
        <div className="pf-timeline-line" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 1, background: 'rgba(124,58,237,0.25)',
          transform: 'translateX(-50%)'
        }} />

        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="pf-timeline-row"
              style={{
                alignItems: 'center',
                marginBottom: '5rem',
                gap: 0,
              }}
            >
              {/* Left slot */}
              <div style={{ paddingRight: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                {isEven ? (
                  <TextBlock exp={exp} align="right" />
                ) : (
                  <ImageBlock exp={exp} />
                )}
              </div>

              {/* Center Node */}
              <div className="pf-timeline-node" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  width: 18, height: 18,
                  borderRadius: '50%',
                  border: '3px solid #7c3aed',
                  background: '#0a0e1a',
                  boxShadow: '0 0 12px rgba(124,58,237,0.6)',
                  flexShrink: 0,
                  zIndex: 2
                }} />
              </div>

              {/* Right slot */}
              <div style={{ paddingLeft: '2rem' }}>
                {isEven ? (
                  <ImageBlock exp={exp} />
                ) : (
                  <TextBlock exp={exp} align="left" />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function TextBlock({ exp, align }) {
  const isRight = align === 'right'

  return (
    <div className="pf-timeline-text" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isRight ? 'flex-end' : 'flex-start',
      textAlign: isRight ? 'right' : 'left',
      maxWidth: 460,
    }}>
      {/* Date — 15px Bold #A29BFE */}
      <span style={{
        fontSize: 18,
        fontWeight: 800,
        color: '#A29BFE',
        marginBottom: '0.6rem',
        letterSpacing: '0.02em',
      }}>
        {exp.date}
      </span>

      {/* Title + Company — 24px Semi-Bold #FFFFFF */}
      <h3 style={{
        fontSize: 24,
        fontWeight: 700,
        color: '#FFFFFF',
        margin: '0 0 0.6rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      }}>
        {exp.title}{' - '}
        <span style={{
          textDecoration: 'underline',
          textDecorationColor: '#9B51E0',
          textUnderlineOffset: 5,
          textDecorationThickness: 2,
        }}>
          {exp.company}
        </span>
      </h3>

      {/* Description — 15px Regular #B2BEC3 */}
      <p style={{
        fontSize: 15,
        fontWeight: 700,
        color: '#E6E7EB',
        lineHeight: 1.75,
        marginBottom: '0.75rem',
        maxWidth: 400,
      }}>
        {exp.description}
      </p>

      {/* Tools */}
      {exp.tools && (
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 12,
          fontWeight: 400,
          color: '#B2BEC3',
          marginBottom: '1.25rem',
        }}>
          <span style={{ color: '#9B51E0', fontWeight: 600 }}>Tools: </span>{exp.tools}
        </p>
      )}

      {/* Location Badge — 13px Medium #FFFFFF */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999,
        border: '0.5px solid rgba(155,81,224,0.4)',
        background: 'rgba(155,81,224,0.12)',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#9B51E0">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#FFFFFF',
        }}>
          {exp.location}
        </span>
      </div>
    </div>
  )
}

function ImageBlock({ exp }) {
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: 440,
      aspectRatio: '16/9',
      borderRadius: 12, overflow: 'hidden',
      border: '0.5px solid rgba(139,92,246,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <Image
        src={exp.image}
        alt={`${exp.company} visual`}
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  )
}