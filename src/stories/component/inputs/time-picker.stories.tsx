import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Label } from '@/components/ui/label'
import { TimePicker } from '@/components/ui/time-picker'

const meta = {
  title: 'Component/Inputs/Time Picker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '분 단위까지 자유롭게 입력하는 네이티브 시간 칸이다. 정해진 슬롯에서 고를 때는 Time Select를 쓴다. 명세는 `design/components/time-picker.md`.',
      },
    },
  },
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [time, setTime] = useState('09:00')
  return (
    <div className='grid w-56 gap-2'>
      <Label htmlFor='open-time'>영업 시작</Label>
      <TimePicker id='open-time' value={time} onChange={(e) => setTime(e.target.value)} />
    </div>
  )
}

export const Default: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('영업 시작')
    await expect(input).toHaveAttribute('type', 'time')
    await expect(input).toHaveValue('09:00')
    await userEvent.tab()
    await expect(input).toHaveFocus()
  },
}

function RangeDemo() {
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('21:00')
  return (
    <div role='group' aria-label='영업 시간' className='flex w-72 items-center gap-2'>
      <TimePicker aria-label='시작' className='flex-1' value={start} onChange={(e) => setStart(e.target.value)} />
      <span aria-hidden className='text-muted-foreground'>~</span>
      <TimePicker aria-label='종료' className='flex-1' value={end} onChange={(e) => setEnd(e.target.value)} />
    </div>
  )
}

/** 시작~종료를 '~'로 묶는다 */
export const Range: Story = { render: () => <RangeDemo /> }

export const Disabled: Story = { args: { defaultValue: '09:00', disabled: true, 'aria-label': '시작 시간', className: 'w-56' } }
