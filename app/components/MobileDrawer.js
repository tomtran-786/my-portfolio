'use client'

import { useEffect, useRef } from 'react'

const themes = {
  portfolio: {
    bg: '#0f1629',
    border: 'rgba(139,92,246,0.25)',
    text: '#f1f5f9',
    accent: '#a78bfa',
    accentSolid: '#7c3aed',
    fontFamily: 'var(--font-inter)',
    ctaBg: '#7c3aed',
    ctaColor: '#fff',
  },
  teaching: {
    bg: '#36314E',
    border: 'rgba(255,255,255,0.08)',
    text: '#E5E5E5',
    accent: '#F2684A',
    accentSolid: '#F2684A',
    fontFamily: 'Montserrat, sans-serif',
    ctaBg: '#F2684A',
    ctaColor: '#fff',
  },
}

export default function MobileDrawer({ open, onClose, links, cta, theme = 'portfolio' }) {
  const t = themes[theme]
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)

    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      clearTimeout(focusTimer)
    }
  }, [open, onClose])

  const handleLinkClick = (link) => (e) => {
    if (link.onClick) {
      link.onClick(e)
      onClose?.()
      return
    }
    if (link.href?.startsWith('#')) {
      e.preventDefault()
      const id = link.href.replace('#', '')
      onClose?.()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
      return
    }
    onClose?.()
  }

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: open ? 'blur(2px)' : 'none',
          WebkitBackdropFilter: open ? 'blur(2px)' : 'none',
          zIndex: 1500,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.25s ease, visibility 0.25s ease',
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(84vw, 320px)',
          background: t.bg,
          borderLeft: `0.5px solid ${t.border}`,
          zIndex: 1600,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-16px 0 48px rgba(0,0,0,0.35)',
          fontFamily: t.fontFamily,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), visibility 0.35s linear',
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '1rem 1.25rem',
            borderBottom: `0.5px solid ${t.border}`,
          }}
        >
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Đóng menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: t.text,
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '0.75rem 0.5rem',
            gap: 2,
            overflowY: 'auto',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={handleLinkClick(link)}
              tabIndex={open ? 0 : -1}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 52,
                padding: '0 1rem',
                color: t.text,
                textDecoration: 'none',
                fontSize: 17,
                fontWeight: 500,
                borderRadius: 10,
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = t.accent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = t.text
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {cta && (
          <div style={{ padding: '1rem 1.25rem 1.5rem', borderTop: `0.5px solid ${t.border}` }}>
            <a
              href={cta.href}
              onClick={handleLinkClick(cta)}
              tabIndex={open ? 0 : -1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: t.ctaBg,
                color: t.ctaColor,
                textDecoration: 'none',
                padding: '0.9rem 1.25rem',
                borderRadius: 9999,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '0.01em',
                boxShadow: `0 8px 22px ${theme === 'teaching' ? 'rgba(242,104,74,0.35)' : 'rgba(124,58,237,0.35)'}`,
              }}
            >
              {cta.label}
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
