'use client'

import { useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CursorGlow() {
  // useMotionValue thay cho useState: mousemove bắn liên tục, dùng state sẽ
  // buộc React re-render mỗi lần rê chuột. Motion value ghi thẳng vào DOM.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        filter: 'blur(40px)',
      }}
    />
  )
}
