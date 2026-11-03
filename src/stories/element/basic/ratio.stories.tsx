import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 요소를 정해진 비율로 잡아 두는 틀이다. 내용이 무엇이든 자리가 먼저 정해지므로,
 * 이미지가 늦게 도착해도 레이아웃이 밀리지 않는다. 컴포넌트가 아니라 CSS `aspect-ratio` 규약이다.
 */
const meta = {
  title: 'Element/Basic/Ratio',
  tags: ['autodocs'],
  parameters: { layout: 'padded', controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const RATIOS = [
  ['1 / 1', '아바타, 정사각 썸네일'],
  ['4 / 3', '목록 썸네일'],
  ['16 / 9', '배너, 동영상, 차트 영역'],
] as const

export const 비율: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {RATIOS.map(([ratio, note]) => (
        <div key={ratio} className="flex w-56 flex-col gap-2">
          <div
            className="flex items-center justify-center rounded-md border bg-muted text-sm font-medium"
            style={{ aspectRatio: ratio }}
          >
            {ratio.replace(' / ', ' : ')}
          </div>
          <code className="text-xs">aspect-ratio: {ratio}</code>
          <span className="text-xs text-muted-foreground">{note}</span>
        </div>
      ))}
    </div>
  ),
}

/** 이미지가 오기 전에도 자리가 잡혀 있어 아래 내용이 밀리지 않는다 */
export const 이미지_도착_전: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <div className="w-full rounded-md bg-muted" style={{ aspectRatio: '16 / 9' }} aria-label="이미지 자리" role="img" />
      <p className="text-sm">제목은 이미지가 늦게 와도 이 위치에 그대로 있다.</p>
    </div>
  ),
}
