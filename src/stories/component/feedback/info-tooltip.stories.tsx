import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { InfoTooltip } from '@/components/ui/info-tooltip'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Component/Feedback/Info Tooltip',
  component: InfoTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '라벨 옆 안내 아이콘이다. 명세는 `design/components/info-tooltip.md`. Tooltip과 달리 눌러서 여는 Popover라 터치·키보드에서도 같게 동작한다. 항상 읽어야 하는 입력 제약은 필드 설명에 둔다.',
      },
    },
  },
  args: {
    label: '희망 배송일',
    items: ['오후 2시 전에 주문하면 다음 날부터 고를 수 있어요.', '주말과 공휴일에는 배송하지 않아요.'],
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Label>{args.label}</Label>
      <InfoTooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof InfoTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button', { name: '희망 배송일 안내' })
    await userEvent.click(trigger)
    const body = within(document.body)
    for (const item of args.items) await expect(await body.findByText(item)).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByText(args.items[0])).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}

export const KeyboardOpen: Story = {
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button', { name: '희망 배송일 안내' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await expect(await within(document.body).findByText(args.items[0])).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
  },
}

export const SingleLine: Story = {
  args: { label: '정원', items: ['정원은 모집을 시작하기 전까지만 바꿀 수 있어요.'] },
}
