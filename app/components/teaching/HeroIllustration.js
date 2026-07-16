"use client";

import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div style={{ width: "100%" }}>
      {/* SVG nên next/image không cần tối ưu, nhưng width/height giữ chỗ tránh giật layout */}
      <Image
        src="/teaching/online-teaching.svg"
        alt="Minh họa dạy học tiếng Anh online"
        width={600}
        height={450}
        priority
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}