import type { Meta, StoryObj } from '@storybook/react-vite'

import { ListFooter } from '@/components/ui/list-footer'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const meta = {
  title: 'Component/Navigation/List Footer',
  component: ListFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '표·목록 아래에 총 건수와 Pagination을 두는 줄이다. 640px 미만은 건수가 위로 올라간다. 명세는 `design/components/list-footer.md`.',
      },
    },
  },
  args: { total: 248 },
} satisfies Meta<typeof ListFooter>

export default meta
type Story = StoryObj<typeof meta>

const pager = (
  <Pagination aria-label="주문 목록 페이지" className="mx-0 w-auto">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="?page=1" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=1" isActive>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=2">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=10">10</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="?page=2" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)

export const Default: Story = { render: (args) => <ListFooter {...args}>{pager}</ListFooter> }

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
  render: (args) => <ListFooter {...args}>{pager}</ListFooter>,
}

export const People: Story = { args: { total: 36, unit: '명' } }

export const Unknown: Story = { args: { total: null } }
