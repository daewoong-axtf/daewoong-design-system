import type { Meta, StoryObj } from '@storybook/react-vite'
import { EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from 'lucide-react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const handleEdit = fn()

const meta = {
  title: 'Component/Feedback/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '버튼을 누르면 행동 목록을 띄운다. 명세는 `design/components/dropdown-menu.md`. 파괴적 행동은 마지막 묶음에 두고 Alert Dialog로 확인한다.',
      },
    },
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="더 보기">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>게시글</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleEdit}>
            <PencilIcon /> 수정
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2Icon /> 공유
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon /> 삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: '더 보기' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    const body = within(document.body)
    await expect(await body.findByRole('menu')).toBeInTheDocument()
    await userEvent.keyboard('{Enter}')
    await expect(handleEdit).toHaveBeenCalled()
    await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}

/** 체크 항목은 메뉴가 열린 채로 켜고 끈다 */
export const CheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">보이는 열</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem defaultChecked onSelect={(e) => e.preventDefault()}>
          이름
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>등록일</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
