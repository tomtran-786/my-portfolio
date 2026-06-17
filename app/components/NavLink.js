'use client'

import { motion } from 'framer-motion'

export default function NavLink({ href, label, activeSection }) {
  const isAnchor = href.startsWith('#')
  const isActive = isAnchor && href === `#${activeSection}`

  return (
    <motion.a
      href={href}
      onClick={(e) => {
        if (isAnchor) {
          e.preventDefault()
          const id = href.replace('#', '')
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
        // Không phải anchor → để <a href> navigate bình thường
      }}
      style={{
        color: isActive ? '#a78bfa' : '#cbd5e1',
        textDecoration: 'none',
        fontSize: 18,
        fontWeight: 500,
        cursor: 'pointer',
        position: 'relative',
      }}
      whileHover={{ color: '#a78bfa' }}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="underline"
          style={{
            position: 'absolute',
            bottom: -6,
            left: 0,
            right: 0,
            height: 2,
            background: '#a78bfa',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  )
}