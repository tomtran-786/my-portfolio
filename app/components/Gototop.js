'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GoToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    // Trình duyệt khôi phục vị trí cuộn khi reload, nên phải đọc scrollY ngay lúc
    // mount; nếu chỉ chờ event thì nút vẫn ẩn dù đang ở giữa trang.
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: 'var(--pf-shadow-hover)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 'var(--z-gototop)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--pf-brand)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--pf-on-brand)', fontSize: 18, boxShadow: 'var(--pf-shadow-card)'
          }}
        >
          <i className="ti ti-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
