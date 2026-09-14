import { getAllPosts } from '@/lib/blog'
import BlogList from '@/app/components/BlogList'
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

        <BlogList posts={posts} />
      </div>
      <Footer />
      <GoToTop />
    </main>
  )
}
