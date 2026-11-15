import '../globals.css'
import Script from 'next/script'
import { portfolioFont } from '../fonts'
import { colorModeScript } from '@/app/theme'

export const metadata = {
  title: "Học IELTS, TOEIC, giao tiếp cùng thầy Tom | English with Tom",
  description:
    "Hành trình giảng dạy tiếng Anh: lộ trình cá nhân hóa từ giao tiếp tự tin đến luyện thi học thuật.",
};

export default function TeachingLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
      </head>
      <body className={`${portfolioFont.variable} teaching-body`}>
        <div className="teaching-theme">{children}</div>
        <Script id="color-mode-init" strategy="beforeInteractive">
          {colorModeScript}
        </Script>
      </body>
    </html>
  );
}
