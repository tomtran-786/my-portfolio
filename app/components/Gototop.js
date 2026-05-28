'use client'
import { motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GoToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible ? (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1, boxShadow: '0 8px 25px rgba(124,58,237,0.5)' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 999,
        width: 44, height: 44, borderRadius: '50%',
        background: '#7c3aed', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 18, boxShadow: '0 4px 15px rgba(124,58,237,0.4)'
      }}
    >
      <i className="ti ti-arrow-up" />
    </motion.button>
  ) : null
}