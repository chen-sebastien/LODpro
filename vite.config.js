import { defineConfig } from 'vite'

export default defineConfig({
  // 這裡設定為 './' 確保在 GitHub Pages 的子目錄也能正確運作
  base: './',
  server: {
    allowedHosts: true, // 允許 LocalTunnel 等外部網址連線
  },
  build: {
    outDir: 'dist',
  }
})
