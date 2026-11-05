import type { Meta, StoryObj } from '@storybook/react-vite'
import { type CSSProperties, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STROKE = { 24: 3, 40: 5 }

const TONE = {
  neutral: { track: 'stroke-(--dw-bg-neutral-weak)', range: 'stroke-(--dw-gray-500)' },
  brand: { track: 'stroke-(--dw-bg-brand-weak)', range: 'stroke-(--dw-bg-brand-solid)' },
  'static-white': { track: 'stroke-(--dw-static-white-alpha-300)', range: 'stroke-(--dw-static-white)' },
}

// 머리·꼬리 keyframes는 Tailwind 유틸리티로 쓸 수 없어 SVG 안에 둔다
const INDETERMINATE_CSS = `
svg[role='progressbar'][data-state='indeterminate'] { animation: progress-circle-spin 1.2s cubic-bezier(0.35, 0.25, 0.65, 0.75) infinite; }
svg[role='progressbar'][data-state='indeterminate'] [data-slot='range'] {
  animation:
    progress-circle-head 1.2s cubic-bezier(0.35, 0, 0.65, 1) infinite,
    progress-circle-tail 1.2s cubic-bezier(0.35, 0, 0.65, 0.6) infinite;
}
@keyframes progress-circle-spin { to { transform: rotate(360deg); } }
@keyframes progress-circle-head {
  0% { stroke-dasharray: 0 var(--progress-circle-c); }
  75%, 100% { stroke-dasharray: var(--progress-circle-c) var(--progress-circle-c); }
}
@keyframes progress-circle-tail {
  0%, 33% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: calc(-1 * var(--progress-circle-c)); }
}
@media (prefers-reduced-motion: reduce) {
  svg[role='progressbar'][data-state='indeterminate'] { animation-duration: 3s; }
  svg[role='progressbar'][data-state='indeterminate'] [data-slot='range'] {
    animation: none;
    stroke-dasharray: calc(var(--progress-circle-c) / 4) var(--progress-circle-c);
  }
}
`

interface ProgressCircleProps {
  size?: 24 | 40
  tone?: keyof typeof TONE
  /** 0–100이다. 없으면 도는 원(indeterminate)이다. */
  value?: number
  /** 스크린리더가 읽는 이름이다. */
  label?: string
}

/**
 * `Spinner`는 트랙 없는 lucide 아이콘이라 값을 표시할 수 없다. 명세의 Track·Range를 SVG로 직접 그린다.
 * r = (size − 두께) / 2, C = 2πr
 */
function ProgressCircle({ size = 40, tone = 'neutral', value, label = '불러오는 중' }: ProgressCircleProps) {
  const stroke = STROKE[size]
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const center = size / 2
  const determinate = value !== undefined
  const clamped = Math.min(100, Math.max(0, value ?? 0))

  return (
    <svg
      role="progressbar"
      aria-label={label}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
      aria-valuenow={determinate ? clamped : undefined}
      data-state={determinate ? 'determinate' : 'indeterminate'}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="shrink-0"
      style={{ '--progress-circle-c': `${c}px` } as CSSProperties}
    >
      {!determinate && <style>{INDETERMINATE_CSS}</style>}
      <circle data-slot="track" cx={center} cy={center} r={r} strokeWidth={stroke} className={cn('fill-none', TONE[tone].track)} />
      <circle
        data-slot="range"
        cx={center}
        cy={center}
        r={r}
        strokeWidth={stroke}
        strokeLinecap="round"
        className={cn(
          'origin-center -rotate-90 fill-none transition-[stroke-dasharray] duration-(--dw-duration-d6) ease-(--dw-easing-enter) motion-reduce:transition-none',
          TONE[tone].range,
        )}
        style={determinate ? { strokeDasharray: `${(c * clamped) / 100} ${c}` } : undefined}
      />
    </svg>
  )
}

function Uploader() {
  const [value, setValue] = useState(0)

  return (
    <div className="flex items-center gap-4">
      <ProgressCircle tone="brand" value={value} label="업로드 진행률" />
      <span className="w-12 text-sm tabular-nums">{value}%</span>
      <Button variant="outline" onClick={() => setValue((v) => Math.min(100, v + 25))}>
        25% 진행
      </Button>
    </div>
  )
}

const meta = {
  title: 'Component/State/Progress Circle',
  component: ProgressCircle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '작업 진행률을 원으로 보여준다. 명세는 `design/components/progress-circle.md`. 값을 모를 때 쓰는 아이콘형은 `Component/State/Spinner`에 있고, 여기서는 값이 있는 determinate를 중심으로 다룬다. shadcn `Spinner`는 값을 표시할 수 없어 SVG로 직접 그린다.',
      },
    },
  },
  args: { value: 40, label: '진행률' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'select', options: [24, 40] },
    tone: { control: 'select', options: ['neutral', 'brand', 'static-white'] },
  },
} satisfies Meta<typeof ProgressCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const circle = within(canvasElement).getByRole('progressbar', { name: '진행률' })
    await expect(circle).toHaveAttribute('aria-valuemin', '0')
    await expect(circle).toHaveAttribute('aria-valuemax', '100')
    await expect(circle).toHaveAttribute('aria-valuenow', '40')
    await expect(circle).toHaveAttribute('data-state', 'determinate')
  },
}

