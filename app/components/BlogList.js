'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_CATEGORIES, formatPostDate } from '@/lib/blog-utils'

const ALL = 'All'
const FILTERS = [ALL, ...BLOG_CATEGORIES]

export default function BlogList({ posts }) {
  const [active, setActive] = useState(ALL)

  if (posts.length === 0) {
    return <p style={{ color: 'var(--pf-text-secondary)' }}>No posts yet — check back soon.</p>
  }

  const filtered = active === ALL ? posts : posts.filter((post) => post.category === active)
  const countFor = (cat) => (cat === ALL ? posts.length : posts.filter((post) => post.category === cat).length)

  return (
    <>
      <div className="pf-filter-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2rem' }}>
        {FILTERS.map((cat) => {
          const count = countFor(cat)
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', border: isActive ? '1px solid var(--pf-brand)' : '1px solid transparent',
                background: isActive ? 'var(--pf-brand)' : 'var(--pf-bg-soft)',
                color: isActive ? 'var(--pf-on-brand)' : 'var(--pf-brand)',
                transition: 'all 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              {cat}
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.22)' : 'transparent',
                color: isActive ? 'var(--pf-on-brand)' : 'var(--pf-brand)',
                borderRadius: 999, padding: '1px 7px',
                minWidth: 20, textAlign: 'center',
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--pf-text-secondary)' }}>No posts in this category yet.</p>
      ) : (
        <div className="pf-blog-list" aria-live="polite">
          {filtered.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="pf-blog-card">
              {post.cover && (
                <div className="pf-blog-card-cover">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 52rem"
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                  {post.category && (
                    <span className="pf-blog-card-category" data-category={post.category}>
                      {post.category}
                    </span>
                  )}
                </div>
              )}
              <div className="pf-blog-card-body">
                <div className="pf-blog-card-date">{formatPostDate(post.date)}</div>
                <h2 className="pf-blog-card-title">{post.title}</h2>
                {post.excerpt && <p className="pf-blog-card-excerpt">{post.excerpt}</p>}
                {post.tags?.length > 0 && (
                  <div className="pf-blog-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="pf-blog-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
