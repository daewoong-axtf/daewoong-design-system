import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

// 툴바의 테마 선택을 design/tokens.css의 [data-theme]로 넘긴다
const withTheme: Decorator = (Story, context) => {
  document.documentElement.dataset.theme = context.globals.theme
  return <Story />
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: '테마',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: '라이트' },
          { value: 'dark', title: '다크' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Overview',
          'Theme',
          'Updates',
          'Element',
          ['소개', 'Basic', 'Spacing', 'Decorate'],
          'Foundations',
          ['CI', 'Colors', 'Typography', 'Spacing', 'Shape', 'Depth', 'Z-index', 'Motion', 'Interaction', 'Control Height', 'Breakpoints', 'Grid'],
          'Component',
          ['Actions', 'Inputs', 'Feedback', 'Display', 'Navigation', 'State'],
          'Patterns',
        ],
      },
    },
    controls: { expanded: true },
    a11y: { test: 'error' },
    viewport: {
      options: {
        mobile: { name: '모바일 375', styles: { width: '375px', height: '812px' } },
        tablet: { name: '태블릿 768', styles: { width: '768px', height: '1024px' } },
        desktop: { name: '데스크톱 1280', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
}

export default preview
