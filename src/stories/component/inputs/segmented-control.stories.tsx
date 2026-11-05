import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const ROOT = 'relative inline-grid w-fit auto-cols-fr grid-flow-col items-stretch gap-0 rounded-full bg-(--dw-bg-neutral-weak-alpha) p-1'

const INDICATOR = cn(
  'absolute inset-y-1 left-1 rounded-full bg-(--dw-gray-00)',
  'shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-muted),var(--dw-shadow-s1)]',
  'transition-transform duration-(--dw-duration-d4) ease-(--dw-easing-easing) motion-reduce:transition-none',
)

const ITEM = cn(
  'relative z-1 h-auto min-h-[34px] min-w-[86px] gap-1.5 rounded-full px-6 py-1.5',
  'text-(length:--dw-font-t5-size) leading-(--dw-font-t5-line-height) font-bold text-(--dw-fg-neutral-subtle)',
  'transition-[color,background-color,scale] duration-(--dw-duration-color-transition) ease-(--dw-easing-easing)',
  'hover:bg-(--dw-bg-neutral-weak-pressed) hover:text-(--dw-fg-neutral-subtle)',
  'data-[state=on]:bg-transparent data-[state=on]:text-(--dw-fg-neutral)',
  'data-[state=on]:hover:bg-(--dw-gray-100) data-[state=on]:hover:text-(--dw-fg-neutral) data-[state=on]:hover:shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-muted)]',
  'active:scale-(--dw-scale-s95)',
  'disabled:text-(--dw-fg-disabled) disabled:opacity-100',
  'data-[state=on]:disabled:bg-(--dw-bg-disabled) data-[state=on]:disabled:text-(--dw-fg-disabled) data-[state=on]:disabled:shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-muted)]',
  'focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dw-stroke-focus-ring) focus-visible:outline-solid',
)

interface SegmentedItem {
  value: string
  label: string
  disabled?: boolean
}

interface SegmentedControlProps {
  /** 2–5개의 보기다. */
  items: SegmentedItem[]
  /** 처음 선택할 보기다. 없으면 첫 보기다. */
  defaultValue?: string
  /** 그룹 이름이다. */
  'aria-label': string
  /** 모바일 상단 전환처럼 폭을 꽉 채운다. */
  fullWidth?: boolean
  onValueChange?: (value: string) => void
}

/** toggle-group(type="single") 위에 명세의 트랙·Indicator 모양을 입힌다. */
function SegmentedControl({ items, defaultValue = items[0]?.value, fullWidth, onValueChange, ...props }: SegmentedControlProps) {
  const [value, setValue] = useState(defaultValue)
  const index = items.findIndex((item) => item.value === value)

  // 선택한 칸을 다시 누르면 toggle-group이 빈 값을 보낸다. 보기는 항상 하나가 골라져 있어야 해서 무시한다.
  const select = (next: string) => {
    if (!next || next === value) return
    setValue(next)
    onValueChange?.(next)
  }

  return (
    // spacing=0이면 toggle-group이 칸 모서리를 직각으로 바꾼다. 1로 두고 간격은 ROOT의 gap-0으로 없앤다.
    <ToggleGroup type="single" spacing={1} value={value} onValueChange={select} className={cn(ROOT, fullWidth && 'grid w-full')} {...props}>
      <span
        aria-hidden="true"
        data-slot="segmented-indicator"
        className={INDICATOR}
        style={{
          width: `calc((100% - 2 * var(--dw-spacing-x1)) / ${items.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {items.map((item) => (
        // 화살표는 포커스만 옮기므로, 명세대로 포커스가 닿은 칸을 바로 고른다
        <ToggleGroupItem key={item.value} value={item.value} disabled={item.disabled} onFocus={() => select(item.value)} className={ITEM}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

const VIEWS: SegmentedItem[] = [
  { value: 'list', label: '목록' },
  { value: 'map', label: '지도' },
]

const meta = {
  title: 'Component/Inputs/Segmented Control',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '2–5개의 보기 중 하나를 골라 같은 화면의 보기 방식을 바로 바꾼다. 명세는 `design/components/segmented-control.md`. shadcn `toggle-group`의 `type="single"`을 쓰고, 트랙과 미끄러지는 Indicator는 이 스토리에서 토큰으로 입힌다.',
      },
    },
  },
  args: { items: VIEWS, 'aria-label': '보기 방식', onValueChange: fn() },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const list = canvas.getByRole('radio', { name: '목록' })
    const map = canvas.getByRole('radio', { name: '지도' })
    await expect(canvas.getByRole('radiogroup', { name: '보기 방식' })).toBeInTheDocument()
    await expect(list).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(map)
    await expect(map).toHaveAttribute('aria-checked', 'true')
    await expect(list).toHaveAttribute('aria-checked', 'false')
    await expect(args.onValueChange).toHaveBeenLastCalledWith('map')
    const indicator = canvasElement.querySelector<HTMLElement>('[data-slot="segmented-indicator"]')
    await expect(indicator?.style.transform).toBe('translateX(100%)')

    // 선택한 칸을 다시 눌러도 선택이 풀리지 않는다
    await userEvent.click(map)
    await expect(map).toHaveAttribute('aria-checked', 'true')

    // 화살표는 제출 없이 바로 선택을 바꾼다
    await userEvent.keyboard('{ArrowLeft}')
    await waitFor(() => expect(list).toHaveAttribute('aria-checked', 'true'))
    await expect(args.onValueChange).toHaveBeenLastCalledWith('list')
  },
}

/** 칸 수가 늘어도 칸 너비는 균등하다. */
export const ItemCounts: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl aria-label="기간" items={[{ value: 'week', label: '주' }, { value: 'month', label: '월' }]} />
      <SegmentedControl
        aria-label="정렬"
        items={[
          { value: 'new', label: '최신' },
          { value: 'name', label: '이름' },
          { value: 'view', label: '조회' },
        ]}
      />
      <SegmentedControl
        aria-label="주기"
        items={[
          { value: 'day', label: '일' },
          { value: 'week', label: '주' },
          { value: 'month', label: '월' },
          { value: 'year', label: '연' },
        ]}
      />
      <SegmentedControl
        aria-label="상태"
        items={[
          { value: 'all', label: '전체' },
          { value: 'new', label: '신규' },
          { value: 'wait', label: '대기' },
          { value: 'done', label: '완료' },
          { value: 'hold', label: '보류' },
        ]}
      />
    </div>
  ),
}

/** 항목별로 끌 수 있다. 위는 선택되지 않은 칸, 아래는 선택된 칸이 꺼진 모습이다. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl
        aria-label="보기 방식"
        items={[
          { value: 'list', label: '목록' },
          { value: 'map', label: '지도', disabled: true },
          { value: 'card', label: '카드' },
        ]}
      />
      <SegmentedControl
        aria-label="잠긴 보기"
        items={[
          { value: 'list', label: '목록', disabled: true },
          { value: 'map', label: '지도', disabled: true },
        ]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const group = within(within(canvasElement).getByRole('radiogroup', { name: '보기 방식' }))
    const map = group.getByRole('radio', { name: '지도' })
    await expect(map).toBeDisabled()
    await userEvent.click(map, { pointerEventsCheck: 0 })
    await expect(group.getByRole('radio', { name: '목록' })).toHaveAttribute('aria-checked', 'true')
  },
}

/** 모바일 상단 전환은 폭을 꽉 채운다. */
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
  globals: { viewport: { value: 'mobile' } },
}
