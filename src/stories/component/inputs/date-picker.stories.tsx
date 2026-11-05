import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { DatePicker } from '@/components/ui/date-picker'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Component/Inputs/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  args: { value: '', onChange: fn() },
  parameters: {
    docs: {
      description: {
        component: '입력 칸을 눌러 달력에서 날짜 하나를 고른다. 값은 yyyy-MM-dd, 표기는 "2026년 5월 20일 (수)"다. 명세는 `design/components/date-picker.md`.',
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ initial = '', ...props }: Partial<React.ComponentProps<typeof DatePicker>> & { initial?: string }) {
  const [date, setDate] = useState(initial)
  return (
    <div className='grid w-64 gap-2'>
      <Label htmlFor='ship-date'>배송 희망일</Label>
      <DatePicker id='ship-date' value={date} onChange={setDate} {...props} />
    </div>
  )
}

/** 값이 없으면 안내 문구가 보이고, 달력에서 고르면 그 날짜가 들어간다 */
export const Default: Story = {
  render: () => <Demo initial='2026-05-20' />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByLabelText('배송 희망일')
    await expect(trigger).toHaveTextContent('2026년 5월 20일 (수)')
    await userEvent.click(trigger)
    const grid = await body.findByRole('grid')
    await userEvent.click(within(grid).getByRole('button', { name: /2026년 5월 21일/ }))
    await waitFor(() => expect(trigger).toHaveTextContent('2026년 5월 21일 (목)'))
  },
}

export const Empty: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText('배송 희망일')).toHaveTextContent('날짜 선택')
  },
}

/** `min` 이전 날짜는 고를 수 없다 */
export const WithMin: Story = {
  render: () => <Demo initial='2026-05-20' min='2026-05-13' />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByLabelText('배송 희망일'))
    const grid = await within(document.body).findByRole('grid')
    await expect(within(grid).getByRole('button', { name: /2026년 5월 12일/ })).toBeDisabled()
  },
}

/** 지우기 — 필터처럼 비워서 전체로 되돌린다 */
export const Clearable: Story = {
  render: () => <Demo initial='2026-05-20' clearable placeholder='전체' />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '날짜 지우기' }))
    await expect(canvas.getByLabelText('배송 희망일')).toHaveTextContent('전체')
  },
}

export const Disabled: Story = { render: () => <Demo initial='2026-05-20' disabled /> }

function DialogDemo() {
  const [date, setDate] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>배송일 바꾸기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>배송일 바꾸기</DialogTitle>
          <DialogDescription>받을 날짜를 고르세요.</DialogDescription>
        </DialogHeader>
        <Label htmlFor='modal-date'>배송 희망일</Label>
        <DatePicker id='modal-date' value={date} onChange={setDate} />
        <output data-testid='picked'>{date}</output>
      </DialogContent>
    </Dialog>
  )
}

/** 모달 안 — 달력은 Portal이라 잘리지 않고 눌린다 */
export const InDialog: Story = {
  render: () => <DialogDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    await userEvent.click(within(canvasElement).getByRole('button', { name: '배송일 바꾸기' }))
    await userEvent.click(await body.findByLabelText('배송 희망일'))
    const grid = await body.findByRole('grid')
    await userEvent.click(within(grid).getByRole('button', { name: /15일/ }))
    await waitFor(() => expect(body.getByTestId('picked').textContent).toMatch(/-15$/))
  },
}
