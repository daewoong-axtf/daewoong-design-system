import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'Component/State/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '진행 중임을 도는 아이콘으로 보여준다. 명세는 `design/components/progress-circle.md`(indeterminate).',
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-10" />
    </div>
  ),
}

export const Brand: Story = { args: { className: 'size-10 text-primary' } }
