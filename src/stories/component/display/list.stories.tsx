import type { Meta, StoryObj } from '@storybook/react-vite'
import { BellIcon, ChevronRightIcon, GlobeIcon, LockIcon, UserIcon } from 'lucide-react'
import { type ComponentProps, createElement, type ReactNode } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const SURFACE_IN = 'before:inset-x-1.5 before:rounded-(--dw-radius-r2_5)'

const CONTENT = cn(
  'relative isolate flex w-full items-center px-4 py-3 text-left text-(--dw-fg-neutral)',
  'before:absolute before:inset-x-0 before:inset-y-0 before:-z-10 before:rounded-none before:bg-(--dw-bg-transparent)',
  'before:transition-[background-color,inset-inline,border-radius] before:duration-(--dw-duration-color-transition) before:ease-(--dw-easing-easing)',
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--dw-stroke-focus-ring)',
)

const PRESSABLE = cn(
  'cursor-pointer',
  'hover:before:inset-x-1.5 hover:before:rounded-(--dw-radius-r2_5) hover:before:bg-(--dw-bg-transparent-pressed)',
  'active:before:inset-x-1.5 active:before:rounded-(--dw-radius-r2_5) active:before:bg-(--dw-bg-transparent-pressed)',
)

const HIGHLIGHTED = `${SURFACE_IN} before:bg-(--dw-bg-brand-weak)`
const HIGHLIGHTED_PRESSABLE = 'hover:before:bg-(--dw-bg-brand-weak-pressed) active:before:bg-(--dw-bg-brand-weak-pressed)'

const DIVIDED = '[&>li+li]:before:absolute [&>li+li]:before:inset-x-4 [&>li+li]:before:top-0 [&>li+li]:before:h-px [&>li+li]:before:bg-(--dw-stroke-neutral-subtle)'

interface ListProps extends ComponentProps<'ul'> {
  /** 항목 사이에 좌우 16px 들인 선을 넣는다. */
  divided?: boolean
}

function List({ divided, className, ...props }: ListProps) {
  return <ul className={cn('[&>li]:relative', divided && DIVIDED, className)} {...props} />
}

interface ListHeaderProps {
  /** `strong`은 굵고 진하다. */
  variant?: 'weak' | 'strong'
  /** 오른쪽 링크·버튼이다. */
  action?: ReactNode
  children: ReactNode
}

function ListHeader({ variant = 'weak', action, children }: ListHeaderProps) {
  return (
    <h3
      className={cn(
        'flex items-center justify-between gap-2.5 px-4 py-2 text-(length:--dw-font-t4-size) leading-(--dw-font-t4-line-height)',
        variant === 'strong' ? 'font-bold text-(--dw-fg-neutral)' : 'font-medium text-(--dw-fg-neutral-subtle)',
      )}
    >
      {children}
      {action}
    </h3>
  )
}

interface ListRowProps {
  /** 눌리는 행은 `a`·`button`, Switch·Checkbox가 있는 행은 `label`, 나머지는 `div`다. */
  as?: 'div' | 'a' | 'button' | 'label'
  href?: string
  onClick?: () => void
  highlighted?: boolean
  disabled?: boolean
  /** 아이콘 22px·Avatar·Checkbox다. */
  prefix?: ReactNode
  title: string
  /** 보조 설명이다. 두 줄까지 쓴다. */
  detail?: string
  /** 값 텍스트·`chevron-right`·Switch다. */
  suffix?: ReactNode
}

/** shadcn에 없어 이 스토리 안에서 Tailwind와 토큰으로 조합한다. */
function ListRow({ as = 'div', href, onClick, highlighted, disabled, prefix, title, detail, suffix }: ListRowProps) {
  const pressable = as !== 'div' && !disabled
  const body = (
    <>
      {prefix && <span className={cn('mr-3 inline-flex shrink-0 items-center [&>svg]:size-[22px]', disabled ? 'text-(--dw-fg-disabled)' : 'text-(--dw-fg-neutral)')}>{prefix}</span>}
      <span className="mr-2.5 flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn('text-(length:--dw-font-t5-size) leading-(--dw-font-t5-line-height) font-normal', disabled ? 'text-(--dw-fg-disabled)' : 'text-(--dw-fg-neutral)')}>{title}</span>
        {detail && <span className={cn('line-clamp-2 text-(length:--dw-font-t3-size) leading-(--dw-font-t3-line-height) font-normal', disabled ? 'text-(--dw-fg-disabled)' : 'text-(--dw-fg-neutral-subtle)')}>{detail}</span>}
      </span>
      {suffix && <span className={cn('inline-flex shrink-0 items-center gap-1 text-(length:--dw-font-t5-size) leading-(--dw-font-t5-line-height) font-normal [&>svg]:size-5', disabled ? 'text-(--dw-fg-disabled)' : 'text-(--dw-fg-neutral-subtle)')}>{suffix}</span>}
    </>
  )

  return (
    <li>
      {createElement(
        as,
        {
          className: cn(CONTENT, pressable && PRESSABLE, highlighted && HIGHLIGHTED, highlighted && pressable && HIGHLIGHTED_PRESSABLE, disabled && 'cursor-not-allowed'),
          href: disabled ? undefined : href,
          onClick: disabled ? undefined : onClick,
          type: as === 'button' ? 'button' : undefined,
          'aria-disabled': disabled || undefined,
        },
        body,
      )}
    </li>
  )
}

const Chevron = () => <ChevronRightIcon aria-hidden="true" />

