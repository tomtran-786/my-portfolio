const coursesData = {
  headline: "Lộ trình phù hợp với mọi mục tiêu",
  subtext:
    "Học 1-1 hoặc nhóm nhỏ 3–5 người. Mỗi lộ trình được cá nhân hóa theo điểm xuất phát và mục tiêu riêng của bạn.",

  // Nguồn duy nhất cho cả tab lọc ở CoursesSection lẫn nhãn category hiển thị
  // trong CourseDetailModal — `category` của mỗi khoá phải khớp một id ở đây.
  categories: [
    { id: "all", label: "Tất cả" },
    { id: "ielts", label: "IELTS" },
    { id: "toeic", label: "TOEIC" },
    { id: "giao-tiep", label: "Giao Tiếp" },
  ],

  items: [
    {
      id: "ielts-basic",
      icon: "📘",
      tag: "IELTS",
      category: "ielts",
      title: "IELTS Basic",
      description:
        "Dành cho học viên Band 3.5–5.0 chưa quen với IELTS Academic. Xây dựng ngữ pháp, phát âm và 4 kỹ năng từ gốc rễ để đạt Band 5.5–6.0.",
      level: "Band 3.5–5.0 → 5.5–6.0",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: false,

      detail: {
        image: { src: "/teaching/ielts-basic-avt.png", alt: "IELTS Basic" },
         syllabusUrl: "https://drive.google.com/file/d/1cdtp8BqdTBeZAx-sA47nNfprWCQuYq9X/view?usp=drive_link",
        overview:
          "IELTS Basic là khóa học nền tảng dành cho học viên đang ở **Band 3.5–5.0** với mục tiêu đạt **Band 5.5–6.0**. Thay vì dạy lại lý thuyết theo từng kỹ năng riêng lẻ, khóa học tiếp cận từ nền tảng: sửa lỗi ngữ pháp làm sai lệch ý nghĩa, xây dựng phát âm hệ thống theo **IPA**, và đặt từng kỹ năng vào đúng khung bài thi IELTS Academic ngay từ buổi đầu. Lộ trình chia thành **2 giai đoạn**, Nền tảng và Cấu trúc & Tích hợp, với **3 bài luận** có chấm band score tại các mốc quan trọng để đo tiến độ thực tế.",
        whatYouLearn: [
          "**Ngữ pháp 2 tầng**: Tầng 1 loại bỏ hoàn toàn các lỗi làm sai lệch ý nghĩa, gồm câu thiếu chủ-vị, run-on sentences, lỗi dấu câu, hòa hợp S-V ngôi 3, thiếu -s/-es số nhiều. Tầng 2 xây dựng **4 thì cốt lõi** (present simple, past simple, present perfect, present continuous), article (a/an/the), và **3 loại mệnh đề phụ thuộc** cơ bản (lý do, nhượng bộ, thời gian) đủ chính xác để không tạo lỗi mới.",
          "**Writing Task 1**: Nhận dạng và viết đúng cấu trúc cho **5 loại biểu đồ**: bar chart, line graph, pie chart, table, và process diagram/map. Xây dựng ngân hàng **30+ từ/cụm từ** mô tả xu hướng (rise, decline, remain stable, account for...); viết câu mở bài bằng paraphrase đề bài và câu overview tóm tắt **2 đặc điểm** nổi bật nhất; sử dụng template phù hợp từng loại biểu đồ và chọn lọc số liệu để minh họa thay vì liệt kê toàn bộ.",
          "**Writing Task 2**: Nhận dạng **3 dạng đề bài** (Agree/Disagree, Discussion + Opinion, Problem-Solution/Cause-Effect) và lên cấu trúc phù hợp. Viết mở bài **2 câu** có luận điểm rõ ràng; đoạn thân bài **4–5 câu** theo cấu trúc **PEEL** (Point → Evidence → Explanation → Link); sử dụng **15+ cohesive devices** theo chức năng; viết kết bài **2 câu** hoàn chỉnh.",
          "**Listening**: Làm quen với format **4 Section** và **5 chủ đề** phổ biến nhất ở Section 1–2 (du lịch, giáo dục, mua sắm, cuộc sống hàng ngày, dịch vụ công cộng), xây dựng **15+ từ vựng dự đoán** mỗi chủ đề. Luyện **3 dạng câu hỏi** entry-level (form/note completion, table completion, short answer); nhận dạng paraphrase Level 1 trong audio; phân biệt các cặp âm dễ nhầm kết hợp trực tiếp với chương trình IPA trong Speaking.",
          "**Reading**: Áp dụng phương pháp **R.E.A.L.** (Read – Examine – Analyze – Limit) có hệ thống: đọc câu hỏi trước, xác định keyword và dự đoán paraphrase, scan đúng vị trí thay vì đọc toàn văn, rút kinh nghiệm từng bẫy sau mỗi câu sai. Thực hành **4 dạng câu hỏi** phổ biến (T/F/NG, Multiple Choice, Matching Headings, Sentence Completion) trên văn bản tăng dần từ dưới **300 từ** lên **700–800 từ**; xây dựng **100+ từ học thuật** theo **5 chủ đề**.",
          "**Speaking**: IPA hệ thống cho cả nguyên âm (**5 cặp** ngắn/dài, **4 diphthong** phổ biến) và phụ âm (cặp hữu thanh/vô thanh, âm cuối thường bị bỏ, âm θ/ð đặc trưng tiếng Anh), giúp học viên tự nghe và tự sửa phát âm sau khóa mà không cần giáo viên. Part 1: trả lời **2–3 câu** theo cấu trúc Statement → Reason → Example, zero one-word answers từ Giai đoạn 2. Part 2: lên dàn ý trong **1 phút** chuẩn bị, nói liên tục đủ **1 phút** với ít nhất **2 thì** khác nhau.",
        ],
        howLessonsWork:
          "Mỗi tuần **2 buổi** học, mỗi buổi **75–90 phút**, theo mô hình **Test – Teach – Test**: kiểm tra nhanh nội dung cũ, dạy kỹ năng/ngữ pháp mới, luyện tập ngay trong buổi có chữa đáp án chi tiết. Khóa học chia thành **2 giai đoạn**: Giai đoạn 1 tập trung vào ngữ pháp, phát âm IPA và Task 1; Giai đoạn 2 xây dựng Task 2, Reading chiến lược và Speaking Part 2. Học viên viết **3 bài luận** có chấm band score tại các mốc quan trọng để so sánh tiến độ thực tế. Tự học **4–5 giờ/tuần** gồm bài tập ngữ pháp, luyện viết đoạn văn và ghi âm Speaking.",
        whoItsFor:
          "Phù hợp với học viên hiện ở **Band 3.5–5.0** chưa quen với định dạng bài thi IELTS Academic, còn mắc lỗi ngữ pháp cơ bản ảnh hưởng đến cả **4 kỹ năng**, và có **6–9 tháng** trước kỳ thi. Đặc biệt phù hợp với người đã học tiếng Anh một thời gian nhưng chưa từng luyện thi IELTS có hệ thống và không biết mình đang sai ở đâu.",
        pricing: {
          studentDiscountPercent: 10,
          subtext: "Học phí tính theo giờ học thực tế, đóng theo tháng hoặc đóng trọn khóa. Học sinh, sinh viên giảm 10%.",
          plans: [
            { id: "nhom", name: "Nhóm (3–5 người)", monthlyPrice: 800000, annualPrice: 4800000, description: "Học cùng 3 đến 5 học viên trình độ tương đương, chi phí thấp hơn đáng kể so với học 1-1. Giá tính khi lớp đủ 5 người, vẫn được giáo viên theo sát từng buổi.", popular: false, startingFrom: true },
            { id: "one-one", name: "1-1", monthlyPrice: 2400000, annualPrice: 14400000, description: "Học riêng 1-1 với giáo viên. Lộ trình cá nhân hóa hoàn toàn theo điểm yếu và tốc độ tiếp thu của bạn.", popular: true },
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
        "Dành cho học viên Band 5.0–5.5 bị kẹt và không biết mình sai ở đâu. Lộ trình cá nhân hóa theo chẩn đoán lỗi, nâng toàn bộ 4 tiêu chí lên Band 6.5 đồng đều.",
      level: "Band 5.0–5.5 → 6.5",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: true,

      detail: {
        image: { src: "/teaching/ielts-intermediate-avt.png", alt: "IELTS Intermediate" },
         syllabusUrl: "https://drive.google.com/file/d/1vtJpiNcmD_WKwGuAc6J9R_JXiPO7zm-L/view?usp=drive_link",
        overview:
          "IELTS Intermediate dành cho học viên đang ở **Band 5.0–5.5** và cần đạt **Band 6.5**, mức điểm yêu cầu phổ biến nhất cho du học, visa và công việc. Khóa học không dạy lại từ đầu mà bắt đầu bằng **bài kiểm tra chẩn đoán** để xác định chính xác lỗi của từng học viên, từ đó cá nhân hóa toàn bộ lộ trình theo đúng điểm yếu thực tế. Với **40 buổi học** chia thành **4 giai đoạn** (Nền tảng, Phát triển, Tích hợp, và Thi thử & Chuẩn bị Cuối), học viên sửa lỗi có hệ thống, nâng cả **4 tiêu chí IELTS** lên **Band 6.5** đồng đều và bước vào phòng thi với chiến lược rõ ràng.",
        whatYouLearn: [
          "**Writing** (Task Response & Coherence): Phân biệt và viết thành thạo **3 dạng bài luận** (Agree/Disagree, Discussion + Opinion, Partial Agreement) với công thức luận điểm 3 phần. Viết đoạn thân bài **PEEL** tối thiểu **6 câu**; xây dựng ngân hàng **25+ cohesive devices** theo chức năng (bổ sung, tương phản, nguyên nhân/kết quả, ví dụ, kết luận); loại bỏ các lỗi mất mạch lạc trong đoạn văn bằng kỹ thuật **sentence-chain editing**.",
          "**Writing** (Lexical Resource & Grammar): Xây dựng họ từ cho **10 chủ đề IELTS Writing** (Advertising, Technology, Education, Environment, Health, Society, Economy, Transport, Crime, Media) và ngân hàng **60+ academic collocations**. Loại bỏ **6 lỗi GRA tái phát** được chẩn đoán từ bài kiểm tra đầu vào; sử dụng thành thạo **4 cấu trúc câu phức** (mệnh đề quan hệ, câu bị động, câu điều kiện, mệnh đề nhượng bộ). Theo dõi tiến độ qua **4 bài luận** có chấm band score xuyên suốt khóa.",
          "**Listening**: Hoàn thành chương trình **4 tuần** luyện phân biệt cặp âm tối thiểu (-teen/-ty, nguyên âm ngắn/dài, hữu thanh/vô thanh, cụm phụ âm cuối); xây dựng kỹ năng ghi chú có cấu trúc dạng bảng cho Section 3–4; nhận diện và né tránh **4 loại bẫy** đánh lạc hướng (minimal pair distraction, multi-speaker confusion, information overload, paraphrase blindness). Hoàn thành **2 bài thi Listening** toàn diện dưới điều kiện thi thật có phân tích lỗi chi tiết.",
          "**Reading**: Áp dụng **R.E.A.L.** (Read – Examine – Analyze – Limit) ở mức nâng cao với paraphrase Level 1–3, từ thay từ đơn lẻ đến cấu trúc câu hoàn toàn thay đổi. Thực hành chiến lược riêng cho **4 dạng câu hỏi** mức Band 6.5 (Matching Information, T/F/NG, Matching Headings, Summary Completion); xây dựng **200+ từ AWL** theo **3 nhóm chủ đề** phổ biến nhất. Hoàn thành **3 bài thi Reading** có tính giờ với phân tích lỗi chi tiết theo từng dạng câu hỏi.",
          "**Speaking**: Part 1: trả lời **2–3 câu** trôi chảy, dùng present perfect tự nhiên trong văn nói. Part 2: nói liên tục **1.5–2 phút**, sử dụng discourse markers và ít nhất **2 thì**. Part 3: cấu trúc Quan điểm → Lý do → Ví dụ → Nhượng bộ, sử dụng **4 cấu trúc ngữ pháp B2** (Type 2 conditional, passive, comparative, concession clause) trong nói tự nhiên. Phát âm: word stress trong từ học thuật, linked sounds và ending sounds kết hợp với luyện Listening.",
        ],
        howLessonsWork:
          "Khóa học bắt đầu bằng **bài kiểm tra chẩn đoán** để xác định chính xác lỗi của từng học viên. Toàn bộ lộ trình được **cá nhân hóa** theo điểm yếu thực tế thay vì dạy theo giáo trình cố định. Mỗi tuần **2 buổi**, **60–90 phút** tùy giai đoạn, chia thành **4 giai đoạn**: Nền tảng (sửa lỗi ngữ pháp, cấu trúc viết, ngữ âm) → Phát triển (xây dựng cả 4 kỹ năng lên Band 6) → Tích hợp (nâng lên Band 6.5 dưới điều kiện thi thật) → Thi thử & Chuẩn bị Cuối (**2 mock test** toàn diện có chữa đề chi tiết). Học viên viết **4 bài luận** có chấm band score để theo dõi tiến độ, và nhận **error watch list** cá nhân, danh sách lỗi dai dẳng nhất để mang vào phòng thi. Tự học **5–7 giờ/tuần**.",
        whoItsFor:
          "Phù hợp với học viên **Band 5.0–5.5** cần đạt **Band 6.5** cho mục tiêu cụ thể (du học, visa, công việc), đã có nền tảng tiếng Anh nhưng bị kẹt ở Band 5 và không biết mình đang sai ở đâu. Đặc biệt phù hợp với người có **4–6 tháng** trước kỳ thi, sẵn sàng cam kết **5–7 giờ tự học/tuần** và muốn một lộ trình có hệ thống thay vì luyện đề tràn lan.",
        pricing: {
          studentDiscountPercent: 10,
          subtext: "Học phí tính theo giờ học thực tế, đóng theo tháng hoặc đóng trọn khóa. Học sinh, sinh viên giảm 10%.",
          plans: [
            { id: "nhom", name: "Nhóm (3–5 người)", monthlyPrice: 1000000, annualPrice: 6000000, description: "Học cùng 3 đến 5 học viên trình độ tương đương, chi phí thấp hơn đáng kể so với học 1-1. Giá tính khi lớp đủ 5 người, vẫn được giáo viên theo sát từng buổi.", popular: false, startingFrom: true },
            { id: "one-one", name: "1-1", monthlyPrice: 3000000, annualPrice: 18000000, description: "Học riêng 1-1 với giáo viên. Lộ trình cá nhân hóa hoàn toàn theo điểm yếu và tốc độ tiếp thu của bạn.", popular: true },
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
        image: { src: "/teaching/toeic-basic-avt.png", alt: "TOEIC Basic" },
        syllabusUrl: "https://drive.google.com/file/d/1YFl5QX46dVz89apeWMZaabY_0m7E2mOG/view?usp=drive_link",
        overview:
          "Khóa học dành cho người mất gốc hoặc mới bắt đầu, giúp xây dựng lại nền tảng từ vựng và ngữ pháp tiếng Anh một cách bài bản, đồng thời làm quen với cấu trúc đề thi TOEIC. Sau **6 tháng** học, học viên có nền tảng vững chắc cùng các kỹ thuật làm bài chuẩn để bước vào giai đoạn luyện kỹ năng chuyên sâu ở khóa Intermediate.",
        whatYouLearn: [
          "Nắm vững **300 từ vựng TOEIC cốt lõi** thuộc **12 chủ đề** thường gặp nhất trong đề thi (Hợp đồng, Tiếp thị, Bảo hành, Kế hoạch kinh doanh, Hội nghị, Máy tính, Công nghệ & Quy trình văn phòng, Điện tử, Thư từ công sở, Tuyển dụng, Phỏng vấn xin việc...)",
          "Hoàn thành **10 chuyên đề ngữ pháp** nền tảng: các thì hiện tại – quá khứ, Gerunds/Infinitives, hòa hợp Chủ ngữ – Động từ, Mệnh đề quan hệ, Danh từ/Đại từ, Tính từ/Trạng từ, So sánh, Liên từ",
          "Làm chủ kỹ thuật **F.A.N.** (Focus – Action – Notice) cho **Part 1** (mô tả tranh) và **Part 2** (Hỏi – Đáp): xác định trọng tâm nghe, đối chiếu nội dung và phản xạ chọn đáp án nhanh, không phân vân",
          "Làm quen kỹ thuật **R.E.A.L.** (Read – Examine – Analyze – Limit) ở mức cơ bản cho **Part 5**: xác định từ loại trước/sau chỗ trống, đối chiếu đáp án và rút kinh nghiệm từ lỗi sai",
          "Luyện nghe chép chính tả (dictation) để cải thiện khả năng nhận diện âm cuối (-s/es, -ed)",
          "Hoàn thành **2 bài kiểm tra định kỳ** (mini-test **50 câu** và half-test **100 câu**) để đánh giá tiến độ",
        ],
        howLessonsWork:
          "Mỗi tuần gồm **3 buổi** học (**120 phút/buổi**): 1 buổi từ vựng theo chủ đề kết hợp ôn tập ngắt quãng (spaced repetition), 1 buổi ngữ pháp với **20–30 câu** bài tập thực hành, và 1 buổi luyện kỹ năng Nghe hoặc Đọc theo mô hình **Test – Teach – Test**: học viên làm bài kiểm tra đầu vào, được hướng dẫn kỹ thuật **F.A.N.** (với Nghe) hoặc **R.E.A.L.** (với Đọc), thực hành có thảo luận/chữa đáp án chi tiết, rồi làm bài kiểm tra đầu ra để củng cố thói quen làm bài chuẩn. Cứ sau **4 tuần**, học viên làm một bài kiểm tra ngắn và được chữa bài chi tiết trước khi sang chủ đề mới.",
        whoItsFor:
          "Phù hợp với người mất gốc tiếng Anh hoặc trình độ **A2**, chưa từng tiếp xúc với đề thi TOEIC, cần xây dựng lại nền tảng từ vựng – ngữ pháp một cách hệ thống trước khi luyện kỹ năng làm bài nâng cao. Học viên cần cam kết tối thiểu **6–8 giờ/tuần** (gồm cả tự học).",
        pricing: {
          studentDiscountPercent: 10,
          subtext: "Học phí tính theo giờ học thực tế, đóng theo tháng hoặc đóng trọn khóa. Học sinh, sinh viên giảm 10%.",
          plans: [
            { id: "nhom", name: "Nhóm (3–5 người)", monthlyPrice: 1000000, annualPrice: 6000000, description: "Học cùng 3 đến 5 học viên trình độ tương đương, chi phí thấp hơn đáng kể so với học 1-1. Giá tính khi lớp đủ 5 người, vẫn được giáo viên theo sát từng buổi.", popular: false, startingFrom: true },
            { id: "one-one", name: "1-1", monthlyPrice: 4800000, annualPrice: 28800000, description: "Học riêng 1-1 với giáo viên. Lộ trình cá nhân hóa hoàn toàn theo điểm yếu và tốc độ tiếp thu của bạn.", popular: true },
          ],
        },
      },
    },
    {
      id: "toeic-intermediate",
      icon: "🚀",
      category: "toeic",
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
        image: { src: "/teaching/toeic-intermediate-avt.png", alt: "TOEIC Intermediate" },
        syllabusUrl: "https://drive.google.com/file/d/1ZOoKV_IhF5tqp0gXgaryUkowhEXyIsBn/view?usp=drive_link",
        overview:
          "Khóa học dành cho học viên đã có nền tảng từ vựng – ngữ pháp cơ bản, tập trung phát triển toàn diện **7 Part** của bài thi TOEIC bằng các kỹ thuật làm bài nâng cao và luyện đề sát với đề thi thật (bộ **ETS**). Sau **6 tháng**, học viên tự tin đạt mục tiêu **500+ TOEIC**, làm chủ chiến thuật xử lý từng dạng câu hỏi và quản lý thời gian phòng thi.",
        whatYouLearn: [
          "Mở rộng vốn từ vựng lên hơn **700–1000 từ** với **12 chủ đề chuyên sâu** (Tuyển dụng & Đào tạo, Lương thưởng, Thăng chức, Mua sắm, Đặt hàng, Vận chuyển, Hóa đơn, Kho hàng, Ngân hàng, Kế toán, Đầu tư, Thuế...)",
          "Vận dụng thành thạo **F.A.N.** ở mức nâng cao cho **Part 3** và **Part 4**: phân biệt keyword qua paraphrase, xử lý câu hỏi suy luận (implied meaning) và dạng biểu đồ (diagram), kỹ thuật quyết đoán chọn đáp án",
          "Vận dụng thành thạo **R.E.A.L.** cho **Part 6** (kết hợp Functional Grammar để chọn câu phù hợp ngữ cảnh) và **Part 7** (xác định từ khóa câu hỏi, kỹ thuật Skim/Scan để định vị thông tin nhanh trong đoạn văn đơn/kép)",
          "Nhận diện và né tránh các bẫy thường gặp trong Listening và Reading (cặp từ/cấu trúc dễ nhầm, tính từ -ed/-ing, đại từ quan hệ, đáp án gây nhiễu ở Part 7...)",
          "Củng cố ngữ pháp nâng cao: câu bị động phức tạp, câu điều kiện, giới từ",
          "Hoàn thành tối thiểu **4 đề thi thật ETS** (Listening + Reading) có bấm giờ và chữa đề chi tiết, ghi chép vào **sổ tay lỗi sai (Error Log)**",
          "Trải qua **3 bài kiểm tra định kỳ** và **1 bài thi thử hoàn chỉnh** mô phỏng điều kiện thi thật",
        ],
        howLessonsWork:
          "Mỗi tuần gồm **3 buổi** học (**120 phút/buổi**), tiếp nối nền tảng **F.A.N./R.E.A.L.** từ khóa Basic, học viên luyện tập các biến thể nâng cao của 2 kỹ thuật này theo từng dạng câu hỏi phức tạp hơn thông qua mô hình **Test – Teach – Test** ở mỗi buổi luyện kỹ năng. Sang **3 tháng cuối**, lịch học chuyển trọng tâm sang luyện đề: mỗi buổi giải một phần đề thi thật (ETS) có bấm giờ, buổi kế tiếp chữa đề chi tiết và phân tích lỗi sai bằng đúng kỹ thuật đã học. Học viên làm bài kiểm tra định kỳ mỗi **4 tuần** để theo dõi sát tiến độ điểm số.",
        whoItsFor:
          "Phù hợp với học viên đã hoàn thành khóa TOEIC Basic hoặc đã có nền tảng từ vựng – ngữ pháp tương đương (**300–700 từ**, nắm các thì cơ bản), mong muốn chinh phục mục tiêu **500+ TOEIC** trong **6 tháng**. Học viên cần cam kết tối thiểu **6–8 giờ/tuần** và sẵn sàng luyện đề với cường độ cao ở giai đoạn cuối khóa.",
        pricing: {
          studentDiscountPercent: 10,
          subtext: "Học phí tính theo giờ học thực tế, đóng theo tháng hoặc đóng trọn khóa. Học sinh, sinh viên giảm 10%.",
          plans: [
            { id: "nhom", name: "Nhóm (3–5 người)", monthlyPrice: 1080000, annualPrice: 6480000, description: "Học cùng 3 đến 5 học viên trình độ tương đương, chi phí thấp hơn đáng kể so với học 1-1. Giá tính khi lớp đủ 5 người, vẫn được giáo viên theo sát từng buổi.", popular: false, startingFrom: true },
            { id: "one-one", name: "1-1", monthlyPrice: 6000000, annualPrice: 36000000, description: "Học riêng 1-1 với giáo viên. Lộ trình cá nhân hóa hoàn toàn theo điểm yếu và tốc độ tiếp thu của bạn.", popular: true },
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
        "Xây phản xạ nói tiếng Anh từ nền tảng cơ bản. Học viên thoát khỏi việc dịch từng từ trong đầu, nói được câu hoàn chỉnh có chia thì và tự tin giao tiếp trong môi trường đại học.",
      level: "Mất gốc → Giao tiếp tự tin, 3 tháng",
      format: "1-1",
      duration: "Linh hoạt theo học viên",
      highlighted: false,

      detail: {
        image: { src: "/teaching/giao-tiep-avt.png", alt: "Tiếng Anh Giao Tiếp" },
        syllabusUrl: "https://drive.google.com/file/d/1B09E_D93uUoO3xR3BWYLxyM79vgiLytc/view?usp=drive_link",
        overview:
          "Khóa Giao Tiếp dành cho người học có nền tảng ngữ pháp và từ vựng cơ bản nhưng chưa áp dụng được vào giao tiếp thực tế. Vấn đề phổ biến nhất là **dịch từng từ** từ tiếng Việt sang tiếng Anh, dẫn đến phản ứng chậm và câu nói thiếu liên kết, sai thì. Chương trình gồm **2 giai đoạn**, tổng **36 giờ** học trong **12 tuần**. Giai đoạn 1 xây nền tảng phát âm, ngữ pháp cơ bản và phản xạ câu đơn. Giai đoạn 2 phát triển khả năng nói dài, thảo luận và trình bày ý tưởng phức tạp. Học viên hoàn thành khóa học có thể giao tiếp linh hoạt và tự tin sử dụng tiếng Anh trong môi trường học thuật và đời sống tại đại học.",
        whatYouLearn: [
          "**Phát âm và nghe nền tảng**: Phát âm chính xác toàn bộ nguyên âm và phụ âm **IPA**, nhận diện và sửa được các lỗi phát âm điển hình của người Việt như âm cuối, âm rung, âm dài và ngắn. Áp dụng đúng **3 cách đọc đuôi -ed** (/t/, /d/, /ɪd/) trong toàn bộ bài luyện. Sử dụng đúng trọng âm từ và ngữ điệu lên xuống trong câu hỏi và câu khẳng định. Nghe và tóm tắt được nội dung chính của audio ngắn (**1–2 phút**) sau 1 lần nghe.",
          "**Ngữ pháp và xây câu phản xạ**: Chia đúng **6 thì cơ bản** trong giao tiếp tự nhiên, không cần dừng lại để nhớ quy tắc. Xây câu đơn hoàn chỉnh trong vòng **3 giây**, không dịch từng từ trong đầu. Ghép câu đơn thành câu ghép bằng tối thiểu **8 liên từ**. Xây câu phức với tối thiểu **5 cấu trúc mệnh đề phụ thuộc**. Dùng tối thiểu **15 discourse marker** và linking word để nối ý mạch lạc khi nói đoạn dài.",
          "**Phản xạ nói và small talk**: Trả lời câu hỏi giao tiếp thông thường trong **3–5 giây** bằng kỹ thuật sắp xếp ý trước khi nói. Small talk trôi chảy về tối thiểu **10 chủ đề** quen thuộc ở cả 3 thì. Sử dụng tối thiểu **20 cụm từ giao tiếp** tự nhiên đúng tình huống.",
          "**Từ vựng và thảo luận chủ đề**: Tích lũy và sử dụng tối thiểu **150 từ vựng** và cụm từ theo chủ đề học thuật và đời sống đại học. Paraphrase ý khi quên từ chính xác, đưa ra được **2–3 cách diễn đạt thay thế** cho cùng một ý. Kể chuyện mạch lạc về một trải nghiệm cá nhân trong **1–2 phút**, có mở đầu, diễn biến và kết. Tham gia thảo luận về tối thiểu **8 chủ đề học thuật** cơ bản, đưa ra và bảo vệ được quan điểm cá nhân.",
          "**Nói dài và kỹ năng trình bày**: Nói liên tục về 1 chủ đề trong tối thiểu **1 phút**, không ngắt quãng quá **3 giây**. Nói mạch lạc trong **2 phút** hoặc hơn với cấu trúc ý rõ ràng. Trả lời câu hỏi không chuẩn bị trước với thời gian phản xạ dưới **5 giây**. Thuyết trình một bài ngắn **3–5 phút** có cấu trúc mở, thân, kết, áp dụng được trong môi trường đại học.",
        ],
        howLessonsWork:
          "Mỗi tuần **2 buổi** học, mỗi buổi **90 phút**, hoàn thành trong **3 tháng** (12 tuần). Mỗi chủ đề được thực hành ngay trong buổi học, không tách rời lý thuyết và luyện tập. Giai đoạn 1 (**4 tuần**, 12 giờ) xây nền tảng và sự tự tin cơ bản. Giai đoạn 2 (**8 tuần**, 24 giờ) phát triển khả năng nói phức tạp và dài hơi. Tốc độ và nội dung điều chỉnh theo tiến độ thực tế của từng học viên.",
        whoItsFor:
          "Phù hợp với người có kiến thức cơ bản về ngữ pháp và từ vựng nhưng chưa áp dụng được vào giao tiếp thực tế, đặc biệt là người có xu hướng **dịch từng từ** trong đầu trước khi nói. Cũng phù hợp với người phát âm tự nhiên khá tốt nhưng thiếu kiến thức hệ thống về **IPA**, khiến việc nghe và phát âm chính xác bị hạn chế. Đây là lựa chọn phù hợp cho học sinh và sinh viên cần giao tiếp tiếng Anh linh hoạt để phục vụ học tập và sinh hoạt tại đại học.",
        pricing: {
          studentDiscountPercent: 10,
          subtext: "Học phí tính theo giờ học thực tế, đóng theo tháng hoặc đóng trọn khóa. Học sinh, sinh viên giảm 10%.",
          plans: [
            { id: "nhom", name: "Nhóm (3–5 người)", monthlyPrice: 1920000, annualPrice: 5760000, description: "Học cùng 3 đến 5 học viên trình độ tương đương. Chi phí thấp hơn 20% so với học 1-1, vẫn được giáo viên theo sát từng buổi.", popular: false },
            { id: "one-one", name: "1-1", monthlyPrice: 2400000, annualPrice: 7200000, description: "Học riêng 1-1 với giáo viên. Lộ trình cá nhân hóa hoàn toàn theo điểm yếu và tốc độ tiếp thu của bạn.", popular: true },
          ],
        },
      },
    },
  ],

// ===== FAQ dùng chung cho TẤT CẢ khóa học =====
faqs: [
  {
    question: "Lịch học được sắp xếp như thế nào?",
    answer: "Mỗi buổi học kéo dài 60 đến 90 phút. Lịch được thỏa thuận linh hoạt theo lịch trống của cả hai bên, không cố định giờ cứng. Học viên có thể dời lịch nếu thông báo trước ít nhất 24 giờ."
  },
  {
    question: "Tôi cần chuẩn bị gì trước khi bắt đầu?",
    answer: "Chỉ cần máy tính hoặc điện thoại có kết nối internet ổn định, tai nghe, và tài khoản Zoom. Tài liệu học được gửi trước mỗi buổi qua Zalo hoặc email, học viên không cần mua thêm sách."
  },
  {
    question: "Nếu tôi bỏ lỡ một buổi học thì sao?",
    answer: "Buổi học bị lỡ sẽ được dời sang thời điểm khác, không tính mất buổi. Học viên cần báo trước ít nhất 24 giờ để sắp xếp lại lịch phù hợp."
  },
  {
    question: "Khóa học có phù hợp với người đi làm không?",
    answer: "Có. Phần lớn học viên hiện tại của tôi học vào buổi tối hoặc cuối tuần. Lịch học linh hoạt hoàn toàn theo nhu cầu của từng người."
  },
  {
    question: "Có cam kết đầu ra không?",
    answer: "Chương trình được thiết kế để đạt mục tiêu đề ra nếu học viên hoàn thành đủ số buổi và bài tập giữa các buổi. Kết quả cụ thể phụ thuộc vào mức độ luyện tập của từng người, nên tôi không cam kết điểm số cố định."
  },
],
  cta: "Đặt buổi học thử miễn phí",
  ctaHref: "#contact",
};

export default coursesData;