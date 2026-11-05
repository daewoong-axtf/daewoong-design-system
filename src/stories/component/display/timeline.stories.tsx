import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Timeline, TimelineItem } from '@/components/ui/timeline'

const meta = {
  title: 'Component/Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '시간순으로 일어나는 일을 세로로 보여 준다. 진행 중인 항목은 점과 제목이 강조된다. 명세는 `design/components/timeline.md`.',
      },
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Timeline className="max-w-80">
      <TimelineItem time="10:00" title="주문 접수" description="온라인 주문" />
      <TimelineItem time="13:00" title="상품 포장" description="서울 물류센터" active />
      <TimelineItem time="18:00" title="배송 출발" />
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const items = within(canvasElement).getAllByRole('listitem')
    await expect(items).toHaveLength(3)
    await expect(items[1]).toHaveAttribute('aria-current', 'true')
    await expect(items[0]).not.toHaveAttribute('aria-current')
  },
}

/** 시간 칸은 가장 긴 문구에 맞춘다 */
export const LongTime: Story = {
  render: () => (
    <Timeline className="max-w-80">
      <TimelineItem time="오전 10:30" title="문서 작성" />
      <TimelineItem time="오후 2:00" title="검토 요청" description="긴 설명은 내용 칸 안에서 줄을 바꾸고 시간 칸 폭은 그대로 둔다." />
    </Timeline>
  ),
}
