import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, PlusIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'

const meta = {
  title: 'Component/Navigation/Page Header',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '페이지 맨 위의 제목·설명·주요 행동이다. 768px 미만에서 행동은 화면 아래 고정 바로 내려간다. 명세는 `design/components/page-header.md`.',
      },
    },
  },
  args: { title: '주문 관리', description: '접수된 주문을 확인하고 처리해요.' },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

const actions = (
  <>
    <Button variant="secondary">
      <DownloadIcon />
      내려받기
    </Button>
    <Button>
      <PlusIcon />
      등록
    </Button>
  </>
)

export const Default: Story = {}

export const WithActions: Story = { args: { actions } }

export const MobileActions: Story = { args: { actions }, globals: { viewport: { value: 'mobile' } } }

export const WithBackLink: Story = {
  args: { title: '주문 상세', description: undefined, backHref: '#orders', backLabel: '주문 목록' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: '주문 목록' })).toHaveAttribute('href', '#orders')
  },
}

export const HideTitleOnMobile: Story = {
  args: { title: '주문 수정', backHref: '#orders', backLabel: '주문 목록', hideTitleOnMobile: true },
  globals: { viewport: { value: 'mobile' } },
  play: async ({ canvasElement }) => {
    // 화면에서는 빠져도 제목은 문서 구조에 남는다
    await expect(within(canvasElement).getByRole('heading', { level: 1, name: '주문 수정' })).toBeInTheDocument()
  },
}
