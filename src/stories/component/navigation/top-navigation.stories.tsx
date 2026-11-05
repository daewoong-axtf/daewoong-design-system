import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronLeftIcon, EllipsisIcon, type LucideIcon, MenuIcon, SearchIcon } from 'lucide-react'
import { type ComponentProps, type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { cn } from '@/lib/utils'

const PRESSABLE = cn(
  'shrink-0 cursor-pointer bg-(--dw-bg-transparent) transition-[background-color,scale] duration-(--dw-duration-color-transition) ease-(--dw-easing-easing)',
  'hover:bg-(--dw-bg-transparent-pressed) active:scale-(--dw-scale-s95)',
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--dw-stroke-focus-ring)',
)

const TITLE_CENTER = 'absolute inset-x-(--topbar-inset) top-[env(safe-area-inset-top,0px)] bottom-0 my-auto h-fit text-center'
const TITLE_CENTER_BELOW_LG = 'max-lg:absolute max-lg:inset-x-(--topbar-inset) max-lg:top-[env(safe-area-inset-top,0px)] max-lg:bottom-0 max-lg:my-auto max-lg:h-fit max-lg:text-center'

interface TopBarProps {
  title: string
  subtitle?: string
  /** 뒤로가기·메뉴·로고다. */
  left?: ReactNode
  /** 아이콘 버튼·텍스트 버튼이다. 행동은 2개까지 둔다. */
  right?: ReactNode
  /** 주지 않으면 1024px 미만은 가운데, 이상은 왼쪽이다. */
  titleAlign?: 'center' | 'left'
  /** `transparent`는 이미지 위에 쓴다. */
  tone?: 'layer' | 'transparent'
  divider?: boolean
  /** 콘텐츠가 위로 스크롤되면 아래 선이 생긴다. */
  scrolled?: boolean
}

/** shadcn에 없어 이 스토리 안에서 Tailwind와 토큰으로 조합한다. */
function TopBar({ title, subtitle, left, right, titleAlign, tone = 'layer', divider, scrolled }: TopBarProps) {
  const rootRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [inset, setInset] = useState(56)

  // 가운데 제목이 양쪽 끝 영역과 겹치지 않도록 넓은 쪽 폭을 잰다
  useLayoutEffect(() => {
    const root = rootRef.current
    const leftEl = leftRef.current
    const rightEl = rightRef.current
    if (!root || !leftEl || !rightEl) return

    const place = () => {
      const box = root.getBoundingClientRect()
      const edge = Number.parseFloat(getComputedStyle(root).paddingLeft)
      setInset(Math.max(leftEl.getBoundingClientRect().right - box.left, box.right - rightEl.getBoundingClientRect().left, edge))
    }

    place()
    const observer = new ResizeObserver(place)
    for (const el of [root, leftEl, rightEl]) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transparent = tone === 'transparent'

  return (
    <header
      ref={rootRef}
      data-scrolled={scrolled || undefined}
      style={{ '--topbar-inset': `${inset}px` } as CSSProperties}
      className={cn(
        'sticky top-0 z-10 box-content flex h-14 items-center px-4 pt-[env(safe-area-inset-top,0px)] lg:h-16 lg:px-6',
        transparent ? 'bg-transparent text-(--dw-static-white)' : 'bg-(--dw-bg-layer-default) text-(--dw-fg-neutral)',
        'data-scrolled:shadow-[inset_0_-1px_0_0_var(--dw-stroke-neutral-muted)]',
        divider && 'shadow-[inset_0_-1px_0_0_var(--dw-stroke-neutral-muted)]',
      )}
    >
      <div ref={leftRef} className="flex shrink-0 items-center [&>[data-slot=topbar-icon-button]:first-child]:-ml-2.5">
        {left}
      </div>
      <h1
        className={cn(
          'min-w-0 flex-1 truncate font-bold',
          subtitle ? 'text-(length:--dw-font-t5-size) leading-(--dw-font-t5-line-height)' : 'text-(length:--dw-font-t6-size) leading-(--dw-font-t6-line-height)',
          titleAlign === 'center' && TITLE_CENTER,
          !titleAlign && TITLE_CENTER_BELOW_LG,
        )}
      >
        {title}
        {subtitle && <span className={cn('block truncate text-(length:--dw-font-t2-size) leading-(--dw-font-t2-line-height) font-normal', transparent ? 'text-(--dw-static-white)' : 'text-(--dw-fg-neutral-subtle)')}>{subtitle}</span>}
      </h1>
      <div ref={rightRef} className="ml-auto flex shrink-0 items-center [&>[data-slot=topbar-icon-button]:last-child]:-mr-2.5">
        {right}
      </div>
    </header>
  )
}

interface TopBarIconButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon
  /** 아이콘 버튼은 모두 이름이 있어야 한다. */
  'aria-label': string
}

function TopBarIconButton({ icon: Icon, className, ...props }: TopBarIconButtonProps) {
  return (
    <button type="button" data-slot="topbar-icon-button" className={cn(PRESSABLE, 'inline-flex size-11 items-center justify-center rounded-(--dw-radius-r1)', className)} {...props}>
      <Icon aria-hidden="true" className="size-6" />
    </button>
  )
}

function TopBarTextButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(PRESSABLE, 'h-11 max-w-24 truncate rounded-(--dw-radius-r2) px-2.5 text-(length:--dw-font-t5-size) leading-(--dw-font-t5-line-height) font-bold', className)}
      {...props}
    />
  )
}

