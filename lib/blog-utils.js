// Blog helpers safe to import from client components (no Node "fs"/"path").
// Server-only helpers that read content/blog/ live in lib/blog.js instead.

export const BLOG_CATEGORIES = ['Learning', 'Lifestyle']

export function formatPostDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
