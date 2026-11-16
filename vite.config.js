import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site's Content Security Policy: only its own scripts, styles, images and fonts can load, so injected
// code can't run. GitHub Pages can't send headers, so it goes in a <meta> tag, and only in builds: the dev
// server needs inline scripts for hot reload.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

const contentSecurityPolicy = {
  name: 'content-security-policy',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset paths work both at a domain root (Render) and under /PortfolioWebsite/ (GitHub Pages).
  base: './',
  plugins: [react(), contentSecurityPolicy],
  css:{
    modules:{
      localsConvention:"camelCase"
    }
  }
});
