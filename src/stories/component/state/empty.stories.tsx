import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleAlertIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

const meta = {
  title: 'Component/State/Empty State',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '보여줄 데이터가 없을 때 그 자리를 채우고 다음 행동을 안내한다. 명세는 `design/components/empty-state.md`.',
      },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const NoResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>검색 결과가 없어요</EmptyTitle>
        <EmptyDescription>다른 검색어를 입력해 보세요.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">검색어 지우기</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const LoadError: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlertIcon className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>불러오지 못했어요</EmptyTitle>
        <EmptyDescription>잠시 후 다시 시도하세요.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>다시 시도</Button>
      </EmptyContent>
    </Empty>
  ),
}
