import { defineConfig } from 'vitest/config'
import tsconfgPath from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfgPath()]
})