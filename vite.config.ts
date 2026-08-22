import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

import compression from 'vite-plugin-compression2'

// Dedupe + alias React (and friends) so Vite never bundles two copies.
// shared/ is OUTSIDE this project root and ships its own node_modules with
// react/react-router-dom/lucide-react. Without this, the dev server and prod
// build embed a second React instance and hooks fail with "Invalid hook call".
export default defineConfig({
  plugins: [react(), tailwindcss(), compression({ algorithms: ['brotliCompress'], threshold: 1024 })],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
            if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'ui-vendor'
          }
          // NOTE: locales are now per-language lazy chunks (copy.<lang>.ts via
          // dynamic import in src/locales/copy.ts) — do NOT force them into a
          // single 'locales' chunk here, that would re-bundle all 11 languages.
          return undefined
        },
      },
    },
  },
})
