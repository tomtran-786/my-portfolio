'use client'

import { motion } from 'framer-motion'

export default function NavLink({ href, label }) {
  const isAnchor = href.startsWith('#')

  return (
    <motion.a
      href={href}
      onClick={(e) => {
        if (isAnchor) {
          e.preventDefault()
          const id = href.replace('#', '')
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }}
      initial="initial"
      whileHover="hover"
      style={{
        color: '#404040',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        position: 'relative',
      }}
      variants={{
        initial: { color: '#404040' },
        hover: { color: '#0c498f' },
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
          background: '#297fd6',
          borderRadius: 2,
        }}
      />
    </motion.a>
  )
}
