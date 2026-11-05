import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusIcon } from 'lucide-react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'Component/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 실행할 행동을 나타낸다. 명세는 `design/components/button.md`. shadcn 원본 그대로이며 색만 대웅 토큰(`--primary` = `bg-brand-solid` 등)에 연결돼 있다.',
      },
    },
  },
  args: { children: '저장', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] },
    size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '저장' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Button {...args}>기본(brand)</Button>
      <Button {...args} variant="secondary">보조</Button>
      <Button {...args} variant="destructive">삭제</Button>
      <Button {...args} variant="outline">테두리</Button>
      <Button {...args} variant="ghost">고스트</Button>
      <Button {...args} variant="link">링크</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} size="xs">xs</Button>
      <Button {...args} size="sm">sm</Button>
      <Button {...args}>default</Button>
      <Button {...args} size="lg">lg</Button>
      <Button {...args} size="icon" aria-label="추가">
        <PlusIcon />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon /> 추가
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Spinner /> 저장 중
      </>
    ),
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '저장' })
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
