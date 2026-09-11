// Required by @next/mdx for the App Router — without this file MDX imports
// won't compile. Styling for the rendered elements lives in globals.css
// under .pf-blog-prose (descendant selectors), so no per-element overrides
// are needed here.
const components = {}

export function useMDXComponents() {
  return components
}
