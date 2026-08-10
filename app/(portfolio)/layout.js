import '../globals.css'
import Script from 'next/script'
import { portfolioFont } from '@/app/fonts'
import { colorModeScript } from '@/app/theme'

export const metadata = {
  title: 'Tom Tran - Portfolio',
  description: 'Finance, data analysis, and business strategy portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
      </head>
      <body className={`${portfolioFont.variable} pf-body`}>
        {children}
        <Script id="color-mode-init" strategy="beforeInteractive">
          {colorModeScript}
        </Script>
      </body>
    </html>
  )
}
