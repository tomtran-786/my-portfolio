'use client'

import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Giữ focus bên trong một dialog và trả focus về chỗ cũ khi đóng.
 *
 * Thiếu nó thì `aria-modal="true"` chỉ là lời hứa suông: phím Tab vẫn đi xuyên
 * xuống trang nền đang bị lớp phủ che, nên vòng focus biến mất khỏi màn hình.
 *
 * Trả về ref để gắn vào phần tử bọc dialog.
 *
 * @param {boolean} active - bật bẫy focus (thường là trạng thái "đang mở")
 * @param {React.RefObject<HTMLElement>} [initialFocusRef] - phần tử nhận focus
 *   đầu tiên; mặc định là chính container.
 */
export default function useFocusTrap(active, initialFocusRef) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const previouslyFocused = document.activeElement

    // getClientRects() thay cho offsetParent: offsetParent luôn null với phần tử
    // position:fixed, mà cả hai modal ở đây đều fixed.
    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0
      )

    // Focus chính container (không phải nút đầu tiên) để trình đọc màn hình đọc
    // aria-label của dialog trước, và để không tự cuộn tới nút nằm cuối modal.
    const target = initialFocusRef?.current ?? container
    if (target === container && !container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1')
    }
    // Hoãn một nhịp: MobileDrawer mở bằng transition `visibility`, mà phần tử
    // đang `visibility: hidden` thì không nhận được focus. Đây cũng chính là lý do
    // bản gốc của drawer dùng setTimeout 50ms.
    const focusTimer = setTimeout(() => target.focus({ preventScroll: true }), 50)

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      // Focus đang ở container (chưa Tab lần nào) -> Tab vào phần tử đầu,
      // Shift+Tab vào phần tử cuối.
      if (!container.contains(document.activeElement) || document.activeElement === container) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
        return
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [active, initialFocusRef])

  return containerRef
}
