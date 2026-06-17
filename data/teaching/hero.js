const heroData = {
  badge: "Giảng dạy Tiếng Anh Online",

  headline: {
    before: "Thầy giáo tiếng Anh giúp bạn",
    after: "chinh phục mọi kì thi",
    image: {
      // Thay bằng ảnh thật của bạn trong /public/teaching/hero-inline.jpg
      src: "/teaching/hero-inline.jpg",
      alt: "Tom Tran - English Teacher",
    },
  },

  subtext:
    "Lộ trình tiếng Anh cá nhân hóa — từ giao tiếp tự tin đến luyện thi học thuật, phù hợp với mục tiêu của riêng bạn.",

  cta: {
    primary: {
      label: "Đặt buổi học thử miễn phí",
      href: "#contact",
    },
    arrow: { href: "#contact" },
  },

  socialProof: {
    rating: "4.9/5",
    count: "30+ Học viên hài lòng",
    // Thay bằng ảnh thật của học viên (cần có sự đồng ý)
    avatars: [
      { src: "/teaching/avatars/student-1.jpg", alt: "Học viên 1" },
      { src: "/teaching/avatars/student-2.jpg", alt: "Học viên 2" },
      { src: "/teaching/avatars/student-3.jpg", alt: "Học viên 3" },
      { src: "/teaching/avatars/student-4.jpg", alt: "Học viên 4" },
    ],
  },
};

export default heroData;
