import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/ui/checkbox'
import { ChoiceCard } from '@/components/ui/choice-card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const meta = {
  title: 'Component/Inputs/Choice Card',
  component: ChoiceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '설명이 필요한 보기를 카드로 고른다. 명세는 `design/components/choice-card.md`.',
      },
    },
  },
  args: { title: '매일' },
} satisfies Meta<typeof ChoiceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Radio: Story = {
  render: () => (
    <RadioGroup aria-label="알림 주기" defaultValue="day" className="max-w-sm">
      <ChoiceCard title="매일" description="하루 한 번 모아서 받아요">
        <RadioGroupItem value="day" />
      </ChoiceCard>
      <ChoiceCard title="매주" description="월요일 오전에 받아요">
        <RadioGroupItem value="week" />
      </ChoiceCard>
      <ChoiceCard title="받지 않기" description="화면에서만 확인해요">
        <RadioGroupItem value="none" disabled />
      </ChoiceCard>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('월요일 오전에 받아요'))
    await expect(canvas.getByRole('radio', { name: /매주/ })).toBeChecked()
    await expect(canvas.getByRole('radio', { name: /매일/ })).not.toBeChecked()
  },
}

export const CheckboxCard: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <ChoiceCard title="예약 알림" description="예약이 확정되면 알려요">
        <Checkbox defaultChecked />
      </ChoiceCard>
      <ChoiceCard title="필수 동의" description="계속하려면 동의가 필요해요">
        <Checkbox aria-invalid />
      </ChoiceCard>
    </div>
  ),
}
