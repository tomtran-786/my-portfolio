'use client'

// Logic đếm số tách ra từ app/components/teaching/AboutSection.js để /
// và /teaching dùng chung. Component chỉ trả về phần chữ (số + hậu tố),
// còn style do nơi gọi tự lo — hai trang có tone khác nhau.

import { useState, useEffect } from 'react'
import { animate } from 'framer-motion'

// "30+"  -> { number: 30,  decimals: 0, suffix: "+" }
// "4.9★" -> { number: 4.9, decimals: 1, suffix: "★" }
export function parseStatValue(raw) {
  const match = String(raw).match(/^([\d.]+)(.*)$/)
  if (!match) return { number: 0, decimals: 0, suffix: raw }
  const numStr = match[1]
  const suffix = match[2] || ''
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { number: parseFloat(numStr), decimals, suffix }
}

export default function CountUp({ value, start = true, duration = 1.4 }) {
  const { number, decimals, suffix } = parseStatValue(value)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, number, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [start, number, duration])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display)

  return (
    <>
      {formatted}
      {suffix}
    </>
  )
}
