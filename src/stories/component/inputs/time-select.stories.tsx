import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Label } from '@/components/ui/label'
import { TimeSelect } from '@/components/ui/time-select'

/** 09:00~18:00, 30분 간격 — 슬롯은 화면이 정한다 */
const SLOTS = Array.from({ length: 19 }, (_, i) => {
  const minutes = 9 * 60 + i * 30
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
})

const meta = {
  title: 'Component/Inputs/Time Select',
  component: TimeSelect,
  tags: ['autodocs'],
  args: { slots: SLOTS },
  parameters: {
    docs: {
      description: {
        component: '정해진 시간 슬롯에서만 고르는 네이티브 select다. 간격과 범위는 화면이 정한다. 분 단위 자유 입력은 Time Picker를 쓴다. 명세는 `design/components/time-select.md`.',
      },
    },
  },
} satisfies Meta<typeof TimeSelect>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ initial = '14:30' }: { initial?: string }) {
  const [time, setTime] = useState(initial)
  return (
    <div className='grid w-56 gap-2'>
      <Label htmlFor='start-time'>시작 시간</Label>
      <TimeSelect id='start-time' slots={SLOTS} value={time} onChange={(e) => setTime(e.target.value)} />
    </div>
  )
}

/** 슬롯만 고를 수 있다 */
export const Default: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText<HTMLSelectElement>('시작 시간')
    const values = [...select.options].map((o) => o.value)
    await expect(values).toContain('14:30')
    await expect(values).not.toContain('14:15')
    await expect(values).not.toContain('')
    await userEvent.selectOptions(select, '09:30')
    await expect(select).toHaveValue('09:30')
  },
}

/** 아직 고르지 않았으면 비활성 '--:--'가 보이고, 고른 뒤에는 사라진다 */
export const Unset: Story = {
  render: () => <Demo initial='' />,
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText<HTMLSelectElement>('시작 시간')
    await expect(select.options[0]).toBeDisabled()
    await userEvent.selectOptions(select, '10:00')
    await expect([...select.options].map((o) => o.value)).not.toContain('')
  },
}

/** 저장된 값이 슬롯 밖이어도 사라지지 않고 맨 앞에 보인다 */
export const OffSlot: Story = {
  render: () => <Demo initial='23:59' />,
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText<HTMLSelectElement>('시작 시간')
    await expect(select.options[0].value).toBe('23:59')
    await expect(select).toHaveValue('23:59')
  },
}

function RangeDemo() {
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('09:30')
  return (
    <div role='group' aria-label='배송 시간' className='flex w-72 items-center gap-2'>
      <TimeSelect aria-label='시작' className='flex-1' slots={SLOTS} value={start} onChange={(e) => setStart(e.target.value)} />
      <span aria-hidden className='text-muted-foreground'>~</span>
      <TimeSelect aria-label='종료' className='flex-1' slots={SLOTS} value={end} onChange={(e) => setEnd(e.target.value)} />
    </div>
  )
}

/** 시작~종료를 '~'로 묶는다 */
export const Range: Story = { render: () => <RangeDemo /> }

export const Disabled: Story = { args: { value: '09:00', disabled: true, 'aria-label': '시작 시간', onChange: () => {} } }
