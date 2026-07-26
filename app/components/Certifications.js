'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'

// Cùng pattern stagger/fadeUp đã dùng ở CoursesSection và TestimonialsSection
// bên /teaching. Trước đây cả trang card trượt vào như một khối; giờ từng thẻ
// vào lệch nhau.
const pageVariants = {
  hidden: (dir) => ({ opacity: 0, x: dir * 60 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.08 },
  },
  exit: (dir) => ({ opacity: 0, x: dir * -60, transition: { duration: 0.25 } }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
  exit: { opacity: 0 },
}

export const certs = [
  {
    id: 13,
    name: 'Foundations of Business Intelligence',
    issuer: 'Google',
    date: '2026',
    image: '/Foundations of BI.jpg',
    link: 'https://coursera.org/share/fd0c358f7994114a4bce8eb105b87356',
  },
  {
    id: 12,
    name: 'Google: Academic Excellence',
    issuer: 'Google',
    date: '2026',
    image: '/Gemini excellence.png',
    link: '',
  },
  {
    id: 7,
    name: 'SQL Beginner',
    issuer: 'Xóm Data Academy',
    date: '2026',
    image: '/sql_beginner.jpg',
    link: 'https://xomdata.com/certificates/XA-U2UPNE',
  },
  {
    id: 8,
    name: 'SQL Intermediate',
    issuer: 'Xóm Data Academy',
    date: '2026',
    image: '/sql_intermediate.jpg',
    link: 'https://xomdata.com/certificates/XA-62P2F2',
  },
  {
    id: 9,
    name: 'SQL Advanced',
    issuer: 'Xóm Data Academy',
    date: '2026',
    image: '/sql_advanced.jpg',
    link: 'https://xomdata.com/certificates/XA-S3BXBJ',
  },
  {
    id: 3,
    name: 'SQL Intermediate',
    issuer: 'DataCamp',
    date: '2026',
    image: '/Intermediate SQL.png',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/2b7c30c447298acf6670f5e49753e1dc6648b9dc?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
  },
  {
    id: 5,
    name: 'Data Manipulation in SQL',
    issuer: 'DataCamp',
    date: '2026',
    image: '/Data Manipulation in SQL.png',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/7c1bbaa20658e5fd525ebe9987d45790c47a0a18?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
  },
  {
    id: 10,
    name: 'Python Beginner',
    issuer: 'Xóm Data Academy',
    date: '2026',
    image: '/python_begin_xomdata.jpg',
    link: 'https://xomdata.com/certificates/XA-9URVA8',
  },
  {
    id: 11,
    name: 'Python Intermediate',
    issuer: 'Xóm Data Academy',
    date: '2026',
    image: '/python_inter_xomdata.jpg',
    link: 'https://xomdata.com/certificates/XA-GYSDVD',
  },
  {
    id: 4,
    name: 'Introduction to Python',
    issuer: 'DataCamp',
    date: '2026',
    image: '/Intro to Python.png',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/8e5a1a0ea9accd24fad972d9ff6b5d610923abdc?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
  },
  {
    id: 1,
    name: 'Financial Modelling in Excel',
    issuer: 'DataCamp',
    date: '2026',
    image: '/Financial Modeling in Excel.png',
    link: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/603d77ba9021a290acff8f54430242cc416a7dbd?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
  },
  {
    id: 2,
    name: 'Assess for Success: Marketing Analytics and Measurement',
    issuer: 'Google',
    date: '2026',
    image: '/Marketing Analytics.png',
    link: 'https://coursera.org/share/f8865d560ba55ff857880a69a3fa7314',
  },
  {
    id: 6,
    name: 'Foundations of Digital Marketing and E-commerce',
    issuer: 'Google',
    date: '2026',
    image: '/Foundations of Digital Marketing and E-commerce.png',
    link: 'https://coursera.org/share/ad48c74138c52dddba8ec265dc478ccf'
  }
]

const PER_PAGE = 3

export default function Certifications() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalPages = Math.ceil(certs.length / PER_PAGE)
  const visible = certs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const go = (dir) => {
    setDirection(dir)
    setPage(p => p + dir)
  }

  return (
   <section id="certifications" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 52, fontWeight: 700, color: '#9B51E0', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
          My Certifications
        </h2>
        <p style={{ fontSize: 22, fontWeight: 500, color: '#FFFFFF', margin: 0 }}>
          Professional certifications that validate my expertise
        </p>
      </div>

      {/* Cards */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pf-card-grid"
          >
            {visible.map((cert) => {
              // Chứng chỉ không có link công khai phải render thành <div>:
              // href="" theo spec HTML resolve về chính URL đang mở, nên bấm vào
              // sẽ mở thêm một tab chứa lại portfolio. Bỏ luôn hiệu ứng hover và
              // con trỏ pointer để thẻ không tự quảng cáo là bấm được.
              const hasLink = Boolean(cert.link)
              const Card = hasLink ? motion.a : motion.div
              const linkProps = hasLink
                ? { href: cert.link, target: '_blank', rel: 'noreferrer' }
                : {}

              return (
              <TiltCard key={cert.id}>
              <Card
                variants={cardVariants}
                {...linkProps}
                whileHover={hasLink ? { y: -6, scale: 1.02, boxShadow: '0 12px 40px rgba(124,58,237,0.25)' } : undefined}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: '#0f1629',
                  border: '0.5px solid rgba(139,92,246,0.2)',
                  borderRadius: 16, overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'block',
                  cursor: hasLink ? 'pointer' : 'default',
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative', width: '100%', aspectRatio: '4/3',
                  background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    // Certificate là ảnh chụp dày chữ + objectFit:contain; ở <=768px
                    // .pf-card-grid về 1 cột nên 33vw tải bản quá nhỏ để đọc được.
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'contain', padding: '1.5rem' }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1rem 1.2rem 1.2rem', borderTop: '0.5px solid rgba(139,92,246,0.15)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {cert.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 12, fontWeight: 500,
                      background: 'rgba(139,92,246,0.12)', color: '#a78bfa',
                      border: '0.5px solid rgba(139,92,246,0.3)',
                      borderRadius: 6, padding: '2px 10px',
                    }}>
                      {cert.issuer}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 11, color: '#475569',
                    }}>
                      {cert.date}
                    </span>
                  </div>
                </div>
              </Card>
              </TiltCard>
              )
            })}

            {/* Placeholder cards nếu trang cuối có ít hơn 3 */}
            {visible.length < PER_PAGE && Array.from({ length: PER_PAGE - visible.length }).map((_, i) => (
              <div key={`placeholder-${i}`} style={{
                background: 'rgba(15,22,41,0.3)',
                border: '0.5px dashed rgba(139,92,246,0.1)',
                borderRadius: 16,
                aspectRatio: '4/3',
              }} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: '2rem' }}>
        <motion.button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          whileHover={page > 0 ? { scale: 1.1 } : {}}
          whileTap={page > 0 ? { scale: 0.95 } : {}}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '0.5px solid rgba(139,92,246,0.4)',
            background: page === 0 ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.12)',
            color: page === 0 ? '#2d3748' : '#a78bfa',
            fontSize: 20, cursor: page === 0 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="ti ti-chevron-left" />
        </motion.button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
              // Nút dot không có nội dung nào cả -> không có aria-label thì trình
              // đọc màn hình chỉ nghe thấy 5 nút vô danh.
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? 'true' : undefined}
              style={{
                width: i === page ? 24 : 8, height: 8,
                borderRadius: 999,
                background: i === page ? '#7c3aed' : 'rgba(139,92,246,0.25)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => go(1)}
          disabled={page === totalPages - 1}
          aria-label="Next page"
          whileHover={page < totalPages - 1 ? { scale: 1.1 } : {}}
          whileTap={page < totalPages - 1 ? { scale: 0.95 } : {}}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '0.5px solid rgba(139,92,246,0.4)',
            background: page === totalPages - 1 ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.12)',
            color: page === totalPages - 1 ? '#2d3748' : '#a78bfa',
            fontSize: 20, cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="ti ti-chevron-right" />
        </motion.button>
      </div>

      {/* Page counter */}
      <div style={{
        textAlign: 'center', marginTop: '0.75rem',
        fontFamily: 'var(--font-inter)',
        color: '#fff', fontWeight: 500, fontSize: 12
      }}>
        {page + 1} / {totalPages}
      </div>
    </section>
  )
}