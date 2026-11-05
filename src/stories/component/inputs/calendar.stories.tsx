import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { expect, userEvent, within } from 'storybook/test'

import { Calendar } from '@/components/ui/calendar'

const meta = {
  title: 'Component/Inputs/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '화면에 펴 두고 날짜나 기간을 고르는 달력이다. 명세는 `design/components/calendar.md`.',
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function SingleDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 4, 20))
  return (
    <div className='grid gap-2'>
      <Calendar mode='single' selected={date} onSelect={setDate} defaultMonth={new Date(2026, 4, 1)} className='rounded-md border' />
      <output data-testid='picked'>{date?.getDate() ?? ''}</output>
    </div>
  )
}

/** 날짜 하나를 고른다. 방향키로 칸을 옮기고 Enter로 고른다 */
export const Default: Story = {
  render: () => <SingleDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /2026년 5월 21일/ }))
    await expect(canvas.getByTestId('picked')).toHaveTextContent('21')
    await userEvent.keyboard('{ArrowRight}{Enter}')
    await expect(canvas.getByTestId('picked')).toHaveTextContent('22')
    await userEvent.click(canvas.getByRole('button', { name: /다음 달|next/i }))
    await expect(canvas.getByText('2026년 6월')).toBeInTheDocument()
  },
}

function RangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 4, 18), to: new Date(2026, 4, 27) })
  return <Calendar mode='range' selected={range} onSelect={setRange} defaultMonth={new Date(2026, 4, 1)} className='rounded-md border' />
}

/** 시작과 끝을 차례로 고른다 */
export const Range: Story = { render: () => <RangeDemo /> }

function DropdownDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 4, 20))
  return (
    <Calendar
      mode='single'
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 4, 1)}
      captionLayout='dropdown'
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className='rounded-md border'
    />
  )
}

/** 연·월을 드롭다운으로 건너뛴다 */
export const WithDropdown: Story = { render: () => <DropdownDemo /> }

/** 좁은 화면 — 한 칸이 44px이다 */
export const Mobile: Story = {
  render: () => <SingleDemo />,
  globals: { viewport: { value: 'mobile1', isRotated: false } },
}