/** 데스크톱에서는 Side Navigation이 펼쳐져 있어 메뉴 버튼을 숨긴다. */
const menu = <TopBarIconButton icon={MenuIcon} aria-label="메뉴 열기" className="lg:hidden" />
const back = <TopBarIconButton icon={ChevronLeftIcon} aria-label="뒤로 가기" />
const more = <TopBarIconButton icon={EllipsisIcon} aria-label="더 보기" />

function ScrollingPage() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div role="group" aria-label="본문" tabIndex={0} className="h-80 overflow-y-auto" onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}>
      <TopBar title="공지사항" left={back} scrolled={scrolled} />
      <div className="flex flex-col gap-3 p-4 text-sm text-muted-foreground">
        {Array.from({ length: 16 }, (_, index) => (
          <p key={index}>본문 문단 {index + 1}</p>
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: 'Component/Navigation/Top Navigation',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '화면 맨 위에 고정되는 막대다. 왼쪽 버튼, 제목, 오른쪽 행동 아이콘으로 구성된다. 명세는 `design/components/top-navigation.md`. shadcn에 없는 컴포넌트라 이 스토리 안에서 Tailwind와 토큰으로 조합한다.',
      },
    },
  },
  args: { title: '주문 상세', left: back, right: more },
  argTypes: {
    titleAlign: { control: 'select', options: ['center', 'left'] },
    tone: { control: 'select', options: ['layer', 'transparent'] },
    left: { control: false },
    right: { control: false },
  },
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

const handleBack = fn()

export const Default: Story = {
  args: {
    left: <TopBarIconButton icon={ChevronLeftIcon} aria-label="뒤로 가기" onClick={handleBack} />,
  },
  play: async ({ canvasElement }) => {
    handleBack.mockClear()
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { level: 1, name: '주문 상세' })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: '뒤로 가기' }))
    await expect(handleBack).toHaveBeenCalledOnce()
  },
}

/** 1024px 미만은 제목이 가운데이고 Left에 메뉴 버튼이 있다. */
export const Mobile: Story = {
  args: { title: '홈', left: menu },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: '메뉴 열기' })).toBeVisible()
    await expect(getComputedStyle(canvas.getByRole('heading', { level: 1 })).textAlign).toBe('center')
    await expect(canvasElement.querySelector('header')?.offsetHeight).toBe(56)
  },
}

/** 1024px 이상은 제목이 왼쪽이고 메뉴 버튼을 숨기며 높이가 64px이다. */
export const Desktop: Story = {
  args: { title: '홈', left: menu },
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('button', { name: '메뉴 열기' })).not.toBeInTheDocument()
    await expect(getComputedStyle(canvas.getByRole('heading', { level: 1 })).textAlign).not.toBe('center')
    await expect(canvasElement.querySelector('header')?.offsetHeight).toBe(64)
  },
}

/** 너비와 상관없이 제목을 왼쪽에 둔다. */
export const TitleLeft: Story = { args: { titleAlign: 'left' } }

/** 너비와 상관없이 제목을 가운데에 둔다. */
export const TitleCenter: Story = { args: { titleAlign: 'center' }, globals: { viewport: { value: 'desktop' } } }

export const WithSubtitle: Story = { args: { title: '주문 상세', subtitle: '2건 처리 중' } }

export const WithActions: Story = {
  args: {
    right: (
      <>
        <TopBarIconButton icon={SearchIcon} aria-label="검색" />
        {more}
      </>
    ),
  },
}

/** 텍스트 버튼은 최대 96px에서 말줄임한다. */
export const TextButton: Story = {
  args: { title: '프로필 수정', right: <TopBarTextButton>완료</TopBarTextButton> },
}

/** 제목은 한 줄이다. 넘치면 말줄임하고 양쪽 끝 영역과 겹치지 않는다. */
export const LongTitle: Story = {
  args: {
    title: '화면 폭보다 훨씬 길어서 끝까지 다 보여줄 수 없는 아주 긴 화면 제목입니다',
    right: (
      <>
        <TopBarIconButton icon={SearchIcon} aria-label="검색" />
        {more}
      </>
    ),
  },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByRole('heading', { level: 1 })
    await expect(title.scrollWidth).toBeGreaterThan(title.clientWidth)
    await waitFor(() => {
      const right = canvas.getByRole('button', { name: '검색' }).getBoundingClientRect().left
      expect(title.getBoundingClientRect().right).toBeLessThanOrEqual(right)
    })
    const center = title.getBoundingClientRect()
    const bar = canvasElement.querySelector('header')?.getBoundingClientRect()
    await expect(center.left + center.width / 2).toBeCloseTo((bar?.left ?? 0) + (bar?.width ?? 0) / 2, 0)
  },
}

export const Divider: Story = { args: { divider: true } }

/** 이미지 위에 놓는 투명 톤이다. 아이콘과 글자는 `static-white`다. */
export const Transparent: Story = {
  args: { tone: 'transparent', subtitle: '이미지 위' },
  decorators: [
    (Story) => (
      <div className="h-56 bg-(--dw-static-black)">
        <Story />
      </div>
    ),
  ],
}

/** 본문을 내리면 선이 없던 막대에 아래 선이 생긴다. */
export const Scrolled: Story = {
  render: () => <ScrollingPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const header = canvasElement.querySelector('header')
    await expect(header).not.toHaveAttribute('data-scrolled')
    canvas.getByRole('group', { name: '본문' }).scrollTop = 120
    await waitFor(() => expect(header).toHaveAttribute('data-scrolled'))
  },
}
