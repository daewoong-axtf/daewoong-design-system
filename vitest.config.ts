import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Storybook 스토리의 play 함수를 실제 브라우저(Chromium)에서 돌린다 — pnpm test:storybook
export default defineConfig({
  plugins: [tailwindcss(), storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    name: 'storybook',
    setupFiles: ['./.storybook/vitest.setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
