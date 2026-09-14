// Blog posts are .mdx files in content/blog/, each exporting a `metadata`
// object. To add a new post: create content/blog/<slug>.mdx with a
// `export const metadata = { title, date, category, cover, excerpt, tags }`
// block up top, followed by the post body in Markdown/MDX — no code changes
// needed here. `category` must be one of BLOG_CATEGORIES (see
// lib/blog-utils.js; it drives the filter tabs on /blog). `cover` is the
// thumbnail shown on the blog list card, a path under public/ (e.g. an
// image already used in the post).
//
// This file is server-only (uses Node's fs/path) — never import it from a
// 'use client' component. Client components that just need BLOG_CATEGORIES
// or formatPostDate should import those from lib/blog-utils.js instead.

import fs from 'node:fs'
import path from 'node:path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export { BLOG_CATEGORIES, formatPostDate } from './blog-utils'

export function getBlogSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
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
