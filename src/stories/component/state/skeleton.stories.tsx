import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '@/components/ui/skeleton'

const meta = {
  title: 'Component/State/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '불러오는 동안 실제 콘텐츠 모양 그대로 회색 자리를 보여준다. 명세는 `design/components/skeleton.md`. shadcn 원본은 반짝이는 띠 대신 깜빡임(`animate-pulse`)이다.',
      },
    },
  },
  args: { className: 'h-5 w-48' },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ListRow: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-3" role="status" aria-busy="true" aria-label="불러오는 중">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-[19px] w-full" />
        <Skeleton className="h-[19px] w-3/5" />
      </div>
    </div>
  ),
}
