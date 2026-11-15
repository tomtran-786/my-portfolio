"use client";

import Link from "next/link";
import navData from "@/data/teaching/nav";
import ctaData from "@/data/teaching/cta";
import heroData from "@/data/teaching/hero";

function scrollTo(href) {
  if (href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

export default function TeachingFooter() {
  const { brand, links, backLink } = navData;

  return (
    <footer id="footer" className="tf">
      {/* Thẻ tên đeo cổ: thương hiệu và thông tin liên hệ; bên phải là hai danh sách liên kết. */}
      <div className="tf-badge">
        <b>{brand.name} {brand.accent}.</b>
        <p>{heroData.subtext}</p>
        <ul>
          {ctaData.buttons.map((button) => (
            <li key={button.label}>
              <a
                href={button.href}
                {...(button.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <i className={`ti ${button.icon}`} aria-hidden="true" style={{ marginRight: "0.4rem" }} />
                {button.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="tf-lists">
        <div>
          <h3>Khám phá</h3>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <button type="button" className="tf-link" onClick={() => scrollTo(link.href)}>{link.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Bắt đầu</h3>
          <ul>
            <li><button type="button" className="tf-link" onClick={() => scrollTo("#courses")}>Xem khóa học</button></li>
            <li><button type="button" className="tf-link" onClick={() => scrollTo("#contact")}>Học thử miễn phí</button></li>
            <li><Link href={backLink.href} className="tf-link">{backLink.label} ↗</Link></li>
          </ul>
        </div>
      </div>

      <p className="tf-end">© 2026 Tuan (Tom) Tran</p>
    </footer>
  );
}
