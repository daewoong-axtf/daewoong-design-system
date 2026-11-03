import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const meta = {
  title: 'Component/Feedback/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '방금 한 행동의 결과를 잠깐 알린다. 명세는 `design/components/toast.md`. shadcn은 sonner를 쓴다 — 앱 루트에 `<Toaster />` 하나를 두고 `toast()`로 띄운다.',
      },
    },
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast('임시 저장했습니다')}>
          기본
        </Button>
        <Button variant="outline" onClick={() => toast.success('저장했습니다')}>
          성공
        </Button>
        <Button variant="outline" onClick={() => toast.error('저장하지 못했습니다')}>
          실패
        </Button>
        <Button
          variant="outline"
          onClick={() => toast('삭제했습니다', { action: { label: '실행 취소', onClick: () => {} } })}
        >
          행동 포함
        </Button>
      </div>
    </>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '성공' }))
    await expect(await within(document.body).findByText('저장했습니다')).toBeInTheDocument()
  },
}
