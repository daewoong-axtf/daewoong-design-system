import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'

// 외부 이미지 요청 없이 확인할 수 있도록 인라인 SVG를 쓴다
const sampleImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23c7d2e0'/><circle cx='20' cy='16' r='7' fill='%23f5f7fa'/><path d='M6 38c2-8 8-12 14-12s12 4 14 12z' fill='%23f5f7fa'/></svg>"

const meta = {
  title: 'Component/Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '사람을 나타내는 원형 이미지다. 이미지가 없으면 이니셜이나 사람 아이콘을 보인다. 명세는 `design/components/avatar.md`.',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={sampleImage} alt="홍길동" />
      <AvatarFallback>홍</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar>
        <AvatarFallback>홍</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <UserIcon className="size-5" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {['가', '나', '다'].map((n) => (
        <Avatar key={n}>
          <AvatarFallback>{n}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}
