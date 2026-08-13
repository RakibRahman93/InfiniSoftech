/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow `npm run build` to write to a separate directory so it never races
  // with a running `next dev` server that shares the default `.next` folder.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;