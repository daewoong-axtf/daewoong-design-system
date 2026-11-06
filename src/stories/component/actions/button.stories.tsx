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
    variant: { control: 'select', options: ['default', 'brand-secondary', 'brand-tertiary', 'secondary', 'destructive', 'outline', 'ghost', 'link'] },
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

/** 대표 행동은 오렌지 하나로 두고, 상황에 따라 차콜과 틸을 쓴다. 쓰임은 `button.md`의 위계 표를 따른다. */
export const BrandHierarchy: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Button {...args}>저장</Button>
      <Button {...args} variant="brand-secondary">임시 저장</Button>
      <Button {...args} variant="brand-tertiary">자세히 보기</Button>
      <Button {...args} variant="secondary">취소</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    await expect(getComputedStyle(canvas.getByRole('button', { name: '임시 저장' })).backgroundColor).toBe(token('--dw-bg-brand-secondary-solid'))
    await expect(getComputedStyle(canvas.getByRole('button', { name: '자세히 보기' })).backgroundColor).toBe(token('--dw-bg-brand-tertiary-solid'))
  },
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
