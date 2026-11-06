import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: 'Patterns/Brand Color',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '브랜드 2색을 한 화면에 함께 쓰는 기준이다. 대표 행동은 Primary 하나로 두고, Secondary로 묶음을 구분한다. 규칙은 `design/design.md` 4.1과 `design/components/button.md`의 위계 표를 따른다.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const USAGE = [
  { label: 'PT', count: 640, height: 'h-24', color: 'bg-[var(--chart-1)]' },
  { label: 'GX', count: 420, height: 'h-16', color: 'bg-[var(--chart-2)]' },
  { label: '마음챙김', count: 220, height: 'h-10', color: 'bg-[var(--chart-3)]' },
]

/** 오렌지는 저장 버튼과 첫 번째 차트 계열에만 쓰고, 나머지 구분은 차콜이 맡는다. */
export const Recommended: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">11월 운영 현황</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="brand-secondary">내보내기</Button>
          <Button>일정 등록</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>프로그램별 이용</CardTitle>
            <CardDescription>이번 달 1,280건</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-3 items-end gap-2">
              {USAGE.map(({ label, count, height, color }) => (
                <li key={label} className="flex flex-col justify-end gap-1 text-center text-xs">
                  <span className="font-medium">{count}</span>
                  <span className={`${height} rounded-t-md ${color}`} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card tone="brand-secondary">
          <CardHeader>
            <CardTitle>운영 공지</CardTitle>
            <CardDescription>이번 주 변경 사항 3건</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="brand-secondary" className="bg-[var(--dw-bg-brand-secondary-weak-pressed)]">공지</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const primary = canvasElement.querySelectorAll('[data-slot="button"][data-variant="default"]')
    await expect(primary).toHaveLength(1)
    await expect(within(canvasElement).getByRole('button', { name: '일정 등록' })).toBeVisible()
  },
}

/** 오렌지 버튼을 늘리면 대표 행동이 사라진다. 브랜드 색을 성공 표시로 쓰면 상태색과 뜻이 섞인다. */
export const Misuse: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>대표 행동이 여러 개</CardTitle>
          <CardDescription>저장만 Primary로 두고 나머지는 낮춥니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>저장</Button>
          <Button>내보내기</Button>
          <Button>둘러보기</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>브랜드 색을 상태 표시로 사용</CardTitle>
          <CardDescription>성공 표시는 positive 색을 씁니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="brand-secondary">승인 완료</Badge>
        </CardContent>
      </Card>
    </div>
  ),
}
