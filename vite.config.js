import { defineConfig } from 'vite'

export default defineConfig({
  // 這裡設定為 './' 確保在 GitHub Pages 的子目錄也能正確運作
  base: './',
  build: {
    outDir: 'dist',
  }
})
