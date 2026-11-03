import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Field, FieldLabel } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const options = [
  { value: 'normal', label: '일반 배송' },
  { value: 'fast', label: '빠른 배송' },
  { value: 'pickup', label: '직접 수령' },
]

const meta = {
  title: 'Component/Inputs/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '서로 배타적인 보기 중 하나를 고른다. 명세는 `design/components/radio.md`.',
      },
    },
  },
  args: { defaultValue: 'normal', 'aria-label': '배송 방법' },
  render: (args) => (
    <RadioGroup {...args}>
      {options.map((o) => (
        <Field key={o.value} orientation="horizontal">
          <RadioGroupItem value={o.value} id={`r-${o.value}`} />
          <FieldLabel htmlFor={`r-${o.value}`}>{o.label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('radio', { name: '빠른 배송' }))
    await expect(canvas.getByRole('radio', { name: '빠른 배송' })).toBeChecked()
    // Radix는 화살표 키가 눌린 동안 옮겨 간 칸을 선택한다 — 누른 채 확인하고 뗀다
    await userEvent.keyboard('{ArrowDown>}')
    await waitFor(() => expect(canvas.getByRole('radio', { name: '직접 수령' })).toBeChecked())
    await userEvent.keyboard('{/ArrowDown}')
    await expect(canvas.getByRole('radio', { name: '일반 배송' })).not.toBeChecked()
  },
}

export const Disabled: Story = { args: { disabled: true } }
