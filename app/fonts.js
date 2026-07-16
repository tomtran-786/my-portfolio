import { Inter } from 'next/font/google'

// Chỉ dùng cho portfolio ở "/". Trang /teaching giữ Montserrat (xem globals.css),
// nên Inter cố ý KHÔNG đặt ở root layout — tránh /teaching preload font nó không dùng.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
