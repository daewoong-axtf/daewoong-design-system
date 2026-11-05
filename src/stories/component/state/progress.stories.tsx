import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const meta = {
  title: 'Component/State/Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-72 max-w-full'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '작업의 진행을 가로 막대로 보여 준다. 작은 자리와 짧은 대기는 Progress Circle을 쓴다. 명세는 `design/components/progress.md`.',
      },
    },
  },
  args: { value: 60, 'aria-label': '파일 올리는 중' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    tone: { control: 'inline-radio', options: ['brand', 'neutral'] },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Determinate: Story = {}

export const Indeterminate: Story = {
  args: { value: undefined, 'aria-label': '불러오는 중' },
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole('progressbar', { name: '불러오는 중' })
    await expect(bar).not.toHaveAttribute('aria-valuenow')
    // 모션을 켜 둔 환경에서는 막대가 실제로 움직여야 한다
    const indicator = bar.firstElementChild as HTMLElement
    await expect(getComputedStyle(indicator).animationIterationCount).toBe('infinite')
    await expect(getComputedStyle(indicator).animationName).not.toBe('none')
  },
}

export const ToneAndSize: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Progress value={60} aria-label='brand medium' />
      <Progress value={60} tone='neutral' aria-label='neutral medium' />
      <Progress value={60} size='small' aria-label='brand small' />
      <Progress value={60} size='small' tone='neutral' aria-label='neutral small' />
    </div>
  ),
}

function Upload() {
  const [value, setValue] = useState(20)
  return (
    <div className='flex flex-col gap-3'>
      <Progress value={value} aria-label='파일 올리는 중' />
      <div>
        <Button onClick={() => setValue((v) => v + 200)}>전송 끝내기</Button>
      </div>
    </div>
  )
}

/** 값이 바뀌면 aria-valuenow도 따라가고 범위 밖 값은 100으로 자른다. */
export const Interactive: Story = {
  render: () => <Upload />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bar = canvas.getByRole('progressbar', { name: '파일 올리는 중' })
    await expect(bar).toHaveAttribute('aria-valuenow', '20')
    await userEvent.click(canvas.getByRole('button', { name: '전송 끝내기' }))
    await expect(bar).toHaveAttribute('aria-valuenow', '100')
  },
}
