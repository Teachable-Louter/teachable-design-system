import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@tokens': resolve(__dirname, 'src/tokens'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@foundation': resolve(__dirname, 'src/foundation'),
      '@style': resolve(__dirname, 'src/style'),
      '@types': resolve(__dirname, 'src/types')
    }
  }
})