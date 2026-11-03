import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    // MDX 문서의 마크다운 표를 그리려면 GFM이 필요하다
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: { ...config.resolve?.alias, '@': fileURLToPath(new URL('../src', import.meta.url)) },
    }
    return config
  },
}

export default config
