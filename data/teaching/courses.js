const coursesData = {
  sectionLabel: "Khóa học",
  headline: "Lộ trình phù hợp với mọi mục tiêu",
  subtext:
    "Học 1-1 hoặc nhóm nhỏ 3–5 người — mỗi lộ trình đều được cá nhân hóa theo điểm xuất phát và mục tiêu của riêng bạn.",

  items: [
    {
      id: "ielts-basic",
      icon: "📘",
      tag: "IELTS",
      category: "ielts",
      title: "IELTS Basic",
      description:
        "Dành cho người mới bắt đầu hoặc chưa có nền tảng vững. Xây dựng từ vựng, ngữ pháp và 4 kỹ năng cơ bản để đạt mục tiêu band 4.0.",
      level: "Foundation → 4.0",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: false,

      // ===== Chi tiết khóa học — hiện trong modal khi click vào thẻ =====
      // TODO: thay toàn bộ nội dung placeholder dưới đây bằng nội dung thật
      // Lưu ý: FAQ dùng chung (xem coursesData.faqs ở cuối file),
      // không cần khai báo riêng cho từng khóa nữa.
      detail: {
        image: { src: "/teaching/course-ielts-basic.jpg", alt: "IELTS Basic" },
        overview: "TODO: Viết tổng quan ngắn gọn về khóa học IELTS Basic — mục tiêu, điểm khác biệt, ai nên học.",
        whatYouLearn: [
          "TODO: Kỹ năng / kiến thức 1",
          "TODO: Kỹ năng / kiến thức 2",
          "TODO: Kỹ năng / kiến thức 3",
          "TODO: Kỹ năng / kiến thức 4",
        ],
        howLessonsWork: "TODO: Mô tả buổi học diễn ra như thế nào (live 1-1, tần suất, thời lượng mỗi buổi...).",
        whoItsFor: "TODO: Mô tả đối tượng học viên phù hợp với khóa học này.",
        pricing: {
          subtext: "TODO: Mô tả ngắn cho bảng giá của khóa IELTS Basic.",
          plans: [
            { id: "basic", name: "Basic", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Basic", popular: false },
            { id: "standard", name: "Standard", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Standard", popular: true },
            { id: "premium", name: "Premium", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Premium", popular: false },
          ],
        },
      },
    },
    {
      id: "ielts-intermediate",
      icon: "🎯",
      category: "ielts",
      tag: "Phổ biến nhất",
      title: "IELTS Intermediate",
      description:
        "Lộ trình luyện thi IELTS có hệ thống hướng tới band 6.5. Tập trung vào chiến lược làm bài, bài thi thử hàng tuần và phản hồi chi tiết từng kỹ năng.",
      level: "Intermediate → 6.5",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: true,

      detail: {
        image: { src: "/teaching/course-ielts-intermediate.jpg", alt: "IELTS Intermediate" },
        overview: "TODO: Viết tổng quan ngắn gọn về khóa học IELTS Intermediate.",
        whatYouLearn: [
          "TODO: Kỹ năng / kiến thức 1",
          "TODO: Kỹ năng / kiến thức 2",
          "TODO: Kỹ năng / kiến thức 3",
          "TODO: Kỹ năng / kiến thức 4",
        ],
        howLessonsWork: "TODO: Mô tả buổi học diễn ra như thế nào.",
        whoItsFor: "TODO: Mô tả đối tượng học viên phù hợp.",
        pricing: {
          subtext: "TODO: Mô tả ngắn cho bảng giá của khóa IELTS Intermediate.",
          plans: [
            { id: "basic", name: "Basic", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Basic", popular: false },
            { id: "standard", name: "Standard", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Standard", popular: true },
            { id: "premium", name: "Premium", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Premium", popular: false },
          ],
        },
      },
    },
    {
      id: "toeic-basic",
      icon: "📝",
      category: "toeic",
      tag: "TOEIC",
      title: "TOEIC Basic",
      description:
        "Nắm vững cấu trúc đề thi TOEIC và chiến lược làm bài để đạt mục tiêu 200–300 điểm. Phù hợp cho người mới tiếp cận TOEIC.",
      level: "Beginner → 200–300",
      format: "1-1 hoặc nhóm 3–5",
      duration: "Linh hoạt theo học viên",
      highlighted: false,

      detail: {
        image: { src: "/teaching/course-toeic-basic.jpg", alt: "TOEIC Basic" },
        overview:
          "Khóa học dành cho người mất gốc hoặc mới bắt đầu, giúp xây dựng lại nền tảng từ vựng và ngữ pháp tiếng Anh một cách bài bản, đồng thời làm quen với cấu trúc đề thi TOEIC. Sau 24 buổi học, học viên có nền tảng vững chắc cùng các kỹ thuật làm bài chuẩn để bước vào giai đoạn luyện kỹ năng chuyên sâu ở khóa Intermediate.",
        whatYouLearn: [
          "Nắm vững 300 từ vựng TOEIC cốt lõi thuộc 12 chủ đề thường gặp nhất trong đề thi (Hợp đồng, Tiếp thị, Bảo hành, Kế hoạch kinh doanh, Hội nghị, Máy tính, Công nghệ & Quy trình văn phòng, Điện tử, Thư từ công sở, Tuyển dụng, Phỏng vấn xin việc...)",
          "Hoàn thành 10 chuyên đề ngữ pháp nền tảng: các thì hiện tại – quá khứ, Gerunds/Infinitives, hòa hợp Chủ ngữ – Động từ, Mệnh đề quan hệ, Danh từ/Đại từ, Tính từ/Trạng từ, So sánh, Liên từ",
          "Làm chủ kỹ thuật F.A.N. (Focus – Action – Notice) cho Part 1 (mô tả tranh) và Part 2 (Hỏi – Đáp): xác định trọng tâm nghe, đối chiếu nội dung và phản xạ chọn đáp án nhanh, không phân vân",
          "Làm quen kỹ thuật R.E.A.L. (Read – Examine – Analyze – Limit) ở mức cơ bản cho Part 5: xác định từ loại trước/sau chỗ trống, đối chiếu đáp án và rút kinh nghiệm từ lỗi sai",
          "Luyện nghe chép chính tả (dictation) để cải thiện khả năng nhận diện âm cuối (-s/es, -ed)",
          "Hoàn thành 2 bài kiểm tra định kỳ (mini-test 50 câu và half-test 100 câu) để đánh giá tiến độ",
        ],
        howLessonsWork:
          "Mỗi tuần gồm 3 buổi học (90 phút/buổi): 1 buổi từ vựng theo chủ đề kết hợp ôn tập ngắt quãng (spaced repetition), 1 buổi ngữ pháp với 20-30 câu bài tập thực hành, và 1 buổi luyện kỹ năng Nghe hoặc Đọc theo mô hình Test – Teach – Test: học viên làm bài kiểm tra đầu vào, được hướng dẫn kỹ thuật F.A.N. (với Nghe) hoặc R.E.A.L. (với Đọc), thực hành có thảo luận/chữa đáp án chi tiết, rồi làm bài kiểm tra đầu ra để củng cố thói quen làm bài chuẩn. Cứ sau 4 tuần, học viên làm một bài kiểm tra ngắn và được chữa bài chi tiết trước khi sang chủ đề mới.",
        whoItsFor:
          "Phù hợp với người mất gốc tiếng Anh hoặc trình độ A2, chưa từng tiếp xúc với đề thi TOEIC, cần xây dựng lại nền tảng từ vựng – ngữ pháp một cách hệ thống trước khi luyện kỹ năng làm bài nâng cao. Học viên cần cam kết tối thiểu 6-8 giờ/tuần (gồm cả tự học).",
        pricing: {
          subtext: "TODO: Mô tả ngắn cho bảng giá của khóa TOEIC Basic.",
          plans: [
            { id: "basic", name: "Basic", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Basic", popular: false },
            { id: "standard", name: "Standard", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Standard", popular: true },
            { id: "premium", name: "Premium", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Premium", popular: false },
          ],
        },
      },
    },
    {
      id: "toeic-intermediate",
      icon: "🚀",
      tag: "Phổ biến nhất",
      title: "TOEIC Intermediate",
      description:
        "Nâng điểm TOEIC lên 500+ với lộ trình luyện đề chuyên sâu, mở rộng từ vựng business và tăng tốc độ xử lý Listening & Reading.",
      level: "Intermediate → 500+",
      format: "1-1 hoặc nhóm 3–5",
      duration: "Linh hoạt theo học viên",
      category: "toeic",
      highlighted: true,

      detail: {
        image: { src: "/teaching/course-toeic-intermediate.jpg", alt: "TOEIC Intermediate" },
        overview:
          "Khóa học dành cho học viên đã có nền tảng từ vựng – ngữ pháp cơ bản, tập trung phát triển toàn diện 7 Part của bài thi TOEIC bằng các kỹ thuật làm bài nâng cao và luyện đề sát với đề thi thật (bộ ETS). Sau 4 tháng, học viên tự tin đạt mục tiêu 500+ TOEIC, làm chủ chiến thuật xử lý từng dạng câu hỏi và quản lý thời gian phòng thi.",
        whatYouLearn: [
          "Mở rộng vốn từ vựng lên hơn 700-1000 từ với 12 chủ đề chuyên sâu (Tuyển dụng & Đào tạo, Lương thưởng, Thăng chức, Mua sắm, Đặt hàng, Vận chuyển, Hóa đơn, Kho hàng, Ngân hàng, Kế toán, Đầu tư, Thuế...)",
          "Vận dụng thành thạo F.A.N. ở mức nâng cao cho Part 3 và Part 4: phân biệt keyword qua paraphrase, xử lý câu hỏi suy luận (implied meaning) và dạng biểu đồ (diagram), kỹ thuật quyết đoán chọn đáp án",
          "Vận dụng thành thạo R.E.A.L. cho Part 6 (kết hợp Functional Grammar để chọn câu phù hợp ngữ cảnh) và Part 7 (xác định từ khóa câu hỏi, kỹ thuật Skim/Scan để định vị thông tin nhanh trong đoạn văn đơn/kép)",
          "Nhận diện và né tránh các bẫy thường gặp trong Listening và Reading (cặp từ/cấu trúc dễ nhầm, tính từ -ed/-ing, đại từ quan hệ, đáp án gây nhiễu ở Part 7...)",
          "Củng cố ngữ pháp nâng cao: câu bị động phức tạp, câu điều kiện, giới từ",
          "Hoàn thành tối thiểu 4 đề thi thật ETS (Listening + Reading) có bấm giờ và chữa đề chi tiết, ghi chép vào sổ tay lỗi sai (Error Log)",
          "Trải qua 3 bài kiểm tra định kỳ và 1 bài thi thử hoàn chỉnh mô phỏng điều kiện thi thật",
        ],
        howLessonsWork:
          "Mỗi tuần gồm 3 buổi học (90 phút/buổi), tiếp nối nền tảng F.A.N./R.E.A.L. từ khóa Basic, học viên luyện tập các biến thể nâng cao của 2 kỹ thuật này theo từng dạng câu hỏi phức tạp hơn thông qua mô hình Test – Teach – Test ở mỗi buổi luyện kỹ năng. Sang 2 tháng cuối, lịch học chuyển trọng tâm sang luyện đề: mỗi buổi giải một phần đề thi thật (ETS) có bấm giờ, buổi kế tiếp chữa đề chi tiết và phân tích lỗi sai bằng đúng kỹ thuật đã học. Học viên làm bài kiểm tra định kỳ mỗi 4 tuần để theo dõi sát tiến độ điểm số.",
        whoItsFor:
          "Phù hợp với học viên đã hoàn thành khóa TOEIC Basic hoặc đã có nền tảng từ vựng – ngữ pháp tương đương (300-700 từ, nắm các thì cơ bản), mong muốn chinh phục mục tiêu 500+ TOEIC trong 4 tháng. Học viên cần cam kết tối thiểu 6-8 giờ/tuần và sẵn sàng luyện đề với cường độ cao ở giai đoạn cuối khóa.",
        pricing: {
          subtext: "TODO: Mô tả ngắn cho bảng giá của khóa TOEIC Intermediate.",
          plans: [
            { id: "basic", name: "Basic", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Basic", popular: false },
            { id: "standard", name: "Standard", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Standard", popular: true },
            { id: "premium", name: "Premium", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Premium", popular: false },
          ],
        },
      },
    },
    {
      id: "communication",
      icon: "💬",
      tag: "Giao tiếp",
      category: "giao-tiep",
      title: "Tiếng Anh Giao Tiếp",
      description:
        "Tập trung vào phản xạ, phát âm và sự tự tin khi nói. Học cách dùng tiếng Anh tự nhiên trong công việc và cuộc sống hàng ngày.",
      level: "Mọi trình độ",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: false,

      detail: {
        image: { src: "/teaching/course-communication.jpg", alt: "Tiếng Anh Giao Tiếp" },
        overview: "TODO: Viết tổng quan ngắn gọn về khóa học Tiếng Anh Giao Tiếp.",
        whatYouLearn: [
          "TODO: Kỹ năng / kiến thức 1",
          "TODO: Kỹ năng / kiến thức 2",
          "TODO: Kỹ năng / kiến thức 3",
          "TODO: Kỹ năng / kiến thức 4",
        ],
        howLessonsWork: "TODO: Mô tả buổi học diễn ra như thế nào.",
        whoItsFor: "TODO: Mô tả đối tượng học viên phù hợp.",
        pricing: {
          subtext: "TODO: Mô tả ngắn cho bảng giá của khóa Giao Tiếp.",
          plans: [
            { id: "basic", name: "Basic", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Basic", popular: false },
            { id: "standard", name: "Standard", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Standard", popular: true },
            { id: "premium", name: "Premium", monthlyPrice: 0, annualPrice: 0, description: "TODO: mô tả plan Premium", popular: false },
          ],
        },
      },
    },
  ],

  // ===== FAQ dùng chung cho TẤT CẢ khóa học =====
  // Điền 1 lần ở đây, mọi modal chi tiết khóa học sẽ tự hiển thị danh sách này.
  // TODO: thay câu hỏi/trả lời thật
  faqs: [
    { question: "TODO: Câu hỏi thường gặp 1?", answer: "TODO: Câu trả lời 1." },
    { question: "TODO: Câu hỏi thường gặp 2?", answer: "TODO: Câu trả lời 2." },
    { question: "TODO: Câu hỏi thường gặp 3?", answer: "TODO: Câu trả lời 3." },
  ],

  cta: "Đặt buổi học thử miễn phí",
  ctaHref: "#contact",
};

export default coursesData;