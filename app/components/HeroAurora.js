// Port từ components/home/hero-aurora.tsx của "folio" (Ayush Singh)
// qua bản fork MarkPhamm/portfolio_website.
// Nguồn: https://github.com/ayush013/folio (MIT)
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
//
// Giữ nguyên kích thước, vị trí, blur và thông số chuyển động; chỉ đổi màu sang
// palette của portfolio này.

const AURORA_BLOBS = [
  {
    color: 'rgba(124, 58, 237, 0.18)', // #7c3aed
    width: '45%',
    height: '50%',
    top: '5%',
    left: '-5%',
    blur: 60,
    animationClass: 'aurora-drift-1',
  },
  {
    color: 'rgba(167, 139, 250, 0.14)', // #a78bfa
    width: '40%',
    height: '45%',
    top: '30%',
    left: '55%',
    blur: 70,
    animationClass: 'aurora-drift-2',
  },
  {
    color: 'rgba(6, 182, 212, 0.10)', // cyan như bản gốc, để aurora không một tông
    width: '35%',
    height: '40%',
    top: '55%',
    left: '20%',
    blur: 55,
    animationClass: 'aurora-drift-3',
  },
]

// Lớp nhiễu SVG: feTurbulence sinh hạt để aurora không bị "banding" thành các
// vòng màu trơn.
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

export default function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {AURORA_BLOBS.map((blob) => (
        <div
          key={blob.animationClass}
          className={`aurora-blob ${blob.animationClass}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: blob.width,
            height: blob.height,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(ellipse at center, ${blob.color} 0%, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: NOISE_URL,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  )
}
