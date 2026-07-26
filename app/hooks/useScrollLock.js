'use client'

import { useEffect } from 'react'

/**
 * Khoá cuộn trang nền khi modal/drawer đang mở.
 *
 * Không dùng `body { overflow: hidden }`: iOS Safari bỏ qua nó với thao tác
 * chạm, nên trang nền vẫn cuộn sau lớp phủ. Cách duy nhất chặn được là gỡ body
 * ra khỏi luồng cuộn bằng `position: fixed`, rồi bù lại đúng vị trí cũ bằng
 * `top: -scrollY` để trang không nhảy về đầu.
 *
 * Mọi giá trị style bị ghi đè đều được lưu lại và khôi phục nguyên trạng, nên
 * hook lồng nhau hay unmount giữa chừng cũng không để trang kẹt không cuộn được.
 */
export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    const body = document.body
    const html = document.documentElement
    const scrollY = window.scrollY

    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width

      // `html { scroll-behavior: smooth }` sẽ biến thao tác khôi phục này thành
      // một cú cuộn có animation nhìn thấy được -> tắt tạm khi nhảy về chỗ cũ.
      const prevBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      html.style.scrollBehavior = prevBehavior
    }
  }, [locked])
}
