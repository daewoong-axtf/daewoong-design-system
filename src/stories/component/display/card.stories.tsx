import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: 'Component/Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '관련 정보를 한 덩어리로 묶는 상자다. 명세는 `design/components/card.md`. 모바일에서는 1열, 640px부터 2열, 1024px부터 3열로 놓는다.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>이번 달 이용</CardTitle>
        <CardDescription>11월 1일–30일</CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            전체 보기
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">12회</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">내역</Button>
        <Button>예약하기</Button>
      </CardFooter>
    </Card>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {['신규 회원', '이용 횟수', '취소 건수'].map((title, i) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>지난주 대비</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{[24, 318, 7][i]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

/** 묶음을 색으로 나눌 때 옅은 보조 브랜드 면을 쓴다. 성공·오류 같은 상태 표시에는 쓰지 않는다. */
export const BrandTone: Story = {
  render: () => (
    <Card tone="brand-secondary">
      <CardHeader>
        <CardTitle>운영 공지</CardTitle>
        <CardDescription>이번 주 변경 사항을 확인합니다.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