/** 값만큼 12시 방향에서 시계 방향으로 채운다. */
export const Values: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="flex flex-col items-center gap-2">
          <ProgressCircle tone="brand" value={value} label={`진행률 ${value}%`} />
          <span className="text-xs tabular-nums">{value}%</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ProgressCircle size={24} value={60} label="진행률 24" />
      <ProgressCircle size={40} value={60} label="진행률 40" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radius = (name: string) => canvas.getByRole('progressbar', { name }).querySelector('[data-slot="range"]')?.getAttribute('r')
    await expect(radius('진행률 24')).toBe('10.5')
    await expect(radius('진행률 40')).toBe('17.5')
  },
}

/** `static-white`는 어두운 면이나 이미지 위에 쓴다. */
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ProgressCircle tone="neutral" value={60} label="neutral" />
      <ProgressCircle tone="brand" value={60} label="brand" />
      <div className="rounded-(--dw-radius-r2) bg-(--dw-static-black) p-2">
        <ProgressCircle tone="static-white" value={60} label="static-white" />
      </div>
    </div>
  ),
}

/** 값이 바뀌면 호가 부드럽게 늘어난다. */
export const ValueChange: Story = {
  render: () => <Uploader />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const circle = canvas.getByRole('progressbar', { name: '업로드 진행률' })
    const button = canvas.getByRole('button', { name: '25% 진행' })
    await expect(circle).toHaveAttribute('aria-valuenow', '0')
    await userEvent.click(button)
    await expect(circle).toHaveAttribute('aria-valuenow', '25')
    await expect(canvas.getByText('25%')).toBeInTheDocument()
    for (let i = 0; i < 4; i += 1) await userEvent.click(button)
    await expect(circle).toHaveAttribute('aria-valuenow', '100')
  },
}

/** 값을 모르면 Track 위에서 호가 돈다. 값이 없으므로 `aria-valuenow`를 달지 않고, 로딩 영역에 `aria-busy`를 둔다. */
export const Indeterminate: Story = {
  args: { value: undefined, label: '불러오는 중' },
  render: (args) => (
    <div aria-busy="true" className="flex h-40 w-64 items-center justify-center">
      <ProgressCircle {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const circle = within(canvasElement).getByRole('progressbar', { name: '불러오는 중' })
    await expect(circle).not.toHaveAttribute('aria-valuenow')
    await expect(circle).toHaveAttribute('data-state', 'indeterminate')
  },
}
