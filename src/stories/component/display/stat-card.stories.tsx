import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

import { StatCard } from '@/components/ui/stat-card'

const meta = {
  title: 'Component/Display/Stat Card',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대시보드 지표 한 칸이다. 증감은 색과 함께 아이콘·부호로 알린다. 명세는 `design/components/stat-card.md`.',
      },
    },
  },
  args: { label: '신규 회원', value: '1,284명', delta: 12, hint: '지난달 대비', className: 'max-w-xs' },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: <UserIcon aria-hidden /> },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('증가')).toBeInTheDocument()
    await expect(canvasElement).toHaveTextContent('+12%')
  },
}

export const Decrease: Story = {
  args: { label: '주문 금액', value: '3,920만원', delta: -4.2 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('감소')).toBeInTheDocument()
    await expect(canvasElement).toHaveTextContent('-4.2%')
  },
}

export const NoChange: Story = {
  args: { label: '평균 배송일', value: '2.1일', delta: 0 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('변동 없음')).toBeInTheDocument()
    await expect(canvasElement).toHaveTextContent('0%')
  },
}

/** 줄수록 좋은 지표는 음수에 `positive`를 준다 */
export const LowerIsBetter: Story = { args: { label: '반품 건수', value: '36개', delta: -8, deltaTone: 'positive' } }

export const ValueOnly: Story = { args: { delta: undefined, hint: undefined } }

export const Grid: Story = {
  args: { className: undefined },
  render: (args) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard {...args} />
      <StatCard {...args} label="주문 금액" value="3,920만원" delta={-4.2} />
      <StatCard {...args} label="평균 배송일" value="2.1일" delta={0} />
    </div>
  ),
}
