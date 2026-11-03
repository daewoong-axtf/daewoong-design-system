import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const rows = [
  { name: '김하늘', team: '영업1팀', count: 12, status: '승인' },
  { name: '이바다', team: '개발팀', count: 3, status: '대기' },
  { name: '박산', team: '인사팀', count: 0, status: '반려' },
]

const meta = {
  title: 'Component/Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '여러 행을 비교해 보는 데이터 표다. 명세는 `design/components/table.md`. 숫자 열은 오른쪽 정렬, 좁은 화면에서는 가로 스크롤된다.',
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>회원 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>소속</TableHead>
          <TableHead className="text-right">이용 횟수</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell>{r.team}</TableCell>
            <TableCell className="text-right tabular-nums">{r.count}</TableCell>
            <TableCell>
              <Badge variant={r.status === '반려' ? 'destructive' : 'secondary'}>{r.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>소속</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
            검색 결과가 없어요
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
