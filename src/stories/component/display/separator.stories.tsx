import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Component/Display/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '내용 묶음 사이를 가르는 선이다. 명세는 `design/components/divider.md`(Divider).',
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm font-medium">계정 설정</p>
      <p className="text-sm text-muted-foreground">이름·연락처를 관리합니다.</p>
      <Separator className="my-4" />
      <div className="flex h-4 items-center gap-2 text-sm">
        <span>수정</span>
        <Separator orientation="vertical" />
        <span>삭제</span>
      </div>
    </div>
  ),
}
