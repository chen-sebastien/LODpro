import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: true, // Listen on all local IPs (0.0.0.0) so phone can connect
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
  }
})
