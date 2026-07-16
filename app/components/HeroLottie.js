'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

// animation.json nặng ~1.2MB. Import tĩnh sẽ nhét trọn nó vào bundle JS
// (trước đây tạo ra một chunk 1.6MB tải ngay ở first load), nên ở đây fetch
// lúc runtime để file ở lại /public dạng asset tĩnh — cache và gzip được.
export default function HeroLottie() {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/animation.json')
      .then(res => res.json())
      .then(data => { if (!cancelled) setAnimationData(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Giữ đúng chỗ trong lúc chờ để hero không bị giật layout.
  if (!animationData) {
    return <div style={{ width: '100%', maxWidth: 580, aspectRatio: '1 / 1' }} />
  }

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: '100%', maxWidth: 580, position: 'relative', zIndex: 1 }}
    />
  )
}
