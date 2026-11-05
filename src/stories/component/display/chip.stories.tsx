import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon, type LucideIcon, SlidersHorizontalIcon, TagIcon, XIcon } from 'lucide-react'
import { type ComponentProps, type KeyboardEvent, useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { cn } from '@/lib/utils'

const INSET_STROKE = 'shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-muted)]'
const SOLID_SELECTED =
  'data-selected:bg-(--dw-bg-neutral-solid) data-selected:text-(--dw-fg-on-neutral-solid) data-selected:shadow-none enabled:data-selected:hover:bg-(--dw-bg-neutral-solid-pressed) enabled:data-selected:active:bg-(--dw-bg-neutral-solid-pressed)'

const VARIANT = {
  solid: `bg-(--dw-bg-neutral-weak-alpha) enabled:hover:bg-(--dw-bg-neutral-weak-alpha-pressed) enabled:active:bg-(--dw-bg-neutral-weak-alpha-pressed) ${SOLID_SELECTED}`,
  'outline-strong': `bg-(--dw-bg-transparent) ${INSET_STROKE} enabled:hover:bg-(--dw-bg-transparent-pressed) enabled:active:bg-(--dw-bg-transparent-pressed) ${SOLID_SELECTED}`,
  'outline-weak': `bg-(--dw-bg-transparent) ${INSET_STROKE} enabled:hover:bg-(--dw-bg-transparent-pressed) enabled:active:bg-(--dw-bg-transparent-pressed) data-selected:bg-(--dw-bg-neutral-weak) data-selected:shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-contrast)] enabled:data-selected:hover:bg-(--dw-bg-neutral-weak-pressed) enabled:data-selected:active:bg-(--dw-bg-neutral-weak-pressed)`,
}

// 터치 기기에서는 before 면을 넓혀 히트 영역을 44px로 맞춘다
const SIZE = {
  small: {
    text: 'h-8 min-w-11 px-1.5 pointer-coarse:before:-inset-y-1.5',
    iconOnly: 'size-8 pointer-coarse:before:-inset-1.5',
    prefix: 'size-3.5',
    suffix: 'size-3.5',
  },
  medium: {
    text: 'h-9 min-w-12 px-2 pointer-coarse:before:-inset-y-1',
    iconOnly: 'size-9 pointer-coarse:before:-inset-1',
    prefix: 'size-4',
    suffix: 'size-3.5',
  },
  large: {
    text: 'h-10 min-w-13 px-2.5 pointer-coarse:before:-inset-y-0.5',
    iconOnly: 'size-10 pointer-coarse:before:-inset-0.5',
    prefix: 'size-4',
    suffix: 'size-4',
  },
}

interface ChipProps extends ComponentProps<'button'> {
  /** 한 묶음에서는 섞지 않는다. */
  variant?: keyof typeof VARIANT
  size?: keyof typeof SIZE
  /** `icon-only`는 `aria-label`이 필요하다. */
  layout?: 'with-text' | 'icon-only'
  /** 주지 않으면 실행 칩이다. `role="radio"`면 `aria-checked`로, 아니면 `aria-pressed`로 나간다. */
  selected?: boolean
  prefixIcon?: LucideIcon
  suffixIcon?: LucideIcon
}

/** shadcn에 없어 이 스토리 안에서 Tailwind와 토큰으로 조합한다. */
function Chip({ variant = 'solid', size = 'medium', layout = 'with-text', selected, prefixIcon: Prefix, suffixIcon: Suffix, role, className, children, ...props }: ChipProps) {
  const iconOnly = layout === 'icon-only'
  const dimension = SIZE[size]

  return (
    <button
      type="button"
      role={role}
      aria-pressed={role === 'radio' ? undefined : selected}
      aria-checked={role === 'radio' ? selected : undefined}
      data-selected={selected || undefined}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full whitespace-nowrap select-none',
        'text-(length:--dw-font-t4-size) leading-(--dw-font-t4-line-height) font-medium text-(--dw-fg-neutral)',
        'before:absolute before:inset-x-0 before:inset-y-0',
        'transition-[background-color,scale] duration-(--dw-duration-color-transition) ease-(--dw-easing-easing)',
        'enabled:active:scale-(--dw-scale-s95)',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dw-stroke-focus-ring)',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT[variant],
        iconOnly ? dimension.iconOnly : dimension.text,
        className,
      )}
      {...props}
    >
      {Prefix && <Prefix aria-hidden="true" className={cn('shrink-0', dimension.prefix, !iconOnly && 'ml-1.5')} />}
      {children && <span className="px-1.5">{children}</span>}
      {Suffix && <Suffix aria-hidden="true" className={cn('mr-1.5 shrink-0', dimension.suffix)} />}
    </button>
  )
}

function ToggleChip({ selected: initial = false, ...props }: ChipProps) {
  const [selected, setSelected] = useState(initial)
  return <Chip selected={selected} onClick={() => setSelected((v) => !v)} {...props} />
}

const SORTS = ['최신순', '이름순', '조회순']

/** 하나만 고르는 묶음이다. 키보드는 Radio와 같다. */
function SortChips() {
  const [active, setActive] = useState(0)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = (active + step + SORTS.length) % SORTS.length
    setActive(next)
    event.currentTarget.querySelectorAll('button')[next]?.focus()
  }

  return (
    <div role="radiogroup" aria-label="정렬" className="flex gap-2" onKeyDown={handleKeyDown}>
      {SORTS.map((label, index) => (
        <Chip key={label} role="radio" variant="outline-weak" selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}>
          {label}
        </Chip>
      ))}
    </div>
  )
}

