import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchXIcon, ShieldXIcon, TriangleAlertIcon } from 'lucide-react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { ErrorView } from '@/components/ui/error-view'

const meta = {
  title: 'Component/State/Error View',
  component: ErrorView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '페이지 전체를 보여 줄 수 없을 때 쓴다. 영역 하나의 오류·빈 결과는 Empty State를 쓴다. 명세는 `design/components/error-view.md`.',
      },
    },
  },
  args: { title: '페이지를 찾을 수 없어요' },
} satisfies Meta<typeof ErrorView>

export default meta
type Story = StoryObj<typeof meta>

export const NotFound: Story = {
  args: {
    code: 404,
    icon: <SearchXIcon />,
    title: '페이지를 찾을 수 없어요',
    description: '주소가 바뀌었거나 삭제된 페이지예요. 주소를 확인해주세요.',
    actions: <Button>홈으로 이동</Button>,
  },
}

export const Forbidden: Story = {
  args: {
    code: 403,
    icon: <ShieldXIcon />,
    title: '이 페이지를 볼 권한이 없어요',
    description: '권한이 필요하면 관리자에게 요청해주세요.',
    actions: <Button>홈으로 이동</Button>,
  },
}

const handleRetry = fn()

/** 다시 시도할 수 있는 오류는 재시도를 앞에 둔다. */
export const ServerError: Story = {
  args: {
    code: 500,
    icon: <TriangleAlertIcon />,
    title: '페이지를 불러오지 못했어요',
    description: '일시적인 문제예요. 잠시 후 다시 시도해주세요.',
    actions: (
      <>
        <Button onClick={handleRetry}>다시 시도</Button>
        <Button variant='secondary'>홈으로 이동</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { level: 1, name: '페이지를 불러오지 못했어요' })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: '다시 시도' }))
    await expect(handleRetry).toHaveBeenCalled()
  },
}

/** 서버 응답이 아닌 렌더 오류는 코드를 뺀다. */
export const RenderError: Story = {
  args: {
    icon: <TriangleAlertIcon />,
    title: '페이지를 표시하지 못했어요',
    description: '새로고침해도 같다면 관리자에게 알려주세요.',
    actions: <Button>다시 시도</Button>,
  },
}

/** 앱 셸 안 본문에서는 contained로 둔다. */
export const Contained: Story = {
  args: { ...NotFound.args, layout: 'contained' },
}