const meta = {
  title: 'Component/Display/List',
  component: ListRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '세로로 쌓인 행 목록이다. 설정 항목, 메뉴 목록, 단순 데이터 목록에 쓴다. 명세는 `design/components/list.md`. shadcn에 없는 컴포넌트라 이 스토리 안에서 Tailwind와 토큰으로 조합한다. 넓은 화면에서는 최대 폭 640px을 권장한다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-160">
        <Story />
      </div>
    ),
  ],
  args: { title: '프로필', detail: '이름과 사진' },
  argTypes: {
    as: { control: 'select', options: ['div', 'a', 'button', 'label'] },
    prefix: { control: false },
    suffix: { control: false },
  },
} satisfies Meta<typeof ListRow>

export default meta
type Story = StoryObj<typeof meta>

/** 눌리지 않는 데이터 목록이다. 값 텍스트는 읽힌다. */
export const Default: Story = {
  render: (args) => (
    <List>
      <ListRow {...args} suffix="기본" />
      <ListRow title="언어" detail="화면에 쓰는 언어" suffix="한국어" />
      <ListRow title="버전" suffix="1.2.0" />
    </List>
  ),
}

/** 행 전체가 하나의 링크다. 화살표는 장식이다. */
export const Links: Story = {
  render: () => (
    <>
      <ListHeader>계정</ListHeader>
      <List>
        <ListRow as="a" href="#profile" prefix={<UserIcon aria-hidden="true" />} title="프로필" detail="이름과 사진" suffix={<Chevron />} />
        <ListRow as="a" href="#security" prefix={<LockIcon aria-hidden="true" />} title="보안" detail="비밀번호와 로그인 기록" suffix={<Chevron />} />
        <ListRow as="a" href="#language" prefix={<GlobeIcon aria-hidden="true" />} title="언어" suffix={<>한국어<Chevron /></>} />
      </List>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('list')).toBeInTheDocument()
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3)
    await expect(canvas.getByRole('link', { name: '보안 비밀번호와 로그인 기록' })).toHaveAttribute('href', '#security')
    await expect(canvas.getByRole('link', { name: '언어 한국어' })).toBeInTheDocument()
  },
}

export const Buttons: Story = {
  args: { as: 'button', onClick: fn(), suffix: <Chevron /> },
  render: (args) => (
    <List>
      <ListRow {...args} />
    </List>
  ),
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '프로필 이름과 사진' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

/** 지금 보고 있는 항목처럼 강조할 행은 뒤 면이 `bg-brand-weak`다. */
export const Highlighted: Story = {
  render: () => (
    <List>
      <ListRow as="a" href="#today" highlighted title="오늘 할 일" detail="3건 남음" suffix={<Chevron />} />
      <ListRow as="a" href="#done" title="완료한 일" detail="12건" suffix={<Chevron />} />
    </List>
  ),
}

export const Disabled: Story = {
  args: { as: 'button', disabled: true, onClick: fn(), prefix: <UserIcon aria-hidden="true" />, suffix: <Chevron /> },
  render: (args) => (
    <List>
      <ListRow {...args} />
    </List>
  ),
  play: async ({ args, canvasElement }) => {
    const row = within(canvasElement).getByRole('button', { name: '프로필 이름과 사진' })
    await expect(row).toHaveAttribute('aria-disabled', 'true')
    await userEvent.click(row)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

/** 선은 항목 사이에만 들어간다. */
export const Divided: Story = {
  render: () => (
    <List divided>
      <ListRow as="a" href="#notice" title="공지사항" suffix={<Chevron />} />
      <ListRow as="a" href="#help" title="도움말" suffix={<Chevron />} />
      <ListRow as="a" href="#terms" title="이용 약관" suffix={<Chevron />} />
    </List>
  ),
}

/** `weak`·`strong` 두 가지다. 오른쪽에 링크를 둘 수 있다. */
export const Headers: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <ListHeader>weak</ListHeader>
        <List>
          <ListRow title="항목" />
        </List>
      </div>
      <div>
        <ListHeader variant="strong" action={<a href="#all" className="font-medium text-(--dw-fg-neutral-subtle) underline">전체 보기</a>}>
          strong
        </ListHeader>
        <List>
          <ListRow title="항목" />
        </List>
      </div>
    </div>
  ),
}

export const WithAvatar: Story = {
  render: () => (
    <List>
      {['A', 'B', 'C'].map((name) => (
        <ListRow
          key={name}
          as="a"
          href={`#${name}`}
          prefix={
            <Avatar>
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          }
          title={`담당자 ${name}`}
          detail="운영 담당"
          suffix={<Chevron />}
        />
      ))}
    </List>
  ),
}

/** Switch가 있는 행은 Content가 `<label>`이라 행 전체가 토글된다. */
export const WithSwitch: Story = {
  render: () => (
    <List>
      <ListRow as="label" prefix={<BellIcon aria-hidden="true" />} title="푸시 알림" detail="새 소식을 알림으로 받는다" suffix={<Switch />} />
    </List>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('switch', { name: /푸시 알림/ })
    await expect(toggle).not.toBeChecked()
    await userEvent.click(canvas.getByText('푸시 알림'))
    await expect(toggle).toBeChecked()
  },
}

/** Prefix의 Checkbox도 행 전체가 누르는 영역이다. */
export const WithCheckbox: Story = {
  render: () => (
    <List>
      <ListRow as="label" prefix={<Checkbox />} title="이용 약관 동의" />
      <ListRow as="label" prefix={<Checkbox />} title="마케팅 수신 동의" detail="선택 항목" />
    </List>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('이용 약관 동의'))
    await expect(canvas.getByRole('checkbox', { name: '이용 약관 동의' })).toBeChecked()
    await expect(canvas.getByRole('checkbox', { name: /마케팅 수신 동의/ })).not.toBeChecked()
  },
}
