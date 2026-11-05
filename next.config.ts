import type { NextConfig } from "next";

// The site is fully static, so it builds to plain files in `out/` and
// Cloudflare Pages serves them (build command `npx next build`, output `out`).
// Static export can't use `redirects()` or the default image loader, so
// redirects live in `public/_redirects` and images are served as-is.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
