import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleAlertIcon, InfoIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const meta = {
  title: 'Component/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '화면 안에 고정으로 놓이는 안내 상자다. 명세는 `design/components/callout.md`(Callout). shadcn 원본은 default·destructive 두 변형만 있고, 명세의 informative·positive·warning 톤은 아직 없다.',
      },
    },
  },
  args: { className: 'max-w-lg' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon />
      <AlertTitle>점검 안내</AlertTitle>
      <AlertDescription>11월 5일 02:00–04:00에는 접속할 수 없습니다.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <CircleAlertIcon />
      <AlertTitle>불러오지 못했어요</AlertTitle>
      <AlertDescription>네트워크 연결을 확인한 뒤 다시 시도하세요.</AlertDescription>
    </Alert>
  ),
}
