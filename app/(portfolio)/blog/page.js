import Link from 'next/link'
import { getAllPosts, formatPostDate } from '@/lib/blog'
import Footer from '@/app/components/Footer'
import GoToTop from '@/app/components/Gototop'

export const metadata = {
  title: 'Blog | Tom Tran',
  description: 'Notes and stories from studying in Taiwan.',
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  return (
    <main className="pf-theme">
      <div className="pf-blog-page">
        <div className="pf-section-heading">
          <h1 className="pf-section-title" style={{ fontWeight: 700, display: 'block' }}>Blog</h1>
          <p className="pf-section-subtitle pf-section-context" style={{ fontWeight: 500 }}>
            Notes and stories from studying in Taiwan
          </p>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--pf-text-secondary)' }}>No posts yet — check back soon.</p>
        ) : (
          <div className="pf-blog-list">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="pf-blog-card">
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
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <GoToTop />
    </main>
  )
}
