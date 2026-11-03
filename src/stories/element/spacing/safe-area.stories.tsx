import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'

/**
 * 화면 맨 아래에 붙는 막대가 iOS 홈 인디케이터나 안드로이드 제스처 바에 가리지 않도록
 * 확보하는 여백이다. `env(safe-area-inset-bottom)`을 `max()`로 최소값과 함께 쓴다 —
 * 인디케이터가 없는 기기에서는 `env()`가 0이기 때문이다.
 */
const meta = {
  title: 'Element/Spacing/Safe Area',
  tags: ['autodocs'],
  parameters: { layout: 'padded', controls: { disable: true } },
  globals: { viewport: { value: 'mobile' } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** 하단 고정 액션 바 — 최소 12px(`x3`) */
export const 하단_액션_바: Story = {
  render: () => (
    <div className="relative h-[420px] w-full max-w-[375px] overflow-hidden rounded-xl border">
      <div className="p-4 text-sm text-muted-foreground">본문 영역</div>
      <div
        className="absolute inset-x-0 bottom-0 border-t bg-background px-4 pt-3"
        style={{ paddingBottom: 'max(var(--dw-spacing-x3), env(safe-area-inset-bottom))' }}
      >
        <Button className="w-full">저장</Button>
      </div>
    </div>
  ),
}

/** 기기에서 보이는 모습 — 인디케이터(34px)가 있으면 그만큼 여백이 커진다 */
export const 인디케이터가_있는_기기: Story = {
  render: () => (
    <div className="relative h-[420px] w-full max-w-[375px] overflow-hidden rounded-xl border">
      <div className="p-4 text-sm text-muted-foreground">본문 영역</div>
      <div className="absolute inset-x-0 bottom-0 border-t bg-background px-4 pt-3" style={{ paddingBottom: 'max(var(--dw-spacing-x3), 34px)' }}>
        <Button className="w-full">저장</Button>
      </div>
      <div aria-hidden className="absolute bottom-2 left-1/2 h-1.5 w-32 -translate-x-1/2 rounded-full bg-foreground/80" />
    </div>
  ),
}
