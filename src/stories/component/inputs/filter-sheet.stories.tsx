import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { FilterSheet } from '@/components/ui/filter-sheet'
import { FilterTags } from '@/components/ui/filter-tags'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Component/Inputs/Filter Sheet',
  component: FilterSheet,
  tags: ['autodocs'],
  globals: { viewport: { value: 'mobile' } },
  parameters: {
    docs: {
      description: {
        component:
          '여러 조건을 모아 한 번에 조회하는 시트다. 768px 미만은 아래에서, 그 이상은 오른쪽에서 열린다. `조회`로 확정하고, 조회 없이 닫으면 입력을 버리며, `초기화`는 입력만 비운다. 명세는 `design/components/filter-sheet.md`.',
      },
    },
  },
  args: { activeCount: 0, children: null, onApply: () => {} },
} satisfies Meta<typeof FilterSheet>

export default meta
type Story = StoryObj<typeof meta>

function OrderFilter() {
  const [applied, setApplied] = useState('')
  const [draft, setDraft] = useState('')
  return (
    <div className="flex flex-col gap-3">
      <FilterSheet
        activeCount={applied ? 1 : 0}
        description="주문번호로 좁혀요."
        onApply={() => setApplied(draft)}
        onReset={() => setDraft('')}
        onDismiss={() => setDraft(applied)}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="story-order">주문번호</Label>
          <Input id="story-order" value={draft} onChange={(e) => setDraft(e.target.value)} />
        </div>
      </FilterSheet>
      <FilterTags
        items={applied ? [{ key: 'order', label: '주문번호', value: applied }] : []}
        onRemove={() => {
          setApplied('')
          setDraft('')
        }}
      />
    </div>
  )
}

const openSheet = async (canvasElement: HTMLElement) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: /^조회 조건/ }))
  return within(await within(document.body).findByRole('dialog'))
}

// 닫힘 모션이 끝나야 시트가 DOM에서 빠지고 배경의 aria-hidden이 풀린다
const closed = () => waitFor(() => expect(within(document.body).queryByRole('dialog', { hidden: true })).not.toBeInTheDocument(), { timeout: 3000 })

export const Default: Story = {
  render: () => <OrderFilter />,
  play: async ({ canvasElement }) => {
    const sheet = await openSheet(canvasElement)
    await userEvent.type(sheet.getByLabelText('주문번호'), 'A-100')
    await userEvent.click(sheet.getByRole('button', { name: '조회' }))
    await closed()
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: '조회 조건 — 1개 적용됨' })).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: '주문번호: A-100 조건 지우기' })).toBeInTheDocument()
  },
}

export const EnterApplies: Story = {
  render: () => <OrderFilter />,
  play: async ({ canvasElement }) => {
    const sheet = await openSheet(canvasElement)
    await userEvent.type(sheet.getByLabelText('주문번호'), 'A-100{Enter}')
    await closed()
    await expect(within(canvasElement).getByRole('button', { name: '조회 조건 — 1개 적용됨' })).toBeInTheDocument()
  },
}

export const ResetClearsInputOnly: Story = {
  render: () => <OrderFilter />,
  play: async ({ canvasElement }) => {
    let sheet = await openSheet(canvasElement)
    await userEvent.type(sheet.getByLabelText('주문번호'), 'A-100')
    await userEvent.click(sheet.getByRole('button', { name: '조회' }))
    await closed()

    sheet = await openSheet(canvasElement)
    await userEvent.click(sheet.getByRole('button', { name: '초기화' }))
    await expect(sheet.getByLabelText('주문번호')).toHaveValue('')
    await expect(within(canvasElement).queryByRole('button', { name: '주문번호: A-100 조건 지우기', hidden: true })).toBeInTheDocument()
  },
}

export const DismissDiscardsInput: Story = {
  render: () => <OrderFilter />,
  play: async ({ canvasElement }) => {
    let sheet = await openSheet(canvasElement)
    await userEvent.type(sheet.getByLabelText('주문번호'), 'A-100')
    await userEvent.keyboard('{Escape}')
    await closed()
    await expect(within(canvasElement).getByRole('button', { name: '조회 조건' })).toBeInTheDocument()

    sheet = await openSheet(canvasElement)
    await expect(sheet.getByLabelText('주문번호')).toHaveValue('')
    await userEvent.keyboard('{Escape}')
    await closed()
  },
}
