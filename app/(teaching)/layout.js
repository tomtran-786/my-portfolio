import '../globals.css'
import { portfolioFont } from '../fonts'

export const metadata = {
  title: "My Teaching Career | Tom Tran",
  description:
    "Hành trình giảng dạy Tiếng Anh — lộ trình cá nhân hóa từ giao tiếp tự tin đến luyện thi học thuật.",
};

export default function TeachingLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
      </head>
      <body className={`${portfolioFont.variable} teaching-body`}>
        <div className="teaching-theme">{children}</div>
      </body>
    </html>
  );
}
