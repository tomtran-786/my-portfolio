// Tiện ích dùng chung cho thẻ khóa học và danh sách khóa ở hero.

export const formatVnd = (n) => `${n.toLocaleString("vi-VN")}đ`;

// Gói có giá tháng thấp nhất, lấy thẳng từ bảng giá để khớp với modal.
export function startingPrice(item) {
  const plans = item.detail?.pricing?.plans ?? [];
  if (plans.length === 0) return null;
  return plans.reduce((min, plan) => (plan.monthlyPrice < min.monthlyPrice ? plan : min));
}

// Sự kiện để hero (dòng prompt chọn mục tiêu) điều khiển bộ lọc ở CoursesSection.
export const GOAL_EVENT = "teach:goal";
