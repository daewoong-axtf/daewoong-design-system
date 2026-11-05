import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import {
  ConnectionStatusBanner,
  useConnectionStatus,
} from '@/components/ui/connection-status-banner'

const meta = {
  title: 'Component/Feedback/Connection Status Banner',
  component: ConnectionStatusBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '서버에 닿지 못하는 상황을 화면 맨 위에서 알린다. `useConnectionStatus`가 online·offline 이벤트로 상태를 관리한다. 명세는 `design/components/connection-status-banner.md`.',
      },
    },
  },
  args: { open: true, status: 'offline' },
  argTypes: {
    status: { control: 'inline-radio', options: ['offline', 'reconnecting', 'unstable', 'online'] },
  },
} satisfies Meta<typeof ConnectionStatusBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Offline: Story = {
  args: { onRetry: fn(), onDismiss: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '다시 시도' }))
    await expect(args.onRetry).toHaveBeenCalled()
    await userEvent.click(canvas.getByRole('button', { name: '연결 안내 닫기' }))
    await expect(args.onDismiss).toHaveBeenCalled()
  },
}

export const Reconnecting: Story = {
  args: { status: 'reconnecting', onRetry: fn() },
}

export const Unstable: Story = {
  args: { status: 'unstable', onRetry: fn() },
}

/** 복구되면 재시도 버튼을 숨긴다. */
export const Online: Story = {
  args: { status: 'online', onRetry: fn() },
}

/** 환경별 문구는 title로 넣는다. */
export const CustomTitle: Story = {
  args: {
    title: '개발 서버에 연결할 수 없어요. 사내망이나 VPN에 연결되어 있는지 확인해주세요.',
    onRetry: fn(),
  },
}

function Live() {
  const { open, status, retry, dismiss } = useConnectionStatus()
  return (
    <div>
      <ConnectionStatusBanner open={open} status={status} onRetry={retry} onDismiss={dismiss} />
      <div className='flex gap-2 p-4'>
        <Button variant='secondary' onClick={() => window.dispatchEvent(new Event('offline'))}>
          연결 끊기
        </Button>
        <Button variant='secondary' onClick={() => window.dispatchEvent(new Event('online'))}>
          연결 복구
        </Button>
      </div>
    </div>
  )
}

/** 끊기면 나타나고, 복구되면 알린 뒤 3초 뒤 스스로 닫힌다. */
export const Live_: Story = {
  name: 'Live',
  render: () => <Live />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('status')).toBeEmptyDOMElement()
    await userEvent.click(canvas.getByRole('button', { name: '연결 끊기' }))
    await expect(await canvas.findByText(/서버에 연결할 수 없어요/)).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: '연결 복구' }))
    await expect(await canvas.findByText('다시 연결됐어요')).toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: '다시 시도' })).not.toBeInTheDocument()
    await waitFor(() => expect(canvas.queryByText('다시 연결됐어요')).not.toBeInTheDocument(), { timeout: 5000 })
  },
}
