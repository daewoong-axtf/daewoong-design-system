import type { Meta, StoryObj } from '@storybook/react-vite'
import { type FormEvent, useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'

const meta = {
  title: 'Component/Inputs/Search Input',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '돋보기와 지우기 버튼이 달린 검색 입력이다. 명세는 `design/components/search-input.md`. 타이핑으로 조회하지 않고 Enter·검색 버튼으로 실행한다. 지우기를 `onClear`에 연결하면 바로 전체 조회로 돌아간다.',
      },
    },
  },
  args: { 'aria-label': '주문 검색', placeholder: '주문 번호·회원 이름', value: '', onValueChange: fn() },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

function ListSearch() {
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setQuery(draft)
  }

  return (
    <div className="grid w-80 gap-3">
      <form role="search" onSubmit={handleSubmit} className="flex gap-2">
        <SearchInput aria-label="주문 검색" value={draft} onValueChange={setDraft} onClear={() => setQuery('')} />
        <Button type="submit">검색</Button>
      </form>
      <p role="status" className="text-muted-foreground text-sm">
        {query ? `조회: ${query}` : '조회: 전체'}
      </p>
    </div>
  )
}

export const Default: Story = {
  render: () => <ListSearch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox', { name: '주문 검색' })
    const status = canvas.getByRole('status')
    await expect(canvas.queryByRole('button', { name: '입력 지우기' })).not.toBeInTheDocument()

    await userEvent.type(input, '1105')
    await expect(status).toHaveTextContent('조회: 전체')

    await userEvent.keyboard('{Enter}')
    await expect(status).toHaveTextContent('조회: 1105')

    await userEvent.click(canvas.getByRole('button', { name: '입력 지우기' }))
    await expect(input).toHaveValue('')
    await expect(input).toHaveFocus()
    await expect(status).toHaveTextContent('조회: 전체')
  },
}

export const WithSearchButton: Story = {
  render: () => <ListSearch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('searchbox'), '2026')
    await userEvent.click(canvas.getByRole('button', { name: '검색' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('조회: 2026')
  },
}

export const ClearCallsOnClear: Story = {
  args: { value: '2026-1105', onClear: fn() },
  render: (args) => (
    <div className="w-80">
      <SearchInput {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '입력 지우기' }))
    await expect(args.onValueChange).toHaveBeenCalledWith('')
    await expect(args.onClear).toHaveBeenCalledTimes(1)
  },
}
