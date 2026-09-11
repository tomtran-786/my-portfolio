// Blog posts are .mdx files in content/blog/, each exporting a `metadata`
// object. To add a new post: create content/blog/<slug>.mdx with a
// `export const metadata = { title, date, excerpt, tags }` block up top,
// followed by the post body in Markdown/MDX — no code changes needed here.

import fs from 'node:fs'
import path from 'node:path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getBlogSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function formatPostDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function getAllPosts() {
  const slugs = getBlogSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`@/content/blog/${slug}.mdx`)
      return { slug, ...metadata }
    }),
  )
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
