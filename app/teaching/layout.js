export const metadata = {
  title: "My Teaching Career | Tom Tran",
  description:
    "Hành trình giảng dạy Tiếng Anh — lộ trình cá nhân hóa từ giao tiếp tự tin đến luyện thi học thuật.",
};

export default function TeachingLayout({ children }) {
  return (
    /*
     * Override body styles từ globals.css (background navy, font Montserrat
     * vẫn dùng được). Grid pattern và navy đặc trưng cho teaching section.
     */
    <div
      style={{
        minHeight: "100vh",
        background: "#2A2640",
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
        // Override màu nền của body (globals.css đặt --navy)
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
