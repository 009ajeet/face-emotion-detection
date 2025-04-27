import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you're using

export default defineConfig({
  plugins: [react()],
  base: '/face-emotion-detection/', // Match your repository name
  build: {
    outDir: 'dist',
  }
})