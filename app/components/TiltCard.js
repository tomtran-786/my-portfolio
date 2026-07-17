'use client'

// Nghiêng 3D theo chuột, phỏng theo components/common/project-tile.tsx của
// "folio" (Ayush Singh) — https://github.com/ayush013/folio (MIT).
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
//
// QUAN TRỌNG: vanilla-tilt ghi thẳng `transform` lên element nó quản lý, mà
// framer-motion cũng ghi `transform` cho whileHover/whileInView. Hai bên đè
// nhau nếu dùng chung một thẻ. Vì vậy component này là thẻ BỌC NGOÀI: tilt ăn
// ở đây, còn framer-motion giữ transform của nó ở thẻ con bên trong.

import { useEffect, useRef } from 'react'

const TILT_OPTIONS = {
  max: 8,
  speed: 400,
  scale: 1.02,
  glare: true,
  'max-glare': 0.15,
  gyroscope: false,
}

export default function TiltCard({ children, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Bản gốc tắt tilt trên thiết bị cảm ứng; hỏi pointer: fine chuẩn hơn đo
    // bề rộng, vì tablet màn rộng vẫn dùng ngón tay. Cùng cách Cursor.js dùng.
    if (!window.matchMedia('(pointer: fine)').matches) return

    let cancelled = false
    // import động: vanilla-tilt đụng vào window ngay khi nạp -> không để nó
    // chạy lúc SSR.
    import('vanilla-tilt').then(({ default: VanillaTilt }) => {
      if (cancelled || !ref.current) return
      VanillaTilt.init(ref.current, TILT_OPTIONS)
    })

    return () => {
      cancelled = true
      el.vanillaTilt?.destroy()
    }
  }, [])

  return (
    <div ref={ref} style={{ transformStyle: 'preserve-3d', ...style }}>
      {children}
    </div>
  )
}
