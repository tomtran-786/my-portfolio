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
          background: '#a85f3d',
          border: '5px solid #6f3b26',
          borderRadius: 16,
          color: '#ffffff',
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
