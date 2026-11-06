import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleCheckIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Component/Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '상태·분류를 짧게 표시하는 작은 라벨이다. 명세는 `design/components/badge.md`. shadcn 원본은 tone(informative·positive·warning) 변형이 없다.',
      },
    },
  },
  args: { children: '진행 중' },
  argTypes: { variant: { control: 'select', options: ['default', 'brand-secondary', 'secondary', 'destructive', 'outline', 'ghost', 'link'] } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>신규</Badge>
      <Badge variant="brand-secondary">공지</Badge>
      <Badge variant="secondary">대기</Badge>
      <Badge variant="destructive">반려</Badge>
      <Badge variant="outline">초안</Badge>
      <Badge variant="secondary">
        <CircleCheckIcon /> 승인
      </Badge>
    </div>
  ),
}
