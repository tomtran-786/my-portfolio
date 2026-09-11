'use client'

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Cursor from '@/app/components/Cursor'
import NavLink from '@/app/components/NavLink'
import MobileDrawer from '@/app/components/MobileDrawer'
import ThemeToggle from '@/app/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'My Works', href: '#projects' },
  { label: 'My Activity', href: '#activity' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'My Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Teaching', href: '/teaching' },
]

// Shared nav + progress bar + cursor for every page in the (portfolio) route
// group, not just the homepage — extracted so /blog and /blog/[slug] get the
// same chrome instead of duplicating it.
export default function SiteChrome() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [navVisible, setNavVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

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
    <>
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
            <Link
              href="/"
              style={{ fontFamily: 'var(--font-portfolio)', fontSize: 20, fontWeight: 700, color: 'var(--pf-brand)', textDecoration: 'none' }}
            >
              &lt;tomtran/&gt;
            </Link>
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
    </>
  )
}
