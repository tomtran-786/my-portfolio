'use client'

// Bố cục phỏng theo footer của "folio" (Ayush Singh) qua bản fork
// MarkPhamm/portfolio_website: dải cong -> lưới 4 cột -> thanh bản quyền.
// Nguồn: https://github.com/ayush013/folio (MIT)
// Copyright (c) 2020-2022 Ayush Singh. Licensed under the MIT License.
//
// Viết lại cho stack của dự án này: inline style thay Tailwind, icon Tabler
// thay bộ /social/*.svg, và bỏ toàn bộ lời gọi analytics (Clarity) của bản gốc.

import Link from 'next/link'

const ACCENT = '#a78bfa'
const BORDER = 'rgba(139,92,246,0.2)'

const s = {
  heading: {
    fontSize: 12,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '1rem',
  },
  link: {
    display: 'block',
    width: 'fit-content',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    marginBottom: '0.65rem',
    transition: 'color 0.2s ease',
  },
  body: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1.7,
  },
  muted: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.7,
  },
  social: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'rgba(139,92,246,0.12)',
    border: `0.5px solid ${BORDER}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ACCENT,
    fontSize: 18,
    textDecoration: 'none',
    transition: 'transform 0.2s ease, background 0.2s ease',
  },
}

const EXPLORE = [
  { label: 'Home', href: '#home' },
  { label: 'My Works', href: '#projects' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'My Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/tran-vo-manh-tuan', label: 'LinkedIn' },
  { icon: 'ti-brand-github', href: 'https://github.com/tomtran-786', label: 'GitHub' },
  { icon: 'ti-mail', href: 'https://mail.google.com/mail/?view=cm&to=tomtran.workcontact@gmail.com', label: 'Email' },
]

function scrollToId(e, href) {
  if (!href.startsWith('#')) return
  e.preventDefault()
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer id="footer" style={{ position: 'relative', zIndex: 5, marginTop: '2rem' }}>
      {/* Dải cong chuyển tiếp — tự vẽ, fill trùng nền footer.
          preserveAspectRatio none để giãn đúng ở mọi bề rộng. */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: 90 }}
      >
        <path d="M0,120 C360,20 1080,20 1440,120 L1440,120 L0,120 Z" fill="#0f1629" />
      </svg>

      <div style={{ background: '#0f1629', padding: '1rem 2.5rem 2.5rem' }}>
        <div className="pf-footer-grid">
          {/* 1. Danh tính */}
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 20, fontWeight: 800, color: ACCENT, marginBottom: '0.75rem' }}>
              &lt;tomtran/&gt;
            </div>
            <p style={{ ...s.body, maxWidth: '16rem', marginBottom: '0.75rem' }}>
              Turning data into decisions in finance, analytics, and business strategy.
            </p>
            <p style={s.muted}>
              Bachelor of International Business
              <br />
              Foreign Trade University · Ho Chi Minh City
            </p>
          </div>

          {/* 2. Explore */}
          <div>
            <p style={s.heading}>Explore</p>
            {EXPLORE.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={s.link}
                onClick={(e) => scrollToId(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 3. Elsewhere */}
          <div>
            <p style={s.heading}>Elsewhere</p>
            <Link href="/teaching" style={s.link}>
              Teaching
            </Link>
            <a
              href="https://chemistery-lat.vercel.app/courses"
              target="_blank"
              rel="noreferrer"
              style={s.link}
            >
              Chemistery ↗
            </a>
            <a href="https://github.com/tomtran-786" target="_blank" rel="noreferrer" style={s.link}>
              GitHub ↗
            </a>
          </div>

          {/* 4. Connect */}
          <div>
            <p style={s.heading}>Connect with me</p>
            <a
              href="https://calendly.com/tomtran-workcontact"
              target="_blank"
              rel="noreferrer"
              style={s.link}
            >
              Book a coffee chat ↗
            </a>
            <a
              href="/Resume_Tran Vo Manh Tuan.pdf"
              download="Resume_Tran_Vo_Manh_Tuan.pdf"
              style={{ ...s.link, marginBottom: '1.1rem' }}
            >
              Download resume ↓
            </a>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map((so) => (
                <a
                  key={so.icon}
                  href={so.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={so.label}
                  className="pf-footer-social"
                  style={s.social}
                >
                  <i className={`ti ${so.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Thanh bản quyền */}
        <div className="pf-footer-bottom">
          <span>© 2026 Tuan (Tom) Tran</span>
          <span>Built with Next.js &amp; framer-motion</span>
        </div>
      </div>
    </footer>
  )
}
