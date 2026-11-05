import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { FilterButton } from '@/components/ui/filter-button'
import { FilterTags } from '@/components/ui/filter-tags'

const conditions = [
  { key: 'status', label: '주문 상태', value: '배송 중' },
  { key: 'method', label: '배송 방법', value: '택배' },
]

const meta = {
  title: 'Component/Inputs/Filter Tags',
  component: FilterTags,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '시트에서 건 조건을 지우기 아이콘이 있는 Chip으로 보이는 줄이다. 누르면 그 조건만 풀린다. 명세는 `design/components/filter-tags.md`.',
      },
    },
  },
  args: { items: conditions, onRemove: fn() },
} satisfies Meta<typeof FilterTags>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('list', { name: '적용된 조회 조건' })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: '배송 방법: 택배 조건 지우기' }))
    await expect(args.onRemove).toHaveBeenCalledWith('method')
  },
}

export const Empty: Story = {
  args: { items: [] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('list')).not.toBeInTheDocument()
  },
}

export const LongValue: Story = {
  args: { items: [{ key: 'memo', label: '요청 사항', value: '문 앞에 두고 벨은 누르지 말아 주세요. 부재 시 경비실에 맡겨 주세요. 연락은 문자로 부탁드려요.' }] },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

function Removable() {
  const [items, setItems] = useState(conditions)
  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <div className="flex flex-col gap-3">
      <FilterButton ref={buttonRef} activeCount={items.length} className="self-start" />
      <FilterTags items={items} focusAfterEmptyRef={buttonRef} onRemove={(key) => setItems((list) => list.filter((i) => i.key !== key))} />
    </div>
  )
}

export const FocusMoves: Story = {
  render: () => <Removable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '주문 상태: 배송 중 조건 지우기' }))
    const next = canvas.getByRole('button', { name: '배송 방법: 택배 조건 지우기' })
    await waitFor(() => expect(next).toHaveFocus())
    await userEvent.click(next)
    await waitFor(() => expect(canvas.getByRole('button', { name: '조회 조건' })).toHaveFocus())
  },
}
