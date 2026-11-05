import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { ActionArea } from '@/components/ui/action-area'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Component/Actions/Action Area',
  component: ActionArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '화면의 마지막 행동을 아래쪽에 모은다. 명세는 `design/components/action-area.md`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionArea>

export default meta
type Story = StoryObj<typeof meta>

export const Stacked: Story = {
  args: {
    children: (
      <>
        <Button size="lg">저장</Button>
        <Button size="lg" variant="ghost">
          나중에 하기
        </Button>
      </>
    ),
  },
}

export const Split: Story = {
  args: {
    layout: 'split',
    caption: '저장하면 바로 적용돼요',
    children: (
      <>
        <Button size="lg" variant="secondary">
          취소
        </Button>
        <Button size="lg">저장</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('저장하면 바로 적용돼요')).toBeInTheDocument()
    const save = canvas.getByRole('button', { name: '저장' }).getBoundingClientRect().width
    const cancel = canvas.getByRole('button', { name: '취소' }).getBoundingClientRect().width
    await expect(save).toBeGreaterThan(cancel)
  },
}

export const Sticky: Story = {
  render: () => (
    <div className="h-60 overflow-y-auto rounded-xl border">
      <div className="h-96 p-4 text-sm">내용을 내려도 버튼은 화면 아래에 남는다.</div>
      <ActionArea layout="split" sticky divided>
        <Button size="lg" variant="secondary">
          취소
        </Button>
        <Button size="lg">저장</Button>
      </ActionArea>
    </div>
  ),
}
