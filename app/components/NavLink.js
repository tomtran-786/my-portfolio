'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, label }) {
  const pathname = usePathname()
  const isAnchor = href.startsWith('#')
  // Anchors only resolve to an element on the homepage. Elsewhere (e.g. /blog),
  // rewrite to "/#section" so the link still navigates home instead of no-op'ing.
  const isHome = pathname === '/'
  const resolvedHref = isAnchor && !isHome ? `/${href}` : href

  return (
    <motion.a
      href={resolvedHref}
      onClick={(e) => {
        if (isAnchor && isHome) {
          e.preventDefault()
          const id = href.replace('#', '')
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }}
      initial="initial"
      whileHover="hover"
      style={{
        color: 'var(--pf-text)',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        position: 'relative',
      }}
      variants={{
        initial: { color: 'var(--pf-text)' },
        hover: { color: 'var(--pf-brand)' },
      }}
      transition={{ duration: 0.2 }}
    >
      {label}
      <motion.div
        variants={{
          initial: { width: '0%' },
          hover: { width: '100%' },
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: -6,
          left: 0,
          height: 2,
          background: 'var(--pf-accent)',
          borderRadius: 2,
        }}
      />
    </motion.a>
  )
}
