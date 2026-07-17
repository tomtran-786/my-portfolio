'use client'

// Port từ "folio" của Ayush Singh — components/common/cursor.tsx + Cursor.module.scss
// Nguồn: https://github.com/ayush013/folio (MIT)
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
// License text: https://opensource.org/licenses/MIT
//
// Khác bản gốc ở hai điểm:
// - Dùng framer-motion thay GSAP (dự án này đã có framer-motion, không có GSAP).
//   useSpring thay cho gsap.to duration 0.1 / 0.3 — chênh lệch độ trễ giữa chấm và
//   vòng chính là thứ tạo hiệu ứng "vòng đuổi theo chấm".
// - Bản gốc neo chấm ở left/top 0 và vòng ở -0.5rem, khiến cả cụm lệch 8px
//   xuống-phải so với con trỏ thật. Ở đây căn đúng tâm con trỏ.

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const DOT_SIZE = 16
const FOLLOWER_SIZE = 32

// gsap duration 0.1, ease Linear -> bám gần như tức thì
const DOT_SPRING = { stiffness: 1500, damping: 90, mass: 0.3 }
// gsap duration 0.3 -> mềm hơn, trễ hơn thấy rõ
const FOLLOWER_SPRING = { stiffness: 260, damping: 30, mass: 0.6 }

export default function Cursor() {
  // Chỉ dựng khi thật sự có chuột. Bản gốc đo chiều rộng màn hình, nhưng tablet
  // màn rộng vẫn dùng ngón tay — pointer: fine mới đúng thứ cần hỏi.
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotX = useSpring(x, DOT_SPRING)
  const dotY = useSpring(y, DOT_SPRING)
  const followerX = useSpring(x, FOLLOWER_SPRING)
  const followerY = useSpring(y, FOLLOWER_SPRING)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    document.addEventListener('mousemove', onMouseMove, { passive: true })

    // Bản gốc chỉ bắt phần tử có class .link; dự án này không dùng class đó nên
    // lấy thẳng mọi link/nút đang có.
    const targets = document.querySelectorAll('a, button')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -DOT_SIZE / 2,
          left: -DOT_SIZE / 2,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '100%',
          background: '#fff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 10000,
          x: dotX,
          y: dotY,
        }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -FOLLOWER_SIZE / 2,
          left: -FOLLOWER_SIZE / 2,
          width: FOLLOWER_SIZE,
          height: FOLLOWER_SIZE,
          borderRadius: '100%',
          background: 'rgba(255,255,255,0.2)',
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform',
          zIndex: 10000,
          x: followerX,
          y: followerY,
        }}
        animate={{ scale: hovering ? 3 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
