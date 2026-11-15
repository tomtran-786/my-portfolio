const ctaData = {
  headline: "Bắt đầu với một buổi học thử miễn phí",
  subtext:
    "30 phút để tôi hiểu mục tiêu của bạn và đề xuất lộ trình phù hợp nhất. Không ràng buộc, không áp lực.",
  // Zalo là kênh chính (học viên trả lời nhanh nhất ở đây), email là kênh phụ.
  buttons: [
    {
      label: "Nhắn Zalo cho tôi",
      href: "https://zalo.me/0398434620",
      primary: true,
      external: true,
      icon: "ti-message-circle",
    },
    {
      label: "Gửi email",
      href: "mailto:tomtran.workcontact@gmail.com?subject=Đăng ký học thử - English with Tom",
      primary: false,
      external: false,
      icon: "ti-mail",
    },
  ],
  // Thông tin liên hệ nằm dưới nút để người dùng đọc được số và địa chỉ thật.
  contactLine: "Zalo (+84) 398 434 620 · tomtran.workcontact@gmail.com",
  note: "Thường phản hồi trong vòng 2 giờ",
};

export default ctaData;
