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
      <div className="pf-section-heading">
        <h2 className="pf-section-title" style={{
          fontWeight: 700,
          margin: 0,
        }}>
          Timeline
        </h2>
        <p className="pf-section-subtitle pf-section-context" style={{
          fontWeight: 500,
        }}>
          A quick recap of proud moments
        </p>
      </div>

      {/* Timeline Container */}
      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>

        {/* Vertical Center Line */}
        <div className="pf-timeline-line" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 1, background: 'var(--pf-border-strong)',
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
              {/* Copy luôn đứng trước media trong DOM để mobile và screen reader
                  đọc đúng ngữ cảnh. Desktop chỉ đổi cột bằng CSS grid. */}
              <div
                className="pf-timeline-copy-slot"
                style={{
                  gridColumn: isEven ? 1 : 3,
                  gridRow: 1,
                  paddingRight: isEven ? '2rem' : 0,
                  paddingLeft: isEven ? 0 : '2rem',
                  display: 'flex',
                  justifyContent: isEven ? 'flex-end' : 'flex-start',
                }}
              >
                <TextBlock exp={exp} align={isEven ? 'right' : 'left'} />
              </div>

              {/* Center Node */}
              <div className="pf-timeline-node" style={{ gridColumn: 2, gridRow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  width: 18, height: 18,
                  borderRadius: '50%',
                  border: '3px solid var(--pf-accent)',
                  background: 'var(--pf-surface)',
                  boxShadow: '0 0 0 5px var(--pf-accent-soft)',
                  flexShrink: 0,
                  zIndex: 2
                }} />
              </div>

              {/* Media slot */}
              <div
                className="pf-timeline-media-slot"
                style={{
                  gridColumn: isEven ? 3 : 1,
                  gridRow: 1,
                  paddingLeft: isEven ? '2rem' : 0,
                  paddingRight: isEven ? 0 : '2rem',
                  display: 'flex',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                }}
              >
                <ImageBlock exp={exp} />
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
      {/* Date */}
      <span style={{
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--pf-brand)',
        marginBottom: '0.6rem',
        letterSpacing: '0.02em',
      }}>
        {exp.date}
      </span>

      {/* Title + Company */}
      <h3 style={{
        fontSize: 24,
        fontWeight: 700,
        color: 'var(--pf-ink)',
        margin: '0 0 0.6rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      }}>
        {exp.title}{' - '}
        <span style={{
          textDecoration: 'underline',
          textDecorationColor: 'var(--pf-accent)',
          textUnderlineOffset: 5,
          textDecorationThickness: 2,
        }}>
          {exp.company}
        </span>
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 15,
        fontWeight: 400,
        color: 'var(--pf-text)',
        lineHeight: 1.75,
        marginBottom: '0.75rem',
        maxWidth: 400,
      }}>
        {exp.description}
      </p>

      {/* Tools */}
      {exp.tools && (
        <p style={{
          fontFamily: 'var(--font-portfolio)',
          fontSize: 12,
          fontWeight: 400,
          color: 'var(--pf-text-secondary)',
          marginBottom: '1.25rem',
        }}>
          <span style={{ color: 'var(--pf-brand)', fontWeight: 600 }}>Tools: </span>{exp.tools}
        </p>
      )}

      {/* Location Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999,
        border: '1px solid var(--pf-border-strong)',
        background: 'var(--pf-brand-soft)',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--pf-brand)">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--pf-brand-deep)',
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
      border: '1px solid var(--pf-border)',
      boxShadow: 'var(--pf-shadow-card)',
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
