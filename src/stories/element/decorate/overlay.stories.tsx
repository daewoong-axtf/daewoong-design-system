import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 다이얼로그·시트 뒤를 덮는 막이다. 테마와 무관하게 검정 반투명이며
 * `bg-overlay`(모달 뒤)와 `bg-overlay-muted`(덜 가려도 되는 자리) 두 단계만 쓴다.
 */
const meta = {
  title: 'Element/Decorate/Overlay',
  tags: ['autodocs'],
  parameters: { layout: 'padded', controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const 두_단계: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {[
        ['bg-overlay', '다이얼로그, 시트'],
        ['bg-overlay-muted', '이미지 위 글자 받침'],
      ].map(([token, note]) => (
        <div key={token} className="flex flex-col gap-2">
          <div className="relative h-40 w-64 overflow-hidden rounded-xl border bg-background p-4 text-sm">
            뒤 화면 내용 — 목록, 버튼, 글자
            <div className="absolute inset-0 grid place-items-center" style={{ background: `var(--dw-${token})` }}>
              <span className="rounded-md bg-popover px-3 py-1.5 text-sm font-medium">{token}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{note}</span>
        </div>
      ))}
    </div>
  ),
}