const FILTERS = ['전체', '진행 중', '대기', '완료', '보류', '취소', '반려', '임시 저장', '보관']

const meta = {
  title: 'Component/Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '목록을 거르거나, 짧은 보기 중 고르거나, 짧은 행동을 실행하는 작은 알약 모양 버튼이다. 명세는 `design/components/chip.md`. shadcn에 없는 컴포넌트라 이 스토리 안에서 Tailwind와 토큰으로 조합한다.',
      },
    },
  },
  args: { children: '최신순' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline-strong', 'outline-weak'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    layout: { control: 'select', options: ['with-text', 'icon-only'] },
    selected: { control: 'boolean' },
    prefixIcon: { control: false },
    suffixIcon: { control: false },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** 눌러서 켜고 끄는 필터 칩이다. */
export const Default: Story = {
  render: (args) => <ToggleChip {...args} />,
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByRole('button', { name: '최신순' })
    await expect(chip).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
    await userEvent.keyboard(' ')
    await expect(chip).toHaveAttribute('aria-pressed', 'false')
    await userEvent.keyboard('{Enter}')
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
  },
}

/** 왼쪽부터 기본·선택·비활성이다. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['solid', 'outline-strong', 'outline-weak'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          <code className="w-28 text-xs">{variant}</code>
          <Chip variant={variant} selected={false}>
            기본
          </Chip>
          <Chip variant={variant} selected>
            선택
          </Chip>
          <Chip variant={variant} selected={false} disabled>
            비활성
          </Chip>
          <Chip variant={variant} selected disabled>
            선택 비활성
          </Chip>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip size="small">small</Chip>
      <Chip size="medium">medium</Chip>
      <Chip size="large">large</Chip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'small' }).offsetHeight).toBe(32)
    await expect(canvas.getByRole('button', { name: 'medium' }).offsetHeight).toBe(36)
    await expect(canvas.getByRole('button', { name: 'large' }).offsetHeight).toBe(40)
  },
}

/** 앞 아이콘, 드롭다운·지우기 같은 뒤 아이콘을 둘 수 있다. */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          <Chip size={size} variant="outline-strong" prefixIcon={TagIcon}>
            분류
          </Chip>
          <Chip size={size} variant="outline-strong" suffixIcon={ChevronDownIcon}>
            기간
          </Chip>
          <Chip size={size} variant="outline-strong" prefixIcon={TagIcon} suffixIcon={XIcon}>
            대기
          </Chip>
        </div>
      ))}
    </div>
  ),
}

/** 라벨이 없으므로 `aria-label`을 준다. */
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Chip key={size} size={size} layout="icon-only" prefixIcon={SlidersHorizontalIcon} aria-label={`조건 ${size}`} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: '조건 small' }).offsetWidth).toBe(32)
    await expect(canvas.getByRole('button', { name: '조건 medium' }).offsetWidth).toBe(36)
    await expect(canvas.getByRole('button', { name: '조건 large' }).offsetWidth).toBe(40)
  },
}

/** 선택 상태 없이 눌러서 바로 실행한다. `aria-pressed`를 달지 않는다. */
export const Action: Story = {
  args: { children: '필터 초기화', onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const chip = within(canvasElement).getByRole('button', { name: '필터 초기화' })
    await expect(chip).not.toHaveAttribute('aria-pressed')
    await userEvent.click(chip)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const chip = within(canvasElement).getByRole('button', { name: '최신순' })
    await expect(chip).toBeDisabled()
    await userEvent.click(chip, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

/** 하나만 고르는 묶음은 `role="radiogroup"` 안의 `role="radio"`다. */
export const SingleSelect: Story = {
  render: () => <SortChips />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('radiogroup', { name: '정렬' })).toBeInTheDocument()
    const first = canvas.getByRole('radio', { name: '최신순' })
    const second = canvas.getByRole('radio', { name: '이름순' })
    await userEvent.click(first)
    await expect(first).toHaveAttribute('aria-checked', 'true')
    await userEvent.keyboard('{ArrowRight}')
    await expect(second).toHaveAttribute('aria-checked', 'true')
    await expect(first).toHaveAttribute('aria-checked', 'false')
    await waitFor(() => expect(second).toHaveFocus())
  },
}

/** 768px 미만은 한 줄 가로 스크롤로 좌우 끝을 화면 여백까지 붙이고, 이상은 줄바꿈한다. */
export const Group: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'mobile' } },
  render: () => (
    <div className="px-4 py-6">
      <div role="group" aria-label="상태 필터" className="-mx-4 -my-1 flex gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] md:mx-0 md:my-0 md:flex-wrap md:overflow-x-visible md:px-0 md:py-0">
        {FILTERS.map((label, index) => (
          <ToggleChip key={label} variant="outline-weak" selected={index === 0}>
            {label}
          </ToggleChip>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', { name: '상태 필터' })
    await expect(getComputedStyle(group).flexWrap).toBe('nowrap')
    await expect(group.scrollWidth).toBeGreaterThan(group.clientWidth)
  },
}
