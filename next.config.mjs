import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

// Blog posts live in content/blog/*.mdx and are loaded via dynamic import
// (not file-based routing), but the .mdx loader still needs to be wired up
// for that import to compile at all.
const withMDX = createMDX({});

export default withMDX(nextConfig);
