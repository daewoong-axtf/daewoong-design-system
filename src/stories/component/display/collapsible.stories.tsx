import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const meta = {
  title: 'Component/Display/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '한 영역만 접고 편다. 여러 항목을 묶어 쓰면 Accordion이다. 명세는 `design/components/collapsible.md`.',
      },
    },
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>상세 조건</CollapsibleTrigger>
      <CollapsibleContent>문 앞에 두고 벨은 누르지 말아 주세요.</CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: '상세 조건' })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(canvas.queryByText('문 앞에 두고 벨은 누르지 말아 주세요.')).not.toBeInTheDocument()
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('문 앞에 두고 벨은 누르지 말아 주세요.')).toBeVisible()
    trigger.focus()
    await userEvent.keyboard(' ')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(canvas.queryByText('문 앞에 두고 벨은 누르지 말아 주세요.')).not.toBeInTheDocument())
  },
}

export const DefaultOpen: Story = { args: { defaultOpen: true } }

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: '상세 조건' })).toBeDisabled()
  },
}

export const CustomTrigger: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="secondary">결제 정보 보기</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>신용카드로 결제했어요.</CollapsibleContent>
    </Collapsible>
  ),
}
