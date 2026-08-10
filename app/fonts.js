import { Source_Sans_3 } from 'next/font/google'

// Source Sans 3 giữ chất editorial gần Proxima Nova của Storytelling with Data,
// nhưng là font nguồn mở, có Vietnamese subset và được Next.js self-host.
// Cả portfolio và /teaching dùng chung font để giữ một ngôn ngữ thiết kế.
export const portfolioFont = Source_Sans_3({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-portfolio',
  display: 'swap',
})
