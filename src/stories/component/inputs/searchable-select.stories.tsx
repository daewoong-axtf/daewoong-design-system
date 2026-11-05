import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Label } from '@/components/ui/label'
import { SearchableSelect } from '@/components/ui/searchable-select'

const VENDORS = ['한빛상사', '한빛물류', '한강유통', '누리식품', '다온제과', '마루가구']

const meta = {
  title: 'Component/Inputs/Searchable Select',
  component: SearchableSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '보기가 많은 드롭다운을 글자로 좁혀 고른다. 목록에서 골라야 값이 바뀌고, 비어 있으면 전체다. 명세는 `design/components/searchable-select.md`.',
      },
    },
  },
  args: { label: '거래처', options: VENDORS, value: '', onValueChange: fn() },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <div className='flex w-72 flex-col gap-2'>
        <Label htmlFor='vendor'>{args.label}</Label>
        <SearchableSelect
          {...args}
          id='vendor'
          value={value}
          onValueChange={(v) => {
            setValue(v)
            args.onValueChange(v)
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof SearchableSelect>

export default meta
type Story = StoryObj<typeof meta>

/** 글자를 치면 그 글자가 들어간 보기만 남고, 골라야 값이 된다 */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const body = within(document.body)
    const input = within(canvasElement).getByLabelText('거래처')
    await expect(input).toHaveAttribute('placeholder', '전체')
    await userEvent.type(input, '한빛')
    const options = await body.findAllByRole('option')
    await expect(options.map((o) => o.textContent)).toEqual(['한빛상사', '한빛물류'])
    await userEvent.click(body.getByRole('option', { name: '한빛물류' }))
    await expect(args.onValueChange).toHaveBeenLastCalledWith('한빛물류')
    await expect(input).toHaveValue('한빛물류')
  },
}

/** 값이 있으면 지우기로 전체로 돌린다 */
export const Selected: Story = {
  args: { value: '누리식품' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '거래처 지우기' }))
    await expect(args.onValueChange).toHaveBeenLastCalledWith('')
    await expect(canvas.getByLabelText('거래처')).toHaveValue('')
  },
}

/** 맞는 보기가 없으면 안내가 보인다 */
export const NoResult: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.type(within(canvasElement).getByLabelText('거래처'), '없는 거래처')
    await expect(await within(document.body).findByText('검색 결과가 없어요')).toBeInTheDocument()
  },
}
