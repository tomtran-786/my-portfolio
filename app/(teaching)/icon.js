import { ImageResponse } from 'next/og'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function TeachingIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f79747',
          border: '5px solid #8f4100',
          borderRadius: 25,
          color: '#2f2723',
          fontFamily: 'Arial, sans-serif',
          fontSize: 27,
          fontWeight: 700,
          letterSpacing: '-0.05em',
          paddingRight: 1,
        }}
      >
        En
      </div>
    ),
    size
  )
}
