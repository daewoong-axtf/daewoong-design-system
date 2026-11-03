import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Component/Feedback/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '진행 전에 결정을 받는 작은 모달이다. 버튼으로만 닫히고 바깥을 눌러도 닫히지 않는다. 명세는 `design/components/alert-dialog.md`.',
      },
    },
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">게시글 삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>삭제하면 되돌릴 수 없어요.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction variant="destructive">삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '게시글 삭제' }))
    const body = within(document.body)
    await expect(await body.findByRole('alertdialog')).toBeInTheDocument()
    await expect(body.getByRole('button', { name: '취소' })).toHaveFocus()
    await userEvent.click(body.getByRole('button', { name: '취소' }))
    await waitFor(() => expect(body.queryByRole('alertdialog')).not.toBeInTheDocument())
  },
}
