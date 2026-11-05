import type { Meta, StoryObj } from '@storybook/react-vite'

import { StatusBadge } from '@/components/ui/status-badge'

const meta = {
  title: 'Component/Display/Status Badge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '대상의 현재 상태나 역할을 표·목록 안에서 보여 준다. 분류·꼬리표는 Badge를 쓴다. 명세는 `design/components/status-badge.md`.',
      },
    },
  },
  args: { tone: 'positive', dot: true, children: '활성' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'brand', 'informative', 'positive', 'warning', 'critical'],
    },
  },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** 바뀌는 상태는 점을 둔다. */
export const Tones: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <StatusBadge tone='neutral'>비활성</StatusBadge>
      <StatusBadge tone='brand'>신규</StatusBadge>
      <StatusBadge tone='informative'>배송 중</StatusBadge>
      <StatusBadge tone='positive'>활성</StatusBadge>
      <StatusBadge tone='warning'>대기</StatusBadge>
      <StatusBadge tone='critical'>중지</StatusBadge>
    </div>
  ),
}

/** 고정된 역할은 점을 뺀다. 권한이 높을수록 brand에 가깝게 둔다. */
export const Roles: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <StatusBadge tone='neutral' dot={false}>일반 회원</StatusBadge>
      <StatusBadge tone='informative' dot={false}>담당자</StatusBadge>
      <StatusBadge tone='warning' dot={false}>팀장</StatusBadge>
      <StatusBadge tone='brand' dot={false}>관리자</StatusBadge>
    </div>
  ),
}

/** 부모보다 길면 말줄임한다. */
export const Truncated: Story = {
  render: () => (
    <div className='w-32'>
      <StatusBadge tone='warning'>승인을 기다리는 긴 상태 이름</StatusBadge>
    </div>
  ),
}
