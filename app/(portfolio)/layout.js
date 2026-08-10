import '../globals.css'
import { portfolioFont } from '@/app/fonts'

export const metadata = {
  title: 'Tom Tran - Portfolio',
  description: 'Finance, data analysis, and business strategy portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
      </head>
      <body className={`${portfolioFont.variable} pf-body`}>{children}</body>
    </html>
  )
}
