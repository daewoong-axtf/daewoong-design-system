import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/ui/stepper'

const STEPS = ['장바구니', '배송지', '결제', '완료']

const meta = {
  title: 'Component/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '여러 단계로 나뉜 흐름의 전체 단계와 지금 위치를 보여 준다. 표시 전용이다. 명세는 `design/components/stepper.md`.',
      },
    },
  },
  args: { steps: STEPS, current: 2, 'aria-label': '주문 진행 단계' },
  argTypes: { current: { control: { type: 'range', min: 0, max: 4, step: 1 } } },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** 단계 수와 같은 값이면 모두 완료다. */
export const AllComplete: Story = { args: { current: STEPS.length } }

/** 5단계까지 375px에서 넘치지 않는다. */
export const FiveSteps: Story = {
  args: {
    steps: ['주문 접수', '상품 준비', '배송 시작', '배송 중', '배송 완료'],
    current: 2,
    'aria-label': '배송 진행 단계',
  },
}

function Flow() {
  const [current, setCurrent] = useState(0)
  return (
    <div className='flex flex-col gap-4'>
      <Stepper steps={STEPS} current={current} aria-label='주문 진행 단계' />
      <div>
        <Button onClick={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}>다음</Button>
      </div>
    </div>
  )
}

/** 앞으로 가면 지난 단계가 완료로 바뀌고 현재 표시가 옮겨 간다. */
export const Interactive: Story = {
  render: () => <Flow />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const items = canvas.getAllByRole('listitem')
    await expect(items[0]).toHaveAttribute('aria-current', 'step')
    await userEvent.click(canvas.getByRole('button', { name: '다음' }))
    await expect(items[0]).not.toHaveAttribute('aria-current')
    await expect(items[0]).toHaveTextContent('장바구니 완료')
    await expect(items[1]).toHaveAttribute('aria-current', 'step')
  },
}
