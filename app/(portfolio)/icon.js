import { ImageResponse } from 'next/og'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function PortfolioIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c498f',
          border: '5px solid #003865',
          borderRadius: 16,
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: '-0.08em',
          paddingRight: 2,
        }}
      >
        {'</>'}
      </div>
    ),
    size
  )
}
