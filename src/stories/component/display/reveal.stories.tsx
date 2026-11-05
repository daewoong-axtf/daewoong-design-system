import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'

const meta = {
  title: 'Component/Display/Reveal',
  component: Reveal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '화면 아래에 있던 내용이 스크롤로 들어올 때 떠오르며 나타난다. 스크립트가 없거나 `prefers-reduced-motion`이면 처음부터 그대로 보인다. 명세는 `design/components/reveal.md`.',
      },
    },
  },
  args: { children: null },
} satisfies Meta<typeof Reveal>

export default meta
type Story = StoryObj<typeof meta>

function Block({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

/** 처음 화면 안의 내용은 숨기지 않는다. */
export const InView: Story = {
  args: { children: <Block>처음부터 보여요</Block> },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('[data-slot="reveal"]')
    await expect(el).not.toHaveAttribute('data-reveal')
    await expect(within(canvasElement).getByText('처음부터 보여요')).toBeVisible()
  },
}

/** 뷰포트 아래 요소는 숨겼다가 스크롤로 들어오면 나타난다. */
export const OnScroll: Story = {
  render: () => (
    <div>
      <div style={{ height: '200vh' }}>아래로 스크롤해 보세요</div>
      <Reveal>
        <Block>스크롤로 들어오면 나타나요</Block>
      </Reveal>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector<HTMLElement>('[data-slot="reveal"]')
    if (!el) throw new Error('Reveal을 찾지 못했다')
    await waitFor(() => expect(el).toHaveAttribute('data-reveal', 'hidden'))
    // 스크린리더가 읽을 수 있게 opacity로만 숨긴다
    await expect(within(canvasElement).getByText('스크롤로 들어오면 나타나요')).toBeInTheDocument()
    el.scrollIntoView()
    await waitFor(() => expect(el).not.toHaveAttribute('data-reveal'))
    await waitFor(() => expect(getComputedStyle(el).opacity).toBe('1'))
    window.scrollTo(0, 0)
  },
}

/** delay로 순차 등장시킨다. */
export const Stagger: Story = {
  render: () => (
    <div>
      <div style={{ height: '120vh' }}>아래로 스크롤해 보세요</div>
      <div className='grid gap-3 sm:grid-cols-3'>
        {[0, 80, 160].map((delay) => (
          <Reveal key={delay} delay={delay}>
            <Block>{delay}ms</Block>
          </Reveal>
        ))}
      </div>
    </div>
  ),
}
