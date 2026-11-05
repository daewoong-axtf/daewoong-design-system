import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { FilterButton } from '@/components/ui/filter-button'

const meta = {
  title: 'Component/Actions/Filter Button',
  component: FilterButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '조회 조건을 여는 라벨 없는 아이콘 버튼이다. 걸린 조건 수를 숫자로 함께 보인다. 명세는 `design/components/filter-button.md`.',
      },
    },
  },
  args: { activeCount: 0, onClick: fn() },
} satisfies Meta<typeof FilterButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '조회 조건' })
    await expect(button.querySelector('[data-count]')).toBeNull()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const WithCount: Story = {
  args: { activeCount: 2 },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '조회 조건 — 2개 적용됨' })
    await expect(button.querySelector('[data-count]')).toHaveAttribute('data-count', '2')
  },
}
