// Port từ components/common/wave-divider.tsx của "folio" (Ayush Singh)
// qua bản fork MarkPhamm/portfolio_website.
// Nguồn: https://github.com/ayush013/folio (MIT)
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
//
// Giữ nguyên hình sóng và thông số chuyển động, chỉ đổi màu sang palette của
// portfolio này (#7c3aed / #a78bfa thay cho #9146FF / #BF94FF).

'use client'

import { useId } from 'react'

const PURPLE = '124, 58, 237' // #7c3aed
const PURPLE_LIGHT = '167, 139, 250' // #a78bfa

export default function WaveDivider({ flip = false }) {
  // Bản gốc đặt id cứng theo flip ("wave-grad-normal"/"wave-grad-flip"), nên
  // dùng nhiều dải cùng kiểu trên một trang là trùng id (HTML không hợp lệ).
  // useId sinh id duy nhất cho mỗi lần dựng và khớp giữa server với client.
  const gradId = `wave-grad-${useId().replace(/:/g, '')}`

  return (
    <div
      aria-hidden="true"
      className="pf-wave"
      style={{
        width: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
        position: 'relative',
        zIndex: 5,
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      {/* viewBox rộng 1440 nhưng path vẽ tới 2160 = 3 chu kỳ x 720. Phần dư đó
          chính là chỗ để .wave-drift trôi -720px rồi lặp lại không thấy mối nối. */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgba(${PURPLE}, 0)`} />
            <stop offset="30%" stopColor={`rgba(${PURPLE}, 0.12)`} />
            <stop offset="50%" stopColor={`rgba(${PURPLE_LIGHT}, 0.15)`} />
            <stop offset="70%" stopColor={`rgba(${PURPLE}, 0.12)`} />
            <stop offset="100%" stopColor={`rgba(${PURPLE}, 0)`} />
          </linearGradient>
        </defs>
        <g className="wave-drift">
          <path
            d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 C1680,55 1920,5 2160,30 L2160,60 L0,60 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M0,35 C240,47 480,23 720,35 C960,47 1200,23 1440,35 C1680,47 1920,23 2160,35"
            fill="none"
            stroke={`rgba(${PURPLE}, 0.15)`}
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  )
}
