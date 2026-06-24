export const metadata = {
  title: "My Teaching Career | Tom Tran",
  description:
    "Hành trình giảng dạy Tiếng Anh — lộ trình cá nhân hóa từ giao tiếp tự tin đến luyện thi học thuật.",
};

export default function TeachingLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#2A2640",
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
        position: "relative",
      }}
    >
<style>{`
  html, body {
    background-color: #2A2640 !important;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px) !important;
    background-size: 44px 44px !important;
  }
`}</style>      {children}
    </div>
  );
}