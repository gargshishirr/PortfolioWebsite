import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset paths work both at a domain root (Render) and under /PortfolioWebsite/ (GitHub Pages).
  base: './',
  plugins: [react()],
  css:{
    modules:{
      localsConvention:"camelCase"
    }
  }
});
