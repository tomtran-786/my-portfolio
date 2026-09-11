import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogSlugs, formatPostDate } from '@/lib/blog'
import Footer from '@/app/components/Footer'
import GoToTop from '@/app/components/Gototop'

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  try {
    const { metadata } = await import(`@/content/blog/${slug}.mdx`)
    return { title: `${metadata.title} | Tom Tran`, description: metadata.excerpt }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params

  let Post
  let metadata
  try {
    ;({ default: Post, metadata } = await import(`@/content/blog/${slug}.mdx`))
  } catch {
    notFound()
  }

  return (
    <main className="pf-theme">
      <article className="pf-blog-page">
        <Link href="/blog" className="pf-blog-back">
          <span aria-hidden="true">←</span> Back to Blog
        </Link>

        <header className="pf-blog-post-header">
          <div className="pf-blog-card-date">{formatPostDate(metadata.date)}</div>
          <h1 className="pf-section-title" style={{ fontWeight: 700, display: 'block' }}>{metadata.title}</h1>
          {metadata.tags?.length > 0 && (
            <div className="pf-blog-card-tags">
              {metadata.tags.map((tag) => (
                <span key={tag} className="pf-blog-tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="pf-blog-prose">
          <Post />
        </div>
      </article>
      <Footer />
      <GoToTop />
    </main>
  )
}
